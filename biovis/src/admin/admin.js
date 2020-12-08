import React, { Component } from 'react'
import { Nav } from 'react-bootstrap'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Button from "@material-ui/core/Button";

//Imports for History Table
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Container from "@material-ui/core/Container";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import {auth,firestore} from '../firebase';
import  { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router-dom';


//Import for tabs
import { makeStyles } from '@material-ui/core/styles';



//inline styles
const styles = {
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  icon: {
    margin: "auto",
    backgroundColor: "green",
  },
  input: {
    marginTop: "20px",
  },
  errorMessage: {
    color: "red",
  },
  table: {
    minWidth: 650,
  },
};

// function for Tab panel : Design and values of it.
function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

export class admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
          tableData: [],
          sellData: []
        };
      }
// adding value to state and inserting value to firebase collection buy and sell when ever is required.
      componentDidMount() {
        this.setState({
          email: localStorage.getItem("email"),
          value: 0
        })
        const db = firestore
        let tableData = []
        db.collection("buy").get().then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            console.log("Inside")
            tableData.push(doc.data())
          })
        }).then(() => {
          this.setState({
            tableData: tableData 
          })
    
        })

        let sellData =[]
    db.collection("sell").get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        sellData.push(doc.data())
      })
    }).then(() => {
      this.setState({
        sellData:sellData
      })

    })
    
      }

    handleChange = () => {

    }
// on logout send to home.
    handleLogoutSubmit = (e) => {
        this.props.history.push('/home')
                
      }
   
    reloadPage = () =>{
      window.location.reload();
    }
// updateding vaule for sell collection based on the parameter provided. for Approving sell.
    sellApproved = (e) =>{
      const db = firestore

     db.collection("sell").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            if(doc.data().timeInMilli == e){
              db.collection("sell").doc(doc.id).update({
                status: "Approved"
            });
             } 
            
        });
    });
    setTimeout(() => {this.reloadPage()},1000);
      
    }
// updateding vaule for sell collection based on the parameter provided. for rejecting sell.
    sellRejected = (e) =>{
      const db = firestore

     db.collection("sell").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            if(doc.data().timeInMilli == e){
              db.collection("sell").doc(doc.id).update({
                status: "Rejected"
            });
             } 
            
        });
    });
    setTimeout(() => {this.reloadPage()},1000);
      
    }
// updateding vaule for sell collection based on the parameter provided. for Approving buy.

    approved = (e) =>{
      const db = firestore

     db.collection("buy").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            if(doc.data().timeInMilli == e){
              db.collection("buy").doc(doc.id).update({
                status: "Approved"
            });
             } 
            
        });
    });
    setTimeout(() => {this.reloadPage()},1000);
      
    }
// updateding vaule for sell collection based on the parameter provided. for Rejecting buy.
    rejected = (e) =>{
      const db = firestore

     db.collection("buy").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            if(doc.data().timeInMilli == e){
              db.collection("buy").doc(doc.id).update({
                status: "Rejected"
            });
             } 
            
        });
    });
    setTimeout(() => {this.reloadPage()},1000);
      
    }
  
    render() {
        return (
            <Container component="main" maxWidth="lg">
            <Button variant="contained" color="secondary" onClick={this.handleLogoutSubmit} style={{
              float: "right"
            }}>
            LogOut
           </Button>
    
           <AppBar position="static">
      <Tabs value={this.state.value} onChange={(event,newValue)=>this.setState({value:newValue})} aria-label="simple tabs example">
        <Tab label="Buyers" />
        <Tab label="Sellers" />
      </Tabs>
    </AppBar>
    <TabPanel value={this.state.value} index={0}>
            <div>
                <TableContainer component={Paper} style={{ marginTop: 24, width: 1024 }}>
          <Table className={styles.table} aria-label="simple table" onRowSelection={this.selectrow}>
            <TableHead>
              <TableRow>
                {/* <TableCell align="right">Order ID</TableCell> */}
                <TableCell align="right">Byproduct Type</TableCell>
                <TableCell align="right">Weight&nbsp;(Kg)</TableCell>
                <TableCell align="right">Company</TableCell>
                {/* <TableCell align="right">Total Payable</TableCell> */}
                <TableCell align="right">Date</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.tableData.filter(item=>item.status === 'Pending').map((row,index) => (
                <TableRow>
                  {/* <TableCell component="th" scope="row"> */}
                  {/* </TableCell> */}
                  <TableCell align="right">{row.type}</TableCell>
                  <TableCell align="right">{row.weight}</TableCell>
                  <TableCell align="right">{row.company}</TableCell>
                  {/* <TableCell align="right">{row.pricePerKg}</TableCell> */}
                  {/* <TableCell align="right">{row.totalPayable}</TableCell> */}
                  <TableCell align="right">{row.time}</TableCell>
                  <TableCell align="right">{row.status}</TableCell>
                  <TableCell align="right" onClick={() => this.approved(row.timeInMilli)}><div>  
                  <Button variant="contained" style={{background:'green',marginRight:'0.5em'}}>
                  Approve
                  </Button>
                  </div></TableCell>
                  <TableCell align="right" onClick={() => this.rejected(row.timeInMilli)}><div>
                  <Button variant="contained" color="secondary" >
                  Reject
                 </Button></div></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
            </div>
            </TabPanel>
<TabPanel value={this.state.value} index={1}>
<div>
<TableContainer component={Paper} style={{ marginTop: 24, width: 1024 }}>
          <Table className={styles.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                {/* <TableCell align="right">Order ID</TableCell> */}
                <TableCell align="right">Byproduct Type</TableCell>
                <TableCell align="right">Weight&nbsp;(Kg)</TableCell>
                <TableCell align="right">Rate</TableCell>
                {/* <TableCell align="right">Total Payable</TableCell> */}
                <TableCell align="right">Date</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.sellData.filter(item=>item.status === 'Pending').map((row) => (
                <TableRow >
                  {/* <TableCell component="th" scope="row"> */}
                  {/* </TableCell> */}
                  <TableCell align="right">{row.type}</TableCell>
                  <TableCell align="right">{row.weight}</TableCell>
                  <TableCell align="right">{row.rate}</TableCell>
                  {/* <TableCell align="right">{row.pricePerKg}</TableCell> */}
                  {/* <TableCell align="right">{row.totalPayable}</TableCell> */}
                  <TableCell align="right">{row.time}</TableCell>
                  <TableCell align="right">{row.status}</TableCell>
                  <TableCell align="right" onClick={() => this.sellApproved(row.timeInMilli)}><div>  
                  <Button variant="contained" style={{background:'green',marginRight:'0.5em'}}>
                  Approve
                  </Button>
                  </div></TableCell>
                  <TableCell align="right" onClick={() => this.sellRejected(row.timeInMilli)}><div>
                  <Button variant="contained" color="secondary" >
                  Reject
                 </Button></div></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
            </div>
</TabPanel>

</Container>     
        )
    }
}

export default withRouter(admin);
