import React from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Country from "./components/country"; 
import CountryDetail from "./components/CountryDetail";
import { Button, Navbar } from "flowbite-react";
function App() {
  return (
    <div>
     {/* <Navbar className="w-[960px] m-auto bg-[#0891b2] p-5 ">
    <a className="text-white" href="/">LOGO</a>
      <Button >Tanlanganlar</Button>
     </Navbar> */}
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Country />} />
            <Route path="/country/:countryName" element={<CountryDetail />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
