import { createSSRApp } from "vue";
import uviewPlus from 'uview-plus';
import { setupRouteGuards } from './router/guard'
import App from "./App.vue";
export function createApp() {
  const app = createSSRApp(App);
  app.use(uviewPlus);
  setupRouteGuards();
  return {
    app,
  };
}
