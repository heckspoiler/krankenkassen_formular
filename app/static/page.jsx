export default function DataFetching({ dataset }) {
  if (!dataset || dataset.length === 0) return <h1>No data</h1>;
  return (
    <div>
      <h1>Here's your data</h1>
      <ul>
        {dataset.map((data, index) => (
          <li key={index}>{data.versicherer}</li>
        ))}
      </ul>
    </div>
  );
}
