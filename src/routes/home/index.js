import { h, Component } from 'preact';
import Card from 'preact-material-components/Card';
import LayoutGrid from 'preact-material-components/LayoutGrid';
import 'preact-material-components/LayoutGrid/style.css';
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

const Container = styled.div`
	padding: 20px;
	min-height: 100%;
	width: 100%;
`

const Page = styled(Container)`
	padding-top: 56px;
`

const ProjectTitle = styled.h3`
	font-family: Gilroy;
	font-style: normal;
	font-weight: bold;
	line-height: 22px;
	font-size: 18px;
	margin: 0;
	padding: 16px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`

const StyledCard = styled(Card)`
	height: 82px;
	width: 100%:
`

const StyledCardHeader = styled.div`
	margin: auto;
	width: 100%;
`

const StyledGrid = styled(LayoutGrid)`
	&.mdc-layout-grid {
		padding-top: 0;	
	}
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
			<Page>
				<Title>Projects</Title>
				<StyledGrid>
        			<LayoutGrid.Inner>
        		{ 
        			projects.length > 0 ?
					projects.map( project => (
						<LayoutGrid.Cell phoneCols="4" align="middle">
							<StyledCard>
								<StyledCardHeader>
									<ProjectTitle>{ project.name }</ProjectTitle>
								</StyledCardHeader>
							</StyledCard>
						</LayoutGrid.Cell>
					)) :
					<LayoutGrid.Cell phoneCols="4" align="middle">
						<StyledCard>
							<StyledCardHeader>
								<ProjectTitle> Loading... </ProjectTitle>
							</StyledCardHeader>
						</StyledCard>
					</LayoutGrid.Cell>
				}
					</LayoutGrid.Inner>
				</StyledGrid>
			</Page>
		);
	}
}
