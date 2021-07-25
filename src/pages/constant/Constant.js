import React, {useState, useEffect} from 'react';
import {referenceService} from "../../api/ReferenceService";
import CollapsibleTable from "../../components/table/CollapsibleTable";

const Constant = () => {
    const [references, setReferences] = useState([]);
    const [isPanelOpen, setPanelOpen] = useState();
    useEffect(() => {
        const referenceName = document.querySelector('#referenceList').getElementsByTagName("option")[0].value;
        referenceService.getReferences(referenceName).then(response => setReferences(response));
    }, []);

    const getReferences = e => {
        referenceService.getReferences(e.target.value).then(response => setReferences(response));
    };

    const togglePanel = () =>{
        isPanelOpen ? setPanelOpen(false):setPanelOpen(true);
    }

    const saveConstant = e =>{
        e.preventDefault();
        const referenceName = document.querySelector('#referenceList').getElementsByTagName("option")[0].value;
        const name = e.target.elements["name"].value;
        const dsc = e.target.elements["dsc"].value;
        referenceService.saveReference(referenceName, {name,dsc})
    }

    const header = ['ID', 'Name', 'Description', 'Discontinue Date'];
    return (
        <React.Fragment>
            <fieldset className="form normal-size">
                <legend className="form-header">Constants</legend>
                <form className="form" onSubmit={saveConstant}>
                    <div className="row">
                        <span>Constants</span>
                        <select id="referenceList" className="input" onChange={getReferences}>
                            <option value="role">Role</option>
                            <option value="usercomponent">User Component</option>
                            <option value="authority">Authority</option>
                            <option value="authoritygroup">Authority Group</option>
                            <option value="webpagecomponent">Web Page Component</option>
                            <option value="webpagecomponenttype">Web Page Component Type</option>
                            <option value="webpage">Web Page</option>
                        </select>
                    </div>
                    <div className="row">
                        <CollapsibleTable header={header} rows={references}/>
                    </div>
                    <div className="row">
                        <button className="button primary-button plus-button" onClick={togglePanel}>+</button>
                    </div>
                    {
                        isPanelOpen ? <div className="row">
                            <div key={"name"} className="row">
                                <span key={1}>Name</span>
                                <input placeholder="Name" id="name" type="text" className="input"/>
                            </div>
                            <div key={"dsc"} className="row">
                                <span>Description</span>
                                <input placeholder="Description" id="dsc" type="text" className="input"/>
                            </div>
                            <div className="row">
                                <button type="submit" className="button primary-button save-button">Save</button>
                            </div>
                        </div> : null
                    }
                </form>
            </fieldset>
            <fieldset className="form normal-size">
                <legend className="form-header">Relations</legend>
                <div className="row">
                    <span>Roles</span>
                    <select id="roles" className="input">
                        <option key={-1} value="-1">Select</option>
                    </select>
                </div>
            </fieldset>
        </React.Fragment>
    );
};

export default Constant;
