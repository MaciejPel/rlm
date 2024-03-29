<script lang="ts">
	import { page } from "$app/stores";
	import { goto } from "$app/navigation";
	import { setStore } from "../../../stores/setStore";
	import { showModal } from "../../../utils/functions";
	import CompactRow from "../../../components/CompactRow.svelte";
	import DeleteModal from "../../../components/DeleteModal.svelte";
	import { browser } from "$app/environment";

	interface Set {
		id: string;
		name: string;
		data: [string, string, number, number][];
	}

	let setId: string | null = null;
	let set: Set | null = null;

	function onRowSave(idx: number | null, src: string, tgt: string) {
		if (idx === null || !set) return;
		set.data[idx] = [src, tgt, set.data[idx][2], set.data[idx][3]];
		setStore.update((value: Set[]) => {
			if (!set) return value;
			value[value.findIndex((v) => v.id === setId)] = set;
			return value;
		});
	}

	function onSetReset() {
		setStore.update((value: Set[]) => {
			if (!set) return value;
			return value.filter((v) => {
				if (v.id !== set?.id) return v;
				for (let idx = 0; idx < v.data.length; idx++) {
					v.data[idx][2] = 0;
					v.data[idx][3] = 0;
				}
				return v;
			});
		});
	}

	function onSetDelete() {
		setStore.update((value: Set[]) => {
			if (!set) return value;
			return value.filter((v) => v.id !== set?.id);
		});
	}

	$: setId = $page.params.id;

	$: setStore.subscribe((value: Set[]) => {
		set = value.filter((v) => v.id === setId)[0];
	});

	$: if (!set && browser) goto("/set");
</script>

<svelte:head>
	<title>{set?.name || ""} | RLM</title>
</svelte:head>
<div class="flex flex-col gap-2">
	<div class="flex items-center justify-between">
		<h1 class="text-3xl font-bold">{set?.name || ""}</h1>
		<div class="join" class:hidden={!set}>
			<button
				class="btn btn-error join-item"
				on:click={() => {
					showModal("#delete-modal");
				}}
			>
				Delete
			</button>
			<button class="btn btn-warning join-item" on:click={() => onSetReset()}>Reset</button>
			<a href="/set/{setId}/edit" class="btn btn-primary join-item">Edit set</a>
			<a href="/set/{setId}/learning-mode" class="btn btn-success join-item">Learning mode</a>
		</div>
	</div>
	<div class="flex flex-col gap-2">
		{#if set?.data.length}
			{#each set.data as s, idx}
				<CompactRow {idx} source={s[0]} target={s[1]} {onRowSave} />
			{/each}
		{/if}
	</div>
</div>
<DeleteModal name={set?.name} {onSetDelete} />
