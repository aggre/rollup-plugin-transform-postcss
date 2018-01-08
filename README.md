# rollup-plugin-transform-postcss

Transform any files with PostCSS

## Installation

```bash
npm install --save-dev rollup-plugin-transform-postcss
```

## Usage

```js
// input.js
export default () => {
	return `
	<style>
		body {
			display: flex;
		}
	</style>`
}
```

```js
// rollup.config.js
import postcss from 'rollup-plugin-transform-postcss';
import cssnext from 'postcss-cssnext'; // e.g. use cssnext

export default {
	input: 'input.js',
	output: {
		file: 'output.js',
		format: 'iife'
	},
	name: 'MyModule',
	plugins: [
		postcss({
			// Specify PostCSS plugin
			// e.g. use cssnext
			plguins: [cssnext], // Required

			include: ['**/*.js'], // Optional

			exclude: ['**/*.html'] // Optional
		})
	]
};
```

```js
// output.js
var MyModule = (function () {
'use strict';

var displayFlex = () => {
	return `
	<style>
		body {
			display: -webkit-box;
			display: -ms-flexbox;
			display: flex;
		}
	</style>`
}

return displayFlex;

}());
```

## License

MIT
