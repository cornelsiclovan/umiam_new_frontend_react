import React from "react";
import './Image.css';

const image = props => (
    <div
        className="image"
        style={{
            backroundImage: `url('${props.imageUrl}')`,
            backroundSize: props.contain ? 'contain' : 'cover',
            backroundPosition: props.left ? 'left': 'center'
        }} 
    />
);

export default image;
   
