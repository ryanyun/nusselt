require('./index.html');
require('./style.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import Landing from './pages/Landing.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

ReactDOM.render(<Landing />, document.getElementById('root'));