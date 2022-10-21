import React, { Fragment } from "react";
import Backdrop from "../Backdrop/Backdrop";
import Modal from '../Modal/Modal';

const errorHandler = props => {

return (
    <Fragment>
        {props.error && !props.userId && <Backdrop onClick={props.onHandle}/>}
        {props.error && !props.userId && (
            <Modal
                title="An Error Occured"
                onCancelModal={props.onHandle}
                onAcceptModal={props.onHandle}
                acceptEnabled
            >
                <p>{props.error}</p>
            </Modal>
        )}
    </Fragment>
    );
};

export default errorHandler;