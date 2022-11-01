---
slug: /changelog
sidebar_position: 6
---

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

During our beta rollout, minor updates in the semantic versioning represent breaking changes.


## [Unreleased]

 - Update to namespace assignment and 
 - Improved `id` system
 - Allow maps/objects to be passed into contract functions 
 - Integration with libp2p
 - Ethereum bridge


## [0.3.0] - 2022-11-01

### Added

 - `.create()` can be called on a contract to create a new record - e.g. `db.contract('HelloWorld').create(["id1"])`
 - Changelog added to documentation


### Removed

 - `doc.set()` - replaced by creating specific contract functions that can be called using `doc.call("fn", args)`
 - `doc.delete()` - replaced by `selfdestruct()`, which should be called within a smart contract function
 - Field directives (e.g. `@max()`, `@min()`, etc) have been removed


### Deprecated

 - `collection Name { ... }` has been renamed to `contract Name { ... }` when [defining a contract](/contracts)
 - The following URL endpoints have been deprecated from our hosted service:
   - `GET /v0/collections/{contractId}/records` replaced by `GET /v0/contracts/{contractId}`
   - `GET /v0/collections/{contractId}/records/{recId}` replaced by `GET /v0/contracts/{contractId}/{recId}`



## [0.1.0] - 2022-09-01

The initial release of Polybase.



