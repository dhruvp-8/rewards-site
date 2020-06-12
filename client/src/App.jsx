import React from "react";
import Homepage from "./pages/Homepage";
import Header from "./components/Header";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from 'react-dnd-html5-backend'

const App = () => {
    return (
        <DndProvider backend={HTML5Backend}>
            <Header />
            <Homepage />
        </DndProvider>
    );
};

export default App;