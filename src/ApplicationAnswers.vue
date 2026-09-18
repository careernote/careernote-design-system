<script setup lang="ts">
// React ApplicationAnswers 와 동일 스펙 — 지원자가 지원서에 써 넣은 답변 묶음.
// 첨부파일은 상단 바가 아니라 해당 항목 자리에 놓는다.
import Icon from './icons/Icon.vue'

export interface AnswerFile {
  name: string
  /** 미지정이면 클릭할 수 없는 안내용 칩으로만 보인다(업로드 준비 전 데이터) */
  url?: string
}

export interface AnswerEntry {
  label: string
  /** short: 한 줄 답변 / long: 장문 답변 / choice: 선택지 답변 / file: 첨부파일 */
  kind: 'short' | 'long' | 'choice' | 'file'
  text?: string
  choices?: string[]
  files?: AnswerFile[]
}

const props = defineProps<{ items: AnswerEntry[] }>()
const emit = defineEmits<{ (e: 'file-click', file: AnswerFile): void }>()

const EMPTY = '작성하지 않았습니다.'

const isEmpty = (it: AnswerEntry) =>
  it.kind === 'file'
    ? !(it.files ?? []).length
    : it.kind === 'choice'
      ? !(it.choices ?? []).length
      : !it.text?.trim()

function openFile(file: AnswerFile) {
  emit('file-click', file)
  if (file.url) window.open(file.url, '_blank', 'noopener,noreferrer')
}
</script>

<template>
  <!-- 좌측 띠(2px gray700) — 프로필 본문과 지원서 답변을 시각적으로 갈라 준다 (Figma #9276:19525) -->
  <div v-if="props.items.length" class="flex flex-col gap-7 border-l-2 border-gray700 pl-7">
    <div v-for="(it, i) in props.items" :key="i" class="flex flex-col gap-3">
      <span class="text-body1 font-medium text-gray900">{{ it.label }}</span>

      <span v-if="isEmpty(it)" class="text-body2 text-gray600">{{ EMPTY }}</span>

      <div v-else-if="it.kind === 'file'" class="flex flex-wrap items-center gap-2">
        <component
          :is="f.url ? 'button' : 'span'"
          v-for="(f, j) in it.files ?? []"
          :key="j"
          :type="f.url ? 'button' : undefined"
          class="inline-flex max-w-full items-center gap-2 rounded-small border border-gray400 bg-white100 px-4 py-2 text-body2 font-medium text-gray800"
          :class="f.url ? 'cursor-pointer transition-colors hover:border-sky hover:text-sky' : 'text-gray600'"
          @click="f.url ? openFile(f) : undefined"
        >
          <Icon name="clip" :size="18" />
          <span class="truncate">{{ f.name }}</span>
        </component>
      </div>

      <span v-else-if="it.kind === 'choice'" class="text-body2 text-gray700">{{ (it.choices ?? []).join(', ') }}</span>

      <p v-else class="text-body2 text-gray700" :class="it.kind === 'long' ? 'whitespace-pre-wrap leading-[1.7]' : ''">
        {{ it.text }}
      </p>
    </div>
  </div>
</template>
