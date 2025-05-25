import React, { useState } from "react";
import AdminLayout from "../layout/adminLayout";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MetaData from "../layout/metaData";





const Dashboard = () => {

    const [startDate, setStartDate] = useState(new Date().setDate(1));
    const [endDate, setEndDate] = useState(new Date());


return <AdminLayout> 
       
       <MetaData title= "Admin Dashboard"/>
  
     <div class="d-flex justify-content-start align-items-center">
      <div class="mb-3 me-4">
        <label class="form-label d-block">Start Date</label>
        <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        className="form-control"
      />
      </div>
      <div class="mb-3">
        <label class="form-label d-block">End Date</label>
        <DatePicker
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
      />
      </div>
      <button class="btn fetch-btn ms-4 mt-3 px-5">Fetch</button>
    </div>

    <div class="row pr-4 my-5">
      <div class="col-xl-6 col-sm-12 mb-3">
        <div class="card text-white bg-success o-hidden h-100">
          <div class="card-body">
            <div class="text-center card-font-size">
              Sales
              <br />
              <b>$0.00</b>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-6 col-sm-12 mb-3">
        <div class="card text-white bg-danger o-hidden h-100">
          <div class="card-body">
            <div class="text-center card-font-size">
              Orders
              <br />
              <b>0</b>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mb-5"></div></AdminLayout>



    

};

export default Dashboard;