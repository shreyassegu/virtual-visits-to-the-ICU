import React from 'react'
import ReactDOM from 'react-dom'
import Patient from '../../scripts/patient'
import { Card, Typography, TextField, Button } from '@material-ui/core';
import Relative from '../../scripts/relative'


class AddRelative extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name : '',
            email : '',
            patientID : '',
            patients : [],
            phone : '',
            message : ''
        }

        this.handler = this.props.handler
    }

    componentWillMount() {
        new Patient().getPatients((objects) => {
            this.setState({patients : objects})
            if(objects.length > 0) this.setState({patientID : objects[0].patientID})
        })
    }

    addRelative() {
        new Relative().addRelative(
            this.state.name, this.state.email, this.state.phone, this.state.patientID,  (message) => {
                console.log(message)
                this.setState({message : message})
            }
        )
    }

    render() {
        return (
            <div>
                <Card style = {{padding  : '30px', margin : '40px auto', width : '75%'}}>
                   <Typography variant = "h5">Add a new relative : </Typography>
                   <p>Fill in these details carefully, this detail will be used to identify the relative throughout the application.</p>
                   <div style = {{margin : '30px auto'}}>
                       <div>
                           <div>
                           <TextField variant = "outlined" margin = "normal" label = "Name" value = {this.state.name} onChange = {(e) => this.setState({name : e.target.value})}/>
                           </div>
                           <div>
                           <TextField variant = "outlined" margin = "normal" label = "Email" value = {this.state.email} onChange = {(e) => this.setState({email : e.target.value})}/>
                           </div>
                           <div>
                           <TextField variant = "outlined" margin = "normal" label = "Phone" value = {this.state.phone} onChange = {(e) => this.setState({phone : e.target.value})}/>
                           </div>
                           <div>
                           <select onChange = {(e) => this.setState({patientID : e.target.value})}>
                             {
                                 this.state.patients.map((k,v) => {
                                     return (
                                        <option value = {k.patientID}>{k.name}</option>
                                     )
                                 })
                             }
                           </select>
                           </div>
                       </div>
                   </div>
                   <div style = {{margin : '20px auto'}}>
                      <Button variant = "contained" color = "secondary" onClick = {() => {
                          this.handler(0)
                      }}>Back</Button>
                      <Button variant = "contained" color = "secondary" style = {{marginLeft : '200px'}}
                         onClick = {() => this.addRelative()}
                      >Add</Button>
                   </div>
                   <div style = {{margin : '20px auto'}}>
                       <p>{this.state.message}</p>
                   </div>
                </Card>

            </div>
        )
    }
}

export default AddRelative