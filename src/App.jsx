import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ProductCard from "./components/productCard";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ProductCard
        name="Laptop"
        image="https://picsum.photos/id/1/200/300"
        price="100,000.00"
      />
      <ProductCard
        name="Tab"
        image="https://picsum.photos/id/2/200/300"
        price="80,000.00"
      />
      <ProductCard
        name="Phone"
        image="https://picsum.photos/id/3/200/300"
        price="75,000.00"
      />
    </>
  );
}

export default App;
