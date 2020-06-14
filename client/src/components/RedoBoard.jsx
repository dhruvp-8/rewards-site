import React, { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class RedoBoard extends Component {

    clickHandler(props) {
        console.log(props)
    }

    render() {
        return (
            <div>
                <button className={"redo-btn"} onClick={(event) => this.props.redoList(event)}>Redo</button>
            </div>
        )
    }
}

export default RedoBoard;
