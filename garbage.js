// const nodemailer = require("nodemailer");
// const jwt = require('jsonwebtoken');
//  const token=jwt.sign({name,email,password},process.env.JWT_ACC_ACTIVATE,{expiresIn:"20m"})

      //   let transporter = nodemailer.createTransport({
      //    service:"hotmail",
      //     auth: {
      //       user: "codetofun@outlook.com", // generated ethereal user
      //       pass: "node@1234", // generated ethereal password
      //     },
      //   });
      
      //   // send mail with defined transport object
      //   let info = await transporter.sendMail({
      //     from: '"Balajee👻" <codetofun@outlook.com>', // sender address
      //     to: email, // list of receivers
      //     subject: "NewsLetter", // Subject line
      //     text: "Hello world love you.....love ", // plain text body
      //     html: `click here to verify <br> <a href="http://localhost:3000/login">${token}</a>` // html body
      //   });
      //   req.flash("success", "we have sent an email to you please verify it, it's you");




// const PDFDocument = require('pdfkit');
// const fs = require('fs');
// const doc = new PDFDocument();
//   doc.pipe(fs.createWriteStream('output.pdf'));
// doc
//   .fontSize(25)
//   .text('Some text with an embedded font!', 100, 100);
  

//   doc.image('public/image/flower.jpg', {
//     fit: [300, 700],
//     align: 'center',
//     valign: 'center'
//   });
//   doc
//   .addPage()
//   .fontSize(25)
//   .text('Here is some vector graphics...', 100, 100);

// // Draw a triangle
// doc
//   .save()
//   .moveTo(100, 150)
//   .lineTo(100, 250)
//   .lineTo(200, 250)
//   .fill('#FF3300');

// // Apply some transforms and render an SVG path with the 'even-odd' fill rule
// doc
//   .scale(0.6)
//   .translate(470, -380)
//   .path('M 250,75 L 323,301 131,161 369,161 177,301 z')
//   .fill('red', 'even-odd')
//   .restore();

// // Add some text with annotations
// doc
//   .addPage()
//   .fillColor('blue')
//   .text('Here is a link!', 100, 100)
//   .underline(100, 100, 160, 27, { color: '#0000FF' })
//   .link(100, 100, 160, 27, 'http://google.com/');


  // doc.end();


//   User.findOneAndUpdate(req.user.name, {"admin":true}, {upsert: true}, function(err, doc) {
//     if (err) return res.send(500, {error: err});
//     return res.send('Succesfully saved.');
// });




// const uri = process.env.DB_URL
  // const uri ="mongodb+srv://Balajee:J3IwOazuLn6lBghe@cluster0.rfqls.mongodb.net/FORUSER?retryWrites=true&w=majority";
  // mongoose
  //   .connect(uri, {
  //     useNewUrlParser: true,
  //     useCreateIndex: true,
  //     useUnifiedTopology: true,
  //     useFindAndModify: false,
  //   })
  //   .then(() => {
  //     console.log("connection open");
      
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  //   {
//     "compilerOptions": {
//         "experimentalDecorators": true,
//         "allowJs": true
//     }
// }
// CLIENT_URL=http//localhost:3000/


  // arrayObj=[req.body];
    // console.log(arrayObj);
    // const result = arrayObj.map((value,i) => {
    //   let [key, val] = Object.entries(value)[i];
    //   return {key, val}
    // });


    // const multerStorage= multer.diskStorage({
//   destination:(req,file,cb)=>{
//      cb(null,"public"); 
//   },
//   filename: (req, file, cb) => {
//    const fileName = file.originalname.toLowerCase().split(' ').join('-');
//    cb(null,fileName);
//    // const ext =file.mimetype.split("/")[1];
//    // cb(null, `files\admin-${file.fieldname}-${Date.now()}.${ext}`);
//  }
// });



// const upload = multer({
// storage: multerStorage,
// fileFilter: (req, file, cb) => {
//    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/gif") {
//        cb(null, true);
//    } else {
//        cb(null, false);
//        return cb(new Error('Allowed only .png, .jpg, .jpeg and .gif'));
//    }
// }
// });