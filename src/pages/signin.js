import React, { useState, useContext, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { navigate } from "gatsby";
import "../styles/global.css";
import teal from "@material-ui/core/colors/teal";
import { signIn } from "../api";
import { WorkspaceContext } from "../store/context";
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
export default function SignIn() {
  const classes = useStyles();
  const primary = teal[500];
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [buttonText, setButtonText] = React.useState("Sign In");
  const [error, setError] = React.useState({
    errorUser: false,
    errorPassword: false,
    helperTextUserName: "",
    helperTextPassword: "",
  });
  const handleSignIn = async () => {
    setButtonText("Signing in");
    if (email === "" && password === "") {
      setButtonText("Sign in");
      setError({
        helperTextUserName: "Please enter your Email Address.",
        helperTextPassword: "Please enter you Password.",
        errorUser: true,
        errorPassword: true,
      });
    } else if (email === "") {
      setButtonText("Sign in");
      setError({
        helperTextUserName: "Please enter your Email Address.",
        errorUser: true,
        errorPassword: false,
      });
      setButtonText("Sign in");
    } else if (password === "") {
      setButtonText("Sign in");
      setError({
        helperTextPassword: "Please enter you Password.",
        errorUser: false,
        errorPassword: true,
      });
    } else {
      let result = await signIn(email, password);
      if (result?.message?.includes("Success")) {
        navigate(`/forms/`);
      } else {
        setButtonText("Sign in");
        result?.message?.includes("email")
          ? setError({
              helperTextUserName: result?.message,
              errorUser: true,
              errorPassword: false,
            })
          : setError({
              helperTextPassword: result?.message,
              errorUser: false,
              errorPassword: true,
            });
      }
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar
          style={{ backgroundColor: "#4CD5BD", color: "#FFFFFF" }}
          className={classes.avatar}
        >
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <TextField
          error={error.errorUser}
          helperText={error.helperTextUserName}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          value={email}
          name="email"
          autoComplete="email"
          autoFocus
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <TextField
          error={error.errorPassword}
          helperText={error.helperTextPassword}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          value={password}
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          style={{ backgroundColor: "#4CD5BD", color: "#FFFFFF" }}
          className={classes.submit}
          onClick={(e) => {
            handleSignIn();
          }}
        >
          {buttonText}
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              {/* Forgot password? */}
            </Link>
          </Grid>
          <Grid item>
            <Link href="#" variant="body2">
              {/* {"Don't have an account? Sign Up"} */}
            </Link>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
