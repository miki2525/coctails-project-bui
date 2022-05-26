import React from "react"
import {Route, Routes, BrowserRouter, Navigate, NavLink} from 'react-router-dom'
import NavigationBar from "./components/navigationBar";
import PageNotFound from "./components/pageNotFound";
import About from "./components/about";
import DisplayCoctails from "./components/displayCoctails";
import DisplayCoctailDetails from "./components/displayCoctailDetails";
import AdminLogin from "./components/adminLogin";
import {useAppCtx} from "./appContextProvider";
import EditCoctail from "./components/editCoctail";
import './styles/body.scss'

function App() {
    const {authenticated_AdminRole, setAuthenticated_AdminRole, loading} = useAppCtx();
    console.log(document.cookie)
    if (document.cookie.indexOf("logout") !== -1) {
        alert("logout")
    }
    if (loading){
        return <p>LOADING . . .</p>
    }
    return (
        <BrowserRouter>
            <NavigationBar/>
            <div>
                <Routes>
                    <Route path="/" exact element={<DisplayCoctails/>}/>
                    <Route path="/coctail/:id" exact element={<DisplayCoctailDetails/>}/>
                    <Route path="/coctailEdit/:id" exact element={<EditCoctail/>}/>
                    <Route exact path="/about" element={<About/>}/>
                    <Route exact path="/api/adminLogin" element={<AdminLogin/>}/>

                    {/*NOT FOUND*/}
                    <Route path="*" element={<Navigate to="/404"/>}/>
                    <Route path="/404" element={<PageNotFound/>}/>
                </Routes>
            </div>
            <div className="adminPanel">
            {!authenticated_AdminRole && (<NavLink className="link" to="/api/adminLogin">(admin)</NavLink>)}
            {authenticated_AdminRole && (
                <div><NavLink className="link" onClick={() => logout()} to="/">(wyloguj)</NavLink>
                </div>) //addCoctail
            }
            </div>
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
