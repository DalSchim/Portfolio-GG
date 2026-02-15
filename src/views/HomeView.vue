<script setup lang="ts">

import HeaderComponent from "@/components/Section/HeaderComponent.vue";

import ProjectsSection from "@/components/Section/ProjectsSection.vue";
import MiniAbout from "@/components/Section/MiniAbout.vue";
import MettodSection from "@/components/Section/MettodSection.vue";
import ImpactSection from "@/components/Section/ImpactSection.vue";
import ContactSection from "@/components/Section/contactSection.vue";
import FooterSection from "@/components/Section/FooterSection.vue";

</script>

<template>
  <HeaderComponent/>
  <mini-about/>
  <mettod-section/>
  <projects-section/>
  <impact-section/>
  <contact-section/>
  <footer-section/>
</template>
