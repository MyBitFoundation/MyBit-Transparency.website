import { h, Component } from 'preact';

export const Figure = ({ creator }) => (
    <figure style={{ display: 'inline', margin: 0 }}>
        <img width='20' height='20' src={ creator.avatar_url }/>
        <figcaption style={{display: 'inline'}}> { creator.name }</figcaption>
    </figure>
)