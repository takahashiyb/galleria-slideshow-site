<script lang="ts" setup>
import { useDataStore } from '@/stores/data'
import type { Painting } from '@/types/types'
import { ref, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const data = useDataStore()

const painting = ref<Painting>()

const base = import.meta.env.BASE_URL

onBeforeMount(() => {
  painting.value = data.json.find((i) => route.params.name === i.name.replace(/ /g, '').trim())
})
</script>
<template>
  <div class="hero_container">
    <picture></picture>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/main.scss' as v;
@use '@/assets/styles/functions.scss' as f;

.hero_container {
  @include f.responsive-grid(v.$spacing-0300, v.$spacing-0000, 16, 1000em);
}
</style>
