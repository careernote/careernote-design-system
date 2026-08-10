<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, Teleport } from 'vue'

/**
 * 반응형 모달 — 데스크톱은 센터 모달, 모바일(<=850px)은 하단 drawer.
 * React ResponsiveModal 과 동작 동일 (career-pencil 승격본).
 */
const {
  open,
  pcClass = 'max-w-[600px]',
  closeOnOutsideClick = true,
  hideOverlay = false
} = defineProps<{
  open: boolean
  /** 데스크톱 모달 패널에 적용할 추가 클래스 (max-w 등) */
  pcClass?: string
  /** 외부 클릭 시 닫기 (기본 true) */
  closeOnOutsideClick?: boolean
  /** 오버레이(배경 딤) 숨기기 (기본 false) */
  hideOverlay?: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const isMobile = ref(false)

function check() {
  isMobile.value = window.innerWidth <= 850
}

onMounted(() => {
  check()
  window.addEventListener('resize', check)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', check)
})

// 배경 스크롤 잠금
watch(() => open, isOpen => {
  if (isOpen) {
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
  } else {
    document.documentElement.style.overflow = ''
    document.body.style.overflow = ''
  }
}, { immediate: true })

function handleOverlayClick() {
  if (closeOnOutsideClick) emit('close')
}
</script>

<template>
  <Teleport to="body">
    <Transition name="rm-fade">
      <div
        v-if="open"
        class="fixed inset-0 z-[10000001] flex overflow-hidden"
        :class="[
          isMobile ? 'items-end justify-center' : 'items-center justify-center',
          hideOverlay ? '' : 'bg-black/50'
        ]"
        @click.self="handleOverlayClick"
      >
        <!-- 모바일: 하단 drawer -->
        <Transition v-if="isMobile" name="rm-drawer" appear>
          <div
            v-if="open"
            class="flex w-full max-h-[90dvh] flex-col overflow-hidden rounded-t-[16px] bg-white"
            @click.stop
          >
            <!-- 드래그 핸들 (시각적) -->
            <div class="flex justify-center pt-[8px] pb-[4px]">
              <div class="h-[4px] w-[36px] rounded-full bg-gray400" />
            </div>
            <div class="flex-1 overflow-y-auto">
              <slot />
            </div>
          </div>
        </Transition>

        <!-- 데스크톱: 센터 모달 -->
        <Transition v-else name="rm-scale" appear>
          <div
            v-if="open"
            class="relative mx-[20px] flex w-full flex-col rounded-[12px] bg-white shadow-[inset_0_0_0_1px_var(--color-border-gray)]"
            :class="pcClass"
            @click.stop
          >
            <slot />
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.rm-fade-enter-active,
.rm-fade-leave-active {
  transition: opacity 200ms ease-out;
}
.rm-fade-enter-from,
.rm-fade-leave-to {
  opacity: 0;
}

.rm-scale-enter-active,
.rm-scale-leave-active {
  transition: opacity 200ms ease-out, transform 200ms ease-out;
}
.rm-scale-enter-from,
.rm-scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.rm-drawer-enter-active,
.rm-drawer-leave-active {
  transition: transform 240ms ease-out;
}
.rm-drawer-enter-from,
.rm-drawer-leave-to {
  transform: translateY(100%);
}
</style>
