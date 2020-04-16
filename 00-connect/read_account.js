const DOT_DECIMAL_PLACES = 1000000000000;

const{ ApiPromise, WsProvider } = require('@polkadot/api');

// We must wrap everything up in an async block
(async () => {

    // Connect to a node (this is a public one)
    const provider = new WsProvider('ws://127.0.0.1:9944/')
    const api = await ApiPromise.create({ provider })

    const ADDR = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';

    const balance = await api.query.balances.freeBalance(ADDR);

    console.log(`${ADDR} has ${balance / DOT_DECIMAL_PLACES} DEV `);

    process.exit()
})()
