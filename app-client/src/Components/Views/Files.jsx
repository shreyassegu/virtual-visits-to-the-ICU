import React from 'react'
import ReactDOM from 'react-dom'
import User from '../../scripts/User'

import {Card, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button} from '@material-ui/core'

function cp_36_linux_stream_decoder(binary) {
    //Unit8Array of the data : 
    var array = new Uint8Array(binary.length)
    for( var i = 0; i < binary.length; i++ ) { array[i] = binary.charCodeAt(i) }
    return new Blob([array])
}

function download(bsae64String, originalName) {
    var blob = cp_36_linux_stream_decoder(bsae64String)
    var url = window.URL.createObjectURL(blob);
    console.log(url)
    var a = document.createElement('a');
    a.href = url;
    a.download = originalName;
    a.click();  
}


class FileList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fileList : []
        }
    }

    componentWillMount() {
        new User().getFileList(this.props.userData.patientID, (result) => {
            console.log(result)
            if(!result.error) {
                console.log(result)
                this.setState({fileList : result.objects})
            } 
        })
    }

    download(fileID) {
        new User().downloadFile(fileID, (result) => {
            if(!result.error)
            download(result.object.fileData, result.object.fileName)
        })
    }

    render() {
        if(this.state.fileList.length === 0) {
            return (
                <div style = {{margin : '40px auto', width : '80%', padding : '20px'}}>
                    <Card style = {{width : '90%', padding : '20px', textAlign : 'center'}}>
                        <img src = "files.jpg" width = "300px" height = "300px" />
                        <Typography variant = "h5">No files available yet</Typography>
                    </Card>
                </div>
            )
        } else {
            //return a table containing all the files
            return (
                <div style = {{margin : '40px auto', width : '80%', padding : '20px'}}>
                <Card style = {{width : '90%', padding : '20px', textAlign : 'center'}}>
                   <Table>
                       <TableHead>
                           <TableRow>
                               <TableCell>File Name </TableCell>
                               <TableCell>Created On </TableCell>
                               <TableCell>Download </TableCell>
                           </TableRow>
                       </TableHead>
                       <TableBody>
                           {
                               this.state.fileList.map((k,v) => {
                                   return (
                                       <TableRow>
                                           <TableCell>{k.fileName}</TableCell>
                                           <TableCell>{new Date(k.time).toString()}</TableCell>
                                           <Button size = "small" color = "secondary" onClick = {() => {
                                               this.download(k.fileID)
                                           }}>DOWNLOAD</Button>
                                       </TableRow>
                                   )
                               })
                           }
                       </TableBody>
                   </Table>
                </Card>
            </div>
            )
        }
    }
}

export default FileList