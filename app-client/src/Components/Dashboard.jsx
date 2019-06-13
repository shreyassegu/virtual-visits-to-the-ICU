import React from 'react'
import ReactDOM from 'react-dom'
import VideoDemo from './VideoDemo'
import { Typography, AppBar, Toolbar, Button, List, Drawer, ListItemIcon, ListItem, ListItemText, Divider, Icon } from '@material-ui/core'
import Home from './Views/Home';
import FileList from './Views/Files';
import StreamingCheck from './Views/OTP';
import Conference from './Views/Conference';

class AppBarExtended extends React.Component {
    render() {
        return (
            <AppBar position="static" style={{ position: 'fixed', top: 0, zIndex: 100000 }}>
                <Toolbar>
                    <Typography variant="h5" color="inherit">Double-Helix</Typography>
                    <Button color="inherit" onClick={this.logoutadmin} style={{ alignItems: 'right' }}>Logout</Button>
                </Toolbar>
            </AppBar>
        )
    }
}

class SidePanel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <Drawer variant="permanent">
                <div style={{ width: '300px', background: '#fff' }}>
                    <List style={{ paddingTop: '70px' }}>
                        <ListItem button onClick={() => {
                            this.props.handler(0)
                        }}>
                            <ListItemIcon><Icon>more</Icon></ListItemIcon>
                            <ListItemText primary="Home" secondary="Dashboard" />
                        </ListItem>
                        <Divider />
                        <ListItem button onClick={() => {
                            this.props.handler(1)
                        }}>
                            <ListItemIcon><Icon>insert_chart_outline</Icon></ListItemIcon>
                            <ListItemText primary="Streaming" secondary= "Watch the stream from hospital" />
                        </ListItem>
                        <Divider />
                        <ListItem button onClick={() => {
                            this.props.handler(2)
                        }}>
                            <ListItemIcon><Icon>public</Icon></ListItemIcon>
                            <ListItemText primary="Files and Reports" secondary="Manage all the reports and prescriptions of the patient" />
                        </ListItem>
                        <Divider />
                        <ListItem button onClick={() => {
                            this.props.handler(3)
                        }}>
                            <ListItemIcon><Icon>sentiment_satisfied</Icon></ListItemIcon>
                            <ListItemText primary="Conference" secondary="Schedule the conference call to the doctor" />
                        </ListItem>
                    </List>
                </div>
            </Drawer>
        )
    }
}

class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {choice : Home}
        this.handler = this.handler.bind(this)
        this.userData = this.props.result
    }   

    handler(choice_number) {
        switch(choice_number) {
            case 0 : this.setState({choice : Home}); break;
            case 1 : this.setState({choice : StreamingCheck}); break
            case 2 : this.setState({choice : FileList}); break;
            case 3 : this.setState({choice : Conference})
            default : console.log("Invalid choice"); break;
        }
    }

    render() {
        return (
            <div>
                <AppBarExtended />
            <div>
                <SidePanel handler = {this.handler} />
            </div>
            <div style = {{marginTop : '75px', marginLeft : '210px', width : '95%', textAlign : 'left'}}>
              {console.log(this.userData)}
               <this.state.choice userData = {this.userData} choiceHandler = {this.handler} />
            </div>
            </div>
        )
    }
}

export default Dashboard