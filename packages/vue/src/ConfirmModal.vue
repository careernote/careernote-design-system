<script setup lang="ts">
// 확인/취소 2버튼 확인 모달 — React ConfirmModal 동일 스펙 (reka-ui 직결).
// peer: reka-ui.
import {
  AlertDialogRoot,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
} from 'reka-ui'

const props = withDefaults(
  defineProps<{
    open: boolean
    title: string
    description: string
    cancelText?: string
    confirmText?: string
    /** true 면 바깥 클릭/ESC 시 dismiss 이벤트 발생 (기본 false — 기존 소비처 동작 유지) */
    dismissable?: boolean
    isLoading?: boolean
  }>(),
  { cancelText: '취소', confirmText: '확인', dismissable: false, isLoading: false },
)

const emit = defineEmits<{ (e: 'close'): void; (e: 'confirm'): void; (e: 'dismiss'): void }>()

function onOpenChange(v: boolean) {
  if (!v && props.dismissable && !props.isLoading) emit('dismiss')
}
</script>

<template>
  <AlertDialogRoot :open="open" @update:open="onOpenChange">
    <AlertDialogPortal>
      <AlertDialogOverlay class="fixed inset-0 z-[70] bg-black/30" />
      <AlertDialogContent
        class="fixed left-1/2 top-1/2 z-[70] grid w-full max-w-[400px] -translate-x-1/2 -translate-y-1/2 gap-10 overflow-y-auto rounded-medium bg-white p-6 shadow-normal-normal focus:outline-none mobile:w-[90%]"
      >
        <div class="flex w-full flex-col items-start gap-3">
          <AlertDialogTitle class="w-full text-[16px] font-semibold leading-[20px] text-gray900">
            {{ title }}
          </AlertDialogTitle>
          <AlertDialogDescription class="w-full text-[14px] font-normal leading-[18px] whitespace-pre-line text-gray700">
            {{ description }}
          </AlertDialogDescription>
        </div>
        <div class="flex h-[46px] w-full items-center justify-end gap-3">
          <button
            :disabled="isLoading"
            class="rounded-small border border-gray500 bg-white px-6 py-3.5 text-[14px] font-semibold leading-[18px] text-gray800 transition-colors hover:bg-bg-gray1 disabled:cursor-not-allowed disabled:opacity-50"
            @click="emit('close')"
          >
            {{ cancelText }}
          </button>
          <button
            :disabled="isLoading"
            class="rounded-small bg-gray900 px-6 py-3.5 text-[14px] font-semibold leading-[18px] text-white transition-colors hover:bg-gray800 disabled:cursor-not-allowed disabled:opacity-50"
            @click="emit('confirm')"
          >
            {{ confirmText }}
          </button>
        </div>
      </AlertDialogContent>
    </AlertDialogPortal>
  </AlertDialogRoot>
</template>
