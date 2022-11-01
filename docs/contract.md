---
slug: /contracts
sidebar_position: 2
---

# Contracts

You must create a contract before adding data to Polybase. 

Contracts define the rules around a collection of records. All records created by a contract are guaranteed to follow the rules of that contract. This is in contrast to other smart contract languages, where only a single record can be associated with a contract.

Each Polybase record within a contract has its own unique identifier `id`.

You can view our example app [Polybase Social](https://social.testnet.polybase.xyz) to see it working in action.

## Create a Contract

You can create a contract in the [Polybase Explorer](https://explorer.testnet.polybase.xyz) or using the client library.

```ts
const createResponse = await db.applySchema(`
  contract ContractName {
    id: string;
    country?: string;
    publicKey?: string;

    @index(name);

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
`id` field is mandatory on all contracts, and you must assign an `id` using `this.id = ...` within the `constructor` function.
:::

## Define a Contract

Contracts are defined using Polylang (the language for Polybase), it is very similar to Javascript/Typescript. Contracts allow you define the rules and indexes for your contract records. The following is a valid contract definition.

```graphql
contract ContractName {
  id: string;
  name?: string;

  constructor (id: string, name: string) {
    this.id = id;
    this.name = name;
  }

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

You can specify the fields that are allowed in your contract. These should be at the top most part of your contract.

```graphql
contract ContractName {
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
contract ContractName {
  id: string;
  required: number;
  optional?: number;

  ...
}
```

### Functions

Field values can only be modified using functions.


```graphql
contract Account {
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
  function transfer (b: record, amount: number) {
    # $auth is in global scope of fn
    # error() is in global scope of fn
    if (this.publicKey == $auth.publicKey) throw error('invalid user')

    # can edit both records
    this.balance -= amount
    b.balance += amount

    # min has to be reimplemented/declared b/c field @ rules do not apply
    # inside fns
    if (a.balance < 0) throw error('insufficient balance')
  }
}
```

You can call your custom functions using:

```ts
const db = new Polybase({ defaultNamespace: "your-namespace" })
const col = db.contract("account")
await col.doc('id1').call('transfer', [c.doc('id2') 10], pk)
```


### Indexes

Indexes are a list of fields in addition to the document's `id` field that should be indexed. You need to ensure that all fields that are included in a `where` or `sort` clause are included in the indexes.

```ts
const db = new Polybase({ defaultNamespace: "your-namespace" })
const contractReference = db.contract("cities")
const docs = await contractReference.where("name", "==", "abc").get()
```

You would need the following schema:

```graphql
contract cities {
  name: string;

  @index(name);

  ...
}
```

If you want to order your results, you also need to include that in the index:

```ts
const db = new Polybase({ defaultNamespace: "your-namespace" })
const contractReference = db.contract("cities")
const docs = await contractReference
  .where("name", "==", "abc")
  .sort('population', 'desc')
  .get()
```

You would need the following schema:


```graphql
contract cities {
  name: string;
  population: number;

  @index(name, [population, desc]);
}
```


## Get a contract

To reference a contract, you can call `.contract("contract-name")` on your Polybase instance. The returned contract instance relates to a specific contract of data and allows you [`.write()`](/write) and [`.read()`](/read) data from Polybase.


#### Relative Path (with default namespace)

The following would return a contract with path: `your-namespace/cities`:

```ts
const db = new Polybase({ defaultNamespace: "your-namespace" })
const contract = db.contract('cities')
```

#### Relative Path (without default namespace)

The following would return a contract with path: `your-namespace/cities`:

```ts
const db = new Polybase()
const contract = db.contract('your-namespace/cities')
```

#### Absolute Path

To override the default namespace, you can use an absolute path by specifying a `/` at the start of the path. 

The following would return a contract with path: `alt-namespace/cities`:

```ts
const db = new Polybase({ defaultNamespace: "your-namespace" })
const contract = db.contract('/alt-namespace/cities')
```
