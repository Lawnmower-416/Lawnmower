// Sample Data
/* Maps */
export const titles = ["The Rift", "Summoner's Map", "Wilding Maps", "New Map", "What The Heck", "Chill Map", "Idk Map"];
export const owners = ["Riot", "Unosoft", "WASDda Studios", "Macroshift", "xXxFortniteLover1337xXx"];
export const names = [{"firstName": "Chloe", "lastName": "Lee"}, {"firstName": "Charlotte ", "lastName": "Lewis"}, {"firstName": "Caleb", "lastName": "Lockwood"}, {"firstName": "Charles", "lastName": "Lee"}, {"firstName": "Cordelia", "lastName": "Lacroix"}];
export const emails = ["riot@riot.org", "unosoft@unosoft.org", "info@wasd.org", "micro@macro.com", "cranking90s@fortnite.com"];
export const joinDates = ["January 1st, 1970", "October 31st, 2021", "November 3rd, 1990"];
export const thumbnails = ["https://riftkit.net/img/map.jpg"]
export const commentsList = ["Outstandingly alluring shapes m8", "Radiant colour dude", "Love your design mate", "Sick work you have here", "So classic"];

const randomMapTitle = () => { return titles[Math.floor(Math.random() * titles.length)] };
const randomOwner = () => { return owners[Math.floor(Math.random() * owners.length)] };
const randomComment = () => { return commentsList[Math.floor(Math.random() * commentsList.length)] };
const randomCreationDate = () => { return joinDates[Math.floor(Math.random() * joinDates.length)]};
const randomEmail = () => { return emails[Math.floor(Math.random() * emails.length)]};

const userIndex = (owner) => { return owners.indexOf(owner)};

export const getEmail = (owner) => {return emails[owners.indexOf(owner)]};

export const getRandomUser = () => {
    const randomUser = randomOwner();
    const randomNum = userIndex(randomUser);
    const comments = generateRandomComments();
    // console.log(names, randomNum);
    const user = {
        firstName: names[randomNum].firstName,
        lastName: names[randomNum].lastName,
        username: owners[randomNum],
        email: emails[randomNum].email,
        passwordHash: "passwordhash",
        joinDate: randomCreationDate(),
        maps: mapsForUser(randomUser),
        tilesets: [],
        comments: comments.filter(comment => comment.owner === owners[randomNum]),
    }

    return user;
}

const mapsForUser = (user) => {
    let owner = user;
    const maps = [];
    for (let i = 0; i < 5; i++) {
        maps.push(
            {
                owner: owner,
                title: randomMapTitle(),
                creationDate: randomCreationDate(),
                views: Math.round(Math.random() * 3000 + 5000),
                likedUsers: Math.round(Math.random() * 1000 + 500),
                dislikedUsers: Math.round(Math.random() * 500),
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
                owner: randomOwner(),
                contentType: randomComment(),
                nestedCommentOwner: owners[Math.floor(Math.random() * owners.length)],
                nestedIndex: Math.floor(Math.random() * 4),
                deleted: false,
                likedComments: Math.round(Math.random() * 100 + 50),
                dislikedComments: Math.round(Math.random() * 50)
            }
        )
    }
    return comments;
}

export const generateRandomMaps = () => {
    
}