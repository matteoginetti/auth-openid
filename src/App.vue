<script setup lang="ts">
	import { useStorage } from '@vueuse/core'
	import { OAuthClient, OAuthClientOptions } from './common/OAuthClient'

	let authClient: OAuthClient = {} as OAuthClient

	const showConfig = ref(false)
	const showProfile = ref(false)

	const store = useStorage('openidConfig', {} as OAuthClientOptions)

	const saveConfig = async () => {
		if (authClient && authClient.logout) authClient.logout()
		showConfig.value = false
		authClient = new OAuthClient(store.value)
		await authClient.initialize()
		authClient.authorize()
	}

	onMounted(() => {
		if (store.value.clientId) {
			saveConfig()
			return
		}
		showConfig.value = true
	})
	onBeforeUnmount(() => {
		authClient.logout()
	})

	watchEffect(() => {
		showProfile.value = authClient && authClient.accessToken ? true : false
	})
</script>
<template>
	<div id="app" class="app p-48">
		<vv-card modifiers="glass">
			<template #header>
				<div class="flex justify-between items-center">
					<h1>CONFIG</h1>
					<VvButton
						v-if="!showConfig && !showProfile"
						@click="showConfig = true">
						CONFIG
					</VvButton>
					<VvButton v-if="showProfile" @click="authClient.logout()">
						LOG-OUT
					</VvButton>
				</div>
			</template>

			<div class="p-16">
				<template v-if="showConfig">
					<vv-input-text
						v-model="store.url"
						label="Url"
						type="text" />
					<vv-input-text
						v-model="store.clientId"
						label="Client ID"
						type="text" />
					<vv-input-text
						v-model="store.scopes"
						label="Scopes"
						type="text" />

					<vv-button @click="saveConfig">Submit</vv-button>
				</template>
				<template v-else-if="showProfile">{{
					authClient.accessToken
				}}</template>
			</div>
		</vv-card>
	</div>
</template>
<style lang="scss">
	.app {
		height: 100vh;
	}
</style>
