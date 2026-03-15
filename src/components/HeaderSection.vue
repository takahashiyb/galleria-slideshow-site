<script lang="ts" setup>
import { useDataStore } from '@/stores/data'
import { ref, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const data = useDataStore()

const page = ref()

const slideshowText = ref('')

onBeforeMount(() => {
  if (route.name === 'home') {
    page.value = { name: 'details', params: { name: data.getLastSeen } }
    slideshowText.value = 'START SLIDESHOW'
  }

  if (route.name === 'details') {
    page.value = { name: 'home' }
    slideshowText.value = 'STOP SLIDESHOW'
  }
})
</script>

<template>
  <header>
    <img src="@/assets/icons/logo.svg" alt="site logo" />
    <RouterLink :to="page" class="header__link--slideshow"
      ><span class="sr-only"
        >redirects to
        {{ slideshowText === 'START SLIDESHOW' ? 'slideshow page' : 'homepage' }}</span
      >{{ slideshowText }}</RouterLink
    >
  </header>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/main.scss' as v;
@use '@/assets/styles/functions.scss' as f;

header {
  background-color: v.$white;

  @include f.responsive-grid(v.$spacing-0300, v.$spacing-0100, 3, 100em);
  align-items: center;

  padding-top: v.$spacing-0300;
  padding-bottom: v.$spacing-0300;

  border-bottom: 2px solid rgba(v.$grey-150, 100%);

  margin-bottom: v.$spacing-0500;

  position: sticky;
  top: 0;

  z-index: 99;
}

header img {
  grid-column: 2;
  width: 100%;
  object-fit: contain;
  object-position: left;
  max-height: 48px;
}

.header__link--slideshow {
  grid-column: -2/-4;
  text-align: right;
  text-decoration: none;
  color: rgba(v.$grey-400, 100%);
}

.header__link--slideshow:hover {
  color: rgba(v.$black, 100%);
}
</style>
