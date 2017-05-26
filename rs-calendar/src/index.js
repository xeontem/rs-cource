import React from 'react';
import ReactDOM from 'react-dom';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import registerServiceWorker from './registerServiceWorker';
import Calendar from './App';
import events from './events';
import './index.css';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class RSCalendar extends React.Component {
    render() {
        return (
            <MuiThemeProvider /*muiTheme={getMuiTheme(darkBaseTheme)}*/>
                <Calendar
                    className="data-reactroot"
                    events={events}
                />
            </MuiThemeProvider>
            )
    }
}

ReactDOM.render(<RSCalendar />, document.getElementById('root'));
registerServiceWorker();
