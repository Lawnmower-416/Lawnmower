const AWS =  require("@aws-sdk/client-s3");

const REGION = "us-east-1";

const s3Client = new AWS.S3Client({ region: REGION });

const uploadTileset = async (data, userId, tilesetId, isMap) => {
    const path = isMap ? "maps" : "tilesets";
    const params = {
        Bucket: "lawnmowerbucket",
        Key: "content/" + userId + "/" + path + "/" + tilesetId + ".json",
        Body: JSON.stringify(data),
    }

    try {
        const ret = await s3Client.send(new AWS.PutObjectCommand(params));
        return ret;
    } catch (err) {
        console.log("Error", err);
        return err;
    }
}

module.exports = {
    uploadTileset
}
