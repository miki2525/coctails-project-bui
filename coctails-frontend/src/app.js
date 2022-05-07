import React from "react"
import {Route, Routes, BrowserRouter, Navigate} from 'react-router-dom'
import NavigationBar from "./components/navigationBar";
import PageNotFound from "./components/pageNotFound";
import About from "./components/about";
import DisplayCoctails from "./components/displayCoctails";
import DisplayCoctailDetails from "./components/displayCoctailDetails";

function App() {

    return (
        <BrowserRouter>
            <NavigationBar/>
            <div>
                <Routes>
                    <Route path="/" exact element={<DisplayCoctails/>}/>
                    <Route path="/coctail/:id" exact element={<DisplayCoctailDetails/>}/>
                    <Route exact path="/about" element={<About/>}/>
                    <Route exact path="/api/adminLogin" element={<AdminLogin/>}/>
                    {/*NOT FOUND*/}
                    <Route path="*" element={<Navigate to="/404"/>}/>
                    <Route path="/404" element={<PageNotFound/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
