export default function Profile() {
    return (
        <div id="page-bg">
            <div id="user-info">
                <div id="user-icon">
                    <img id="user-logo" src="images/user-placeholder.png" alt="user-logo" />
                    <img src="edit" alt="edit-icon" />
                </div>
                <div id="user-panel">
                    <h1>Panel</h1>
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