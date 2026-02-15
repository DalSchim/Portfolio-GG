<template>
  <section class="Skills">
    <div class="container">
      <h2>Expertise</h2>

      <div class="skills-grid">
        <div class="card">
          <h3>Gestion & Stratégie</h3>
          <ul>
            <li>Transformation digitale</li>
            <li>Méthodes Agile</li>
            <li>Pilotage projet</li>
          </ul>
        </div>

        <div class="card">
          <h3>Développement</h3>
          <ul>
            <li>Vue / TypeScript</li>
            <li>Architecture Front</li>
            <li>API Integration</li>
          </ul>
        </div>

        <div class="card">
          <h3>UI / UX</h3>
          <ul>
            <li>Design System</li>
            <li>Wireframes</li>
            <li>Prototypage</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.Skills {
  padding: 120px 0;
  background: linear-gradient(
          180deg,
          var(--background-color),
          rgba(48,188,237,0.05)
  );

  .container {
    width: min(1100px, 85%);
    margin: auto;
    text-align: center;
    color: var(--text-color);
    font-family: "Kode Mono", monospace;
  }

  h2 {
    font-size: 36px;
    margin-bottom: 60px;
    color: var(--primary-color);
    text-transform: uppercase;
    letter-spacing: 3px;
  }

  .skills-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
  }

  .card {
    padding: 30px;
    border-radius: 18px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
    backdrop-filter: blur(10px);
    transition: 0.3s ease;

    h3 {
      margin-bottom: 20px;
      color: var(--secondary-color);
    }

    ul {
      list-style: none;
      padding: 0;
      line-height: 2;
      opacity: 0.85;
    }

    &:hover {
      transform: translateY(-6px);
      box-shadow: 0 0 40px rgba(48,188,237,0.2);
    }
  }

  @media(max-width: 900px){
    .skills-grid{
      grid-template-columns: 1fr;
    }
  }
}
</style>
