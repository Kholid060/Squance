import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import '~/assets/scss/base/tailwind.scss';
import UiComponents from './components/Base';
import VueMdijs from './plugins/vue-mdijs';

/* Directives */
import VTooltip from './directives/VTooltip';

const app = createApp(App);

/* Register Plugins */
app.use(VueMdijs);

/* Register Directive */
app.directive('tooltip', VTooltip);

UiComponents(app);
app.use(store);
app.use(router).mount('#app');
