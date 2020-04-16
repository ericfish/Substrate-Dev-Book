const DOT_DECIMAL_PLACES = 1000000000000;

const{ ApiPromise, WsProvider, Keyring } = require('@polkadot/api');

(async () => {

    // const provider = new WsProvider('wss://kusama-rpc.polkadot.io/')
    const provider = new WsProvider('ws://127.0.0.1:9944/')
    const api = await ApiPromise.create({ provider })

    // const existentialDeposit = await api.consts.balances.existentialDeposit;
    // console.log(existentialDeposit); // output: <BN: 2540be400>

    // Note the .toNumber() here!
    // const existentialDeposit = await api.consts.balances.existentialDeposit.toNumber();
    // console.log(`Existential deposit for chain is ${existentialDeposit / DOT_DECIMAL_PLACES} KSM.`);

    // const foo = await api.consts;
    // const foo = await api.libraryInfo;
    // const foo = await api.genesisHash.toHex();

    // const foo = await api.consts.balances;
    // console.log(foo);

    /*// The actual address that we will use
    const ADDR = 'GAiee5ThLczYLFHhNMHLRp7DXBfo5183jY8QrPtRzcToCmm';
    // Retrieve the last timestamp
    const now = await api.query.timestamp.now();
    // Retrieve the account balance & nonce via the system module
    const { nonce, data: balance } = await api.query.system.account(ADDR);
    console.log(`${now}: balance of ${balance.free} and a nonce of ${nonce}`);*/

    // get address balance and format ouput
    /*const ADDR = 'GAiee5ThLczYLFHhNMHLRp7DXBfo5183jY8QrPtRzcToCmm';
    const [now, { nonce, data: balance }] = await Promise.all([
      api.query.timestamp.now(),
      api.query.system.account(ADDR)
    ]);
    console.log(`${now}: balance of ${balance.free/1000000000000} KSM and a nonce of ${nonce}`);*/

    /*// Retrieve the chain name
    const chain = await api.rpc.system.chain();
    // Retrieve the latest header
    const lastHeader = await api.rpc.chain.getHeader();
    // Subscribe to the new headers
    await api.rpc.chain.subscribeNewHeads((lastHeader) => {
      console.log(`${chain}: last block #${lastHeader.number} has hash ${lastHeader.hash}`);
    });*/

    /*// get 10 new block header and stop
    const chain = await api.rpc.system.chain();
    const lastHeader = await api.rpc.chain.getHeader();
    let count = 0;
    // Subscribe to the new headers
    const unsubHeads = await api.rpc.chain.subscribeNewHeads((lastHeader) => {
      console.log(`${chain}: last block #${lastHeader.number} has hash ${lastHeader.hash}`);
      if (++count === 10) {
        unsubHeads();
      }
    });*/

    /*// const now = await api.query.timestamp.now();
    // Retrieve the current timestamp via subscription
    const unsub = await api.query.timestamp.now((moment) => {
      console.log(`The last block has a timestamp of ${moment}`);
    });*/

    /*// 两个区块间余额差值
    const ADDR = 'GAiee5ThLczYLFHhNMHLRp7DXBfo5183jY8QrPtRzcToCmm';
    // Retrieve the current block header
    const lastHdr = await api.rpc.chain.getHeader();
    // Retrieve the balance at both the current and the parent hashes
    const [{ data: balanceNow }, { data: balancePrev }] = await Promise.all([
      api.query.system.account.at(lastHdr.hash, ADDR),
      api.query.system.account.at(lastHdr.parentHash, ADDR)
    ]);
    // Display the difference
    console.log(`The delta was ${balanceNow.free.sub(balancePrev.free)}`);*/

    /*// Retrieve the current block header - not working
    const lastHdr = await api.rpc.chain.getHeader();
    const startHdr = await api.rpc.chain.getBlockHash(lastHdr.number.unwrap().subn(500));
    // retrieve the range of changes
    const changes = await api.query.system.account.range([startHdr]);
    changes.forEach(([hash, value]) => {
      console.log(hash.toHex(), value.toHuman());
    });*/

    /*// 所有staker & 金额
    // Retrieve the active era
    const activeEra = await api.query.staking.activeEra();
    // retrieve all exposures int the active era
    const exposures = await api.query.staking.erasStakers.entries(activeEra.index);
    exposures.forEach(([key, exposure]) => {
      console.log('key arguments:', key.args.map((k) => k.toHuman()));
      console.log('     exposure:', exposure.toHuman());
    });*/


    /*// retrieve some information on the state entries 状态的其它相关信息
    // const ADDR = 'GAiee5ThLczYLFHhNMHLRp7DXBfo5183jY8QrPtRzcToCmm';
    const ADDR = 'J9nD3s7zssCX7bion1xctAF6xcVexcpy2uwy4jTm9JL8yuK';
    // Retrieve the hash & size of the entry as stored on-chain
    const [entryHash, entrySize] = await Promise.all([
      api.query.system.account.hash(ADDR),
      api.query.system.account.size(ADDR)
    ]);
    // Output the info
    console.log(`The current size is ${entrySize} bytes with a hash of ${entryHash}`);*/


    /*// Extract the info
    const ADDR = 'J9nD3s7zssCX7bion1xctAF6xcVexcpy2uwy4jTm9JL8yuK';
    const { meta, method, section } = api.query.system.account;
    // Display some info on a specific entry
    console.log(`${section}.${method}: ${meta.documentation.join(' ')}`);
    console.log(`query key: ${api.query.system.account.key(ADDR)}`);*/


    /*// 获取交易手续费和weight
    const keyring = new Keyring({ type: 'sr25519' });
    const PHRASE = 'prefer sting heavy sugar radar virus excite material else found aspect one';
    const alice = keyring.addFromUri(PHRASE);
    const BOB = 'GAiee5ThLczYLFHhNMHLRp7DXBfo5183jY8QrPtRzcToCmm';
    const transfer = api.tx.balances.transfer(BOB, 12345);
    // retrieve the payment info
    const { partialFee, weight } = await transfer.paymentInfo(alice);
    console.log(`transaction will have a weight of ${weight}, with ${partialFee.toHuman()} weight fees`);
    // send the tx
    // transfer.signAndSend(alice, ({ events = [], status }) => { ... });*/


    // const foo = await api.query.system.events.transfer;
    // console.log(foo);


    // Subscribe to the events
    const unsub = await api.query.system.events((event) => {
        console.log(`Event: ${JSON.stringify(event.toHuman())}`);
    });


    // process.exit()
})()
