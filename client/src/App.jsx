import React from "react";
import {
  Navbar,
  Loader,
  Footer,
  Transactions,
  Welcome,
  Services,
} from "./Components/index";

const App = () => {
  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <Navbar />
        <Welcome />
      </div>
      <Services />
      <Transactions />
      <Footer />
    </div>
  );
};

export default App;
