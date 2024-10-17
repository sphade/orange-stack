<script lang="ts">
	import { enhance } from '$app/forms';

	let { data } = $props();
</script>

<h1>
	name{data?.todos?.name}
</h1>
<h1>
	{data.todos?.todos.length} todos
</h1>
{#each data?.todos?.todos as todo}
	<div>{todo?.content}</div>
{:else}
	no todo
{/each}
<h1>sveltekit + cloudflare fullstack template</h1>

<form action="/" use:enhance method="POST" enctype="multipart/form-data">
	<input type="text" name="content" />
	<input type="file" name="file" />
	<button>submit</button>
</form>
