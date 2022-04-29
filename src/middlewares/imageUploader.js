import multer from 'multer';
import { extname } from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${extname(file.originalname)}`);
  }
});

const isPicture = ({ originalname, mimetype }) => {
  const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];
  return (
    allowedTypes.includes(mimetype) && originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)
  );
};

function fileFilter(req, file, cb) {
  return !isPicture(file) ? cb(new Error('Please upload ONLY pictures')) : cb(null, true);
}

const imageUploader = multer({ storage, fileFilter });

export default imageUploader;
