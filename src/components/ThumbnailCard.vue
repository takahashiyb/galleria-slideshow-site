<script lang="ts" setup>
import { useDataStore } from '@/stores/data'

const data = useDataStore()

const base = import.meta.env.BASE_URL
</script>
<template>
  <div v-for="painting in data.json" class="card">
    <img
      :src="base + painting.images.thumbnail.replace('./assets', '/assets/images')"
      :alt="'image of ' + painting.name"
    />
    <div class="card__info">
      <p class="card__name">{{ painting.name }}</p>
      <p class="card__artist">{{ painting.artist.name }}</p>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/main.scss' as v;

.card {
  margin-bottom: v.$spacing-0500;

  display: grid;
  grid-template-rows: 1fr min-content;
}

.card img {
  grid-row: 1/-1;
  grid-column: 1;
  width: 100%;
}

.card__info {
  grid-row: 2;
  grid-column: 1;
  color: rgba(v.$white, 100%);
  background: v.$gradient;

  padding-bottom: v.$spacing-0400;
  padding-inline: v.$spacing-0400;
}
</style>
