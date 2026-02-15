<template>
  <section class="Method">
    <div class="container">
      <h2>Méthodologie</h2>

      <div class="grid">
        <div class="step">
          <span>01</span>
          <h3>Cadrage & Audit</h3>
          <p>Analyse des besoins, audit UX, définition des objectifs.</p>
        </div>

        <div class="step">
          <span>02</span>
          <h3>Stratégie & Roadmap</h3>
          <p>Planification agile, priorisation et vision long terme.</p>
        </div>

        <div class="step">
          <span>03</span>
          <h3>Design & Développement</h3>
          <p>Interfaces performantes et expérience moderne.</p>
        </div>

        <div class="step">
          <span>04</span>
          <h3>Optimisation & Data</h3>
          <p>Suivi KPI, amélioration continue et performance.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.Method {
  padding: 120px 0;
  background: var(--background-color);

  .container {
    width: min(1100px, 85%);
    margin: auto;
    color: var(--text-color);
    font-family: "Kode Mono", monospace;
  }

  h2 {
    text-align: center;
    margin-bottom: 60px;
    color: var(--secondary-color);
    letter-spacing: 3px;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 25px;
  }

  .step {
    padding: 30px;
    border-radius: 18px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(48,188,237,0.15);
    transition: 0.3s ease;

    span {
      font-size: 18px;
      color: var(--primary-color);
      font-weight: bold;
    }

    h3 {
      margin: 15px 0;
    }

    &:hover {
      transform: translateY(-6px);
      box-shadow: 0 0 40px rgba(48,188,237,0.2);
    }
  }

  @media(max-width: 900px){
    .grid { grid-template-columns: 1fr 1fr; }
  }

  @media(max-width: 600px){
    .grid { grid-template-columns: 1fr; }
  }
}
</style>
