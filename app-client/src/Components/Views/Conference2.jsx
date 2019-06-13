import React from 'react'
import ReactDOM from 'react-dom'

import {VideoConnector, generate_roomid} from '../../scripts/Video'

import {Card} from '@material-ui/core'

class ConferenceSceeen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.connector = new VideoConnector({
            room_video_render : this.renderVideoElement
        })

        this.connector.createStream(this.props.metadata.roomID)

        this.renderVideoElement = this.renderVideoElement.bind(this)
        
    }

    renderVideoElement(event) {
        var video = document.getElementById('video_root')
        var mediaElement = event.mediaElement
        mediaElement.style.width = "350px"
        mediaElement.style.height = "350px"
        video.appendChild(event.mediaElement)
    }

    render() {
        return (
            <div style =  {{margin : '30px auto', textAlgin : 'center'}}>
              <Card style = {{width : '80%', padding : '30px', margin : '20px auto'}}>
                <p>Room ID : {this.props.metadata.roomID}</p>
                <div id = "video_root">
                   
                </div>
              </Card>
            </div>
        )
    }

}

export default ConferenceSceeen