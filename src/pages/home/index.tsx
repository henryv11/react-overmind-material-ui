import React from "react";
import SimpleNavigationBarLayout from "../../layouts/navigationbarLayout";
import NavigationBar from "../../components/ui/navbar";

export default function Home() {
  return (
    <SimpleNavigationBarLayout
      NavigationBar={NavigationBar}
      Body={() => <div>Hello World Cock and Balls</div>}
    />
  );
}
