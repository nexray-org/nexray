import useBasis from '../../../../../';

// Integration options:
// 1: use like a _hook_ in the Server component
// 2: wrap the default export and generateStaticParams

async function getData() {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos');
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

async function HomeServerSibling() {
  console.log("This is another async server component")
  const data = await getData();
  return (
    <main>
      <h2>This is another component in the nested route</h2>
      <h3>It also fetched data from jsonplaceholder.com</h3>
    </main>
  )
}

function SyncFunctionWithAnyProps(props: Record<string | number | symbol, any>) {
  return <span>Pass through props component with: <code>{JSON.stringify(props, null, 2)}</code></span>
}
SyncFunctionWithAnyProps.nexrayName = "Passthrough Component"
SyncFunctionWithAnyProps.displayName = "Passthrough Component"

export default useBasis(async function Home() {
  console.log("This is a server component")
  const data = await getData();
  const homeServerSibling = await HomeServerSibling();
  return (
    <main>
      <h2>This is a nested route</h2>
      <h3>Here's some fetched data from jsonplaceholder.com:</h3>
      <code>
        {JSON.stringify(data, null, 2).slice(0, 240)}...
      </code>
      {homeServerSibling}
      <span>Span component with {"Multiple"}&nbsp;{"Text"}&nbsp;{"Children"} and a {"\n"} new line</span>
      <SyncFunctionWithAnyProps 
        number={1} 
        string={"Hello"} 
        function={(a: string) => console.log(a)}
        array={[
          1, 
          "Hello", 
          (a: string) => console.log(a), 
          {}, 
          []
        ]}
        object={{ 
          number: 1, 
          string: "hello", 
          function: (a: string) => console.log(a),
          object: {},
          array: []
        }}
      >
        <span>Span component with {"Multiple"}&nbsp;{"Text"}&nbsp;{"Children"} and a {"\n"} new line</span>
      </SyncFunctionWithAnyProps>
    </main>
  )
});
