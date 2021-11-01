import React from "react";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import swal from "sweetalert";

const axios = require("axios");
const CryptoJS = require("crypto-js");
const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: theme.spacing(1),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  container: {
    padding: theme.spacing(2),
  },
  textbox: {
    marginTop: 40,
    paddingTop: 10,
  },
}));

export default function Bitbucket() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    projectName: "",
    description: "",
  });
  let projectMeta = {};
  const [username, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [branch, setBranch] = React.useState("");
  const handleBranch = (e) => {
    setBranch(e.target.value);
  };
  const handleUserName = (e) => {
    setUserName(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleClick = () => {
    swal("INFO!", "Submitting....", "info");
    var data_ = JSON.stringify({
      section: branch,
      kind: username,
      Storage: password,
    });
    const config = {
      method: "post",
      url: "https://assignment-sec.herokuapp.com",
      headers: {
        "Content-Type": "application/json",
      },
      data: data_,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        swal("Success!", "Details Submitted Successfully", "success");
        setBranch("");
        setPassword("");
        setUserName("");
      })
      .catch(function (error) {
        console.log(error);
        swal("Oops!", "Something went wrong!", "error");
      });
  };
  return (
    <React.Fragment>
      <Grid
        containerClassName={classes.container}
        spacing={3}
        item
        align="center"
      >
        <Grid item xs={8} sm={8}>
          <TextField
            required
            id="kind"
            name="kind"
            label="kind"
            fullWidth
            className={classes.textbox}
            value={username}
            onChange={handleUserName}
            autoComplete="username"
          />
        </Grid>
        <Grid item xs={8} sm={8}>
          <TextField
            required
            id="storage"
            name="storage"
            label="storage"
            value={password}
            onChange={handlePassword}
            fullWidth
            className={classes.textbox}
          />
        </Grid>
        <Grid item xs={8} sm={8}>
          <TextField
            required
            id="section"
            name="section"
            label="section"
            value={branch}
            onChange={handleBranch}
            fullWidth
            className={classes.textbox}
          />
        </Grid>
      </Grid>
      <br />
      <br />
      <Grid item align="center" spacing={3}>
        <Button
          color="primary"
          variant="contained"
          onClick={(e) => handleClick()}
        >
          Draw Graph
        </Button>
      </Grid>
    </React.Fragment>
  );
}
