import React from 'react'
import ReactDOM from 'react-dom'
import { Card, Typography, TextField, Button } from '@material-ui/core';
import Patient from '../../scripts/patient'

class AddPatient extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name : '',
            diseaseType : '',
            bedID : '',
            roomID : '',
            freeBeds : [],
            phoneNumber : '',
            message : ''
        }
        this.handler = this.props.handler
    }

    componentWillMount() {
        new Patient().getFreeRooms((objects) => {
            this.setState({freeBeds : objects})
            if(objects.length > 0) {
                this.setState({
                    bedID : objects[0].bedID,
                    roomID : objects[0].roomID
                })
            }
        })
    }

    addPatient() {
        new Patient().addPatient(
            this.state.name, 
            this.state.bedID,
            this.state.roomID,
            this.state.diseaseType,
            this.state.phoneNumber,
            (result) => {
                this.setState({message : result.Message})
            }
        )
    }

    render() {
        return (
            <div>
                <Card style = {{padding  : '30px', margin : '40px auto', width : '75%'}}>
                <Typography variant = "h5">Add a new patient : </Typography>
                <p>Fill in these details carefully, as these details will be used throughout the application to identify the patient</p>
                <div style = {{margin : '30px auto', padding : '20px'}}>
                <TextField
                        label="Name"
                        variant = "outlined"
                        margin = "normal"
                        value = {this.state.name}
                        type = "text"
                        onChange = {(e) => this.setState({name : e.target.value})}
                />
                <div style = {{marginTop : '20px'}}>
                <TextField
                        label="Phone Number"
                        variant = "outlined"
                        margin = "normal"
                        value = {this.state.phoneNumber}
                        type = "text"
                        onChange = {(e) => this.setState({phoneNumber : e.target.value})}
                />
                </div>
                <p>Description about patient : </p>
                <textarea
                        value = {this.state.diseaseType}
                        type = "text"
                        onChange = {(e) => this.setState({diseaseType : e.target.value})}
                />
                <div style = {{marginTop : '20px'}}>
                    <p>Bed allocated : </p>
                    <select value = {this.state.bedID} onChange = {(e) => {
                        var bedID = e.target.value.split(":")[0]
                        var roomID = e.target.value.split(":")[1]
                        this.setState({bedID : bedID, roomID : roomID})
                    }}>
                       {
                           this.state.freeBeds.map((k,v) => {
                               return (
                                //    <option value = {k.bedID + ":" + k.roomID} >{k.bedID + " Room : " + k.roomName}</option>
                                   <option value = {k.bedID + ":" + k.roomID} >{k.bedID}</option>

                               )
                           })
                       }
                    </select>
                </div>
                <div style = {{margin : '20px auto'}}>
                    <Button variant = "contained" onClick = {() => {
                        this.handler(0)
                    }}>Back</Button>
                    <Button variant = "contained" style = {{marginLeft : '100px'}} onClick = {() => {
                        this.addPatient()
                    }}>Add</Button>
                </div>
                <div style = {{margin : '20px'}}>
                  <p>{this.state.message}</p>
                </div>
                </div>
                </Card>
            </div>
        )
    }
}

export default AddPatient