---
slug: /read
sidebar_position: 3
---

# Read data

There are two ways to retrieve data in Spacetime. 

1. Fetch data once with `.get(id: string)` and `.list()`
2. Listen for real time updates with `.onSnapshot()`


## Get a single document

You can read data once, by calling `.doc(id: string).get()` on a collection.

```ts
const collectionReference = db.collection('test-cities')
const doc = await collectionReference.doc("id").get()

const { id, ...data } = doc
```


## Listen for updates on a document

```ts
const collectionReference = db.collection('test-cities').doc("id")
.onChange((newDoc, previousDoc) => {
  // Handle the change
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
.onChange((newDoc, previousDoc) => {
  // Handle the change
})
```

You can also watch for changes on a filtered query.

```ts
const collectionReference = db.collection('test-cities')
.where("country", "==", "uk")
.onChange((newDoc, previousDoc) => {
  // Handle the change
})
```