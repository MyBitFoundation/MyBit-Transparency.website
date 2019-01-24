import styled from 'styled-components';
import LayoutGrid from 'preact-material-components/LayoutGrid';
import 'preact-material-components/LayoutGrid/style.css';

export const Container = styled.div`
	padding: 20px;
	width: 100%;
`

export const Page = styled(Container)`
	padding-top: 56px;
`

export const Grid = styled(LayoutGrid)`
	&.mdc-layout-grid {
		padding-top: 0;	
		${ props => props.slim ? 'padding-left: 0; padding-right: 0;' : ''}
	}
`

export const Wrapper = styled.div`
    padding-left: 16px;
    padding-right: 16px;
    ${ props => props.center ? 'text-align: center;' : ''}
    ${ props => props.top ? 'margin-top: 24px;' : ''}
`

export const Inner = styled(LayoutGrid.Inner)``
export const Cell = styled(LayoutGrid.Cell)``
