import React, {useState} from 'react';
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
function EditC(props) {
    return (
        <div>
            <div style={{ display: 'flex' }} className="container">
                <form action="/postC" method="post">
                    <div className="form-group">

                    </div>
                    <div className="form-group">

                    </div>
                    <div className="form-group">

                    </div>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}
export default EditC;