export default {
  name: 'landing-page-component',
  template: /* html */ `
    <div class="container py-4">
      <div class="p-4 p-md-5 rounded-4 bg-dark text-white shadow-sm">
        <h1 class="display-6 fw-bold mb-3">Doodle Games</h1>
        <p class="lead mb-4">Explore a colorful collection of browser-friendly games loaded from the new CSV data file.</p>
        <router-link to="/items" class="btn btn-light btn-lg"><i class="bi bi-play-circle me-2"></i>Browse the collection</router-link>
      </div>

      <div class="row g-4 mt-1">
        <div class="col-lg-7">
          <h2 class="h4 mt-3">What you'll find</h2>
          <p>
            Each card shows a game title, a short description, its category, and a matching image so visitors can quickly understand what each game is about.
          </p>
        </div>
        <div class="col-lg-5">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-body">
              <h3 class="h6 text-uppercase text-muted">Ready to play?</h3>
              <p class="mb-3">Open the collection to see the full set of games and jump to the details page for each one.</p>
              <router-link to="/items" class="btn btn-outline-primary">Open game gallery</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
};
