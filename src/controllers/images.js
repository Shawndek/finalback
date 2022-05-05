import { uploadFile } from '../../s3.js'

export const postImages = async(req, res, next) => {
  try {
    if (!req.file) throw new Error('Please upload an image');
    //console.log(req.file)
    const result = await uploadFile(req.file);
    //console.log(result)
    console.log(req.file.filename);
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};