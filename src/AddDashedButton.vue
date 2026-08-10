<script setup lang="ts">
// React AddDashedButton 과 동일 스펙 (목록형 "추가하기" 점선 버튼, 대시 1.5px gray500)
import { computed } from 'vue'

const props = withDefaults(defineProps<{ radius?: 'small' | 'large' }>(), { radius: 'large' })
const emit = defineEmits<{ (e: 'click', ev: MouseEvent): void }>()

const classes = computed(
  () =>
    `w-full flex items-center justify-center gap-2 border-[1.5px] border-dashed border-gray500 text-body2 font-medium text-gray600 transition-colors hover:border-sky hover:text-sky ${
      props.radius === 'large' ? 'rounded-large py-4' : 'rounded-small py-3.5'
    }`,
)
</script>

<template>
  <button type="button" :class="classes" @click="emit('click', $event)">
    <slot>추가하기 +</slot>
  </button>
</template>
