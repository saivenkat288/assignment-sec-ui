import React, { Component } from "react";
import Iframe from "react-iframe";
import MaximizableView from "../components/MaximizableView";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { navigate } from "gatsby";
import Button from "@material-ui/core/Button";
const useStyles = makeStyles({
  iframe: {
    zIndex: 1,
    position: "relative",
    top: 0,
    left: 0,
    width: "95vh",
    height: "95vh",
    border: 0,
  },
  iframeFullScreen: {
    zIndex: 1,
    position: "relative",
    top: 0,
    left: 0,
    width: "80%",
    height: "95vh",
    border: 0,
  },
});
export default function App() {
  const classes = useStyles();
  const iframeRef = React.createRef();
  const [maximiseWindow, setMaximiseWindow] = React.useState(false);
  const changeFrameDimensions = (windowEvent) => {
    if (windowEvent == "maximize") {
      setMaximiseWindow(true);
    } else {
      setMaximiseWindow(false);
    }
    let element = document.querySelector("#Lb_iframe");
  };
  const handleClick = () => {
    navigate(`/graph/`);
  };
  return (
    <div>
      {" "}
      <Grid container xs={10} alignItems="flex-start">
        {/* <StatusCard /> */}
        <MaximizableView
          backgroundColor="#EFEFEF"
          switchAspectRatio={changeFrameDimensions}
        >
          <Iframe
            url="https://docs.google.com/forms/d/e/1FAIpQLSdUWI4rEL44IEkWy6wLY7UgrgBK7NQkj37Fi0NsaxRi6zLksw/viewform?embedded=true"
            ref={iframeRef}
            id="Lb_iframe"
            className={
              maximiseWindow ? classes.iframeFullScreen : classes.iframe
            }
            display="initial"
            position="relative"
            allowFullScreen
          />
        </MaximizableView>
      </Grid>
      <Grid container xs={5} alignItems="flex-start">
        <MaximizableView
          backgroundColor="#EFEFEF"
          switchAspectRatio={changeFrameDimensions}
        >
          <Iframe
            url="https://docs.google.com/forms/d/e/1FAIpQLSfOQgCj-4zOWj2a8aDClQrXg0MglQv3McLH_fKHQ8cWKvBUbg/viewform?usp=sf_link"
            ref={iframeRef}
            id="Lb_iframe"
            className={
              maximiseWindow ? classes.iframeFullScreen : classes.iframe
            }
            display="initial"
            position="relative"
            allowFullScreen
          />
        </MaximizableView>
      </Grid>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        style={{ backgroundColor: "#4CD5BD", color: "#FFFFFF" }}
        className={classes.submit}
        onClick={(e) => {
          handleClick();
        }}
      >
        Next
      </Button>
    </div>
  );
}
