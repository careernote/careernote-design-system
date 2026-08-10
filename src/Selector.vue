<script setup lang="ts">
// React Selector 동일 스펙 (커스텀 드롭다운 — 핵심 동작 포트)
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import Icon from './icons/Icon.vue'

type OptionItem = string | { value: string; label: string }

const props = withDefaults(
  defineProps<{
    label?: string
    sublabel?: string
    placeholder?: string
    disabled?: boolean
    essential?: boolean
    modelValue?: string
    options?: OptionItem[]
    errorMessage?: string
    size?: 'medium' | 'large'
    fullWidth?: boolean
  }>(),
  { placeholder: '', disabled: false, essential: false, options: () => [], size: 'medium', fullWidth: false },
)
const emit = defineEmits<{ (e: 'update:modelValue', v: string): void }>()

const open = ref(false)
const root = ref<HTMLElement>()

const optValue = (o: OptionItem) => (typeof o === 'string' ? o : o.value)
const optLabel = (o: OptionItem) => (typeof o === 'string' ? o : o.label)
const selectedLabel = computed(() => {
  const found = props.options.find((o) => optValue(o) === props.modelValue)
  return found ? optLabel(found) : ''
})

const boxClasses = computed(() => {
  const base = `w-full flex items-center justify-between gap-2 self-stretch border rounded-small cursor-pointer ${props.size === 'large' ? 'p-4' : 'px-4 py-3.5'}`
  if (props.disabled) return `${base} border-gray400 bg-bg-gray1 text-gray500 cursor-not-allowed`
  if (open.value) return `${base} border-sky bg-white100 text-gray800 text-body2`
  return `${base} border-gray400 bg-white100 ${selectedLabel.value ? 'text-gray800' : 'text-gray600'} text-body2`
})

function pick(o: OptionItem) {
  emit('update:modelValue', optValue(o))
  open.value = false
}
function onOutside(e: MouseEvent) {
  if (root.value && !root.value.contains(e.target as Node)) open.value = false
}
onMounted(() => document.addEventListener('mousedown', onOutside))
onBeforeUnmount(() => document.removeEventListener('mousedown', onOutside))
</script>

<template>
  <div ref="root" :class="`${fullWidth ? 'w-full' : 'w-[289px]'} relative flex flex-col items-start gap-3`">
    <div v-if="label || sublabel" class="w-full flex flex-col items-start gap-1 self-stretch">
      <label v-if="label" class="text-body1 font-semibold text-gray900">
        {{ label }}<span v-if="essential" class="text-sky"> *</span>
      </label>
      <span v-if="sublabel" class="text-body2 text-gray700">{{ sublabel }}</span>
    </div>
    <button type="button" :class="boxClasses" :disabled="disabled" @click="open = !open">
      <span class="truncate">{{ selectedLabel || placeholder }}</span>
      <Icon name="arrow-down" size="sm" color="gray800" :class="open ? 'rotate-180' : ''" class="transition-transform" />
    </button>
    <div
      v-if="open"
      class="absolute top-full left-0 right-0 mt-1 z-50 max-h-[240px] overflow-y-auto rounded-medium border border-border-gray bg-white100 shadow-normal-normal p-1"
    >
      <div
        v-for="o in options"
        :key="optValue(o)"
        class="px-4 py-2.5 text-[14px] font-medium text-gray800 rounded-medium cursor-pointer transition-colors truncate"
        :class="optValue(o) === modelValue ? 'bg-bg-gray3 font-semibold text-gray900' : 'hover:bg-bg-gray3'"
        @click="pick(o)"
      >
        {{ optLabel(o) }}
      </div>
    </div>
    <p v-if="errorMessage" class="text-detail leading-4 text-red">{{ errorMessage }}</p>
  </div>
</template>
