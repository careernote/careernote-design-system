/**
 * React 아이콘(packages/react/src/icons/*.tsx) → Vue 소비용 SVG 데이터 생성기.
 *   산출: src/icons/icon-svgs.generated.ts  (viewBox + body 문자열 맵 + 프렌들리 네임맵)
 * JSX 표현식이 size/color/className/aria 외에 남는 아이콘은 스킵하고 리포트한다.
 * 실행: bun run packages/vue/scripts/gen-icons.ts (레포 루트)
 */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const SRC = join(import.meta.dir, '../../react/src/icons');
const OUT = join(import.meta.dir, '../src/icons/icon-svgs.generated.ts');

const ATTR_MAP: Record<string, string> = {
  fillRule: 'fill-rule', clipRule: 'clip-rule', strokeWidth: 'stroke-width',
  strokeLinecap: 'stroke-linecap', strokeLinejoin: 'stroke-linejoin',
  strokeMiterlimit: 'stroke-miterlimit', strokeDasharray: 'stroke-dasharray',
  fillOpacity: 'fill-opacity', strokeOpacity: 'stroke-opacity', clipPath: 'clip-path',
  stopColor: 'stop-color', stopOpacity: 'stop-opacity', gradientUnits: 'gradientUnits',
  gradientTransform: 'gradientTransform', maskUnits: 'maskUnits',
};

const icons: Record<string, { viewBox: string; body: string }> = {};
const failed: string[] = [];

for (const file of readdirSync(SRC)) {
  if (!file.endsWith('.tsx')) continue;
  const name = file.replace('.tsx', '');
  const src = readFileSync(join(SRC, file), 'utf8');

  // 한 파일에 여러 export 컴포넌트가 있을 수 있음 — export 단위로 분해해 각각 파싱
  const exportBlocks = src.split(/(?=export const (\w+))/).filter((b) => b.startsWith('export const'));
  const units = exportBlocks.length > 1
    ? exportBlocks.map((b) => ({ name: b.match(/export const (\w+)/)![1], src: b }))
    : [{ name, src }];

  for (const unit of units) {
    parseUnit(unit.name, unit.src);
  }
  continue;
}

function parseUnit(name: string, src: string) {
  const svgOpen = src.match(/<svg\b([\s\S]*?)>/);
  const viewBox = src.match(/viewBox="([^"]+)"/)?.[1];
  const closeIdx = src.indexOf('</svg>');
  if (!svgOpen || !viewBox || closeIdx < 0) { failed.push(`${name} (svg 파싱 실패)`); return; }

  let body = src.slice(src.indexOf(svgOpen[0]) + svgOpen[0].length, closeIdx);

  // JSX → SVG 속성 변환
  for (const [jsx, svg] of Object.entries(ATTR_MAP)) {
    body = body.replaceAll(`${jsx}=`, `${svg}=`);
  }
  // color 표현식 → currentColor, 숫자 표현식 → 문자열
  body = body.replace(/(fill|stroke)=\{color\}/g, '$1="currentColor"');
  body = body.replace(/=\{([\d.]+)\}/g, '="$1"');
  // 주석 제거
  body = body.replace(/\{\/\*[\s\S]*?\*\/\}/g, '');
  body = body.trim();

  // 루트 <svg> 의 stroke 계열 속성 보존 (tabler류 아이콘은 stroke 를 루트에만 선언 —
  // 유실되면 path 가 투명해진다). <g> 래퍼로 감싸 body 에 흡수.
  let rootAttrs = svgOpen[1]
    .replace(/stroke=\{color\}/g, 'stroke="currentColor"')
    .replace(/strokeWidth=\{([\d.]+)\}/g, 'strokeWidth="$1"');
  for (const [jsx, svg] of Object.entries(ATTR_MAP)) {
    rootAttrs = rootAttrs.replaceAll(`${jsx}=`, `${svg}=`);
  }
  const kept = [...rootAttrs.matchAll(/(stroke|stroke-width|stroke-linecap|stroke-linejoin)="([^"]+)"/g)]
    .map((m) => `${m[1]}="${m[2]}"`);
  if (kept.length > 0) {
    body = `<g ${kept.join(' ')}>${body}</g>`;
  }

  // 잔존 JSX 표현식 검사 (변환 못 한 동적 부분)
  if (/[{}]/.test(body)) {
    const exprs = body.match(/\{[^}]*\}/g) ?? [];
    failed.push(`${name} (동적 표현식: ${exprs.slice(0, 2).join(' ')})`);
    return;
  }
  icons[name] = { viewBox, body };
}

// 프렌들리 네임맵 (React iconMap 과 동일 키)
const indexSrc = readFileSync(join(SRC, 'index.ts'), 'utf8');
const mapBlock = indexSrc.slice(indexSrc.indexOf('export const iconMap'), indexSrc.indexOf('};', indexSrc.indexOf('export const iconMap')));
const nameMap: Record<string, string> = {};
for (const m of mapBlock.matchAll(/^\s*(?:'([^']+)'|([\w-]+)):\s*(\w+),/gm)) {
  const key = m[1] ?? m[2];
  if (icons[m[3]]) nameMap[key] = m[3];
}

let out = '// 자동 생성 파일 — 직접 수정 금지. bun run packages/vue/scripts/gen-icons.ts 로 재생성\n';
out += 'export interface IconSvg { viewBox: string; body: string }\n\n';
out += `export const ICON_SVGS: Record<string, IconSvg> = ${JSON.stringify(icons, null, 2)};\n\n`;
out += `export const ICON_NAME_MAP: Record<string, string> = ${JSON.stringify(nameMap, null, 2)};\n`;
writeFileSync(OUT, out);

console.log(`아이콘 ${Object.keys(icons).length}종 생성, 네임맵 ${Object.keys(nameMap).length}건`);
if (failed.length) console.log('스킵:', failed.join(', '));
