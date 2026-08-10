<script setup lang="ts">
// 돋보기 + 클리어(✕) 검색 인풋 — 직업 검색 등 4곳 반복 패턴 승격본.
withDefaults(defineProps<{ modelValue?: string; placeholder?: string }>(), {
  modelValue: '',
  placeholder: '검색',
})

const emit = defineEmits<{ (e: 'update:modelValue', v: string): void }>()
</script>

<template>
  <div class="flex items-center gap-[8px] rounded-[10px] border border-neutral-200 bg-white px-[14px] py-[10px] focus-within:border-sky">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" class="flex-shrink-0 text-gray600">
      <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2" />
      <path d="M20 20L17 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
    <input
      :value="modelValue"
      type="text"
      :placeholder="placeholder"
      class="flex-1 bg-transparent text-[14px] text-gray-900 outline-none placeholder:text-gray600"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <button v-if="modelValue" type="button" class="text-[12px] text-gray600" aria-label="지우기" @click="emit('update:modelValue', '')">
      ✕
    </button>
  </div>
</template>
