import { h, Component } from 'preact';
import { route } from 'preact-router';
import TopAppBar from 'preact-material-components/TopAppBar';
import Drawer from 'preact-material-components/Drawer';
import List from 'preact-material-components/List';
import 'preact-material-components/Drawer/style.css';
import 'preact-material-components/List/style.css';
import 'preact-material-components/TopAppBar/style.css';
import logoUrl from '../../assets/svgs/mybit_logo.svg'
import styled from 'styled-components';

const Logo = styled.img`
	width: 133px;
	padding: 10px;
`

const TopAppBarRow = styled(TopAppBar.Row)`
	background: linear-gradient(180deg, #001358 0%, #125AC4 100%);
`

const TopAppBarTitle = styled(TopAppBar.Title)`
	font-family: Gilroy;
	font-style: normal;
	font-weight: bold;
	line-height: 22px;
	font-size: 18px;
`

const DrawerItem = styled(Drawer.DrawerItem)`
	&.mdc-list-item--activated {
		color: #fff;
		background-color: #1890FF;
	}
	&.mdc-list-item--activated i {
		color: #fff;
	}
	&:before {
		display: none;
	}
`

export default class Header extends Component {
	closeDrawer() {
		this.drawer.MDComponent.open = false;
		this.state = {
			darkThemeEnabled: false
		};
	}

	openDrawer = () => (this.drawer.MDComponent.open = true);

	drawerRef = drawer => (this.drawer = drawer);

	linkTo = path => () => {
		route(path);
		this.closeDrawer();
	};

	goHome = this.linkTo('/');

	render(props) {
		return (
			<div>
				<TopAppBar className="topappbar">
					<TopAppBarRow>
						<TopAppBar.Section align-start>
							<Logo src={logoUrl} />
							<TopAppBarTitle>Transparency Portal</TopAppBarTitle>
						</TopAppBar.Section>
						<TopAppBar.Section align-end shrink-to-fit>
							<TopAppBar.Icon menu onClick={this.openDrawer}>
								menu
							</TopAppBar.Icon>
						</TopAppBar.Section>
					</TopAppBarRow>
				</TopAppBar>
				<Drawer modal ref={this.drawerRef}>
					<Drawer.DrawerContent>
						<DrawerItem selected={props.selectedRoute === '/' || true} onClick={this.goHome}>
							<List.ItemGraphic>home</List.ItemGraphic>
							Projects
						</DrawerItem>
					</Drawer.DrawerContent>
				</Drawer>
			</div>
		);
	}
}
