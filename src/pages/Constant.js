import React, {useState} from 'react';
import {referenceService} from "../api/ReferenceService";
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    TextField
} from '@material-ui/core';
import Container from "@material-ui/core/Container/Container";
import Table from "../components/table/Table";
import Add from '@material-ui/icons/Add';
import IconButton from "@material-ui/core/IconButton/IconButton";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import Typography from "@material-ui/core/Typography/Typography";
import DeleteButton from "../components/table/buttons/DeleteButton";

const Constant = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [references, setReferences] = useState([]);
    const [referenceName, setReferenceName] = useState('');
    React.useEffect(() => {
        const reference = document.querySelector('#referenceList').getElementsByTagName("option")[0];
        setReferenceName(reference.text);
        referenceService.getReferences(reference.value).then(responses => {
            responses.forEach(response => {
                const reference = {
                    id: response.id,
                    name: response.name,
                    dsc: response.dsc,
                    discontinueDate: response.discontinueDate
                };
                references.push(reference)
            });
            setLoading(false)
        })
    }, []);

    const getReferences = e => {
        setReferenceName(e.target.options[e.target.selectedIndex].text);
        referenceService.getReferences(e.target.value).then(responses => {
            references.length = 0;
            setLoading(true)
            responses.forEach(response => {
                const reference = {
                    id: response.id,
                    name: response.name,
                    dsc: response.dsc,
                    discontinueDate: response.discontinueDate
                };
                references.push(reference)
            });
            setReferences(references)
            setLoading(false)
        });
    };

    const togglePanel = () => {
        isModalOpen ? setModalOpen(false) : setModalOpen(true);
    }

    const saveConstant = (e) => {
        e.preventDefault();
        const refSelect = document.querySelector('#referenceList');
        const refName = refSelect.options[refSelect.selectedIndex].value;
        const name = e.target.elements["name"].value;
        const dsc = e.target.elements["dsc"].value;
        referenceService.saveReference(refName, {name, dsc})
    }

    const tableButtons = <><DeleteButton onClickMethod={(elementId) => {
        const refSelect = document.querySelector('#referenceList');
        const refName = refSelect.options[refSelect.selectedIndex].value;
        referenceService.deleteReference(refName,elementId).then(value => console.log("success"))
    }}/></>
    const header = ['ID', 'Name', 'Description', 'Discontinue Date'];
    return (
        <Container maxWidth="md">
            <form autoComplete="off">
                <Card>
                    <CardHeader subheader="Constants are listed below" title="Constants"/>
                    <Divider/>
                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid item md={6} xs={12}>
                                <TextField fullWidth label="Select Reference" id="referenceList"
                                           name="references"
                                           onChange={getReferences}
                                           required select SelectProps={{native: true}} variant="outlined">
                                    <option value="role">Role</option>
                                    <option value="usercomponent">User Component</option>
                                    <option value="authority">Authority</option>
                                    <option value="authoritygroup">Authority Group</option>
                                    <option value="webpagecomponent">Web Page Component</option>
                                    <option value="webpagecomponenttype">Web Page Component Type</option>
                                    <option value="webpage">Web Page</option>
                                </TextField>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <IconButton color="primary" aria-label="add" onClick={togglePanel}>
                                    <Add fontSize="large"/>
                                </IconButton>
                            </Grid>
                            <Dialog maxWidth="lg" fullWidth={true} onClose={togglePanel}
                                    aria-labelledby="customized-dialog-title" open={isModalOpen}>
                                <DialogTitle id="customized-dialog-title">
                                    <Typography variant="h3">Add {referenceName}</Typography>
                                </DialogTitle>
                                <DialogContent dividers>
                                    <form onSubmit={saveConstant} autoComplete="off">
                                        <Grid container spacing={3}>
                                            <Grid item md={6} xs={12}>
                                                <TextField fullWidth label="Name" name="name"
                                                           required variant="outlined"/>
                                            </Grid>
                                            <Grid item md={6} xs={12}>
                                                <TextField fullWidth label="Description" name="dsc"
                                                           required variant="outlined"/>
                                            </Grid>
                                            <Grid item md={12} xs={12}>
                                                <Button type="submit" color="primary" variant="contained">Save</Button>
                                            </Grid>
                                        </Grid>
                                    </form>
                                </DialogContent>
                            </Dialog>
                            <Grid item md={12} xs={12}>
                                <Table rows={references}
                                       tableProperties={{type: "collapsible", header, buttons:tableButtons}}
                                       searchBarProperties={{isActive: true}}
                                       loading={loading}/>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </form>
        </Container>
    );
};

export default Constant;
