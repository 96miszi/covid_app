import React from 'react';
import './App.css';
import MenuBar from './MenuBar';
import CovidShop from "./ShopComponents/front/CovidShop";
import CovidFeed from "./CovidFeed";
import CovidNews from "./CovidNews/CovidNews";
import FormMedicalCheck from "./FormMedicalCheck"
import ShopBasket from "./ShopComponents/front/ShopSummary";
import Login from "./components/Login/Login";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Panel from "./components/LoginPanel/Panel";
import Register from "./components/Register/Register";
import FormEditUserData from "./FormEditUserData"

// const enqueueSnackbar = () => useSnackbar();
export default class App extends React.Component {

    state = {
        user: undefined,
    }
    logout = () => {
        // let enqueueSnackbar = useSnackbar();
        this.setState({user: undefined});
        localStorage.removeItem("user");
        // enqueueSnackbar.closeSnackbar('You have been logged out!');
    }
    Home = () => (
        <div className="cardWykon">
            <h1 className="wykon">Wykonali:</h1>
            <div className="wykonNames">
                <li> Damian Goraj s18085</li>
                <li> Dominika Ługowska s17226</li>
                <li> Michelle Herok s15474</li>
                <li> Marcin Chojnacki s15074</li>
            </div>
        </div>
    );
    render() {
        if (!this.state.user) {
            const user = localStorage.getItem("user");
            if (user != null) {
                this.setState({user: JSON.parse(user)});
            }
        }
        return (
            <Router>
                <div>
                    <MenuBar user={this.state.user} logout={this.logout}/>
                    <Switch>
                        <Route path="/" exact component={this.Home}></Route>
                        <Route path="/feed" component={CovidFeed}></Route>
                        <Route path="/news" component={CovidNews}></Route>
                        <Route path="/shop" component={CovidShop}></Route>
                        <Route path="/medicalcheck" component={FormMedicalCheck}></Route>
                        <Route path="/editdata" component={FormEditUserData}></Route>
                        <Route path="/panel" render={() => <Panel user={this.state.user!}/>}/>
                        <Route path="/login" render={() => <Login setUser={(u) => {
                            this.setState({user: u})
                        }}/>}/>
                        <Route path="/register" render={() => <Register/>}/>
                        <Route path="/mybasket" component={ShopBasket}></Route>
                    </Switch>
                </div>
            </Router>
        );
    }
}
