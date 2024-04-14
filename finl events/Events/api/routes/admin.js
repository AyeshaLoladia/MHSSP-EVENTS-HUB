const express = require("express")
const router = express.Router()
const mongoose = require('mongoose')
const multer = require('multer');
const jwt = require("jsonwebtoken");
var fs = require("fs")

const Admin = require("../models/admin")
const Notice = require('../models/notice')
const Event = require('../models/event')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/uploads');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

var eventUpload = upload.fields([{ name: 'img', maxCount: 1 }, { name: 'downloadLink1', maxCount: 1 }, { name: 'downloadLink2', maxCount: 1 }, { name: "downloadLink3", maxCount: 1 }, { name: "resImg1", maxCount: 1 }, { name: "resImg2", maxCount: 1 }, { name: "resImg3", maxCount: 1 }, { name: "resImg4", maxCount: 1 }, { name: "resImg5", maxCount: 1 }])

router.get('/', (req, res, next) => {
    res.render('login');
})

router.post("/", (req, res) => {
    const email = req.body.email;
    const pass = req.body.pass;

    Admin.find({
            email: email,
            pass: pass,
        })
        .exec()
        .then((user) => {
            if (user.length < 1) {
                res.status(404).json({
                    message: "Admin Not found",
                });
            } else {
                const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id,
                    },
                    process.env.JWT_KEY, {}
                );
                req.session.email = email;
                res.status(200).redirect("/admin/dashboard");
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                message: error,
            });
        });
});

router.get('/dashboard', (req, res, next) => {
    if (req.session.email) {
        res.render('dashboard');
    } else {
        res.redirect('/admin')
    }
})

router.get('/events', (req, res, next) => {
    if (req.session.email) {
        Event.find().select("title")
            .exec()
            .then(docs => {
                res.render('events', { eventsData: docs });
            })
    } else {
        res.redirect('/admin')
    }
})

router.get('/add-event', (req, res, next) => {
    if (req.session.email) {
        res.render('addEvent');
    } else {
        res.redirect('/admin')
    }
})

router.get("/delete-event/(:id)", (req, res, next) => {
    Event.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            fs.unlinkSync("\public/" + doc.img)
            fs.unlinkSync("\public/" + doc.downloadLink1)
            fs.unlinkSync("\public/" + doc.downloadLink2)
            fs.unlinkSync("\public/" + doc.downloadLink3)
            fs.unlinkSync("\public/" + doc.resImg1)
            fs.unlinkSync("\public/" + doc.resImg2)
            fs.unlinkSync("\public/" + doc.resImg3)
            fs.unlinkSync("\public/" + doc.resImg4)
            fs.unlinkSync("\public/" + doc.resImg5)

            return res.redirect('/admin/events')
        } else {
            res.redirect('/admin')
        }
    })
});

router.get('/notices', (req, res, next) => {
    if (req.session.email) {
        Notice.find().select("_id date title department")
            .exec()
            .then(docs => {
                res.render('notices', { noticeData: docs });
            })
    } else {
        res.redirect('/admin')
    }
})

router.get('/add-notice', (req, res, next) => {
    if (req.session.email) {
        res.render('addNotice');
    } else {
        res.redirect('/admin')
    }
})

router.get("/delete-notice/(:id)", (req, res, next) => {
    Notice.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            console.log(doc.upFile)
            fs.unlinkSync("\public/" + doc.upFile)
            return res.redirect('/admin/notices')
        } else {
            res.redirect('/admin')
        }
    })
});

router.get('/logout', (req, res, next) => {
    req.session.destroy();
    res.redirect("/admin")
})

router.post('/add-notice', upload.single('upFile'), (req, res, next) => {
    console.log(req.file)
    const notice = new Notice({
        _id: new mongoose.Types.ObjectId(),
        date: req.body.date,
        title: req.body.title,
        department: req.body.department,
        upFile: 'uploads/' + req.file.filename
    });

    notice
        .save()
        .then(doc => {
            res.redirect('/admin/notices')
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
});

router.post('/add-event', eventUpload, (req, res, next) => {
    const event = new Event({
        _id: new mongoose.Types.ObjectId(),

        img: 'uploads/' + req.files.img[0].filename,
        title: req.body.title,
        about: req.body.about,
        obj: req.body.obj,
        outcome: req.body.outcome,
        regDesc: req.body.regDesc,
        regLink: req.body.regLink,

        regName1: req.body.regName1,
        regDesg1: req.body.regDesg1,
        regMob1: req.body.regMob1,
        regEmail1: req.body.regEmail1,

        regName2: req.body.regName2,
        regDesg2: req.body.regDesg2,
        regMob2: req.body.regMob2,
        regEmail2: req.body.regEmail2,

        regName3: req.body.regName3,
        regDesg3: req.body.regDesg3,
        regMob3: req.body.regMob3,
        regEmail3: req.body.regEmail3,

        patrons: req.body.patrons,
        committee: req.body.committee,

        importantTitle1: req.body.importantTitle1,
        importantDate1: req.body.importantDate1,
        importantTitle2: req.body.importantTitle2,
        importantDate2: req.body.importantDate2,
        importantTitle3: req.body.importantTitle3,
        importantDate3: req.body.importantDate3,

        downloadLink1: 'uploads/' + req.files.downloadLink1[0].filename,
        downloadTitle1: req.body.downloadTitle1,
        downloadLink2: 'uploads/' + req.files.downloadLink2[0].filename,
        downloadTitle2: req.body.downloadTitle2,
        downloadLink3: 'uploads/' + req.files.downloadLink3[0].filename,
        downloadTitle3: req.body.downloadTitle3,

        resName1: req.body.resName1,
        resImg1: 'uploads/' + req.files.resImg1[0].filename,
        resDesg1: req.body.resDesg1,
        resTopic1: req.body.resTopic1,

        resName2: req.body.resName2,
        resImg2: 'uploads/' + req.files.resImg2[0].filename,
        resDesg2: req.body.resDesg2,
        resTopic2: req.body.resTopic2,

        resName3: req.body.resName3,
        resImg3: 'uploads/' + req.files.resImg3[0].filename,
        resDesg3: req.body.resDesg3,
        resTopic3: req.body.resTopic3,

        resName4: req.body.resName4,
        resImg4: 'uploads/' + req.files.resImg4[0].filename,
        resDesg4: req.body.resDesg4,
        resTopic4: req.body.resTopic4,

        resName5: req.body.resName5,
        resImg5: 'uploads/' + req.files.resImg5[0].filename,
        resDesg5: req.body.resDesg5,
        resTopic5: req.body.resTopic5,

        pec: req.body.pec,
        rulesPEC: req.body.rulesPEC,
        selection: req.body.selection,
    });

    event
        .save()
        .then(doc => {
            res.redirect('/admin/events')
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
});

module.exports = router;