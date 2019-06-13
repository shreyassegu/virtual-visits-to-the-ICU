import React from 'react'
import ReactDOM from 'react-dom'
import { Drawer, AppBar, Toolbar, Typography, Button, List, ListItem, ListItemIcon, Divider, ListItemText, Icon} from '@material-ui/core';
import { logout } from '../scripts/admin'
import Login from './Login';
import Home from './Home/home'
import Room from './Home/rooms';
import PatientView from './Patients/Patient';

class NavBarExtended extends React.Component {
    constructor(props) {
        super(props)
        this.mtd = this.props.data
    }

    logoutadmin() {
        logout()
        ReactDOM.render(<Login />, document.getElementById('root'))
    }

    render() {
        return (
            <AppBar position="static" style={{position : 'fixed', top : 0, zIndex: 100000}}>
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
        this.handler = this.props.handler
    }

    render() {
        return (
            <Drawer variant="permanent">
                <div style={{ width: '300px', background: '#fff' }}>
                    <List style = {{paddingTop : '70px'}}>
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
                            <ListItemText primary="Rooms" secondary="Room and bed information" />
                        </ListItem>
                        <Divider />
                        {/* <ListItem button onClick={() => {
                            this.props.handler(2)
                        }}>
                            <ListItemIcon><Icon>public</Icon></ListItemIcon>
                            <ListItemText primary="Schedule" secondary="Create schedules for live streaming" />
                        </ListItem> */}
                        <Divider />
                        <ListItem button onClick={() => {
                            this.props.handler(3)
                        }}>
                            <ListItemIcon><Icon>sentiment_satisfied</Icon></ListItemIcon>
                            <ListItemText primary="Patients and Relatives" secondary="Add patient and relatives" />
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
        this.state = {
            admin: this.props.admin,
            menuChoice: Home
        }
        this.handleChoice = this.handleChoice.bind(this)
        console.log(this.props.admin)
    }

    handleChoice(choice) {
       switch(choice) {
           case 0 : this.setState({menuChoice : Home}); break
           case 1 : this.setState({menuChoice : Room}); break
           case 3 : this.setState({menuChoice : PatientView}); break;
           default : break;
       }
    }

    render() {
        return (
            <div>
            <div>
                <NavBarExtended data={this.state.admin} />
                <div>
                    <SidePanel handler={this.handleChoice} />
                </div>
            </div>
           <main>
           <div style = {{marginTop : '75px', marginLeft : '210px', width : '95%', textAlign : 'left'}}>
                   <this.state.menuChoice prop = {this.state.admin} />
            </div>
           </main>
            </div>

        )
    }
}

export default Dashboard