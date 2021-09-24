import { createApp } from "vue";
import App from "./App.vue";
import "./styles/tailwind.css";
import { setupStore } from "@/store";
import { setupRouter } from "./router";
import { setupNaive } from "@/plugins";
import wowjoy from "wowjoy-vui";

async function bootstrap() {
  const app = createApp(App);
  setupStore(app);
  setupRouter(app);
  // setupNaive(app);
  app.use(wowjoy);
  app.mount("#app");
}
bootstrap();
