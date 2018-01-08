const {createFilter} = require('rollup-pluginutils')
const postcss = require('postcss')

module.exports = (options = {}) => {
	const {
		include,
		exclude,
		plugins
	} = options

	const filter = createFilter(include, exclude)
	return {
		transform(code, id) {
			if (filter(id) === false) {
				return null
			}

			const styles = code.match(/(<style((?!>).)*>((?!<\/style>)[\s\S])*<\/style>)/g)
			if (styles === null) {
				return null
			}

			const inner = styles.map(style => style.replace(/<\/?style>/g, ''))

			for(const style of inner) {
				const compiled = postcss(plugins).process(style).css
				code = code.replace(style, compiled)
			}

			return code
		}
	}
}
