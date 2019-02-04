import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import styled from 'styled-components';

export const CardWrapper = styled(Card)`
	${ props => props.minHeight && 'height: 125px;' }
	width: 100%;
	height: 100%;
	${ props => props.pointer && 'cursor: pointer;' }
	${ props => props.center && 'text-align: center;' }
`

export const CardHeader = styled.div`
	width: 100%;
`