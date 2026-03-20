<script lang="ts" setup>
import { useDataStore } from '@/stores/data'
import { useTimerStore } from '@/stores/timer'
import { useRouter } from 'vue-router'

const data = useDataStore()

const timer = useTimerStore()

const router = useRouter()

const base = import.meta.env.BASE_URL

function clickCard(painting: string) {
  const name = 'details'
  const param = { name: painting.replace(/ /g, '').trim() }

  timer.fromClick = 'card'

  router.push({ name: name, params: param })
}
</script>
<template>
  <div class="card" v-for="painting in data.json" @click="clickCard(painting.name)">
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
  </div>
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

  cursor: pointer;
}

.card__artist {
  padding-top: v.$spacing-0100;
  color: rgba(v.$white, 75%);
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
