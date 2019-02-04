import { h, Component } from 'preact';

export const Figure = ({ creator }) => (
    <figure style={{ display: 'flex', margin: 0, alignItems: 'center' }}>
        <img width='30' height='30' src={ creator.avatar_url } style={{ borderRadius: '50%', marginRight: '10px' }} />
        <figcaption style={{display: 'inline'}}> { creator.name }</figcaption>
    </figure>
)