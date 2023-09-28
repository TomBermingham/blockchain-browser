<script>
	import Header from "./Header.svelte";
	import "./styles.css";
	import CodeMirror from "svelte-codemirror-editor";
	import { html } from "@codemirror/lang-html";
	import { showSource } from "$lib/source.js";
	import { browser } from "$app/environment";
	import "@picocss/pico";
	import { network } from "$lib/network.js";
	import { afterNavigate, onNavigate, goto } from "$app/navigation";
	import { onMount } from 'svelte';

	export let data;

	onMount(async () => {
		const urlParams = new URLSearchParams(window.location.search);
		addr = urlParams.get("address");
		loadPage(addr);
	});

	onNavigate(async () => {
		const urlParams = new URLSearchParams(window.location.search);
		addr = urlParams.get("address");
		loadPage(addr);
	});

	const samplePage = `<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title></title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="pico.min.css" rel="stylesheet">
    <style>
        html {
            background-color: #F3F3F8;
        }
    </style>
</head>

<body class="container">
    
</body>

</html>`;

	let frame;
	let value = ``;
	value = data.page;
	let addr = "";
	let saving = false;
	let newSite = false;
	let isWebsiteAtDomain = false;

	const loadPage = async (address) => {
		isWebsiteAtDomain = false;

		//if address then load page -> return
		//if contains a . lookup site -> return

		//show new site page

		if (addr === undefined || addr === null) {
			value = `<link href="pico.min.css" rel="stylesheet">
<style>
	html {
		background-color: #F3F3F8;
	}
</style>
<main class="container">
    <header class="container">
        <hgroup>
            <h1>Welcome</h1>
            <h2><b>See websites</b> hosted on the blockchain, or <b>make your own</b>.</h2>
        </hgroup>
        <a role="button" href="?address=welcome.eth">See websites</a>
        <a role="button" class="secondary outline" href="?address=">Make a website</a>
    </header>
</main>`;
			return;
		}

		if (address === "") {
			value = samplePage;
			$showSource = true;
			newSite = true;
			return;
		}

		newSite = false;

		if (address === "list") {
			value = await network.list('moon');
			return;
		}

		if (address.includes(".")) {
			try {
				value = await network.lookupSite(address);
				isWebsiteAtDomain = true;
			} catch (error) {
				const hex = await network.lookupDomain(address);
				if (hex === "0x0000000000000000000000000000000000000000") {
					value = samplePage;
					$showSource = true;
					return;
				}
			}
		} else {
			value = await getHTML(address);
		}
	};

	const createSite = () => {
		saving = true;
		network.createSite(addr, value);
	}

	const updateSite = () => {
		saving = true;
		network.updateSite(addr, value);
	}

// 	if (browser) {
// 		const urlParams = new URLSearchParams(window.location.search);
// 		addr = urlParams.get("address");
// 		if (addr === undefined || addr === null) {
// 			value = `<link href="pico.min.css" rel="stylesheet">
// <style>
// 	html {
// 		background-color: #F3F3F8;
// 	}
// </style>
// <main class="container">
//     <header class="container">
//         <hgroup>
//             <h1>Welcome</h1>
//             <h2><b>See websites</b> hosted on the blockchain, or <b>make your own</b>.</h2>
//         </hgroup>
//         <a role="button" href="?address=welcome.eth">See websites</a>
//         <a role="button" class="secondary outline" href="?address=">Make a website</a>
//     </header>
// </main>`;
// 		} else {
// 			loadPage(addr);
// 		}
// 	}
</script>

<svelte:head>
	<title>Browser</title>
	<meta name="description" content="Blockchain browser" />
</svelte:head>

<div class="app">
	<Header {addr} />

	<main>
		<iframe
			title="title"
			srcdoc={browser ? value : ""}
			bind:this={frame}
			sandbox="allow-same-origin"
			on:load={() => {
				const links = frame.contentDocument.querySelectorAll("a");
				for (let c = 0; c < links.length; c++) {
					links[c].addEventListener("click", (e) => {
						goto(e.target.href);
						e.preventDefault();
					});
				}
			}}
		/>

		{#if $showSource}
			<aside>
				{#if newSite}
					<header>
						<div class="grow">
							<label for="newDomain">Domain</label>
							<input bind:value={addr} placeholder="example" id="newDomain"/>
						</div>
						<div>
							<label for="network">Network</label>
							<select id="network">
								{#each network.supportedNetworks as network}
									<option>{network.code}</option>
								{/each}
							</select>
						</div>
					</header>
				{/if}

				<div class="editor">
					<CodeMirror basic={true} bind:value lang={html()} />
				</div>

				{#if addr !== null}
					<footer class="container">
						<button aria-busy={saving} disabled={saving} on:click={isWebsiteAtDomain ? updateSite : createSite}>{isWebsiteAtDomain ? "Save": "Create" }</button>
					</footer>
				{/if}
			</aside>
		{/if}
	</main>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		height: 100vh;
		overflow: none;
		gap: 0px;
	}

	main {
		flex-grow: 1;
		flex-shrink: 1;
		min-height: 0;
		overflow: none;
		display: flex;
		flex-direction: row;
	}

	.editor {
		cursor: text;
		flex-grow: 1;
		overflow: auto;
		background-color: #f1f3f4;
		border-radius: 4.75px;
		margin-bottom: var(--spacing);
	}

	iframe {
		flex-grow: 1;
		border-width: 0px;
	}

	aside {
		width: 30%;
		min-width: 400px;
		overflow: auto;
		border-left: 1px solid lightgray;
		font-size: medium;
		padding: 1em;
		display: flex;
		flex-direction: column;
	}

	#newDomain {
		padding: 1em;
		font-size: medium;
	}

	footer {
		/* padding: 40px; */
		/* max-width: 300px; */
	}

	.grow {
		flex-grow: 1;
	}

	aside > header {
		display: flex;
		gap: 5px;
		width: 100%;
	}
</style>