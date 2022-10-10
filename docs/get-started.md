---
slug: /
sidebar_position: 1
---

# Get Started

## Why Spacetime?

Spacetime is the database for all of humanity’s data. Fast, decentralized and designed from the ground up to scale beyond 1M transactions per second. 

Spacetime is better than using a centralized database like Firebase 🔥 or Postgres 🐘 because you can encrypt data using wallets 💳 for "user owned data" and verifiably query Spacetime from smart contracts 📜 (coming soon).

Spacetime is better than storing data on-chain ⛓ because it's 1000 to a million times cheaper than on-chain storage. For example, storing 1MB on Ethereum costs around $64,000 💸. 


Blockchains are not built for scalable structured data storage so we built Spacetime to combine the best attributes of web2 databases and blockchains 🤗.

## Install Spacetime

```bash
npm install @spacetimexyz/client
```
```bash
yarn add @spacetimexyz/client
```


## Initialize the library

```ts
import { Spacetime } from '@spacetimexyz/client'

const db = new Spacetime({
  defaultNamespace: "your-namespace"
})
```

:::caution
Namespace must be used for collections.
:::

:::info
 If you specify a defaultNamespace, it will be automatically added for you when you [create a collection instance](/collections#get-a-collection).
:::

## Create a collection

You can create a collection using the library:

:::info
Creating a collection via the [Spacetime Explorer](https://explorer.testnet.spacetime.xyz) is coming soon.
:::

```ts
const createResponse = await db.applySchema(`
  collection cities {
    id: string!;
    name: string;
    country: string;

    @index(name);
  }
`, 'your-namespace') // your-namespace is optional if you have defined a default namespace
```

For more details on creating collections, see the [collection](/collections) overview.

## Write data to a collection

```ts
const db = new Spacetime({ defaultNamespace: "your-namespace" })
await db.collection('cities').doc('new-york').set({ 
  name: 'New York',
  country: 'USA'
})
```

:::note
Now go view the collection in the [Explorer](https://explorer.testnet.spacetime.xyz).
:::

## Read a document

```ts
const db = new Spacetime({ defaultNamespace: "your-namespace" })
const data = await db.collection('cities').doc('new-york').get()
```

## Next steps

* Read the [Spacetime Whitepaper](https://bit.ly/spctmwp)
* [Understand Collections](/read)
* [Known Issues](/known-issues)