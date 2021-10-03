import {
    Box,
} from '@material-ui/core';
import React from "react";

const Toolbar = ({buttons, ...props}) => (
    <Box {...props}>
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'flex-end'
            }}
        >
            {buttons}
        </Box>
    </Box>
);

export default Toolbar;
