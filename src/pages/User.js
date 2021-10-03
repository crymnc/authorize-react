import React, {useEffect} from 'react';
import {userService} from "../api/UserService";
import Container from "@material-ui/core/Container/Container";
import Box from "@material-ui/core/Box/Box";
import {Helmet} from "react-helmet";
import Button from "@material-ui/core/Button/Button";
import {Link} from "react-router-dom";
import Table from "../components/table/Table";
import DeleteButton from "../components/table/buttons/DeleteButton";

const User = () => {
    const [loading, setLoading] = React.useState(true);
    var rows = [];
    useEffect(() => {
        userService.getAllUsers().then(
            users => {
                users.forEach((user) => {
                    const subRow = {
                        header: [],
                        data: []
                    };
                    user.userComponentContents.forEach((userComponentContent) => {
                        subRow.header.push(userComponentContent.componentName)
                        subRow.data.push(userComponentContent.content)
                    });

                    const row = {
                        id: user.id,
                        name: user.name,
                        lastName: user.lastName,
                        username: user.username,
                        roles: user.roles.toString(),
                        active: user.active.toString(),
                        subRow
                    };
                    rows.push(row)
                });
                setLoading(false)
            }
        );
    }, []);

    const header = ['ID', 'Name', 'Last Name', 'Username', 'Roles', 'Active'];

    const toolBarButtons =<>
        <Button component={Link} color="primary" variant="contained" to="/users/add">Add customer</Button>
    </>;

    const tableButtons = <><DeleteButton onClickMethod={(elementId) => {
        userService.deleteUser(elementId).then(value => console.log("success"))
    }}/></>

    return (
        <>
            <Helmet>
                <title>Customers | Material Kit</title>
            </Helmet>
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    minHeight: '100%',
                    width:'100%',
                    py: 3,
                }}
            >
                <Container maxWidth={false}>
                    <Table rows={rows}
                           tableProperties={{type:"collapsible", header, buttons:tableButtons}}
                           toolbarProperties={{isActive:true,buttons:toolBarButtons}}
                           searchBarProperties ={{isActive:true}}
                           loading = {loading}/>
                </Container>
            </Box>
        </>
    );
};

export default User;
