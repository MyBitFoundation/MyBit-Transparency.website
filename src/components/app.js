import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Header from './header';
import Footer from './footer';
import Home from '../routes/home';
import Project from '../routes/project';
import Todoset from '../routes/todoset';
import Todolist from '../routes/todolist';
import Questionnaire from '../routes/questionnaire';
import Question from '../routes/question';
import Vault from '../routes/vault';
import Document from '../routes/document';
import NotFound from '../routes/404';
import MessageBoard from '../routes/message_board';

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
				<link href="https://fonts.googleapis.com/css?family=Roboto:400,500" rel="stylesheet" />
				<Header selectedRoute={this.state.currentUrl} API={this.API}/>
				<Router onChange={this.handleRoute}>
					<Home path="/" API={this.API}/>
					<Project path="/project/:projectId" API={this.API}/>
					<Todoset path="/project/:projectId/todoset/:todosetId" API={this.API}/>
					<Questionnaire path="/project/:projectId/questionnaire/:questionnaireId" API={this.API}/>
					<Todolist path="/project/:projectId/todoset/:todosetId/todolist/:todolistId" API={this.API}/>
					<Question path="/project/:projectId/questionnaire/:questionnaireId/question/:questionId" API={this.API}/>
					<Vault path="/project/:projectId/vault/:vaultId" API={this.API} />
					<Document path="/project/:projectId/vault/:vaultId/document/:documentId" API={this.API} />
					<MessageBoard path="/project/:projectId/message_board/:messageBoardId" API={this.API} />
					<NotFound default />
				</Router>
				<Footer />
			</div>
		);
	}
}
