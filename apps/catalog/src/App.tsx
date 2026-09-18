import React, { useState } from 'react';
import * as DS from '@careernote/react';
import * as ExtraIcons from '@careernote/react/icons-extra';
import { iconMap } from '@careernote/react';
import tokens from '@careernote/tokens/tokens.json'
import symbol from '@careernote/assets/logo/careernote-symbol.svg'
import logoLight from '@careernote/assets/logo/careernote-logo.png'
import logoDark from '@careernote/assets/logo/careernote-logo-on-dark.png';
import Lottie from 'lottie-react';
import lottieAi from '@careernote/assets/lottie/ai.json';
import lottieCheck from '@careernote/assets/lottie/check.json';
import lottieEvaluation from '@careernote/assets/lottie/evaluation.json';
import lottieSearch from '@careernote/assets/lottie/search.json';
import lottieLoadingDots from '@careernote/assets/lottie/LoadingDots.json';

const {
  Button,
  AddDashedButton,
  IconButton,
  Icon,
  ActivityCard,
  ToggleButton,
  Chip,
  CategoryChip,
  SelectCard,
  SelectableChip,
  TextLink,
  ConfirmModal,
  PlanCard,
  PlanFeature,
  RibbonBadge,
  StarGrid,
  Badge,
  TextInput,
  Textarea,
  Selector,
  Checkbox,
  Alert,
  Modal,
  ModalHeader,
  Information,
  NumberBadge,
  Tooltip,
  ProgressBarItem,
  ProgressBar,
  Panel,
  ApplicantCard,
  TalentpoolCard,
  BoardCard,
  FeedCard,
  PillTabs,
  LevelSelector,
  SegmentedControl,
  FilterChips,
  UnderlineTabs,
  ExperienceItem,
  CareerTooltip,
  ProfileAvatar,
  Sidebar,
  SidebarMenuItem,
  SidebarAccount,
  CandidateDetail,
  ApplicantEvaluationPanel,
} = DS;

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-title2 font-bold text-gray900 mb-6 pb-2 border-b border-border_gray">{title}</h2>
      {children}
    </section>
  );
}

function Swatch({ name, value }: { name: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="w-full h-16 rounded-medium border border-border_gray" style={{ background: value }} />
      <div className="text-detail font-semibold text-gray900">{name}</div>
      <div className="text-detail text-gray700 font-mono">{value}</div>
    </div>
  );
}

function ColorSection() {
  return (
    <Section title="Colors">
      {Object.entries(tokens.color).map(([group, colors]) => (
        <div key={group} className="mb-6">
          <h3 className="text-subtitle3 font-semibold text-gray800 mb-3 capitalize">{group}</h3>
          <div className="grid grid-cols-4 tablet:grid-cols-2 gap-4">
            {Object.entries(colors as Record<string, string>).map(([name, value]) => (
              <Swatch key={name} name={name} value={value} />
            ))}
          </div>
        </div>
      ))}
      <h3 className="text-subtitle3 font-semibold text-gray800 mb-3">Gradients</h3>
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(tokens.gradient).map(([name, value]) => (
          <Swatch key={name} name={name} value={value} />
        ))}
      </div>
    </Section>
  );
}

function TypographySection() {
  return (
    <Section title="Typography">
      <div className="flex flex-col gap-3">
        {Object.entries(tokens.typography.fontSize).map(([name, v]) => (
          <div key={name} className="flex items-baseline gap-6">
            <span className="w-[120px] shrink-0 text-detail text-gray700 font-mono">
              {name} · {(v as { size: string }).size}
            </span>
            <span style={{ fontSize: (v as { size: string }).size, lineHeight: (v as { lineHeight: string }).lineHeight }} className="text-gray900 font-semibold truncate">
              커리어노트 디자인 시스템
            </span>
          </div>
        ))}
      </div>
    </Section>
  );
}

function SurfaceSection() {
  return (
    <Section title="Radius & Shadow">
      <div className="flex gap-4 flex-wrap mb-6">
        {Object.entries(tokens.radius).map(([name, value]) => (
          <div key={name} className="flex flex-col items-center gap-1">
            <div className="w-20 h-14 bg-sky_bg border border-sky" style={{ borderRadius: value }} />
            <span className="text-detail text-gray700">{name} · {value}</span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-4 tablet:grid-cols-2 gap-6">
        {Object.entries(tokens.shadow).map(([name, value]) => (
          <div key={name} className="flex flex-col items-center gap-2 py-4">
            <div className="w-full h-[72px] bg-white100 rounded-large" style={{ boxShadow: value }} />
            <span className="text-detail text-gray700">{name}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}

const noop = () => {};

function ButtonSection() {
  const [on, setOn] = useState(true);
  const colors = ['white', 'black', 'sky', 'red', 'transparent'] as const;
  const sizes = ['sm', 'md', 'lg'] as const;
  return (
    <Section title="Buttons">
      <div className="flex flex-col gap-4">
        {sizes.map((size) => (
          <div key={size} className="flex items-center gap-3 flex-wrap">
            <span className="w-10 text-detail text-gray700 font-mono">{size}</span>
            {colors.map((color) => (
              <Button key={color} size={size} color={color} onClick={noop}>
                {color}
              </Button>
            ))}
          </div>
        ))}
        <div className="max-w-[420px]">
          <AddDashedButton onClick={() => {}} />
        </div>
        <div className="flex items-center gap-3">
          <span className="text-detail text-gray700">IconButton</span>
          <IconButton aria-label="수정" onClick={() => {}}>
            <Icon name="edit" size="md" />
          </IconButton>
          <IconButton aria-label="삭제" onClick={() => {}}>
            <Icon name="delete" size="md" />
          </IconButton>
          <IconButton aria-label="더보기" variant="ghost" onClick={() => {}}>
            <Icon name="dotmenu" size="md" />
          </IconButton>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-detail text-gray700">disabled</span>
          <Button color="sky" disabled onClick={noop}>disabled</Button>
          <span className="text-detail text-gray700 ml-6">ToggleButton</span>
          <ToggleButton checked={on} onChange={setOn} />
          <ToggleButton checked={!on} onChange={() => setOn(!on)} size="sm" />
        </div>
      </div>
      <h3 className="text-subtitle3 font-semibold text-gray800 mt-8 mb-2">TextLink</h3>
      <div className="flex items-center gap-4"><TextLink>직접 입력하기</TextLink><TextLink>다른 직업 보기</TextLink></div>
    </Section>
  );
}

function ChipSection() {
  const colors = ['black', 'basic', 'sky', 'red', 'blue', 'green', 'purple'] as const;
  const sizes = ['S', 'M', 'L', 'XL'] as const;
  return (
    <Section title="Chips">
      {(['solid', 'soft'] as const).map((variant) => (
        <div key={variant} className="mb-4">
          <h3 className="text-subtitle3 font-semibold text-gray800 mb-2">{variant}</h3>
          {sizes.map((size) => (
            <div key={size} className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="w-6 text-detail text-gray700 font-mono">{size}</span>
              {colors.map((color) => (
                <Chip key={color} size={size} color={color} variant={variant}>
                  {color}
                </Chip>
              ))}
            </div>
          ))}
        </div>
      ))}
      <h3 className="text-subtitle3 font-semibold text-gray800 mt-8 mb-2">SelectableChip — 별(대표)+✕ 선택 칩</h3>
      <div className="flex flex-wrap gap-2">
        <SelectableChip representative starTitle="대표 직무">백엔드 개발</SelectableChip>
        <SelectableChip starTitle="대표로 지정">데이터 분석가</SelectableChip>
      </div>
      <h3 className="text-subtitle3 font-semibold text-gray800 mt-8 mb-2">CategoryChip — 카테고리 필터 (직업 선택 플로우)</h3>
      <div className="flex flex-wrap gap-2">
        <CategoryChip active>전체</CategoryChip>
        <CategoryChip>개발</CategoryChip>
        <CategoryChip>데이터·AI</CategoryChip>
        <CategoryChip>디자인</CategoryChip>
      </div>
      <h3 className="text-subtitle3 font-semibold text-gray800 mt-8 mb-2">
        CategoryChip — variant=&quot;soft&quot; size=&quot;sm&quot; (ATS 채용 만들기 선택지)
      </h3>
      <div className="flex flex-wrap gap-1">
        {['정규직', '계약직', '인턴', '아르바이트', '프리랜서'].map((label, i) => (
          <CategoryChip key={label} variant="soft" size="sm" active={i === 0}>
            {label}
          </CategoryChip>
        ))}
      </div>

      <h3 className="text-subtitle3 font-semibold text-gray800 mt-8 mb-2">Panel — 흰 서피스 카드 (Form panel · 목록 카드)</h3>
      <div className="flex flex-wrap gap-4">
        <Panel padding="md" className="w-[260px]">
          <p className="text-body2 font-semibold text-gray800">padding=md · shadow=light</p>
          <p className="text-detail text-gray600">폼 패널·요약 박스 기본값</p>
        </Panel>
        <Panel padding="md" shadow="soft" bordered className="w-[260px]">
          <p className="text-body2 font-semibold text-gray800">bordered · shadow=soft</p>
          <p className="text-detail text-gray600">목록 카드(공고 현황)</p>
        </Panel>
      </div>
    </Section>
  );
}

function InputSection() {
  const [sel, setSel] = useState('');
  const [level, setLevel] = useState(4);
  return (
    <Section title="Inputs">
      <h3 className="text-subtitle3 font-semibold text-gray800 mb-2">LevelSelector — 5단계 비중 (Figma 평가 기준 모달)</h3>
      <div className="max-w-[400px] mb-8 flex flex-col gap-3">
        <p className="text-body2 font-medium text-gray800">서비스 기획/운영 실무 역량</p>
        <LevelSelector value={level} onChange={setLevel} />
        <LevelSelector value={2} onChange={() => {}} disabled />
      </div>
      <div className="grid grid-cols-2 tablet:grid-cols-1 gap-6 max-w-[720px]">
        <TextInput label="라벨" sublabel="서브라벨" placeholder="텍스트를 입력하세요" essential />
        <TextInput label="에러 상태" placeholder="값" errorMessage="에러 메시지입니다" />
        <TextInput
          size="small"
          fullWidth
          label="채용 제목 *"
          placeholder="예: 프로덕트 디자이너"
          helperText="size=small — 높이 40 · 라벨 11 bold · 헬퍼 10 (ATS 폼)"
        />
        <Textarea label="Textarea" placeholder="여러 줄 입력" />
        <Selector
          label="Selector"
          placeholder="선택하세요"
          value={sel}
          options={['옵션 A', '옵션 B', '옵션 C']}
          onChange={setSel}
        />
        <div>
          <p className="text-detail text-gray600 mb-2">Checkbox — 선택 체크 (24px, 순번 표시·disabled 지원)</p>
          <div className="flex items-center gap-3">
            <Checkbox />
            <Checkbox checked />
            <Checkbox checked number={2} />
            <Checkbox disabled />
            <CheckboxToggleDemo />
          </div>
        </div>
      </div>
    </Section>
  );
}

function CheckboxToggleDemo() {
  const [on, setOn] = useState(false);
  return <Checkbox checked={on} onChange={setOn} />;
}

function FeedbackSection() {
  const [alertOpen, setAlertOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  return (
    <Section title="Feedback & Overlays">
      <div className="flex items-center gap-3 mb-6">
        <Button color="black" onClick={() => setAlertOpen(true)}>Alert 열기</Button>
        <Button color="sky" onClick={() => setModalOpen(true)}>Modal 열기</Button>
        <Button color="white" onClick={() => setConfirmOpen(true)}>ConfirmModal 열기</Button>
      </div>
      {alertOpen && (
        <Alert
          type="confirm"
          title="정말 진행할까요?"
          subtitle="이 동작은 되돌릴 수 있습니다."
          onCancel={() => setAlertOpen(false)}
          onAction={() => setAlertOpen(false)}
        />
      )}
      <ConfirmModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => setConfirmOpen(false)}
        onDismiss={() => setConfirmOpen(false)}
        title="정말 삭제하시겠어요?"
        description="삭제하면 되돌릴 수 없습니다."
      />
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="모달 제목"
        subtitle="모달 서브타이틀"
        description="모달 설명 텍스트입니다."
        primaryButton={{ label: '확인', onClick: () => setModalOpen(false) }}
        secondaryButton={{ label: '취소', onClick: () => setModalOpen(false) }}
      />
      <div className="mb-6">
        <span className="text-detail text-gray700">ModalHeader — 대형 다이얼로그 상단 (닫기 유/무)</span>
        <div className="mt-2 border border-border_gray rounded-medium overflow-hidden max-w-[720px]">
          <ModalHeader
            title="희망 직업 변경하기"
            description="지원을 원하는 직업을 모두 선택해주세요. 중복 선택할 수 있어요."
            onClose={() => {}}
          />
        </div>
        <div className="mt-3 border border-border_gray rounded-medium overflow-hidden max-w-[720px]">
          <ModalHeader title="어떤 일을 찾고 계신가요" description="닫기 버튼 없는 변형입니다." />
        </div>
      </div>
      <div className="mb-6">
        <span className="text-detail text-gray700">Lottie — @careernote/assets 정본 5종</span>
        <div className="mt-2 flex flex-wrap items-end gap-8">
          {[
            { name: 'ai', data: lottieAi },
            { name: 'check', data: lottieCheck },
            { name: 'evaluation', data: lottieEvaluation },
            { name: 'search', data: lottieSearch },
            { name: 'LoadingDots', data: lottieLoadingDots },
          ].map(l => (
            <div key={l.name} className="flex flex-col items-center gap-1">
              <Lottie animationData={l.data} loop style={{ width: 80, height: 80 }} />
              <span className="text-detail text-gray700 font-mono">{l.name}.json</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3 max-w-[560px]">
        <Information type="positive" title="긍정 안내" subtext="positive 정보 문구" />
        <Information type="negative" title="경고 안내" subtext="negative 정보 문구" />
        <Information type="normal" title="일반 안내" subtext="normal 정보 문구" />
      </div>
      <div className="flex items-center gap-6 mt-6">
        <span className="text-detail text-gray700">Badge</span>
        {(['Soon', 'New', 'Beta'] as const).map((v) => (
          <Badge key={v} variant={v} />
        ))}
        <span className="text-detail text-gray700 ml-6">NumberBadge</span>
        {[1, 2, 3].map((n) => (
          <NumberBadge key={n} number={n} />
        ))}
        <div className="relative ml-10">
          <span className="text-body2 text-gray800">Tooltip 기준 요소</span>
          <Tooltip text="툴팁 텍스트" position="top" />
        </div>
      </div>
    </Section>
  );
}

function NavigationSection() {
  const [seg, setSeg] = useState('card');
  const [chip, setChip] = useState('all');
  const [tab, setTab] = useState('applicants');
  return (
    <Section title="Navigation">
      <div className="flex items-center gap-6">
        <ProgressBarItem status="complete" text="완료 단계" number={1} />
        <ProgressBarItem status="editing" text="진행 중 단계" number={2} />
        <ProgressBarItem status="waiting" text="대기 단계" number={3} />
      </div>

      <h3 className="text-subtitle3 font-semibold text-gray800 mt-8 mb-2">ProgressBar — 단계 진행바 (ATS 채용 만들기)</h3>
      <div className="flex flex-col gap-4">
        <ProgressBar steps={['기본 정보', '공고 작성', '지원서 편집']} current={1} />
        <ProgressBar steps={['기본 정보', '공고 작성', '지원서 편집']} current={2} />
        <ProgressBar steps={['기본 정보', '공고 작성', '지원서 편집']} current={3} />
      </div>

      <h3 className="text-subtitle3 font-semibold text-gray800 mt-8 mb-2">UnderlineTabs — 공고 상세 탭 (Figma)</h3>
      <UnderlineTabs
        items={[
          { value: 'applicants', label: '지원자 관리' },
          { value: 'calendar', label: '채용 캘린더' },
        ]}
        value={tab}
        onChange={setTab}
      />

      <h3 className="text-subtitle3 font-semibold text-gray800 mt-8 mb-2">SegmentedControl — 뷰 전환 (Figma selectBttn)</h3>
      <SegmentedControl
        items={[
          { value: 'card', label: '카드' },
          { value: 'kanban', label: '칸반보드' },
          { value: 'table', label: '표' },
        ]}
        value={seg}
        onChange={setSeg}
      />

      <h3 className="text-subtitle3 font-semibold text-gray800 mt-8 mb-2">
        SegmentedControl — 아이콘형 (Figma selectBttn2, 선택 항목만 라벨)
      </h3>
      <SegmentedControl
        items={[
          { value: 'card', label: '카드', icon: 'view_card' },
          { value: 'kanban', label: '칸반보드', icon: 'view_kanban' },
          { value: 'table', label: '표', icon: 'view_list' },
        ]}
        value={seg}
        onChange={setSeg}
        labelMode="selected"
      />

      <h3 className="text-subtitle3 font-semibold text-gray800 mt-8 mb-2">FilterChips — 단계 필터 (단일 선택, count 옵션)</h3>
      <FilterChips
        items={[
          { value: 'all', label: '전체', count: 12 },
          { value: 'received', label: '접수', count: 5 },
          { value: 'interview', label: '인터뷰', count: 4 },
          { value: 'offer', label: '처우 협의' },
          { value: 'hired', label: '최종합격' },
          { value: 'rejected', label: '불합격', count: 3 },
        ]}
        value={chip}
        onChange={setChip}
      />
    </Section>
  );
}

function IconSection() {
  const entries = Object.entries(iconMap) as Array<[string, React.ComponentType<{ size?: number }>]>;
  return (
    <Section title={`Icons — iconMap (${entries.length})`}>
      <p className="text-body2 text-gray700 mb-4">
        <code className="font-mono text-sky">{'<Icon name="..." />'}</code> 로 사용. 이름이 곧 API.
      </p>
      <div className="grid grid-cols-6 tablet:grid-cols-3 gap-4">
        {entries.map(([name, IconComp]) => (
          <div key={name} className="flex flex-col items-center gap-2 p-3 rounded-medium border border-border_gray2 bg-white100">
            <IconComp size={22} />
            <span className="text-detail text-gray700 text-center break-all">{name}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}

function ExtraIconSection() {
  const icons = Object.entries(ExtraIcons).filter(([, v]) => typeof v === 'function') as Array<
    [string, React.ComponentType<{ className?: string }>]
  >;
  return (
    <Section title={`Icons — icons-extra (${icons.length})`}>
      <p className="text-body2 text-gray700 mb-4">
        design-system 밖 <code className="font-mono text-sky">src/icons</code> 이관분 —{' '}
        <code className="font-mono text-sky">@careernote/react/icons-extra</code>
      </p>
      <div className="grid grid-cols-6 tablet:grid-cols-3 gap-4">
        {icons.map(([name, IconComp]) => (
          <div key={name} className="flex flex-col items-center gap-2 p-3 rounded-medium border border-border_gray2 bg-white100">
            <span className="flex items-center justify-center w-6 h-6 overflow-hidden"><IconComp /></span>
            <span className="text-detail text-gray700 text-center break-all">{name}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}

function CardSection() {
  return (
    <Section title="Cards (패턴)">
      <p className="text-body2 text-gray700 mb-4">
        <code className="font-mono text-sky">ActivityCard</code> — 활동 카드 껍데기 (미디어 칸 + 콘텐츠 칸,
        모바일 스택). 기능은 소비자 주입 — careernote-web ExperienceItem·career-pencil 활동 카드의 시각 정본
      </p>
      <div className="flex flex-col gap-4 max-w-[720px]">
        <ActivityCard
          media={<Icon name="image" size="lg" color="#C3C3CD" />}
          data-testid="catalog-activity-card"
        >
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Chip size="L" variant="soft" color="blue" className="font-semibold">회사 프로젝트</Chip>
              <span className="text-body2 font-medium text-gray600">2026.01 — 2026.08</span>
            </div>
            <div className="flex items-center gap-0.5">
              <IconButton aria-label="수정" onClick={() => {}}><Icon name="edit" size="md" /></IconButton>
              <IconButton aria-label="삭제" onClick={() => {}}><Icon name="delete" size="md" /></IconButton>
            </div>
          </div>
          <p className="text-subtitle2 font-semibold text-gray900 truncate">활동 제목</p>
          <p className="text-body2 text-gray700">활동 설명 텍스트가 들어갑니다.</p>
        </ActivityCard>
        <ActivityCard selected media={<Icon name="image" size="lg" color="#C3C3CD" />}>
          <p className="text-subtitle2 font-semibold text-gray900">선택된 카드 (selected)</p>
        </ActivityCard>
      </div>
      <h3 className="text-subtitle3 font-semibold text-gray800 mt-8 mb-2">SelectCard — 체크서클 선택 카드 (직업 선택 플로우)</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-[12px] max-w-[720px]">
        <SelectCard representative selected title="대표 직업">백엔드 개발</SelectCard>
        <SelectCard selected title="선택됨">데이터 분석가</SelectCard>
        <SelectCard title="기본">게임 기획자</SelectCard>
        <SelectCard title="긴 이름 말줄임">라이프스타일·뷰티·웰니스 매니저</SelectCard>
      </div>
      <h3 className="text-subtitle3 font-semibold text-gray800 mt-8 mb-2">StarGrid — STAR 2×2 요약 (활동 카드 본문)</h3>
      <div className="max-w-[720px]">
        <StarGrid
          star={{
            situation: '업무 맥락이 정리되지 않은 초기 단계에서 단편적인 정보만 주어졌습니다.',
            task: '입력을 이력서·포트폴리오에 적합한 형태로 다듬어야 했습니다.',
            action: '핵심 의도를 파악하고 문맥상 자연스러운 배경을 보완했습니다.',
            result: '일관된 품질의 활동 소개를 빠르게 산출했습니다.',
          }}
        />
      </div>
      <h3 className="text-subtitle3 font-semibold text-gray800 mt-8 mb-2">PlanCard + PlanFeature + RibbonBadge — 요금제 카드 (옵션 선택 플로우)</h3>
      <div className="flex flex-row items-stretch gap-[20px]">
        <PlanCard className="w-[300px]">
          <div className="flex flex-col gap-[12px] px-[12px]">
            <Chip size="L" color="black">Basic</Chip>
            <span className="text-[20px] font-bold leading-[24px] text-gray900">일반 포트폴리오</span>
            <span className="text-[16px] font-semibold leading-[20px] text-gray600">무료</span>
          </div>
          <div className="flex flex-col gap-[12px]">
            <PlanFeature emoji="📋" title="내 이력에 기반한 포트폴리오" description="AI가 내 이력을 분석해 강점을 찾아줘요." />
          </div>
        </PlanCard>
        <PlanCard selected className="w-[420px]">
          <RibbonBadge>
            <span className="text-[18px] font-semibold leading-[22px] text-white">합격률 35%</span>
          </RibbonBadge>
          <div className="flex flex-col gap-[12px] px-[12px]">
            <Chip size="L" color="sky">Fit</Chip>
            <span className="text-[20px] font-bold leading-[24px] text-gray900">선택된 카드 (selected)</span>
          </div>
          <div className="flex flex-col gap-[28px]">
            <PlanFeature layout="row" emoji="📆" title="row 레이아웃 기능 항목" description="이모지 옆에 텍스트가 배치됩니다." />
          </div>
        </PlanCard>
      </div>
    </Section>
  );
}

const CANDIDATE_CAREERS = [
  { company: '카카오 모빌리티', role: '디자이너', period: '24.12 ~ 현재' },
  { company: '커리어노트', role: '디자이너', period: '22.03 ~ 24.11' },
  { company: '삼성 전자', role: '디자이너', period: '20.01 ~ 22.02' },
];
const CANDIDATE_EDUCATION = { school: '홍익대학교', degree: '학사', major: '시각디자인', period: '16.03 ~ 21.02', status: '졸업' };
const CANDIDATE_SUMMARY =
  '이력서 기재 내용과 포트폴리오 결과물의 일관성이 높고, 성과를 정량적으로 서술해 업무 이해도가 높아 보임. 다음 단계 진행 추천';
const CANDIDATE_EXPERIENCES = [
  { title: '켈리 삼성역 옥외광고 진행', org: '삼성전자' },
  { title: '브랜드 리뉴얼 키비주얼 디자인', org: '카카오 모빌리티' },
];

function CandidateCardSection() {
  return (
    <Section title="ATS · Cards — 채용/인재풀 카드">
      <p className="text-body2 text-gray700 mb-4">
        <code className="font-mono text-sky">ApplicantCard</code> · <code className="font-mono text-sky">TalentpoolCard</code> ·{' '}
        <code className="font-mono text-sky">BoardCard</code> — Figma "채용/인재풀 카드 컴포넌트". 경력 2개 이상이면 arrow 클릭 시{' '}
        <code className="font-mono text-sky">CareerTooltip</code> 오버레이
      </p>
      <div className="flex flex-row flex-wrap items-start gap-6">
        <div className="w-[500px] flex flex-col gap-2">
          <h3 className="text-subtitle3 font-semibold text-gray800">ApplicantCard — 공고 지원자</h3>
          <ApplicantCard
            name="김민준"
            careerLabel="경력 8년"
            job="프론트엔드"
            fitness="high"
            status="접수"
            appliedAt="24.03.15"
            aiSummary={CANDIDATE_SUMMARY}
            careers={CANDIDATE_CAREERS}
            education={CANDIDATE_EDUCATION}
            experiences={CANDIDATE_EXPERIENCES}
            memo="2024.12.04 이메일 컨택"
            onStatusClick={() => {}}
            onExperienceClick={() => {}}
          />
        </div>
        <div className="w-[500px] flex flex-col gap-2">
          <h3 className="text-subtitle3 font-semibold text-gray800">TalentpoolCard — 인재풀</h3>
          <TalentpoolCard
            name="김민준"
            careerLabel="경력 8년"
            job="프론트엔드"
            updatedDaysAgo={20}
            aiSummary={CANDIDATE_SUMMARY}
            careers={CANDIDATE_CAREERS}
            education={CANDIDATE_EDUCATION}
            experience={CANDIDATE_EXPERIENCES[0]}
            onExperienceClick={() => {}}
          />
          <TalentpoolCard
            name="이서연"
            careerLabel="경력 3년"
            job="백엔드"
            updatedDaysAgo={45}
            aiSummary="30일 이상 업데이트 없음 → 업데이트 칩 black soft"
            careers={[CANDIDATE_CAREERS[0]]}
          />
        </div>
      </div>

      <h3 className="text-subtitle3 font-semibold text-gray800 mt-8 mb-2">BoardCard — 칸반보드 카드 (hover 시 sky 테두리 + 그림자)</h3>
      <div className="flex flex-row flex-wrap gap-4">
        <BoardCard name="김민준" careerLabel="경력 8년" fitness="high" onClick={() => {}} />
        <BoardCard name="박지우" careerLabel="경력 5년" fitness="normal" onClick={() => {}} />
        <BoardCard name="최하늘" careerLabel="신입" fitness="low" onClick={() => {}} />
        <BoardCard name="김민준" careerLabel="경력 8년" fitness="high" rejected onClick={() => {}} />
      </div>

      <h3 className="text-subtitle3 font-semibold text-gray800 mt-8 mb-2">부품 — ExperienceItem · CareerTooltip · ProfileAvatar</h3>
      <div className="flex flex-row flex-wrap items-start gap-6">
        <div className="w-[458px] flex flex-col gap-2">
          <ExperienceItem {...CANDIDATE_EXPERIENCES[0]} onClick={() => {}} />
          <ExperienceItem {...CANDIDATE_EXPERIENCES[1]} />
        </div>
        <div className="w-[458px]"><CareerTooltip careers={CANDIDATE_CAREERS} /></div>
        <div className="flex items-center gap-2">
          <ProfileAvatar name="김민준" />
          <ProfileAvatar name="이서연" size={40} />
        </div>
      </div>
    </Section>
  );
}

const FEED_DESC =
  '삼성역 옥외광고 집행을 위한 기획 프로젝트를 진행했습니다.\n현장 특성과 시간대별 유동 인구 흐름, 매체 노출 환경을 분석해 광고 콘셉트와 핵심 메시지를 설계했으며, 제작 가이드 정리부터 집행 일정 관리까지 전반을 담당했습니다.';
const FEED_RESULT =
  '커뮤니케이션 속도가 향상되고 주문 처리 과정에서의 오류가 줄어드는 성과를 거두었습니다. 현장 상황에 신속하게 대응할 수 있는 체계가 마련되어 업무 효율성이 크게 개선되었습니다.';
const feedImg = (seed: string) => `https://picsum.photos/seed/${seed}/600/400`;

function FeedSection() {
  const [tab, setTab] = useState('feed');
  const base = { name: '김민준', careerLabel: '경력 8년', job: '프론트엔드', updatedDaysAgo: 20, title: '켈리 삼성역 옥외광고 진행', description: FEED_DESC };
  return (
    <Section title="ATS · Feed — 인재 피드 (Figma 03 인재풀)">
      <p className="text-body2 text-gray700 mb-4">
        <code className="font-mono text-sky">PillTabs</code> 로 피드/목록 전환, <code className="font-mono text-sky">FeedCard</code> 는 대표 활동 1건을
        갤러리(0 · 1 · 2 · 3+장 레이아웃 자동) + 제목/설명 + STAR 성과 박스로 보여준다. 썸네일 클릭 시 내장 ImageLightbox
      </p>
      <PillTabs
        items={[
          { value: 'feed', label: '인재 피드' },
          { value: 'pool', label: '인재풀', count: 12 },
        ]}
        value={tab}
        onChange={setTab}
        className="mb-6"
      />
      <div className="grid grid-cols-3 gap-4 items-start p-6 rounded-xlarge bg-bg_gray1">
        <div className="flex flex-col gap-5">
          <FeedCard {...base} images={[feedImg('a1'), feedImg('a2'), feedImg('a3'), feedImg('a4'), feedImg('a5')]} result={FEED_RESULT} onClick={() => {}} />
          <FeedCard {...base} name="이서연" updatedDaysAgo={45} images={[feedImg('b1'), feedImg('b2')]} onClick={() => {}} />
        </div>
        <div className="flex flex-col gap-5">
          <FeedCard {...base} images={[feedImg('c1')]} result="커뮤니케이션 속도가 향상되고 주문 처리 과정에서의 오류가 줄어드는 성과를 거두었습니다." onClick={() => {}} />
          <FeedCard {...base} name="박지우" result={FEED_RESULT} onClick={() => {}} />
        </div>
        <div className="flex flex-col gap-5">
          <FeedCard {...base} images={[feedImg('d1'), feedImg('d2'), feedImg('d3')]} result={FEED_RESULT} onClick={() => {}} />
        </div>
      </div>
    </Section>
  );
}

function SidebarSection() {
  const [menu, setMenu] = useState('jobs');
  return (
    <Section title="ATS · Sidebar — 사이드 메뉴바">
      <p className="text-body2 text-gray700 mb-4">
        <code className="font-mono text-sky">Sidebar</code> + <code className="font-mono text-sky">SidebarMenuItem</code>(default/mini, selected, hover = selected 룩) +{' '}
        <code className="font-mono text-sky">SidebarAccount</code> — Figma "사이드메뉴바". 로고는 <code className="font-mono text-sky">@careernote/assets</code> on-dark 가로형을 slot 으로 전달
      </p>
      <div className="flex flex-row flex-wrap items-start gap-8">
        <div className="flex flex-col gap-2">
          <h3 className="text-subtitle3 font-semibold text-gray800">Sidebar — 조립 예시 (클릭으로 선택 이동)</h3>
          <Sidebar
            className="h-[640px] rounded-large overflow-hidden"
            logo={<img src={logoDark} alt="CareerNote" className="h-6 w-auto" />}
            footer={<SidebarAccount name="달바코리아" email="kimeujin.careernote@gmail.com" onClick={() => {}} />}
          >
            <SidebarMenuItem label="인재풀" icon="user2" selected={menu === 'talent'} onClick={() => setMenu('talent')} />
            <SidebarMenuItem label="공고 / 채용 현황" icon="text" selected={menu === 'jobs' || menu.startsWith('jobs-')} onClick={() => setMenu('jobs')}>
              <SidebarMenuItem variant="mini" label="전체 공고" selected={menu === 'jobs-all'} onClick={() => setMenu('jobs-all')} />
              <SidebarMenuItem variant="mini" label="전체 캘린더" selected={menu === 'jobs-calendar'} onClick={() => setMenu('jobs-calendar')} />
            </SidebarMenuItem>
          </Sidebar>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-subtitle3 font-semibold text-gray800">SidebarMenuItem — 상태별</h3>
          <div className="w-60 flex flex-col gap-2 p-4 rounded-large bg-gray900">
            <span className="text-detail text-gray600">default</span>
            <SidebarMenuItem label="인재풀" icon="user2" />
            <span className="text-detail text-gray600">default · selected</span>
            <SidebarMenuItem label="공고 / 채용 현황" icon="text" selected />
            <span className="text-detail text-gray600">mini</span>
            <SidebarMenuItem variant="mini" label="전체 공고" />
            <span className="text-detail text-gray600">mini · selected</span>
            <SidebarMenuItem variant="mini" label="전체 공고" selected />
          </div>
          <h3 className="text-subtitle3 font-semibold text-gray800 mt-4">SidebarAccount</h3>
          <div className="w-60 p-4 rounded-large bg-gray900">
            <SidebarAccount name="달바코리아" email="kimeujin.careernote@gmail.com" />
          </div>
        </div>
      </div>
    </Section>
  );
}

const DETAIL_BODY =
  '삼성역 옥외광고 집행을 위한 기획 프로젝트를 진행했습니다.\n현장 특성과 시간대별 유동 인구 흐름, 매체 노출 환경을 분석해 광고 콘셉트와 핵심 메시지를 설계했으며, 제작 가이드 정리부터 집행 일정 관리까지 전반을 담당했습니다. 특히 실제 시야각과 이동 동선을 기준으로 메시지 가독성과 시인성을 반복적으로 점검하고 수정·보완하며 완성도를 높였습니다.\n그 결과 광고는 일평균 수만 명에게 노출되었으며, 주요 동선 내에서 안정적인 노출 효과를 확보해 브랜드 인지도 제고에 기여했습니다.';
const DETAIL_RESULT =
  '커뮤니케이션 속도가 향상되고 주문 처리 과정에서의 오류가 줄어드는 성과를 거두었습니다. 현장 상황에 신속하게 대응할 수 있는 체계가 마련되어 업무 효율성이 크게 개선되었고, 고객 만족도 향상에도 긍정적인 영향을 미쳤습니다.';
const DETAIL_SKILLS = ['TypeScript', 'ReactJS', 'ElasticSearch', 'Redis', 'AWS'];
const DETAIL_SUMMARY = [
  { title: 'AI 투자 콘텐츠 서비스 기획·개발', description: 'AI 에이전트 기반 기업분석 리포트 서비스를 직접 기획·개발해 누적 방문자 1,400명과 회원 60명을 확보하고 매출이 2배로 올랐어요.' },
  { title: '업무 자동화로 성과를 만든 문제 해결가', description: '업무 자동화를 활용해 데이터 정제와 거래내역 처리 시간을 단축하고 추가 수탁 100억 원 유치에 기여했어요.' },
  { title: '금융 영업과 자산운용 실무 역량', description: '기업금융과 자산운용 업무를 수행하며 고객 영업, 세미나 기획, 투자자문 및 운용지원 경험을 쌓았어요.' },
];
const DETAIL_IMAGES = ['', '', '', ''];

function DetailSection() {
  const activity = (id: string, withImages = false, withComments = false) => ({
    id,
    title: '켈리 삼성역 옥외광고 진행',
    period: '2024. 05 - 2026. 01',
    images: withImages ? DETAIL_IMAGES : undefined,
    skills: DETAIL_SKILLS,
    body: DETAIL_BODY,
    result: DETAIL_RESULT,
    comments: withComments ? [{ role: '개발자', text: '디테일에 강하고 일정을 잘 지켜줘서 신뢰가 가요.' }, { role: '디자이너', text: '디테일에 강하고 일정을 잘 지켜줘서 신뢰가 가요.' }] : undefined,
  });
  return (
    <Section title="ATS · Detail — 지원자/인재 상세페이지">
      <p className="text-body2 text-gray700 mb-4">
        <code className="font-mono text-sky">CandidateDetail</code> — 데이터만 넘기면 조립되는 상세페이지. 부품:{' '}
        <code className="font-mono text-sky">AttachmentBar</code> · <code className="font-mono text-sky">CandidateHeader</code>(ProfileHero+CandidateIntro) ·{' '}
        <code className="font-mono text-sky">ProfileSummary</code> · <code className="font-mono text-sky">HistoryEntry</code>+<code className="font-mono text-sky">ActivityDetail</code> ·{' '}
        <code className="font-mono text-sky">SkillSection</code> · <code className="font-mono text-sky">ProfileItemSection</code>(SectionLabel+ProfileItem). 세부 커스텀은 부품을 직접 조립
      </p>
      <CandidateDetail
        className="border border-border_gray"
        answers={DETAIL_ANSWERS as unknown as React.ComponentProps<typeof CandidateDetail>['answers']}
        attachments={[
          { kind: 'file', label: '이력서 김민준_이력서.pdf', onClick: () => {} },
          { kind: 'clip', label: '첨부파일 김민준_포트폴리오_2025.pdf', onClick: () => {} },
          { kind: 'star', label: '커리어노트 포트폴리오', onClick: () => {} },
        ]}
        header={{
          name: '김민준',
          role: '백엔드 개발자',
          slogan: '7년 경력의 풀스택 개발자로, 사용자 경험을 최우선으로 생각합니다.',
          introduction: '애플리케이션을 설계하고 구축하며, 서비스 요구사항을 분석해 안정적이고 확장 가능한 구조를 구현합니다. React와 TypeScript, Node.js에 대한 깊은 이해를 바탕으로 프론트엔드부터 백엔드까지 전반적인 개발을 주도해왔습니다.\n또한 팀 리더로서 협업 문화를 조성하고, 주니어 개발자 멘토링과 코드 리뷰를 통해 팀의 기술 역량과 생산성을 함께 성장시킨 경험이 풍부합니다.',
          contacts: [
            { type: 'phone', value: '010 1234 5678' },
            { type: 'email', value: 'minjunkim@gmail.com' },
            { type: 'website', value: 'minjunkim.dev', href: 'https://minjunkim.dev' },
          ],
        }}
        onEditProfile={() => {}}
        summary={DETAIL_SUMMARY}
        histories={[
          { name: '아이엠디티', role: '개발 팀원', period: '2024. 05 - 2026. 01 · 1년 9월', activities: [activity('1', true, true), activity('2')] },
          { type: 'education', name: '홍익대학교', role: '시각디자인', period: '2024. 05 - 2026. 01 · 1년 9월', activities: [activity('3')] },
        ]}
        skills={['Photoshop', 'SQL', 'C#', 'Photoshop', 'Figma']}
        awards={[
          { title: 'IF 디자인 대상', sub: 'IF design', date: '2024.03' },
          { title: '블록체인 해커톤 3등', sub: 'Trone community', date: '2022.08' },
          { title: '디자인 대회 입상', sub: 'Korea design', date: '2022.08' },
        ]}
        certifications={[
          { title: '운전면허증 2종', sub: '경찰청', date: '2024.03' },
          { title: 'SQL 전문가 자격증', sub: '한국데이터 베이스진흥원', date: '2024.03' },
        ]}
        languages={[
          { title: '중국어', sub: '일상회화 가능' },
          { title: '영어', sub: '기초회화 가능' },
        ]}
      />

      <h3 className="text-subtitle3 font-semibold text-gray800 mt-8 mb-2">ApplicantEvaluationPanel — 지원자평가 모달 본문 (모달 껍데기는 소비자가 감싼다)</h3>
      <div className="inline-block p-4 rounded-xlarge bg-bg_gray1">
        <ApplicantEvaluationPanel
          fitLabel="높음"
          evaluation={[
            '경력기술서상 담당 업무와 사용 툴이 공고 요구사항과 대부분 일치하며, 최근 프로젝트 경험이 최신 기술 스택과도 맞닿아 있어 우선순위 높게 검토',
            '이력서 기재 내용과 포트폴리오 결과물의 일관성이 높고, 성과를 정량적으로 서술해 업무 이해도가 높아 보임. 다음 단계 진행 추천',
            '이력서 기재 내용과 포트폴리오 결과물의 일관성이 높고, 성과를 정량적으로 서술해 업무 이해도가 높아 보임. 다음 단계 진행 추천',
          ]}
          summary={DETAIL_SUMMARY}
          fitActivities={[
            { id: '1', title: '켈리 삼성역 옥외광고 진행', org: '삼성전자' },
            { id: '2', title: '켈리 삼성역 옥외광고 진행', org: '삼성전자' },
            { id: '3', title: '켈리 삼성역 옥외광고 진행', org: '삼성전자' },
          ]}
          onFitActivityClick={() => {}}
          requirements={[
            { text: '앱/웹 디자인 경력 5년 이상 혹은 이에 준하는 실무 능력 보유자', status: 'met' },
            { text: '사용자 관점과 비즈니스 이해를 바탕으로 UX를 설계하고 실제 런칭 경험이 있는 분', status: 'met' },
            { text: 'REST API, 인증/인가, 데이터 흐름에 대한 기본 이해가 있는 분', status: 'met' },
            { text: 'Git(GitHub, GitLab 등) 기반 협업 경험이 있는 분', status: 'met' },
            { text: 'Claude Code, GitHub Copilot 등 AI 기반 개발 도구 활용에 익숙한 분', status: 'unmet' },
            { text: 'React/Vue 등을 이용한 서비스 개발/운영 경험이 있는 분', status: 'unmet' },
          ]}
          preferences={[
            { text: '대규모 서비스 개발 프로젝트에서 프론트엔드 성능 최적화 경험이 있는 분' },
            { text: 'CI/CD를 통해 테스트/빌드/배포 경험이 있는 분' },
          ]}
        />
      </div>
    </Section>
  );
}

const SYMBOL_SIZES = [20, 24, 32, 48, 64];
const LOGO_SIZES = [22, 34, 48, 68];

function BrandSection() {
  return (
    <Section title="Brand">
      <p className="text-body2 text-gray700 mb-6">
        로고는 <code className="font-mono text-detail bg-bg_gray1 px-1 rounded-small">@careernote/assets</code> 의 파일을 그대로 씁니다.
        도형·텍스트로 다시 그리지 않고, 비율과 색은 바꾸지 않습니다.
      </p>

      <h3 className="text-subtitle3 font-semibold text-gray800 mb-3">기본 — 심볼 (아이콘 단독)</h3>
      <div className="flex flex-wrap items-end gap-8 rounded-medium border border-border_gray bg-white100 p-8 mb-2">
        {SYMBOL_SIZES.map((h) => (
          <div key={h} className="flex flex-col items-center gap-2">
            <img src={symbol} alt="CareerNote" style={{ height: h, width: h }} />
            <span className="text-detail text-gray600 font-mono">{h}px</span>
          </div>
        ))}
      </div>
      <p className="text-detail text-gray600 mb-2 font-mono">logo/careernote-symbol.svg · 1:1 · 벡터</p>
      <p className="text-body2 text-gray700 mb-6">
        이름을 함께 보여야 하는 자리에서만 아래 가로형을 씁니다.
      </p>

      <h3 className="text-subtitle3 font-semibold text-gray800 mb-3">가로형 (밝은 배경)</h3>
      <div className="rounded-medium border border-border_gray bg-white100 p-8 mb-2">
        <img src={logoLight} alt="CareerNote" className="h-[34px] w-auto" />
      </div>
      <p className="text-detail text-gray600 mb-6 font-mono">logo/careernote-logo.png · 283×34</p>

      <h3 className="text-subtitle3 font-semibold text-gray800 mb-3">가로형 (어두운 배경)</h3>
      <div className="rounded-medium bg-gray900 p-8 mb-2">
        <img src={logoDark} alt="CareerNote" className="h-[34px] w-auto" />
      </div>
      <p className="text-detail text-gray600 mb-6 font-mono">logo/careernote-logo-on-dark.png · 377×45</p>

      <h3 className="text-subtitle3 font-semibold text-gray800 mb-3">가로형 크기</h3>
      <div className="flex flex-wrap items-end gap-8 rounded-medium border border-border_gray bg-white100 p-8 mb-6">
        {LOGO_SIZES.map((h) => (
          <div key={h} className="flex flex-col items-center gap-2">
            <img src={logoLight} alt="CareerNote" style={{ height: h }} className="w-auto" />
            <span className="text-detail text-gray600 font-mono">{h}px</span>
          </div>
        ))}
      </div>

      <h3 className="text-subtitle3 font-semibold text-gray800 mb-3">사용</h3>
      <pre className="rounded-medium bg-bg_gray1 p-4 text-detail font-mono text-gray800 overflow-x-auto mb-6">
{`import symbol from '@careernote/assets/logo/careernote-symbol.svg'   // 기본
<img src={symbol} alt="CareerNote" className="size-6" />

import logo from '@careernote/assets/logo/careernote-logo.png'       // 가로형
<img src={logo} alt="CareerNote" className="h-[22px] w-auto" />

// 파일 import 가 불가능한 환경(캔버스 엔진·헤드리스)
import symbolData from '@careernote/assets/logo/careernote-symbol.base64.json'`}
      </pre>

      <h3 className="text-subtitle3 font-semibold text-gray800 mb-3">금지</h3>
      <ul className="text-body2 text-gray700 list-disc pl-5 flex flex-col gap-1">
        <li>도형·텍스트·아이콘 조합으로 로고를 다시 그리기</li>
        <li>비율 변경, 색 변경, 회전, 그림자 추가</li>
        <li>어두운 배경에 밝은 배경용 가로형을 그대로 얹기 (on-dark 파일을 쓸 것)</li>
        <li>심볼을 잘라 쓰거나 배경 사각형만 따로 쓰기</li>
      </ul>
    </Section>
  );
}

const NAV = [
  { id: 'brand', label: 'Brand', el: <BrandSection /> },
  { id: 'colors', label: 'Colors', el: <ColorSection /> },
  { id: 'typography', label: 'Typography', el: <TypographySection /> },
  { id: 'surface', label: 'Radius & Shadow', el: <SurfaceSection /> },
  { id: 'buttons', label: 'Buttons', el: <ButtonSection /> },
  { id: 'chips', label: 'Chips', el: <ChipSection /> },
  { id: 'inputs', label: 'Inputs', el: <InputSection /> },
  { id: 'feedback', label: 'Feedback & Overlays', el: <FeedbackSection /> },
  { id: 'navigation', label: 'Navigation', el: <NavigationSection /> },
  { id: 'cards', label: 'Cards', el: <CardSection /> },
  {
    id: 'ats',
    label: 'ATS',
    children: [
      { id: 'ats-sidebar', label: 'Sidebar', el: <SidebarSection /> },
      { id: 'ats-cards', label: 'Cards', el: <CandidateCardSection /> },
      { id: 'ats-feed', label: 'Feed', el: <FeedSection /> },
      { id: 'ats-detail', label: 'Detail', el: <DetailSection /> },
    ],
  },
  { id: 'icons', label: 'Icons', el: <IconSection /> },
  { id: 'icons-extra', label: 'Icons Extra', el: <ExtraIconSection /> },
];

type NavLeaf = { id: string; label: string; el: React.ReactNode };
type NavItem = NavLeaf | { id: string; label: string; children: NavLeaf[] };
const NAV_LEAVES: NavLeaf[] = (NAV as NavItem[]).flatMap((n) => ('children' in n ? n.children : [n]));

const DETAIL_ANSWERS = [
  { label: '거주지를 입력해주세요.', kind: 'short', text: '서울시 성북구 보문동' },
  {
    label: '간단한 자기소개를 작성해주세요.',
    kind: 'long',
    text: '안녕하세요. 고객의 행동을 이해하고, 데이터를 바탕으로 더 나은 결과를 만들어가는 마케터입니다.\n새로운 프로젝트를 시작할 때 "무엇을 할 것인가"보다 "누구에게, 왜 필요한가"를 먼저 고민하는 편입니다.',
  },
  { label: '파일을 첨부해주세요.', kind: 'file', files: [{ name: '첨부파일 김민준_포트폴리오_2025.pdf', url: '#' }] },
  { label: '지원 루트를 선택해주세요.', kind: 'choice', choices: ['잡코리아', '사람인'] },
] as const;

export default function App() {
  const [active, setActive] = useState('brand');
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const current = NAV_LEAVES.find((n) => n.id === active) ?? NAV_LEAVES[0];
  const leafClass = (id: string, sub = false) =>
    `text-left py-2 rounded-small text-body2 transition-colors ${sub ? 'pl-8 pr-3' : 'px-3'} ${
      active === id ? 'bg-sky_bg text-sky font-semibold' : 'text-gray800 font-medium hover:bg-bg_gray2'
    }`;
  return (
    <div className="flex min-h-screen">
      <aside className="w-60 shrink-0 border-r border-border_gray bg-white100 px-4 py-8 fixed top-0 bottom-0 left-0 overflow-y-auto">
        <h1 className="text-subtitle2 font-bold text-gray900 px-3">
          CareerNote
          <span className="block text-detail font-medium text-gray700 mt-0.5">Design System</span>
        </h1>
        <nav className="mt-6 flex flex-col gap-0.5">
          {(NAV as NavItem[]).map((item) =>
            'children' in item ? (
              <div key={item.id} className="flex flex-col gap-0.5">
                <button
                  onClick={() => setOpen((o) => ({ ...o, [item.id]: !o[item.id] }))}
                  aria-expanded={!!open[item.id]}
                  className={`flex items-center justify-between px-3 py-2 rounded-small text-body2 font-medium transition-colors hover:bg-bg_gray2 ${
                    item.children.some((c) => c.id === active) ? 'text-sky' : 'text-gray800'
                  }`}
                >
                  {item.label}
                  <Icon name="arrow-down" size={16} className={`transition-transform ${open[item.id] ? 'rotate-180' : ''}`} />
                </button>
                {open[item.id] &&
                  item.children.map((c) => (
                    <button key={c.id} onClick={() => setActive(c.id)} className={leafClass(c.id, true)}>
                      {c.label}
                    </button>
                  ))}
              </div>
            ) : (
              <button key={item.id} onClick={() => setActive(item.id)} className={leafClass(item.id)}>
                {item.label}
              </button>
            ),
          )}
        </nav>
        <a href="./vue/" className="mt-8 mx-3 inline-block text-detail text-sky hover:underline">
          ↗ Vue 카탈로그
        </a>
        <p className="mt-2 px-3 text-detail text-gray600 leading-4">
          정본: @careernote/tokens
          <br />
          @careernote/react
        </p>
      </aside>
      <main className="ml-60 flex-1 px-10 py-10 max-w-[1080px]">{current.el}</main>
    </div>
  );
}
