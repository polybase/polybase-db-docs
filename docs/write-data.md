---
slug: /write
sidebar_position: 3
---

# Write Data

You must [define a contract](/contracts) before writing data to Polybase.


## Creating a record

You can create a new record for a contract by calling `.create(args)` on your contract. This will call the `constructor` function of your contract, and if the assigned `this.id` has not already been used, then a new record will be created.

```ts
const db = new Polybase({ defaultNamespace: "your-namespace" })
const contractReference = db.contract("City")
const docData = await contractReference.create(["new-york", "New York"])
```

The data returned would look like this:

```json
{
  "block": { "hash": "...", ... },
  "data": {
    "id": "new-york",
    "name": "New York",
  }
}
```


And your contract might look like:

```graphql
contract City {
  id: string;
  name: string;

  constructor (id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}
```

:::caution
`$` is not allowed at the start of field names, as this is reserved for internal use.
:::

You can view our example app [Polybase Social](https://social.testnet.polybase.xyz) to see it working in action.


## Updating a record




## Permissions

You can control who is allowed to make changes to a document by providing a publicKey when calling `.set(data, publicKey)`. Once a publicKey is set on a doc, changes to the doc must be accompanied by a signature created using that publicKey. You can provide a `.signer(data)` function to the Polybase client library that will be used to create the signature.

:::info
More granular permissions will be released soon.
:::



### Using wallet through an extension

Using the signing process provided by a user's browser extension (every write must be signed individually).

```ts
import { Polybase } from '@polybase/client/web'
import * as eth from '@polybase/eth'

// Init
const db = new Polybase({ defaultNamespace: "your-namespace" })

// Set data with publicKey
await db.contract("user-info").doc("user-1").set({
  name: "Awesome User",
  secretInfo: encryptedValue
}, publicKey)

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

If you want to manage the wallet/privateKey yourself, you must ensure you store the private key safely.


```ts
import Wallet from 'ethereumjs-wallet'
import { Polybase } from '@polybase/client/web'
import { ethPersonalSign } from '@polybase/eth'

// First time the user signs up to your dapp
const wallet = Wallet.generate()
const publicKey = wallet.getPublicKey()

const db = new Polybase({ defaultNamespace: "your-namespace" })

// Add data with publicKey that will own the doc
db.contract('your-namespace/cities').doc('london').set({
  name: 'London',
  country: 'UK',
}, publicKey)

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

await db.contract("user-info").doc("user-1").set({
  name: "Awesome User",
  secretInfo: encryptedValue
})

// Later...

// Get the data from Polybase as normal
const userData = await db.contract("user-info").doc("user-1").get()

// Get the encrypted value
const encryptedValue = userData.data.secretInfo

 // A permission dialog will be presented to the user every time this method 
 // is called
const decryptedValue = await eth.decrypt(account, encryptedValue)
```


### Creating your own wallet

You can create your own app-owned wallet (public/private key) allowing you to encrypt/decrypt values without having to ask the user for explicit permission each time. The private key should still be encrypted using a users existing wallet or a password, but rather than encrypting a specific value, you encrypt the private key. 

That means you only need to ask the user a single time for permission to decrypt their private key, and then use that private key to decrypt all other received values. It is then your responsibility to ensure that the encrypted private key is kept safe.

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

await db.contract("user-info").doc("user-1").set({
  name: "Awesome User",
  secretInfo: encryptedValueAsHexStr
})

// Later...

// Get the data from Polybase as normal
const userData = await db.contract("user-info").doc("user-1").get()

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