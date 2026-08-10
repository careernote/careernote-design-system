<script setup lang="ts">
// 진행중 점 3개 로티 — career-pencil LottieLoadingDots 승격본.
// 자산은 @careernote/assets/lottie/LoadingDots.json 을 소비자가 import 해 주입한다
// (패키지 간 의존 없이 단일 소스 유지). peer: lottie-web.
import { onMounted, onBeforeUnmount, shallowRef, useTemplateRef } from 'vue'
import lottie, { type AnimationItem } from 'lottie-web'

const props = defineProps<{ animationData: object }>()

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

onBeforeUnmount(() => {
  anim.value?.destroy()
  anim.value = null
})
</script>

<template>
  <div class="flex h-[16px] w-[60px] items-center justify-center">
    <div
      ref="container"
      style="width: 60px; height: 16px; transform: scale(7); transform-origin: center"
    />
  </div>
</template>
