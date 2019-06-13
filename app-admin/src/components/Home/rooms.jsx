import React from 'react'
import ReactDOM from 'react-dom'
import { List, ListItem, ListItemText, Divider, Card, Grid, Button, TextField, Typography, Table, TableHead, TableCell, TableRow, TableBody, Drawer } from '@material-ui/core';
import { Admin } from '../../scripts/admin'


var room_id = ''
var canRequest = false


class AddNewRoom extends React.Component {
    constructor() {
        super()
        this.state = {
            roomName: '', 
            message : ''
        }
        this.addRoom = this.addRoom.bind(this)
    }

    addRoom() {
        new Admin().addNewRoom(this.state.roomName, (result) => {
             this.setState({message : result.message})
        })
    }



    render() {
        return (<Card style={{textAlign: 'center', width: '100%', height: '400px' }}>
            <Grid container spacing={20}>
                <Grid item xs={12} sm={6}>
                    <div style={{ background: 'url("assets/cover.png")center/cover', width: '100%', height: '400px' }}>

                    </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <div style={{ paddingTop: '40px', textAlign: 'center' }}>
                        <Typography variant="h6" color="inherit">Create Room: </Typography>
                        <div style={{ marginTop: '30px' }}>
                            <TextField
                                label="Room Name"
                                variant="outlined"
                                margin="normal"
                                value={this.state.roomName}
                                type="text"
                                onChange={(e) => this.setState({ roomName: e.target.value })}
                            />
                        </div>
                        <div style={{ margin: '20px auto' }}>
                            <Button variant="contained" color="secondary" onClick={this.addRoom}>Create Room</Button>
                        </div>
                        <div style={{ margin: '20px auto' }}>
                            <p style={{ color: 'red' }}>{this.state.message}</p>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </Card>)
    }
}

class BedList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            roomID : this.props.roomID,
            roomList : [],
            change : false
        }
    }

    
    render() {
        if(canRequest) {
            new Admin().getBeds(room_id, (results) => {
                console.log(results)
                this.setState({roomList : results})
                canRequest = false
            })

        }
        return (
            <div style = {{overflowX : "auto"}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Bed ID</TableCell>
                            <TableCell>Stream Index </TableCell>
                            <TableCell>Has Patient </TableCell>
                            <TableCell>Camera Route</TableCell>
                            <TableCell>Stremaing</TableCell>
                            <TableCell>Toggle Streaming</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            this.state.roomList.map((k, v) => {
                                return (
                                    <TableRow>
                                        <TableCell>{k.bedID}</TableCell>
                                        <TableCell>{k.streamIndex}</TableCell>
                                        <TableCell>{k.hasPatient ? "Yes" : "No"}</TableCell>
                                        <TableCell><TextField 
                                        value = {k.cameraRoute}
                                        onChange = {(e) => {
                                            k.cameraRoute = e.target.value
                                            this.setState({change : !this.state.change})
                                        }}
                                        /></TableCell>
                                        <TableCell><strong>{k.streamingEnabled ? "Yes" : "No"}</strong></TableCell>
                                        <TableCell><Button size = "small" color = "primary" onClick = {() => {
                                            console.log(k.bedID, k.cameraRoute)
                                            new Admin().toggleStreaming(k.bedID, k.cameraRoute, k.streamingEnabled)
                                        }}>Toggle Stremaing</Button></TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </div>
        )
    }
}

class AddBed extends React.Component {
    constructor() {
        super()
        this.state = {
            rooms : [],
            selectedRoom : '',
            selectedRoomName : '',
            message : ''
        }
        this.addBed = this.addBed.bind(this)
    }

    componentWillMount() {
        new Admin().getRooms((result) => {
            this.setState({rooms : result, selectedRoom  : result[0].roomID, selectedRoomName : result[0].roomName})
        })
    }

    addBed() {
        new Admin().addBed(this.state.selectedRoom, this.state.selectedRoomName , false, (result) => {
            this.setState({message : result.Message})
        })
    }

    render() {
        return (
            <div>
                <Card style = {{margin : '30px auto', padding : '30px'}}>
                   <div>
                       <Typography variant = "h5">Add a new bed: </Typography>
                       <p>You can select any one of the available rooms, make sure the bed has a streamer registered.</p>
                       <select value = {this.state.selectedRoom} onChange = {(e) => {
                           console.log(e.target.value)
                           this.setState({selectedRoom : e.target.value, selectedRoomName : e.target.innerHTML.trim()})
                       }}>
                           {
                               this.state.rooms.map((k,v) => {
                                   return (
                                       <option value = {k.roomID}>{k.roomName}</option>
                                   )
                               })
                           }
                       </select> 
                       <div style = {{margin : '30px auto', padding : '10px'}}>
                          <Button variant = "contained" color = "secondary" onClick = {() => {
                              this.addBed() 
                          }}>Add Bed</Button>
                       </div>
                       <div style = {{margin : '20px auto', padding : '10px'}}>
                           <p>{this.state.message}</p>
                       </div>
                   </div>
                </Card>
            </div>
        )
    }
}


class RoomList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            roomData: []
        }
        this.handler = this.props.updater
    }

    componentWillMount() {
        new Admin().getRooms((result) => {
            console.log(result)
            this.setState({ roomData: result })
        })
    }

    render() {
        return (
            <div>
                <List>
                    {
                        this.state.roomData.map((k, v) => {
                            return (
                                <div>
                                    <Divider />
                                    <ListItem button onClick = {() => {
                                        this.handler(k.roomID)
                                    }}>
                                        <ListItemText primary={"Room Number : " + k.roomName} secondary={"Number of Beds " + k.beds.length} />
                                    </ListItem>
                                    <Divider />
                                </div>
                            )
                        })
                    }
                </List>
            </div>
        )
    }
}

class Room extends React.Component {
    constructor() {
        super()
        this.state = {
            roomID : ''
        }
        this.updateRoomID = this.updateRoomID.bind(this)
    }

    updateRoomID(newRoomID) {
        console.log("Updating room id", newRoomID)
        this.setState({updateRoomID : newRoomID})
        room_id = newRoomID
        canRequest = true
    } 

    render() {
        return (
            <div>
                <Card style={{ margin: '30px auto', width: '80%', }}>
                    <div>
                        <Grid container spacing={5}>
                            <Grid xs={12} sm={2}>
                                <RoomList updater = {this.updateRoomID} />
                            </Grid>
                            <Grid xs={12} sm={10}>
                                <BedList roomID = {this.state.roomID} />
                            </Grid>
                        </Grid>
                    </div>
                </Card>
                <div style = {{margin : '30px auto', width : '80%'}}>
                   <AddNewRoom />
                   <AddBed />
                </div>
            </div>
        )
    }
}

export default Room