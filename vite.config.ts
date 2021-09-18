import { ConfigEnv, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import { wrapperEnv } from "./build/utils";
import { createVitePlugins } from "./build/vite/plugin";
import pkg from "./package.json";
const { dependencies, devDependencies, name, version } = pkg;

// https://vitejs.dev/config/
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
    base: VITE_PUBLIC_PATH,
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
  };
};
// export default defineConfig({
//   plugins: [vue()],
//   resolve: {
//     alias: [
//       {
//         find: /\/#\//,
//         replacement: pathResolve("types") + "/",
//       },
//       {
//         find: "@",
//         replacement: pathResolve("src") + "/",
//       },
//     ],
//     dedupe: ["vue"],

//   },
// });
