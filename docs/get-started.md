---
slug: /
sidebar_position: 1
---

# Get Started

## Why Spacetime?

Spacetime is better than a web2 database like Firebase 🔥 or Postgres 🐘 because you can encrypt data using wallets 💳 for "user owned data" and verifiably query Spacetime from smart contracts 📜 (coming soon).

Spacetime is better than storing data on-chain ⛓ because it's 1000 to a million times cheaper than on-chain storage. For example, storing 1MB on Ethereum costs around $64,000 💸. 


Blockchains are not built for scalable structured data storage so we built Spacetime to combine the best attributes of web2 databases and blockchains 🤗.

## Install Spacetime

**Install browser client:**

```bash
npm install @spacetimexyz/client/web
```
```bash
yarn add @spacetimexyz/client/web
```

**Install node client:**

```bash
npm install @spacetimexyz/client/node
```
```bash
yarn add @spacetimexyz/client/node
```

## Initialize the library

```ts
import { Spacetime } from '@spacetimexyz/client/web'
// import { Spacetime } from '@spacetimexyz/client/node' for nodejs

const db = new Spacetime({
  defaultNamespace: "your-namespace"
})
```

:::note
Namespace must be used for collections. If you specify a defaultNamespace, it will be automatically added for you for all collection calls.
:::

## Create a collection

You can create a collection using the library:

:::info
Creating a collection via the [Spacetime Explorer](https://explorer.testnet.spacetime.xyz) is coming soon.
:::

```ts
const createResponse = await db.applySchema(`
  collection Cities {
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
await db.collection('your-namespace/Cities').doc('new-york').set({ 
  name: 'New York',
  country: 'USA'
})
```

:::note
Now go view the collection in the [Explorer](https://explorer.testnet.spacetime.xyz).
:::

## Read a document

```ts
const data = await db.collection('your-namespace/Cities').doc('new-york').get()
```

## Next steps

* Read the [Spacetime Whitepaper](https://bit.ly/spctmwp)
* [Understand Collections](/read)
* [Known Issues](/known-issues)