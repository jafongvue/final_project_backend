const firebase = require('firebase/app');
const {getStorage, ref, uploadBytesResumable, getDownloadURL} = require('firebase/storage');
const firebaseConfig = require('../firebase/firebase.config.json');
const multer = require('multer');
const routes = require('express').Router();
const upload = multer({
    Storage: multer.memoryStorage()
});

firebase.initializeApp(firebaseConfig);
const storage = getStorage();

routes.post('/product',upload.single('file'), async(req, res)=>{
    try {
        const folder = "products";
        const fileName = `${folder}/${req.file.originalname}`;
        const storageRef = ref(storage, fileName);
        const metadata = {
            contentType: req.file.mimetype
        };
        const snapshot = uploadBytesResumable(storageRef, req.file.buffer, metadata);
        const downloadURL = await getDownloadURL((await snapshot).ref);
        console.log(req.file);
        return res.status(200).json({url: downloadURL});
    } catch (error) { 
        console.log(req.file);
        return res.status(405).json({message:error.message})
    }

});
routes.post('/QRcode',upload.single('file'), async(req, res)=>{
    try {
        const folder = "QRcode";
        const fileName = `${folder}/${req.file.originalname}`;
        const storageRef = ref(storage, fileName);
        const metadata = {
            contentType: req.file.mimetype
        };
        const snapshot = uploadBytesResumable(storageRef, req.file.buffer, metadata);
        const downloadURL = await getDownloadURL((await snapshot).ref);
        console.log(req.file);
        return res.status(200).json({url: downloadURL});
    } catch (error) { 
        console.log(req.file);
        return res.status(405).json({message:error.message})
    }

});
routes.post('/multiple', upload.array('files'), async (req, res) => {
    try {
        const folder = 'Multiple_images';
        const uploadPromises = req.files.map(async (file) => {
            const fileName = `${folder}/${file.originalname}`;
            const storageRef = ref(storage, fileName);
            const metadata = {
                contentType: file.mimetype
            };
            const snapshot = uploadBytesResumable(storageRef, file.buffer, metadata);
            const downloadURL = await getDownloadURL((await snapshot).ref);
            return {
                originalName: file.originalname,
                url: downloadURL 
            };
        });
        const uploadResults = await Promise.all(uploadPromises);

        res.status(200).json({
            message: 'Upload success',
            files: uploadResults
        });
    } catch (error) {
        res.status(405).json({
            message: error
        });
    }
});

module.exports = routes;