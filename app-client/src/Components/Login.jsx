import React from 'react'
import ReactDOM from 'react-dom'
import {Card, TextField, Button, AppBar, Toolbar, Typography} from '@material-ui/core'
import User from '../scripts/User'
import LoadScreen from './LoadScreen';


class AppBarNormal extends React.Component {
    render() {
        return (
            <AppBar position = "static">
               <Toolbar variant = "dense">
                  <Typography variant = "h5" color = "inherit"> Double Helix </Typography>
               </Toolbar>
            </AppBar>
        )
    }
}

class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            email : "",
            password : "",
            message : ""
        }
    }
    

    login() {
        new User().auth(this.state.email, this.state.password , (result) =>{
            console.log(result)
            if(result.error) {
                this.setState({message : result.message})
            } else {
                //TODO: RENDER NEXT COMPONENT HERE
                console.log(result.result)
                ReactDOM.render(<LoadScreen result = {result.result} />, document.getElementById('root'))
            }
        })
    }

    render() {
        return (
            <div style = {{margin : '150px auto', textAlign : 'center' ,width : '60%'}}>
               <Card>
                   <div style = {{padding : '40px'}}>
                     <div style = {{margin : '20px auto'}}>
                     <TextField variant = "outlined" margin = "normal" label = "Email : " value = {this.state.email} onChange = {(e) => {
                          this.setState({email : e.target.value})
                      }}/>
                     </div>
                     <div>
                     <TextField variant = "outlined" margin = "normal" label = "Password" value = {this.state.password} onChange = {(e) => {
                          this.setState({password : e.target.value})
                      }}/>
                     </div>
                     <div style = {{margin : '20px auto'}}>
                        <Button variant = "contained" color = "secondary" onClick = {()=>{
                            this.login()
                        }}>Login</Button>
                     </div>
                     <div style = {{margin : '20px'}}>{this.state.message}</div>
                   </div>
               </Card>
            </div>
        )
    }
}

class HomeScreen extends React.Component {
    render() {
        return (
            <div>
                <AppBarNormal />
                <div>
                    <Login />
                </div>
            </div>
        )
    }
}

export default HomeScreen