import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
// import {ReactDOM} from "react-dom"; in React 17
import "./index.css";

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

function Header() {
  const style = {
    // color: "red",
    // fontSize: "42px",
    // textTransform: "uppercase",
  };
  return (
    <header className="header">
      <h1 style={style}>The Pizza Lab </h1>
      <p
        style={{
          direction: "rtl",
          fontSize: "15px",
          marginTop: "5px",
        }}
      >
        by: Harsha Vardhan Bashavathini
      </p>
    </header>
  );
}

// An array of JSX will rendered seperately by React
// don't send each value to Pizza, just send the object
// semantically Pizza should manage it's object
// use React.Fragment, again for semantic programming
// Fragments -> group items without leaving a trace in DOM Tree
// <p> and <ul> here are un-related
function Menu() {
  const pizzas = pizzaData;
  const numPizzas = pizzas.length;

  return (
    <main className="menu">
      <h2>Our Menu</h2>

      {/* forEach loop will not generate JSX Array */}
      {/* we cannot use if-else in these expressions*/}

      {numPizzas > 0 ? (
        <React.Fragment>
          <p>
            Authentic Italian cuisine. 6 creative dishes to choose from. All
            from our stone oven, all organic, all delicious.
          </p>
          <ul className="pizzas">
            {pizzas.map((pizza) => (
              <Pizza key={pizza.name} pizzaObj={pizza} />
            ))}
          </ul>
        </React.Fragment>
      ) : (
        <p>We're still working on our Menu card. Please come later !! 😭😭</p>
      )}

      {/* <Pizza
        name="Pizza Spinaci"
        ingredients="Tomato, mozarella, spinach and ricotta cheese"
        photoName="pizzas/spinaci.jpg"
        price={Number(10)}
      />

      <Pizza
        name="Pizza Funghi"
        ingredients="Tomato, mushrooms"
        photoName="pizzas/funghi.jpg"
        price={12}
      /> */}
    </main>
  );
}

// conditional rendering of complete component's content
// using li and ul => SEMANTIC PRGRAMMING
// De-structuring props
// conditional in classes
function Pizza({ pizzaObj }) {
  // Component Names start with Capital letter
  // Must return JSX
  // Through objects we usually get data in Strings !!!

  return (
    <li className={`pizza ${pizzaObj.soldOut && "sold-out"}`}>
      <img src={pizzaObj.photoName} alt={pizzaObj.name} />
      <div>
        <h3>{pizzaObj.name}</h3>
        <p>{pizzaObj.ingredients}</p>
        <span>{pizzaObj.soldOut ? "SOLD OUT" : pizzaObj.price}</span>
      </div>
    </li>
  );
}

function Footer() {
  //   if (hour >= openHour && hour <= closeHour) alert("We're currently open");
  //   else alert("Sorry, We're currently closed");

  // use short-circuting, to return intended HTML
  // React.createElement("footer", null, "We're currently open !!");

  const [currentTime, setCurrentTime] = useState(new Date());

  const hour = currentTime.getHours();
  const openHour = 12;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;

  useEffect(() => {
    setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
  }, []);

  return (
    <footer className="footer">
      {/* React will NOT RENDER boolean values */}

      {isOpen ? (
        <Order currentTime={currentTime} closeHour={closeHour} />
      ) : (
        <div className="order">
          <p>
            We're happy to welcome you between {openHour}:00 and {closeHour}:00
          </p>
        </div>
      )}
    </footer>
  );
}

function Order(props) {
  // Set the target time to 22:00
  const targetTime = new Date();
  targetTime.setHours(props.closeHour, 0, 0, 0);

  // Calculate the difference in milliseconds
  const differenceMs = targetTime - props.currentTime;

  // Calculate the difference in hours and minutes
  const differenceHours = Math.floor(differenceMs / (1000 * 60 * 60));
  const differenceMinutes = Math.floor((differenceMs / (1000 * 60)) % 60);
  const differenceSeconds = Math.floor((differenceMs / 1000) % 60);

  return (
    <div className="order">
      <p style={{ color: "red" }}>
        {`Closing In: ${differenceHours} hours ${differenceMinutes} minutes ${differenceSeconds} seconds`}
      </p>
      <p>
        We're open until {props.closeHour}:00. Come Visit Us 🍽️ or Order Online
        🛵
      </p>
      <button className="btn">Order</button>
    </div>
  );
}

// From React v18
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Before React v18 (check dependencies array for React version)
// ReactDOM.render(<App />, document.getElementById("root"));
