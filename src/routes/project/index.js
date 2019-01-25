import { h, Component } from 'preact';
import { route } from 'preact-router';
import { Grid, Page, Inner, Cell } from '../../components/layout';
import { Title, ProjectTitle } from '../../components/typography';
import { CardWrapper, CardHeader } from '../../components/card';
import leftCaret from '../../assets/svgs/icons/leftCaret.svg';
import styled from 'styled-components';

const BreadcrumbTitle = styled.span`
    & {
        font-family: Gilroy;
        font-style: normal;
        font-weight: bold;
        line-height: normal;
        font-size: 10px;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: #2F80ED;
        display: flex;
        margin: auto;
        text-align: center;
        padding-top: 30px;
        justify-content: center;
        cursor: pointer;
    }
    
    img  {
        margin-right: 10px;
    }
`

export default class Project extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            project: {},
            components: []
        }
    }
    backToProjects() {
        route(`/`)
    }
    async componentWillMount() {
		const { API, id } = this.props;
		const project = await API.getProject(id);
		const components = await API.getProjectComponents(id);
		this.setState({ project, components })
	}
    render() {
        const { project, components } = this.state;
        return (
            <Page>
                <BreadcrumbTitle onClick={() => this.backToProjects()}><img src={leftCaret} />Back to all projects</BreadcrumbTitle>
				<Title>{ project.name || 'Loading...'}</Title>
				<Grid>
        			<Inner>
        			<Cell desktopCols="12" tabletCols="8" phoneCols="4" align="middle">
        			    <CardWrapper center>
        			        {
        			            components.length > 0 ?
        			            <Grid full>
        			                <Inner>
        			                    { 
        			                        components.map( component => (
        			                            <Cell desktopCols="4" tabletCols="4" phoneCols="2" align="middle">
        			                                <h4>{ component.name }</h4>
        			                            </Cell>
        			                        ))
        			                    }
        			                </Inner>
        			            </Grid> :
        			            <CardHeader>
    							    <ProjectTitle>Loading...</ProjectTitle>
    							    <p style={{ margin: '16px' }}>Should take a few secs.</p>
    						    </CardHeader>
        			        }
    					</CardWrapper>
        			</Cell>
        			</Inner>
        		</Grid>
        	</Page>
        )
    }
}