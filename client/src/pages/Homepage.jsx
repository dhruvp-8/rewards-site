import React, {useState, useEffect, useCallback} from "react";
import Item from "../components/Item";
import DropWrapper from "../components/DropWrapper";
import Col from "../components/Col";
import { data, statuses } from "../data";
import SaveBoard from "../components/SaveBoard";
import { ToastContainer, toast } from 'react-toastify';
import UndoBoard from "../components/UndoBoard";
import RedoBoard from "../components/RedoBoard";

const Homepage = () => {
    const [items, setItems] = useState(data)
    const [listItems, setListItems] = useState([])
    const [redoItems, setRedoItems] = useState([])

    const stateObjects = []

    useEffect(() => {
        if (localStorage.getItem('items')) {
            setItems(JSON.parse(localStorage.getItem('items')))
        } else {
            setItems(data)
        }
    }, [setItems])

    const onDrop = (item, monitor, status) => {
        const mapping = statuses.find(si => si.status === status);

        setItems(prevState => {
            const newItems = prevState
                .filter(i => i.id !== item.id)
                .concat({ ...item, status, icon: mapping.icon });
                return [...newItems];

        });
        const list = listItems;
        list.push(items);
        setListItems(list);

    };

    // const removeItem = useCallback(
    //     (itemId) => {
    //         var list = items;
    //         for(const item in list){
    //             const i = list[item]
    //             if(i.id == itemId){
    //                 i.status = "Rewards"
    //             }
    //         }
    //         setItems(list)
    //         const listItem = listItems;
    //         listItem.push(list)
    //         setListItems(listItem)
    //     }
    // );

    const undoList = useCallback(
        event => {
            event.preventDefault();
            const indexCurrent = listItems.length
            if (listItems.length !== 0) {
                const reList = redoItems;
                reList.push(items);
                setRedoItems(reList);
                console.log(reList)

                setItems(listItems[indexCurrent - 1])
                var list = listItems;
                list.pop()
                setListItems(list)
            }
            else {
                toast.error('No further Undo is possible!')
            }
        },
        [items]
    );


    const redoList = useCallback(
        event => {
            event.preventDefault();
            const indexCurrent = redoItems.length;
            if (redoItems.length !== 0) {
                setItems(redoItems[indexCurrent - 1])
                var list = redoItems;
                list.pop()
                console.log(list)
                setRedoItems(list)
            }
            else {
                toast.error('No further Redo is possible!')
            }
        },
        [items]
    );

    const moveItem = (dragIndex, hoverIndex) => {
        const item = items[dragIndex];
        setItems(prevState => {
            const newItems = prevState.filter((i, idx) => idx !== dragIndex);
            newItems.splice(hoverIndex, 0, item);
            return [...newItems];

        });


    };

    return (
        <div>
            <SaveBoard data={items} />
            <UndoBoard data={items} undoList={undoList}/>
            <RedoBoard data={items} redoList={redoList} />
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                draggable
            />
            <div className={"row"}>
                {statuses.map(s => {
                    return (
                        <div key={s.status} className={"col-wrapper"}>
                            <h2 className={"col-header"}>{s.status.toUpperCase()}</h2>
                            <DropWrapper onDrop={onDrop} status={s.status}>
                                <Col>
                                    {items
                                        .filter(i => i.status === s.status)
                                        .map((i, idx) => <Item key={i.id} item={i} index={idx} moveItem={moveItem} status={s} />)
                                    }
                                </Col>
                            </DropWrapper>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Homepage;
