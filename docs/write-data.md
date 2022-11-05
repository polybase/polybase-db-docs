---
slug: /write
sidebar_position: 3
description: Write data to your Polybase database collection using either .create() or .call(). You must collection before writing data to Polybase.
---

# Write Data

You must [define a collection](/collections) before writing data to Polybase.


## Creating a record

You can create a new record for a collection by calling `.create(args)` on your collection. This will call the `constructor` function of your collection, and create a new record (as long as the `id` of the record does not already exist).

```ts
const db = new Polybase({ defaultNamespace: "your-namespace" })
const collectionReference = db.collection("City")

// .create(args) args array is defined by the constructor fn
const docData = await collectionReference.create(["new-york", "New York"])
```

The data returned would be:

```json
{
  "block": { "hash": "...", ... },
  "data": {
    "id": "new-york",
    "name": "New York",
  }
}
```


And your collection schema might look like:

```graphql
collection City {
  id: string;
  name: string;

  constructor (id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}
```

You can view our example app [Polybase Social](https://social.testnet.polybase.xyz) to see it working in action.


## Updating a record

You can update collection data using the collection methods defined in the collection.


```ts
const db = new Polybase({ defaultNamespace: "your-namespace" })
const collectionReference = db.collection("City")

// .create(functionName, args) args array is defined by the updateName fn in collection schema
const docData = await collectionReference.doc('new-york').call("updateName", ["New York"])
```

Would require the following collection schema:

```graphql
collection City {
  id: string;
  name: string;

  constructor (id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  updateName(name: string) {
    this.name = name;
  }
}
```


## Permissions

You can control who is allowed to make changes to a document by using the `ctx.publicKey` which is set to the publicKey of the user that signed the request.

A common use case is to store the `ctx.publicKey` of the user who created the collection, and then use this to determine if the change is valid.

For example:


```typescript
collection CollectionName () {
  id: string;
  name: string;
  publicKey: string;

  constructor (id: string, name: string) {
    this.id = id;
    this.name = name;
    this.publicKey = ctx.publicKey;
  }

  setName (name: string) {
    if (this.publicKey != ctx.publicKey) {
      throw error('invalid public key');
    }
    this.name = name;
  }
}
```


### Signing Requests

To sign requests from the client, you must define a signer function that will be called for every request.

```typescript
// Add signer fn
db.signer(async (data: string, req: Request) => {
   // A permission dialog will be presented to the user
  const accounts = await eth.requestAccounts()

  // If there is more than one account, you may wish to ask the user which 
  // account they would like to use
  const account = accounts[0]

  const sig = await eth.sign(data, account)

  return {  h: 'eth-personal-sign', sig }
})
```

 If you want to skip signing for specific requests you can return `null` to skip the signing process.


### Using wallet through an extension

You can use the signing process provided by a user's browser extension (e.g. Metamask). Using this approach, every write must be individually approved by the user (i.e. a dialog will appear for them to approve), which may not be an optimal user experience.

```ts
import { Polybase } from '@polybase/client/web'
import * as eth from '@polybase/eth'

// Init
const db = new Polybase({ defaultNamespace: "your-namespace" })

// Set data with publicKey
await db.collection("user-info").doc("user-1").call("collectionFn", ["Awesome User", encryptedValue], publicKey)

// Add signer fn
db.signer(async (data: string) => {
   // A permission dialog will be presented to the user
  const accounts = await eth.requestAccounts()

  // If there is more than one account, you may wish to ask the user which 
  // account they would like to use
  const account = accounts[0]

  const sig = await eth.sign(data, account)

  return {  h: 'eth-personal-sign', sig }
})
```


### Creating your own wallet

To improve the user experience, you can create your own app-owned wallet (public/private key pair), allowing you to sign requests without asking the user every time. The wallet/privateKey can then be encrypted using the browser extension, and stored locally or any other storage system.

That means you only need to ask the user a single time for permission to decrypt the private key, and then use that private key to sign every subsequent request.


```ts
import Wallet from 'ethereumjs-wallet'
import { Polybase } from '@polybase/client/web'
import { ethPersonalSign } from '@polybase/eth'

// First time the user signs up to your dapp
const wallet = Wallet.generate()
const publicKey = wallet.getPublicKey()

const db = new Polybase({ defaultNamespace: "your-namespace" })

// Add data with publicKey that will own the doc
db.collection('your-namespace/City').doc('london').call("set", [{
  name: 'London',
  country: 'UK',
}], publicKey)

// Add signer fn
db.signer(async (data: string) => {
  return {  h: 'eth-personal-sign', sig: ethPersonalSign(wallet.privateKey()), data) }
})
```


## Encrypt data

All data on Polybase is publicly accessible (like a blockchain). Therefore it is important to ensure private information is encrypted. You can encrypt data however you like, including using a user wallet's public key.


### Using wallet through an extension

You can send a request to Metamask (or other compatible wallet) to obtain an encryption key which can be used to encrypt values. However, decryption is only possible by sending a secondary request to the wallet (which results in the permission popup) to ask for permission for each value to be decrypted. 

This can result in a poor user experience if there are a number of different values to decrypt, as the user will have to give permission separately for each value.

Here is an example:

```ts
import { Polybase } from '@polybase/client/web'
import * as eth from '@polybase/eth'

// Init
const db = new Polybase({ defaultNamespace: "your-namespace" })

 // A permission dialog will be presented to the user
const accounts = await eth.requestAccounts()

// If there is more than one account, you may wish to ask the user which 
// account they would like to use
const account = accounts[0]

// A permission dialog will be presented to the user
const encryptedValue = await eth.encrypt(account, "top secret info")

await db.collection("user-info").doc("user-1").set({
  name: "Awesome User",
  secretInfo: encryptedValue
})

// Later...

// Get the data from Polybase as normal
const userData = await db.collection("user-info").doc("user-1").get()

// Get the encrypted value
const encryptedValue = userData.data.secretInfo

 // A permission dialog will be presented to the user every time this method 
 // is called
const decryptedValue = await eth.decrypt(account, encryptedValue)
```


### Creating your own wallet

You can create your own app-owned wallet (public/private key) allowing you to encrypt/decrypt values without having to ask the user for explicit permission each time. The private key should be encrypted using a users existing wallet or a password, but rather than encrypting a specific value, you encrypt the new private key. 

That means you only need to ask the user a single time for permission to decrypt the private key, and then use that private key to decrypt all other values. It is then your responsibility to ensure that the encrypted private key is kept safe, which could be either stored locally in browser storage or in Polybase.

Here is an example:

```ts
import Wallet from 'ethereumjs-wallet'
import { Polybase } from '@polybase/client/web'
import { encryptToHex, decryptFromHex } from '@polybase/util'

// Init
const db = new Polybase({ defaultNamespace: "your-namespace" })

// First time the user signs up to your dapp
const wallet = Wallet.generate()
const publicKey = wallet.getPublicKey()

// Encrypt (e.g. using approach above) and save the private key somewhere safe 
const privateKey = wallet.getPrivateKey()

// Encrypted value will be returned as a hex string 0x...
const encryptedValueAsHexStr = encryptToHex(publicKey, "top secret info")

await db.collection("user-info").doc("user-1").call("set", [{
  name: "Awesome User",
  secretInfo: encryptedValueAsHexStr
}])

// Later...

// Get the data from Polybase as normal
const userData = await db.collection("user-info").doc("user-1").get()

// Get the encrypted value
const encryptedValue = userData.data.secretInfo

// Original value returned
const decryptedValue = decrypt(privateKey, decryptFromHex(encryptedValue))
```

There are a number of different places to store the encrypted private key that lead to different trade offs. You must find a tradeoff that is acceptable for your specific application.

#### Store locally

You could store the encrypted private key locally on the browser device (e.g. in local storage). The tradeoff is that the private key could easily become lost if the user resets their browser (which would make all data unavailable and there would be no recovery method), and it would be difficult for users to work across devices. 


#### Store on Polybase

You could store the encrypted private key on Polybase, this allow the encrypted private key to obtained by the user and then decrypted on any device.