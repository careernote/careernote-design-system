<script setup lang="ts">
// React ProfileHero 와 동일 스펙 — 상세페이지 프로필 이미지 카드 (이름/직무 오버레이 + 편집 버튼)
import Icon from './icons/Icon.vue'
withDefaults(defineProps<{ name: string; role: string; imageUrl?: string; editable?: boolean }>(), { editable: false })
const emit = defineEmits<{ (e: 'edit'): void }>()
</script>

<template>
  <div class="relative shrink-0 w-[172px] h-[180px] rounded-large overflow-hidden bg-gray800">
    <img v-if="imageUrl" :src="imageUrl" :alt="name" class="absolute inset-0 w-full h-full object-cover" />
    <button v-if="editable" type="button" aria-label="프로필 편집" class="absolute top-3 right-3 p-2 rounded-medium bg-black50 text-white100" @click="emit('edit')">
      <Icon name="edit" :size="20" color="white" />
    </button>
    <div class="absolute inset-x-0 bottom-0 flex flex-col p-4 pt-8 bg-gradient-to-t from-black60 to-transparent">
      <span class="text-subtitle2 font-semibold text-white100 truncate">{{ name }}</span>
      <span class="text-body2 leading-5 text-white100 truncate">{{ role }}</span>
    </div>
  </div>
</template>
