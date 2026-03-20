<script lang="ts" setup>
import { useTimerStore } from '@/stores/timer'
import type { Painting } from '@/types/types'
import { watch, onBeforeMount, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()

const router = useRouter()

const timer = useTimerStore()

// watch for param changes
watch(
  () => route.params.name,
  (newId, oldId) => {
    timer.onLoadPage(newId as string)
    if (timer.fromClick === 'timer') {
      timer.isRunning(router, route)
    }
    if (timer.fromClick === 'card') {
      timer.clearTimer()
    }
  },
)

onBeforeMount(() => {
  const newId = route.params.name as string

  timer.onLoadPage(newId as string)
})

onUnmounted(() => {
  timer.clearTimer()
})

function pressPrevious() {
  router.push(timer.beforePainting)
}

function pressNext() {
  router.push(timer.nextPainting)
}
</script>
<template>
  <footer>
    <div class="countdown-bar">
      <div class="progress" :style="`width: ${timer.timer}%`"></div>
    </div>
    <div class="footer__current">
      <p class="footer__name">{{ (timer.painting as Painting).name }}</p>
      <p class="footer__artist">{{ (timer.painting as Painting).artist.name }}</p>
    </div>
    <nav class="footer__control">
      <div class="button__control" @click="pressPrevious">
        <img src="/src/assets//icons//icon-back-button.svg" alt="back icon" />
        <span class="sr-only">click to redirect previous painting</span>
      </div>
      <div class="button__control" @click="pressNext">
        <img src="/src/assets//icons//icon-next-button.svg" alt="next icon" />
        <span class="sr-only">click to redirect next painting</span>
      </div>
    </nav>
  </footer>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/main.scss' as v;
@use '@/assets/styles/functions.scss' as f;

footer {
  background-color: v.$white;
  min-width: 100%;

  @include f.responsive-grid(v.$spacing-0300, v.$spacing-0100, 2, 100em);
  align-items: center;

  padding-top: v.$spacing-0200;
  padding-bottom: v.$spacing-0200;

  position: fixed;
  bottom: 0;

  z-index: 99;
}

.footer__current {
  grid-column: 2;
  grid-row: 2;
}

.footer__control {
  justify-self: end;

  display: flex;
  gap: v.$spacing-0300;

  grid-column: 3;
  grid-row: 2;
}

.button__control {
  cursor: pointer;
}

.footer__control button {
  background-color: transparent;
  border: none;
}

.countdown-bar {
  grid-column: 1/-1;
  grid-row: 1;
  width: 100%;
  height: 3px;
  background-color: rgba(v.$grey-150, 100%);
}

.progress {
  height: 100%;
  background-color: rgba(v.$black, 100%);
}
</style>
