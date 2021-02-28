var azure = require('azure-storage');
const https = require('https');

function createPromise() {
    var url = 'https://api.met.no/weatherapi/locationforecast/2.0/compact?altitude=50&lat=58.381492&lon=6.045954';
    return new Promise((resolve, reject) => {
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
}

async function fetchFromYr() {
    try {
        let http_promise = createPromise();
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

async function store(data) {
    const account = "stapnesetstorage";
    const accountKey = process.env['STAPNESET_WEATHER_STORAGE_ACCOUNT_KEY'];
    const tableName = "tasktable";

    var tableSvc = azure.createTableService(account, accountKey);

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

    const account = "stapnesetstorage";
    const accountKey = process.env['STAPNESET_WEATHER_STORAGE_ACCOUNT_KEY'];
    const tableName = "tasktable";

    var tableSvc = azure.createTableService(account, accountKey);

    let weather_data = [];
    let missing = [];

    let date = new Date(Date.now() + 60*60000);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    
    for (i = 0; i < 3; i++) {
        let rowKey = date.toISOString().slice(0, -5)+"Z";
        
        let promise = new Promise(function(resolve, reject) {
            tableSvc.retrieveEntity('tasktable', 'taskNorway', rowKey, async function(error, result, response) {
                if(!error) {
                    // query was successful
                    weather_data.push(result);
                }
                else {
                    data = await fetchFromYr(rowKey);
                    await store(data);
                    weather_data.push(data.filter((entry) => {
                        return entry.RowKey === rowKey;
                    }));
                }
                resolve("Success");
            });
        });
        await promise;
        date.setHours(date.getHours() + 24);
    }

    const name = (req.query.name || (req.body && req.body.name));

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: JSON.stringify({"data": weather_data})
    };
}