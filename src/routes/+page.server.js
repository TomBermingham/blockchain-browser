export const prerender = false;
export const ssr = true;

import { showSource } from "$lib/source.js";
import { browser } from "$app/environment";
import { network } from "$lib/network.js";

let addr;
let newSite;
let value;

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

<body>
    <main class="container">
        
    </main>
</body>

</html>`;

const loadPage = async (address) => {
    
    console.log("Navigating to:" + address);

    //if address then load page -> return
    //if contains a . lookup site -> return

    //show new site page

    if (address === "") {
        value = samplePage;
        //$showSource = true;
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
            console.timeEnd('time');
        } catch (error) {
            console.log('not found');
            const hex = await network.lookupDomain(address);
            console.log(hex);
            if (hex === "0x0000000000000000000000000000000000000000") {
                value = samplePage;
                //$showSource = true;
                return;
            }
        }
    } else {
        value = await getHTML(address);
    }
    return value;
};


export async function load({ params, url }) {
    console.log(url);
	if (true) {
		const urlParams = url.searchParams;//new URLSearchParams(window.location.search);
		addr = urlParams.get("address");
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
		} else {
            value = ''//await loadPage(addr);
		}
        return { page: value };
	}
}