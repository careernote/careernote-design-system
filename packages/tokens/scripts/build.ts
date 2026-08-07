/**
 * tokens.json → dist 산출물 3종 생성.
 *   dist/tokens.css            프레임워크 중립 CSS 변수 (--cn-*)
 *   dist/tailwind-v3-preset.cjs careernote-web(Tailwind 3)용 preset
 *   dist/theme-v4.css          career-pencil(Tailwind 4)용 @theme 블록
 * 실행: bun run build:tokens (레포 루트)
 */
import tokens from '../src/tokens.json';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const OUT = join(import.meta.dir, '..', 'dist');
mkdirSync(OUT, { recursive: true });

const HEADER = '/* 자동 생성 파일 — 직접 수정 금지. src/tokens.json 수정 후 build:tokens 실행 */\n';

const flatColors: Record<string, string> = {};
for (const group of Object.values(tokens.color)) Object.assign(flatColors, group);

// 1. tokens.css — 중립 CSS 변수
{
  let css = `${HEADER}:root {\n`;
  for (const [k, v] of Object.entries(flatColors)) css += `  --cn-color-${k.replace(/_/g, '-')}: ${v};\n`;
  for (const [k, v] of Object.entries(tokens.gradient)) css += `  --cn-gradient-${k.replace(/_/g, '-')}: ${v};\n`;
  for (const [k, v] of Object.entries(tokens.radius)) css += `  --cn-radius-${k}: ${v};\n`;
  for (const [k, v] of Object.entries(tokens.shadow)) css += `  --cn-shadow-${k}: ${v};\n`;
  for (const [k, v] of Object.entries(tokens.typography.fontSize)) {
    css += `  --cn-text-${k}: ${v.size};\n  --cn-text-${k}-line-height: ${v.lineHeight};\n`;
  }
  css += '}\n';
  writeFileSync(join(OUT, 'tokens.css'), css);
}

// 2. Tailwind v3 preset (careernote-web)
{
  const fontSize = Object.fromEntries(
    Object.entries(tokens.typography.fontSize).map(([k, v]) => [k, [v.size, { lineHeight: v.lineHeight }]]),
  );
  const screens = Object.fromEntries(
    Object.entries(tokens.breakpoint).map(([k, v]) => [k, typeof v === 'string' ? v : v]),
  );
  // shadcn(ui/*) 레이어용 변수 매핑 — 값은 @careernote/react/ui/shadcn.css 가 공급
  const shadcnColors = Object.fromEntries(
    ['border', 'input', 'ring', 'background', 'foreground'].map((k) => [k, `hsl(var(--${k}))`]),
  ) as Record<string, unknown>;
  for (const k of ['primary', 'secondary', 'destructive', 'muted', 'accent', 'popover', 'card']) {
    shadcnColors[k] = { DEFAULT: `hsl(var(--${k}))`, foreground: `hsl(var(--${k}-foreground))` };
  }
  const preset = {
    theme: {
      screens,
      extend: {
        colors: { ...flatColors, ...shadcnColors },
        backgroundImage: tokens.gradient,
        fontSize,
        fontWeight: tokens.typography.fontWeight,
        spacing: tokens.spacing,
        borderRadius: {
          ...tokens.radius,
          lg: 'var(--radius)',
          md: 'calc(var(--radius) - 2px)',
          sm: 'calc(var(--radius) - 4px)',
        },
        boxShadow: tokens.shadow,
        keyframes: {
          'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
          'accordion-up': { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
        },
        animation: {
          'accordion-down': 'accordion-down 0.2s ease-out',
          'accordion-up': 'accordion-up 0.2s ease-out',
        },
      },
    },
  };
  writeFileSync(
    join(OUT, 'tailwind-v3-preset.cjs'),
    `${HEADER}module.exports = ${JSON.stringify(preset, null, 2)};\n`,
  );
}

// 3. Tailwind v4 @theme (career-pencil)
//    spacing 은 의도적으로 제외 — pencil 은 기본 rem 스케일(p-4=1rem)을 쓰므로
//    web 의 px 오버라이드(4→4px)를 주입하면 앱 전체 간격이 붕괴한다.
//    breakpoint 도 제외 — pencil 은 @custom-variant mobile/tablet 을 이미 보유.
{
  let css = `${HEADER}@theme {\n`;
  for (const [k, v] of Object.entries(flatColors)) css += `  --color-${k.replace(/_/g, '-')}: ${v};\n`;
  for (const [k, v] of Object.entries(tokens.radius)) css += `  --radius-${k}: ${v};\n`;
  for (const [k, v] of Object.entries(tokens.shadow)) css += `  --shadow-${k}: ${v};\n`;
  for (const [k, v] of Object.entries(tokens.typography.fontSize)) {
    css += `  --text-${k}: ${v.size};\n  --text-${k}--line-height: ${v.lineHeight};\n`;
  }
  css += '}\n';
  writeFileSync(join(OUT, 'theme-v4.css'), css);
}

console.log('tokens dist 재생성 완료: tokens.css, tailwind-v3-preset.cjs, theme-v4.css');
