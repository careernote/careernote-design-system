<script setup lang="ts">
import { ref } from 'vue'
import {
  Button, ButtonRound, ToggleButton, AddDashedButton, IconButton,
  Chip, CategoryChip, SelectCard, Badge, NumberBadge, Tooltip, Information, ActivityCard,
  TextInput, Textarea, Selector, Modal, InHeader, HeaderMenuItem, ProgressBarItem,
  Icon, ICON_NAME_MAP,
} from '@careernote/vue'
import tokens from '@careernote/tokens/tokens.json'

const NAV = [
  { id: 'colors', label: 'Colors' },
  { id: 'typography', label: 'Typography' },
  { id: 'surface', label: 'Radius & Shadow' },
  { id: 'buttons', label: 'Buttons' },
  { id: 'chips', label: 'Chips' },
  { id: 'inputs', label: 'Inputs' },
  { id: 'feedback', label: 'Feedback & Overlays' },
  { id: 'navigation', label: 'Navigation' },
  { id: 'cards', label: 'Cards' },
  { id: 'icons', label: 'Icons' },
] as const

const active = ref<(typeof NAV)[number]['id']>('colors')
const toggleOn = ref(true)
const inputVal = ref('')
const selVal = ref('')
const modalOpen = ref(false)
const iconNames = Object.keys(ICON_NAME_MAP)
</script>

<template>
  <div class="flex min-h-screen">
    <aside class="w-[240px] shrink-0 border-r border-border-gray bg-white100 px-4 py-8 fixed top-0 bottom-0 left-0 overflow-y-auto">
      <h1 class="text-subtitle2 font-bold text-gray900 px-3">
        CareerNote
        <span class="block text-detail font-medium text-gray700 mt-0.5">Design System · Vue</span>
      </h1>
      <nav class="mt-6 flex flex-col gap-0.5">
        <button
          v-for="item in NAV"
          :key="item.id"
          type="button"
          class="text-left px-3 py-2 rounded-small text-body2 transition-colors"
          :class="active === item.id ? 'bg-sky-bg text-sky font-semibold' : 'text-gray800 font-medium hover:bg-bg-gray2'"
          @click="active = item.id"
        >
          {{ item.label }}
        </button>
      </nav>
      <a href="../" class="mt-8 mx-3 inline-block text-detail text-sky hover:underline">↗ React 카탈로그</a>
      <p class="mt-2 px-3 text-detail text-gray600 leading-4">정본: @careernote/vue<br />(React 스펙과 클래스 동일)</p>
    </aside>

    <main class="ml-[240px] flex-1 px-10 py-10 max-w-[1080px]">
      <!-- Colors -->
      <section v-if="active === 'colors'">
        <h2 class="text-title2 font-bold text-gray900 mb-6 pb-2 border-b border-border-gray">Colors</h2>
        <div v-for="(colors, group) in tokens.color" :key="group" class="mb-6">
          <h3 class="text-subtitle3 font-semibold text-gray800 mb-3 capitalize">{{ group }}</h3>
          <div class="grid grid-cols-4 gap-4">
            <div v-for="(value, name) in colors" :key="name" class="flex flex-col gap-1">
              <div class="w-full h-16 rounded-medium border border-border-gray" :style="{ background: value }" />
              <div class="text-detail font-semibold text-gray900">{{ name }}</div>
              <div class="text-detail text-gray700 font-mono">{{ value }}</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Typography -->
      <section v-if="active === 'typography'">
        <h2 class="text-title2 font-bold text-gray900 mb-6 pb-2 border-b border-border-gray">Typography</h2>
        <div class="flex flex-col gap-3">
          <div v-for="(v, name) in tokens.typography.fontSize" :key="name" class="flex items-baseline gap-6">
            <span class="w-[120px] shrink-0 text-detail text-gray700 font-mono">{{ name }} · {{ v.size }}</span>
            <span class="text-gray900 font-semibold truncate" :style="{ fontSize: v.size, lineHeight: v.lineHeight }">
              커리어노트 디자인 시스템
            </span>
          </div>
        </div>
      </section>

      <!-- Radius & Shadow -->
      <section v-if="active === 'surface'">
        <h2 class="text-title2 font-bold text-gray900 mb-6 pb-2 border-b border-border-gray">Radius & Shadow</h2>
        <div class="flex gap-4 flex-wrap mb-6">
          <div v-for="(value, name) in tokens.radius" :key="name" class="flex flex-col items-center gap-1">
            <div class="w-20 h-14 bg-sky-bg border border-sky" :style="{ borderRadius: value }" />
            <span class="text-detail text-gray700">{{ name }} · {{ value }}</span>
          </div>
        </div>
        <div class="grid grid-cols-4 gap-6">
          <div v-for="(value, name) in tokens.shadow" :key="name" class="flex flex-col items-center gap-2 py-4">
            <div class="w-full h-[72px] bg-white100 rounded-large" :style="{ boxShadow: value }" />
            <span class="text-detail text-gray700">{{ name }}</span>
          </div>
        </div>
      </section>

      <!-- Buttons -->
      <section v-if="active === 'buttons'">
        <h2 class="text-title2 font-bold text-gray900 mb-6 pb-2 border-b border-border-gray">Buttons</h2>
        <div v-for="size in (['sm', 'md', 'lg'] as const)" :key="size" class="flex items-center gap-3 mb-4">
          <span class="w-10 text-detail text-gray700 font-mono">{{ size }}</span>
          <Button v-for="color in (['white', 'black', 'sky', 'red'] as const)" :key="color" :size="size" :color="color">
            {{ color }}
          </Button>
        </div>
        <div class="max-w-[420px] mb-4"><AddDashedButton /></div>
        <div class="flex items-center gap-3 mb-4">
          <span class="text-detail text-gray700">IconButton</span>
          <IconButton aria-label="수정"><Icon name="edit" size="md" /></IconButton>
          <IconButton aria-label="삭제"><Icon name="delete" size="md" /></IconButton>
          <IconButton aria-label="더보기" variant="ghost"><Icon name="dotmenu" size="md" /></IconButton>
          <span class="text-detail text-gray700 ml-6">ButtonRound</span>
          <ButtonRound selected>선택됨</ButtonRound>
          <ButtonRound>기본</ButtonRound>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-detail text-gray700">disabled</span>
          <Button color="sky" disabled>disabled</Button>
          <span class="text-detail text-gray700 ml-6">ToggleButton</span>
          <ToggleButton :checked="toggleOn" @change="toggleOn = $event" />
          <ToggleButton :checked="!toggleOn" size="sm" @change="toggleOn = !$event" />
        </div>
      </section>

      <!-- Chips -->
      <section v-if="active === 'chips'">
        <h2 class="text-title2 font-bold text-gray900 mb-6 pb-2 border-b border-border-gray">Chips</h2>
        <div v-for="variant in (['solid', 'soft'] as const)" :key="variant" class="mb-4">
          <h3 class="text-subtitle3 font-semibold text-gray800 mb-2">{{ variant }}</h3>
          <div v-for="size in (['S', 'M', 'L', 'XL'] as const)" :key="size" class="flex items-center gap-2 mb-2 flex-wrap">
            <span class="w-6 text-detail text-gray700 font-mono">{{ size }}</span>
            <Chip
              v-for="color in (['black', 'basic', 'sky', 'red', 'blue', 'green', 'purple'] as const)"
              :key="color" :size="size" :color="color" :variant="variant"
            >
              {{ color }}
            </Chip>
          </div>
        </div>
        <h3 class="text-subtitle3 font-semibold text-gray800 mt-8 mb-2">CategoryChip — 카테고리 필터 (pencil /make/job)</h3>
        <div class="flex flex-wrap gap-2">
          <CategoryChip active>전체</CategoryChip>
          <CategoryChip>개발</CategoryChip>
          <CategoryChip>데이터·AI</CategoryChip>
          <CategoryChip>디자인</CategoryChip>
        </div>
      </section>

      <!-- Inputs -->
      <section v-if="active === 'inputs'">
        <h2 class="text-title2 font-bold text-gray900 mb-6 pb-2 border-b border-border-gray">Inputs</h2>
        <div class="grid grid-cols-2 gap-6 max-w-[720px]">
          <TextInput label="라벨" sublabel="서브라벨" placeholder="텍스트를 입력하세요" essential v-model="inputVal" full-width />
          <TextInput label="에러 상태" placeholder="값" state="error" error-message="에러 메시지입니다" full-width />
          <Textarea label="Textarea" placeholder="여러 줄 입력" full-width />
          <Selector label="Selector" placeholder="선택하세요" :options="['옵션 A', '옵션 B', '옵션 C']" v-model="selVal" full-width />
        </div>
      </section>

      <!-- Feedback -->
      <section v-if="active === 'feedback'">
        <h2 class="text-title2 font-bold text-gray900 mb-6 pb-2 border-b border-border-gray">Feedback & Overlays</h2>
        <div class="flex items-center gap-3 mb-6">
          <Button color="sky" @click="modalOpen = true">Modal 열기</Button>
        </div>
        <Modal
          :is-open="modalOpen" title="모달 제목" subtitle="모달 서브타이틀" description="모달 설명 텍스트입니다."
          secondary-label="취소" @close="modalOpen = false" @primary="modalOpen = false" @secondary="modalOpen = false"
        />
        <div class="flex flex-col gap-3">
          <Information type="positive" title="긍정 안내" subtext="positive 정보 문구" />
          <Information type="negative" title="경고 안내" subtext="negative 정보 문구" />
          <Information type="normal" title="일반 안내" subtext="normal 정보 문구" />
        </div>
        <div class="flex items-center gap-6 mt-6">
          <span class="text-detail text-gray700">Badge</span>
          <Badge v-for="v in (['Soon', 'New', 'Beta'] as const)" :key="v" :variant="v" />
          <span class="text-detail text-gray700 ml-6">NumberBadge</span>
          <NumberBadge v-for="n in 3" :key="n" :number="n" />
          <div class="relative ml-10">
            <span class="text-body2 text-gray800">Tooltip 기준 요소</span>
            <Tooltip text="툴팁 텍스트" position="top" />
          </div>
        </div>
      </section>

      <!-- Navigation -->
      <section v-if="active === 'navigation'">
        <h2 class="text-title2 font-bold text-gray900 mb-6 pb-2 border-b border-border-gray">Navigation</h2>
        <InHeader title="플로우 타이틀" description="설명 텍스트가 들어갑니다." class="mb-6" />
        <div class="flex items-center gap-8 h-14 border-b border-border-gray mb-6 px-4">
          <HeaderMenuItem label="활성 메뉴" is-active />
          <HeaderMenuItem label="기본 메뉴" />
          <HeaderMenuItem label="NEW 메뉴" show-new />
        </div>
        <div class="flex items-center gap-6">
          <ProgressBarItem status="complete" text="완료 단계" :number="1" />
          <ProgressBarItem status="editing" text="진행 중 단계" :number="2" />
          <ProgressBarItem status="waiting" text="대기 단계" :number="3" />
        </div>
      </section>

      <!-- Cards -->
      <section v-if="active === 'cards'">
        <h2 class="text-title2 font-bold text-gray900 mb-6 pb-2 border-b border-border-gray">Cards (패턴)</h2>
        <div class="flex flex-col gap-4 max-w-[720px]">
          <ActivityCard>
            <template #media><Icon name="image" :size="24" color="#C3C3CD" /></template>
            <div class="flex items-center justify-between gap-2">
              <div class="flex items-center gap-2">
                <Chip size="L" variant="soft" color="blue" class="font-semibold">회사 프로젝트</Chip>
                <span class="text-body2 font-medium text-gray600">2026.01 — 2026.08</span>
              </div>
              <div class="flex items-center gap-0.5">
                <IconButton aria-label="수정"><Icon name="edit" size="md" /></IconButton>
                <IconButton aria-label="삭제"><Icon name="delete" size="md" /></IconButton>
              </div>
            </div>
            <p class="text-subtitle2 font-semibold text-gray900 truncate">활동 제목</p>
            <p class="text-body2 text-gray700">활동 설명 텍스트가 들어갑니다.</p>
          </ActivityCard>
          <ActivityCard selected>
            <template #media><Icon name="image" :size="24" color="#C3C3CD" /></template>
            <p class="text-subtitle2 font-semibold text-gray900">선택된 카드 (selected)</p>
          </ActivityCard>
        </div>
        <h3 class="text-subtitle3 font-semibold text-gray800 mt-8 mb-2">SelectCard — 체크서클 선택 카드 (pencil /make/job)</h3>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-[12px] max-w-[720px]">
          <SelectCard representative selected title="대표 직업">백엔드 개발</SelectCard>
          <SelectCard selected title="선택됨">데이터 분석가</SelectCard>
          <SelectCard title="기본">게임 기획자</SelectCard>
          <SelectCard title="긴 이름 말줄임">라이프스타일·뷰티·웰니스 매니저</SelectCard>
        </div>
      </section>

      <!-- Icons -->
      <section v-if="active === 'icons'">
        <h2 class="text-title2 font-bold text-gray900 mb-6 pb-2 border-b border-border-gray">
          Icons — iconMap ({{ iconNames.length }})
        </h2>
        <p class="text-body2 text-gray700 mb-4">
          <code class="font-mono text-sky">&lt;Icon name="..." /&gt;</code> — React iconMap 과 동일 키
        </p>
        <div class="grid grid-cols-6 gap-4">
          <div
            v-for="name in iconNames" :key="name"
            class="flex flex-col items-center gap-2 p-3 rounded-medium border border-border-gray2 bg-white100"
          >
            <Icon :name="name" :size="22" />
            <span class="text-detail text-gray700 text-center break-all">{{ name }}</span>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
