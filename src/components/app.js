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
import Message from '../routes/message';
import Inboxes from '../routes/inboxes';
import EmailForward from '../routes/email_forward';


import API from '../api';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.API = new API();
		this.state = {
			currentUrl: '/',
			isLoading: true,
		}
		this.hasLoaded = this.hasLoaded.bind(this);
	}
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.setState({
			currentUrl: e.url,
			isLoading: true
		});
	};
	
	hasLoaded(isLoading = false) {
		this.setState({ isLoading })
	}
	
	render() {
		return (
			<div id="app">
				<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
				<link href="https://fonts.googleapis.com/css?family=Roboto:400,500" rel="stylesheet" />
				<Header selectedRoute={this.state.currentUrl} API={this.API}/>
				{
					this.state.isLoading && <h1 style={{ padding: '110px', textAlign: 'center' }}> Loading... </h1>
				}
				<Router onChange={this.handleRoute}>
					<Home path="/" API={this.API} hasLoaded={this.hasLoaded} />
					<Project path="/project/:projectId" API={this.API} hasLoaded={this.hasLoaded} />
					<Todoset path="/project/:projectId/todoset/:todosetId" API={this.API} hasLoaded={this.hasLoaded} />
					<Questionnaire path="/project/:projectId/questionnaire/:questionnaireId" API={this.API} hasLoaded={this.hasLoaded} />
					<Todolist path="/project/:projectId/todoset/:todosetId/todolist/:todolistId" API={this.API} hasLoaded={this.hasLoaded} />
					<Question path="/project/:projectId/questionnaire/:questionnaireId/question/:questionId" API={this.API} hasLoaded={this.hasLoaded} />
					<Vault path="/project/:projectId/vault/:vaultId" API={this.API} hasLoaded={this.hasLoaded} />
					<Document path="/project/:projectId/vault/:vaultId/document/:documentId" API={this.API} hasLoaded={this.hasLoaded} />
					<MessageBoard path="/project/:projectId/message_board/:messageBoardId" API={this.API} hasLoaded={this.hasLoaded} />
					<Message path="/project/:projectId/message_board/:messageBoardId/message/:messageId" API={this.API} hasLoaded={this.hasLoaded} />
					<Inboxes path="/project/:projectId/inbox/:inboxeId" API={this.API} hasLoaded={this.hasLoaded} />
					<EmailForward path="/project/:projectId/inbox/:inboxeId/email/:emailId" API={this.API} hasLoaded={this.hasLoaded} />
					<NotFound default />
				</Router>
				<Footer />
			</div>
		);
	}
}
