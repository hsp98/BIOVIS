import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Autocomplete } from '@material-ui/lab';
import React from 'react';
import { withRouter } from 'react-router-dom';

class Payment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      company: '',
    };
  }

  handleCompanyChange = (e) => {
    this.setState({
      company: e.target.firstChild.data,
    });
  };

  handlePaymentSubmit = (e) => {
    //Actual payment verification is a pending feature
    this.props.history.push('/buysell');
  };

  handleLogoutSubmit = (e) => {
    localStorage.setItem('loggedIn', false);
    this.props.history.push('/login');
  };

  handleReturn = (e) => {
    this.props.history.push('/buysell');
  };

  render() {
    //inline styles
    const styles = {
      main: {
        marginTop: '45px',
      },
      paper: {
        padding: '20px',
        backgroundColor: '#f5f5f5',
      },
    };

    //sample manufacturers since payment feature won't be fully implemented to accept payments
    const manufacturers = [
      { companyName: 'Company A', pricePerKg: 10 },
      { companyName: 'Company B', pricePerKg: 5 },
      { companyName: 'Company C', pricePerKg: 6 },
      { companyName: 'Company D', pricePerKg: 6 },
    ];

    return (
      <>
        <Button
          variant="contained"
          color="secondary"
          onClick={this.handleLogoutSubmit}
          style={{
            float: 'right',
            marginRight: '5px',
          }}
        >
          Log Out
        </Button>

        <Button
          variant="contained"
          color="secondary"
          onClick={this.handleReturn}
          style={{
            float: 'right',
            marginRight: '5px',
          }}
        >
          Return to listings
        </Button>
        <Grid container justify="center">
          <Grid item sm={6} style={styles.main}>
            <Typography variant="h6" style={{ fontWeight: '500' }}>
              Make a Payment
            </Typography>
            <Paper elevation={3} variant="outlined" style={styles.paper}>
              {/* transaction info */}
              <Typography variant="h6" gutterBottom>
                Transaction Information
              </Typography>
              <Grid container spacing={3} style={{ marginBottom: '10px' }}>
                <Grid item xs={12} sm={5}>
                  <Autocomplete
                    options={manufacturers}
                    getOptionLabel={(option) => option.companyName + '     -     $' + option.pricePerKg + ' Per Kg'}
                    onChange={this.handleCompanyChange}
                    inputValue={this.state.company}
                    renderInput={(params) => <TextField {...params} label="Select Company" variant="outlined" />}
                  />
                </Grid>
                <Grid item xs={12} sm={5}>
                  <FormControl fullWidth variant="outlined" style={{ margin: '8' }}>
                    <InputLabel htmlFor="paymentAmount" style={{ backgroundColor: '#f5f5f5' }}>
                      Payment Amount
                    </InputLabel>
                    <OutlinedInput
                      required
                      fullWidth
                      name="paymentAmount"
                      variant="outlined"
                      startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    />
                  </FormControl>
                </Grid>
              </Grid>

              {/* make payment section */}
              <Typography variant="h6" gutterBottom>
                Payment Information
              </Typography>
              <Grid container spacing={3} style={{ marginBottom: '10px' }}>
                <Grid item xs={12} sm={5}>
                  <TextField required fullWidth name="cardName" label="Cardholder Name" variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={5}>
                  <TextField required fullWidth name="cardNumber" label="Card Number" variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={5}>
                  <TextField required fullWidth name="expiryDate" label="Expiry Date" variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={5}>
                  <TextField required fullWidth name="csv" label="CSV" variant="outlined" />
                </Grid>
              </Grid>

              {/* shipping address section */}
              <Typography variant="h6" gutterBottom>
                Shipping address
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth name="firstName" label="First name" variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth name="lastName" label="Last name" variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth name="address1" label="Address line 1" variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth name="address2" label="Address line 2" variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth name="city" label="City" variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth name="state" label="State/Province/Region" variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth name="Postal Code" label="Postal code" variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth name="country" label="Country" variant="outlined" />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    style={{ float: 'right' }}
                    onClick={this.handlePaymentSubmit}
                  >
                    Submit Payment
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </>
    );
  }
}

export default withRouter(Payment);
