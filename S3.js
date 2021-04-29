const AWS = require("aws-sdk");
const fs = require("fs");
function uploadDoc(doc, preset, cid) {
  let originalname = doc.originalname.split(".");
  const docExt = originalname[originalname.length - 1];
  AWS.config.update({
    region: process.env.REGION,
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
  });

  const s3 = new AWS.S3({
    apiVersion: "2006-03-01",
    params: { Bucket: "resources-logistics" },
  });

  return new Promise((resolve, reject) => {
    const uploadParams = {
      Bucket: `resources-logistics/${preset}`,
      Key: "",
      Body: "",
    };
    let fileStream = fs.createReadStream(doc.path);
    fileStream.on("error", function (err) {
      reject(err);
    });
    uploadParams.Body = fileStream;
    uploadParams.Key = cid
      ? `${cid}${originalname
          .slice(0, originalname.length - 1)
          .join("-")}.${docExt}`
      : doc.originalname;
    s3.upload(uploadParams, function (err, data) {
      if (err) {
        reject(err);
      }
      if (data) {
        resolve(data);
      }
    });
  });
}
module.exports = {
  uploadDoc,
};
