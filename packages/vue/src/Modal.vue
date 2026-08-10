<script setup lang="ts">
// React Modal 동일 스펙 (고정폭 확인 모달 — 기본형)
import Button from './Button.vue'

withDefaults(
  defineProps<{
    isOpen: boolean
    title: string
    subtitle?: string
    description?: string
    primaryLabel?: string
    secondaryLabel?: string
    size?: 'default' | 'expanded'
  }>(),
  { primaryLabel: '확인', size: 'default' },
)
const emit = defineEmits<{ (e: 'close'): void; (e: 'primary'): void; (e: 'secondary'): void }>()
</script>

<template>
  <Teleport to="body">
    <div v-if="isOpen" class="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50" @click.self="emit('close')">
      <div
        class="flex flex-col justify-center items-start gap-7 rounded-[10px] border border-[#F0F1F6] bg-white shadow-[0_0_15px_0_rgba(167,167,167,0.10)] px-7 py-8"
        :class="size === 'expanded' ? 'w-[550px]' : 'w-[400px] min-w-[300px] max-w-[400px]'"
      >
        <div class="flex flex-col gap-2 self-stretch">
          <p class="text-subtitle2 font-semibold text-gray900">{{ title }}</p>
          <p v-if="subtitle" class="text-body1 font-medium text-gray800">{{ subtitle }}</p>
          <p v-if="description" class="text-body2 text-gray700">{{ description }}</p>
        </div>
        <slot />
        <div class="flex items-center justify-end gap-3 self-stretch">
          <Button v-if="secondaryLabel" size="md" @click="emit('secondary')">{{ secondaryLabel }}</Button>
          <Button size="md" color="sky" @click="emit('primary')">{{ primaryLabel }}</Button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
