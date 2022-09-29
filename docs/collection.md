---
slug: /collections
sidebar_position: 2
---

# Collections

Collections are the main construct in Spacetime for storing and retrieving data. They are conceptually similar to a database table.

You can view our example app [Spacetime Social](https://social.testnet.spacetime.xyz) to see it working in action.

## Creating a collection

You can create a collection in the [Spacetime Explorer](https://explorer.testnet.spacetime.xyz) or using the client library.

```ts
const createResponse = await db.applySchema(`
  collection Col {
    id: string!;
    country: string;
    $pk: string;

    @index(name);
  }
`)
```

## Collection definition

Collections are defined using the Spacetime Schema Language (SSL), they allow you define the rules and indexes for your collection. The following is a valid collection definition.

```graphql
collection ColName {
  id: string!;
  name: string;

  @index(name);
}
```

The above would allow you to insert a document with a `name` property of type `string`. For example:

```json
{
  "name": "London",
}
```


### Schema

The schema is defined using the `schema` property of your collection definition. It defines the structure of data that can be stored in the collection, as well as the rules for reading and writing to it. The schema definition may look familiar, that's because it uses [JSON Schema](https://json-schema.org/) syntax.


### Indexes

Indexes are a list of fields in addition to the document's `id` field that should be indexed. You need to ensure that all fields that are included in a `where` or `sort` clause are included in the indexes.

For example, if you

```ts
const collectionReference = db.collection("your-namespace/cities")
const docs = await collectionReference.where("field", "==", "abc").get()
```

You would need the following schema.

## Collection definition schema

The *Collection Definition* (as described above) also has a schema that describes the properties that can be added to a collection's definition.

As new features are added to Spacetime, the collection definition schema will be updated to allow additional properties. 

You can view the current collection definition schema at:

https://testnet.spacetime.xyz/v0/collections/$collections/records