import React, { Component } from "react";
import Button from '../../Button/Button';
import './Place.css';
import Image from "../../Image/Image";

const Place =  props => {
   
    return (
        <article className="place">
        <div className="place__header">
            <h1 className="place__title">{props.title}</h1>
        </div> 
        {/* <div className="place__image">
            <Image imageUrl={props.image} contain />
        </div> */}
        <div className="place__content">{props.description}</div>
        <div className="place__content">{props.location}</div>
        <div className="place__content">Number of tables: {props.tableNumber}</div>
        <div className="place__content">Created at: {props.createdAt.split("T")[0]}</div>
        <div className="place__content">Updated at: {props.updatedAt.split("T")[0]}</div>
        <div className=""></div>

        <div className="place__actions">
            <Button mode="flat" link={`/owner/places/${props.id}`}>
                View
            </Button>
            <Button mode="flat" onClick={props.onStartEdit}>
                Edit
            </Button>
            <Button mode="flat" design="danger" onClick={props.onDelete}>
                Delete
            </Button>
        </div>
    </article>
    )
    
   
}
    
export default Place;