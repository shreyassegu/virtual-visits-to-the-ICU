import React from 'react'
import ReactDOM from 'react-dom'
import {Card, TextField, Button, Grid, Typography} from '@material-ui/core'

import User from '../../scripts/User'
import {VideoAPI, VideoConnector, generate_roomid} from '../../scripts/Video'
import ConferenceSceeen from './Conference2';
 
class ConferenceJoin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            conID : '',
            userData : this.props.userData,
            message : ''
        }
    }

    joinStreaming(relativeID) {
        new VideoAPI().join(this.state.conID.trim(), relativeID, (result) => {
            if(result.access) 
              this.props.handler({
                  roomID : this.state.conID.trim(),
                  relativeID : relativeID
              })
            else this.setState({message : "Room does not exisit or you don't have access"})
        })
    }

    render() {
        return (
            <div style = {{margin : '40px auto', width : '80%', padding : '20px', textAlign  : 'center'}}>
                <Card style = {{width : '90%', padding : '20px', textAlign : 'center'}}>
                    <TextField variant = "outlined" margin = "normal" value = {this.state.conID}
                      onChange = {(e) => this.setState({conID : e.target.value})}
                     />
                     <div style = {{margin : '20px auto' , padding : "20px"}}>
                     <Button variant = "contained" color = "secondary" onClick = {() => {
                         this.joinStreaming(this.props.userData.relativeID)
                     }}>Join</Button>
                     </div> 
                     <div style = {{margin : '20px auto'}}>
                        <p>{this.state.message}</p>
                     </div>
                </Card>
            </div>
        )
    }
}

class CreateCall extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    } 

    getRelatives() {
        var patientID = this.props.userData.patientID

        new User().getRelativeIds(patientID, (result) => {
            if(!result.error) {
                //create a conference call : 
                var relativeIDs = []

                for(var i = 0; i < result.objects.length; i++){ 
                     relativeIDs.push(result.objects[i].relativeID)
                }
                var roomID = generate_roomid()

                new VideoAPI().createSession(
                    roomID,
                    relativeIDs, 
                    this.props.userData.relativeID, 
                    null, 
                    this.props.userData.patientID,
                    (result) => {
                        this.props.handler({
                            roomID : roomID,
                            relativeIDs : relativeIDs,
                            result : result
                        })
                    }
                )

            } else {
                console.log("Error getting relative ids")
            }
        })

    }

    render() {
        return (
            <div style  = {{margin : '30px auto', textAlign : 'center', width : '80%'}}>
               <Card style = {{padding : '20px', textAlign : 'center'}}>
                  <Grid  container spacing = {10}>
                    <Grid xs = {12} sm = {6}>
                       <div style = {{textAlign : 'justify', marginTop : '50px'}}>
                          <Typography variant = "h5">Create Conference Call</Typography>
                          <p>The conference call you create will be made available to all the relatives,
                              you can optionally add a doctor, if doctor is added, the call will be made availabe to him.
                          </p>
                       </div>
                    </Grid>
                    <Grid xs = {12} sm = {6}>
                    <div style = {{margin : '10px auto'}}>
                    <img src = "make.png" width = "400px" height = "400px" />
                  </div>
                  <div style = {{margin : '20px auto'}}>
                     <Button onClick = {() => {
                         this.getRelatives()
                     }} variant = "contained" color = "primary">Create</Button>
                  </div>
                    </Grid>
                  </Grid>
               </Card>
            </div>
        )
    }
}

class Conference extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userData : this.props.userData,
            toggle : false,
            conferenceMetadata : null
        }

        this.handleToggle = this.handleToggle.bind(this)
    } 

    handleToggle(metadata) {
        this.setState({conferenceMetadata : metadata})
        this.setState({toggle : true})
    }

    render() {
        if(!this.state.toggle) {
            return (
                <div>
                    <ConferenceJoin userData = {this.props.userData} handler = {this.handleToggle}/>
                    <CreateCall  userData = {this.state.userData} handler = {this.handleToggle}/>
                </div>
            )
        } else {
            return (
                <ConferenceSceeen userData = {this.state.userData} metadata = {this.state.conferenceMetadata} />
            )
        }
    }
}

export default Conference



