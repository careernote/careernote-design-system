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
import CareerOverview from './CareerOverview.vue'
import type { OverviewGroup } from './CareerOverview.vue'
import HistoryEntry from './HistoryEntry.vue'
import ActivityDetail from './ActivityDetail.vue'
import type { ActivityComment } from './ActivityDetail.vue'
import SkillSection from './SkillSection.vue'
import IconButton from './IconButton.vue'
import Icon from './icons/Icon.vue'
import ProfileItemSection from './ProfileItemSection.vue'
import type { ProfileItemEntry } from './ProfileItemSection.vue'

export interface ActivityData { id?: string; title: string; period?: string; images?: string[]; skills?: string[]; body?: string; result?: string; comments?: ActivityComment[] }
export interface HistoryData { type?: 'career' | 'education' | 'etc'; name: string; role?: string; period?: string; logoUrl?: string; activities?: ActivityData[] }

const props = withDefaults(
  defineProps<{
    attachments?: AttachmentEntry[]
    /** 공고 지원자 상세에만 — 지원서에 써 넣은 답변. 프로필 헤더 바로 아래에 놓인다 */
    answers?: AnswerEntry[]
    header: CandidateHeaderData
    editable?: boolean
    summary?: SummaryItem[]
    summaryTitle?: string
    /** 경력·학력 나열 — 요약 아래·활동 상세 위 */
    overview?: OverviewGroup[]
    histories?: HistoryData[]
    skills?: string[]
    awards?: ProfileItemEntry[]
    certifications?: ProfileItemEntry[]
    languages?: ProfileItemEntry[]
    activityIdPrefix?: string
    /** 활동 제목 줄에 수정·삭제 버튼(id 있는 활동만) — React onEditActivity/onDeleteActivity 와 같다. 본인 프로필 화면용 */
    activityEditable?: boolean
    /** 스킬·수상·자격증·외국어 섹션에 편집 버튼, 비어 있어도 섹션을 보여 준다(빈 섹션은 인쇄에서 숨김) — React onEditSkills 등과 같다 */
    sectionsEditable?: boolean
    /** true 면 활동 본문을 모두 펼친다(더보기 없음) — 인쇄용 */
    expandAll?: boolean
  }>(),
  { editable: false, histories: () => [], activityIdPrefix: 'activity-', expandAll: false, activityEditable: false, sectionsEditable: false },
)
const emit = defineEmits<{ (e: 'edit-profile'): void; (e: 'attachment-click', item: AttachmentEntry, index: number): void; (e: 'answer-file-click', file: AnswerFile): void; (e: 'edit-activity', activityId: string): void; (e: 'delete-activity', activityId: string): void; (e: 'edit-skills'): void; (e: 'edit-awards'): void; (e: 'edit-certifications'): void; (e: 'edit-languages'): void }>()
// 내용이 있거나 편집할 수 있으면 섹션을 그린다. 편집용으로만 보이는 빈 섹션은 인쇄에서 뺀다
const show = (items?: unknown[]) => !!items?.length || props.sectionsEditable
const printClass = (items?: unknown[]) => (items?.length ? '' : 'print:hidden')
const hasBottom = computed(() => show(props.skills) || show(props.awards) || show(props.certifications) || show(props.languages))
const bottomPrintClass = computed(() => (props.skills?.length || props.awards?.length || props.certifications?.length || props.languages?.length ? '' : 'print:hidden'))
</script>

<template>
  <div class="w-[940px] max-w-full flex flex-col gap-7 px-8 pt-8 pb-10 mobile:gap-6 mobile:px-5 mobile:pt-6 mobile:pb-8 bg-white100 rounded-xlarge">
    <AttachmentBar v-if="attachments?.length" :items="attachments" @click="(it, i) => emit('attachment-click', it, i)" />
    <CandidateHeader v-bind="header" :editable="editable" @edit="emit('edit-profile')" />
    <hr class="border-0 border-t border-border-gray" />
    <template v-if="answers?.length">
      <ApplicationAnswers :items="answers" @file-click="(f) => emit('answer-file-click', f)" />
      <hr class="border-0 border-t border-border-gray" />
    </template>
    <ProfileSummary v-if="summary?.length" :title="summaryTitle" :items="summary" />
    <template v-if="overview?.some((g) => g.rows.length)">
      <CareerOverview :groups="overview" />
      <hr v-if="histories.length" class="border-0 border-t border-border-gray" />
    </template>
    <template v-for="(h, i) in histories" :key="i">
      <hr v-if="i > 0" class="border-0 border-t border-border-gray" />
      <HistoryEntry :type="h.type" :name="h.name" :role="h.role" :period="h.period" :logo-url="h.logoUrl">
        <template v-for="(a, j) in h.activities ?? []" :key="a.id ?? j">
          <hr v-if="j > 0" />
          <div :id="a.id ? `${activityIdPrefix}${a.id}` : undefined">
            <ActivityDetail v-bind="a" :expanded="expandAll">
              <template v-if="activityEditable && a.id" #actions>
                <IconButton variant="ghost" :aria-label="`${a.title} 수정`" data-testid="candidate-activity-edit" @click="emit('edit-activity', a.id!)"><Icon name="edit" :size="18" /></IconButton>
                <IconButton variant="ghost" :aria-label="`${a.title} 삭제`" data-testid="candidate-activity-delete" @click="emit('delete-activity', a.id!)"><Icon name="delete" :size="18" /></IconButton>
              </template>
            </ActivityDetail>
          </div>
        </template>
      </HistoryEntry>
    </template>
    <template v-if="hasBottom">
      <hr :class="['border-0 border-t border-border-gray', bottomPrintClass]" />
      <div :class="['flex flex-col gap-10', bottomPrintClass]">
        <SkillSection v-if="show(skills)" :skills="skills ?? []" :editable="sectionsEditable" :class="printClass(skills)" @edit="emit('edit-skills')" />
        <ProfileItemSection v-if="show(awards)" icon="trophy" label="수상경력 및 수료" :items="awards ?? []" :editable="sectionsEditable" :class="printClass(awards)" @edit="emit('edit-awards')" />
        <ProfileItemSection v-if="show(certifications)" icon="certification" label="자격증" :items="certifications ?? []" :editable="sectionsEditable" :class="printClass(certifications)" @edit="emit('edit-certifications')" />
        <ProfileItemSection v-if="show(languages)" icon="translate" label="외국어" :items="languages ?? []" :editable="sectionsEditable" :class="printClass(languages)" @edit="emit('edit-languages')" />
      </div>
    </template>
  </div>
</template>
