const { ApiPromise, WsProvider } = require('@polkadot/api');
import {
	isWeb3Injected,
	web3Accounts,
	web3Enable,
	web3FromAddress
} from "@polkadot/extension-dapp";
web3Enable('polkadot-js/apps');

// Samples
class PolkadotWeb3JSSample {
	/***
	 * login
	 * @return accounts [{"address":"5D2JMakX2CgtPPkiqUzdsK3Y41vD6HyNy8ZETUjhjRrZFTfG","meta":{"name":"cc1","source":"polkadot-js"}}]

	 */
	async login() {
		if (!isWeb3Injected) {
			throw new Error("Please install/unlock the MathWallet first");
		}
		// meta.source contains the name of the extension that provides this account
		const allAccounts = await web3Accounts();
		return allAccounts;
	}

	/***
	 * Remark
	 * @param from from
	 * @param content content
	 * @return hash
	 */
	async proof(from, content) {

		//////////////////////////// alexander  ////////////////////////////
		// Initialise the provider to connect to the local node
		// const provider = new WsProvider('ws://localhost:9944');
		const provider = new WsProvider('wss://f0dd77b9-9673-46e2-a95a-7a7a4213c25c.playground.substrate.dev/wss');
		// Create the API and wait until ready
		const api = await ApiPromise.create({ provider });

		// finds an injector for an address
		const injector = await web3FromAddress(from);

		// sets the signer for the address on the @polkadot/api
		api.setSigner(injector.signer);

		// sign and send out transaction - notice here that the address of the account (as retrieved injected)
		// is passed through as the param to the `signAndSend`, the API then calls the extension to present
		// to the user and get it signed. Once completex, the api sends the tx + signature via the normal process
		const h = api.tx.poeModule
			.createClaim(content)
			.signAndSend(from);

		return h;
	}
}

window.PolkadotWeb3JSSample = new PolkadotWeb3JSSample();