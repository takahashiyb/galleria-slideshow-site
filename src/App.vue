<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useDataStore } from './stores/data'

const data = useDataStore()

onBeforeMount(async () => {
  const res = await fetch(import.meta.env.BASE_URL + '/assets/data/data.json')
  data.json = await res.json()
})
</script>

<template>
  <router-view />
</template>

<style>
body {
  margin: 0;
}
</style>
