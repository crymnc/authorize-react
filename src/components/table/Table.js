import React from "react";
import Toolbar from "./Toolbar";
import SearchBar from "./SearchBar";
import CollapsibleTable from "./CollapsibleTable";
import Box from "@material-ui/core/Box/Box";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";


const Table = ({rows, tableProperties, toolbarProperties, searchBarProperties, loading}) => {
    const [filteredRows, setFilteredRows] = React.useState(rows);
    const [insideRows, setInsideRows] = React.useState([]);
    React.useEffect(()=>{
        setInsideRows(rows)
    },[])
    return (<>
        {toolbarProperties && toolbarProperties.isActive && <Toolbar buttons={toolbarProperties.buttons}/>}
        {searchBarProperties && searchBarProperties.isActive && <SearchBar unFilteredRows={insideRows} setFilteredRows={setFilteredRows}/>}
        {loading && <CircularProgress />}
        <Box sx={{pt: 3}}>
            {tableProperties.type === "collapsible" ?
                <CollapsibleTable header={tableProperties.header} rows={filteredRows} buttons={tableProperties.buttons}/> : null}
        </Box>
    </>)
}

export default Table;