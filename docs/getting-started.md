---
slug: /
sidebar_position: 1
---

# Getting started

In 5 minutes we will import Spacetime javascript/typescript SDK, write some data and read it back!

## Install Spacetime

```bash
npm install @spacetimexyz/spacetime
```
```bash
yarn add @spacetimexyz/spacetime
```

## Initialize the SDK

```typescript
const db = new Spacetime({
  ...config
})
```

## Create a collection

You can create a collection in our [explorer](https://explorer.testnet.spacetime.is), or using the the following:

```ts
Spacetime.createCollection('org/places', {
  v: "0",
  schema: {
    type: "object",
    properties: {
      id: {
        type: "string"
      },
      name: {
        type: "string"
      },
    }
  },

  // Creates an index for title, and combined index for 
  indexes: ["title", ["author", "title"]],
})
```

For more details on creating collections, see the [collection](/collections) overview.


## Write data to a collection

```typescript
Spacetime.collection("org/places").doc("london").set({ 
  name: 'London',
})

// OR
Spacetime.collection('org/places').set({ 
  id: "new-york",
  name: "New York",
})
```

## Read a record

```typescript
const data = await Spacetime.collection("org/books").doc("bitcoin").get()
```

## Next Step

Learn more about Spacetime:

* [Write data](/write)
* [Read data](/read)
* [Understand collections](/read)

---

[Join our Discord](https://discord.com/invite/DrXkRpCFDX)

[Follow us on Twitter]( https://twitter.com/spacetime_is)