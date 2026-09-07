<script setup lang="ts">
// React ImageLightbox 와 동일 스펙 — 원본 이미지 뷰어 (ESC·배경 클릭 닫기, ←/→ 이동)
import { onBeforeUnmount, ref, watch } from 'vue'
import Icon from './icons/Icon.vue'

const props = defineProps<{ images: string[]; index: number | null }>()
const emit = defineEmits<{ (e: 'close'): void; (e: 'index-change', index: number): void }>()

const current = ref(props.index ?? 0)
watch(() => props.index, (v) => { if (v !== null) current.value = v })

const go = (delta: number) => {
  if (!props.images.length) return
  current.value = (current.value + delta + props.images.length) % props.images.length
  emit('index-change', current.value)
}
const onKey = (e: KeyboardEvent) => {
  if (e.key === 'Escape') emit('close')
  else if (e.key === 'ArrowLeft') go(-1)
  else if (e.key === 'ArrowRight') go(1)
}
let prevOverflow = ''
watch(
  () => props.index !== null,
  (open) => {
    if (open) {
      document.addEventListener('keydown', onKey)
      prevOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
    } else {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  },
  { immediate: true },
)
onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKey)
  document.body.style.overflow = prevOverflow
})
</script>

<template>
  <Teleport to="body">
    <div
      v-if="index !== null && images.length"
      role="dialog"
      aria-modal="true"
      aria-label="이미지 보기"
      class="fixed inset-0 z-[10000002] flex items-center justify-center bg-black80"
      @click="emit('close')"
    >
      <button type="button" aria-label="닫기" class="absolute top-4 right-4 p-2 rounded-medium text-white100 hover:bg-white20" @click="emit('close')">
        <Icon name="close" :size="24" color="white" />
      </button>
      <template v-if="images.length > 1">
        <button type="button" aria-label="이전 이미지" class="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white20 text-white100 hover:bg-white50" @click.stop="go(-1)">
          <Icon name="arrow-left" :size="24" color="white" />
        </button>
        <button type="button" aria-label="다음 이미지" class="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white20 text-white100 hover:bg-white50" @click.stop="go(1)">
          <Icon name="arrow-right" :size="24" color="white" />
        </button>
        <span class="absolute bottom-4 left-1/2 -translate-x-1/2 text-body2 text-white100">{{ current + 1 }} / {{ images.length }}</span>
      </template>
      <img :src="images[current] ?? images[0]" alt="" class="max-w-[92vw] max-h-[90vh] object-contain rounded-medium" @click.stop />
    </div>
  </Teleport>
</template>
