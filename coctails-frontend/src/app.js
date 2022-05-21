import React from "react"
import {Route, Routes, BrowserRouter, Navigate, NavLink, useLocation, useNavigate} from 'react-router-dom'
import NavigationBar from "./components/navigationBar";
import PageNotFound from "./components/pageNotFound";
import About from "./components/about";
import DisplayCoctails from "./components/displayCoctails";
import DisplayCoctailDetails from "./components/displayCoctailDetails";
import AdminLogin from "./components/adminLogin";
import {useAppCtx} from "./appContextProvider";

function App() {
    const {authenticated_AdminRole, setAuthenticated_AdminRole} = useAppCtx();
    console.log(document.cookie)
    if(document.cookie.indexOf("logout") !== -1) {
        alert("logout")
    }
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
            {!authenticated_AdminRole && (<NavLink className="link" to="/api/adminLogin">(admin)</NavLink>)}
            {authenticated_AdminRole && (<NavLink className="link" onClick={() => logout()} to="/">(wyloguj)</NavLink>)}
        </BrowserRouter>
    );

    const logout = () => {
        fetch('/adminLogin/logout')
            .then(response => response.json()
                .then(data => {
                    if (data) {
                        setAuthenticated_AdminRole(false);
                    }
                }))
    }
}


export default App;
