import type { Painting } from '@/types/types'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useDataStore = defineStore('data', () => {
  const json = ref<Painting[]>([])

  const isDataReady = ref(false)

  const lastSeen = ref(0)

  const getLastSeen = computed(() => {
    return json.value[lastSeen.value]!.name.replace(/ /g, '').trim()
  })

  const getCurrentPage = computed(() => {
    return json.value.find((i) => getLastSeen.value === i.name.replace(/ /g, '').trim()) as Painting
  })

  function findCurrentPage(param: string) {
    return json.value.find((i) => param === i.name.replace(/ /g, '').trim())
  }

  function findCurrentIndex(param: string) {
    return json.value.findIndex((i) => param === i.name.replace(/ /g, '').trim())
  }

  function getNext(currentIndex: number) {
    if (json.value.length <= currentIndex + 1) {
      return json.value[0]!.name.replace(/ /g, '').trim()
    }

    return json.value[currentIndex + 1]!.name.replace(/ /g, '').trim()
  }

  function getBefore(currentIndex: number) {
    if (0 > currentIndex - 1) {
      return json.value[json.value.length - 1]!.name.replace(/ /g, '').trim()
    }

    return json.value[currentIndex - 1]!.name.replace(/ /g, '').trim()
  }

  return {
    json,
    isDataReady,
    lastSeen,
    getLastSeen,
    getCurrentPage,
    findCurrentPage,
    findCurrentIndex,
    getNext,
    getBefore,
  }
})
