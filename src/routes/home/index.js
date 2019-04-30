import { h, Component } from 'preact';
import { route } from 'preact-router';
import { Grid, Page, Inner, Cell } from '../../components/layout';
import { Title, ProjectTitle, NavigationTitle, ColoredIcon } from '../../components/typography';
import { CardWrapper, CardHeader } from '../../components/card';
import { Spinner } from '../../components/spinner';


export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			projects: []
		}
	}
	
	goToProject(projectId) {
		route(`/project/${projectId}`)
	}
	async componentDidMount() {
        const { hasLoaded } = this.props;
		hasLoaded();
    }
	async componentWillMount() {
		const { API } = this.props;
		const projects = await API.getProjects()
		projects.sort((a, b) => a.name <= b.name ? a.name === b.name ? 0 : -1 : 1 );
		this.setState({ projects })
	}
	render() {
		const { projects } = this.state;
		const { API } = this.props;
		return (
			<Page>
				<Title>Projects</Title>
				<Grid>
        			<Inner>
					<Cell desktopCols="12" tabletCols="8" phoneCols="4" align="middle">
						<CardWrapper style={{ padding: '8px 32px' }}>
							<p>
							Welcome to the MyBit Transparency Portal. We believe that all projects should be open
							and transparent to the fullest extent possible. This automated portal plugs directly into
							our workflow tool (Basecamp) and allows our community to view all of our activity in real
							time including, message boards, chats, tasks, documents and files, schedules,
							and daily check ins.
							</p>
							<p>
							Each project is isolated for organisational purposes so you can choose the project you wish
							to view and then navigate to the different aspects of it. If you want to send us some comments,
							please do so through the following <a href='mailto:save-eVarbxnAw4Rx@3.basecamp.com'>mail</a>,
							and we will answer your back as soon as we can. You can see our existing responses in our&nbsp;
							<a href="#" onClick={() => route('project/10222521/inbox/1482309531')}>email forwards</a> section.
							</p>
							<Grid full last slim>
								<Inner>
								{
									[
									{
										icon: 'access_time',
										description: 'What the team works on daily?',
										link:
											<NavigationTitle left onClick={() => route('project/10222521/questionnaire/1482309517/question/1482309522')}>
												View activity
											</NavigationTitle>
									},
									{
										icon: 'chat',
										description: 'Any questions or comments?',
										link:
											<NavigationTitle left href='https://www.reddit.com/r/MyBitToken/' target='_blank'>
												Reach out to our community
											</NavigationTitle>
									},
									{
										icon: 'mail',
										description: 'Want to integrate a transparency portal for your company?',
										link:
											<NavigationTitle left href='mailto:cm@mybit.io'>
												Contact us
											</NavigationTitle>
									}
									].map( message => (
									<Cell desktopCols="4" tabletCols="4" phoneCols="4" align="top" topPadded left>
		                                <div>
                                            <ColoredIcon>{ message.icon }</ColoredIcon>
		                                </div>
		                                <p style={{ margin: '2px 0'}}>{ message.description }</p>
                                        {
											message.link
                                        }
		                            </Cell>
			                        ))
			                    }
	                            </Inner>
							</Grid>
						</CardWrapper>
					</Cell>
        		{ 
        			projects.length > 0 ?
					projects.map( project => (
						<Cell desktopCols="3" tabletCols="4" phoneCols="4" align="middle" style={{ height: '100%' }}>
							<CardWrapper onClick={() => this.goToProject(project.id)} pointer>
								<CardHeader>
									<ProjectTitle>{ project.name }</ProjectTitle>
									<p style={{ margin: '16px' }}>{ project.description }</p>
								</CardHeader>
							</CardWrapper>
						</Cell>
					)) :
					<Cell desktopCols="12" tabletCols="8" phoneCols="4" align="middle" style={{ textAlign: 'center' }}>
						<CardWrapper>
							<CardHeader>
								<Spinner />
								<ProjectTitle> Loading... </ProjectTitle>
							</CardHeader>
						</CardWrapper>
					</Cell>
				}
					</Inner>
				</Grid>
			</Page>
		);
	}
}
