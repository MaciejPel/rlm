<script lang="ts">
	import { slide } from "svelte/transition";

	export let idx = 0;
	export let [sourceValue, targetValue] = ["", ""];
	export let removeRow = (_: number) => {};
</script>

<div class="flex flex-col items-center w-full bg-base-200 rounded-xl" transition:slide>
	<div class="flex justify-between px-4 py-2 w-full">
		<span class="font-bold text-lg text-base-content">
			{idx + 1}
		</span>
		<button
			on:click={() => removeRow(idx)}
			type="button"
			class="fill-base-content hover:fill-error"
		>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-6 h-6">
				<path
					fill-rule="evenodd"
					d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
					clip-rule="evenodd"
				/>
			</svg>
		</button>
	</div>
	<hr class="w-full border-base-100 border-t-2" />
	<div class="w-full flex gap-12 p-4">
		<div class="w-full">
			<input
				type="text"
				bind:value={sourceValue}
				class="py-1 w-full bg-transparent border-b-2 border-base-content"
			/>
			<span class="uppercase text-xs font-bold opacity-75">Source</span>
		</div>
		<div class="w-full">
			<input
				type="text"
				bind:value={targetValue}
				class="py-1 w-full bg-transparent border-b-2 border-base-content"
			/>
			<span class="uppercase text-xs font-bold opacity-75">Target</span>
		</div>
	</div>
</div>
