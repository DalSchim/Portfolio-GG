<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavComponent from "@/components/all/NavComponent.vue";

</script>
<template>
  <nav-component/>
  <transition name="page" mode="out-in">
    <RouterView :key="$route.fullPath" />
  </transition>
</template>

<style lang="scss" scoped>
/* Page transition: fade + slight translate */
.page-enter-active, .page-leave-active {
  transition: opacity 300ms ease, transform 300ms ease;
}
.page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.page-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.page-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
