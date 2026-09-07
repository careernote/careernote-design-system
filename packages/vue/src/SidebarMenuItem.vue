<script setup lang="ts">
// React SidebarMenuItem 과 동일 스펙 — ATS 사이드바 메뉴 항목 (default/mini × selected, hover = selected 룩)
// default slot 을 주면 하위 mini 항목 그룹으로 아래에 들여쓰기 렌더
import { computed, useSlots } from 'vue'
import Icon from './icons/Icon.vue'

const props = withDefaults(
  defineProps<{ label: string; icon?: string; variant?: 'default' | 'mini'; selected?: boolean }>(),
  { variant: 'default', selected: false },
)
const emit = defineEmits<{ (e: 'click'): void }>()
const slots = useSlots()
const hasChildren = computed(() => !!slots.default)
const isMini = computed(() => props.variant === 'mini')

const classes = computed(() =>
  isMini.value
    ? `group/mini w-full flex items-center gap-3 rounded-medium py-2 text-left transition-colors ${
        props.selected ? 'pl-3 pr-3 text-white100' : 'px-6 text-gray600 hover:pl-3 hover:pr-3 hover:text-white100'
      }`
    : `w-full flex items-center gap-3 rounded-medium px-4 py-3 text-left transition-colors hover:bg-bg-dark-selected hover:text-white100 ${
        props.selected ? 'bg-bg-dark-selected text-white100' : 'text-gray600'
      }`,
)
</script>

<template>
  <div class="flex flex-col gap-1">
    <button type="button" :aria-current="selected ? 'page' : undefined" :class="classes" @click="emit('click')">
      <template v-if="isMini">
        <span class="self-stretch w-px bg-sky" :class="selected ? '' : 'hidden group-hover/mini:block'" />
        <span class="min-w-0 flex-1 text-body2 truncate">{{ label }}</span>
      </template>
      <template v-else>
        <Icon v-if="icon" :name="icon" :size="20" :color="selected ? '#00A3FF' : 'currentColor'" />
        <span class="min-w-0 flex-1 text-body2 font-medium truncate">{{ label }}</span>
      </template>
    </button>
    <div v-if="hasChildren" class="flex flex-col gap-1 px-6"><slot /></div>
  </div>
</template>
