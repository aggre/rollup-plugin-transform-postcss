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

			const inner = styles.map(style => style.replace(/<\/?style((?!>).)*>/g, ''))

			return new Promise((resolve, reject) => {

				Promise.all(inner.map(style => {
					return postcss(plugins).process(style)
				})).then(results => {

					results.forEach((result, i) => {
						const compiled = result.css
						code = code.replace(inner[i], compiled)
					})
					resolve(code)

				}).catch(err => {
					reject(err)
				})

			})
		}
	}
}
