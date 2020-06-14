import React, { Fragment, useState, useRef, useEffect, useCallback} from 'react';
import {useDrag, useDrop} from 'react-dnd';
import Window from "./Window";
import ITEM_TYPE from "../data/types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose } from '@fortawesome/free-solid-svg-icons'

const Item = ({ item, index, moveItem, status, removeItem}) => {

    const ref = useRef(null);
    const onRemove = (item_id) => {
        removeItem(item_id);
    }

    const [, drop] = useDrop({
        accept: ITEM_TYPE,
        hover(item, monitor) {
            if (!ref.current) {
                return;
            } 

            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex == hoverIndex) {
                return false;
            }

            const hoveredRect = ref.current.getBoundingClientRect()
            const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
            const mousePosition = monitor.getClientOffset();
            const hoverClientY = mousePosition.y - mousePosition.x;
            
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            console.log(dragIndex, hoverIndex)
            moveItem(dragIndex, hoverIndex);
            item.index = hoverIndex;
        }
    });

    const [{ isDragging }, drag] = useDrag({
        item: { type: ITEM_TYPE, ...item, index},
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    });

    const [show, setShow] = useState(false);

    const onOpen = () => setShow(true);

    const onClose = () => setShow(false);

    drag(drop(ref));

    return (
        <Fragment>
            <div 
                ref={ref} 
                style={{ opacity: isDragging ? 0 : 1}} 
                className={"item"} 
                onClick={onOpen}
            >
                <div className={"color-bar"} style={{backgroundColor: status.color}}></div>
                <div className={"close-btn-ctn"}>
                    <p className={"item-title"}>{item.content}</p>
                    <button className="close-btn" onClick={() => onRemove(item.id)}><FontAwesomeIcon icon={faWindowClose} size="xs" color="red" /></button>
                </div>
                <p className={"item-status"}>{item.status}</p>
            </div>
        </Fragment>
    );
}

export default Item;
