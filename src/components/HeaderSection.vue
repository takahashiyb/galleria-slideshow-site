<script lang="ts" setup></script>
<template>
  <header>
    <img src="@/assets/icons/logo.svg" alt="site logo" />
    <RouterLink to="" class="header__link--slideshow">START SLIDESHOW</RouterLink>
  </header>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/main.scss' as v;
@use '@/assets/styles/functions.scss' as f;

header {
  @include f.responsive-grid(v.$spacing-0300, v.$spacing-0100, 3, 60em);
  align-items: center;
  padding-top: v.$spacing-0300;
  padding-bottom: v.$spacing-0300;
}

header img {
  grid-column: 2;
  width: 100%;
  object-fit: contain;
  object-position: left;
  max-height: 48px;
}

.header__link--slideshow {
  grid-column: -2/-4;
  text-align: right;
  text-decoration: none;
  color: rgba(v.$grey-400, 100%);
}
</style>
