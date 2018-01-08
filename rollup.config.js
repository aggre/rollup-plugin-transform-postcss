import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

export default {
	entry: 'src/index.js',
	output: {
		file: 'index.js',
		format: 'umd',
		name: 'rollup-plugin-transform-postcss'
	},
	external: ['path', 'os', 'fs'],
	globals: {
		path: 'path', os: 'os', fs: 'fs'
	},
	plugins: [
		nodeResolve({
			jsnext: true
		}),
		commonjs()
	]
}
