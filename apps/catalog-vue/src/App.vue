<script setup lang="ts">
import { ref } from 'vue'
import { Button, Chip, Badge, IconButton, AddDashedButton, ActivityCard } from '@careernote/vue'

const NAV = [
  { id: 'buttons', label: 'Buttons' },
  { id: 'chips', label: 'Chips · Badge' },
  { id: 'cards', label: 'Cards' },
] as const

const active = ref<(typeof NAV)[number]['id']>('buttons')
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
      <p class="mt-4 px-3 text-detail text-gray600 leading-4">정본: @careernote/vue<br />(React 스펙과 클래스 동일)</p>
    </aside>

    <main class="ml-[240px] flex-1 px-10 py-10 max-w-[1080px]">
      <section v-if="active === 'buttons'">
        <h2 class="text-title2 font-bold text-gray900 mb-6 pb-2 border-b border-border-gray">Buttons</h2>
        <div v-for="size in (['sm', 'md', 'lg'] as const)" :key="size" class="flex items-center gap-3 mb-4">
          <span class="w-10 text-detail text-gray700 font-mono">{{ size }}</span>
          <Button v-for="color in (['white', 'black', 'sky', 'red'] as const)" :key="color" :size="size" :color="color">
            {{ color }}
          </Button>
        </div>
        <div class="flex items-center gap-3 mb-4">
          <span class="text-detail text-gray700">disabled</span>
          <Button color="sky" disabled>disabled</Button>
          <span class="text-detail text-gray700 ml-6">IconButton</span>
          <IconButton aria-label="수정">✎</IconButton>
          <IconButton aria-label="삭제">🗑</IconButton>
          <IconButton aria-label="더보기" variant="ghost">⋮</IconButton>
        </div>
        <div class="max-w-[420px]"><AddDashedButton /></div>
      </section>

      <section v-if="active === 'chips'">
        <h2 class="text-title2 font-bold text-gray900 mb-6 pb-2 border-b border-border-gray">Chips · Badge</h2>
        <div v-for="variant in (['solid', 'soft'] as const)" :key="variant" class="mb-4">
          <h3 class="text-subtitle3 font-semibold text-gray800 mb-2">{{ variant }}</h3>
          <div v-for="size in (['S', 'M', 'L', 'XL'] as const)" :key="size" class="flex items-center gap-2 mb-2 flex-wrap">
            <span class="w-6 text-detail text-gray700 font-mono">{{ size }}</span>
            <Chip
              v-for="color in (['black', 'basic', 'sky', 'red', 'blue', 'green', 'purple'] as const)"
              :key="color"
              :size="size"
              :color="color"
              :variant="variant"
            >
              {{ color }}
            </Chip>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-detail text-gray700">Badge</span>
          <Badge v-for="v in (['Soon', 'New', 'Beta'] as const)" :key="v" :variant="v" />
        </div>
      </section>

      <section v-if="active === 'cards'">
        <h2 class="text-title2 font-bold text-gray900 mb-6 pb-2 border-b border-border-gray">Cards (패턴)</h2>
        <p class="text-body2 text-gray700 mb-4">
          <code class="font-mono text-sky">ActivityCard</code> — careernote-web ExperienceItem 과 동일 스펙의 활동 카드 껍데기
        </p>
        <div class="flex flex-col gap-4 max-w-[720px]">
          <ActivityCard>
            <template #media><span class="text-gray500 text-subtitle1">🖼</span></template>
            <div class="flex items-center justify-between gap-2">
              <div class="flex items-center gap-2">
                <Chip size="L" variant="soft" color="blue" class="font-semibold">회사 프로젝트</Chip>
                <span class="text-body2 font-medium text-gray600">2026.01 — 2026.08</span>
              </div>
              <div class="flex items-center gap-0.5">
                <IconButton aria-label="수정">✎</IconButton>
                <IconButton aria-label="삭제">🗑</IconButton>
              </div>
            </div>
            <p class="text-subtitle2 font-semibold text-gray900 truncate">활동 제목</p>
            <p class="text-body2 text-gray700">활동 설명 텍스트가 들어갑니다.</p>
          </ActivityCard>
          <ActivityCard selected>
            <template #media><span class="text-gray500 text-subtitle1">🖼</span></template>
            <p class="text-subtitle2 font-semibold text-gray900">선택된 카드 (selected)</p>
          </ActivityCard>
        </div>
      </section>
    </main>
  </div>
</template>
