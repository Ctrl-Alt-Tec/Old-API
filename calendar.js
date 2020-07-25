const ical2json = require("ical2json")
const request = require('request');
const { response } = require("express");
module.exports = (id)=>{
    return new Promise((resolve, reject)=>{
        let url = `https://calendar.google.com/calendar/ical/${id}/public/basic.ics`;
        // let url = `https://calendar.google.com/calendar/ical/c_2uj0cckrh1eicbsbqkannojso4%40group.calendar.google.com/public/basic.ics`

        request(url, (error, response, body)=>{
            if (error) return error;
            let data = ical2json.convert(response.body)
            resolve(data)
        })

    })
}