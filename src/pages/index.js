import React, { useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import SignIn from "./signin";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const IndexPage = ({ pageContext }) => {
  const classes = useStyles();
  const [features, setFeatures] = React.useState(true);
  const [info, setInfo] = React.useState(true);
  const [welcome, setWelcome] = React.useState(true);

  useEffect(() => {
    setTimeout(async function () {
      setWelcome(false);
    }, 4000);
  }, []);

  function handleClick(id) {
    switch (id) {
      case "features":
        setFeatures(!features);
        break;
      case "info":
        setInfo(!info);
        break;
    }
  }

  return (
    <main>
      <SignIn />
    </main>
  );
};

export default IndexPage;
