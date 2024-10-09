<script lang="ts">
	import { enhance } from '$app/forms';
	import { quill } from '$lib/actions.js';
	import type { TextChangeEvent } from '$lib/types.js';
	let { data } = $props();
	const options = {
		modules: {
			toolbar: true
		},
		placeholder: 'Compose an epic...',
		theme: 'snow'
	};
</script>

<svelte:head>;</svelte:head>

<h1>sveltekit + cloudflare fullstack template</h1>

<form action="/" method="post" use:enhance>
	<input name="email" type="email" />
	<input name="name" type="text" />
	<input name="password" type="text" />
	<button>submit</button>
</form>

<div id="iam" class="h-10 bg-red-100"></div>
{#each data.users as user}
	<p>{user.email}</p>
{/each}
<!-- quill -->

<div use:quill={options}></div>
