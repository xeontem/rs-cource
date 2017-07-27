import { tempEventGet, tempEventSet } from './eventsBackup';   
import { sendToBackend } from './fetching';
let defaultLocation = '';

export function _closeSaveMonth() {
    let filtered = this.props.month.state.filtered.slice();
    let events = this.props.month.state.events.slice();
    events.push(tempEventGet());
    filtered.push(tempEventGet());
    let appliedEventsMonth = this.props.month._applyEventsOnDates(filtered, this.props.month.state.dateToShow);
    defaultLocation = '';
    this.setState({
            type: this.props.eventTypes[1],
            title: '',
            description: 'description...',
            duration: 0,
            id: 0,
            location: 'location...',
            resources: [{type: ''}],
            speakers: [],
            speakersReadyArr: [],
            start: new Date,
            avatars: [],
            end: new Date,
            showingLocation: defaultLocation,
            avalSpeakers: [], 
            visible: false,
            pageX: null,
            pageY: null,
            speakersReady: false,
            promptVisibility: !this.state.promptVisibility
        });
    this.props.month.setState({appliedEventsMonth, filtered, events});
    sendToBackend(tempEventGet());
    let empty = {};
    tempEventSet(empty);
}

export function _closeSaveWeek() {
    let filtered = this.props.week.state.filtered.slice();
    let events = this.props.week.state.events.slice();
    events.push(tempEventGet());
    filtered.push(tempEventGet());
    let appliedEventsMonth = this.props.week._applyEventsOnDates(filtered, this.props.week.state.dateToShow);
    defaultLocation = '';
    this.setState({
            type: this.props.eventTypes[1],
            title: '',
            description: 'description...',
            duration: 0,
            id: 0,
            location: 'location...',
            resources: [{type: ''}],
            speakers: [],
            speakersReadyArr: [],
            start: new Date,
            avatars: [],
            end: new Date,
            showingLocation: defaultLocation,
            avalSpeakers: [], 
            visible: false,
            pageX: null,
            pageY: null,
            speakersReady: false,
            promptVisibility: !this.state.promptVisibility
        });
    this.props.week.setState({appliedEventsMonth, filtered, events});
    sendToBackend(tempEventGet());
    let empty = {};
    tempEventSet(empty);
}

export function _closeSaveDay() {
    let filtered = this.props.day.state.filtered.slice();
    filtered.push(tempEventGet());

    let [appliedEventsMonth, avalDays, backupDayEvents] = this.props.day._applyEventsOnDates(filtered, this.props.day.state.day.date);
    backupDayEvents.push(tempEventGet());
    let day = appliedEventsMonth[this.props.day.state.dayIndex];
    defaultLocation = '';
    this.setState({
            type: this.props.eventTypes[1],
            title: '',
            description: 'description...',
            duration: 0,
            id: 0,
            location: 'location...',
            resources: [{type: ''}],
            speakers: [],
            speakersReadyArr: [],
            start: new Date,
            avatars: [],
            end: new Date,
            showingLocation: defaultLocation,
            avalSpeakers: [], 
            visible: false,
            pageX: null,
            pageY: null,
            speakersReady: false,
            promptVisibility: !this.state.promptVisibility
        });
    this.props.day.setState({backupDayEvents, filtered, day});
    sendToBackend(tempEventGet());
    let empty = {};
    tempEventSet(empty);
}

export function _closeSaveTableAgenda() {
    let filtered = this.props.table.state.filtered.slice();
    let events = this.props.table.state.events.slice();
    events.push(tempEventGet());
    filtered.push(tempEventGet());
    defaultLocation = '';
    this.setState({
            type: this.props.eventTypes[1],
            title: '',
            description: 'description...',
            duration: 0,
            id: 0,
            location: 'location...',
            resources: [{type: ''}],
            speakers: [],
            speakersReadyArr: [],
            start: new Date,
            avatars: [],
            end: new Date,
            showingLocation: defaultLocation,
            avalSpeakers: [], 
            visible: false,
            pageX: null,
            pageY: null,
            speakersReady: false,
            promptVisibility: !this.state.promptVisibility
        });
    this.props.table.setState({events, filtered});
    sendToBackend(tempEventGet());
    let empty = {};
    tempEventSet(empty);
}
