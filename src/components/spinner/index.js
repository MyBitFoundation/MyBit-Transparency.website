import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledAnimatedLogo = styled.div`
    display: inline-block;
    margin: 30px;
    font-size: ${props => props.size};
    line-height: 1;
    svg {
        width: 1em; height: 1em;
        display: inline-block;
        vertical-align: bottom;
    }
    .JVlbXHZN_0{
        stroke-dasharray:1343 1345;
        stroke-dashoffset:1344;
        animation: 
            JVlbXHZN_draw_0${props => props.animationIterationCount} ${props => props.animationSpeed} ease-in-out 0ms ${props => props.animationIterationCount},
            JVlbXHZN_fade${props => props.animationIterationCount} ${props => props.animationSpeed} linear 0ms ${props => props.animationIterationCount};
        animation-fill-mode: forwards;
    }
    .JVlbXHZN_1{
        stroke-dasharray:661 663;
        stroke-dashoffset:662;
        animation:
            JVlbXHZN_draw_1${props => props.animationIterationCount} ${props => props.animationSpeed} ease-in-out 0ms ${props => props.animationIterationCount},
            JVlbXHZN_fade${props => props.animationIterationCount} ${props => props.animationSpeed} linear 0ms ${props => props.animationIterationCount};
        animation-fill-mode: forwards;
    }
    @keyframes JVlbXHZN_fade${props => props.animationIterationCount}{
        0%{stroke-opacity:1;}
        77.27272727272728%{stroke-opacity:1;}
        100%{stroke-opacity:0;}
    }
    @keyframes JVlbXHZN_draw_0${props => props.animationIterationCount}{
        13.636363636363635%{stroke-dashoffset: 1344;}
        45%{fill-opacity:0;}
        60%{fill-opacity:0;}
        72.72727272727273%{ stroke-dashoffset: 0;}
        80%{fill-opacity:1;}
        100%{ ${props => { return props.animationIterationCount === '1' ? 'fill-opacity: 1;' : ''}}  stroke-dashoffset: 0;}
    }
    @keyframes JVlbXHZN_draw_1${props => props.animationIterationCount}{
        13.636363636363635%{stroke-dashoffset: 662}
        45%{fill-opacity:0;}
        60%{fill-opacity:0;}
        72.72727272727273%{ stroke-dashoffset: 0;}
        80%{fill-opacity:1;}
        100%{ ${props => { return props.animationIterationCount === '1' ? 'fill-opacity: 1;' : ''}}  stroke-dashoffset: 0;}
    }
`

export const Spinner = (props) => (
    <StyledAnimatedLogo {...props}>
        <svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" strokeLinejoin="round" strokeMiterlimit="1.414" >
            <path d="M510.35 256L415 351.42h-.17C374 310.76 318 285.5 256 285.5c-62 0-118.09 25.26-158.93 65.92h-.17L1.65 256 256 1.65 510.35 256z" 
                fill={props.primaryColor} fillOpacity="0" stroke={props.primaryColor} strokeWidth="5" 
                transform="matrix(.78361 0 0 .80235 55.395 50.594)" className="JVlbXHZN_0">
            </path>
            <path d="M386.86 379.54L256.09 510.31 125.15 379.54A183.26 183.26 0 0 1 256 325.29c8.748-.014 17.486.588 26.15 1.8a183.036 183.036 0 0 1 104.71 52.45z" 
                fill={props.secondaryColor} fillOpacity="0" stroke={props.secondaryColor} strokeWidth="5" 
                transform="matrix(.78361 0 0 .80235 55.395 50.594)" className="JVlbXHZN_1">
            </path>
        </svg>
    </StyledAnimatedLogo>
)

Spinner.propTypes = {
    size: PropTypes.string,
    primaryColor: PropTypes.string,
    secondaryColor: PropTypes.string,
    animationSpeed: PropTypes.string,
    animationInterationCount: PropTypes.string,
}

Spinner.defaultProps = {
    size: '100px',
    primaryColor: "#001358",
    secondaryColor: "rgb(24, 144, 255)",
    animationSpeed: "2200ms",
    animationIterationCount: "infinite"
}