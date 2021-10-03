import React, {useState} from 'react';
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
import TablePagination from "@material-ui/core/TablePagination";
import PerfectScrollbar from 'react-perfect-scrollbar';
import PopOptions from "./buttons/PopOptions";

function Row(props) {
    const {row, buttons} = props;
    const [open, setOpen] = React.useState(false);


    const subRow = row.subRow;
    const newRow = Object.keys(row).reduce((object, key) => {
        if (key !== 'subRow') {
            object[key] = row[key]
        }
        return object
    }, {})

    let elementId;

    return (
        <React.Fragment>
            <TableRow key={props.id}>
                {subRow != null ?
                    <TableCell>
                        <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                            {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                        </IconButton>
                    </TableCell> : null
                }
                {
                    Object.keys(newRow).map((key, index) => {
                        if(key === 'id')
                            elementId = newRow[key];
                        return <TableCell key={index}>{newRow[key]}</TableCell>
                    })
                }
                {buttons && <TableCell align="center" ><PopOptions elementId={elementId} buttons={buttons}/></TableCell>}
            </TableRow>
            {
                subRow && <TableRow>
                    <TableCell style={{border: 'none', paddingBottom: 0, paddingTop: 0}}
                               colSpan={Object.keys(newRow).length + 1}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box margin={1}>
                                <Typography variant="h6" gutterBottom component="div">
                                    Other Information
                                </Typography>
                                <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            {
                                                subRow.header.map((key, index) => (
                                                    <TableCell key={"subHead" + index}>{key}</TableCell>
                                                ))
                                            }
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            {
                                                subRow.data.map((key, index) => (
                                                    <TableCell key={"subRow" + index}>{key}</TableCell>
                                                ))
                                            }
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            }

        </React.Fragment>
    );
}

export default function CollapsibleTable(tableConstructionData) {
    const {header, rows, buttons} = tableConstructionData;
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [page, setPage] = useState(0);

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    return (
        <TableContainer style={{marginTop: 10}} component={Paper}>
            <PerfectScrollbar>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            {rows[0] != null && rows[0].subRow != null ? <TableCell/> : null}
                            {
                                header.map((head, index) => (<TableCell key={"head" + index}>{head}</TableCell>))
                            }
                            {buttons && <TableCell key="buttons"/>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            (rowsPerPage > 0
                                    ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : rows
                            ).slice(0, rowsPerPage).map((row, index) => {
                                return <Row key={index} id={index} row={row} buttons={buttons}/>
                            })
                        }
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={Object.keys(rows).length + 1} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </PerfectScrollbar>
            <TablePagination
                component="div"
                count={rows.length}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleChangeRowsPerPage}
                page={page}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
            />
        </TableContainer>
    );
}