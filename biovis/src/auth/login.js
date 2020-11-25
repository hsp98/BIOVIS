import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

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
};

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

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
            <TextField
              variant="outlined"
              style={styles.input}
              required
              fullWidth
              id="emailField"
              label="Email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              style={styles.input}
              required
              fullWidth
              label="Password"
              type="password"
              id="password"
            />
            <Button type="submit" fullWidth variant="contained" color="primary" style={{ marginTop: '10px' }}>
              Login
            </Button>
            <Grid container>
              <Grid item xs>
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

export default Login;
