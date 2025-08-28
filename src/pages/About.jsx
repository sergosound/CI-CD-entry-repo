import { useEffect, useState } from 'react';

export default function About() {
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    let isCancelled = false;
    fetch('/api/console')
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const text = await res.text();
        if (!isCancelled) setResult(text);
      })
      .catch((e) => {
        if (!isCancelled) setError(e.message);
      });
    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <div>
      <h2 className="title">About</h2>
      <p>This is a simple example using React Router.</p>
      {error ? <p style={{ color: 'red' }}>{error}</p> : null}
      {result ? <p>{result}</p> : null}
    </div>
  );
}
