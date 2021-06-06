import React,{useEffect} from 'react';
import {getAllUsers} from "../../api/user";
import useRefreshUser from "../../hooks/auth/useRefreshUser";
import "./user.css"
import CollapsibleTable from "../../components/table/CollapsibleTable";

const User = () => {
    const {refreshUser} = useRefreshUser();
    const [users, setUsers] = React.useState([]);

    useEffect(() => {
        const fetchedUsers = async () => {
            const response = await getAllUsers((await refreshUser).token);
            setUsers(response);
        };
        return fetchedUsers();
    }, []);

    var rows=[];
    users.map((user) => {
        const subRow = {
            header:[],
            data:[]
        };
        user.userComponentContents.map((userComponentContent)=>{
            subRow.header.push(userComponentContent.componentName)
            subRow.data.push(userComponentContent.content)
        })

        const row = {
            id:user.id,
            name: user.name,
            lastName: user.lastName,
            username: user.username,
            roles: user.roles.toString(),
            active: user.active.toString(),
            subRow
        }
        rows.push(row)
    })
    const header = ['ID' , 'Name', 'Last Name', 'Username','Roles','Active'];


    return (
        <div>
            <h2>Users</h2>
            <CollapsibleTable header = {header} rows ={rows}/>
        </div>
    );
};

export default User;
