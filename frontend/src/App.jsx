import React from "react";
import "./App.css";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div>
      <Header />
      <main className="py-3">
        <Container>
          <h1>Welcome to ProShop!</h1>
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default App;
