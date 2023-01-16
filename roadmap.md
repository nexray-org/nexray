# Roadmap

| Feature | Supported | References |
|-|:-:|:-:|
| Allow middleware custom passthrough | ✅ | |
| Group requests by middleware id | 🏗️ | |
| API for Permalinks | 🏗️ | |
| Detect a cached fetch | 🏗️ | |
| Detect a requests that's just a prefetch | 🏗️ | 1[^1], 2[^2] |
| Grab client component trees | 🏗️ | 1[^3] |
| Detect SSG | 🏗️ |  |
| npx start up process | 🏗️ |  |
| MongoDB backend | 🏗️ |  |

[^1]: https://github.com/vercel/next.js/discussions/37736#discussioncomment-3972069.
[^2]: https://github.com/vercel/next.js/discussions/37451#discussioncomment-2883795
[^3]: Proof of concept in `packages/next/src/client-capture/ClientWatcher.tsx` to nest context