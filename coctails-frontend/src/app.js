import React from "react"
import {Route, Routes, BrowserRouter, Navigate} from 'react-router-dom'
import NavigationBar from "./components/navigationBar";
import PageNotFound from "./components/pageNotFound";
import DisplayCoctails from "./components/displayCoctails";
import About from "./components/about";

function App() {

    return (
        <BrowserRouter>
            <NavigationBar/>
            <div>
                <Routes>
                    <Route path="/" exact element={<DisplayCoctails/>}/>
                    <Route exact path="/about" element={<About/>}/>

                    {/*NOT FOUND*/}
                    <Route path="*" element={<Navigate to="/404"/>}/>
                    <Route path="/404" element={<PageNotFound/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
