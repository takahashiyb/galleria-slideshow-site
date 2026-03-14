<script lang="ts" setup>
import { useDataStore } from '@/stores/data'
import type { Painting } from '@/types/types'
import { ref, watch, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const data = useDataStore()

// watch for param changes
watch(
  () => route.params.name,
  (newId, oldId) => {
    painting.value = data.findCurrentPage(newId as string) as Painting

    const index = data.findCurrentIndex(newId as string) as number

    beforePainting.value = { name: 'details', params: { name: data.getBefore(index) } }

    nextPainting.value = { name: 'details', params: { name: data.getNext(index) } }
  },
)

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

const nextPainting = ref()
const beforePainting = ref()

onBeforeMount(() => {
  painting.value = data.findCurrentPage(route.params.name as string) as Painting

  const index = data.findCurrentIndex(route.params.name as string) as number

  beforePainting.value = { name: 'details', params: { name: data.getBefore(index) } }

  nextPainting.value = { name: 'details', params: { name: data.getNext(index) } }
})
</script>
<template>
  <footer>
    <div class="countdown-bar">
      <div class="progress"></div>
    </div>
    <div class="footer__current">
      <p class="footer__name">{{ painting.name }}</p>
      <p class="footer__artist">{{ painting.artist.name }}</p>
    </div>
    <div class="footer__control">
      <RouterLink :to="beforePainting">
        <img src="/src/assets//icons//icon-back-button.svg" alt="back icon" />
        <span class="sr-only">click to redirect previous painting</span>
      </RouterLink>
      <RouterLink :to="nextPainting">
        <img src="/src/assets//icons//icon-next-button.svg" alt="next icon" />
        <span class="sr-only">click to redirect next painting</span>
      </RouterLink>
    </div>
  </footer>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/main.scss' as v;
@use '@/assets/styles/functions.scss' as f;
footer {
  background-color: v.$white;
  min-width: 100%;

  @include f.responsive-grid(v.$spacing-0300, v.$spacing-0100, 2, 100em);
  align-items: center;

  padding-top: v.$spacing-0200;
  padding-bottom: v.$spacing-0200;

  position: fixed;
  bottom: 0;

  z-index: 99;
}

.footer__current {
  grid-column: 2;
  grid-row: 2;
}

.footer__control {
  justify-self: end;

  display: flex;
  gap: v.$spacing-0300;

  grid-column: 3;
  grid-row: 2;
}

.footer__control button {
  background-color: transparent;
  border: none;
}

.countdown-bar {
  grid-column: 1/-1;
  grid-row: 1;
  width: 100%;
  height: 3px;
  background-color: rgba(v.$grey-150, 100%);
}

.progress {
  height: 100%;
  width: 10%;
  background-color: rgba(v.$black, 100%);
}
</style>
