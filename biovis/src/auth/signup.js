import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import React from 'react';
import { auth, firestore } from '../firebase';

import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

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

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '', //not a secure way to store the passsword - needs updating
      confirmPassword: '',
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

  handleConfirmPasswordChange = (event) => {
    //event.target.value is the password input's value
    if (this.state.password != event.target.value) {
      this.setState({ showError: true, errorMessage: 'Passwords do not match!' });
    } else {
      this.setState({ showError: false, errorMessage: '' });
    }
    this.setState({ confirmPassword: event.target.value });
  };
  handleLoginSubmit = async () => {
    //putting these in vars so we don't have to repeatedly fetch state
    const username = this.state.username;
    const password = this.state.password;

    const isUsernameVerified = this.verifyUsername(username);
    const isPasswordVerified = this.verifyPassword(password);

    if (isUsernameVerified && isPasswordVerified) {
      this.setState({ showError: false, errorMessage: '' });

      try {
        auth.createUserWithEmailAndPassword(this.state.username, this.state.password).then(async (data) => {
          const userRef = firestore.doc(`user/${data.user.uid}`);
          const snapshot = await userRef.get();
          if (!snapshot.exists) {
            const { username, password } = this.state;
            try {
              await userRef.set({
                email: username,
                password: password,
              });
            } catch (error) {
              console.error('Error creating user document', error);
            }
          }
          this.props.history.push('/login');
          console.log(data);
        });
      } catch (error) {
        console.log(error);
      }
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
            Sign Up
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
            {/* new password field */}
            <TextField
              variant="outlined"
              value={this.state.confirmPassword}
              style={styles.input}
              required
              fullWidth
              label="New Password"
              type="password"
              onChange={this.handleConfirmPasswordChange}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              style={{ marginTop: '10px' }}
              onClick={this.handleLoginSubmit}
            >
              SignUp
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
                <Link href="/login" variant="body2">
                  {'Already have an account? Login'}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}

export default withRouter(SignUp);
