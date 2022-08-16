---
slug: /collections
sidebar_position: 5
---

# Collections

Collections are the main construct in Spacetime for storing and retrieving data. They are equivalent to a database table.

## Creating a collection

You can create a collection in our [explorer](https://explorer.testnet.spacetime.is) or using the client library.

```ts
Spacetime.createCollection('org/places', {
  schema: {
    properties: {
      name: {
        type: "string"
      },
      country: {
        type: "string"
      }
    }
  },

  // Creates an index for title, and combined index for 
  indexes: [{
    fields: [{ field: "name" }]
  }],
})
```

## Collection Definition

Collections are defined using JSON, they allow you define the rules and indexes for your collection. The following is a valid collection definition.

```json
{
  "v": "0",
  "schema": {
    "type": "object",
    "properties": {
      "id": {
        "type": "string"
      },
      "name": {
        "type": "string"
      }
    },
  },
  "indexes": [{
    "fields": [{ "field": "name" }]
  }],
}
```

> **Note**
> All schemas are required to define `id` property of type `string`.


The above would allow you to insert a record with an `id` and `name` property of type `string`. For example:

```json
{
  "id": "london",
  "name": "London",
}
```


### Schema

The schema is defined using the `schema` property of your collection definition. It defines the structure of data that can be stored in the collection, as well as the rules for reading and writing to it. The schema definition may look familiar, that's because it uses [JSON Schema](https://json-schema.org/) syntax.


### Indexes

Indexes are a list of fields in addition to the records `id` field that should be indexed. You need to ensure that all fields that are included in a `where` or `sort` clause are included in the indexes.

For example, if you 

```typescript
const colRef = db.collection("org/places")
const docs = await colRef.where("field", "==", "abc").get()
```

You would need the following schema.

## Collection Definition Schema

The *Collection Definition* (as described above) also has a schema that describes the properties that can be added to a collection's definition.

As new features are added to Spacetime, the collection definition schema will be updated to allow additional properties. 

You can view the current collection definition schema at:

https://testnet.spacetime.is/v0/data/$collections/$collections