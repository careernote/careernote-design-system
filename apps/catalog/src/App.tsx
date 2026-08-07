import React, { useState } from 'react';
import * as DS from '@careernote/react';
import * as ExtraIcons from '@careernote/react/icons-extra';
import { iconMap } from '@careernote/react';
import tokens from '@careernote/tokens/tokens.json';

const {
  Button,
  ToggleButton,
  Chip,
  Badge,
  TextInput,
  Textarea,
  Selector,
  Alert,
  Modal,
  Information,
  NumberBadge,
  Tooltip,
  ProgressBarItem,
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
        <div className="flex items-center gap-3">
          <span className="text-detail text-gray700">disabled</span>
          <Button color="sky" disabled onClick={noop}>disabled</Button>
          <span className="text-detail text-gray700 ml-6">ToggleButton</span>
          <ToggleButton checked={on} onChange={setOn} />
          <ToggleButton checked={!on} onChange={() => setOn(!on)} size="sm" />
        </div>
      </div>
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
    </Section>
  );
}

function InputSection() {
  const [sel, setSel] = useState('');
  return (
    <Section title="Inputs">
      <div className="grid grid-cols-2 tablet:grid-cols-1 gap-6 max-w-[720px]">
        <TextInput label="라벨" sublabel="서브라벨" placeholder="텍스트를 입력하세요" essential />
        <TextInput label="에러 상태" placeholder="값" errorMessage="에러 메시지입니다" />
        <Textarea label="Textarea" placeholder="여러 줄 입력" />
        <Selector
          label="Selector"
          placeholder="선택하세요"
          value={sel}
          options={['옵션 A', '옵션 B', '옵션 C']}
          onChange={setSel}
        />
      </div>
    </Section>
  );
}

function FeedbackSection() {
  const [alertOpen, setAlertOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <Section title="Feedback & Overlays">
      <div className="flex items-center gap-3 mb-6">
        <Button color="black" onClick={() => setAlertOpen(true)}>Alert 열기</Button>
        <Button color="sky" onClick={() => setModalOpen(true)}>Modal 열기</Button>
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
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="모달 제목"
        subtitle="모달 서브타이틀"
        description="모달 설명 텍스트입니다."
        primaryButton={{ label: '확인', onClick: () => setModalOpen(false) }}
        secondaryButton={{ label: '취소', onClick: () => setModalOpen(false) }}
      />
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
  return (
    <Section title="Navigation">
      <div className="flex items-center gap-6">
        <ProgressBarItem status="complete" text="완료 단계" number={1} />
        <ProgressBarItem status="editing" text="진행 중 단계" number={2} />
        <ProgressBarItem status="waiting" text="대기 단계" number={3} />
      </div>
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

const NAV = [
  { id: 'colors', label: 'Colors', el: <ColorSection /> },
  { id: 'typography', label: 'Typography', el: <TypographySection /> },
  { id: 'surface', label: 'Radius & Shadow', el: <SurfaceSection /> },
  { id: 'buttons', label: 'Buttons', el: <ButtonSection /> },
  { id: 'chips', label: 'Chips', el: <ChipSection /> },
  { id: 'inputs', label: 'Inputs', el: <InputSection /> },
  { id: 'feedback', label: 'Feedback & Overlays', el: <FeedbackSection /> },
  { id: 'navigation', label: 'Navigation', el: <NavigationSection /> },
  { id: 'icons', label: 'Icons', el: <IconSection /> },
  { id: 'icons-extra', label: 'Icons Extra', el: <ExtraIconSection /> },
];

export default function App() {
  const [active, setActive] = useState('colors');
  const current = NAV.find((n) => n.id === active) ?? NAV[0];
  return (
    <div className="flex min-h-screen">
      <aside className="w-60 shrink-0 border-r border-border_gray bg-white100 px-4 py-8 fixed top-0 bottom-0 left-0 overflow-y-auto">
        <h1 className="text-subtitle2 font-bold text-gray900 px-3">
          CareerNote
          <span className="block text-detail font-medium text-gray700 mt-0.5">Design System</span>
        </h1>
        <nav className="mt-6 flex flex-col gap-0.5">
          {NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`text-left px-3 py-2 rounded-small text-body2 transition-colors ${
                active === item.id
                  ? 'bg-sky_bg text-sky font-semibold'
                  : 'text-gray800 font-medium hover:bg-bg_gray2'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <p className="mt-8 px-3 text-detail text-gray600 leading-4">
          정본: @careernote/tokens
          <br />
          @careernote/react
        </p>
      </aside>
      <main className="ml-60 flex-1 px-10 py-10 max-w-[1080px]">{current.el}</main>
    </div>
  );
}
