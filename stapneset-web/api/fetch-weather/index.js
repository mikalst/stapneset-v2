var azure = require('azure-storage');
const https = require('https');


async function fetchFromYr() {
    try {
        let url = process.env['YR_API_ENDPOINT'];
        let http_promise = new Promise((resolve, reject) => {
            https.get(url, {headers: { 'User-Agent': 'test' }}, (response) => {
                let chunks_of_data = [];
    
                response.on('data', (fragment) => {
                    chunks_of_data.push(fragment);
                });
    
                response.on('end', () => {
                    let response_body = Buffer.concat(chunks_of_data);
                    resolve(response_body.toString());
                });
    
                response.on('error', (error) => {
                    reject(error);
                }, );
            });
        });

        let json = JSON.parse(await http_promise).properties.timeseries;
        let output = [];

        json.forEach(entry => {
            let single = entry.data.instant.details;
            single['RowKey'] = {'_': entry.time};
            single['PartitionKey'] = {'_': 'taskNorway'};
            single['timestamp'] = {'_' : entry.time};
            output.push(single);
        });
        return output;
    }
    catch (error) {
        console.log(error);
    }
}

async function store(tableSvc, tableName, data) {
    let promise = new Promise((resolve, reject) => {
        data.forEach(entry => {
            tableSvc.insertOrReplaceEntity(tableName, entry, {echoContent: true}, function (error, result, response) {
                if(!error) {
                    // Insertion completed
                }
                else{
                    reject("Did not finish");
                }
            });
        });
        resolve("Finished writing to table");
    });
    await promise;
}

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const connectionString = process.env['STORAGE_CONNECTION_STRING'];
    const tableName = process.env['STORAGE_TABLE_NAME'];

    var tableSvc = azure.createTableService(connectionString);

    let weather_data = [];

    let date = new Date(Date.now() + 60*60000);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    
    for (i = 0; i < 3; i++) {
        let rowKey = date.toISOString().slice(0, -5)+"Z";
        
        let promise = new Promise(function(resolve, reject) {
            tableSvc.retrieveEntity(tableName, 'taskNorway', rowKey, async function(error, result, response) {
                if(!error) {
                    //Query was successful
                    weather_data.push(result);
                }
                else {
                    //Fetch data from yr
                    data = await fetchFromYr(rowKey);

                    //Store data to Azure
                    await store(tableSvc, tableName, data);

                    //Push to output
                    weather_data.push(data.find((entry) => {
                        return entry.RowKey['_'] === rowKey;
                    }));
                }
                resolve("Success");
            });
        });
        await promise;
        date.setHours(date.getHours() + 24);
    }

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: JSON.stringify({"data": weather_data})
    };
}