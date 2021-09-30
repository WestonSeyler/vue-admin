import { createApp } from "vue";
import App from "./App.vue";
import "./styles/tailwind.css";
import { setupStore } from "@/store";
import { setupRouter } from "./router";
import { setupNaive, setupDirectives } from "@/plugins";
import "./styles/font/iconfont.css";
import wowjoy from "wowjoy-vui";

async function bootstrap() {
  const app = createApp(App);
  setupStore(app);
  setupRouter(app);
  // setupNaive(app);
  setupDirectives(app);
  app.use(wowjoy);
  app.mount("#app");
}
bootstrap();
