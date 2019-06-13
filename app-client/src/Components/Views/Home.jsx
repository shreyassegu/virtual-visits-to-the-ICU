import React from 'react'
import ReactDOM from 'react-dom'
import {Card, Grid, Typography, Button, CardActionArea, CardMedia, CardContent} from '@material-ui/core'

class Menu extends React.Component {
    constructor(props) {
        super(props)
        this.handler = this.props.choiceHandler
        this.data = [
            {image : 'stream.jpg', title : "Streaming Service", content : "Live stream from the hospital on your sceen", choice : 1},
            {image : 'reports.png', title : "Shared Documents", content : "All the patient documents on your app, use anywhere", choice : 2},
            {image : 'doctor_office.jpg', title : "Video Conference", content : "Talk to doctors and experts, on your app", choice : 3}
        ]
    }

    render() {
        return (
            <div style = {{width : '85%', marginLeft : '80px'}}>
                <Grid container spacing = {20}>
                    {
                        this.data.map((k,v) => {
                            return (
                                <Grid xs = {12} sm = {4}>
                                 <div style = {{textAlign : 'center'}}>
                                    <Card style = {{width : '75%', margin : '10px auto'}}>
                                        <CardActionArea>
                                            <CardMedia image = {k.image} style = {{width : '100%', height : '200px'}}></CardMedia>
                                            <CardContent>
                                                <Typography variant = "h5">{k.title}</Typography>
                                                <p>{k.content}</p>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                 </div>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </div>
        )
    }
}

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userData : this.props.userData
        }

        console.log(this.state.userData, this.props.userData)

        this.choiceHandler = this.props.choiceHandler
    }

    render() {
        return (
            <div>
            <div style = {{margin : '30px auto', textAlign : 'center'}}>
                <Menu choiceHandler = {this.props.choiceHandler} />
            </div>
            </div>
        )
    }

}

export default Home