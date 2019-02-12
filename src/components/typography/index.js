import Icon from 'preact-material-components/Icon';
import { device } from '../../utils/mediaquery';
import styled from 'styled-components';
import breakpoints, { defaultBreakpoints }  from 'styled-components-breakpoints'

const media = breakpoints(defaultBreakpoints)

export const Title = styled.h2`
	font-family: Gilroy;
	font-style: normal;
	font-weight: bold;
	line-height: 40px;
	font-size: 32px;
	text-align: center;
	padding-left: 16px;
	padding-right: 16px;
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
        ${ props => props.noMargin && 'margin: 0;' }
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
	${ props => props.noMargin && 'margin: 0;' }
`

export const ProfileTitle = styled.h5`
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-family: Roboto;
	font-style: normal;
	font-weight: 500;
	line-height: 24px;
	font-size: 16px;
	${ props => props.noMargin && 'margin: 0;' }
`

export const ComponentTitle = styled.h4`
	display: flex;
	align-items: center;
	font-family: Gilroy;
	font-style: normal;
	font-weight: bold;
	line-height: 22px;
	font-size: 18px;
	${ props => props.start || props.left ? 
		'justify-content: flex-start; align-items: flex-start;' :
		'justify-content: space-between;'
		
	}
	${ props => props.noMargin && 'margin: 0;' }
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
	flex: 1;
	${ props => props.right && 'text-align: right;' }
	${ props => props.date && 'white-space: pre;' }
`

export const CommentWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    @media ${device.tablet} {
    	flex-direction: row;
    }
`

export const CommentTitle = styled(ProfileTitle)`
    margin-right: 20px;
    width: 100%;
    @media ${device.tablet} {
        width: 25%;
    }
`

export const CommentContentWrapper = styled.div`
	& {
		width: 100%;
		@media ${device.tablet} {
            width: 75%;
        }
	}
    figure {
        display: inline;
        margin: 0;
    }
    figcaption {
        display: inline;
    }
`