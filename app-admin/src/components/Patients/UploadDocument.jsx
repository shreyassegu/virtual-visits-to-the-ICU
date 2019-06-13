import React from 'react'
import ReactDOM from 'react-dom'
import {Card, Button} from '@material-ui/core'
import FileBase64 from 'react-file-base64';
import Patient from '../../scripts/patient'


class UploadDocument extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            patientID : this.props.patientID,
            message : '',
            fileName : '',
            fileData : ''
        }

        this.fileButtonClick = this.fileButtonClick.bind(this)
    } 

    fileButtonClick(files) {
        console.log(files)
        var fileName = files.name 
        var fileData = files.base64
        
        this.setState({fileName : fileName, fileData : fileData})
    }

    upload() {
        new Patient().uploadDocument(this.state.patientID, this.state.fileName, this.state.fileData, (result) => {
            this.setState({message : result.Message})
        })
    }

    render() {
        return(
            <div>
            <Card>
                <div style = {{margin : '50px auto'}}>
                  <FileBase64 
                     multiple = {false}
                     onDone = {this.fileButtonClick}
                  />
                  <div style = {{margin : '30px auto', padding : '20px'}}>
                     <Button variant = "contained" color = "secondary" onClick = {() => {
                         this.props.close()
                     }}>Back</Button>
                     <Button style = {{marginLeft : '60px'}} onClick = {() => {
                         this.upload()
                     }} variant = "contained" color = "secondary">Upload</Button>
                  </div>
                  <div style = {{padding : '20px'}}>
                     <p>{this.state.message}</p>
                  </div>
                </div>
            </Card>
           </div>
        )
    }
}

export default UploadDocument