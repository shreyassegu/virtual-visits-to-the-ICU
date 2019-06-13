import React from 'react'
import ReactDOM from 'react-dom'
import Relative from '../../scripts/relative'
import { Table, TableHead, TableRow, TableCell, TableBody, Button, Card } from '@material-ui/core';

class ViewRelative extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            relatives : []
        }
    }

    componentWillMount() {
        new Relative().getRelatives(this.props.patientID, (objects) => {
            this.setState({relatives : objects})
        })
    }

    deleteRelative(relativeID) {
        new Relative().removeRelative(relativeID, (result) => {
            alert(result)
            this.componentWillMount()
        })
    } 

    render() {
        return (
            <div>
                <Card style = {{padding  : '30px'}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            this.state.relatives.map((k,v) => {
                                return (
                                    <TableRow>
                                        <TableCell>{k.name}</TableCell>
                                        <TableCell>{k.email}</TableCell>
                                        <TableCell>{k.phone}</TableCell>
                                        <TableCell>
                                            <Button size = "small" color = "primary" onClick = {() => {
                                                this.deleteRelative(k.relativeID)
                                            }}>DELETE</Button>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
                <div style = {{margin : '30px auto'}}>
                   <Button variant = "contained" color = "secondary" onClick = {()=>{
                       this.props.close()
                   }}>Close</Button>
                </div>
                </Card>
            </div>
        )
    }
}

export default ViewRelative