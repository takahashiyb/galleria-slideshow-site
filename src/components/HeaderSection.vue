<script lang="ts" setup>
import { useDataStore } from '@/stores/data'
import { useTimerStore } from '@/stores/timer'
import { ref, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()

const router = useRouter()

const data = useDataStore()

const timer = useTimerStore()

const page = ref<{ name: string; params?: { name: string } }>()

onBeforeMount(() => {
  if (route.name === 'home') {
    page.value = { name: 'details', params: { name: data.getLastSeen } }

    timer.slideshowText = 'START SLIDESHOW'
  }

  if (route.name === 'details' && timer.fromClick === 'card') {
    timer.slideshowText = 'START SLIDESHOW'

    return
  }

  if ((route.name === 'details' && timer.fromClick === 'nav') || timer.fromClick === 'timer') {
    switchButtonText('stop')

    return runTimerIsRunning('start')
  }
})

function clickedSlideshow() {
  if (timer.slideshowText === 'START SLIDESHOW' && route.name === 'home') {
    router.push(page.value as object)
    timer.fromClick = 'timer'
  }

  if (timer.slideshowText === 'START SLIDESHOW' && route.name === 'details') {
    switchButtonText('stop')
    timer.fromClick = 'timer'
    return runTimerIsRunning('start')
  }

  if (timer.slideshowText === 'STOP SLIDESHOW' && route.name === 'details') {
    switchButtonText('start')
    return runTimerIsRunning('stop')
  }
}

function runTimerIsRunning(status: string) {
  if (status === 'start') {
    timer.isRunning(router, route)
  }
  if (status === 'stop') {
    timer.clearTimer()
  }
}

function returnHome() {
  router.push({ name: 'home' }).then(() => {
    switchButtonText('start')
  })
}

function switchButtonText(name: string) {
  if (name === 'start') {
    timer.slideshowText = 'START SLIDESHOW'
  }

  if (name === 'stop') {
    timer.slideshowText = 'STOP SLIDESHOW'
  }
}
</script>

<template>
  <header>
    <div class="header__logo" @click="returnHome">
      <span class="sr-only"> go to slideshow page and start it </span>
      <img src="@/assets/icons/logo.svg" alt="site logo" />
    </div>
    <div class="header__link--slideshow" @click="clickedSlideshow">
      <span class="sr-only">
        {{
          route.name === 'start'
            ? 'redirects to slideshow page'
            : timer.slideshowText === 'START SLIDESHOW'
              ? 'play the slideshow'
              : 'pause the slideshow'
        }} </span
      >{{ timer.slideshowText }}
    </div>
  </header>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/main.scss' as v;
@use '@/assets/styles/functions.scss' as f;

header {
  background-color: v.$white;

  @include f.responsive-grid(v.$spacing-0300, v.$spacing-0100, 3, 100em);
  align-items: center;

  padding-top: v.$spacing-0300;
  padding-bottom: v.$spacing-0300;

  border-bottom: 2px solid rgba(v.$grey-150, 100%);

  margin-bottom: v.$spacing-0500;

  position: sticky;
  top: 0;

  z-index: 99;
}

.header__logo {
  grid-column: 2;
  width: 100%;
}

.header__logo img {
  object-fit: contain;
  object-position: left;
  width: 100%;
  max-height: 48px;

  cursor: pointer;
}

.header__link--slideshow {
  grid-column: -2/-4;
  text-align: right;
  text-decoration: none;
  color: rgba(v.$grey-400, 100%);

  cursor: pointer;
}

.header__link--slideshow:hover {
  color: rgba(v.$black, 100%);
}
</style>
