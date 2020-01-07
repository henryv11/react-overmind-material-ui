import React from "react";
import SimpleNavigationBarLayout from "../../layouts/navigationbarLayout";
import MenuAppBar from "../../components/ui/navbar";

const Welcome: React.FunctionComponent = () => {
  return (
    <SimpleNavigationBarLayout
      NavigationBar={MenuAppBar}
      Body={() => <div />}
    ></SimpleNavigationBarLayout>
  );
};

export default Welcome;
