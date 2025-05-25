import React, { useEffect, useState }  from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getPriceQueryParams } from "../../helpers/Helper";
import { PRODUCT_CATEGORIES } from "../../constants/Constants";
import StarRatings from 'react-star-ratings';


const Filters = () => {

const [min, setMin] = useState(0)    
const [max, setMax] = useState(0)

const navigate = useNavigate();
let [searchParams] = useSearchParams() ;

useEffect(() =>{
searchParams.has("min") && setMin(searchParams.get("min"));
searchParams.has("max") && setMax(searchParams.get("max"));
}, [] )



// Handle Category & Rating Filter //

const handleClick = (checkbox) => {
const checkboxes = document.getElementsByName(checkbox.name);
// Select One Checkbox at a time //
checkboxes.forEach((item)=>{
if(item !== checkbox) item.checked = false; 
});

if(checkbox.checked === false) {
// delete filter fropm query //
if(searchParams.has(checkbox.name)){
searchParams.delete(checkbox.name);

const path = window.location.pathname + "?" + searchParams.toString();
navigate(path);
}
} else {
    // Set new filter value if already there //
    if(searchParams.has(checkbox.name)){
    searchParams.set(checkbox.name, checkbox.value);    
} else{
    // append new filter //
    searchParams.append(checkbox.name, checkbox.value);    
    }
    const path = window.location.pathname + "?" + searchParams.toString();
    navigate(path);
  };

  };

// Handle Price Filter //
const handleButttonClick = (e) => {
    e.preventDefault(); 
    
    searchParams = getPriceQueryParams(searchParams, "min", min)
    searchParams = getPriceQueryParams(searchParams, "max", max)
   
    const path = window.location.pathname + "?" + searchParams.toString();
    navigate(path);
   };

   const defaultCheckHandler = (checkboxType, checkboxValue) =>{
    const value = searchParams.get(checkboxType);
    if(checkboxValue === value) return true;
    return false;
    }

return (
    <div className="border p-3 filter">
    <h3>Filters</h3>
    <hr />
    <h5 className="filter-heading mb-3">Price</h5>
    <form
      id="filter_form"
      className="px-2"
      onSubmit={handleButttonClick}
    >
      <div className="row">
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Min ($)"
            name="min"
            value={min}
            onChange={(e)=> setMin(e.target.value)}
          />
        </div>
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Max ($)"
            name="max"
            value={max}
            onChange={(e)=> setMax(e.target.value)}

          />
        </div>
        <div className="col">
          <button type="submit" className="btn btn-primary">GO</button>
        </div>
      </div>
    </form>
    <hr />
    <h5 className="mb-3">Category</h5>

    {PRODUCT_CATEGORIES?.map((categories) => (
        <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="categories"
          id="check4"
          value={categories}
          defaultChecked={defaultCheckHandler("categories", categories)}
          onClick={(e) => handleClick(e.target)}
        />
        <label className="form-check-label" for="check4"> {categories} </label>
      </div>

    ))}


   
    <hr />
    <h5 className="mb-3">Ratings</h5>
    {[5,4,3,2,1].map((ratings) =>(
    <div className="form-check">
      <input
        className="form-check-input"
        type="checkbox"
        name="ratings"
        id="check7"
        value={ratings}
        defaultChecked={defaultCheckHandler("ratings", ratings.toString())}
        onClick={(e) => handleClick(e.target)}
      />
      <label className="form-check-label" for="check7">
      <StarRatings
                   rating={ratings}
                   starRatedColor="#ffb829"
                   numberOfStars={5}
                   name='rating'
                   starDimension="22px"
                   starSpacing="1px"
                   />      </label>
    </div>
        
    ))
    }
    
  </div>   
)

}

export default Filters;