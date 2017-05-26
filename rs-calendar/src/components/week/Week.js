import React from 'react';
import { Paper, AppBar, Card, DatePicker } from 'material-ui';

import './week.css';

export default class Calendar extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Paper>
                <AppBar title="Week" />
                <Card>
                    <p>text in card</p>
                </Card>
                <DatePicker />
            </Paper>
        );
    }    
}
