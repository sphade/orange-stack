<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
</script>

<Card.Root class="mx-auto max-w-sm">
	<Card.Header>
		<Card.Title class="text-xl">Sign in</Card.Title>
		<Card.Description>Enter your information to create an account</Card.Description>
	</Card.Header>
	<Card.Content>
		<a href="/api/google">Sign in with Google</a>
		<a href="/">goto home page</a>
		<div class="mt-4 text-center text-sm">
			Already have an account?
			<a href="##" class="underline"> Sign in </a>
		</div>
	</Card.Content>
</Card.Root>
