import React, { Component } from 'react';

class Login extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     selectedRadio:'high'
        // };
        //
        //
        // this.handleInputChange = this.onAddressChanged.bind(this);




    }
    //
    // onAddressChanged(e) {
    //     this.setState({
    //         selectedRadio: e.target.value
    //     });
    //
    // }

    render() {
        return (
            <div>
                <input type="radio" onChange={this.props.triggerParent} name="high1"
                               value='high'
                />high
                    <input type="radio" onChange={this.props.triggerParent} name="high1"
                               value='medium'
                               />medium
                   <input type="radio" onChange={this.props.triggerParent} name="high1"
                               value='low'
                    />Low
            </div>
        );
    }
}
export default Login;