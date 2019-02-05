import { h, Component } from 'preact';
import { device } from '../../utils/mediaquery';
import styled from 'styled-components';
import LayoutGrid from 'preact-material-components/LayoutGrid';
import 'preact-material-components/LayoutGrid/style.css';
import breakpoints, { defaultBreakpoints }  from 'styled-components-breakpoints'

const media = breakpoints(defaultBreakpoints)

export const Container = styled.div`
	width: 100%;
	@media ${device.tablet} {
        padding: 20px;
    }
    ${ props => props.footer && 'margin-top: 16px' }
`

export const Page = styled(Container)`
	padding-top: 56px;
`

export const Grid = styled(LayoutGrid)`
	&.mdc-layout-grid {
		padding-top: 0;	
		padding-left: 0;
		padding-right: 0;
		${ props => props.slim && 'padding-left: 0; padding-right: 0;'}
		${ props => props.full && 'width: 100%' }
		@media ${device.tablet} {
            padding-left: 16px;
            padding-right: 16px;
        }
	}
`

export const Wrapper = styled.div`
    padding-left: 16px;
    padding-right: 16px;
    ${ props => props.center ? 'text-align: center;' : ''}
    ${ props => props.top ? 'margin-top: 24px;' : ''}
    ${ props => props.topMobile ? `
        ${media.maxWidth('s')`
            margin-top: 24px;
        `}
    ` : ''}
`

export const Inner = styled(LayoutGrid.Inner)``
export const Cell = styled(LayoutGrid.Cell)`
    word-wrap: break-word;
    ${ props => props.padded && 'margin: 20px 0; padding: 20px;' }
    ${ props => props.left && 'text-align: left;' }
`

export const DescriptionWrapper = styled.div`
    figure {
        display: inline;
        margin: 0;
    }
    figcaption {
        display: inline;
    }
`

export const DocumentWrapper = styled.div`
    figure {
        display: inline;
        margin: 0;
    }
    figcaption {
        display: inline;
    }
`