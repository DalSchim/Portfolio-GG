<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavComponent from "@/components/all/NavComponent.vue";

</script>
<template>
  <nav-component/>
  <transition name="page" mode="out-in">
    <div class="page-container" :key="$route.fullPath">
      <RouterView />
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.page-container {
  position: relative;
  min-height: 100vh; // ensure overlay covers full height
  overflow: hidden;
  will-change: transform, opacity;
  background: transparent;
}

/* Base enter/leave: smooth fade + slight scale/blur */
.page-enter-active, .page-leave-active {
  transition: opacity 450ms cubic-bezier(.2,.9,.2,1), transform 450ms cubic-bezier(.2,.9,.2,1), filter 450ms ease;
}
.page-enter-from {
  opacity: 0;
  transform: translateY(12px) scale(0.995);
  filter: blur(6px) saturate(0.8);
}
.page-enter-to {
  opacity: 1;
  transform: translateY(0) scale(1);
  filter: blur(0) saturate(1);
}
.page-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
  filter: blur(0);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.998);
  filter: blur(6px) saturate(1.2);
}

/* Futuristic neon sweep overlay */
.page-container::after {
  content: "";
  position: absolute;
  top: -10%;
  left: -40%;
  width: 40%;
  height: 120%;
  pointer-events: none;
  transform: translateX(-120%) skewX(-18deg);
  background: linear-gradient(90deg, transparent 0%, rgba(48,188,237,0.18) 35%, rgba(252,83,49,0.14) 60%, transparent 100%);
  opacity: 0;
  filter: blur(8px);
  border-radius: 8px;
}

/* Trigger the sweep during enter and leave */
.page-container.page-enter-active::after,
.page-container.page-leave-active::after {
  animation: neon-sweep 700ms cubic-bezier(.2,.9,.2,1);
}

@keyframes neon-sweep {
  0% {
    transform: translateX(-120%) skewX(-18deg);
    opacity: 0;
  }
  20% {
    opacity: 0.55;
  }
  60% {
    opacity: 0.4;
  }
  100% {
    transform: translateX(220%) skewX(-18deg);
    opacity: 0;
  }
}

/* subtle inner glow during transition */
.page-container.page-enter-active,
.page-container.page-leave-active {
  box-shadow: inset 0 0 80px rgba(48,188,237,0.03), 0 10px 40px rgba(0,0,0,0.35);
}
</style>
