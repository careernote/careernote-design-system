<script setup lang="ts">
// React ApplicantEvaluationPanel 과 동일 스펙 — 지원자평가 모달 본문 (모달 껍데기는 소비자가 감싼다)
import { computed } from 'vue'
import AiEvaluationCard from './AiEvaluationCard.vue'
import ProfileSummary from './ProfileSummary.vue'
import type { SummaryItem } from './ProfileSummary.vue'
import FitActivityItem from './FitActivityItem.vue'
import RequirementCard from './RequirementCard.vue'
import type { RequirementItem } from './RequirementCard.vue'
export interface FitActivity { id: string; title: string; org: string; imageUrl?: string }

const props = withDefaults(
  defineProps<{
    fitLabel: string
    evaluation: string[]
    summary?: SummaryItem[]
    fitActivities?: FitActivity[]
    requirements?: RequirementItem[]
    preferences?: RequirementItem[]
  }>(),
  { fitActivities: () => [], requirements: () => [], preferences: () => [] },
)
const emit = defineEmits<{ (e: 'fit-activity-click', activity: FitActivity): void }>()
const met = computed(() => props.requirements.filter((r) => r.status !== 'unmet').map((r) => ({ ...r, status: 'met' as const })))
const unmet = computed(() => props.requirements.filter((r) => r.status === 'unmet'))
const prefs = computed(() => props.preferences.map((p) => ({ ...p, status: 'none' as const })))
</script>

<template>
  <div class="w-[601px] max-w-full flex flex-col gap-5 px-5 py-6 bg-white100 rounded-xlarge">
    <AiEvaluationCard :fit-label="fitLabel" :items="evaluation" />
    <ProfileSummary v-if="summary" :items="summary" />
    <div v-if="fitActivities.length" class="flex flex-col gap-3">
      <span class="text-body1 font-semibold text-gray900">주요업무와의 <span class="text-sky">Fit 되는 활동</span> 확인하기</span>
      <div class="flex flex-col">
        <template v-for="(a, i) in fitActivities" :key="a.id">
          <hr v-if="i > 0" class="border-0 border-t border-border-gray" />
          <FitActivityItem :title="a.title" :org="a.org" :image-url="a.imageUrl" clickable @click="emit('fit-activity-click', a)" />
        </template>
      </div>
    </div>
    <div v-if="requirements.length || preferences.length" class="flex flex-col gap-3">
      <RequirementCard v-if="met.length" title="✅  자격요건을 충족했어요." :items="met" />
      <RequirementCard v-if="unmet.length" title="🚨  자격요건 확인이 필요해요" :items="unmet" />
      <RequirementCard v-if="prefs.length" title="👍  우대 조건을 충족했어요." :items="prefs" />
    </div>
  </div>
</template>
