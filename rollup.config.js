import path from 'path';

// Rollup plugins
import ts from '@wessberg/rollup-plugin-ts';
import scss from 'rollup-plugin-scss';
import alias from '@rollup/plugin-alias';
import { terser } from 'rollup-plugin-terser';

// Sass importer
import tildeImporter from 'node-sass-tilde-importer';

import pkgMeta from './package.json';

export default [{
  input: 'src/scripts/main.tsx',
  output: {
    name: 'main',
    file: pkgMeta.main,
    format: 'iife',
  },
  plugins: [
    terser(),
    ts(),
    scss({
      // resolving path prefixed with `~` as node modules eg `~normalize.css/normalize.css`
      importer: tildeImporter,
      // Filename to write all styles to
      output: 'public/style.css',
      // Determine if node process should be terminated on error (default: false)
      failOnError: true,
    }),
    alias({
      resolve: ['.jsx', '.js', '.ts', '.tsx', '.scss', '.css'],
      entries: {
        '@assets': path.join(__dirname, './assets'),
        '@styles': path.join(__dirname, './src/styles'),
        '@components': path.join(__dirname, './src/components'),
        '@scripts': path.join(__dirname, './src/scripts'),
        '@templates': path.join(__dirname, './src/templates'),
      },
    }),
  ],
},
];
