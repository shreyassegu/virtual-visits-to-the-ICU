import React from 'react'
import ReactDOM from 'react-dom'
import {AppBar, Toolbar, Typography} from '@material-ui/core'
import Dashboard from './Dashboard';


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

class LandingGIF extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            canShow : false
        }
    }

    componentWillMount() {
        setInterval(() => {
            console.log(this.props.result)
            this.setState({canShow : true})
        }, 3000)
    }

    render() {
        if(!this.state.canShow) {
            return (
               <div style = {{textAlign : 'center'}}>
                  <div style = {{margin : '20px auto', width : '80%', textAlign : 'center'}}>
                   <img src = "loading.gif" width = "600px" height = "600px"/>
                </div>
               </div>
            )
        }else {
            return(
                <div><Dashboard result = {this.props.result}/></div>
            )
        }
    }
}

class LoadScreen extends React.Component {
    constructor(props) {
        super(props)
        this.userInfo = this.props.result
        console.log(this.userInfo)
    }

    render() {
        return (
            <div>
                <AppBarNormal />
                <LandingGIF result = {this.userInfo}/>
            </div>
        );
    }
}

export default LoadScreen

