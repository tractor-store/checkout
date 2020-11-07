import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';
import image from '@rollup/plugin-image';
import replace from '@rollup/plugin-replace';
import serve from 'rollup-plugin-serve';

const isDev = process.env.NODE_ENV === 'development';
const plugins = [
  resolve(),
  commonjs(),
  babel({ presets: ['@babel/preset-react'] }),
  postcss(),
  image(),
  replace({
    'process.env.NODE_ENV': JSON.stringify('production'),
  }),
];

if (isDev) {
  plugins.push(
    serve({
      contentBase: './dist',
      port: '9003',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    }),
  );
}

module.exports = {
  input: 'src/index.jsx',
  output: {
    name: 'checkout',
    file: 'dist/checkout.js',
    format: 'iife',
  },
  plugins,
};
