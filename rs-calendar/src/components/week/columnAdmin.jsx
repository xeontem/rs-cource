import React from 'react';
import Dialog from 'react-md/lib/Dialogs';
import Button from 'react-md/lib/Buttons';
import Toolbar from 'react-md/lib/Toolbars';
import TableColumn from 'react-md/lib/DataTables/TableColumn';
import SelectField from 'react-md/lib/SelectFields';
import TextField from 'react-md/lib/TextFields';

import CardAdmin from '../eventCard/CardAdmin';
import { _loadSpeakers } from '../../instruments/fetching';
import { tempEventGet, tempEventSet, eventBackupGet, eventBackupSet, speakersBackupGet, speakersBackupSet, speakersTempGet, speakersTempSet } from '../eventsBackup';

let initialClientY = 0;
export default class Column extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			speakers: [{name: "Please wait"}],
			visible: false,
            pageX: null,
            pageY: null
		}
		_loadSpeakers.call(this, this.props.event.speakers);
	}

	_openDialog = (e, pressed, speakers) => {
        let { pageX, pageY } = e;
        if (e.changedTouches) {
            const [touch] = e.changedTouches;
            pageX = touch.pageX;
            pageY = touch.pageY;
        }
        this.setState({ visible: true, pageX, pageY });
    }

    _closeDiscard = () => {

	    let filtered = this.props.week.state.filtered.slice(0, eventBackupGet().eventIndex);
	    filtered.push(eventBackupGet());
	    filtered = filtered.concat(this.props.week.state.filtered.slice(eventBackupGet().eventIndex+1));
	    let appliedEventsMonth = this.props.week._applyEventsOnDates(filtered, this.props.week.state.dateToShow);
  		
        this.setState({ visible: false, promptVisibility: !this.state.promptVisibility, speakers: speakersBackupGet()});
	    this.props.week.setState({appliedEventsMonth, filtered});
    }

    _closeSave = () => {

    	let filtered = this.props.week.state.filtered.slice(0, tempEventGet().eventIndex);
	    filtered.push(tempEventGet());
	    filtered = filtered.concat(this.props.week.state.filtered.slice(tempEventGet().eventIndex+1));
	    let appliedEventsMonth = this.props.week._applyEventsOnDates(filtered, this.props.week.state.dateToShow);
	    
  		this.setState({ visible: false, promptVisibility: !this.state.promptVisibility, speakers: speakersTempGet()});
	    this.props.week.setState({appliedEventsMonth, filtered});

    }


    _changeType = (type) => {
    	let tempEvent = tempEventGet();
    	tempEvent.type = type;
    	tempEventSet(tempEvent);
    	this.setState({type});
    }

    _changeTitle = (title) => {
    	let tempEvent = tempEventGet();
    	tempEvent.title = title;
    	tempEventSet(tempEvent);
    	this.setState({title});
    }
    
    _togglePropmpt = () => {
    	this.setState({ promptVisibility: !this.state.promptVisibility });
    }

    _initResize = (e) => {
    	if(!initialClientY) initialClientY = e.clientY;
    	e.target.style.top = e.clientX-initialClientY;
    	console.dir(e.clientX/*getCurrentTarget()*/);
    	// e.target
    }

	render() {
		console.log(new Date(this.props.event.start).getMinutes());
		let	startHours = new Date(this.props.event.start).getHours();
		let	startMins = new Date(this.props.event.start).getMinutes();
		let	marginTop = 24 + 55 * startHours;
			marginTop += startMins * 0.9;
		let	endHours = new Date(Number(new Date(this.props.event.start)) + Number(new Date(this.props.event.duration))).getHours();
		let	endMins = new Date(Number(new Date(this.props.event.start)) + Number(new Date(this.props.event.duration))).getMinutes();
		let startDate = new Date(this.props.event.start).getDate();
		let endDate = new Date(Number(new Date(this.props.event.start)) + Number(new Date(this.props.event.duration))).getDate();
		let	height = (endHours - startHours) * 55;
			height -= startMins * 0.9;
			height += endMins * 0.9;
			if(startDate !== endDate) height = 1340;
		let actions = [<Button flat label="Cancel" onClick={this._closeDiscard} />, <Button flat label="Save" onClick={this._closeSave} />];
		let dialog = null;
		if(this.props.mobile) {
			actions = [<Button flat label="Back" onClick={this._togglePropmpt} />];
			dialog = <Dialog
			          id="promptaction"
			          visible={this.state.promptVisibility}
			          title="Save changes?"
			          aria-labelledby="promptdescription"
			          modal
			          actions={[{
			            onClick: this._closeSave,
			            primary: true,
			            label: 'Save',
			          }, {
			            onClick: this._closeDiscard,
			            primary: false,
			            label: 'Discard',
			          }]}
			        >
			          <p id="promptdescription" className="md-color--secondary-text">
			            Save changes?
			          </p>
			        </Dialog>;
    	}
		return (
			<div style={{marginTop, height}} className={`${this.props.event.type} event-column-week`} onClick={this._openDialog}>
				<div style={{position: 'relative', height: '100%'}}>
				<div className="drag-up" onMouseDown={this._initResize}></div>
				<Dialog 
						id={`calendarEvent${this.props.index}`}
		                visible={this.state.visible}
		       			pageX={this.state.pageX}
		                pageY={this.state.pageY}
		                onHide={this._closeDialog}
		                fullPage
		                aria-label="New Event">
				            <Toolbar
				               className={`md-cell--right ${this.props.event.type}`}
				               colored
				               actions={actions}
				               fixed
				            >
				            <div className="container">
				            {this.props.mobile ? null : <p className="name-field">Type:</p>}
					            <SelectField
					            	className="title-selector"
								    key="titleMenu"
								    id={`titleItem${this.props.index}`}
								    value={this.props.event.type}
								    onChange={this._changeType}
								    menuItems={this.props.eventTypes}
								/>
							{this.props.mobile ? null : <p className="name-field">Title:</p>}
								<TextField
									style={{fontSize: 20}}
								    className="md-cell md-cell--bottom text-title"
							        id="singleRightTitle"
								    value={this.props.event.title}
								    onChange={this._changeTitle}
								    size={8}
								    customSize="title"
								    lineDirection="right"
							      />
							</div>     
							</Toolbar>	
							{dialog}
							<CardAdmin eventIndex={this.props.eventIndex} event={this.props.event} speakers={this.state.speakers} speakersReady={this.state.speakersReady} mobile={this.props.mobile}/> 
		            </Dialog>
		            <div className="drag-down"></div>
		            </div>
            </div>					
		)
	}
}
