import Box from "@material-ui/core/Box/Box";
import React from "react";
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent/CardContent";
import TextField from "@material-ui/core/TextField/TextField";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import SvgIcon from "@material-ui/core/SvgIcon/SvgIcon";
import {Search as SearchIcon} from 'react-feather';

function escapeRegExp(value) {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

const SearchBar = ({unFilteredRows, setFilteredRows, ...props}) => {
    const requestSearch = (searchValue) => {
        const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
        const filteredRows = unFilteredRows.filter((row) => {
            return Object.keys(row).some((field) => {
                return row[field] && searchRegex.test(row[field].toString());
            });
        });
        setFilteredRows(filteredRows);
    };

    return (<Box {...props}>
        <Box sx={{mt: 3}}>
            <Card>
                <CardContent>
                    <Box sx={{maxWidth: 500}}>
                        <TextField
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SvgIcon
                                            fontSize="small"
                                            color="action"
                                        >
                                            <SearchIcon/>
                                        </SvgIcon>
                                    </InputAdornment>
                                )
                            }}
                            placeholder="Search"
                            variant="outlined"
                            onChange={(event) => requestSearch(event.target.value)}
                        />
                    </Box>
                </CardContent>
            </Card>
        </Box>
    </Box>);
};

export default SearchBar;
