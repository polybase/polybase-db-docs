---
slug: /write
sidebar_position: 2
---

# Write data

You can perform a set by calling `.set(data)` on a specific document.

```ts
const collectionReference = db.collection('test-cities')
const doc = await collectionReference.doc("london").set({
  name: "London",
  url: "https://en.wikipedia.org/wiki/London",
})
```

:::caution
`$` is not allowed at the start of field names, as this is reserved for internal use.
:::

## Encrypt data

All data on Spacetime is publicly accessible (like a blockchain). Therefore it is important to ensure private information is encrypted. You can encrypt data however you like, including using a user wallet's public key.