import summary from 'rollup-plugin-summary';
import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/capture-eye.ts', // Entry point
  output: {
    file: 'dist/capture-eye.bundled.js',
    format: 'esm',
    name: 'CaptureEye',
    sourcemap: process.env.MODE !== 'prod',
  },
  onwarn(warning) {
    if (warning.code !== 'THIS_IS_UNDEFINED') {
      console.error(`(!) ${warning.message}`);
    }
  },
  plugins: [
    replace({ 
      'Reflect.decorate': 'undefined',
      preventAssignment: true
    }),
    resolve(),
    typescript({ tsconfig: './tsconfig.json' }),
    terser({
      ecma: 2021,
      module: true,
      warnings: true,
      mangle: {
        properties: {
          regex: /^__/,
        },
      },
    }),
    summary(),
  ],
};
