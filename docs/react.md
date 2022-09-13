---
slug: /react
sidebar_position: 5
---

# React

React hooks for Spacetime.


## Install Spacetime

```bash
npm install @spacetimexyz/react
```
```bash
yarn add @spacetimexyz/react
```


## Add Spacetime Provider

```tsx
import * as React from 'react'
import { SpacetimeProvider } from '@spacetimexyz/react'
import { Spacetime } from '@spacetimexyz/client'

const spacetime = new Spacetime()

export const App = () => {
  return (
    <SpacetimeProvider spacetime={spacetime}>
      {/* ... your app routes */}
    </SpacetimeProvider>
  )
}
```

## Read a document (with updates)

```tsx
import * as React from 'react'
import { useSpacetime, useDocument } from '@spacetimexyz/react'

export const Component = () => {
  const spacetime = useSpacetime()
  const { data, error, loading } = useDocument<OptionalCustomType>(spacetime.collection('users').doc('id'))

  return data.data.name
}
```


## Read a collection (with updates)

```tsx
import * as React from 'react'
import { useSpacetime, useCollection } from '@spacetimexyz/react'

export const Component = () => {
  const spacetime = useSpacetime()
  const { data, error, loading } = useCollection<OptionalCustomType>(spacetime.collection('users'))

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