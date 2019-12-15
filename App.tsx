import React from "react";
import observableStore from "./store";
import { Provider } from "mobx-react";
import DrawerNavigator from "./Drawer";

export default class App extends React.Component {
  render() {
    return (
      <Provider observableStore={observableStore}>
        <DrawerNavigator />
      </Provider>
    );
  }
}
