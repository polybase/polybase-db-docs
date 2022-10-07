---
slug: /read
sidebar_position: 4
---

# Read Data

There are two ways to retrieve data in Spacetime. 

1. Fetch data once with `.get()`
2. Listen for real time updates with `.onSnapshot()`

You can view our example app [Spacetime Social](https://social.testnet.spacetime.xyz) to see it working in action.


## Get a single document

You can read data once, by calling `.doc(id: string).get()` on a collection.

```ts
const db = new Spacetime({ defaultNamespace: "your-namespace" })
const collectionReference = db.collection('cities')
const { data, block } = await collectionReference.doc("id").get()
```


## Listen for updates on a document

The `.onSnapshot()` handler is called on every update for the doc after the write is confirmed.

```ts
const db = new Spacetime({ defaultNamespace: "your-namespace" })
const collectionReference = db.collection('cities').doc("id")
.onSnapshot((newDoc) => {
  // Handle the change
}, (err) => { 
  // Optional error handler
})
```

## List documents in a collection

```ts
const db = new Spacetime({ defaultNamespace: "your-namespace" })
const collectionReference = db.collection('cities')
const docs = await collectionReference.get()
```

## Filter documents

To use the `where()` filter, you must have a corresponding index specified on the collection.

```ts
const db = new Spacetime({ defaultNamespace: "your-namespace" })
const collectionReference = db.collection('cities')
const docs = await collectionReference.where("country", "==", "UK").get()
```


## Listen for updates on a collection

```ts
const db = new Spacetime({ defaultNamespace: "your-namespace" })
const collectionReference = db.collection('cities')
.onSnapshot((newDoc) => {
  // Handle the change
}, (err) => { 
  // Optional error handler
})
```

You can also watch for changes on a filtered query.

```ts
const db = new Spacetime({ defaultNamespace: "your-namespace" })
const collectionReference = db.collection('cities')
.where("country", "==", "UK")
.onSnapshot((newDoc) => {
  // Handle the change
}, (err) => { 
  // Optional error handler
})
```