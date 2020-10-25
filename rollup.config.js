import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import pkg from "./package.json";
import printFromPackage from "./src/printFromPackage";

const rollupPackage = [
  // browser-friendly UMD build
  {
    input: "src/index.js",
    output: {
      name: "index",
      file: pkg.browser,
      format: "umd",
    },
    plugins: [
      resolve(), // so Rollup can find `ms`
      commonjs(), // so Rollup can convert `ms` to an ES module
    ],
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify
  // `file` and `format` for each target)
  {
    input: "src/index.js",
    external: ["ms"],
    output: [
      { file: pkg.main, format: "cjs" },
      { file: pkg.module, format: "es" },
    ],
  },
  // browser-friendly UMD build
  {
    input: "src/printFromPackage.js",
    output: {
      name: "printFromPackage",
      file: "dist/printFromPackage.umd.js",
      format: "umd",
    },
    plugins: [
      resolve(), // so Rollup can find `ms`
      commonjs(), // so Rollup can convert `ms` to an ES module
    ],
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify
  // `file` and `format` for each target)
  {
    input: "src/printFromPackage.js",
    external: ["ms"],
    output: [
      { file: "dist/printFromPackage.js", format: "cjs" },
      { file: "dist/printFromPackage.esm.js", format: "es" },
    ],
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify
  // `file` and `format` for each target)
  {
    input: "src/index.js",
    external: ["ms"],
    output: [
      { file: pkg.main, format: "cjs" },
      { file: pkg.module, format: "es" },
    ],
  },
  // browser-friendly UMD build
  {
    input: "src/services/testing.js",
    output: {
      name: "testing",
      file: "dist/testing.umd.js",
      format: "umd",
    },
    plugins: [
      resolve(), // so Rollup can find `ms`
      commonjs(), // so Rollup can convert `ms` to an ES module
    ],
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify
  // `file` and `format` for each target)
  {
    input: "src/services/testing.js",
    external: ["ms"],
    output: [
      { file: "dist/testing.js", format: "cjs" },
      { file: "dist/testing.esm.js", format: "es" },
    ],
  },
];

export default rollupPackage;
