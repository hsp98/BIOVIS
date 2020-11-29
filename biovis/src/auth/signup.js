import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import React from "react";

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
};

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: "",
      email: "",
      mobileNo: "",
      password: "", //not a secure way to store the passsword - needs updating
      showError: false,
      errorMessage: "",
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

  handlefullnameChange = (event) => {
    //event.target.value is the username input's value
    this.setState({ fullname: event.target.value });
  };

  handleMobileNoChange = (event) => {
    //event.target.value is the password input's value
    this.setState({ mobileNo: event.target.value });
  };

  handleSignUpSubmit = () => {
    //putting these in vars so we don't have to repeatedly fetch state
    const username = this.state.username;
    const password = this.state.password;
    const fullname = this.state.fullname;
    const mobileNo = this.state.mobileNo;

    const isUsernameVerified = this.verifyUsername(username);
    const isPasswordVerified = this.verifyPassword(password);
    const isfullnameVerified = this.verifyFullname(fullname);
    const isMobileNoVerified = this.verifyMobileNo(mobileNo);

    if (
      isUsernameVerified &&
      isPasswordVerified &&
      isfullnameVerified &&
      isMobileNoVerified
    ) {
      this.setState({ showError: false, errorMessage: "" });

      // //To-do: Implement login logic, should look something like this
      // const userObject = DatabaseCall(username, password); //database call needs to return a user object

      // //set a login session variable
      // localStorage.setItem('userObject', userObject); //store user object in localStorage
      // localStorage.setItem('isLoggedIn', true);

      //redirect the user
    } else {
      isUsernameVerified
        ? this.setState({
            showError: true,
            errorMessage: "Password must be at least 8 characters.",
          }) //if username is verified then password has the error
        : this.setState({
            showError: true,
            errorMessage: "Username must be at least 5 characters.",
          }); //username not verified
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

  verifyFullname = (fullname) => {
    //only condition is that fullname cannot be empty
    if (fullname.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  verifyMobileNo = (mobileNo) => {
    //only condition is that mobile No cannot be empty
    if (mobileNo.length === 10) {
      return true;
    } else {
      return false;
    }
  };

  verifyPassword = (password) => {
    //password cannot be empty
    if (password.length > 8) {
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
            {/* fullname field */}
            <TextField
              variant="outlined"
              value={this.state.fullname}
              style={styles.input}
              required
              fullWidth
              label="Full Name"
              autoComplete="name" //shows emails that user has previously entered
              onChange={this.handlefullnameChange}
              autoFocus
            />
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
            {/* mobileno field */}
            <TextField
              variant="outlined"
              value={this.state.mobileNo}
              style={styles.input}
              required
              fullWidth
              label="Mobile No"
              onChange={this.handleMobileNoChange}
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
              style={{ marginTop: "10px" }}
              onClick={this.handleLoginSubmit}
            >
              Sign Up
            </Button>
            {this.state.showError && (
              <Typography style={styles.errorMessage}>
                {this.state.errorMessage}
              </Typography>
            )}
            <Grid container>
              <Grid item>
                <Link href="/login" variant="body2">
                  {"Already a User? Log In"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}

export default SignUp;
