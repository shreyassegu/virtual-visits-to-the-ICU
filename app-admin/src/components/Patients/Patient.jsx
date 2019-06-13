import React from 'react'
import ReactDOM from 'react-dom'
import Patient from '../../scripts/patient'
import AddPatient from './AddPatient'
import { Card, Table, CardMedia, CardContent, Typography, Button, Grid, CardActions, Modal } from '@material-ui/core';
import AddRelative from '../Relatives/AddRelative';
import ViewRelative from '../Relatives/ViewRelative';
import UploadDocument from './UploadDocument';


class PatientList extends React.Component {
    constructor() {
        super()
        this.state = {
            patients : [],
            modalOff : true,
            selectedPatientID : '',
            uploadOff : true
        }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

        this.openUpload = this.openUpload.bind(this)
        this.closeUpload = this.closeUpload.bind(this)
    }

    componentWillMount() {
        new Patient().getPatients((objects) => {
            this.setState({patients : objects})
        })
    }

    openModal () {
        this.setState( {
            modalOff: false
        });
    }

    openUpload() {
        this.setState({
            uploadOff : false
        })
    }

    closeModal () {
        this.setState( {
            modalOff: true
        });
    }
    
    closeUpload() {
        this.setState({uploadOff : true})
    }


    render() {
        return (
            <div>
               <Grid container spacing = {20}>
                  {
                      this.state.patients.map((k,v) => {
                          return (
                              <Grid xs = {12} sm = {4}>
                                 <Card style = {{margin : '20px auto'}}>
                                     <CardMedia style = {{background : 'blue', textAlign : 'center', padding : '30px'}}>
                                         <img src = "assets/profile_pic.svg" width = "100px" height = "100px" />
                                     </CardMedia>
                                     <CardContent>
                                         <div style = {{margin : '20px auto'}}>
                                            <Typography variant = "h6">{k.name}</Typography>
                                            <p>{k.diseaseType}</p>
                                            <p>Bill Due : {k.billing}</p>
                                            <p>Bed ID : {k.bedID}</p>
                                            <p>Phone Number : {k.phone}</p>
                                         </div>
                                     </CardContent>
                                     <CardActions>
                                         <Button size = "small" color = "primary" onClick = {() => {
                                             console.log(k.patientID, k.roomID)
                                             new Patient().deletePatient(k.patientID, k.bedID)
                                         }}>DELETE</Button>
                                         <Button size = "small" color = "primary" onClick = {() => {
                                             this.setState({selectedPatientID : k.patientID})
                                             this.openModal()
                                         }}>VIEW RELATIVES</Button>
                                         <Button size = "small" color = "primary" onClick = {() => {
                                             this.setState({selectedPatientID : k.patientID})
                                             this.openUpload()
                                         }}>UPLOAD REPORT</Button>
                                     </CardActions>
                                 </Card>
                              </Grid>
                          )
                      })
                  }
               </Grid>
               <Modal open = {!this.state.modalOff} style = {{margin : '100px auto', width : '80%'}}>
                  <ViewRelative close = {this.closeModal} patientID = {this.state.selectedPatientID} />
               </Modal>
               <Modal open = {!this.state.uploadOff} style = {{margin : '100px auto', width : '80%'}}>
                  <UploadDocument close = {this.closeUpload} patientID = {this.state.selectedPatientID} />
               </Modal>
            </div>
        )
    }
}


class PatientView extends React.Component {
    constructor() {
        super()
        this.state = {choice : 0}
        this.changeChoice = this.changeChoice.bind(this)
    }

    changeChoice(choiceNumber) {
        this.setState({choice : choiceNumber})
    }

    render() {
        if(this.state.choice == 0) {
            return (
                <div>
                <div style = {{margin : '30px auto', width : '80%'}}> 
                    <div>
                        <Button variant = "contained" color = "secondary" onClick = {() => this.setState({choice  : 2})}>Add Patient</Button>
                        <Button style = {{marginLeft : '200px'}} variant = "contained" color = "secondary" onClick = {() => {
                            this.setState({choice : 3})
                        }}>Add Relative</Button>
                    </div>
                    <div style = {{margin : '30px'}}>
                       <PatientList />
                    </div>
                </div>
            </div>
            )
        }
        if(this.state.choice == 2) {
            return (<AddPatient handler = {this.changeChoice}/>)
        }

        if(this.state.choice == 3) {
            return (<AddRelative handler = {this.changeChoice} />)
        }
    }
}

export default PatientView