import React from 'react';
import { Drawer } from 'material-ui';

import Month from './components/month/Month';
import Week from './components/week/Week';
import Agenda from './components/agenda/Agenda';
import './App.css';


export default class Calendar extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
    const views = [Month, Week, Agenda];
    let Current = views[2];
        return (
                <div>
                    <Drawer open='false'/>
                    <Current/>
                </div>
        );
    }    
}
