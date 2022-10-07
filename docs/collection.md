---
slug: /collections
sidebar_position: 2
---

# Collections

Collections allow you to store and retrieve data in Spacetime. They are conceptually similar to a database table.

You can view our example app [Spacetime Social](https://social.testnet.spacetime.xyz) to see it working in action.

## Create a Collection

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

## Define a Collection

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

The schema is defined using the `schema` property of your collection definition. It defines the structure of data that can be stored in the collection, as well as the rules for reading and writing to it.


### Indexes

Indexes are a list of fields in addition to the document's `id` field that should be indexed. You need to ensure that all fields that are included in a `where` or `sort` clause are included in the indexes.


```ts
const collectionReference = db.collection("your-namespace/cities")
const docs = await collectionReference.where("field", "==", "abc").get()
```

You would need the following schema.



## Get a collection

To reference a collection, you can call `.collection("collection-name")` on your Spacetime instance. The returned collection instance relates to a specific collection of data and allows you [`.write()`](/write) and [`.read()`](/read) data from Spacetime.


#### Relative Path (with default namespace)

The following would return a collection with path: `your-namespace/cities`:

```ts
const db = new Spacetime({ defaultNamespace: "your-namespace" })
const collection = db.collection('cities')
```

#### Relative Path (without default namespace)

The following would return a collection with path: `your-namespace/cities`:

```ts
const db = new Spacetime()
const collection = db.collection('your-namespace/cities')
```

#### Absolute Path

To override the default namespace, you can use an absolute path by specifying a `/` at the start of the path. 

The following would return a collection with path: `alt-namespace/cities`:

```ts
const db = new Spacetime({ defaultNamespace: "your-namespace" })
const collection = db.collection('/alt-namespace/cities')
```

