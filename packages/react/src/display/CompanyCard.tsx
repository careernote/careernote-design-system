import React, { useEffect, useRef, useState } from 'react';
import Chip from './Chip';
import Icon from './Icon';

// 인재풀 회사 카드 (2026-11-10 careernote-web TalentPoolCompanyCard 시각 셸 이관, Figma 9596:65092)
// 로고·이름·메타 · 맞음 표시 · 소개 3줄(넘치면 더보기 툴팁) · 칩 · 강점 박스(비어도 자리 유지) · 아래 버튼 줄(actions).
// 데이터 가공(메타 문구·맞음 판단)과 버튼 동작은 소비처가 정한다 — 이 컴포넌트는 모양만.
export interface CompanyCardProps {
  name: string;
  logoUrl?: string | null;
  /** 이름 아래 한 줄 (지역·업종·설립연도 등) */
  meta?: string | null;
  /** 강조 한 줄 — 체크 아이콘 + sky (예: '내 활동과 맞아요'). 없으면 숨김 */
  fitLabel?: string | null;
  intro?: string | null;
  tags?: string[];
  highlights?: string[];
  /** 카드 아래 버튼 줄. 없으면 숨김(고르기 전용 카드) */
  actions?: React.ReactNode;
  /** 루트 testid — 하위는 `${testid}-fit` · `-intro-more` · `-highlights` */
  'data-testid'?: string;
}

/** 로고 자리 첫 글자 — (주)·㈜·주식회사 같은 앞 꼬리표를 건너뛴다 */
const PREFIX = /^\s*(?:[([{【<][^)\]}】>]*[)\]}】>]|㈜|주식회사|유한회사|사단법인|재단법인)\s*/;
export function companyInitial(name: string): string {
  let rest = name ?? '';
  for (let i = 0; i < 5 && PREFIX.test(rest); i++) rest = rest.replace(PREFIX, '');
  const ch = rest.match(/[\p{L}\p{N}]/u)?.[0] ?? (name ?? '').match(/[\p{L}\p{N}]/u)?.[0];
  return ch ? ch.toUpperCase() : '';
}

export function CompanyCard({
  name,
  logoUrl,
  meta,
  fitLabel,
  intro,
  tags = [],
  highlights = [],
  actions,
  'data-testid': testId,
}: CompanyCardProps) {
  const sub = (s: string) => (testId ? `${testId}-${s}` : undefined);
  // 소개가 3줄을 넘을 때만 '더보기' — 마우스를 올리거나 포커스하면 전문을 툴팁으로
  const introRef = useRef<HTMLParagraphElement>(null);
  const [introClamped, setIntroClamped] = useState(false);
  useEffect(() => {
    const el = introRef.current;
    if (!el) return;
    const check = () => setIntroClamped(el.scrollHeight > el.clientHeight + 1);
    check();
    const observer = new ResizeObserver(check);
    observer.observe(el);
    return () => observer.disconnect();
  }, [intro]);
  const fullId = sub('intro-full');
  return (
    <article
      className="flex h-full flex-col gap-4 rounded-xlarge border border-gray400 bg-white100 p-6 mobile:p-5"
      data-testid={testId}
    >
      <div className="flex min-h-[142px] flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-[60px] w-[60px] shrink-0 items-center justify-center overflow-hidden rounded-large border border-border_gray bg-bg_gray1">
            {logoUrl ? (
              <img src={logoUrl} alt={`${name} 로고`} className="h-full w-full bg-white100 object-contain p-2" />
            ) : (
              <span className="text-[20px] font-semibold text-gray700">{companyInitial(name)}</span>
            )}
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <p className="truncate text-[24px] font-semibold leading-[29px] text-gray900 mobile:text-[20px]">{name}</p>
            {meta && <p className="text-[14px] leading-[1.4] text-gray700">{meta}</p>}
          </div>
        </div>
        {fitLabel && (
          <p className="flex items-center gap-1 text-[14px] font-semibold leading-[1.4] text-sky" data-testid={sub('fit')}>
            <Icon name="check" size={16} />
            {fitLabel}
          </p>
        )}
        {/* 소개가 짧아도 3줄 높이를 잡아 카드끼리 칩 줄을 맞춘다. 셋째 줄 끝 더보기 왼쪽은 흰색으로 서서히 덮는다 */}
        <div className="group relative">
          <p ref={introRef} className="h-[66px] overflow-hidden text-[14px] leading-[22px] text-gray800">
            {intro}
          </p>
          {introClamped && (
            <>
              <button
                type="button"
                className="absolute bottom-0 right-0 bg-gradient-to-r from-transparent to-white100 to-[20px] pl-6 text-[14px] font-semibold leading-[22px] text-gray700 underline underline-offset-2"
                aria-describedby={fullId}
                // 카드 전체가 선택 영역일 때 더보기를 눌러도 선택이 바뀌지 않게
                onClick={e => e.stopPropagation()}
                data-testid={sub('intro-more')}
              >
                더보기
              </button>
              <div
                id={fullId}
                role="tooltip"
                className="invisible absolute left-0 right-0 top-full z-20 mt-2 rounded-medium bg-gray900 p-3 text-[13px] leading-[20px] text-white100 opacity-0 shadow-lg transition-opacity group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100"
              >
                {intro}
              </div>
            </>
          )}
        </div>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.map(tag => (
              <Chip key={tag} size="M" color="blue" variant="soft" className="!rounded-small !px-2.5 !leading-[18px]">
                {tag}
              </Chip>
            ))}
          </div>
        )}
      </div>

      <div className="mt-auto flex flex-col gap-4">
        {/* 강점이 없어도 박스 자리(3줄 높이)는 남겨 카드끼리 버튼 위치를 맞춘다 */}
        <ul
          className={`flex min-h-[96px] flex-col gap-1.5 rounded-[10px] px-3.5 py-3 ${highlights.length > 0 ? 'bg-bg_gray1' : ''}`}
          data-testid={sub('highlights')}
        >
          {highlights.map(line => (
            <li key={line} className="flex items-center gap-2 text-[14px] leading-[20px] text-gray800">
              <span className="ml-0.5 h-1 w-1 shrink-0 rounded-full bg-sky" aria-hidden />
              <span className="truncate">{line}</span>
            </li>
          ))}
        </ul>
        {actions && <div className="flex gap-5 mobile:gap-2">{actions}</div>}
      </div>
    </article>
  );
}
