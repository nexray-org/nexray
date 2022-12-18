import useBasis from '../../../../../';

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

export default async function Home() {
  useBasis()
  console.log("This is a server component")
  const data = await getData();
  return (
    <main>
      <h2>This is a nested route</h2>
      <h3>Here's some fetched data from jsonplaceholder.com:</h3>
      <code>
        {JSON.stringify(data, null, 2)};
      </code>
    </main>
  )
}
