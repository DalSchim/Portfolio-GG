<template>
  <section class="MiniAbout">
    <div class="container">
      <h2>Vision & Positionnement</h2>

      <p>
        Chef de projet en transformation digitale, je pilote des projets
        complexes en combinant stratégie, UX/UI et développement web.
        Mon objectif : aligner vision business, expérience utilisateur
        et performance technique.
      </p>

      <router-link to="/About" class="btn" draggable="false">
        En savoir plus →
      </router-link>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.MiniAbout {
  padding: 100px 0;
  background: rgba(255,255,255,0.02);
  text-align: center;

  .container {
    width: min(900px, 85%);
    margin: auto;
    font-family: "Kode Mono", monospace;
    color: var(--text-color);
  }

  h2 {
    margin-bottom: 25px;
    color: var(--secondary-color);
    letter-spacing: 3px;
  }

  p {
    line-height: 1.8;
    opacity: 0.85;
    margin-bottom: 30px;
  }

  .btn {
    padding: 10px 18px;
    border-radius: 999px;
    background: linear-gradient(
            135deg,
            var(--primary-color),
            var(--secondary-color)
    );
    color: #0c0c0e;
    text-decoration: none;
    font-size: 13px;
    letter-spacing: 1px;
  }
}
</style>
