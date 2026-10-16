<script setup lang="ts">
// 커리어노트 로고 로딩 로티 — React LottieLoadingLogo 와 같은 스펙. 화면·버튼 안 "불러오는 중"의 기본 표시.
// 자산은 @careernote/assets/lottie/LoadingLogo.json 을 소비자가 import 해 주입한다
// (패키지 간 의존 없이 단일 소스 유지). peer: lottie-web.
import { onMounted, onBeforeUnmount, shallowRef, useTemplateRef } from 'vue'
import lottie, { type AnimationItem } from 'lottie-web'

const props = withDefaults(
  defineProps<{
    animationData: object
    /** 한 변 px (기본 48) — 로고는 정사각 안에 비율을 지켜 들어간다 */
    size?: number
  }>(),
  { size: 48 },
)

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
  <div
    ref="container"
    class="shrink-0"
    :style="{ width: `${size}px`, height: `${size}px` }"
    role="status"
    aria-label="불러오는 중"
  />
</template>
