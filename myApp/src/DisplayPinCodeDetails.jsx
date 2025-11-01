import React, { Children, useState } from "react";
import "./App.css"
const DisplayPinCodeDetails = ({data,pinCode}) => {
  const [inputValue,setInputValue]=useState("")
  const [filteredData,setFilteredData]=useState(data[0].PostOffice)
  // console.log(data)
  function handleFilter(value){
    setInputValue(value);
    if(!value){
      setFilteredData(data[0].PostOffice)
      return;
    }
    let result=data[0].PostOffice.filter((item)=>{
       return item.Name.toLowerCase().includes(value.toLowerCase())
    });
    setFilteredData(result)
  
    
  }

  return (
    <div>
      <div className="top-container">
      <p><b>PinCode</b> :{pinCode}</p>
      <p><b>Message</b>: {data[0].Message}</p>
      </div>
      <div className="search-container">
        <input placeholder="Filter" className="filter-input-field" onChange={(e)=>handleFilter(e.target.value)} 
        
        />
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
</svg>
      </div>
      <div className="post-container">
        {filteredData && filteredData.length > 0 ? (
          filteredData.map((details, index) => (
            <div key={index} className="post-details-container">
              <p>Name: {details.Name}</p>
              <p>Branch Type: {details.BranchType}</p>
              <p>Delivery Status: {details.DeliveryStatus}</p>
              <p>District: {details.District}</p>
              <p>Division: {details.Division}</p>
            </div>
          ))
        ) : (
          <p>Couldn’t find the postal data you’re looking for…</p>
        )}
      </div>
    </div>
  );
};

export default DisplayPinCodeDetails;



