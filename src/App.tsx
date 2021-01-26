import React, {useState} from 'react';
import './App.css';
import MenuBar from './MenuBar';
import CovidShop from "./ShopComponents/front/CovidShop";
import CovidFeed from "./CovidFeed";
import CovidNews from "./CovidNews";
import Login from "./Login/Login";
import {BrowserRouter as Router, Route, Switch, useHistory} from "react-router-dom"
import {IUser} from "./Login/IUser";
import Panel from "./LoginPanel/Panel";


const App = () => {
    const [user, setUser] = useState<IUser | undefined>(undefined);

    const logout = () => {
        setUser(undefined);
        alert("You have been logged out!");
    }
    const Home = () => (
        <div>
            <h1>Home Page</h1>
        </div>
    );
    return (
        <Router>
            <div>
                <MenuBar user={user} logout={logout}/>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/feed" component={CovidFeed}/>
                    <Route path="/news" component={CovidNews}/>
                    <Route path="/shop" component={CovidShop}/>
                    <Route path="/panel" render={() => <Panel user={user!}/>}/>
                    <Route path="/login" render={() => <Login setUser={setUser} />}/>
                </Switch>
            </div>
        </Router>
    );


}

export default App;
