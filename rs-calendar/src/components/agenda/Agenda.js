import React from 'react';
import { Paper, AppBar, Card, DatePicker, DropDownMenu, List } from 'material-ui';

import './agenda.css';

export default class Calendar extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Paper>
                <AppBar title="Agenda" />
                <Card>
                    <p>text in card</p>
                </Card>
                <DatePicker floatingLabelText="Select start date"/>
                <DatePicker floatingLabelText="Select end date"/>
                <List>
                    <p>Event Name 1</p>
                    <DropDownMenu />
                </List>
                <List>
                    <p>Event Name 2</p>
                    <DropDownMenu />
                </List>
                <List>
                    <p>Event Name 3</p>
                    <DropDownMenu />
                </List>    
            </Paper>
        );
    }    
}
