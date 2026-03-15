<script lang="ts" setup>
import { useDataStore } from '@/stores/data'
import { useDialogStore } from '@/stores/dialog'
import type { Painting } from '@/types/types'
import { ref, watch, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const data = useDataStore()

const dialog = useDialogStore()

const painting = ref<Painting>({
  name: '',
  year: 0,
  description: '',
  source: '',
  artist: {
    image: './assets/starry-night/artist.jpg',
    name: '',
  },
  images: {
    thumbnail: './assets/starry-night/thumbnail.jpg',
    hero: {
      small: './assets/starry-night/hero-small.jpg',
      large: './assets/starry-night/hero-large.jpg',
    },
    gallery: './assets/starry-night/gallery.jpg',
  },
})

const base = import.meta.env.BASE_URL

function onLoadPage(newId: string) {
  painting.value = data.findCurrentPage(newId as string) as Painting

  data.lastSeen = data.findCurrentIndex(route.params.name as string)
}

watch(
  () => route.params.name as string,
  (newId, oldId) => {
    onLoadPage(newId)
  },
)

onBeforeMount(() => {
  const newId = route.params.name as string

  onLoadPage(newId)
})

function openDialogOverlay() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
  dialog.openDialog()
}
</script>
<template>
  <section class="hero__container">
    <picture>
      <source
        :srcset="base + painting.images.hero.large.replace('./assets', '/assets/images')"
        media="(min-width: 700px)"
      />
      <img
        class="hero__image"
        :src="base + painting.images.hero.small.replace('./assets', '/assets/images')"
      />
    </picture>
    <button class="details__button--view-image" @click="openDialogOverlay">
      <img src="@/assets/icons/icon-view-image.svg" alt="view image icon" />
      <span>VIEW IMAGE</span>
    </button>
    <div class="details__container">
      <div class="details__info">
        <h1 class="details__name">{{ painting.name }}</h1>
        <h2 class="details__artist">{{ painting.artist.name }}</h2>
      </div>
    </div>
    <img
      class="details__artist--image"
      :src="base + painting.artist.image.replace('./assets', '/assets/images')"
    />
    <p class="details__year">{{ painting.year }}</p>
    <article class="details__description">{{ painting.description }}</article>
    <a class="details__source" :href="painting.source" target="blank"
      ><span class="sr-only">clicking this link will redirect to source site</span>GO TO SOURCE</a
    >
  </section>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/main.scss' as v;
@use '@/assets/styles/functions.scss' as f;

.hero__container {
  @include f.responsive-grid(v.$spacing-0300, v.$spacing-0000, 7, 100em);

  picture {
    grid-column: 2/-2;
    grid-row: 1;
  }
}

.hero__image {
  width: 100%;
}

.details__container {
  background-color: rgba(v.$white, 100%);

  height: min-content;
  width: 80%;

  translate: 0 calc(v.$spacing-0500 * -1);

  z-index: 2;

  grid-column: 2/9;
  grid-row: 2;
}

.details__name {
  margin-bottom: v.$spacing-0100;
}

.details__info {
  padding: v.$spacing-0300;
}

.details__artist--image {
  padding-inline: v.$spacing-0200;
  width: 100%;

  grid-column: 2/4;
  grid-row: 3;
}

.details__button--view-image {
  justify-self: start;

  background-color: v.$black;
  height: 40px;

  padding: v.$spacing-0200;
  border: none;

  margin-top: v.$spacing-0200;
  margin-left: v.$spacing-0200;

  display: flex;
  align-items: center;
  gap: v.$spacing-0200;

  grid-column: 2/7;
  grid-row: 1;

  cursor: pointer;
}

.details__year {
  color: rgba(v.$grey-100, 100%);
  white-space: nowrap;

  grid-column: 3/-2;
  grid-row: 3;
  justify-self: end;

  translate: 0 30%;
}

.details__description {
  color: rgba(v.$grey-400, 100%);

  grid-column: 2/-2;
  grid-row: 4;

  z-index: 2;
}

.details__source {
  text-decoration: none;
  color: rgba(v.$grey-400, 100%);

  grid-column: 2/-2;
  grid-row: 5;

  margin-top: v.$spacing-0800;
  margin-bottom: v.$spacing-0800;
  cursor: pointer;
}

@media (min-width: f.em(700)) {
  .hero__container {
    margin-bottom: v.$spacing-0700;
  }

  .hero__container picture {
    grid-column: 2/7;
    grid-row: 1/5;

    min-width: 100%;
  }

  .hero__image {
    height: 100%;

    object-fit: cover;
  }

  .details__container {
    grid-column: 5/-2;
    grid-row: 1;

    translate: 0;
    padding: 0;
    padding-left: v.$spacing-0500;
    padding-bottom: v.$spacing-0500;
  }

  .details__info {
    padding: 0;
  }

  .details__button--view-image {
    grid-column: 2/7;
    grid-row: 4;

    translate: 0 calc(-1 * v.$spacing-0300);
  }

  .details__artist--image {
    grid-column: 7/-2;
    grid-row: 2;
  }

  .details__year {
    grid-column: 2/7;
    grid-row: 6;

    justify-self: start;
    align-self: flex-start;

    translate: 0;
  }

  .details__description {
    grid-column: 3/-3;
    grid-row: 5/9;

    padding-top: calc(2 * v.$spacing-0800);
    padding-bottom: v.$spacing-0800;
  }

  .details__source {
    margin-top: 0;

    grid-column: 3;
    grid-row: 9;
    align-self: flex-start;
  }
}

@media (min-width: f.em(1000)) {
  .hero__container {
    @include f.responsive-grid(v.$spacing-0300, v.$spacing-0000, 14, 100em);

    margin-bottom: v.$spacing-1000;
  }

  .hero__container picture {
    grid-column: 2/7;
    grid-row: 1/4;
  }

  .details__container {
    grid-column: 6/10;

    padding-left: v.$spacing-0800;
    padding-bottom: v.$spacing-0800;
  }

  .details__button--view-image {
    grid-column: 2/4;
    grid-row: 3;

    align-self: end;
  }

  .details__artist--image {
    grid-column: 7/9;
    grid-row: 3/5;
  }

  .details__year {
    grid-column: 11/-2;
    grid-row: 1;
  }

  .details__description {
    grid-column: 11/-3;
    grid-row: 1/4;
  }

  .details__source {
    grid-column: 11/13;
    grid-row: 3;

    z-index: 2;
  }
}
</style>
