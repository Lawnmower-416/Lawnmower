import Toolbar from './Toolbar';
import {useRef, useEffect, useContext} from 'react';
import {useParams} from "react-router-dom";
import EditorContext from "../../../editor";

function MainEditor(props) {

    const { store } = useContext(EditorContext);



    const ref = useRef(null);
    useEffect(() => {
            const context = ref.current.getContext('2d');
            const img = new Image();
            img.onload = () => {
                context.drawImage(img, 0,0, 1024, 576)
            }
    })


    
    return (
        <main className="flex flex-col w-full bg-white overflow-x-hidden overflow-y-auto mb-14">
            <Toolbar />
            <div className="flex w-full mx-auto px-6 py-8 justify-center">
                {ref === null ? <div /> : <canvas ref={ref} width="1024" height="576" />}
            </div>
      </main>
    )
}

export default MainEditor;