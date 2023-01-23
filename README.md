Observability for Next.js 13 Server Components

To get started:

```
npx nexray
```

This command will launch the client & server on your machine.

There's two steps to configure Nexray in your project:

### 1. export middleware

Create a file called `middleware.ts` in the root of your project and add the following line:

```ts
export { middleware } from '@nexray/next';
```

<details>
  <summary>Already have a middleware function?</summary>
  
  ```ts
  import { withMiddleware } from '@nexray/next';

  export function middleware(request, event) {
    // ...your custom logic
    return withMiddleware()(request, event);
  }
  ```

</details>

### 2. Wrap `page.tsx` Files

For all desired routes (`page.tsx` files) in your `app/` directory, wrap the exported function with the Nexray helper as follows:

```tsx
import nexray from '@nexray/next';

export default nexray(async function Home() {
    console.log("This is a server component")
    const data = await getData();
    return (
        <main>
            {/* ... */}
        </main>
    )
})
```