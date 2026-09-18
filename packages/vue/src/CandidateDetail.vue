<script setup lang="ts">
// React CandidateDetail 과 동일 스펙 — 상세페이지 조립체. 세부 커스텀은 부품을 직접 조립
import { computed } from 'vue'
import ApplicationAnswers from './ApplicationAnswers.vue'
import type { AnswerEntry, AnswerFile } from './ApplicationAnswers.vue'
import AttachmentBar from './AttachmentBar.vue'
import type { AttachmentEntry } from './AttachmentBar.vue'
import CandidateHeader from './CandidateHeader.vue'
import type { CandidateHeaderData } from './CandidateHeader.vue'
import ProfileSummary from './ProfileSummary.vue'
import type { SummaryItem } from './ProfileSummary.vue'
import HistoryEntry from './HistoryEntry.vue'
import ActivityDetail from './ActivityDetail.vue'
import type { ActivityComment } from './ActivityDetail.vue'
import SkillSection from './SkillSection.vue'
import ProfileItemSection from './ProfileItemSection.vue'
import type { ProfileItemEntry } from './ProfileItemSection.vue'

export interface ActivityData { id?: string; title: string; period?: string; images?: string[]; skills?: string[]; body?: string; result?: string; comments?: ActivityComment[] }
export interface HistoryData { type?: 'career' | 'education'; name: string; role?: string; period?: string; logoUrl?: string; activities?: ActivityData[] }

const props = withDefaults(
  defineProps<{
    attachments?: AttachmentEntry[]
    /** 공고 지원자 상세에만 — 지원서에 써 넣은 답변. 프로필 헤더 바로 아래에 놓인다 */
    answers?: AnswerEntry[]
    header: CandidateHeaderData
    editable?: boolean
    summary?: SummaryItem[]
    summaryTitle?: string
    histories?: HistoryData[]
    skills?: string[]
    awards?: ProfileItemEntry[]
    certifications?: ProfileItemEntry[]
    languages?: ProfileItemEntry[]
    activityIdPrefix?: string
  }>(),
  { editable: false, histories: () => [], activityIdPrefix: 'activity-' },
)
const emit = defineEmits<{ (e: 'edit-profile'): void; (e: 'attachment-click', item: AttachmentEntry, index: number): void; (e: 'answer-file-click', file: AnswerFile): void }>()
const hasBottom = computed(() => !!(props.skills?.length || props.awards?.length || props.certifications?.length || props.languages?.length))
</script>

<template>
  <div class="w-[940px] max-w-full flex flex-col gap-7 px-8 pt-8 pb-10 bg-white100 rounded-xlarge">
    <AttachmentBar v-if="attachments?.length" :items="attachments" @click="(it, i) => emit('attachment-click', it, i)" />
    <CandidateHeader v-bind="header" :editable="editable" @edit="emit('edit-profile')" />
    <hr class="border-0 border-t border-border-gray" />
    <template v-if="answers?.length">
      <ApplicationAnswers :items="answers" @file-click="(f) => emit('answer-file-click', f)" />
      <hr class="border-0 border-t border-border-gray" />
    </template>
    <ProfileSummary v-if="summary?.length" :title="summaryTitle" :items="summary" />
    <template v-for="(h, i) in histories" :key="i">
      <hr v-if="i > 0" class="border-0 border-t border-border-gray" />
      <HistoryEntry :type="h.type" :name="h.name" :role="h.role" :period="h.period" :logo-url="h.logoUrl">
        <template v-for="(a, j) in h.activities ?? []" :key="a.id ?? j">
          <hr v-if="j > 0" />
          <div :id="a.id ? `${activityIdPrefix}${a.id}` : undefined"><ActivityDetail v-bind="a" /></div>
        </template>
      </HistoryEntry>
    </template>
    <template v-if="hasBottom">
      <hr class="border-0 border-t border-border-gray" />
      <div class="flex flex-col gap-10">
        <SkillSection v-if="skills?.length" :skills="skills" />
        <ProfileItemSection v-if="awards?.length" icon="trophy" label="수상경력 및 수료" :items="awards" />
        <ProfileItemSection v-if="certifications?.length" icon="certification" label="자격증" :items="certifications" />
        <ProfileItemSection v-if="languages?.length" icon="translate" label="외국어" :items="languages" />
      </div>
    </template>
  </div>
</template>
