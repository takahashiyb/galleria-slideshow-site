<script lang="ts" setup>
import { useDataStore } from '@/stores/data'

const data = useDataStore()

const base = import.meta.env.BASE_URL
</script>
<template>
  <RouterLink
    :to="{ name: 'details', params: { name: painting.name.replace(/ /g, '').trim() } }"
    v-for="painting in data.json"
    class="card"
  >
    <span class="sr-only">link to painting details of {{ painting.name }}</span>
    <img
      :src="base + painting.images.thumbnail.replace('./assets', '/assets/images')"
      :alt="'image of ' + painting.name"
    />
    <div class="card__hover"></div>
    <div class="card__info">
      <p class="card__name">{{ painting.name }}</p>
      <p class="card__artist">{{ painting.artist.name }}</p>
    </div>
  </RouterLink>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/main.scss' as v;

a {
  text-decoration: none;
}

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

.card:hover .card__hover {
  grid-row: 1/-1;
  grid-column: 1;
  background-color: rgba(v.$white, 50%);
}

.card__info {
  grid-row: 2;
  grid-column: 1;
  color: rgba(v.$white, 100%);
  background: v.$gradient;

  padding-top: v.$spacing-0400;
  padding-bottom: v.$spacing-0400;
  padding-inline: v.$spacing-0400;
}
</style>
