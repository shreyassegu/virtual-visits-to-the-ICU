import React from 'react'
import ReactDOM from 'react-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from "@material-ui/core/Typography"
import { Card, Grid, TextField, Button } from '@material-ui/core';

import {Admin, addToLocalStorage, checkLogin} from '../scripts/admin'
import Dashboard from './Dashboard';

class AppBarMain extends React.Component {
    render() {
        return (
            <AppBar position = "static">
              <Toolbar variant = "dense">
              <Typography variant="h6" color="inherit">
                    Double Helix
              </Typography>
              </Toolbar>
            </AppBar>
        )
    }
}

class LoginScreen extends React.Component {
    constructor() {
        super()
        this.state = {
            email : '', password : '', message : ''
        }

        this.login = this.login.bind(this)
    }

    login() {
        new Admin().login(this.state.email, this.state.password, (result) => {
            if(result.error) this.setState({message : result.message})
            else {
                addToLocalStorage(result.result)
            ReactDOM.render(<Dashboard admin = {result.result}/>, document.getElementById('root'))
            }
        })
    }

    render() {
        return (
            <Card style = {{margin : '80px auto', textAlign : 'center', width : '60%', height : '400px'}}>
               <Grid container spacing = {20}>
                  <Grid item xs = {12} sm = {6}>
                     <div style = {{background : 'url("assets/cover.png")center/cover', width : '100%', height : '400px'}}>
                       
                     </div>
                  </Grid>
                  <Grid item xs = {12} sm = {6}>
                     <div style = {{paddingTop : '40px', textAlign : 'center'}}>
                        <Typography variant = "h6" color = "inherit">Login</Typography>
                        <div style = {{marginTop : '30px'}}>
                           <TextField
                              label="Email"
                              variant = "outlined"
                              margin = "normal"
                              value = {this.state.email}
                              type = "text"
                              onChange = {(e) => this.setState({email : e.target.value})}
                           />
                           <TextField
                              label="Password"
                              variant = "outlined"
                              margin = "normal"
                              value = {this.state.password}
                              type = "password"
                              onChange = {(e) => this.setState({password : e.target.value})}
                           />
                        </div>
                        <div style = {{margin : '20px auto'}}>
                        <Button variant = "contained" color = "secondary" onClick = {this.login}>Login</Button>
                        </div>
                        <div style = {{margin : '20px auto'}}>
                           <p style = {{color : 'red'}}>{this.state.message}</p>
                        </div>
                     </div>
                  </Grid>
               </Grid>
            </Card>
        )
    }
}

class Login extends React.Component{
    render() {
        return (
            <div>
                <AppBarMain />
                <LoginScreen />
            </div>
        )
    }
}

export default Login