import LandingPageComponent from './components/landing-page-component.js';
import AboutPageComponent from './components/about-page-component.js';
import NavbarComponent from './components/navbar-component.js';
import CollectionPageComponent from './components/collection-page-component.js';
import ItemDetailPageComponent from './components/item-detail-page-component.js';

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

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
});

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

app.component('navbar-component', NavbarComponent);

app.use(router);
app.mount('#app');
