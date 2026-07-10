export default {
  name: 'landing-page-component',
  template: `
    <section class="title-page d-flex align-items-center justify-content-center text-center">
      <div class="hero container">
        <h1 class="doodle-title mb-4">DOODLE GAMES</h1>

        <div class="mascot-wrap mb-4">
          <img src="./assets/mascot.jpg" alt="DOODLE mascot" class="mascot-img" />
        </div>

        <p class="lead mb-4 text-muted">Explore a colorful collection of browser-friendly games from the gallery.</p>
        <router-link to="/items" class="btn btn-lg btn-outline-light"><i class="bi bi-play-circle me-2"></i>Browse the collection</router-link>
      </div>
    </section>
  `,
};
