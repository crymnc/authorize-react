import React, {useState,useEffect} from 'react';
import {referenceService} from "../../api/ReferenceService";
import {userService} from "../../api/UserService";


const AddUser = () => {
    const [roles, setRoles] = useState([]);
    const [userComponents, setUserComponents] = useState([]);

    useEffect(() => {
        referenceService.getAllRoles().then(response => setRoles(response));
    }, []);

    const getRoleComponents = e => {
        if(e.target.value !== "-1")
            referenceService.getSubConstants('role', e.target.value, 'usercomponent').then(response => {
                response ? setUserComponents(response) : setUserComponents([])
            });
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
        userComponents.forEach((userComponent) => {
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
        await userService.saveUser(request);
    }

    return (
        <form onSubmit={saveNewUser}>
            <fieldset className="form normal-size">
                <legend className="form-header">New User</legend>

                <div key={"name"} className="row">
                    <span key={1}>Name</span>
                    <input placeholder="Name" id="name" type="text" className="input"/>
                </div>
                <div key={"lastName"} className="row">
                    <span>Last Name</span>
                    <input placeholder="Last Name" id="lastName" type="text" className="input"/>
                </div>
                <div key={"username"} className="row">
                    <span>Username</span>
                    <input placeholder="Username" id="username" type="text" className="input"/>
                </div>
                <div key={"password"} className="row">
                    <span>Password</span>
                    <input placeholder="Password" id="password" type="password" className="input"/>
                </div>
                <div key={"roles"} className="row">
                    <span>Roles</span>
                    <select id="roles" className="select" onChange={getRoleComponents}>
                        <option key={-1} value="-1">Select</option>
                        {roles.map(role => <option key={role.id} value={role.id}>{role.dsc}</option>)}
                    </select>
                </div>
                {
                    userComponents.map((userComponent) =>
                        <div key={"userComponent"+userComponent.id} className="row">
                            <span>{userComponent.dsc}</span>
                            <input placeholder={userComponent.dsc} id={"userComponent"+userComponent.id} className="input" type="text"/>
                        </div>)
                }
                <div key={"save"} className="row">
                    <button type="submit" className="button primary-button save-button">Save</button>
                </div>
            </fieldset>
        </form>
    );
};

export default AddUser;

