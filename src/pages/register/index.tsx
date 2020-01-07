import React from "react";
import SimpleNavigationBarLayout from "../../layouts/navigationbarLayout";
import MenuAppBar from "../../components/ui/navbar";
import RegistrationForm from "../../components/forms/register";
import { useStore } from "../../store";

const RegistrationPage: React.FunctionComponent = () => {
  const { actions, state } = useStore();

  return (
    <SimpleNavigationBarLayout
      NavigationBar={MenuAppBar}
      Body={() => (
        <RegistrationForm
          onSubmit={async value => {
            await actions.user.registerUser(value);
            if (!state.user.state.error && !state.user.state.isLoading) {
              const { username, password } = value;
              await actions.auth.login({ username, password });
              if (
                !state.auth.state.error &&
                state.auth.state.isAuthenticated &&
                state.auth.state.token
              ) {
                localStorage.setItem("token", state.auth.state.token);
                
              }
            }
          }}
        ></RegistrationForm>
      )}
    ></SimpleNavigationBarLayout>
  );
};

export default RegistrationPage;
