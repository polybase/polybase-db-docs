---
slug: /react
sidebar_position: 5
description: React hooks for Polybase to make reading data in React applications simple and easy. You can listen to changes and have your component update on every change.
---

# React

React hooks for Polybase.


## Install Polybase

```bash
npm install @polybase/react
```
```bash
yarn add @polybase/react
```


## Add Polybase Provider

```tsx
import * as React from 'react'
import { PolybaseProvider } from '@polybase/react'
import { Polybase } from '@polybase/client'

const polybase = new Polybase()

export const App = () => {
  return (
    <PolybaseProvider polybase={polybase}>
      {/* ... your app routes */}
    </PolybaseProvider>
  )
}
```

## Read a record (with updates)

```tsx
import * as React from 'react'
import { usePolybase, useDocument } from '@polybase/react'

export const Component = () => {
  const polybase = usePolybase()
  const { data, error, loading } = useDocument<OptionalCustomType>(polybase.collection('users').record('id'))

  return data.data.name
}
```


## List collection records (with updates)

```tsx
import * as React from 'react'
import { usePolybase, useCollection } from '@polybase/react'

export const Component = () => {
  const polybase = usePolybase()
  const { data, error, loading } = useCollection<OptionalCustomType>(polybase.collection('users'))

  const usersEl = map(data, ({ data }) => {
    return (
      <div key={data.id}>
        {data.name}
      </div>
    )
  })

  return usersEl
}
```