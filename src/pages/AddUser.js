import React, {useState, useEffect} from 'react';
import {referenceService} from "../api/ReferenceService";
import {userService} from "../api/UserService";
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    TextField
} from '@material-ui/core';
import Container from "@material-ui/core/Container/Container";


const AddUser = (props) => {
    const [roles, setRoles] = useState([]);
    const [userComponents, setUserComponents] = useState([]);
    const [open, setOpen] = useState();

    useEffect(() => {
        referenceService.getAllRoles().then(response => setRoles(response));
    }, []);

    const getRoleComponents = e => {
        if (e.target.value !== "-1") {
            referenceService.getSubConstants('role', e.target.value, 'usercomponent').then(response => {
                if (response) {
                    setOpen(true);
                    setUserComponents(response);
                } else {
                    setUserComponents([])
                    setOpen(false)
                }
            });
        }
        else {
            setOpen(false);
            setUserComponents([]);
        }
    };

    const saveNewUser = async e => {
        e.preventDefault();
        const name = e.target.elements["name"].value;
        const lastName = e.target.elements["lastName"].value;
        const username = e.target.elements["username"].value;
        const password = e.target.elements["password"].value;
        const role = e.target.elements["roles"].value;
        const components = [];
        userComponents.forEach((userComponent) => {
            components.push({
                "componentId": userComponent.id,
                "content": e.target.elements["userComponent" + userComponent.id].value
            })
        });
        const request = {
            name,
            lastName,
            username,
            password,
            "roles": [role],
            "userComponentContents": components,
            "active": true
        }
        await userService.saveUser(request);
    }

    return (
        <Container maxWidth={false}>
            <form onSubmit={saveNewUser} autoComplete="off" noValidate{...props}>
                <Card>
                    <CardHeader subheader="The information can be edited" title="Profile"/>
                    <Divider/>
                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid item md={6} xs={12}>
                                <TextField fullWidth helperText="Please specify the first name" label="First name"
                                           name="name"
                                           required variant="outlined"/>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField fullWidth label="Last name" name="lastName"
                                           required variant="outlined"/>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField fullWidth label="Username" name="username"
                                           required variant="outlined"/>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField fullWidth label="Password" name="password"
                                           required variant="outlined"/>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField fullWidth label="Select Role" name="roles" onChange={getRoleComponents}
                                           required select SelectProps={{native: true}} variant="outlined">
                                    <option key={-1} value={-1}>Select</option>
                                    {roles.map((option) => (
                                        <option key={option.id} value={option.id}>
                                            {option.dsc}
                                        </option>
                                    ))}
                                </TextField>
                            </Grid>

                        </Grid>
                    </CardContent>
                    <Divider/>
                    {open && <>
                        <CardHeader title="Additional Profile Information"/>
                        <Divider/>
                        <CardContent>
                            <Grid container spacing={3}>
                                {
                                    userComponents.map((userComponent) =>
                                        <Grid item md={6} xs={12}>
                                            <TextField fullWidth label={userComponent.dsc}
                                                       name={"userComponent" + userComponent.id}
                                                       required variant="outlined"/>
                                        </Grid>)
                                }
                            </Grid>
                        </CardContent>
                        <Divider/>
                    </>
                    }
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            p: 2
                        }}
                    >
                        <Button type="submit" color="primary" variant="contained">Save</Button>
                    </Box>
                </Card>
            </form>
        </Container>
    );
};

export default AddUser;

