import { getBabelOutputPlugin } from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import rollupTypescript from 'rollup-plugin-typescript2';
import { uglify } from "rollup-plugin-uglify";

export default {
  input: 'src/index.ts',
  output: {
    name: 'bundle',
    file: './dist/colbugs.umd.js',
    format: 'esm',
  },
  plugins: [
    rollupTypescript(),
    resolve(),
    commonjs(),
    getBabelOutputPlugin({
      presets: [['@babel/env', { modules: 'umd' }]]
    }),
    uglify({mangle:{
      toplevel: true
      }})
  ]
};
