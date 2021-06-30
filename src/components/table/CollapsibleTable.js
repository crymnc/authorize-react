import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();

    const subRow = row.subRow;
    const newRow = Object.keys(row).reduce((object, key) => {
        if (key !== 'subRow') {
            object[key] = row[key]
        }
        return object
    }, {})


    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                {
                    Object.keys(newRow).map((key,index) => (
                        <TableCell key={"cell"+index}>{newRow[key]}</TableCell>
                    ))
                }
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={Object.keys(newRow).length+1}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Other Information
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        {
                                            subRow.header.map((key,index) =>(
                                                <TableCell key={"subHead"+index}>{key}</TableCell>
                                            ))
                                        }
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                    {
                                        subRow.data.map((key,index) =>(
                                            <TableCell key={"subRow"+index}>{key}</TableCell>
                                        ))
                                    }
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default function CollapsibleTable(tableConstructionData) {
    const {header, rows} = tableConstructionData;
    return (
        <TableContainer style={{marginTop : 10}} component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        {
                            header.map((head,index) => (<TableCell key={"head"+index}>{head}</TableCell>))
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        rows.map((row,index) => <Row key={"row"+index} row={row} />)
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}