---
slug: /
sidebar_position: 1
---

# Getting started

Spacetime is a decentralized database that lets developers build decentralized apps with trustless automation at 1000x lower cost than on-chain storage.

You can view the [demo app for Spacetime](https://social.testnet.spacetime.xyz) to see it working in action.

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
const db = new Spacetime()
```

## Create a collection

You can create a collection using the library.

:::info
Creating a collection via the [Spacetime Explorer](https://explorer.testnet.spacetime.xyz) is coming soon.
:::

```ts
const metadata: CollectionMeta = {
    id: 'my-org/cities',
    schema: {
        type: 'object',
        properties: {
            name: {
                type: 'string'
            },
            country: {
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
db.collection('my-org/cities').doc('new-york').set({ 
  name: 'New York',
  country: 'USA'
})
```

:::note
Now go view the collection in the [Explorer](https://explorer.testnet.spacetime.xyz).
:::

## Read a document

```ts
const data = await db.collection('my-org/cities').doc('new-york').get()
```

## Next steps

* Read the [Spacetime whitepaper](https://bit.ly/spctmwp)
* [Write data](/write)
* [Read data](/read)
* [Understand collections](/read)
* [Known issues](/known-issues)