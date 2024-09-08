import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { terser } from 'rollup-plugin-terser';
import babel from '@rollup/plugin-babel';
// Use import assertions for JSON
import pkg from './package.json' assert { type: 'json' };

export default {
	input: 'src/index.tsx',
	output: [
		{
			file: pkg.main,
			format: 'cjs',
			sourcemap: true,
		},
		{
			file: pkg.module,
			format: 'esm',
			sourcemap: true,
		},
	],
	plugins: [
		peerDepsExternal(),
		resolve(),
		commonjs(),
		typescript({ tsconfig: './tsconfig.json' }),
		json(),
		babel({
			exclude: 'node_modules/**',
			presets: ['@babel/preset-env', '@babel/preset-react'],
			babelHelpers: 'bundled',
		}),
		terser(), // Minify the output
	],
	external: ['react', 'react-dom'],
	onwarn: (warning, warn) => {
		// Suppress specific warnings or all warnings if desired
		if (warning.code === 'CIRCULAR_DEPENDENCY') {
			return;
		}
		// Pass through other warnings
		warn(warning);
	},
};
