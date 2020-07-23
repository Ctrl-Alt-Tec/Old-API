const ical2json = require("ical2json")
const request = require('request');
const { response } = require("express");
module.exports = (options={})=>{
    return new Promise((resolve, reject)=>{
        let id = options.id || 0,
            url = `https://calendar.google.com/calendar/ical/ctrlalttec%40gmail.com/public/basic.ics`;

        request(url, (error, response, body)=>{
            if (error) return error;
            let data = ical2json.convert(response.body)
            resolve(ical2json.convert(response.body))
        })

    })
}