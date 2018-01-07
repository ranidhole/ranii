import React from 'react';
import {render} from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Login from './Login';

class App extends React.Component {
    constructor(props) {
        super();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {
            products: [
                {
                    id: "P1",
                    ProductName : "Mobile",
                    ProductDescription : "this is a cell phone",
                    emailId : "a@a.com",
                    imageUrl : "high"
                },
                {
                    id: "P2",
                    ProductName : "car",
                    ProductDescription : "This is a car",
                    emailId : "b@b.com",
                    imageUrl : "low"
                },
                {
                    id: "P3",
                    ProductName : "TV",
                    ProductDescription : "This is a TV",
                    emailId : "c@c.com",
                    imageUrl : "low"
                },
                {
                    id: "P4",
                    ProductName : "DeskTop",
                    ProductDescription : "This is a desktop",
                    emailId : "a@a.com",
                    imageUrl : "medium"
                }
            ],

        };
        console.log(this.state.products);
    }
    handleInputChange(e) {
        // console.log(this.state.products);
        // this.setState({
        //     selectedRadio: e.target.value
        // });
         const val = this.state.products.filter((button) => button == e.target.value);
         this.setState({ val });
        console.log(this.state);


    }
    render () {
        return (
            <div>
                <Login triggerParent={this.handleInputChange} />

                {/*<div>{this.state.products}</div>;*/}

            </div>
        )
    }
}

render(<App/>, document.getElementById('app'));