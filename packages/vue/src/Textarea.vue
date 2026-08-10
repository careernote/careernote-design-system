<script setup lang="ts">
// React Textarea 동일 스펙 (controlled·fullWidth)
import { computed, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    label?: string
    sublabel?: string
    placeholder?: string
    disabled?: boolean
    essential?: boolean
    modelValue?: string
    errorMessage?: string
    size?: 'medium' | 'large'
    fullWidth?: boolean
  }>(),
  { placeholder: '', disabled: false, essential: false, size: 'medium', fullWidth: false },
)
const emit = defineEmits<{ (e: 'update:modelValue', v: string): void }>()

const inner = ref('')
const focused = ref(false)
const current = computed(() => (props.modelValue !== undefined ? props.modelValue : inner.value))

const boxClasses = computed(() => {
  const base = `w-full flex self-stretch border rounded-small p-4 text-body2 resize-none outline-none ${props.size === 'large' ? 'h-[200px]' : 'h-[120px]'}`
  if (props.disabled) return `${base} border-gray400 bg-bg-gray1 text-gray500 cursor-not-allowed`
  if (focused.value) return `${base} border-sky bg-white100 text-gray800 placeholder:text-gray600`
  return `${base} border-gray400 bg-white100 ${current.value ? 'text-gray800' : 'text-gray600'} placeholder:text-gray600`
})

function onInput(e: Event) {
  const v = (e.target as HTMLTextAreaElement).value
  if (props.modelValue === undefined) inner.value = v
  emit('update:modelValue', v)
}
</script>

<template>
  <div :class="`${fullWidth ? 'w-full' : 'w-[289px]'} flex flex-col items-start gap-3`">
    <div v-if="label || sublabel" class="w-full flex flex-col items-start gap-1 self-stretch">
      <label v-if="label" class="text-body1 font-semibold text-gray900">
        {{ label }}<span v-if="essential" class="text-sky"> *</span>
      </label>
      <span v-if="sublabel" class="text-body2 text-gray700">{{ sublabel }}</span>
    </div>
    <textarea
      :placeholder="placeholder"
      :disabled="disabled"
      :value="current"
      :class="boxClasses"
      @input="onInput"
      @focus="focused = true"
      @blur="focused = false"
    />
    <p v-if="errorMessage" class="text-detail leading-4 text-red">{{ errorMessage }}</p>
  </div>
</template>
