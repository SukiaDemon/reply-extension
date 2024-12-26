import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from "@rollup/plugin-typescript";
import terser from '@rollup/plugin-node-resolve';
import { obfuscator } from 'rollup-obfuscator';

export default {
  input: 'src/main.ts', 
  output: {
    file: 'dist/bundle.js', 
    format: 'iife', 
    name: 'MyBundle'
  },
  plugins: [
    resolve(),
    commonjs(),
		typescript({
			tsconfig: "./tsconfig.json",
			inlineSources: true
		}),
    /*terser({
      compress: {
          drop_console: true
      },
      mangle: true
    }),*/
    /*obfuscator({
      compact: true,
      controlFlowFlattening: true,
      deadCodeInjection: true,
    })*/
  ]
};
