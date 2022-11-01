---
slug: /read
sidebar_position: 4
---

# Read Data

There are two ways to retrieve data in Polybase. 

1. Fetch data once with `.get()`
2. Listen for real time updates with `.onSnapshot()`

You can view our example app [Polybase Social](https://social.testnet.polybase.xyz) to see it working in action.


## Get a single document

You can read data once, by calling `.doc(id: string).get()` on a contract.

```ts
const db = new Polybase({ defaultNamespace: "your-namespace" })
const contractReference = db.contract("cities")
const { data, block } = await contractReference.doc("id").get()
```


## Listen for updates on a document

The `.onSnapshot()` handler is called on every update for the doc after the write is confirmed.

```ts
const db = new Polybase({ defaultNamespace: "your-namespace" })
const contractReference = db.contract("cities").doc("id")
.onSnapshot((newDoc) => {
  // Handle the change
}, (err) => { 
  // Optional error handler
})
```

## List documents in a contract

```ts
const db = new Polybase({ defaultNamespace: "your-namespace" })
const contractReference = db.contract("cities")
const docs = await contractReference.get()
```

## Filter documents

To use the `where()` filter, you must have a corresponding index specified on the contract.

```ts
const db = new Polybase({ defaultNamespace: "your-namespace" })
const contractReference = db.contract("cities")
const docs = await contractReference.where("country", "==", "UK").get()
```


## Listen for updates on a contract

```ts
const db = new Polybase({ defaultNamespace: "your-namespace" })
const contractReference = db.contract("cities")
.onSnapshot((newDoc) => {
  // Handle the change
}, (err) => { 
  // Optional error handler
})
```

You can also watch for changes on a filtered query.

```ts
const db = new Polybase({ defaultNamespace: "your-namespace" })
const contractReference = db.contract("cities")
.where("country", "==", "UK")
.onSnapshot((newDoc) => {
  // Handle the change
}, (err) => { 
  // Optional error handler
})
```