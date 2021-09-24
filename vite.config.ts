import { ConfigEnv, loadEnv } from "vite";
import { resolve } from "path";
import { wrapperEnv } from "./build/utils";
import { createVitePlugins } from "./build/vite/plugin";
import pkg from "./package.json";
import { OUTPUT_DIR } from "./build/constant";
const { dependencies, devDependencies, name, version } = pkg;
import { format } from "date-fns";
import { createProxy } from "./build/vite/proxy";
function pathResolve(dir: string) {
  return resolve(process.cwd(), ".", dir);
}
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
};
/**
 *
 */
export default ({ command, mode }: ConfigEnv) => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env);
  //.env-development配置
  const {
    VITE_PUBLIC_PATH,
    VITE_DROP_CONSOLE,
    VITE_PORT,
    VITE_GLOB_PROD_MOCK,
    VITE_PROXY,
  } = viteEnv;
  const prodMock = VITE_GLOB_PROD_MOCK;
  const isBuild = command === "build";
  // console.log(env);
  return {
    base: './',
    plugins: createVitePlugins(viteEnv, isBuild, prodMock),
    resolve: {
      alias: [
        {
          find: /\/#\//,
          replacement: pathResolve("types") + "/",
        },
        {
          find: "@",
          replacement: pathResolve("src") + "/",
        },
      ],
      dedupe: ["vue"],
    },
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },
    css: {
      preprocessorOptions: {
        scss: {
          modifyVars: {},
          javascriptEnabled: true,
          additionalData: `@import "@/styles/var.scss";`,
        },
      },
    },
    server: {
      host: true,
      port: VITE_PORT,
      proxy: createProxy(VITE_PROXY),
    },
    build: {
      target: "es2015",
      outDir: OUTPUT_DIR,
      terserOptions: {
        compress: {
          keep_infinity: true,
          drop_console: VITE_DROP_CONSOLE,
        },
      },
      brotliSize: false,
      chunkSizeWarningLimit: 2000,
    },
  };
};
