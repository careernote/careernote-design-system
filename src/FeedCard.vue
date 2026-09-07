<script setup lang="ts">
// React FeedCard 와 동일 스펙 — 인재 피드 카드 (프로필 + 대표 활동 갤러리 + 제목/설명 + 성과 박스)
import { computed, ref } from 'vue'
import Chip from './Chip.vue'
import ProfileAvatar from './ProfileAvatar.vue'
import UpdatedChip from './UpdatedChip.vue'
import ImageLightbox from './ImageLightbox.vue'

const props = withDefaults(
  defineProps<{
    name: string
    imageUrl?: string
    careerLabel: string
    job: string
    updatedDaysAgo: number
    title: string
    description?: string
    result?: string
    /** isMain 우선. 0장 미표출, 1~2장 가로, 3장 이상 큰 1장 + 작은 2장 (+N) */
    images?: string[]
    clickable?: boolean
    /** true 면 내장 라이트박스 대신 image-click emit */
    externalLightbox?: boolean
  }>(),
  { images: () => [], clickable: false, externalLightbox: false },
)

const emit = defineEmits<{ (e: 'click'): void; (e: 'image-click', index: number): void }>()

const lightbox = ref<number | null>(null)
const more = computed(() => props.images.length - 3)
function open(i: number) {
  if (props.externalLightbox) emit('image-click', i)
  else lightbox.value = i
}
const thumb = 'relative min-w-0 rounded-[7px] bg-gray800 overflow-hidden border-0 p-0 cursor-zoom-in transition-opacity hover:opacity-90'
</script>

<template>
  <div
    class="w-full flex flex-col gap-3 px-4 py-3 bg-white100 rounded-xlarge border border-transparent"
    :class="clickable ? 'cursor-pointer transition-all hover:border-border-gray hover:shadow-wide-light' : ''"
    @click="clickable && emit('click')"
  >
    <div class="flex items-center gap-2.5">
      <ProfileAvatar :name="name" :image-url="imageUrl" />
      <div class="min-w-0 flex-1 flex flex-col gap-1">
        <span class="text-body1 font-semibold text-gray900 truncate">{{ name }}</span>
        <div class="flex flex-wrap items-center gap-1">
          <Chip size="M" variant="soft" color="basic" class="font-normal">{{ careerLabel }}</Chip>
          <Chip size="M" variant="soft" color="basic" class="font-normal">{{ job }}</Chip>
          <UpdatedChip :days-ago="updatedDaysAgo" />
        </div>
      </div>
      <slot name="aside" />
    </div>

    <template v-if="images.length === 1">
      <button type="button" :class="thumb" class="w-full aspect-[388/201]" @click.stop="open(0)">
        <img :src="images[0]" alt="" class="absolute inset-0 w-full h-full object-cover" />
      </button>
    </template>
    <div v-else-if="images.length === 2" class="grid grid-cols-2 gap-3">
      <button v-for="(src, i) in images" :key="i" type="button" :class="thumb" class="aspect-[4/3]" @click.stop="open(i)">
        <img :src="src" alt="" class="absolute inset-0 w-full h-full object-cover" />
      </button>
    </div>
    <div v-else-if="images.length >= 3" class="grid grid-cols-[1fr_122px] gap-3">
      <button type="button" :class="thumb" class="aspect-[257/269]" @click.stop="open(0)">
        <img :src="images[0]" alt="" class="absolute inset-0 w-full h-full object-cover" />
      </button>
      <div class="flex flex-col gap-3">
        <button type="button" :class="thumb" class="flex-1 min-h-0" @click.stop="open(1)">
          <img :src="images[1]" alt="" class="absolute inset-0 w-full h-full object-cover" />
        </button>
        <div class="relative flex-1 min-h-0 flex">
          <button type="button" :class="thumb" class="flex-1" @click.stop="open(2)">
            <img :src="images[2]" alt="" class="absolute inset-0 w-full h-full object-cover" />
          </button>
          <button
            v-if="more > 0"
            type="button"
            class="absolute inset-0 rounded-[7px] bg-black60 border-0 p-0 cursor-zoom-in flex items-center justify-center text-subtitle3 font-semibold text-white100"
            @click.stop="open(3)"
          >
            +{{ more }}
          </button>
        </div>
      </div>
    </div>

    <p class="text-body1 font-semibold text-gray900 truncate">{{ title }}</p>
    <p v-if="description" class="text-body2 text-gray700 line-clamp-3 whitespace-pre-line">{{ description }}</p>
    <div v-if="result" class="px-4 py-3 rounded-xlarge bg-sky-bg">
      <p class="text-body2 text-gray800 line-clamp-4">{{ result }}</p>
    </div>

    <ImageLightbox v-if="!externalLightbox" :images="images" :index="lightbox" @close="lightbox = null" />
  </div>
</template>
