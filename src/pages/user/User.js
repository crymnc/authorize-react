import React, {useEffect} from 'react';
import {getAllUsers} from "../../api/user";
import "./user.css"
import CollapsibleTable from "../../components/table/CollapsibleTable";
import {Link} from "react-router-dom";

const User = () => {
    const [users, setUsers] = React.useState([]);

    useEffect(() => {
        const fetchedUsers = async () => {
            const response = await getAllUsers();
            setUsers(response);
        };
        return fetchedUsers();
    }, []);

    var rows = [];
    users.map((user) => {
        const subRow = {
            header: [],
            data: []
        };
        user.userComponentContents.map((userComponentContent) => {
            subRow.header.push(userComponentContent.componentName)
            subRow.data.push(userComponentContent.content)
        })

        const row = {
            id: user.id,
            name: user.name,
            lastName: user.lastName,
            username: user.username,
            roles: user.roles.toString(),
            active: user.active.toString(),
            subRow
        }
        rows.push(row)
    })
    const header = ['ID', 'Name', 'Last Name', 'Username', 'Roles', 'Active'];


    return (
        <React.Fragment>
            <fieldset className="form">
                <legend className="register-form-header">Users</legend>
                <Link className="form-button right" to="users/add">New User</Link>
                <CollapsibleTable header={header} rows={rows}/>
            </fieldset>
        </React.Fragment>
    );
};

export default User;
