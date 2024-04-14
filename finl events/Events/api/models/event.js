const mongoose = require('mongoose')

const eventSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    title: { type: String, required: true },
    img: { type: String, required: true },
    about: { type: String, required: true },
    obj: { type: String, required: true },
    outcome: { type: String, required: true },

    regDesc: { type: String, required: true },
    regLink: { type: String, required: true },

    regName1: { type: String, required: true },
    regDesg1: { type: String, required: true },
    regMob1: { type: String, required: true },
    regEmail1: { type: String, required: true },

    regName2: { type: String, required: true },
    regDesg2: { type: String, required: true },
    regMob2: { type: String, required: true },
    regEmail2: { type: String, required: true },

    regName3: { type: String, required: true },
    regDesg3: { type: String, required: true },
    regMob3: { type: String, required: true },
    regEmail3: { type: String, required: true },

    patrons: { type: String, required: true },
    committee: { type: String, required: true },

    importantTitle1: { type: String, required: true },
    importantDate1: { type: String, required: true },
    importantTitle2: { type: String, required: true },
    importantDate2: { type: String, required: true },
    importantTitle3: { type: String, required: true },
    importantDate3: { type: String, required: true },

    downloadLink1: { type: String, required: true },
    downloadTitle1: { type: String, required: true },
    downloadLink2: { type: String, required: true },
    downloadTitle2: { type: String, required: true },
    downloadLink3: { type: String, required: true },
    downloadTitle3: { type: String, required: true },

    resName1: { type: String, required: true },
    resImg1: { type: String, required: true },
    resDesg1: { type: String, required: true },
    resTopic1: { type: String, required: true },

    resName2: { type: String, required: true },
    resImg2: { type: String, required: true },
    resDesg2: { type: String, required: true },
    resTopic2: { type: String, required: true },

    resName3: { type: String, required: true },
    resImg3: { type: String, required: true },
    resDesg3: { type: String, required: true },
    resTopic3: { type: String, required: true },

    resName4: { type: String, required: true },
    resImg4: { type: String, required: true },
    resDesg4: { type: String, required: true },
    resTopic4: { type: String, required: true },

    resName5: { type: String, required: true },
    resImg5: { type: String, required: true },
    resDesg5: { type: String, required: true },
    resTopic5: { type: String, required: true },

    pec: { type: String, required: true },
    rulesPEC: { type: String, required: true },

    selection: { type: String, required: true },
})

module.exports = mongoose.model('Events', eventSchema)