import React, { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class SaveBoard extends Component {

    clickHandler(props) {
        localStorage.setItem('items', JSON.stringify(props))
        toast.success("Saved Successfully!")
    }

    render() {
        return (
            <div>
                <button className={"save-btn"} onClick={() => this.clickHandler(this.props.data)}>Save</button>
            </div>
        )
    }
}

export default SaveBoard;