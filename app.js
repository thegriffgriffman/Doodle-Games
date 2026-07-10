(async () => {
  try {
    // Define components directly instead of importing
    const LandingPageComponent = {
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

    const AboutPageComponent = {
      name: 'about-page-component',
      template: `
        <section class="container py-4">
          <h1>About Me</h1>
          <p>Hi, thank you so much for visiting my website. It took me some time to make it, but it's done!</p>
          <p>It doesn't look like much, but I'll be adding more games to look at every now and then. I really hope you enjoy.</p>
          <p class="text-muted small">p.s., the artwork on the homescreen is NOT mine.</p>
          <div class="about-mascot-wrap mt-4 text-center">
            <img src="./assets/mascot.jpg" alt="DOODLE mascot" class="about-mascot" />
          </div>
        </section>
      `,
    };

    const NavbarComponent = {
      name: 'navbar-component',
      template: `
        <nav class="navbar sticky-top navbar-emerald border-bottom px-3">
          <span class="navbar-brand mb-0 h1"><i class="bi bi-controller me-2"></i>Doodle Games</span>

          <div class="ms-auto d-flex gap-2">
            <router-link class="btn btn-outline-light btn-sm" to="/">
              <i class="bi bi-house me-1"></i>Home
            </router-link>
            <router-link class="btn btn-outline-light btn-sm d-flex align-items-center" to="/items">
              <i class="bi bi-card-list me-1"></i>Items
            </router-link>
            <router-link class="btn btn-outline-light btn-sm" to="/about">
              <i class="bi bi-info-circle me-1"></i>About
            </router-link>
          </div>
        </nav>
      `,
    };

    const CollectionPageComponent = {
      name: 'collection-page-component',
      setup() {
        const itemsStore = Vue.inject('itemsStore');

        return {
          itemsStore,
        };
      },
      template: `
        <section class="container py-4">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h1 class="h3 mb-0">Collection</h1>
            <span class="badge text-bg-light border">{{ itemsStore.items.length }} shown</span>
          </div>

          <p class="text-muted">Browse the current game collection loaded from the CSV data file and preview each title with its image, summary, and platform.</p>

          <div v-if="itemsStore.isLoading" class="alert alert-secondary" role="status">
            Loading items...
          </div>

          <div v-else-if="itemsStore.error" class="alert alert-danger" role="alert">
            {{ itemsStore.error }}
          </div>

          <div v-else-if="itemsStore.items.length === 0" class="alert alert-warning" role="alert">
            No items found in the dataset.
          </div>

          <div v-else class="row g-3">
            <div class="col-12 col-md-6 col-lg-4" v-for="item in itemsStore.items" :key="item.id">
              <article class="card h-100 shadow-sm border-0">
                <img
                  v-if="item.imageUrl"
                  :src="item.imageUrl"
                  :alt="item.name"
                  loading="lazy"
                  class="card-img-top collection-card-image object-fit-cover"
                  @error="(event) => event.target.src = 'https://picsum.photos/seed/placeholder/800/600'" />
                <div
                  v-else
                  class="collection-card-image d-flex align-items-center justify-content-center bg-light text-muted">
                  No image available
                </div>

                <div class="card-body d-flex flex-column">
                  <div class="d-flex justify-content-between align-items-start mb-2">
                    <h2 class="h5 card-title mb-0">{{ item.name }}</h2>
                    <span class="badge text-bg-primary ms-2">{{ item.category || 'General' }}</span>
                  </div>

                  <p class="card-text text-muted flex-grow-1 collection-description">
                    {{ item.description || 'No description available.' }}
                  </p>

                  <p class="small mb-3"><strong>Platform:</strong> {{ item.location || 'Browser game' }}</p>

                  <div class="d-grid gap-2">
                    <a v-if="item.gameUrl" :href="item.gameUrl" class="btn btn-success btn-sm" target="_blank">
                      <i class="bi bi-play-circle me-1"></i>Play Now
                    </a>
                    <router-link :to="\`/items/\${item.id}\`" class="btn btn-outline-secondary btn-sm">
                      View details
                    </router-link>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>
      `,
    };

    const ItemDetailPageComponent = {
      name: 'item-detail-page-component',
      setup() {
        const itemsStore = Vue.inject('itemsStore');
        const route = VueRouter.useRoute();

        const selectedItem = Vue.computed(() => {
          return itemsStore.items.find((item) => item.id === route.params.id);
        });

        return {
          itemsStore,
          selectedItem,
        };
      },
      template: `
        <section class="container py-4">
          <router-link to="/items" class="btn btn-link ps-0 mb-3">← Back to collection</router-link>

          <div v-if="itemsStore.isLoading" class="alert alert-secondary" role="status">
            Loading item details...
          </div>

          <div v-else-if="itemsStore.error" class="alert alert-danger" role="alert">
            {{ itemsStore.error }}
          </div>

          <div v-else-if="!selectedItem" class="alert alert-warning" role="alert">
            Item not found.
          </div>

          <article v-else class="card shadow-sm border-0 overflow-hidden">
            <img
              v-if="selectedItem.imageUrl"
              :src="selectedItem.imageUrl"
              :alt="selectedItem.name"
              loading="lazy"
              class="item-detail-image w-100 object-fit-cover"
              @error="(event) => event.target.src = 'https://picsum.photos/seed/placeholder/800/600'" />
            <div
              v-else
              class="item-detail-image w-100 d-flex align-items-center justify-content-center bg-light text-muted">
              No image available
            </div>

            <div class="card-body p-4">
              <div class="d-flex align-items-center gap-2 mb-2">
                <h1 class="h3 mb-0">{{ selectedItem.name }}</h1>
                <span class="badge text-bg-primary">{{ selectedItem.category || 'General' }}</span>
              </div>

              <p class="lead mb-3">{{ selectedItem.description || 'No description available.' }}</p>
              <p class="mb-2"><strong>Category:</strong> {{ selectedItem.category || 'Featured' }}</p>
              <p class="mb-2"><strong>Platform:</strong> {{ selectedItem.location || 'Browser game' }}</p>
              <p class="text-muted mb-3"><strong>Item ID:</strong> {{ selectedItem.id }}</p>
              
              <div v-if="selectedItem.gameUrl" class="mt-4">
                <a :href="selectedItem.gameUrl" class="btn btn-lg btn-success" target="_blank">
                  <i class="bi bi-play-circle me-2"></i>Play Game
                </a>
              </div>
            </div>
          </article>
        </section>
      `,
    };

    console.log('All components defined successfully');
    
    // Define routes AFTER all components are defined
    const routes = [
      {
        path: '/',
        component: LandingPageComponent,
      },
      {
        path: '/about',
        component: AboutPageComponent,
      },
      {
        path: '/items',
        component: CollectionPageComponent,
      },
      {
        path: '/items/:id',
        component: ItemDetailPageComponent,
      },
    ];

    // Create router
    const router = VueRouter.createRouter({
      history: VueRouter.createWebHashHistory(),
      routes,
    });

    // Create app
    const app = Vue.createApp({
      setup() {
        const itemsStore = Vue.reactive({
          items: [],
          isLoading: true,
          error: '',
        });

        fetch('items.csv')
          .then((response) => {
            if (!response.ok) {
              throw new Error('Could not load CSV data file.');
            }
            return response.text();
          })
          .then((csvText) => {
            Papa.parse(csvText, {
              header: true,
              skipEmptyLines: true,
              transformHeader: (header) => header.trim().toLowerCase().replace(/\s+/g, '_'),
              complete: ({ data, errors }) => {
                if (errors.length > 0) {
                  itemsStore.error = 'There was a problem reading the CSV data.';
                  itemsStore.items = [];
                } else {
                  itemsStore.items = data
                    .filter((row) => row && Object.values(row).some((value) => String(value || '').trim()))
                    .map((row) => {
                      const name = String(row.name || row.title || row.item_name || row.game || '').trim();
                      const rawId = String(row.id || row.slug || row.item_id || row.game_id || name || '').trim();
                      const id = rawId
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, '-')
                        .replace(/(^-|-$)/g, '');

                      return {
                        id: id || 'item',
                        name,
                        description: String(row.description || row.summary || row.details || row.blurb || '').trim(),
                        category: String(row.category || row.genre || row.type || row.tag || 'Featured').trim(),
                        imageUrl: String(row.image_url || row.imageurl || row.image || row.thumbnail || row.cover || row.screenshot || '').trim(),
                        location: String(row.location || row.where || row.platform || row.platforms || row.source || 'Browser game').trim(),
                        gameUrl: String(row.game_url || row.gameurl || row.url || row.link || '').trim(),
                      };
                    });
                  
                  itemsStore.error = '';
                }
                itemsStore.isLoading = false;
              },
              error: () => {
                itemsStore.error = 'There was a problem parsing CSV data.';
                itemsStore.items = [];
                itemsStore.isLoading = false;
              },
            });
          })
          .catch(() => {
            itemsStore.error = 'There was a problem loading data.';
            itemsStore.items = [];
            itemsStore.isLoading = false;
          });

        Vue.provide('itemsStore', itemsStore);

        return {};
      },
    });

    // Register components and setup app
    app.component('navbar-component', NavbarComponent);
    app.use(router);
    app.mount('#app');

    console.log('App mounted successfully');
    
  } catch (error) {
    console.error('Failed to initialize app:', error);
    document.getElementById('app').innerHTML = '<p style="color:red; padding: 20px;">Error initializing app: ' + error.message + '</p>';
  }
})();
