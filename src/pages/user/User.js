import React, {useEffect} from 'react';
import {userService} from "../../api/UserService";
import "./user.css"
import CollapsibleTable from "../../components/table/CollapsibleTable";
import {Link} from "react-router-dom";

const User = () => {
    const [users, setUsers] = React.useState([]);

    useEffect(() => {
        userService.getAllUsers().then(response => setUsers(response));
    }, []);

    var rows = [];
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
    const header = ['ID', 'Name', 'Last Name', 'Username', 'Roles', 'Active'];


    return (
        <React.Fragment>
            <fieldset className="form">
                <legend className="form-header">Users</legend>
                <Link className="link-button right" to="users/add">New User</Link>
                <CollapsibleTable header={header} rows={rows}/>
            </fieldset>
        </React.Fragment>
    );
};

export default User;
