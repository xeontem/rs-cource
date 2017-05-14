import Render from './render.js';
import Listeners from './listeners.js';
import Request from './request.js';
import Resize from './resize.js';
import GASection from './renderGA';
import config from './config';

export default class Main {
	constructor() {
        this.GASection = new GASection();
		this.render = new Render();
        this.request = new Request();
		this.listeners = new Listeners();
		this.resize = new Resize();
	}
}
