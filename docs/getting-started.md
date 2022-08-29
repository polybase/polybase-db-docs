---
slug: /
sidebar_position: 1
---

# Getting started

Spacetime is a decentralized database that lets developers build decentralized apps with trustless automation at 1000x lower cost than on-chain storage.

Spacetime client libraries communicate directly with the peer-to-peer Spacetime indexer network. The indexers store, index and allow you to query your data. You can always view the network status using the [Spacetime Explorer](https://explorer.testnet.spacetime.xyz).

In the next 5 minutes we will import the Spacetime Javascript/Typescript library, write some data to the decentralized database and read it back.

## Install Spacetime

```bash
npm install @spacetimexyz/client
```
```bash
yarn add @spacetimexyz/client
```

## Initialize the library

```ts
const db = new Spacetime({})
```

## Create a collection

You can create a collection in the [Spacetime Explorer](https://explorer.testnet.spacetime.xyz), or using the library.

```ts
const metadata: CollectionMeta = {
    id: 'test/cities',
    schema: {
        type: 'object',
        properties: {
            name: {
                type: 'string'
            },
            url: {
                type: 'string'
            }
        }
    },
    indexes: [{
      fields: [{ field: 'name' }],
    }],
}

const response = await db.createCollection(metadata)
```

:::note
`id`s must be globally unique across all Spacetime collections. We suggest using a namespace (we use `test` here) for your organization.
:::

For more details on creating collections, see the [collection](/collections) overview.


## Write data to a collection

```ts
db.collection('test/cities').set({ 
  id: "new-york",
  name: "New York",
  url: 'https://en.wikipedia.org/wiki/New_York_City'
})

// Or

db.collection("test/cities").doc("london").set({ 
  id: 'london',
  name: 'London',
  url: 'https://en.wikipedia.org/wiki/London'
})
```

## Read a document

```ts
const data = await db.collection('test/cities').doc('london').get()
```

## Next step

Learn more about Spacetime:

* [Write data](/write)
* [Read data](/read)
* [Understand collections](/read)