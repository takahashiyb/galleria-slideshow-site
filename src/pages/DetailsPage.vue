<script lang="ts" setup>
import HeaderSection from '@/components/HeaderSection.vue'
import HeroImage from '@/components/HeroImage.vue'
import FooterSection from '@/components/FooterSection.vue'

import { useDataStore } from '@/stores/data'
import DialogSection from '@/components/DialogSection.vue'

const data = useDataStore()
</script>

<template>
  <DialogSection v-if="data.isDataReady" />
  <HeaderSection v-if="data.isDataReady" />
  <HeroImage v-if="data.isDataReady" />
  <FooterSection v-if="data.isDataReady" />
</template>
