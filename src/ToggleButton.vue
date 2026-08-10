<script setup lang="ts">
// React ToggleButton 동일 스펙 (role=switch 토글)
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{ checked: boolean; disabled?: boolean; size?: 'sm' | 'md'; ariaLabel?: string }>(),
  { disabled: false, size: 'md' },
)
const emit = defineEmits<{ (e: 'change', v: boolean): void }>()

const sizeStyles = {
  sm: { track: 'w-8 h-[18px]', thumb: 'w-3.5 h-3.5', on: 'left-4', off: 'left-0.5' },
  md: { track: 'w-[38px] h-5', thumb: 'w-4 h-4', on: 'left-5', off: 'left-0.5' },
}
const s = computed(() => sizeStyles[props.size])

function toggle() {
  if (!props.disabled) emit('change', !props.checked)
}
</script>

<template>
  <button
    type="button"
    role="switch"
    :aria-checked="checked"
    :aria-label="ariaLabel"
    :disabled="disabled"
    class="relative rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky focus-visible:ring-offset-2"
    :class="[s.track, checked ? 'bg-sky' : 'bg-gray400', disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer']"
    @click="toggle"
    @keydown.enter.prevent="toggle"
    @keydown.space.prevent="toggle"
  >
    <span
      class="absolute top-0.5 bg-white rounded-full shadow-md transition-[left] duration-200"
      :class="[s.thumb, checked ? s.on : s.off]"
    />
  </button>
</template>
