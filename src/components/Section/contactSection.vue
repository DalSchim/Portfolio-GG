<template>
  <section class="Contact">
    <div class="container">

      <div class="content">
        <h2>Travaillons ensemble</h2>

        <p>
          Disponible pour des projets digitaux ambitieux.
          Discutons stratégie, UX et performance.
        </p>

        <div class="actions">
          <router-link to="/contact" class="btn primary">
            Contact
          </router-link>

          <a href="https://github.com/TON_USERNAME" target="_blank" class="btn ghost">
            GitHub
          </a>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.Contact {
  padding: 140px 0;
  background: var(--background-color);
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background:
        linear-gradient(rgba(48,188,237,0.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(48,188,237,0.05) 1px, transparent 1px);
    background-size: 80px 80px;
    opacity: 0.12;
  }

  .container {
    width: min(800px, 85%);
    margin: auto;
    font-family: "Kode Mono", monospace;
    color: var(--text-color);
    position: relative;
    z-index: 1;
  }

  h2 {
    font-size: 38px;
    margin-bottom: 20px;
    color: var(--secondary-color);
    letter-spacing: 3px;
  }

  p {
    opacity: 0.85;
    line-height: 1.7;
    margin-bottom: 40px;
  }

  .actions {
    display: flex;
    justify-content: center;
    gap: 16px;
    flex-wrap: wrap;
  }

  .btn {
    padding: 12px 20px;
    border-radius: 999px;
    font-size: 13px;
    letter-spacing: 1px;
    text-transform: uppercase;
    text-decoration: none;
    transition: 0.25s ease;
  }

  .primary {
    background: linear-gradient(
            135deg,
            var(--primary-color),
            var(--secondary-color)
    );
    color: #0c0c0e;

    &:hover {
      transform: translateY(-3px);
    }
  }

  .ghost {
    border: 1px solid rgba(48,188,237,0.3);
    color: var(--text-color);

    &:hover {
      background: rgba(48,188,237,0.1);
      transform: translateY(-3px);
    }
  }
}
</style>
