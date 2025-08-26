import { useState } from 'react';

export default function App() {
  const [counter, setCounter] = useState(0);

  const adjustCounterValue = (value) => {
    if (value >= 100) return value - 100;
    if (value <= -100) return value + 100;
    return value;
  };

  const update = (delta) => {
    setCounter((prev) => adjustCounterValue(prev + delta));
  };

  return (
    <>
      <h1 className="title">
        Thank you for trying it out. <br /> Your first project is up and running
        now.
      </h1>
      <section className="counter">
        <div className="counter-info">
          <p className="counter-text">Counter is</p>
          <p className="counter-value">{counter}</p>
        </div>
        <div className="counter-interaction">
          <button onClick={() => update(1)} type="button">+1</button>
          <button onClick={() => update(2)} type="button">+2</button>
          <button onClick={() => update(-1)} type="button">-1</button>
          <button onClick={() => update(-2)} type="button">-2</button>
        </div>
      </section>
    </>
  );
}
