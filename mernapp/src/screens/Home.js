import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";

export default function Home() {

  const [foodCat,setFoodCat] = useState([]);
  const [foodItem,setFoodItem] = useState([]);
  const [search, setSearch] = useState('');

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData",{
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      }
    });
    response = await response.json();
    setFoodItem(response[0]);
    setFoodCat(response[1]);
  }

  useEffect(() => {
    loadData()
  })

  return (
    <div>
      <Navbar />
      <div
        id="carouselExampleCaptions"
        className="carousel slide"
        data-bs-ride="carousel"
        style={{ objectFit: "contain !important" }}
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div
          className="carousel-inner"
          style={{ objectFit: "contain !important" }}
        >
          <div className="carousel-item active" id="carousel">
            <img
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.eD7MpRmuCp5oKFlcdoKmuwHaE8%26pid%3DApi&f=1&ipt=e3bcb6709b5725f1dd49017a0c6757ad734d2d97ef11bd18d3b0c6193455c143&ipo=images"
              className="d-block w-100"
              alt="..."
            />
            <div className="carousel-caption">
              <div className="d-flex justify-content-center">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => {setSearch(e.target.value.toString())}}
                />
                <button
                  className="btn btn-outline-success text-white bg-success"
                  type="submit"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
          <div className="carousel-item" id="carousel">
            <img
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.fVteXNVbJejGLybVXCmQBwHaE8%26pid%3DApi&f=1&ipt=724ff97502e10de88d49ac1ed07a2c52311fbf370d8411678fe2fa8089a3b8d3&ipo=images"
              className="d-block w-100"
              alt="..."
            />
            <div className="carousel-caption d-none d-md-block">
              <form className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button
                  className="btn btn-outline-success text-white bg-success"
                  type="submit"
                >
                  Search
                </button>
              </form>
            </div>
          </div>
          <div className="carousel-item" id="carousel">
            <img
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.W9RFknwcGfgpMFJFhQurjgHaEK%26pid%3DApi&f=1&ipt=30724ecc3dc61008f8bf8b932246f614d3450595466caefeb2a9cbf92ea50fb5&ipo=images"
              className="d-block w-100"
              alt="..."
            />
            <div className="carousel-caption d-none d-md-block">
              <form className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button
                  className="btn btn-outline-success text-white bg-success"
                  type="submit"
                >
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className="container">
        {
          foodCat.length >0
           ? foodCat.map((data) => {
            return (
              <div className="row mb-3">
                <div key={data.id} className="fs-3 m-3">{data.CategoryName}</div>
                <hr />
                {foodItem.length>0 ? foodItem.filter((item) => 
                  (item.CategoryName === data.CategoryName && item.name.toLowerCase().includes(search.toLowerCase()))).map(filterItems => {
                    return(
                      <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
                        <Card
                          foodItem = {filterItems}
                          foodOptions = {filterItems.options[0]}
                        ></Card>
                      </div>
                    )
                  }
                ): <div>No Such Element</div>}
              </div>
            )
          })
          :""
        }
      </div>
      <Footer />
    </div>
  );
}
