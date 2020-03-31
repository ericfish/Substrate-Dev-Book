const DOT_DECIMAL_PLACES = 1000000000000;

const{ ApiPromise, WsProvider, Keyring } = require('@polkadot/api');

(async () => {

    // const provider = new WsProvider('wss://kusama-rpc.polkadot.io/')
    const provider = new WsProvider('ws://127.0.0.1:9944/')
    const api = await ApiPromise.create({ provider })

    const startHdr = await api.rpc.chain.getBlockHash(1);

    // 查询最近 100 个块
    // const lastHdr = await api.rpc.chain.getHeader();
    // const startHdr = await api.rpc.chain.getBlockHash(lastHdr.number.unwrap().subn(100));

    // retrieve the range of events
    const events = await api.query.system.events.range([startHdr]);

    events.forEach((event) => {
        console.log(`Event: ${JSON.stringify(event)}`);
    });

    process.exit()
})()
