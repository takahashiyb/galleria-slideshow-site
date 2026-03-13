<script lang="ts" setup>
import HeaderSection from '@/components/HeaderSection.vue'
import ThumbnailCard from '@/components/ThumbnailCard.vue'
</script>
<template>
  <HeaderSection />
  <main>
    <ThumbnailCard />
  </main>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/main.scss' as v;
@use '@/assets/styles/functions.scss' as f;

main {
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
