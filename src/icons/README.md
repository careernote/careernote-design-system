  # Icon Design System

  CareerNote 디자인 시스템의 Icon 컴포넌트는 Figma 디자인 스펙을 기반으로 구현된 통합 아이콘 시스템입니다.

  ## 🎯 Features

  - **5가지 크기 지원**: xs(16px), sm(18px), md(20px), lg(24px), xl(30px)
  - **색상 커스터마이징**: currentColor 기본값으로 컨텍스트 색상 상속
  - **TypeScript 지원**: 완전한 타입 안전성 제공
  - **접근성 지원**: WCAG 2.1 AA 기준 준수
  - **최적화된 SVG**: 경량화된 벡터 그래픽

  ## 📋 Available Icons

  현재 제공되는 아이콘 목록:

  ### Arrow Icons

  - `arrow-up`, `arrow-down`, `arrow-left`, `arrow-right`

  ### UI Action Icons

  - `close`, `search`, `menu`, `plus`, `minus`

  ### File & Content Icons

  - `download`, `edit`, `delete`

  ### Communication Icons

  - `mail`

  ### User Icons

  - `user`, `setting`

  ## 🚀 Usage

  ### 기본 사용법

  ```tsx
  import { Icon } from '@/components/design-system';

  // 기본 사용
  <Icon name="search" />

  // 크기와 색상 지정
  <Icon name="user" size="lg" color="#4B4D57" />

  // 접근성 지원
  <Icon
    name="close"
    size="md"
    aria-label="창 닫기"
    data-testid="close-button"
  />
  ```

  ### 버튼과 함께 사용

  ```tsx
  <button className="flex items-center gap-2">
    <Icon name="plus" size="sm" color="white" />
    <span>추가하기</span>
  </button>
  ```

  ### currentColor 활용

  ```tsx
  <div className="text-red-500">
    <Icon name="delete" color="currentColor" />
    <span>삭제</span>
  </div>
  ```

  ### 반응형 크기

  ```tsx
  <Icon
    name="menu"
    size="sm"
    className="desktop:hidden"
  />
  <Icon
    name="menu"
    size="md"
    className="mobile:hidden"
  />
  ```

  ## 📐 Size Guidelines

  | Size | Pixel | 사용 권장 상황       |
  | ---- | ----- | -------------------- |
  | xs   | 16px  | 작은 텍스트와 함께   |
  | sm   | 18px  | 본문 텍스트와 함께   |
  | md   | 20px  | 기본 크기 (권장)     |
  | lg   | 24px  | 제목이나 중요한 액션 |
  | xl   | 30px  | 대형 UI 요소         |

  ## 🎨 Color Guidelines

  - **기본값**: `currentColor` (부모 요소 색상 상속)
  - **명시적 색상**: Tailwind CSS 색상 또는 HEX 값 사용
  - **권장 색상**:
    - Primary: `#00A3FF` (sky)
    - Secondary: `#4B4D57` (gray800)
    - Danger: `#F10000` (red)

  ## ♿ Accessibility

  ### 필수 사항

  ```tsx
  <Icon
    name="close"
    aria-label="창 닫기" // 스크린 리더용 라벨
    data-testid="close-btn" // 테스트용 식별자
  />
  ```

  ### 권장 사항

  - 인터랙티브 아이콘은 적절한 `aria-label` 제공
  - 색상만으로 의미를 전달하지 않기
  - 최소 터치 영역 44px × 44px 확보

  ## 🔧 Development

  ### 새 아이콘 추가하기

  1. **SVG 컴포넌트 생성**

  ```tsx
  // icons/NewIcon.tsx
  import React from 'react';
  import { BaseIconProps } from '../Icon';

  export const NewIcon: React.FC<BaseIconProps> = ({
    size = 20,
    color = 'currentColor',
    className = '',
    'aria-label': ariaLabel,
    'data-testid': testId,
  }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      // ... SVG 내용
    ></svg>
  );
  ```

  2. **인덱스 파일에 등록**

  ```tsx
  // icons/index.ts
  export { NewIcon } from './NewIcon';

  // iconMap에 추가
  export const iconMap = {
    // ... 기존 아이콘들
    'new-icon': NewIcon,
  };
  ```

  ### SVG 최적화 가이드라인

  - `viewBox="0 0 20 20"` 사용 (20×20 기준)
  - `stroke` 속성에 `{color}` 전달
  - `strokeWidth="1.67"` 사용 (일관성)
  - `strokeLinecap="round"`, `strokeLinejoin="round"` 적용
  - 불필요한 요소 제거

  ## 📱 Storybook

  Storybook에서 모든 아이콘을 미리보고 테스트할 수 있습니다:

  ```bash
  npm run storybook
  ```

  **Design System > Icon** 섹션에서 확인 가능:

  - 전체 아이콘 갤러리
  - 크기별/색상별 변형
  - 실제 사용 예시
  - 접근성 기능 데모

  ## 🔗 Design Resources

  - **Figma**: [CareerNote Design System](https://www.figma.com/design/K4eZWfk52Sjvr7kb3rIjYY/CareerNote-Design-System?node-id=34-219&m=dev)
  - **Storybook**: Design System > Icon

  ## 🤝 Contributing

  아이콘 추가 요청이나 개선 사항은 다음 절차를 따라주세요:

  1. Figma에서 디자인 확인
  2. SVG 최적화 및 컴포넌트 구현
  3. Storybook 스토리 업데이트
  4. 문서 업데이트

  ---

  _이 아이콘 시스템은 CareerNote의 일관된 사용자 경험을 위해 설계되었습니다._
