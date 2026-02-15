<template>
  <footer class="Footer">

    <!-- Marquee -->
    <div class="marquee">
      <div class="track">
        <span>
          Portfolio 2026 • Transformation Digitale • Vue • UX/UI • GitHub API • Design System •
        </span>
        <span>
          Portfolio 2026 • Transformation Digitale • Vue • UX/UI • GitHub API • Design System •
        </span>
      </div>
    </div>

    <!-- Bottom -->
    <div class="bottom">
      <p>
        © {{ year }} GGONIDOU — Tous droits réservés.
      </p>

      <div class="credits">
        Design & Development by GGONIDOU
      </div>
    </div>

  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear();
</script>

<style scoped lang="scss">
.Footer {
  background: #0f0f12;
  border-top: 1px solid rgba(48,188,237,0.15);
  font-family: "Kode Mono", monospace;
  color: var(--text-color);
  overflow: hidden;
}

/* ===== Marquee ===== */

.marquee {
  width: 100%;
  overflow: hidden;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  background: rgba(255,255,255,0.02);
}

.track {
  display: flex;
  width: fit-content;
  animation: scroll 25s linear infinite;
}

.track span {
  padding: 18px 40px;
  white-space: nowrap;
  font-size: 14px;
  letter-spacing: 2px;
  color: var(--secondary-color);
}

@keyframes scroll {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

/* ===== Bottom ===== */

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
