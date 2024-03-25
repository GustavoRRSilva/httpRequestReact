import { useEffect, useState } from "react";
import "./App.css";
import { useFetch } from "./hooks/useFetch";

function App() {
  const [products, setProducts] = useState([]);
  const url = "http://localhost:3000/products";
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const { data: items, httpConfig, loading } = useFetch(url);

  //Enviando dados
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(url);

      const data = await res.json();

      setProducts(data);
    }
    fetchData();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const product = {
      name,
      price,
    };

    /*
    const res = await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    const newProduct = await res.json();
    setProducts([...products, newProduct]);

    
    */
    httpConfig(product, "POST");
    //5 refatorando post
  };
  return (
    <>
      <div className="">
        <h2>Lista de produtos:</h2>
        {loading && <p>Carregando dados...</p>}
        <ul>
          {items &&
            items.map((product) => (
              <li key={product.id}>
                {product.name} - R$:{product.price}
              </li>
            ))}
        </ul>

        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Price:
            <input
              type="number"
              price="price"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          {loading && <input type="submit" value="Aguarde" disabled/>}
          {!loading && <input type="submit" value="Enviar dados" />}
        </form>
      </div>
    </>
  );
}

export default App;
