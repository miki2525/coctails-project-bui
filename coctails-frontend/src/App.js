import React from "react";
import {Router, Route, browserHistory} from 'react-router'
import NotFound from "./components/NotFound";

function App() {
    return (
        <Router history={browserHistory}>
            <Route component={LayoutWrapper}>
                <Switch>
                    <Route path="/" component={DisplayCoctails}/>
                    <Route path="/about" component={About}/>
                    <Route component={NotFound}/>
                </Switch>
            </Route>
        </Router>
    );
}

export default App;
