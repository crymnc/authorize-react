import IconButton from "@material-ui/core/IconButton/IconButton";
import React from "react";
import Delete from "@material-ui/icons/esm/Delete";

const DeleteButton = (props) => {
    const {onClickMethod,elementId} = props;
    return (<IconButton aria-label="delete" size="large" onClick={() => {onClickMethod(elementId)}}><Delete/></IconButton>)
}
export default DeleteButton;