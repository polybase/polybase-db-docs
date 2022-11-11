---
slug: /read
sidebar_position: 4
description: There are two ways to retrieve data in Polybase. You can either fetch data once using .get(), or subscribe for changes using .onSnapshot().
---

# Read Data

There are two ways to retrieve data in Polybase. 

1. Fetch data once with `.get()`
2. Listen for real time updates with `.onSnapshot()`

You can view our example app [Polybase Social](https://social.testnet.polybase.xyz) to see it working in action.


## Get a single record

You can read data once, by calling `.record(id: string).get()` on a collection.

```ts
const db = new Polybase({ defaultNamespace: "your-namespace" })
const collectionReference = db.collection("cities")
const { data, block } = await collectionReference.record("id").get()
```


## Listen for updates on a record

The `.onSnapshot()` handler is called on every update for the record after the write is confirmed.

```ts
const db = new Polybase({ defaultNamespace: "your-namespace" })
const collectionReference = db.collection("cities").record("id")
.onSnapshot((newDoc) => {
  // Handle the change
}, (err) => { 
  // Optional error handler
})
```

## List records in a collection

```ts
const db = new Polybase({ defaultNamespace: "your-namespace" })
const collectionReference = db.collection("cities")
const records = await collectionReference.get()
```

## Filter records

To use the `where()` filter, you must have a corresponding index specified on the collection.

```ts
const db = new Polybase({ defaultNamespace: "your-namespace" })
const collectionReference = db.collection("cities")
const records = await collectionReference.where("country", "==", "UK").get()
```


## Listen for updates on a collection

```ts
const db = new Polybase({ defaultNamespace: "your-namespace" })
const collectionReference = db.collection("cities")
.onSnapshot((newDoc) => {
  // Handle the change
}, (err) => { 
  // Optional error handler
})
```

You can also watch for changes on a filtered query.

```ts
const db = new Polybase({ defaultNamespace: "your-namespace" })
const collectionReference = db.collection("cities")
.where("country", "==", "UK")
.onSnapshot((newDoc) => {
  // Handle the change
}, (err) => { 
  // Optional error handler
})
```