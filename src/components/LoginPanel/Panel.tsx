import React from "react";
import {IUser, Role} from "../Login/IUser";
import Popup from "../../ShopComponents/front/Popup";
import {Redirect} from "react-router-dom";

type PanelProps = {
    user: IUser
}

export default class Panel extends React.Component<PanelProps> {
    state = {
        redirect: false
    }

    constructor(props: PanelProps) {
        super(props);
        this.state = {
            redirect: false
        }
    }

    togglePopup() {
        this.setState({redirect: true})
    }

    render() {
        if (this.state.redirect) return <Redirect to="/"/>
        if (this.props.user!) {
            let currUserRole = this.props.user.credentials.role;
            if (currUserRole === Role.ADMIN) { //tu bedzie moj admin
                return (<h1> To bedzie moj Panel admina !!!!!!!!</h1>)
            } else if (currUserRole === Role.USER) {
                return (<h1>Hello {this.props.user.name}</h1>);
            }
        } else {
            return (<Popup
                text='Panel tylko dla zalogowanych użytkowników!'
                closePopup={this.togglePopup.bind(this)}
            />);
        }
    };
}