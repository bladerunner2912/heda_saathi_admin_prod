import awsSDK from "aws-sdk";
import moment from "moment";
import { config } from "../config";

const S3 = new awsSDK.S3({
  accessKeyId: process.env.ACCESS_KEY_ID!,
  secretAccessKey: process.env.SECRET_ACCESS_KEY!,
  region: 'ap-south-1',

});

export const getUploadFileUrl = async (fileName: string) => {
  // const fileNamePrefix = uuid();
  // const extension = extractExtention(fileName);
  return await S3.getSignedUrlPromise('putObject', {
    Bucket: config.awsBucket.bucketName,
    Key: `${getLocaiton()}​/${fileName}​`,
    ACL: 'public-read',
    Expires: 6000 * 5,
  });
}
function getLocaiton(): string {
  const yearMonthFolder = moment().format('YYYY/MM');
  return `uploads/${yearMonthFolder}`;
}
export const uploadToS3Bucket = async (fileName: string, file: any) => {

  let contentType = `image/${fileName.split(".")[fileName.split(".").length - 1]}`;
  return new Promise((resolve, reject) => {
    S3.upload(
      {
        Key: fileName,
        Bucket: config.awsBucket.bucketName,
        ACL: "public - read",
        Body: file,
        ContentType: contentType,
        // ContentEncoding: "base64",
      },
      (error: Error, data: any) => {
        if (error) {
          reject(error);
          console.log(error);
        }
        resolve(data);
      }
    );
  });
};



export const deleteFromS3Bucket = async (fileId: string) => {
  return new Promise((resolve, reject) => {
    S3.deleteObject(
      {
        Key: fileId,
        Bucket: process.env.BUCKETNAME!,
      },
      (error: Error, data: any) => {
        if (error) {
          reject(error);
        }
        resolve(data);
      }
    );
  });
};
