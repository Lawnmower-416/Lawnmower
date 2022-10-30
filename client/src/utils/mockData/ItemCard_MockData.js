// Sample Data
export const titles = ["The Rift", "Summoner's Map", "Wilding Maps", "New Map", "What The Heck", "Chill Map", "Idk Map"];
export const owners = ["Riot", "Unosoft", "WASDda Studios", "Macroshift", "xXxFortniteLover1337xXx"];
export const joinDate = ["January 1st, 1970", "October 31st, 2021", "November 3rd, 1990"];
export const thumbnails = ["https://riftkit.net/img/map.jpg"]

export const randomPoints = () => { return Math.floor(Math.random() * 300000) };
export const randomTitle = () => { return titles[Math.floor(Math.random(titles) * titles.length)] };