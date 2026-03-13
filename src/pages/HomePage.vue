<script lang="ts" setup>
import HeaderSection from '@/components/HeaderSection.vue'
import ThumbnailCard from '@/components/ThumbnailCard.vue'
import { useDataStore } from '@/stores/data'

const data = useDataStore()
</script>
<template>
  <HeaderSection v-if="data.isDataReady" />
  <main>
    <ThumbnailCard v-if="data.isDataReady" />
  </main>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/main.scss' as v;
@use '@/assets/styles/functions.scss' as f;

main {
  max-width: 100em;

  justify-self: center;

  padding-inline: v.$spacing-0400;

  justify-content: center;
}

@media (min-width: f.em(700)) {
  main {
    column-count: 2;

    gap: v.$spacing-0500;
  }
}

@media (min-width: f.em(1000)) {
  main {
    column-count: 4;
  }
}
</style>
