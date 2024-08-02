import type { Options } from 'tsup'
import { defineConfig } from 'tsup'
import { lessLoader } from 'esbuild-plugin-less'

const baseConfig: Options = {
  format: ['cjs', 'esm'],
  target: 'es2016',
  external: ['react', 'react-dom', 'react-router-dom'],
  sourcemap: true,
  minify: true,
  clean: true,
  dts: true,
  splitting: false,
  treeshake: true,
  injectStyle: false,
  esbuildPlugins: [lessLoader()],
}

export default defineConfig([
  {
    ...baseConfig,
    entry: ['./src/sdk/preview-sdk.ts'],
    outDir: 'lib',
  },

])
