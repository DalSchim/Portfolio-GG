<template>
  <footer class="Footer">

    <!-- ===== Marquee ===== -->
    <div class="marquee" aria-label="Crédits défilants">
      <div class="track">

        <!-- Première piste -->
        <div class="content">
          <span v-for="(item, index) in items" :key="'a'+index">
            {{ item }}
          </span>
        </div>

        <!-- Deuxième piste (duplication pour loop parfait) -->
        <div class="content" aria-hidden="true">
          <span v-for="(item, index) in items" :key="'b'+index">
            {{ item }}
          </span>
        </div>

      </div>
    </div>

    <!-- ===== Bottom ===== -->
    <div class="bottom">
      <p>© {{ year }} GGONIDOU — Tous droits réservés.</p>
      <div class="credits">
        Design & Development by GGONIDOU
      </div>
    </div>

  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear();

const items = [
  "GGONIDOU • Développeur Web & Designer - Chef de projet • Paris • France •",
  "Un grand merci • à tous ceux qui ont contribué à ce projet, que ce soit par des idées, du feedback ou simplement en visitant mon portfolio •",
  "Merci à Gautier • pour le texturing du robot et l'inspiration visuelle •",
  "Merci à Bubb • pour la modélisation 3D du robot •"
];
</script>

<style scoped lang="scss">

.Footer {
  background: #0f0f12;
  border-top: 1px solid rgba(48,188,237,0.15);
  font-family: "Kode Mono", monospace;
  color: var(--text-color);
  overflow: hidden;
}

/* =========================
   MARQUEE
========================= */

.marquee {
  position: relative;
  width: 100%;
  overflow: hidden;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  background: rgba(255,255,255,0.02);

  /* Fade edges */
  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0;
    width: 80px;
    height: 100%;
    z-index: 2;
    pointer-events: none;
  }

  &::before {
    left: 0;
    background: linear-gradient(to right, #0f0f12 0%, rgba(15,15,18,0) 100%);
  }

  &::after {
    right: 0;
    background: linear-gradient(to left, #0f0f12 0%, rgba(15,15,18,0) 100%);
  }
}

.track {
  display: flex;
  width: max-content;
  will-change: transform;
  animation: marquee 55s linear infinite;
}

/* Pause au hover */
.marquee:hover .track {
  animation-play-state: paused;
}

/* Pause si focus (accessibilité) */
.marquee:focus-within .track {
  animation-play-state: paused;
}

.content {
  display: flex;
  align-items: center;
}

.content span {
  padding: 18px 36px;
  white-space: nowrap;
  font-size: 14px;
  letter-spacing: 2px;
  color: var(--secondary-color);
  opacity: 0.9;
  transition: opacity 0.2s ease;
}

.marquee:hover .content span {
  opacity: 1;
}

/* Animation fluide infinie */
@keyframes marquee {
  0% {
    transform: translate3d(0,0,0);
  }
  100% {
    transform: translate3d(-50%,0,0);
  }
}

/* Respect des préférences utilisateur */
@media (prefers-reduced-motion: reduce) {
  .track {
    animation: none;
    transform: none;
  }
}

/* =========================
   BOTTOM
========================= */

.bottom {
  padding: 40px 0;
  text-align: center;

  p {
    margin-bottom: 10px;
    opacity: 0.7;
    font-size: 13px;
  }

  .credits {
    font-size: 12px;
    opacity: 0.5;
  }
}

</style>
