import "./App.css";

import {BrowserRouter as Router, Routes} from "react-router-dom";


import Footer from "./components/layout/footer";
import Header from "./components/layout/header";
import {Toaster} from "react-hot-toast";
import useUserRoute from "./components/routes/UserRoute";
import useAdminRoute from "./components/routes/AdminRoute";




function App() {

  const userRoutes = useUserRoute();
  const adminRoutes = useAdminRoute();

  return (
    <Router>
    <div className="App">
    <Toaster position="top-center"/>  
    <Header/>

    <div className="container">
    <Routes>
    {userRoutes}
    {adminRoutes}
    </Routes> 
    </div>

    <Footer/>
    </div>
    </Router>
  );
}

export default App;
