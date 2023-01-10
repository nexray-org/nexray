import React from 'react';
import WrapperBase from './base';

const code = `import nexray from '@nexray/next';

export default nexray(async function Home() {
    console.log("This is a server component")
    const data = await getData();
    return (
        <main>
            {/* ... */}
        </main>
    )
})
`;

export default function WrapPages() {
    return (
        <WrapperBase language='tsx' name='app/route/page.tsx'>
            {code}
        </WrapperBase>
    );
}
