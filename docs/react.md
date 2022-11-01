---
slug: /react
sidebar_position: 5
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
import { Polybase } from '@polybase/client/web'

const polybase = new Polybase()

export const App = () => {
  return (
    <PolybaseProvider polybase={polybase}>
      {/* ... your app routes */}
    </PolybaseProvider>
  )
}
```

## Read a document (with updates)

```tsx
import * as React from 'react'
import { usePolybase, useDocument } from '@polybase/react'

export const Component = () => {
  const polybase = usePolybase()
  const { data, error, loading } = useDocument<OptionalCustomType>(polybase.contract('users').doc('id'))

  return data.data.name
}
```


## List contract records (with updates)

```tsx
import * as React from 'react'
import { usePolybase, useContract } from '@polybase/react'

export const Component = () => {
  const polybase = usePolybase()
  const { data, error, loading } = useContract<OptionalCustomType>(polybase.contract('users'))

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