<script setup lang="ts">
// React TalentpoolCard 와 동일 스펙 — 인재풀 카드 (업데이트 칩, 대표 활동 1개, 메모 없음)
import CandidateProfile from './CandidateProfile.vue'
import UpdatedChip from './UpdatedChip.vue'
import CandidateHistory from './CandidateHistory.vue'
import ExperienceItem from './ExperienceItem.vue'
import type { ExperienceEntry } from './ExperienceItem.vue'
import type { CareerEntry } from './CareerTooltip.vue'
import type { EducationEntry } from './candidate-types'

defineProps<{
  name: string
  imageUrl?: string
  careerLabel: string
  job: string
  /** 마지막 업데이트 경과 일수 — 30일 이내 purple, 이후 black */
  updatedDaysAgo: number
  aiSummary?: string
  /** AI 세 줄 요약 — 주면 aiSummary 대신 bullet 박스 (Figma Talentpool_card) */
  summaryLines?: string[]
  careers: CareerEntry[]
  education?: EducationEntry
  /** 스킬 줄 — 앞 5개 + "+ N" */
  skills?: string[]
  experience?: ExperienceEntry
  clickable?: boolean
}>()

const emit = defineEmits<{ (e: 'experience-click', exp: ExperienceEntry): void; (e: 'click'): void }>()
</script>

<template>
  <div
    class="w-full flex flex-col gap-4 p-5 bg-white100 border border-border-gray rounded-xlarge shadow-wide-light"
    :class="clickable ? 'cursor-pointer transition-colors hover:border-sky60' : ''"
    @click="clickable && emit('click')"
  >
    <div class="flex flex-col gap-4">
      <CandidateProfile :name="name" :image-url="imageUrl" :career-label="careerLabel" :job="job">
        <template #badge><UpdatedChip :days-ago="updatedDaysAgo" /></template>
        <template #aside><slot name="aside" /></template>
      </CandidateProfile>
      <hr class="border-0 border-t border-border-gray" />
    </div>
    <!-- 본문이 남은 높이를 채우고 대표 활동은 mt-auto 로 카드 하단에 고정 -->
    <div class="flex-1 flex flex-col gap-[17px]">
      <CandidateHistory :ai-summary="aiSummary" :summary-lines="summaryLines" :careers="careers" :education="education" :skills="skills" show-empty />
      <ExperienceItem v-if="experience" v-bind="experience" class="mt-auto" clickable @click="emit('experience-click', experience)" />
      <slot name="footer" />
    </div>
  </div>
</template>
