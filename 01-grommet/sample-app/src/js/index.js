import '../scss/index.scss';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from 'grommet/components/App';
import Anchor from 'grommet/components/Anchor';
import Footer from 'grommet/components/Footer';
import RichTextDashboard from './components/RichTextDashboard';
import Box from 'grommet/components/Box';


class Main extends Component {
  render() {
    return (
      <App centered={false}>
        <Box appCentered={true}>
          <p>hello</p>
          <RichTextDashboard />
          <p>comming</p>
        </Box>
        <Footer primary={true} appCentered={true} direction="column"
          align="center" pad="small" colorIndex="grey-1">
          <p>
            Build your ideas with <Anchor href="http://grommet.io" target="_blank">Grommet</Anchor>!
          </p>
        </Footer>
      </App>
    );
  }
};

let element = document.getElementById('content');
ReactDOM.render(React.createElement(Main), element);

document.body.classList.remove('loading');
