import React from 'react'
import ReactDOM from 'react-dom'
import {Card, Grid, Typography, Button} from '@material-ui/core'
import ReactJWPlayer from 'react-jw-player';
import User from '../../scripts/User'

/*<ReactJWPlayer
playerId='my-unique-id'
playerScript='http://jwpsrv.com/library/4+R8PsscEeO69iIACooLPQ.js'
file ='http://192.168.0.114:10000/live/demo_st_low/index.m3u8'
/>*/

class VideoScreenStreaming extends React.Component {
    constructor(props){
        super()
        this.state = {
            time : 0
        }
        this.updateTime = this.updateTime.bind(this)
    }

    updateTime() {
        this.setState({time : this.state.time + 1})
    }

    componentDidMount() {
        setInterval(this.updateTime, 1000)
    }

    render() {
        return (
            <div style = {{margin : '30px auto', padding : '20px', textAlign : 'center'}}>
                <Card style = {{margin : '20px auto', width : '80%', padding : '20px'}}>
                   <Grid container spacing = {12}>
                      <Grid xs = {12} sm = {6}>
                      <div>
                        <img src = {this.props.streamingData.cameraRoute} width = "400px" height = "auto" />
                      </div>
                      </Grid>
                      <Grid xs = {12} sm = {6}>
                         <div style = {{padding : '50px auto'}}>
                             <Typography variant = "h5">Streaming in progress</Typography>
                             <p>Streaming Time : {this.state.time} seconds</p>
                             <div style = {{margin : '20px auto'}}>
                                <Button variant = "contained" color = "secondary" onClick = {() => {
                                    new User().updatePayment(this.props.userData.patientID, this.state.time, (result) => {
                                        alert(result.Message) 
                                    })
                                    this.props.handler(0)
                                }}>End Stream</Button>
                             </div>
                         </div>
                      </Grid>
                   </Grid>
                </Card>
            </div>
        )
    }
}

export default VideoScreenStreaming