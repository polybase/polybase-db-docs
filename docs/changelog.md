---
slug: /changelog
sidebar_position: 6
description: All notable changes to this project will be documented in this file. Polybase adheres to Semantic Versioning.
---

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

During our beta rollout, minor updates in the semantic versioning represent breaking changes.


## [Unreleased]

 - Update to namespace assignment and 
 - Improved `id` system
 - Allow maps/objects to be passed into collection functions 
 - Integration with libp2p
 - Ethereum bridge


## [0.3.7] - 2022-11-14

### Added
 
 - Added symmetric encryption helpers to `@polybase/util`:
   - `symmetricGenerateKey()`
   - `symmetricDecryptFromHex()`
   - `symmetricEncrypt()`
   - `symmetricDecrypt()`
   - `symmetricImportKey()`

### Changed

 - Normalized asymmetric encryption helpers in `@polybase/util`:
   - `encryptToHex()` -> `asymmetricEncryptToHex()`
   - `decryptFromHex()` -> `asymmetricDecryptFromHex()`

### Deprecated

 - Deprecated from `@polybase/util`:
  - `encrypt()`
  - `decrypt()`


## [0.3.6] - 2022-11-11

### Deprecated

 - `collection.doc()` has been deprecated in favour of `collection.record()` on the `Collection` class
 - `Doc` class has been deprecated in favour of `CollectionRecord` class
 - The following URL endpoints have been deprecated from our hosted service:
   - `POST /v0/collections/{collectionId}/documents` replaced by `POST /v0/collections/{collectionId}/records` 
   - `GET /v0/collections/{collectionId}/documents` replaced by `GET /v0/collections/{collectionId}/records`
   - `GET /v0/collections/{collectionId}/documents/{recId}` replaced by `GET /v0/collections/{collectionId}/records/{recId}`
   - `POST /v0/collections/{collectionId}/documents/{recId}/call/{function}` replaced by `POST /v0/collections/{collectionId}/records/{recId}/call/{function}`

### Changed
  - Nomenclature for a record/document within a collection has been changed from document -> record
  - Error `reason` codes returned from the server have been updated to the follows:
    - `record/not-found`
    - `index/missing-index`
    - `index/unique-constraint-violation`
    - `constructor/no-id-assigned`
    - `function/invalidated-id`
    - `function/not-found`
    - `function/invalid-args`
    - `function/invalid-call`
    - `collection/id-exists`
    - `collection/invalid-id`
    - `collection/invalid-schema`

### Added
 - Tests for each of the user error codes



## [0.3.3] - 2022-11-04

### Removed

 - `pk` (publicKey) is no longer accepted as the final parameter of .call(functionName, args, ~~pk~~)` and .create(args, ~~pk~~)

### Changed

 - Signer function has new type specification: `type Signer = (data: string, req: Request) => Promise<SignerResponse|null>`
   - Additional parameter `req: Request` is passed as the second parameter
   - If provided, `signer()` is called for every request
   - You can return null on `Signer` function if you do not want to provide a signature for a given request
 - Dependencies updates


## [0.3.2] - 2022-11-04

### Fixed

 - `.applySchema()` now upsert the provided code. If the collection does not exist, it is created, otherwise it is updated.

## [0.3.1] - 2022-11-01

### Added

 - `.create()` can be called on a collection to create a new record - e.g. `db.collection('HelloWorld').create(["id1"])`
 - Changelog added to documentation


### Removed

 - `doc.set()` - replaced by creating specific collection functions that can be called using `doc.call("fn", args)`
 - `doc.delete()` - replaced by `selfdestruct()`, which should be called within a smart collection function
 - Field directives (e.g. `@max()`, `@min()`, etc) have been removed


### Deprecated

 - The following URL endpoints have been deprecated from our hosted service:
   - `GET /v0/collections/{collectionId}/records` replaced by `GET /v0/collections/{collectionId}`
   - `GET /v0/collections/{collectionId}/records/{recId}` replaced by `GET /v0/collections/{collectionId}/{recId}`



## [0.1.0] - 2022-09-01

The initial release of Polybase.



