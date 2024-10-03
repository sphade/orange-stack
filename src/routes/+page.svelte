<script lang="ts">
	import { enhance } from '$app/forms';

	export let data;
	console.log('🚀 ~ data:', data);
</script>

<form action="/" method="post" use:enhance>
	<input name="email" type="email" />
	<input name="name" type="text" />
	<button>submit</button>
</form>

<a href="/page-2">page 2</a>
