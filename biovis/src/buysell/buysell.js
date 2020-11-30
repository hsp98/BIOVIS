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

//inline styles
const styles = {
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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

class BuySell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  rows = [
    OrderHistory(1, "Type 1", 15, "7 July 2020", "09:16:00", 6, 90),
    OrderHistory(2, "Type 2", 17, "12 July 2020", "10:22:00", 10, 170),
    OrderHistory(3, "Type 1", 14, "1 August 2020", "09:23:00", 5, 70),
    OrderHistory(4, "Type 4", 10, "30 August 2020", "09:16:00", 6, 60),
    OrderHistory(5, "Type 2", 20, "22 September 2020", "09:16:00", 6, 120),
  ];

  render() {
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
      <Container component="main" maxWidth="xs">
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
              onChange={this.handleWeightChange}
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
              style={{ marginTop: 16 }}
              onClick={this.handleRequestSubmit}
            >
              Submit Request
            </Button>
          </form>
        </div>

        <TableContainer component={Paper} style={{ marginTop: 24, width: 850 }}>
          <Table className={styles.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Order ID</TableCell>
                <TableCell align="right">Byproduct Type</TableCell>
                <TableCell align="right">Weight&nbsp;(Kg)</TableCell>
                <TableCell align="right">Price Per Kg</TableCell>
                <TableCell align="right">Total Payable</TableCell>
                <TableCell align="right">Date</TableCell>
                <TableCell align="right">Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.rows.map((row) => (
                <TableRow key={row.orderId}>
                  <TableCell component="th" scope="row">
                    {row.orderId}
                  </TableCell>
                  <TableCell align="right">{row.byproductType}</TableCell>
                  <TableCell align="right">{row.weight}</TableCell>
                  <TableCell align="right">${row.pricePerKg}</TableCell>
                  <TableCell align="right">${row.totalPayable}</TableCell>
                  <TableCell align="right">{row.date}</TableCell>
                  <TableCell align="right">{row.time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    );
  }
}

export default BuySell;
