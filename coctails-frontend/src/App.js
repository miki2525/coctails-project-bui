import React from "react"
import {Route, Routes, BrowserRouter, Navigate} from 'react-router-dom'
import NavigationBar from "./components/NavigationBar";
import Comp from "./components/Comp";
import PageNotFound from "./components/PageNotFound";

function App() {

    return (
        <BrowserRouter>
            <NavigationBar/>
            <div>
                <Routes>
                    <Route path="/" exact element={<Comp/>}/>
                    <Route exact path="/about" element={<Comp/>}/>

                    {/*NOT FOUND*/}
                    <Route path="*" element={<Navigate to="/404"/>}/>
                    <Route path="/404" element={<PageNotFound/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
