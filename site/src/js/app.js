const $ = require("jquery");
global.$ = global.jQuery = $;

import React from "react";
import {render} from "react-dom";
import Blog from "/js/Blog";
import Contact from "./contact";
import Nav from "./nav";
import Homepage from "/js/Homepage";

class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            page:"",
        };
        this.alert=this.alert.bind(this);
        this.handlePage=this.handlePage.bind(this);
    }
    alert(){
        console.log("wir kommen hier hin")
    }
    handlePage(page){
        this.setState({page:page})
    }
        render() {
            const navbarBottom=<nav>
                <div className="col-4">Part one</div>
                <div className="col-4">Part one</div>
                <div className="col-4">Part one</div>
            </nav>;
        const nav = <Nav/>;
            const page = this.state.page;
            const helloworld="hello wolrd";

            let html;
//comment test
        switch (page) {
            case "homepage":
                html=<Homepage/>;
                break;
            case "blog":
                html=<Blog/>;
                break;
            case "contact":
                html=<Contact/>;
                break;
            default:console.log("Unknown Page Sorry for that :-/ :"+page);
        }
        return(

            <div onClick={this.alert} className="h-100 text-dark">
                {nav}
                {html}
                {helloworld}
                <button onClick={()=>this.handlePage("homepage")}>Press the button</button>
                {navbarBottom}
             </div>
        );
    }
}
render(<App/>, document.getElementById("root"));