---
slug: /
sidebar_position: 1
---

# Get Started

## Why Polybase?

Polybase is the database for all of humanity’s data. Fast, decentralized and designed from the ground up to scale beyond 1M transactions per second. 

Polybase is better than using a centralized database like Firebase 🔥 or Postgres 🐘 because you can encrypt data using wallets 💳 for "user owned data" and verifiably query Polybase from smart contracts 📜 (coming soon).

Polybase is better than storing data on-chain ⛓ because it's 1000 to a million times cheaper than on-chain storage. For example, storing 1MB on Ethereum costs around $64,000 💸. 


Blockchains are not built for scalable structured data storage so we built Polybase to combine the best attributes of web2 databases and blockchains 🤗.

## Install Polybase

```bash
npm install @polybase/client
```
```bash
yarn add @polybase/client
```


## Initialize the library

```ts
import { Polybase } from '@polybase/client'

const db = new Polybase({
  defaultNamespace: "your-namespace"
})
```

:::caution
Namespace must be used for contracts.
:::

:::info
 If you specify a defaultNamespace, it will be automatically added for you when you [create a contract instance](/contracts#get-a-contract).
:::

## Create a contract

You can create a contract using the library. 

A Polybase contract describes the rules for a collection of data, not just a single record (as is the case with other smart contract languages).

:::info
Creating a contract via the [Polybase Explorer](https://explorer.testnet.polybase.xyz) is coming soon.
:::

```ts
const createResponse = await db.applySchema(`
  contract City {
    id: string;
    name: string;
    country?: string;

    @index(name);

    constructor (id: string, name: string) {
      this.id = id;
      this.name = name;
    }

    setCountry (country: string) {
      this.country = country;
    }
  }
`, 'your-namespace') // your-namespace is optional if you have defined a default namespace
```

For more details on creating contracts, see the [contract](/contracts) overview.

## Create a contract record

When you create a new record, the `constructor` fn in your contract is called with the parameters you provide.

```ts
const db = new Polybase({ defaultNamespace: "your-namespace" })
await db.contract('City').create('new-york', 'New York')
```

:::note
Now go view the contract in the [Explorer](https://explorer.testnet.polybase.xyz).
:::

## Update a contract record

You can update records by calling methods defined on your contract.

```ts
const db = new Polybase({ defaultNamespace: "your-namespace" })
await db.contract('City').call('setCountry', ['USA'])
```


## Read a document

```ts
const db = new Polybase({ defaultNamespace: "your-namespace" })
const data = await db.contract('City').doc('new-york').get()
```

## Next steps

* Read the [Polybase Whitepaper](https://polybase.xyz/Polybase_A_Decentralised_Query_Index_and_Storage_Protocol-v2.0.pdf)
* [Understand Contracts](/contracts)
* [Known Issues](/known-issues)