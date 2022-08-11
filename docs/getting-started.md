---
slug: /
sidebar_position: 1
---

# Getting started

In 5 minutes we will import Spacetime javascript/typescript SDK, write some data and read it back!

## Install Spacetime

```bash
npm install @spacetimehq/spacetime
```
```bash
yarn add @spacetimehq/spacetime
```

## Initialize the SDK

```typescript
const db = new Spacetime({
  ...config
})
```

## Create a collection

You can create a collection in our [explorer](https://explorer.testnet.spacetime.is), or using the the following:

```typescript
Spacetime.createCollection('org/books', {
  schema: {
    properties: {
      title: {
        type: "string"
      },
      author: {
        type: "string"
      }
    }
  },

  // Creates an index for title, and combined index for 
  indexes: ["title", ["author", "title"]],
})
```

For more details on creating collections, see the [collection](/collections) overview.


## Write data to a collection

```typescript
Spacetime.collection('org/books').set('bitcoin', { 
  title: 'Bitcoin',
  author: 'Satoshi Nakamoto',
})
Spacetime.collection('org/books').set('hitchhiker', { 
  title: 'The Hitchhiker\'s Guide to the Galaxy',
  author: 'Douglas Adams',
})
```

## Read a record

```typescript
const res = await Spacetime.collection('org/books').get('bitcoin')

const id = res.id // bitcoin
const data = res.data // { title: 'Bitcoin', ... }
```

## Next Step

Learn more about Spacetime:

* [Write data](/write)
* [Read data](/read)
* [Understand collections](/read)

---

[Join our Discord](https://discord.com/invite/DrXkRpCFDX)

[Follow us on Twitter]( https://twitter.com/spacetime_is)