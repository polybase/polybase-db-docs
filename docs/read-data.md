---
slug: /read
sidebar_position: 3
---

# Read data

There are two ways to receive data in Spacetime. 

1. You can fetch data once using `.get(id: string)` and `.list()`
2. You can listen for real time updates `.onSnapshot()`


## Get a document

You can read data once, by calling the `get(id: string)` method on a collection.

```typescript
const colRef = db.collection("org/places")
const doc = await colRef.get("id")

const id = doc.id
const data = doc.data
```


## Listen for updates on a document

```typescript
const colRef = db.collection("org/places")

```


## List documents

```typescript
const colRef = db.collection("org/places")
const docs = await colRef.list({
  where: {}
})
```

