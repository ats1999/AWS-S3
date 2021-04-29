
let multer  = require('multer')
let upload = multer({dest: 'kyc/'});
const S3 = require('./S3');

router.post("/upload/profile",isAuthenticated,upload.single('user__profile__image'),async(req,res)=>{
    try{
        let docLoc = await S3.uploadDoc(req.file,'client/profile',req.user.cid);
        res.send(docLoc);
    }catch(e){
        console.log(e);
        res.status(500).send(err);
    }
});

