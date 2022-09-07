---
slug: /read
sidebar_position: 3
---

# Read data

There are two ways to retrieve data in Spacetime. 

1. Fetch data once with `.get(id: string)` and `.list()`
2. Listen for real time updates with `.onSnapshot()`

You can view our [demo app for Spacetime](https://social.testnet.spacetime.xyz) to see it working in action.


## Get a single document

You can read data once, by calling `.doc(id: string).get()` on a collection.

```ts
const collectionReference = db.collection('test-cities')
const { data, block } = await collectionReference.doc("id").get()
```


## Listen for updates on a document

```ts
const collectionReference = db.collection('test-cities').doc("id")
.onSnapshot((newDoc) => {
  // Handle the change
}, (err) => { 
  // Optional error handler
})
```

## List documents in a collection

```ts
const collectionReference = db.collection('test-cities')
const docs = await collectionReference.get()
```

## Filter documents

To use the `where()` filter, you must have a corresponding index specified on the collection.

```ts
const collectionReference = db.collection('test-cities')
const docs = await collectionReference.where("country", "==", "uk").get()
```


## Listen for updates on a collection

```ts
const collectionReference = db.collection('test-cities')
.onSnapshot((newDoc) => {
  // Handle the change
}, (err) => { 
  // Optional error handler
})
```

You can also watch for changes on a filtered query.

```ts
const collectionReference = db.collection('test-cities')
.where("country", "==", "uk")
.onSnapshot((newDoc) => {
  // Handle the change
}, (err) => { 
  // Optional error handler
})
```