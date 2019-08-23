import React from "react";

export default class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        return (
            <div className="fixed-top bg-success">
                <div>
                    <nav>
                        <div className="col-2">Image</div>
                        <div className="col-2">Startseite</div>
                        <div className="col-2">Blog</div>
                        <div className="col-2">twitch :></div>
                        <div className="col-4">Suchen</div>
                    </nav>
                </div>
            </div>
        );
    }
}