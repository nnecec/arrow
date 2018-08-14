import typescript from 'typescript'
import rollupTypescript from 'rollup-plugin-typescript2'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'
import { uglify } from 'rollup-plugin-uglify'
import less from 'rollup-plugin-less'
import postcss from 'rollup-plugin-postcss'
import buble from 'rollup-plugin-buble'

const plugins = [
  replace({
    'process.env.NODE_ENV': JSON.stringify('production')
  }),
  resolve({
    preferBuiltins: true,
    jsnext: true,
    main: true,
    browser: true
  }),

  rollupTypescript({
    typescript
  }),
  commonjs({
    // All of our own sources will be ES6 modules, so only node_modules need to be resolved with cjs
    include: 'node_modules/**',
    namedExports: {
      // The commonjs plugin can't figure out the exports of some modules, so if rollup gives warnings like:
      // ⚠️   'render' is not exported by 'node_modules/react-dom/index.js'
      // Just add the mentioned file / export here
      'node_modules/react-dom/index.js': [
        'render',
      ],
      'node_modules/react/index.js': [
        'Children',
        'Component',
        'PropTypes',
        'createElement',
      ],
    },
  }),
  less(),
  postcss({ extract: true }),
  buble(),
  // uglify(),
]

const dependencies = Object.keys(require('../package.json').dependencies)

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'umd',
    name: 'arrow',
    sourceMap: false,
  },
  plugins,
  external: dependencies,
}