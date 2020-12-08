import React from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { Autocomplete } from "@material-ui/lab";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

//Imports for History Table
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { auth, firestore } from "../firebase";
import { Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom";

//Import for tabs
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";

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

//used this function for setting the values in the system.
function OrderHistory(
  orderId,
  byproductType,
  weight,
  date,
  time,
  pricePerKg,
  totalPayable
) {
  return {
    orderId,
    byproductType,
    weight,
    date,
    time,
    pricePerKg,
    totalPayable,
  };
}

// this function is used for designing tab panel.
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

// class is containing tje state values in system and added some default values.
class Buy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      byproduct: "",
      weight: 1,
      rate: 1,
      company: "",
      email: "",
      tableData: [],
      sellData: [],
      value: 0,
    };
  }

  // it sets the email values and store the data in buy and sell collection of when ever triggered.
  componentDidMount() {
    this.setState({
      email: localStorage.getItem("email"),
    });
    const db = firestore;
    let tableData = [];
    db.collection("buy")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          tableData.push(doc.data());
        });
      })
      .then(() => {
        this.setState({
          tableData: tableData,
        });
      });
    let sellData = [];
    db.collection("sell")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          sellData.push(doc.data());
        });
      })
      .then(() => {
        this.setState({
          sellData: sellData,
        });
      });
  }

  // renderRedirect = () => {
  //   if (this.state.redirect) {
  //     return <Redirect to='/buysell' />
  //   }
  // }

  // adding values in firebase buy collection and some are default.
  handleRequestSubmit = async (e) => {
    const db = firestore;
    e.preventDefault();
    var date = Date.now();
    var date = new Date(date);
    const userRef = await db.collection("buy").add({
      company: this.state.company,
      status: "Pending",
      type: this.state.byproduct,
      weight: this.state.weight,
      time: date.toLocaleString(),
      timeInMilli: Date.now(),
    });
    console.log(userRef);
    window.location.reload();
    // this.renderRedirect()
  };

  // adding values in firabase sell collection and some are default.
  handlesellerSubmit = async (e) => {
    const db = firestore;
    e.preventDefault();
    var date = Date.now();
    var date = new Date(date);
    const userRef = await db.collection("sell").add({
      rate: this.state.rate,
      status: "Pending",
      type: this.state.byproduct,
      weight: this.state.weight,
      time: date.toLocaleString(),
      timeInMilli: Date.now(),
    });
    console.log(userRef);
    window.location.reload();
    // this.renderRedirect()
  };

  handleLogoutSubmit = (e) => {
    localStorage.setItem("loggedIn", false);
    this.props.history.push("/login");
  };

  handlePayment = (e) => {
    this.props.history.push("/payment");
  };

  handleByProductChange = (e) => {
    this.setState({
      byproduct: e.target.firstChild.data,
    });
  };

  handleRateChange = (e) => {
    this.setState({
      rate: e.target.value,
    });
  };

  handleWeightChange = (e) => {
    this.setState({
      weight: e.target.value,
    });
  };

  handleCompanyChange = (e) => {
    this.setState({
      company: e.target.firstChild.data,
    });
  };

  rows = [
    OrderHistory(1, "Type 1", 15, "7 July 2020", "09:16:00", 6, 90),
    OrderHistory(2, "Type 2", 17, "12 July 2020", "10:22:00", 10, 170),
    OrderHistory(3, "Type 1", 14, "1 August 2020", "09:23:00", 5, 70),
    OrderHistory(4, "Type 4", 10, "30 August 2020", "09:16:00", 6, 60),
    OrderHistory(5, "Type 2", 20, "22 September 2020", "09:16:00", 6, 120),
  ];

  render() {
    console.log(this.state);
    const byproductTypes = [
      { type: "Type 1" },
      { type: "Type 2" },
      { type: "Type 3" },
      { type: "Type 4" },
    ];
    const manufacturers = [
      { companyName: "Company A", pricePerKg: 10 },
      { companyName: "Company B", pricePerKg: 5 },
      { companyName: "Company C", pricePerKg: 6 },
      { companyName: "Company D", pricePerKg: 6 },
    ];
    return (
      <Container component="main" maxWidth="lg">
        <Button
          variant="contained"
          color="secondary"
          onClick={this.handleLogoutSubmit}
          style={{
            float: "right",
          }}
        >
          LogOut
        </Button>

        <Button
          variant="contained"
          color="secondary"
          onClick={this.handlePayment}
          style={{
            float: "right",
            marginRight: "5px",
          }}
        >
          Make Payment
        </Button>

        <AppBar position="static">
          <Tabs
            value={this.state.value}
            onChange={(event, newValue) => this.setState({ value: newValue })}
            aria-label="simple tabs example"
          >
            <Tab label="Buy" />
            <Tab label="Sell" />
          </Tabs>
        </AppBar>
        <TabPanel value={this.state.value} index={0}>
          <div style={styles.paper}>
            <Typography component="h1" variant="h5">
              Buy Your Raw Material
            </Typography>
            <form className={styles.form} noValidate>
              <Autocomplete
                id="combo-box-demo"
                options={byproductTypes}
                getOptionLabel={(option) => option.type}
                style={{ width: 300, marginTop: 16 }}
                onChange={this.handleByProductChange}
                inputValue={this.state.byproduct}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Byproduct Type"
                    variant="outlined"
                  />
                )}
              />
              <TextField
                id="outlined-basic"
                type="number"
                InputProps={{
                  inputProps: {
                    min: 0,
                  },
                  endAdornment: (
                    <InputAdornment position="end">Kg</InputAdornment>
                  ),
                }}
                label="Weight"
                style={{ width: 300, marginTop: 16 }}
                variant="outlined"
                onChange={this.handleWeightChange}
                value={this.state.weight}
              />

              <Autocomplete
                id="combo-box-demo"
                options={manufacturers}
                getOptionLabel={(option) =>
                  option.companyName +
                  "     -     $" +
                  option.pricePerKg +
                  " Per Kg"
                }
                onChange={this.handleCompanyChange}
                inputValue={this.state.company}
                style={{ width: 300, marginTop: 16 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Company"
                    variant="outlined"
                  />
                )}
              />

              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ marginTop: 16 }}
                onClick={this.handleRequestSubmit}
              >
                Submit Request
              </Button>
            </form>
          </div>

          <TableContainer
            component={Paper}
            style={{ marginTop: 24, width: 1024 }}
          >
            <Table className={styles.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {/* <TableCell align="right">Order ID</TableCell> */}
                  <TableCell align="right">Byproduct Type</TableCell>
                  <TableCell align="right">Weight&nbsp;(Kg)</TableCell>
                  <TableCell align="right">Company</TableCell>
                  {/* <TableCell align="right">Total Payable</TableCell> */}
                  <TableCell align="right">Date</TableCell>
                  <TableCell align="right">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.tableData.map((row) => (
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
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
        <TabPanel value={this.state.value} index={1}>
          <div style={styles.paper}>
            <Typography component="h1" variant="h5">
              Sell Your Byproducts
            </Typography>
            <form className={styles.form} noValidate>
              <Autocomplete
                id="combo-box-demo"
                options={byproductTypes}
                getOptionLabel={(option) => option.type}
                style={{ width: 300, marginTop: 16 }}
                onChange={this.handleByProductChange}
                inputValue={this.state.byproduct}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Byproduct Type"
                    variant="outlined"
                  />
                )}
              />
              <TextField
                id="outlined-basic"
                type="number"
                InputProps={{
                  inputProps: {
                    min: 0,
                  },
                  endAdornment: (
                    <InputAdornment position="end">Kg</InputAdornment>
                  ),
                }}
                label="Weight"
                style={{ width: 300, marginTop: 16 }}
                variant="outlined"
                onChange={this.handleWeightChange}
                value={this.state.weight}
              />
              <br></br>
              <TextField
                id="outlined-basic"
                type="number"
                InputProps={{
                  inputProps: {
                    min: 0,
                  },
                  endAdornment: (
                    <InputAdornment position="end">CAD per Kg</InputAdornment>
                  ),
                }}
                label="Rate"
                style={{ width: 300, marginTop: 16 }}
                variant="outlined"
                onChange={this.handleRateChange}
                value={this.state.rate}
              />
              <br></br>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ marginTop: 16 }}
                onClick={this.handlesellerSubmit}
              >
                Submit Request
              </Button>
            </form>
          </div>

          <TableContainer
            component={Paper}
            style={{ marginTop: 24, width: 1024 }}
          >
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
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.sellData.map((row) => (
                  <TableRow>
                    {/* <TableCell component="th" scope="row"> */}
                    {/* </TableCell> */}
                    <TableCell align="right">{row.type}</TableCell>
                    <TableCell align="right">{row.weight}</TableCell>
                    <TableCell align="right">{row.rate}</TableCell>
                    {/* <TableCell align="right">{row.pricePerKg}</TableCell> */}
                    {/* <TableCell align="right">{row.totalPayable}</TableCell> */}
                    <TableCell align="right">{row.time}</TableCell>
                    <TableCell align="right">{row.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
      </Container>
    );
  }
}

export default withRouter(Buy);
