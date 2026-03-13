<script lang="ts" setup>
import FooterSection from '@/components/FooterSection.vue'
import HeaderSection from '@/components/HeaderSection.vue'
import HeroImage from '@/components/HeroImage.vue'
import { useDataStore } from '@/stores/data'

const data = useDataStore()
</script>
<template>
  <HeaderSection v-if="data.isDataReady" />
  <HeroImage v-if="data.isDataReady" />
  <FooterSection v-if="data.isDataReady" />
</template>
