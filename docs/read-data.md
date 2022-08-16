---
slug: /read
sidebar_position: 3
---

# Read data

There are two ways to receive data in Spacetime. 

1. You can fetch data once using `.get(id: string)` and `.list()`
2. You can listen for real time updates `.onSnapshot()`


## Get a single record

You can read data once, by calling the `.doc(id: string).get()` method on a collection.

```ts
const colRef = db.collection("org/places")
const record = await colRef.doc("id").get()

const { id, ...data } = record
```


## Listen for updates on a document

```ts
const colRef = db.collection("org/places").doc("id").onChange((newRecord, previousRecord) => {
  // Handle the change
})
```

## List documents

```ts
const colRef = db.collection("org/places")
const docs = await colRef.get()
```

## Filter documents

To use the `where()` filter, you must have a corresponding index specified on the collection.

```ts
const colRef = db.collection("org/places")
const docs = await colRef.where("country", "==", "uk").get()
```


## Listen for updates on a list ✅

```ts
const colRef = db.collection("org/places").onChange((newRecord, previousRecord) => {
  // Handle the change
})
```

You can also watch for changes on filtered query:

```ts
const colRef = db.collection("org/places").where("country", "==", "uk")
.onChange((newRecord, previousRecord) => {
  // Handle the change
})
```