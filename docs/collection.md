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
`, 'your-namespace') // your-namespace is optional if you have defined a default namespace
```

## Define a Collection

Collections are defined using the Spacetime Schema Language (SSL), they allow you define the rules and indexes for your collection. The following is a valid collection definition.

```graphql
collection colname {
  id: string!;
  name: string;
  age: number;

  @index(name);
}
```

The above would allow you to insert a document with a `name` property of type `string`. For example:

```json
{
  "name": "London",
}
```


### Fields

You can specify the fields that are allowed in your collection. These should be at the top most part of your contract.

```graphql
collection colname {
  id: string!;
  age: number;
}
```

:::info
Additional types such as arrays, maps and dates will be added soon.
:::

#### Required Fields

Required fields are specified by appending an exclamation mark (`!`) after the field type, such as `number!`. If a field is not marked as required, then it is optional.


### Validation

Validation rules can be applied to a field by using the `@` annotation.

```graphql
collection colname {
  # These rules would only apply when calling collection(col).doc(id).set()
  id: string!;
  name: string @regex(/^Cool.*/);
  age: number @min(18) @max(100);
  pk: string @creator;
}
```

The following annotations are available:

#### String

 * `@regex(str)` - a regex that must match the string
 * `@min(num)` - minimum length of the string
 * `@max(num)` - maximum length of the string


#### Number

 * `@min(num)` - minimum number
 * `@max(num)` - minimum number


#### Permissions

 * `@creator` - automatically set to public key of the creator when record is created, cannot be edited thereafter
 * `@readonly` - value cannot be changed using .set()


:::info
Additional annotations will be added soon.
:::


### Functions

If you need more flexibility to enforce custom rules you can define functions:


```graphql
collection account {
  # These @ rules only apply when calling .set()
  name: string @regex(/^Cool.*/)
  age: number @min(10)
  balance: number @readonly @min(0)
  publicKey: string @creator

  # Fn ignores all above rules, so anything needed must be reimplemented
  function transfer (a: record, b: record, amount: number) {
    # $auth is in global scope of fn
    # error() is in global scope of fn
    if (a.publicKey == $auth.publicKey) throw error('invalid user')

    # can edit both records
    a.balance -= amount
    b.balance += amount

    # min has to be reimplemented/declared b/c field @ rules do not apply
    # inside fns
    if (a.balance < 0) throw error('insufficient balance')
  }
}
```

You can call your custom functions using:

```ts
const db = new Spacetime({ defaultNamespace: "your-namespace" })
const col = db.collection("account")
await col.call('transfer', [c.doc('id1'), c.doc('id2') 10], pk)
```

:::danger
Functions override any field level `@` validation annotations. You must re-apply any checks you wish to enforce in the function.
:::


### Indexes

Indexes are a list of fields in addition to the document's `id` field that should be indexed. You need to ensure that all fields that are included in a `where` or `sort` clause are included in the indexes.

```ts
const db = new Spacetime({ defaultNamespace: "your-namespace" })
const collectionReference = db.collection("cities")
const docs = await collectionReference.where("name", "==", "abc").get()
```

You would need the following schema:

```graphql
collection cities {
  name: string!;

  @index(name);
}
```

If you want to order your results, you also need to include that in the index:

```ts
const db = new Spacetime({ defaultNamespace: "your-namespace" })
const collectionReference = db.collection("cities")
const docs = await collectionReference
  .where("name", "==", "abc")
  .sort('population', 'desc')
  .get()
```

You would need the following schema:


```graphql
collection cities {
  name: string!;
  population: number;

  @index(name, [population, desc]);
}
```


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

