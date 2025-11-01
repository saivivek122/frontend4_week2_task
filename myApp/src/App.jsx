import React, { useState } from "react";
import DisplayPinCodeDetails from "./DisplayPinCodeDetails";
import "./App.css";
import { Link, Route, Routes, useLocation, useNavigate } from "react-router-dom";

const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate=useNavigate()
  async function fetchData() {
    if (!inputValue || inputValue.length < 6) {
      alert("PinCode Should be AtLeast Six Digits");
      return;
    }
    setLoading(true);
    try {
      let response = await fetch(
        `https://api.postalpincode.in/pincode/${inputValue}`
      );
      const pinCodeDetails = await response.json();
      setData(pinCodeDetails);
      navigate("/details")
    } catch (e) {
      setLoading(false);
      alert("Something Went Wrong",e)
    } finally {
      setLoading(false);
      // setInputValue("")
    }
  }
  if (loading) {
    return <div className="loader"></div>;
  }
  return (
    <div className="container">
      <Routes>
        <Route path="/details" element={<DisplayPinCodeDetails data={data} pinCode={inputValue} />} />
      </Routes>
      {
        (location.pathname === "/" && (
          <>
            <h1 className="heading">Enter Pincode </h1>
            <input
              className="input-field"
              placeholder="Pincode"
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />

            <button className="button" onClick={fetchData}>
              Lookup
            </button>
          </>
        ))
      }
    </div>
  );
};

export default App;
