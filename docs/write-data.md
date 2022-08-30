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


### Option 1: User's wallet through an extension

You can send a request to Metamask (or other compatible wallet) to obtain an encryption key which can be used to encrypt values. However, decryption is only possible by sending a secondary request to the wallet (which results in the permission popup) to ask for permission for each value to be decrypted. 

This can result in a poor user experience if there are a number of different values to decrypt, as the user will have to give permission separately for each value.

Here is an example:

```ts
import { Spacetime } from '@spacetimexyz/client'
import eth from '@spacetimexyz/eth'

// Init
const db = new Spacetime()

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

// Get the data from Spacetime as normal
const userData = await db.collection("user-info").doc("user-1").get()

// Get the encrypted value
const encryptedValue = userData.data.secretInfo

 // A permission dialog will be presented to the user every time this method 
 // is called
const decryptedValue = await eth.decrypt(account, encryptedValue)
```


### Option 2: Create your own wallet

You can create your own app-owned wallet (public/private key) allowing you to encrypt/decrypt values without having to ask the user for explicit permission each time. The private key should still be encrypted using a users existing wallet or a password, but rather than encrypting a specific value, you encrypt the private key. 

That means you only need to ask the user a single time for permission to decrypt their private key, and then use that private key to decrypt all other received values. It is then your responsibility to ensure that the encrypted private key is kept safe.

Here is an example:

```ts
import Wallet from 'ethereumjs-wallet'
import { Spacetime } from '@spacetimexyz/client'
import { encryptToHex, decryptFromHex } from '@spacetimexyz/util'

// First time the user signs up to your dapp
const wallet = Wallet.generate()
const publicKey = wallet.getPublicKey()

// Encrypt (e.g. using approach above) and save the private key somewhere safe 
const privateKey = wallet.getPrivateKey()

// Encrypted value will be returned as a hex string 0x...
const encryptedValueAsHexStr = encryptToHex(publicKey, "top secret info")

await db.collection("user-info").doc("user-1").set({
  name: "Awesome User",
  secretInfo: encryptedValueAsHexStr
})

// Later...

// Get the data from Spacetime as normal
const userData = await db.collection("user-info").doc("user-1").get()

// Get the encrypted value
const encryptedValue = userData.data.secretInfo

// Original value returned
const decryptedValue = decrypt(privateKey, decryptFromHex(encryptedValue))
```

There are a number of different places to store the encrypted private key that lead to different trade offs. You must find a tradeoff that is acceptable for your specific application.

#### Store locally

You could store the encrypted private key locally on the browser device (e.g. in local storage). The tradeoff is that the private key could easily become lost if the user resets their browser (which would make all data unavailable and there would be no recovery method), and it would be difficult for users to work across devices. 


#### Store on Spacetime

You could store the encrypted private key on Spacetime, this allow the encrypted private key to obtained by the user and then decrypted on any device.