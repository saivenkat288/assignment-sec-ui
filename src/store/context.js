import React, { Component } from "react";

const defaultContext = {
  user: {
    id: 11,
    name: "Admin",
    email: "extractor@gmail.com",
  },
};
export const WorkspaceContext = React.createContext(defaultContext);
export const WorkspaceContextConsumer = WorkspaceContext.Consumer;
export class WorkspaceContextProvider extends React.Component {
  state = defaultContext;
  updateWorkspaceDetails = (project_name) => {
    this.setState({
      project_name,
    });
  };
  updatePipelineDetails = (project_description) => {
    this.setState({
      project_description,
    });
  };
  updateRepoDetails = (selectedRows) => {
    this.setState({
      selectedRows,
    });
  };
  render() {
    const {
      workspace,
      codeRepo,
      pipelineDetails,
      user,
      deploymentPipeline,
      session,
    } = this.state;
    const { updateWorkspaceDetails, updatePipelineDetails, updateRepoDetails } =
      this;
    return (
      <WorkspaceContext.Provider
        value={{
          user: this.state.user,
          setUser: (user) => {
            this.setState({
              user: { ...user },
            });
          },
          setSession: (session) => {
            this.setState({
              session: { ...session },
            });
          },
        }}
      >
        {this.props.children}
      </WorkspaceContext.Provider>
    );
  }
}
