<script setup lang="ts">
// React TextInput(확장판) 동일 스펙 — controlled·type·fullWidth 지원
import { computed, ref, watch } from 'vue'

type State = 'normal' | 'filled' | 'only_view' | 'error'

const props = withDefaults(
  defineProps<{
    label?: string
    sublabel?: string
    placeholder?: string
    disabled?: boolean
    essential?: boolean
    modelValue?: string
    type?: string
    errorMessage?: string
    /** 인풋 아래 회색 보조 설명(에러와 별개) */
    helperText?: string
    state?: State
    /** small: 높이 40 · 라벨 11 bold(ATS 폼) */
    size?: 'small' | 'medium' | 'large'
    fullWidth?: boolean
    maxLength?: number
  }>(),
  { placeholder: '', disabled: false, essential: false, type: 'text', size: 'medium', fullWidth: false },
)

const emit = defineEmits<{ (e: 'update:modelValue', v: string): void }>()

const inner = ref('')
const focused = ref(false)
const current = computed(() => (props.modelValue !== undefined ? props.modelValue : inner.value))

const internalState = ref<State>('normal')
watch(
  [() => props.state, focused, current],
  () => {
    if (props.state !== undefined) internalState.value = props.state
    else if (!focused.value) internalState.value = current.value ? 'filled' : 'normal'
  },
  { immediate: true },
)

const interactionDisabled = computed(() => internalState.value === 'only_view' || props.disabled)
const isSmall = computed(() => props.size === 'small')

const boxClasses = computed(() => {
  const pad = props.size === 'large' ? 'p-4' : props.size === 'small' ? 'px-3 py-2.5' : 'px-4 py-3.5'
  const base = `w-full h-auto flex items-center gap-2 self-stretch border rounded-small ${pad}`
  if (props.disabled) return `${base} border-gray400 bg-bg-gray1 text-gray500 text-body2 placeholder:text-gray500 cursor-not-allowed`
  if (focused.value && internalState.value !== 'only_view' && internalState.value !== 'error')
    return `${base} border-sky bg-white100 text-gray800 text-body2 placeholder:text-gray600`
  switch (internalState.value) {
    case 'filled': return `${base} border-gray400 bg-white100 text-gray800 text-body2 placeholder:text-gray600`
    case 'only_view': return `${base} border-gray400 bg-bg-gray1 text-gray800 text-body2 cursor-default`
    case 'error': return `${base} border-red bg-white100 text-gray800 text-body2 placeholder:text-gray600`
    default: return `${base} border-gray400 bg-white100 text-gray600 text-body2 placeholder:text-gray600`
  }
})

function onInput(e: Event) {
  const v = (e.target as HTMLInputElement).value
  if (props.modelValue === undefined) inner.value = v
  emit('update:modelValue', v)
}
</script>

<template>
  <div :class="`${fullWidth ? 'w-full' : 'w-[289px]'} h-auto flex flex-col items-start ${isSmall ? 'gap-2' : 'gap-3'}`">
    <div v-if="label || sublabel" class="w-full h-auto flex flex-col items-start gap-1 self-stretch">
      <label v-if="label" class="text-gray900" :class="isSmall ? 'text-[11px] font-bold' : 'text-body1 font-semibold'">
        {{ label }}<span v-if="essential" class="text-sky"> *</span>
      </label>
      <span v-if="sublabel" class="text-gray700" :class="isSmall ? 'text-[10px] leading-[1.35]' : 'text-body2'">{{ sublabel }}</span>
    </div>
    <div class="w-full h-auto flex flex-col items-start gap-2 self-stretch">
      <div :class="boxClasses">
        <input
          :type="type"
          :placeholder="placeholder"
          :disabled="interactionDisabled"
          :readonly="internalState === 'only_view'"
          :value="current"
          :maxlength="maxLength"
          class="w-full h-auto max-h-[18px] flex-1 outline-none bg-transparent"
          :class="isSmall ? 'text-[13px]' : ''"
          @input="onInput"
          @focus="!interactionDisabled && (focused = true)"
          @blur="focused = false"
        />
      </div>
      <p v-if="helperText" class="text-gray500" :class="isSmall ? 'text-[10px] leading-[1.35]' : 'text-detail'">{{ helperText }}</p>
      <p v-if="internalState === 'error' && errorMessage" class="text-detail leading-4 text-red">{{ errorMessage }}</p>
    </div>
  </div>
</template>
