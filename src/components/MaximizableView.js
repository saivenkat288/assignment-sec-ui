import React from "react";
import useFullscreenStatus from "./useFullscreenStatus";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AspectRatioIcon from "@material-ui/icons/AspectRatio";

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: "#f58a48",
    alignSelf: "center",
    fontSize: 15,
    marginTop: 5,
    marginBottom: 5,
  },
}));

export default function MaximizableView({
  children,
  backgroundColor,
  switchAspectRatio,
}) {
  const maximizableElement = React.useRef(null);
  let isFullscreen, setIsFullscreen;
  let errorMessage;

  const classes = useStyles();

  try {
    [isFullscreen, setIsFullscreen] = useFullscreenStatus(maximizableElement);
    console.log("useFullscreenStatus(maximizableElement);", isFullscreen);
  } catch (e) {
    errorMessage = "Fullscreen not supported";
    isFullscreen = false;
    setIsFullscreen = undefined;
  }

  const renderFullScreen = () => {
    switchAspectRatio("maximize");
    setIsFullscreen();
  };

  const handleExitFullscreen = () => {
    switchAspectRatio("minimize");
    document.exitFullscreen();
  };

  return (
    <div
      ref={maximizableElement}
      className={`maximizable-container ${
        isFullscreen ? "fullscreen" : "default"
      }`}
      style={{ backgroundColor: isFullscreen ? backgroundColor : null }}
    >
      <Grid
        alignItems="flex-start"
        style={{ backgroundColor: "#ffffff" }}
        container
        className="maximizable-actions"
      >
        <Grid item xs={10}></Grid>
        <Grid item xs={2}>
          {errorMessage ? (
            <button
              onClick={() =>
                alert(
                  "Fullscreen is unsupported by this browser, please try another browser."
                )
              }
            >
              {errorMessage}
            </button>
          ) : isFullscreen ? (
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              startIcon={<AspectRatioIcon />}
              onClick={handleExitFullscreen}
            >
              Back to form
            </Button>
          ) : (
            // <button className={classes.button} onClick={handleExitFullscreen}>Back to workbench</button>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              startIcon={<AspectRatioIcon />}
              onClick={renderFullScreen}
            >
              Maximize
            </Button>
            // <button className={classes.button} onClick={setIsFullscreen}>Maximize</button>
          )}
        </Grid>
      </Grid>
      <div className="maximizable-content">{children}</div>
    </div>
  );
}
