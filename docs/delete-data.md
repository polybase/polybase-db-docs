---
slug: /delete
sidebar_position: 5
description: To delete data on Polybase, you must implement a function on your collection that calls `selfdestruct()`. By convention, this should be a function called `del()`.
---

# Delete Data

To delete data on Polybase, you must implement a function on your collection that calls `selfdestruct()`. By convention, this should be a function called `del()`.

The following provides an example of a delete function that only allows the owner of the record to delete it.

```graphql
collection Place {
  country: string;
  owner: id;

  constructor (id: string) {
    this.id = id;
    this.owner = this.ctx.publicKey;
  }

  del () {
    if (owner != ctx.auth) {
      throw error();
    }
    selfdestruct();
  }
}
```