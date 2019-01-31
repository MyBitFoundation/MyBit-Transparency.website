import Icon from 'preact-material-components/Icon';
import styled from 'styled-components';

export const Title = styled.h2`
	font-family: Gilroy;
	font-style: normal;
	font-weight: bold;
	line-height: 40px;
	font-size: 32px;
	text-align: center;
`

export const NavigationTitle = styled.span`
    & {
        font-family: Gilroy;
        font-style: normal;
        font-weight: bold;
        line-height: normal;
        font-size: 10px;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        ${ props => props.disabled  ?
			'color: #828282;' :
			'color: #2F80ED; cursor: pointer;'
        }
        display: flex;
        margin: auto;
        ${ props => props.top ? 'padding-top: 30px;' : 'padding: 10px 0;' }
        ${ props => props.left ? '' : 
        	`text-align: center;
        	justify-content: center;`
        }
    }
    
    img  {
        margin-right: 10px;
    }
`

export const ProjectTitle = styled.h3`
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

export const ComponentTitle = styled.h4`
	display: flex;
	align-items: center;
`

export const ComponentIcon = styled(Icon)`
	margin-right: 16px;
`

export const ColoredIcon = styled(Icon)`
	color: #2D9CDB;
`

export const Subline = styled.small`
	margin-left: 16px;
	font-family: Roboto;
	font-style: normal;
	font-weight: normal;
	line-height: 24px;
	font-size: 16px;
	color: #828282;
`