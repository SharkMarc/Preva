import React from "react";

export default class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        return (
            <div>
            <h1>Kontaktiere mich:</h1>
            <div>
            <form typeof="post">
                <div className="text-center col-12 row">
                <input type="text" className="col-6 ml-auto mr-auto" placeholder="Vorname" required></input>
                <input type="text" className="col-6 ml-auto mr-auto" placeholder="Nachname"  required></input>
                <input type="text" className="col-6 ml-auto mr-auto" placeholder="Email Adresse" required></input>
                <textarea type="text" className="col-10 ml-auto mr-auto" placeholder="Anliegen"></textarea>
                    <button onSubmit={handleSubmit()}>Absenden</button>
                </div>
            </form>
        </div>
            </div>
        );
    }
}