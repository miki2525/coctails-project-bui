import React from "react"
import {Route, Routes, BrowserRouter, Navigate, NavLink, useLocation} from 'react-router-dom'
import NavigationBar from "./components/navigationBar";
import PageNotFound from "./components/pageNotFound";
import About from "./components/about";
import DisplayCoctails from "./components/displayCoctails";
import DisplayCoctailDetails from "./components/displayCoctailDetails";
import AdminLogin from "./components/adminLogin";

function App() {

    return (
        <BrowserRouter>
            <NavigationBar/>
            <div>
                <Routes>
                    <Route path="/" exact element={<DisplayCoctails/>}/>
                    <Route path="/coctail/:id" exact element={<DisplayCoctailDetails/>}/>
                    <Route exact path="/about" element={<About/>}/>
                    <Route exact path="/api/adminLogin" element={<AdminLogin/>}/>h

                    {/*NOT FOUND*/}
                    <Route path="*" element={<Navigate to="/404"/>}/>
                    <Route path="/404" element={<PageNotFound/>}/>
                </Routes>
            </div>
                <NavLink className="link" to="/api/adminLogin">(admin)</NavLink>
        </BrowserRouter>
    );
}

export default App;
