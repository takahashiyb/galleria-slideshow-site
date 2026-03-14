<script lang="ts" setup>
import HeaderSection from '@/components/HeaderSection.vue'
import HeroImage from '@/components/HeroImage.vue'
import FooterSection from '@/components/FooterSection.vue'

import { useDataStore } from '@/stores/data'
import { useDialogStore } from '@/stores/dialog'
import DialogSection from '@/components/DialogSection.vue'

const data = useDataStore()

const dialog = useDialogStore()

</script>

<template>
  <DialogSection v-if="data.isDataReady" />
  <HeaderSection v-if="data.isDataReady" />
  <HeroImage v-if="data.isDataReady" />
  <FooterSection v-if="data.isDataReady" />
</template>

<style lang="scss" scoped>
@use '@/assets/styles/main.scss' as v;
</style>
