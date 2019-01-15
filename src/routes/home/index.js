import { h, Component } from 'preact';
import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import style from './style';
import styled from 'styled-components';

const Title = styled.h2`
	font-family: Gilroy;
	font-style: normal;
	font-weight: bold;
	line-height: 40px;
	font-size: 32px;
	text-align: center;
`

const ProjectTitle = styled.h3`
	font-family: Gilroy;
	font-style: normal;
	font-weight: bold;
	line-height: 22px;
	font-size: 18px;
`

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			projects: []
		}
	}
	
	async componentWillMount() {
		const { API } = this.props;
		const projects = await API.getProjects();
		this.setState({ projects })
	}
	render() {
		const { projects } = this.state;
		return (
			<div class={`${style.home} page`}>
				<Title>Projects</Title>
				{
					projects.map( project => (
						<Card>
							<div class={style.cardHeader}>
								<ProjectTitle>{ project.name }</ProjectTitle>
							</div>
						</Card>
					))
				}
				
			</div>
		);
	}
}
