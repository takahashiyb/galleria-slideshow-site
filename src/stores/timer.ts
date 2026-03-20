import { ref } from 'vue'
import { defineStore } from 'pinia'

import type { Painting } from '@/types/types'
import type { Router, RouteLocationNormalizedLoaded } from 'vue-router'

import { useDataStore } from '@/stores/data'

export const useTimerStore = defineStore('timer', () => {
  const data = useDataStore()

  const painting = ref<Painting>()

  const fromClick = ref<string>('card')

  const nextPainting = ref()
  const beforePainting = ref()
  const timer = ref(0)

  let intervalId = null
  let timeoutID = null
  let timerID = null

  const slideshowText = ref('')

  function onLoadPage(newId: string) {
    painting.value = data.findCurrentPage(newId as string) as Painting

    const index = data.findCurrentIndex(newId as string) as number

    beforePainting.value = { name: 'details', params: { name: data.getBefore(index) } }

    nextPainting.value = { name: 'details', params: { name: data.getNext(index) } }
  }

  async function isRunning(router: Router, route: RouteLocationNormalizedLoaded) {
    clearTimer()

    timer.value = 0

    timerID = setTimeout(() => {
      const start = Date.now()

      intervalId = setInterval(() => {
        const elapsed = Date.now() - start
        const progress = Math.min(elapsed / 5000, 1)
        timer.value = progress * 100

        if (progress === 1) {
          clearInterval(intervalId!)
        }
      }, 16)

      timeoutID = setTimeout(() => {
        router.push({
          name: 'details',
          params: {
            name: data.getNext(data.findCurrentIndex(route.params.name as string) as number),
          },
        })
      }, 5000)
    }, 2000)
  }

  function clearTimer() {
    if (intervalId!) {
      clearInterval(intervalId)
    }
    if (timeoutID!) {
      clearTimeout(timeoutID)
    }
    if (timerID!) {
      clearTimeout(timerID)
    }

    timer.value = 0
  }

  return {
    painting,
    nextPainting,
    beforePainting,
    timer,
    fromClick,
    slideshowText,
    onLoadPage,
    isRunning,
    clearTimer,
  }
})
