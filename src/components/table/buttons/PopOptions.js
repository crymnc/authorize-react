import IconButton from "@material-ui/core/IconButton/IconButton";
import MoreVert from "@material-ui/icons/esm/MoreVert";
import React from "react";
import Popover from "@material-ui/core/Popover/Popover";
import Box from "@material-ui/core/Box/Box";
import {objectWithoutProperties} from '../../../utils/Utils'


const PopOptions = (props) => {
    const {buttons,elementId} = props;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const arrangedButtons = [];
    if(buttons !=null){
        if(Array.isArray(buttons.props.children)){
            buttons.props.children.forEach(child =>{
                console.log(child)
            })
        }else{
            const buttonProps = Object.assign({"elementId":elementId,...buttons.props.children.props},buttons.props.children.props);
            const buttonWithoutProps = objectWithoutProperties(buttons.props.children,['props']);
            const button = Object.assign({"props":buttonProps,...buttonWithoutProps},buttonWithoutProps);
            arrangedButtons.push(button)
        }
    }

    const open = Boolean(anchorEl);
    return (<>
        <Popover open={open} anchorEl={anchorEl} onClose={handleClose}
                 anchorOrigin={{
                     vertical: 'bottom',
                     horizontal: 'center',
                 }}
                 transformOrigin={{
                     vertical: 'top',
                     horizontal: 'center',
                 }}>
            <Box>
                <>{arrangedButtons}</>
            </Box>
        </Popover>
        <IconButton size="small" onClick={handleClick}><MoreVert/></IconButton>
    </>)



}
export default PopOptions;