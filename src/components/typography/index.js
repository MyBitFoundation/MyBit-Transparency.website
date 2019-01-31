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
        color: #2F80ED;
        display: flex;
        margin: auto;
        ${ props => props.top && 'padding-top: 30px;' }
        ${ props => props.left ? '' : 
        	`text-align: center;
        	justify-content: center;`
        }
        cursor: pointer;
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