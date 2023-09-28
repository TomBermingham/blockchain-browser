<script>
	import { showSource } from "$lib/source.js";
	import MetaMaskOnboarding from "@metamask/onboarding";
	import { browser } from "$app/environment";
	import { afterNavigate, onNavigate, goto } from "$app/navigation";

	export const ssr = true;
	export const prerender = true;
	export let addr;

	let onboarding;
	if(browser) onboarding = new MetaMaskOnboarding();
	let accounts;

	let metamaskButton;

	let metamaskButtonText = "Install";
	let connectMetamask;

	const loadMetamask = () => {
		if (!MetaMaskOnboarding.isMetaMaskInstalled()) {
			metamaskButtonText = "Install";
			connectMetamask = () => {
				metamaskButtonText = "Onboarding";
				onboardButton.disabled = true;
				onboarding.startOnboarding();
			};
		} else if (accounts && accounts.length > 0) {
			metamaskButtonText = "Connected";
			metamaskButton.disabled = true;
			onboarding.stopOnboarding();
		} else {
			metamaskButtonText = "Connect";
			connectMetamask = async () => {
				accounts = await window.ethereum.request({
					method: "eth_requestAccounts",
				});
				loadMetamask();
			};
		}
	};

	if(browser) loadMetamask();

	if (browser && MetaMaskOnboarding.isMetaMaskInstalled()) {
		window.ethereum.on("accountsChanged", (newAccounts) => {
			accounts = newAccounts;
			loadMetamask();
		});
	}
</script>

<header id="nav-bar">
	<button hidden onclick="history.back()">&#x2190;</button>
	<button hidden onclick="history.forward()">&#x2192;</button>
	<button id="home-button" on:click={() => goto('./')}
		>&#x1F3E0;</button
	>
	<form id="navigate" on:submit|preventDefault={(event) => goto('./?address=' + event.target[0].value)}>
		<input
			autocomplete="on"
			autocorrect="off"
			autocapitalize="none"
			type="text"
			id="url"
			onclick="this.setSelectionRange(0, this.value.length)"
			value={addr}
		/>
	</form>
	<button
		id="show-code"
		on:click={() => {
			showSource.set(!$showSource);
		}}
	>
		<svg
			height="20"
			viewBox="0 0 1792 1792"
			width="20"
			xmlns="http://www.w3.org/2000/svg"
			><path
				d="M553 1399l-50 50q-10 10-23 10t-23-10l-466-466q-10-10-10-23t10-23l466-466q10-10 23-10t23 10l50 50q10 10 10 23t-10 23l-393 393 393 393q10 10 10 23t-10 23zm591-1067l-373 1291q-4 13-15.5 19.5t-23.5 2.5l-62-17q-13-4-19.5-15.5t-2.5-24.5l373-1291q4-13 15.5-19.5t23.5-2.5l62 17q13 4 19.5 15.5t2.5 24.5zm657 651l-466 466q-10 10-23 10t-23-10l-50-50q-10-10-10-23t10-23l393-393-393-393q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l466 466q10 10 10 23t-10 23z"
			/></svg
		>
	</button>
	<button
		id="connect-metamask"
		on:click={connectMetamask}
		bind:this={metamaskButton}
	>
		<svg
			fill="none"
			height="20"
			viewBox="0 0 35 33"
			width="22"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width=".25"
			>
				<path
					d="m32.9582 1-13.1341 9.7183 2.4424-5.72731z"
					fill="#e17726"
					stroke="#e17726"
				/>
				<g fill="#e27625" stroke="#e27625">
					<path d="m2.66296 1 13.01714 9.809-2.3254-5.81802z" />
					<path
						d="m28.2295 23.5335-3.4947 5.3386 7.4829 2.0603 2.1436-7.2823z"
					/>
					<path
						d="m1.27281 23.6501 2.13055 7.2823 7.46994-2.0603-3.48166-5.3386z"
					/>
					<path
						d="m10.4706 14.5149-2.0786 3.1358 7.405.3369-.2469-7.969z"
					/>
					<path
						d="m25.1505 14.5149-5.1575-4.58704-.1688 8.05974 7.4049-.3369z"
					/>
					<path d="m10.8733 28.8721 4.4819-2.1639-3.8583-3.0062z" />
					<path d="m20.2659 26.7082 4.4689 2.1639-.6105-5.1701z" />
				</g>
				<path
					d="m24.7348 28.8721-4.469-2.1639.3638 2.9025-.039 1.231z"
					fill="#d5bfb2"
					stroke="#d5bfb2"
				/>
				<path
					d="m10.8732 28.8721 4.1572 1.9696-.026-1.231.3508-2.9025z"
					fill="#d5bfb2"
					stroke="#d5bfb2"
				/>
				<path
					d="m15.1084 21.7842-3.7155-1.0884 2.6243-1.2051z"
					fill="#233447"
					stroke="#233447"
				/>
				<path
					d="m20.5126 21.7842 1.0913-2.2935 2.6372 1.2051z"
					fill="#233447"
					stroke="#233447"
				/>
				<path
					d="m10.8733 28.8721.6495-5.3386-4.13117.1167z"
					fill="#cc6228"
					stroke="#cc6228"
				/>
				<path
					d="m24.0982 23.5335.6366 5.3386 3.4946-5.2219z"
					fill="#cc6228"
					stroke="#cc6228"
				/>
				<path
					d="m27.2291 17.6507-7.405.3369.6885 3.7966 1.0913-2.2935 2.6372 1.2051z"
					fill="#cc6228"
					stroke="#cc6228"
				/>
				<path
					d="m11.3929 20.6958 2.6242-1.2051 1.0913 2.2935.6885-3.7966-7.40495-.3369z"
					fill="#cc6228"
					stroke="#cc6228"
				/>
				<path
					d="m8.392 17.6507 3.1049 6.0513-.1039-3.0062z"
					fill="#e27525"
					stroke="#e27525"
				/>
				<path
					d="m24.2412 20.6958-.1169 3.0062 3.1049-6.0513z"
					fill="#e27525"
					stroke="#e27525"
				/>
				<path
					d="m15.797 17.9876-.6886 3.7967.8704 4.4833.1949-5.9087z"
					fill="#e27525"
					stroke="#e27525"
				/>
				<path
					d="m19.8242 17.9876-.3638 2.3584.1819 5.9216.8704-4.4833z"
					fill="#e27525"
					stroke="#e27525"
				/>
				<path
					d="m20.5127 21.7842-.8704 4.4834.6236.4406 3.8584-3.0062.1169-3.0062z"
					fill="#f5841f"
					stroke="#f5841f"
				/>
				<path
					d="m11.3929 20.6958.104 3.0062 3.8583 3.0062.6236-.4406-.8704-4.4834z"
					fill="#f5841f"
					stroke="#f5841f"
				/>
				<path
					d="m20.5906 30.8417.039-1.231-.3378-.2851h-4.9626l-.3248.2851.026 1.231-4.1572-1.9696 1.4551 1.1921 2.9489 2.0344h5.0536l2.962-2.0344 1.442-1.1921z"
					fill="#c0ac9d"
					stroke="#c0ac9d"
				/>
				<path
					d="m20.2659 26.7082-.6236-.4406h-3.6635l-.6236.4406-.3508 2.9025.3248-.2851h4.9626l.3378.2851z"
					fill="#161616"
					stroke="#161616"
				/>
				<path
					d="m33.5168 11.3532 1.1043-5.36447-1.6629-4.98873-12.6923 9.3944 4.8846 4.1205 6.8983 2.0085 1.52-1.7752-.6626-.4795 1.0523-.9588-.8054-.622 1.0523-.8034z"
					fill="#763e1a"
					stroke="#763e1a"
				/>
				<path
					d="m1 5.98873 1.11724 5.36447-.71451.5313 1.06527.8034-.80545.622 1.05228.9588-.66255.4795 1.51997 1.7752 6.89835-2.0085 4.8846-4.1205-12.69233-9.3944z"
					fill="#763e1a"
					stroke="#763e1a"
				/>
				<path
					d="m32.0489 16.5234-6.8983-2.0085 2.0786 3.1358-3.1049 6.0513 4.1052-.0519h6.1318z"
					fill="#f5841f"
					stroke="#f5841f"
				/>
				<path
					d="m10.4705 14.5149-6.89828 2.0085-2.29944 7.1267h6.11883l4.10519.0519-3.10487-6.0513z"
					fill="#f5841f"
					stroke="#f5841f"
				/>
				<path
					d="m19.8241 17.9876.4417-7.5932 2.0007-5.4034h-8.9119l2.0006 5.4034.4417 7.5932.1689 2.3842.013 5.8958h3.6635l.013-5.8958z"
					fill="#f5841f"
					stroke="#f5841f"
				/>
			</g>
		</svg>
		{metamaskButtonText}
	</button>
</header>

<style>
	header {
		top: 0;
		width: 100%;
		height: 36px;
		border-bottom: 1px solid lightgray;
		font-size: 20px;
		display: flex;
		padding: 3px;
		flex-shrink: 0;
		gap: 3px;
		-webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
		-moz-box-sizing: border-box; /* Firefox, other Gecko */
		box-sizing: border-box;
	}
	header > button {
		font-size: 18px;
		vertical-align: middle;
		padding: 0px 4px 0px 4px;
		border-width: 0px;
		background-color: white;
		border-radius: 10px;
	}

	header > button:hover {
		background-color: #f1f3f4;
		cursor: pointer;
	}

	header > form {
		display: flex;
		height: 100%;
		flex-grow: 1;
		align-items: center;
	}

	header > form > input {
		width: 100%;
		font-size: 16px;
		border-radius: 10px;
		border-width: 0px;
		background-color: #f1f3f4;
		color: #202124;
		padding: 0px 10px 0px 10px;
		margin: 0px;
	}

	header > form > input:focus {
		background-color: white;
	}

	#nav-bar > #connect-metamask,
	#nav-bar > #show-code {
		font-size: medium;
		display: flex;
		align-items: center;
		gap: 8px;
		padding-left: 4px;
		padding-right: 4px;
	}

	/* #connect-metamask {
		margin-right: 10px;
	} */

	#nav-bar > #home-button {
		font-size: 20px;
		padding-left: 4px;
		padding-right: 4px;
	}

	header > * {
		width: min-content;
		height: 100%;
		color: black;
	}
	header > form > * {
		width: min-content;
		height: min-content;
	}
</style>
