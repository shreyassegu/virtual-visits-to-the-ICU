import React from 'react'
import ReactDOM from 'react-dom'
import { Grid , Card, Typography, List, ListItem, Avatar, ListItemText, Divider} from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image'
import WorkIcon from '@material-ui/icons/Work'
import BeachAccessIcon from '@material-ui/icons/BeachAccess'

import Patient from '../../scripts/patient'

class AdminInfo extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div style = {{textAlign : 'center'}}>
                <Card style = {{margin : "20px auto", padding : "20px", width : '60%'}}>
                   <div>
                       <Grid container spacing = {20}>
                          <Grid item xs = {12} sm = {6}>
                             <div style = {{textAlign : 'center', margin : '20px auto'}}>
                                <img src = "assets/profile_pic.svg" height = "200px" width = "200px" />
                             </div>
                          </Grid>
                          <Grid item xs = {12} sm = {6}>
                             <div style = {{textAlign : 'center', margin : '20px auto'}}>
                                <div style = {{textAlign : 'left'}}>
                                    <Typography variant = "h5">Admin Profile</Typography>
                                    <div style = {{textAlign : 'left', margin : '20px auto'}}>
                                       <List>
                                           <ListItem>
                                               <Avatar><ImageIcon/></Avatar>
                                               <ListItemText primary = {this.props.admin.username} secondary = "Username" />
                                           </ListItem>
                                           <Divider />
                                           <ListItem>
                                               <Avatar><WorkIcon/></Avatar>
                                               <ListItemText primary = {this.props.admin.email} secondary = "Email" />
                                           </ListItem>
                                           <Divider />
                                           <ListItem>
                                               <Avatar><BeachAccessIcon/></Avatar>
                                               <ListItemText primary = "Admin" secondary = "Designation" />
                                           </ListItem>
                                           <Divider />
                                       </List>
                                    </div>
                                </div>
                             </div>
                          </Grid>
                       </Grid>
                   </div>
                </Card>
            </div>
        )
    }
}


class Revenue extends React.Component {
    constructor() {
        super()
        this.state = {
            revenue : 0.0
        }        
    }

    componentWillMount() {
        new Patient().totalBill((result) => {
            if(!result.error) this.setState({revenue : result.totalBill})
        })
    }

    render() {
        return (
            <div style = {{width : '90%%' , textAlign : 'center', margin : '10px auto'}}>
                <Card style = {{padding : '30px', height : '200px'}}>
                   <div style = {{textAlign : 'center'}}>
                      <Typography >Revenue as of <strong>{new Date().getDate() + "/" + new Date().getMonth() + "/" + new Date().getFullYear()}</strong> is:</Typography>
                      <Typography variant = "h1">{this.state.revenue} $</Typography>
                      <Typography >Revenue will be updated in real-time</Typography>
                   </div>
                </Card>
            </div>
        )
    }
}

class PatientInfo extends React.Component {
    constructor() {
        super()
        this.state = {
            revenue : 0.0
        }        
    }

    render() {
        return (
            <div style = {{width : '90%' , textAlign : 'center', margin : '10px'}}>
                <Card style = {{padding : '30px',  height : '200px'}}>
                   <div style = {{textAlign : 'center'}}>
                      <Typography >Number of Patients undergoing treamtment :</Typography>
                      <Typography variant = "h1">30</Typography>
                   </div>
                </Card>
            </div>
        )
    }
}

class RoomInfo extends React.Component {
    constructor() {
        super()
        this.state = {
            revenue : 0.0
        }        
    }

    render() {
        return (
            <div style = {{width : '90%' , textAlign : 'center', margin : '10px'}}>
                <Card style = {{padding : '30px',  height : '200px'}}>
                   <div style = {{textAlign : 'center'}}>
                      <Typography >Number of Rooms currently empty :</Typography>
                      <Typography variant = "h1">30</Typography>
                   </div>
                </Card>
            </div>
        )
    }
}

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.prop = props.prop
    }

    render() {
       return (
        <div>
            <AdminInfo admin = {this.props.prop} />
            <div style = {{margin : '30px auto', width : '70%'}}>
               <Grid container >
                   <Grid xs = {12} sm = {4} style = {{textAlign : 'center'}}>
                      <Revenue />
                   </Grid>
                   <Grid xs = {12} sm = {4} style = {{textAlign : 'center'}}>
                      <PatientInfo />
                   </Grid>
                   <Grid xs = {12} sm = {4} style = {{textAlign : 'center'}}>
                      <RoomInfo />
                   </Grid>
               </Grid>
            </div>
        </div>
       )
    }
}

export default Home