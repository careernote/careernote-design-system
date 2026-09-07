<script setup lang="ts">
// React ApplicantCard 와 동일 스펙 — 공고 채용 지원자 카드
import Chip from './Chip.vue'
import Icon from './icons/Icon.vue'
import CandidateProfile from './CandidateProfile.vue'
import FitnessChip from './FitnessChip.vue'
import CandidateHistory from './CandidateHistory.vue'
import ExperienceItem from './ExperienceItem.vue'
import type { ExperienceEntry } from './ExperienceItem.vue'
import type { CareerEntry } from './CareerTooltip.vue'
import type { EducationEntry, FitnessLevel } from './candidate-types'

withDefaults(
  defineProps<{
    name: string
    imageUrl?: string
    careerLabel: string
    job: string
    /** 미지정 = 검토 전 */
    fitness?: FitnessLevel
    /** 채용 프로세스 단계명 */
    status: string
    /** 단계 색상 (CSS color) — 프로세스 단계 색을 따른다 */
    statusColor?: string
    /** 최초 지원일 (예: "24.03.15") */
    appliedAt: string
    aiSummary?: string
    careers: CareerEntry[]
    education?: EducationEntry
    /** 공고에 가장 적합한 활동 최대 2개 */
    experiences?: ExperienceEntry[]
    memo?: string
    clickable?: boolean
  }>(),
  { statusColor: '#03C75A', experiences: () => [], clickable: false },
)

const emit = defineEmits<{
  (e: 'status-click'): void
  (e: 'experience-click', exp: ExperienceEntry, index: number): void
  (e: 'click'): void
}>()
</script>

<template>
  <div
    class="w-full flex flex-col gap-4 p-5 bg-white100 border border-border-gray rounded-xlarge shadow-wide-light"
    :class="clickable ? 'cursor-pointer transition-colors hover:border-gray400' : ''"
    @click="clickable && emit('click')"
  >
    <div class="flex flex-col gap-4">
      <CandidateProfile :name="name" :image-url="imageUrl" :career-label="careerLabel" :job="job">
        <template #badge><FitnessChip :level="fitness" /></template>
        <template #aside>
          <div class="shrink-0 flex flex-col items-end justify-center gap-1">
            <button type="button" :aria-label="`지원 상태: ${status}`" @click.stop="emit('status-click')">
              <Chip size="XL" variant="soft" color="basic" class="gap-1">
                <span :style="{ color: statusColor }">{{ status }}</span>
                <Icon name="arrow-down" :size="18" color="gray800" />
              </Chip>
            </button>
            <div class="flex items-center gap-1 text-gray600">
              <Icon name="clock" :size="14" />
              <span class="text-detail">{{ appliedAt }} 지원</span>
            </div>
          </div>
        </template>
      </CandidateProfile>
      <hr class="border-0 border-t border-border-gray" />
    </div>

    <div class="flex flex-col gap-[17px]">
      <CandidateHistory :ai-summary="aiSummary" :careers="careers" :education="education" />
      <div v-if="experiences.length" class="flex flex-col gap-2">
        <ExperienceItem
          v-for="(exp, i) in experiences.slice(0, 2)"
          :key="i"
          v-bind="exp"
          clickable
          @click.stop="emit('experience-click', exp, i)"
        />
      </div>
      <div v-if="memo !== undefined" class="flex items-center gap-4 h-5">
        <span class="shrink-0 text-body2 font-medium text-gray700">메모</span>
        <span class="min-w-0 flex-1 text-body2 text-sky truncate">{{ memo }}</span>
      </div>
    </div>
  </div>
</template>
