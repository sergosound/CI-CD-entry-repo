import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from '@pages/Home';
import About from '@pages/About';


function Counter() {
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

export default function App() {
  return (
    <BrowserRouter>
      <nav style={{ display: 'flex', gap: 12, padding: 12 }}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<><Home /><Counter /></>} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
