<script setup lang="ts">
// 카탈로그 전용 로티 미리보기 — @careernote/assets 자산을 lottie-web 으로 재생
import { onMounted, onBeforeUnmount, shallowRef, useTemplateRef } from 'vue'
import lottie, { type AnimationItem } from 'lottie-web'

const props = withDefaults(defineProps<{ animationData: object; size?: number }>(), { size: 80 })

const container = useTemplateRef<HTMLDivElement>('container')
const anim = shallowRef<AnimationItem | null>(null)

onMounted(() => {
  if (!container.value) return
  anim.value = lottie.loadAnimation({
    container: container.value,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    animationData: props.animationData,
  })
})
onBeforeUnmount(() => anim.value?.destroy())
</script>

<template>
  <div ref="container" :style="{ width: `${size}px`, height: `${size}px` }" />
</template>
