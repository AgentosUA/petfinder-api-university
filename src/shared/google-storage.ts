import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Storage } from '@google-cloud/storage';

const uploadFile = async (file, folderName): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    const googleCloud = new Storage({
      keyFilename: join(__dirname, '../../config/google-cloud.json'),
      projectId: 'flawless-star-313916',
    });

    const imageId = uuidv4();

    const bucket = await googleCloud.bucket(process.env.bucket_id);
    const { originalname, buffer } = file

    const blob = bucket.file(`${folderName}/${imageId}-${originalname.replace(/ /g, "_")}`)
    const blobStream = blob.createWriteStream({
      resumable: false
    })
    blobStream
      .on('finish', () => {
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        resolve(publicUrl);
      })
      .on('error', () => {
        reject(`Unable to upload image, something went wrong`);
      })
      .end(buffer)
  })
}

const deleteFile = async (fileUrl) => {
  const googleCloud = new Storage({
    keyFilename: join(__dirname, '../../config/google-cloud.json'),
    projectId: 'flawless-star-313916',
  });

  await googleCloud.bucket(process.env.bucket_id).file(fileUrl.split(process.env.bucket_id + '/')[1]).delete();
}


export { uploadFile, deleteFile }

