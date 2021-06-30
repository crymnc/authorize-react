import React, {useState,useEffect} from 'react';
import {getAllRoles,getSubConstants} from "../../api/reference";
import {saveUser} from "../../api/user";


const AddUser = () => {
    const [roles, setRoles] = useState([]);
    const [userComponents, setUserComponents] = useState([]);

    useEffect(() => {
        const roles = async () => {
            const response = await getAllRoles();
            setRoles(response);
        };
        return roles();
    }, []);

    const getRoleComponents = async e => {
        if(e.target.value !== "-1")
            setUserComponents(await getSubConstants('role', e.target.value, 'usercomponent'));
        else
            setUserComponents([])
    };

    const saveNewUser = async e =>{
        e.preventDefault();
        const name = e.target.elements["name"].value;
        const lastName = e.target.elements["lastName"].value;
        const username = e.target.elements["username"].value;
        const password = e.target.elements["password"].value;
        const role = e.target.elements["roles"].value;
        const components = [];
        userComponents.map((userComponent) => {
            components.push({
                "componentId":userComponent.id,
                "content":e.target.elements["userComponent"+userComponent.id].value
            })
        });
        const request = {
            name,
            lastName,
            username,
            password,
            "roles" : [role],
            "userComponentContents": components,
            "active":true
        }

        console.log(request)
        await saveUser(request);
    }

    return (
        <form onSubmit={saveNewUser}>
            <fieldset className="form register-form">
                <legend className="register-form-header">New User</legend>

                <div key={"name"} className="row">
                    <span key={1}>Name</span>
                    <input placeholder="Name" id="name" type="text"/>
                </div>
                <div key={"lastName"} className="row">
                    <span>Last Name</span>
                    <input placeholder="Last Name" id="lastName" type="text" />
                </div>
                <div key={"username"} className="row">
                    <span>Username</span>
                    <input placeholder="Username" id="username" type="text"/>
                </div>
                <div key={"password"} className="row">
                    <span>Password</span>
                    <input placeholder="Password" id="password" type="password"/>
                </div>
                <div key={"roles"} className="row">
                    <span>Roles</span>
                    <select id="roles" onChange={getRoleComponents}>
                        <option key={-1} value="-1">Select</option>
                        {roles.map(role => <option key={role.id} value={role.id}>{role.dsc}</option>)}
                    </select>
                </div>
                {
                    userComponents.map((userComponent) =>
                        <div key={"userComponent"+userComponent.id} className="row">
                            <span>{userComponent.dsc}</span>
                            <input placeholder={userComponent.dsc} id={"userComponent"+userComponent.id} type="text"/>
                        </div>)
                }
                <div key={"save"} className="row">
                    <button type="submit" className="save">Save</button>
                </div>
            </fieldset>
        </form>
    );
};

export default AddUser;

