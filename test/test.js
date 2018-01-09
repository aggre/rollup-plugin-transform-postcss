const assert = require('assert')
const rollup = require('rollup')
const cssnext = require('postcss-cssnext')
const precss = require('precss')
const postcss = require('../index')

describe('rollup-plugin-transform-postcss', () => {
	it('Transform the inside of <style> element with cssnext', () => {
		return rollup.rollup({
			entry: 'samples/cssnext.js',
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
		}).catch(err => {
			console.error(err)
		})
	})
	it('Use asynchronous plugin', () => {
		return rollup.rollup({
			entry: 'samples/precss.js',
			plugins: [
				postcss({
					plugins: [precss]
				})
			]
		}).then(bundle => {
			const {code} = bundle.modules[0]
			assert.ok(code.match(/color: #056ef0;/))
		}).catch(err => {
			console.error(err)
		})
	})
	it('include option', () => {
		return rollup.rollup({
			entry: 'samples/cssnext.js',
			plugins: [
				postcss({
					plugins: [cssnext],
					include: ['**/*.js']
				})
			]
		}).then(bundle => {
			const {code} = bundle.modules[0]
			assert.ok(code.match(/-webkit-box;/))
		})
	})
	it('exlude option', () => {
		return rollup.rollup({
			entry: 'samples/cssnext.js',
			plugins: [
				postcss({
					plugins: [cssnext],
					exclude: ['**/*.js']
				})
			]
		}).then(bundle => {
			const {code} = bundle.modules[0]
			assert.ok(code.match(/-webkit-box;/) === null)
		})
	})
})
