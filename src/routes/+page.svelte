<script lang="ts">
	import { enhance } from '$app/forms';

	let { data } = $props();
</script>

<h1>sveltekit + cloudflare fullstack template</h1>

<form action="/" method="post" use:enhance>
	<input name="email" type="email" />
	<input name="name" type="text" />
	<input name="password" type="text" />
	<button>submit</button>
</form>

{#each data.users as user}
	<p>{user.email}</p>
{/each}
<a href="/page-2">page 2</a>
