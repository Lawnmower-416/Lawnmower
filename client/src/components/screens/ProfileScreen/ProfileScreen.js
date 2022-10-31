export default function ProfileScreen() {
    return (
        <div id="page-bg">
            <div id="user-info">
                <div id="user-icon">
                    <img id="user-logo" src="/images/user-placeholder.png" alt="user-logo" />
                    <img id="edit-icon" src="edit" alt="edit-icon" />
                </div>
                <div id="user-panel">
                    {/* Should be some sort of banner */}
                    <div id="panel-info">
                        <h1>Pannel</h1>
                    </div>
                </div>
            </div>
            <div id="tabs">
                <input className="tabs" type={"button"} value="Maps" />
                <input className="tabs" type={"button"} value="Tilesets" />
                <input className="tabs" type={"button"} value="Comments" />
                <input className="create-map-tileset" type={"button"} value="Create Map" />
                <input className="create-map-tileset" type={"button"} value="Create Tileset" />
            </div>
            <div id="user-content">
                {/* <Card>Content Goes Here</Card> */}
                User Content Of Course
            </div>
        </div>
    );
}