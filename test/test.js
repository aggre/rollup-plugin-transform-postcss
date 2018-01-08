const assert = require('assert')
const rollup = require('rollup')
const cssnext = require('postcss-cssnext')
const postcss = require('../index')

describe('rollup-plugin-transform-postcss', () => {
	it('Transform the inside of <style> element with cssnext', () => {
		return rollup.rollup({
			entry: 'samples/display-flex.js',
			plugins: [
				postcss({
					plugins: [cssnext]
				})
			]
		}).then(bundle => {
			const {code} = bundle.modules[0]
			assert.ok(code.match(/flex;/))
			assert.ok(code.match(/-webkit-box;/))
			assert.ok(code.match(/-ms-flexbox;/))
		})
	})
})
