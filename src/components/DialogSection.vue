<script lang="ts" setup>
import { ref, watch, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'

import type { Painting } from '@/types/types'

import { useDataStore } from '@/stores/data'
import { useDialogStore } from '@/stores/dialog'

const route = useRoute()

const data = useDataStore()

const dialog = useDialogStore()
const painting = ref<Painting>({
  name: '',
  year: 0,
  description: '',
  source: '',
  artist: {
    image: './assets/starry-night/artist.jpg',
    name: '',
  },
  images: {
    thumbnail: './assets/starry-night/thumbnail.jpg',
    hero: {
      small: './assets/starry-night/hero-small.jpg',
      large: './assets/starry-night/hero-large.jpg',
    },
    gallery: './assets/starry-night/gallery.jpg',
  },
})

const base = import.meta.env.BASE_URL

function onLoadPage(id: string) {
  painting.value = data.findCurrentPage(id as string) as Painting
}

watch(
  () => route.params.name,
  (newId, oldId) => {
    onLoadPage(newId as string)
  },
)

onBeforeMount(() => {
  const id = route.params.name as string

  onLoadPage(id)
})

// This freezes the scroll
watch(
  () => dialog.isDialogOpen,
  (newState, oldState) => {
    if (newState) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  },
)
</script>

<template>
  <dialog :open="dialog.isDialogOpen">
    <div class="dialog__container">
      <button class="dialog__close" @click="dialog.closeDialog">
        <span class="sr-only">button that closes the gallery</span>CLOSE
      </button>
      <img
        :src="base + painting.images.gallery.replace('./assets', '/assets/images')"
        :alt="'a picture of ' + painting.name"
      />
    </div>
  </dialog>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/main.scss' as v;
dialog {
  min-width: 100%;
  min-height: 100%;
  background-color: rgba(v.$black, 75%);

  z-index: 199;

  place-content: center;

  padding: v.$spacing-0300;
}

.dialog__container img {
  width: 100%;
  object-fit: contain;
}

dialog[open] {
  display: grid;
}

.dialog__container {
  display: flex;
  flex-direction: column;
  align-items: end;

  margin-inline: auto;
}

.dialog__close {
  border: none;
  background-color: transparent;
  color: rgba(v.$white, 100%);
  cursor: pointer;
}
</style>
