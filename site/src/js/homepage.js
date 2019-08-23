import React from "react";

export default class Homepage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
            <div className="container">
                    <h1>Marcs Startseite !</h1>
                <div className="col-12">
                   Gib mir nen Bild ! mit parallex vielleicht auch über die ganze homepage? oder drei bilder? hmmmm
                </div>
                <div className="col-12">
                    Hallo its me und text zu mir
                </div>
                <div>
                    geb mir dann auch noch ne bottom navbar bitte danke :>
                </div>
            </div>
        );
    }
}