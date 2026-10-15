<script setup lang="ts">
// React CareerOverview 와 동일 스펙 — 상세페이지 경력·학력 나열(이름 · 직무/전공 ··· 기간)
import { computed } from 'vue'

export interface OverviewRow {
  /** 회사·학교 이름 */
  name: string
  /** 직무 / 전공·학위·상태 */
  sub?: string
  /** 예: "2022. 03 - 현재 (4년 8개월)" */
  period?: string
}
export interface OverviewGroup {
  /** 예: '경력' · '학력' */
  label: string
  rows: OverviewRow[]
}

const props = defineProps<{ groups: OverviewGroup[] }>()
const shown = computed(() => props.groups.filter((g) => g.rows.length > 0))
</script>

<template>
  <div v-if="shown.length" class="flex flex-col gap-4">
    <div v-for="g in shown" :key="g.label" class="flex gap-4">
      <span class="shrink-0 w-10 text-body2 font-semibold text-gray900">{{ g.label }}</span>
      <ul class="m-0 p-0 list-none min-w-0 flex-1 flex flex-col gap-2">
        <li v-for="(r, i) in g.rows" :key="i" class="min-w-0 flex items-baseline justify-between gap-4">
          <span class="min-w-0 truncate text-body2" :title="[r.name, r.sub].filter(Boolean).join(' ')">
            <span class="font-medium text-gray900">{{ r.name }}</span>
            <span v-if="r.sub" class="text-gray700"> {{ r.sub }}</span>
          </span>
          <span v-if="r.period" class="shrink-0 text-body2 text-gray600 tabular-nums">{{ r.period }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
