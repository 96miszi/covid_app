import React, {ChangeEvent, FormEvent} from 'react';
import './App.css';

export default class FormEditUserData extends React.Component {

    render(){
        return(
            <div>
                <main className="mainForm">
                    <form className="formMedical">
                        <h1 className="headerMedical"> Edytuj dane</h1>
                        <label >Imie:</label>
                        <input className="nameInput" type="text" name="name" id="name" required/>


                        <input className="surnameInput" type="text" name="surname" id="surname" required/>

                        <label htmlFor="email">Email:</label>
                        <input className="emailInput" type="text" name="email" id="email" required/>

                        <label htmlFor="password">Haslo:</label>
                        <input className="passwordInput" type="text" name="password" id="password" required/>

                        <label htmlFor="phone">Telefon:</label>
                        <input className="phoneInput" type="text" name="email" id="email" required/>

                        <label htmlFor="address" >Ulica:</label>
                        <input className="addressInput" type="text" name="street" id="street" required/>

                        <label htmlFor="zipcode" >Kod pocztowy:</label>
                        <input className="zipInput" type="text" name="zipcode" id="zipcode" required/>

                        <br/>
                        <div className="formButtons">
                            <input type="submit" className="formButtonSubmit" value="Edytuj"/>
                            <a href="" className="formButtonCancel"> Anuluj</a>
                        </div>


                    </form>


                </main>
            </div>
        );
    }
}