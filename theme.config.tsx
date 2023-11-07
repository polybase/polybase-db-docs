import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'
import Logo from './components/Logo'

const config: DocsThemeConfig = {
  logo: <Logo />,
  primaryHue: 314,
  project: {
    link: 'https://github.com/polybase/polybase-db-docs',
  },
  chat: {
    link: 'https://discord.com/invite/DrXkRpCFDX',
  },
  docsRepositoryBase: 'https://github.com/polybase/polybase-db-docs/tree/main',
  useNextSeoProps() {
    return {
      titleTemplate: '%s – Polybase DB by Polybase Labs'
    }
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="Polybase DB" />
      <meta property="og:description" content="" />
      <meta property="og:image" content="" />
      <meta name="twitter:site" content="@polybase_xyz"></meta>
      <meta property="twitter:image" content="" />
    </>
  ),
  footer: {
    text: 'Polybase DB Docs',
  },
}

export default config
