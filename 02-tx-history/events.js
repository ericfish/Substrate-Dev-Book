const DOT_DECIMAL_PLACES = 1000000000000;

const{ ApiPromise, WsProvider, Keyring } = require('@polkadot/api');

(async () => {

    // const provider = new WsProvider('wss://kusama-rpc.polkadot.io/')
    const provider = new WsProvider('ws://127.0.0.1:9944/')
    const api = await ApiPromise.create({ provider })

    // Subscribe to the events
    const unsub = await api.query.system.events((event) => {
        console.log(`Event: ${JSON.stringify(event)}`);
    });

    // process.exit()
})()
