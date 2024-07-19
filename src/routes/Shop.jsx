import { useState, useEffect } from "react";
import Product from "../components/Product";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Shop() {
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(30);
  const [hasMore, setHasMore] = useState(true);

  const [category, setCategory] = useState("");
  const [allCategories, setCategories] = useState([]);

  useEffect(() => {
    fetch(`https://dummyjson.com/products${category}?limit=30`)
      .then((res) => res.json())
      .then((data) => setData(data.products))
      .catch((error) => console.error(error));
  }, [category]);

  function fetchData() {
    fetch(`https://dummyjson.com/products${category}?limit=30&skip=${index}`)
      .then((res) => res.json())
      .then((data) => {
        setData((prev) => [...prev, ...data.products]);
        data.products.length > 0 ? setHasMore(true) : setHasMore(false);
      })
      .catch((error) => console.error(error));
    setIndex((prevIndex) => prevIndex + 30);
  }

  function fetchCategories() {
    fetch("https://dummyjson.com/products/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }

  function handleChange(event) {
    if (event.target.value == "") {
      setCategory("");
    } else {
      setCategory(`/category/${event.target.value}`);
      setData([]);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <div className="page-header">
        <h1>Explore our Stuff</h1>
      </div>
      <form>
        <label className="accent-text" htmlFor="category">
          Choose Category
        </label>
        <select name="category" id="category" onChange={handleChange}>
          <option value="">All Products</option>
          {allCategories.map((category) => (
            <option value={category.slug} key={category.slug}>
              {category.name}
            </option>
          ))}
        </select>
      </form>

      <InfiniteScroll
        dataLength={data.length}
        next={fetchData}
        hasMore={hasMore}
        loader={<h4 className="accent-text">Loading...</h4>}
      >
        <div className="grid">
          {data &&
            data.map((product) => {
              return (
                <Product
                  key={product.id}
                  id={product.id}
                  image={product.images[0]}
                  title={product.title}
                  description={product.description}
                  price={product.price}
                />
              );
            })}
        </div>
      </InfiniteScroll>
    </>
  );
}
