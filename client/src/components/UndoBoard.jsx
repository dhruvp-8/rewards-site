import React, { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class UndoBoard extends Component {

    clickHandler(props) {
        console.log(props)
    }

    render() {
        return (
            <div>
                <button className={"undo-btn"} onClick={(event) => this.props.undoList(event)}>Undo</button>
            </div>
        )
    }
}

export default UndoBoard;
