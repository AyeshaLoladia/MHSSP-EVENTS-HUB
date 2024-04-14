const express = require("express")
const router = express.Router()

const Notice = require('../models/notice')
const Event = require('../models/event')

router.get('/', (req, res, next) => {
    Event.find().select("title")
        .exec()
        .then(docs => {
            res.render('index', { eventsData: docs });
        });
})

router.get('/view-notices/(:depart)', (req, res, next) => {
    Notice.find({
            department: req.params.depart
        }).select("date title upFile")
        .exec()
        .then(docs => {
            res.render('viewNotices', { dept: req.params.depart, notices: docs })
        })
})

router.get('/view-events/(:eventID)', (req, res, next) => {
    Event.find({
            _id: req.params.eventID
        }).select("img title about obj outcome regLink regDesg1 regName1 regMob1 regEmail1 regDesg2 regName2 regMob2 regEmail2 regDesg3 regName3 regMob3 regEmail3 patrons committee regDesc importantTitle1 importantDate1 importantTitle2 importantDate2 importantTitle3 importantDate3 downloadLink1 downloadTitle1 downloadLink2 downloadTitle2 downloadLink3 downloadTitle3 pec rulesPEC selection resName1 resImg1 resDesg1 resTopic1 resName2 resImg2 resDesg2 resTopic2 resName3 resImg3 resDesg3 resTopic3 resName4 resImg4 resDesg4 resTopic4 resName5 resImg5 resDesg5 resTopic5")
        .exec()
        .then(docs => {
            res.render('eventspage', { events: docs[0] })
        })
})

module.exports = router;