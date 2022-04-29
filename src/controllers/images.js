import { uploadFile } from "./s3.js"

export const postImages = (async(req, res, next) => {
  if (!req.file) throw new Error('Please upload an image');
  //console.log(req.file)
  const result = await uploadFile(req.file)
  //console.log(result)
  console.log(req.file.filename)
  res.json({result})
});