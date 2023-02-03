import { defineConfig } from 'vite'
import path from 'path'
import ESLint from 'vite-plugin-eslint'
import Stylelint from 'vite-plugin-stylelint'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { VolverResolver } from '@volverjs/ui-vue/resolvers/unplugin'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			'~/': `${path.resolve(__dirname, 'src')}/`,
		},
	},
	plugins: [
		vue({ include: [/\.vue$/] }),
		// https://github.com/gxmari007/vite-plugin-eslint
		ESLint({
			exclude: ['**/node_modules/**'],
		}),
		// https://github.com/ModyQyW/vite-plugin-stylelint
		Stylelint(),
		// https://github.com/antfu/unplugin-vue-components
		Components({
			extensions: ['vue'],
			// allow auto import and register components
			include: [/\.vue$/, /\.vue\?vue/],
			dts: 'src/components.d.ts',
			exclude: [
				/[\\/]ui-vue[\\/]/,
				/[\\/]\.git[\\/]/,
				/[\\/]\.nuxt[\\/]/,
			],
			resolvers: [
				VolverResolver({
					importStyle: false,
					// customStylePath: 'src/assets/scss/style.scss',
				}),
			],
		}),
		// https://github.com/antfu/unplugin-auto-import
		AutoImport({
			imports: ['vue', '@vueuse/core'],
			dts: 'src/auto-imports.d.ts',
			dirs: ['src/common'],
			vueTemplate: true,
			eslintrc: {
				enabled: true,
			},
		}),
	],
	css: {
		preprocessorOptions: {
			scss: { additionalData: `@use "./src/assets/scss/settings" as *;` },
		},
	},
	optimizeDeps: {
		include: ['vue', '@vueuse/core'],
		exclude: ['@volverjs/ui-vue'],
	},
})
