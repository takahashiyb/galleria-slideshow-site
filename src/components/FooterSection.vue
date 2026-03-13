<script lang="ts" setup>
import { useDataStore } from '@/stores/data'
import type { Painting } from '@/types/types'
import { ref, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const data = useDataStore()

const painting = ref<Painting>({
  name: '',
  year: 0,
  description: '',
  source: '',
  artist: {
    image: '',
    name: '',
  },
  images: {
    thumbnail: '',
    hero: {
      small: '',
      large: '',
    },
    gallery: '',
  },
})

onBeforeMount(() => {
  painting.value = data.json.find(
    (i) => route.params.name === i.name.replace(/ /g, '').trim(),
  ) as Painting
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
      <RouterLink :to="{}">
        <span class="sr-only">click to redirect previous painting</span>
        <img src="/src/assets//icons//icon-back-button.svg" alt="back icon" />
      </RouterLink>
      <RouterLink :to="{}">
        <span class="sr-only">click to redirect next painting</span>
        <img src="/src/assets//icons//icon-next-button.svg" alt="next icon" />
      </RouterLink>
    </div>
  </footer>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/main.scss' as v;
@use '@/assets/styles/functions.scss' as f;
footer {
  background-color: v.$white;

  @include f.responsive-grid(v.$spacing-0300, v.$spacing-0100, 2, 100em);
  align-items: center;

  padding-top: v.$spacing-0200;
  padding-bottom: v.$spacing-0200;

  position: sticky;
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
