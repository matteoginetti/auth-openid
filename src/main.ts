import { createApp } from 'vue'
import App from './App.vue'
import './assets/scss/style.scss'

import { VolverPlugin } from '@volverjs/ui-vue'
import iconsCollections from '@volverjs/ui-vue/icons'
const app = createApp(App)

app.mount('#app')
// install the plugin
app.use(VolverPlugin, {
	iconsCollections,
})
