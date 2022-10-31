// Sample Data
/* Maps */
export const titles = ["The Rift", "Summoner's Map", "Wilding Maps", "New Map", "What The Heck", "Chill Map", "Idk Map"];
export const owners = ["Riot", "Unosoft", "WASDda Studios", "Macroshift", "xXxFortniteLover1337xXx"];
export const joinDates = ["January 1st, 1970", "October 31st, 2021", "November 3rd, 1990"];
export const thumbnails = ["https://riftkit.net/img/map.jpg"]
export const commentsList = ["Outstandingly alluring shapes m8", "Radiant colour dude", "Love your design mate", "Sick work you have here", "So classic"];

export const randomPoints = () => { return Math.floor(Math.random() * 300000) };
export const randomTitle = () => { return titles[Math.floor(Math.random(titles) * titles.length)] };

export const mapsForOneRandomUser = () => {
    let owner = owners[Math.random() * owners.length];
    const maps = [];
    for (let i = 0; i < 5; i++) {
        maps.push(
            {
                owner: owner,
                title: titles[Math.random() * titles.length],
                creationDate: joinDates[Math.random() * joinDates.length],
                views: Math.random() * 3000 + 5000,
                likedUsers: Math.random() * 1000 + 500,
                dislikedUsers: Math.random() * 500,
                comments: generateRandomComments(),
                deleted: false,
                collaborators: [],
                viewers: [],
                public: true,
                tilesets: [],
                height: 400,
                width: 400,
                tileSize: 10,
                layers: [],
            }
        )
    }
    return maps;
}
export const generateRandomComments = () => {
    const comments = [];
    for (let i = 0; i < 3; i++) {
        comments.push(
            {
                owner: owners[Math.random() * owners.length],
                contentType: commentsList[Math.random() * commentsList.length],
                nestedCommentOwner: owners[Math.random() * owners.length],
                nestedIndex: Math.random() * 4,
                deleted: false
            }
        )
    }
    return comments;
}