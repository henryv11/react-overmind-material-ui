import React from "react";

interface Props {
  NavigationBar: React.ComponentType<any>;
  Body: React.ComponentType<any>;
}

export default function SimpleNavigationBarLayout(props: Props) {
  const { NavigationBar, Body } = props;
  return (
    <div>
      <div>
        <NavigationBar />
      </div>
      <div>
        <Body />
      </div>
    </div>
  );
}
