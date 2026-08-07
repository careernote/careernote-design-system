import React, { useState } from 'react';
import * as DS from '@careernote/react';
import * as ExtraIcons from '@careernote/react/icons-extra';
import { iconMap } from '@careernote/react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Checkbox,
  RadioGroup,
  RadioGroupItem,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Button as ShadcnButton,
} from '@careernote/react/ui';
import tokens from '@careernote/tokens/tokens.json';

const {
  Button,
  ToggleButton,
  Chip,
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
    <section className="mb-60">
      <h2 className="text-title2 font-bold text-gray900 mb-24 pb-8 border-b border-border_gray">{title}</h2>
      {children}
    </section>
  );
}

function Swatch({ name, value }: { name: string; value: string }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="w-full h-[64px] rounded-medium border border-border_gray" style={{ background: value }} />
      <div className="text-detail font-semibold text-gray900">{name}</div>
      <div className="text-detail text-gray700 font-mono">{value}</div>
    </div>
  );
}

function ColorSection() {
  return (
    <Section title="Colors">
      {Object.entries(tokens.color).map(([group, colors]) => (
        <div key={group} className="mb-24">
          <h3 className="text-subtitle3 font-semibold text-gray800 mb-12 capitalize">{group}</h3>
          <div className="grid grid-cols-3 tablet:grid-cols-2 md:grid-cols-6 gap-16">
            {Object.entries(colors as Record<string, string>).map(([name, value]) => (
              <Swatch key={name} name={name} value={value} />
            ))}
          </div>
        </div>
      ))}
      <h3 className="text-subtitle3 font-semibold text-gray800 mb-12">Gradients</h3>
      <div className="grid grid-cols-2 gap-16">
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
      <div className="flex flex-col gap-12">
        {Object.entries(tokens.typography.fontSize).map(([name, v]) => (
          <div key={name} className="flex items-baseline gap-24">
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
      <div className="flex gap-16 flex-wrap mb-24">
        {Object.entries(tokens.radius).map(([name, value]) => (
          <div key={name} className="flex flex-col items-center gap-4">
            <div className="w-[80px] h-[56px] bg-sky_bg border border-sky" style={{ borderRadius: value }} />
            <span className="text-detail text-gray700">{name} · {value}</span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-4 tablet:grid-cols-2 gap-24">
        {Object.entries(tokens.shadow).map(([name, value]) => (
          <div key={name} className="flex flex-col items-center gap-8 py-16">
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
      <div className="flex flex-col gap-16">
        {sizes.map((size) => (
          <div key={size} className="flex items-center gap-12 flex-wrap">
            <span className="w-[40px] text-detail text-gray700 font-mono">{size}</span>
            {colors.map((color) => (
              <Button key={color} size={size} color={color} onClick={noop}>
                {color}
              </Button>
            ))}
          </div>
        ))}
        <div className="flex items-center gap-12">
          <span className="text-detail text-gray700">disabled</span>
          <Button color="sky" disabled onClick={noop}>disabled</Button>
          <span className="text-detail text-gray700 ml-24">ToggleButton</span>
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
        <div key={variant} className="mb-16">
          <h3 className="text-subtitle3 font-semibold text-gray800 mb-8">{variant}</h3>
          {sizes.map((size) => (
            <div key={size} className="flex items-center gap-8 mb-8 flex-wrap">
              <span className="w-[24px] text-detail text-gray700 font-mono">{size}</span>
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
      <div className="grid grid-cols-2 tablet:grid-cols-1 gap-24 max-w-[720px]">
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
      <div className="flex items-center gap-12 mb-24">
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
      <div className="flex flex-col gap-12 max-w-[560px]">
        <Information type="positive" title="긍정 안내" subtext="positive 정보 문구" />
        <Information type="negative" title="경고 안내" subtext="negative 정보 문구" />
        <Information type="normal" title="일반 안내" subtext="normal 정보 문구" />
      </div>
      <div className="flex items-center gap-24 mt-24">
        <span className="text-detail text-gray700">NumberBadge</span>
        {[1, 2, 3].map((n) => (
          <NumberBadge key={n} number={n} />
        ))}
        <div className="relative ml-40">
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
      <div className="flex items-center gap-24">
        <ProgressBarItem status="complete" text="완료 단계" number={1} />
        <ProgressBarItem status="editing" text="진행 중 단계" number={2} />
        <ProgressBarItem status="waiting" text="대기 단계" number={3} />
      </div>
    </Section>
  );
}

function ShadcnSection() {
  const [checked, setChecked] = useState(true);
  return (
    <Section title="Shadcn Layer (ui/*)">
      <p className="text-body2 text-gray700 mb-16">
        Radix 기반 제2 레이어 — <code className="font-mono text-sky">@careernote/react/ui</code> (18종:
        Accordion · AlertDialog · AspectRatio · Button · Card · Carousel · Checkbox · DropdownMenu · Pagination ·
        Popover · RadioGroup · ScrollArea · Selector · Table · Tabs 등)
      </p>
      <div className="grid grid-cols-2 tablet:grid-cols-1 gap-24 max-w-[720px]">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="a">
            <AccordionTrigger>Accordion 항목</AccordionTrigger>
            <AccordionContent>펼쳐지는 내용입니다.</AccordionContent>
          </AccordionItem>
        </Accordion>
        <Tabs defaultValue="one">
          <TabsList>
            <TabsTrigger value="one">탭 1</TabsTrigger>
            <TabsTrigger value="two">탭 2</TabsTrigger>
          </TabsList>
          <TabsContent value="one" className="text-body2 text-gray700">첫 번째 탭 내용</TabsContent>
          <TabsContent value="two" className="text-body2 text-gray700">두 번째 탭 내용</TabsContent>
        </Tabs>
        <div className="flex items-center gap-12">
          <Checkbox checked={checked} onCheckedChange={(v) => setChecked(v === true)} id="cb" />
          <label htmlFor="cb" className="text-body2 text-gray800">Checkbox</label>
          <RadioGroup defaultValue="r1" className="flex items-center gap-12 ml-24">
            <RadioGroupItem value="r1" id="r1" />
            <label htmlFor="r1" className="text-body2 text-gray800">라디오 A</label>
            <RadioGroupItem value="r2" id="r2" />
            <label htmlFor="r2" className="text-body2 text-gray800">라디오 B</label>
          </RadioGroup>
        </div>
        <div className="flex items-center gap-12">
          <ShadcnButton>shadcn Button</ShadcnButton>
          <ShadcnButton variant="outline">outline</ShadcnButton>
          <ShadcnButton variant="destructive">destructive</ShadcnButton>
        </div>
      </div>
    </Section>
  );
}

function IconSection() {
  const entries = Object.entries(iconMap) as Array<[string, React.ComponentType<{ size?: number }>]>;
  return (
    <Section title={`Icons — iconMap (${entries.length})`}>
      <p className="text-body2 text-gray700 mb-16">
        <code className="font-mono text-sky">{'<Icon name="..." />'}</code> 로 사용. 이름이 곧 API.
      </p>
      <div className="grid grid-cols-6 tablet:grid-cols-3 gap-16">
        {entries.map(([name, IconComp]) => (
          <div key={name} className="flex flex-col items-center gap-8 p-12 rounded-medium border border-border_gray2 bg-white100">
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
      <p className="text-body2 text-gray700 mb-16">
        design-system 밖 <code className="font-mono text-sky">src/icons</code> 이관분 —{' '}
        <code className="font-mono text-sky">@careernote/react/icons-extra</code>
      </p>
      <div className="grid grid-cols-6 tablet:grid-cols-3 gap-16">
        {icons.map(([name, IconComp]) => (
          <div key={name} className="flex flex-col items-center gap-8 p-12 rounded-medium border border-border_gray2 bg-white100">
            <span className="flex items-center justify-center w-[24px] h-[24px] overflow-hidden"><IconComp /></span>
            <span className="text-detail text-gray700 text-center break-all">{name}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}

export default function App() {
  return (
    <div className="max-w-[1080px] mx-auto px-32 py-40">
      <header className="mb-40">
        <h1 className="text-title1 font-bold text-gray900">CareerNote Design System</h1>
        <p className="text-body1 text-gray700 mt-8">
          정본: <code className="font-mono text-sky">@careernote/tokens</code> ·{' '}
          <code className="font-mono text-sky">@careernote/react</code> — careernote-web / career-pencil 공용
        </p>
      </header>
      <ColorSection />
      <TypographySection />
      <SurfaceSection />
      <ButtonSection />
      <ChipSection />
      <InputSection />
      <FeedbackSection />
      <NavigationSection />
      <ShadcnSection />
      <IconSection />
      <ExtraIconSection />
    </div>
  );
}
