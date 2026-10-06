/**
 * 드롭다운 목록을 트리거 아래/위 중 어디에 펼칠지 정한다.
 * 실제로 보이는 영역은 뷰포트와 스크롤(overflow) 조상들의 교집합 — 스크롤 영역 밖 고정 푸터에 가려지는 경우까지 잡는다.
 * 아래 공간이 목록 높이보다 좁고 위가 더 넓으면 위로 펼친다.
 */
export type DropdownPlacement = 'bottom' | 'top'

const CLIPPING = /(auto|scroll|hidden|clip)/

function visibleBounds(el: HTMLElement): { top: number; bottom: number } {
  let top = 0
  let bottom = window.innerHeight
  for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) {
    if (!CLIPPING.test(getComputedStyle(p).overflowY)) continue
    const r = p.getBoundingClientRect()
    top = Math.max(top, r.top)
    bottom = Math.min(bottom, r.bottom)
  }
  return { top, bottom }
}

export function dropdownPlacement(trigger: HTMLElement, listHeight: number, gap = 8): DropdownPlacement {
  const rect = trigger.getBoundingClientRect()
  const bounds = visibleBounds(trigger)
  const below = bounds.bottom - rect.bottom
  const above = rect.top - bounds.top
  return below < listHeight + gap && above > below ? 'top' : 'bottom'
}
