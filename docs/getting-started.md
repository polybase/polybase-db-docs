---
slug: /
sidebar_position: 1
---

# Getting started

In 5 minutes we will import a javascript/typescript SDK and create a table.

## Installing the Spacetime library

```javascript
npm install @spacetimehq/spacetime
```
```javascript
yarn add @spacetimehq/spacetime
```

## Create a collection

A collection is like a table.

```javascript
import Spacetime from '@spacetime/spacetime'

Spacetime.createCollection('books')
```

## Add data to a collection

```javascript
Spacetime.collection('books').append({ title: 'Sapiens', author: 'Yuval Noah Harari'})
```