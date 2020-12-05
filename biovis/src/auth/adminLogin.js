import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import React from 'react';
import { Redirect } from 'react-router-dom';

import { withRouter } from 'react-router-dom';
import {auth} from '../firebase';

//inline styles
const styles = {
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  icon: {
    margin: 'auto',
    backgroundColor: 'green',
  },
  input: {
    marginTop: '20px',
  },
  errorMessage: {
    color: 'red',
  },
};

class AdminLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      actualUsername: 'biovis123@gmail.com',
      actualPassword: 'Biovis123',
      username: '',
      password: '', //not a secure way to store the passsword - needs updating
      showError: false,
      errorMessage: '',
    };
  }

  handleUsernameChange = (event) => {
    //event.target.value is the username input's value
    this.setState({ username: event.target.value });
  };

  handlePasswordChange = (event) => {
    //event.target.value is the password input's value
    this.setState({ password: event.target.value });
  };

  handleLoginSubmit = () => {
    //putting these in vars so we don't have to repeatedly fetch state
    const username = this.state.username;
    const password = this.state.password;

    const isUsernameVerified = this.verifyUsername(username);
    const isPasswordVerified = this.verifyPassword(password);

    if (isUsernameVerified && isPasswordVerified) {
        if( username == this.state.actualUsername && password == this.state.actualPassword)
        {
            this.props.history.push('/admin')
        }
      this.setState({ showError: false, errorMessage: '' });

    } else {
      isUsernameVerified
        ? this.setState({ showError: true, errorMessage: 'Password must be at least 8 characters.' }) //if username is verified then password has the error
        : this.setState({ showError: true, errorMessage: 'Username must be at least 5 characters.' }); //username not verified
    }
  };

  verifyUsername = (username) => {
    //only condition is that username cannot be empty
    if (username.length > 5) {
      return true;
    } else {
      return false;
    }
  };

  verifyPassword = (password) => {
    //password cannot be empty
    if (password.length > 5) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    return (
      <Container component="main" maxWidth="xs">
        <div style={styles.paper}>
          <Avatar style={styles.icon}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form className={styles.form} noValidate>
            {/* username field */}
            <TextField
              variant="outlined"
              value={this.state.username}
              style={styles.input}
              required
              fullWidth
              label="Email"
              autoComplete="email" //shows emails that user has previously entered
              onChange={this.handleUsernameChange}
              autoFocus
            />
            {/* password field */}
            <TextField
              variant="outlined"
              value={this.state.password}
              style={styles.input}
              required
              fullWidth
              label="Password"
              type="password"
              onChange={this.handlePasswordChange}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              style={{ marginTop: '10px' }}
              onClick={this.handleLoginSubmit}
            >
              Login
            </Button>
            {this.state.showError && <Typography style={styles.errorMessage}>{this.state.errorMessage}</Typography>}
            <Grid container>
              <Grid item xs>
                {/* doesn't link anywhere yet - feature to be implemented later */}
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}

export default withRouter(AdminLogin);
