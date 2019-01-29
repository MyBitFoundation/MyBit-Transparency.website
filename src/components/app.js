import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Header from './header';
import Footer from './footer';
import Home from '../routes/home';
import Project from '../routes/project';
import NotFound from '../routes/404';

import API from '../api';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.API = new API();
	}
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.setState({
			currentUrl: e.url
		});
	};

	render() {
		return (
			<div id="app">
				<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
				<Header selectedRoute={this.state.currentUrl} API={this.API}/>
				<Router onChange={this.handleRoute}>
					<Home path="/" API={this.API}/>
					<Project path="/project/:id" API={this.API}/>
					<NotFound default />
				</Router>
				<Footer />
			</div>
		);
	}
}
