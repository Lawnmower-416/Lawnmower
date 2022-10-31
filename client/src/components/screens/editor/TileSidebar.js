import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { useRef, useState, useEffect } from 'react';
function TileSidebar(props) {

    return (
        <div className="bg-editor-primary h-screen w-64">
            <div className="flex flex-col h-full">
                <div className="flex flex-col flex-1">
                    <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                        <div className="flex items-center flex-shrink-0 px-4 justify-between">
                            <ChevronRightIcon className="h-10 w-10 text-white"/>
                            <h1 className="text-3xl text-white">Tiles</h1>
                        </div>
                        <div className="mt-5 flex-1 bg-editor-background">
                            
                        <div>
                            {props.tilesets.map((tileset) => (
                                <TilesetContent 
                                    key={tileset.name}
                                    name={tileset.name}
                                    current={tileset.current}
                                    imgUrl={tileset.src}
                                />
                            ))}
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function TilesetContent(props) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        if(open && ref) {
            const context = ref.current.getContext('2d');
            const img = new Image();
            img.src = props.imgUrl;
            img.onload = () => {
                context.drawImage(img, 0,0, 200, 200)
            }
        }
    })

    return (
        <div className="text-white">
            <div className="bg-editor-secondary" onClick={() => setOpen(!open)}>
                <div className="text-white flex items-center">
                    {props.name}
                    {open ? <ChevronDownIcon className="h-6 w-6 text-white"/> : <ChevronRightIcon className="h-6 w-6 text-white"/>}
                </div>
            </div>
            {open && (
                <canvas width="200" height="200" ref={ref}/>
            )}       
        </div>
    )

}

export default TileSidebar;