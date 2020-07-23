const request = require('request');
module.exports = (options)=>{
    return new Promise((resolve, reject)=>{
        let id = options.id,
            sheet = options.sheet || 1,
            query = options.query || '',
            useIntegers = options.useIntegers || true,
            showRows = options.rows || true,
            showColumns = options.columns || true,
            url = `https://spreadsheets.google.com/feeds/list/${id}/${sheet}/public/values?alt=json`;

        request(url, (error, response, body)=>{
            if( error ) return error ;
            let data = JSON.parse(response.body),
                responseObj = {},
                rows = new Array(),
                columns = {};

            if (data && data.feed && data.feed.entry){
                data.feed.entry.forEach(entry=>{
                    let keys = Object.keys(entry),
                        newRow = {},
                        queried = false;
                    keys.filter(key=>key.includes('gsx$')).forEach(key=>{
                        let name = key.substring(4),
                        content = entry[key],
                        value = content.$t;
                        // columns[name] = []
                        
                        if (value.toLowerCase().indexOf(query.toLowerCase()) > -1) {
                            queried = true;
                        }
                        if (useIntegers && !isNaN(value)) {
                            value = Number(value);
                        }
                        newRow[name] = value
                        if(queried){
                            if(!columns.hasOwnProperty(name)){
                                columns[name] = []
                            }
                            columns[name].push(value)
                        }
                    });
                    if(queried){
                        rows.push(newRow)
                    }
                })
                if(showColumns){
                    responseObj.columns = columns
                }
                if(showRows){
                    responseObj.rows = rows
                }
                resolve(responseObj)
            }
        })
    })
}