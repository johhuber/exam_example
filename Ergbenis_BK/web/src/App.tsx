import React from 'react';
import Content from './pods/Content';
import {
  HashRouter
} from "react-router-dom";

/* We don't need externally provided Props, so we set the props part to {} */
/* But, we want to type our local state with the IState definition */
class App extends React.Component {

  public render() {

    return (
      <HashRouter>
        <Content />
      </HashRouter>

    );
  }
}

export default App;
