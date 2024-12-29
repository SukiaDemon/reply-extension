import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from "@rollup/plugin-typescript";
import terser from '@rollup/plugin-node-resolve';
import {obfuscator} from 'rollup-obfuscator';
import image from "@rollup/plugin-image";
import url from "@rollup/plugin-url";

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
        image(),
        url({
            limit: 50 * 1024, // 50 kB
            include: ['**/*.svg', '**/*.png', '**/*.jpg', '**/*.gif'],
            emitFiles: true,
            fileName: '[name][hash][extname]'
        })
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
