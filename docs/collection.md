---
slug: /collections
sidebar_position: 2
description: You must create a collection before adding data to Polybase. Collections (aka database tables) define the fields and rules for a collection of records.
---

# Collections

You must create a collection before adding data to Polybase.

Collections (aka database tables) define the fields and rules for a collection of records. All records created by a collection are guaranteed to follow the rules of that collection. This is in contrast to other smart collection languages, where only a single record can be associated with a collection.

Each Polybase record within a collection has its own unique identifier `id`.

You can view our example app [Polybase Social](https://social.testnet.polybase.xyz) to see it working in action.

## Create a Collection

You can create a collection using the client library.

```ts
const createResponse = await db.applySchema(`
  collection CollectionName {
    id: string;
    country?: string;
    publicKey?: string;

    @index(country);

    constructor (id: string, country: string) {
      this.id = id;
      this.country = country;

      // Assign the public key of the user making the request to this record
      this.publicKey = ctx.publicKey;
    }
  }
`, 'your-namespace') // your-namespace is optional if you have defined a default namespace
```

:::caution
`id` field is mandatory on all collections, and you must assign an `id` using `this.id = ...` within the `constructor` function.
:::

## Define a Collection

Collections are defined using Polylang (the language for Polybase), that is very similar to Javascript/Typescript. Collections allow you define the rules and indexes for your collection records. The following is a valid collection definition.

```graphql
collection CollectionName {
  id: string;
  name?: string;

  constructor (id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  @index(name);
}
```

The above would allow you to insert a document with a `name` property of type `string`.


### Fields

You can specify the fields that are allowed in your collection. These should be at the top most part of your collection. A collection should always have an `id` field.

```graphql
collection CollectionName {
  id: string;
  age: number;
  
  ...
}
```

:::info
Additional types such as arrays, maps and dates will be added soon.
:::

#### Optional Fields

All fields are required by default, if you want to make a field optional simply append `?` after the field name and before the `:`. For example:

```graphql
collection CollectionName {
  id: string;
  required: number;
  optional?: number;

  ...
}
```

### Functions

Field values can only be modified using functions.


```graphql
collection Account {
  id: string;
  name: string;
  balance: number;
  publicKey: string;
  
  constructor (name: string) {
    this.id = ctx.publicKey;
    this.name = name;
    this.publicKey = ctx.publicKey;
    this.balance = 0;
  }

  # Fn ignores all above rules, so anything needed must be reimplemented
  transfer (b: record, amount: number) {
    # ctx is in global scope of fn
    # error() is in global scope of fn
    if (this.publicKey == ctx.publicKey) {
       throw error('invalid user');
    }

    # can edit both records
    this.balance -= amount
    b.balance += amount

    # min has to be reimplemented/declared b/c field @ rules do not apply
    # inside fns
    if (a.balance < 0) {
      throw error('insufficient balance');
    }
  }
}
```

You can call your custom functions using `.call(functionName, args)`:

```ts
const db = new Polybase({ defaultNamespace: "your-namespace" })
const col = db.collection("account")
await col.doc('id1').call('transfer', [c.doc('id2') 10])
```


### Indexes

Indexes are a list of fields in addition to the document's `id` field that should be indexed. You need to ensure that all fields that are included in a `where` or `sort` clause are included in the indexes.

```ts
const db = new Polybase({ defaultNamespace: "your-namespace" })
const collectionReference = db.collection("cities")
const docs = await collectionReference.where("name", "==", "abc").get()
```

You would need the following schema:

```graphql
collection cities {
  name: string;

  @index(name);

  ...
}
```

If you want to order your results, you also need to include that in the index:

```ts
const db = new Polybase({ defaultNamespace: "your-namespace" })
const collectionReference = db.collection("cities")
const docs = await collectionReference
  .where("name", "==", "abc")
  .sort('population', 'desc')
  .get()
```

You would need the following schema:


```graphql
collection cities {
  name: string;
  population: number;

  @index(name, [population, desc]);
}
```


## Reference a collection

To reference a collection, you can call `.collection("collection-name")` on your Polybase instance. The returned collection instance relates to a specific collection of data and allows you [`.write()`](/write) and [`.read()`](/read) data from Polybase.


#### Relative Path (with default namespace)

The following would return a collection with path: `your-namespace/cities`:

```ts
const db = new Polybase({ defaultNamespace: "your-namespace" })
const collection = db.collection('cities')
```

#### Relative Path (without default namespace)

The following would return a collection with path: `your-namespace/cities`:

```ts
const db = new Polybase()
const collection = db.collection('your-namespace/cities')
```

#### Absolute Path

To override the default namespace, you can use an absolute path by specifying a `/` at the start of the path. 

The following would return a collection with path: `alt-namespace/cities`:

```ts
const db = new Polybase({ defaultNamespace: "your-namespace" })
const collection = db.collection('/alt-namespace/cities')
```

