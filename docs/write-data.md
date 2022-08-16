---
slug: /write
sidebar_position: 2
---

# Write data

You can perform a set by calling `.set(data)` on a collection:

```ts
const colRef = db.collection("org/places")
const doc = await colRef.set({
  id: "london",
  name: "London",
  country: "UK",
})
```

Or `.set(data)` on a specific document:

```ts
const colRef = db.collection("org/places")
const doc = await colRef.doc("london").set({
  name: "London",
  country: "UK",
})
```

> **Note**
> `$` is not allowed at the start of field names, as this is reserved for internal use.


## Encrypt data

As all data is public and accessible, it's important to ensure private information is encrypted.