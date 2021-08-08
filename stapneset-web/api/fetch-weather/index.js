const azure = require('azure-storage');
const https = require('https');


async function fetchFromYr() {
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
    }).catch(function(reason) {
        throw new Error(reason);
    });

    let json = JSON.parse(await http_promise).properties.timeseries;

    return json;
}

function processFromYr(yrJson, rowKey) {
    var currentHour = rowKey;
    var data = {
        "current" : yrJson[0],
        "tomorrow" : yrJson[36 - currentHour],
        "dayafter" : yrJson[60 - currentHour]
    }
    return {
        "data": JSON.stringify(data),
        "RowKey": rowKey,
        "PartitionKey": rowKey
    };
}

async function store(tableSvc, tableName, data) {
    let promise = new Promise((resolve, reject) => {
        tableSvc.insertOrReplaceEntity(tableName, data, {echoContent: true}, function (error, result, response) {
            if(!error) {
                // Insertion completed
                resolve("Finished writing to table");
            }
            else{
                reject(error);
            }
        });
    }).catch(function(reason) {
        console.log(reason);
    });
    await promise;
}

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const connectionString = process.env['STORAGE_CONNECTION_STRING'];
    const tableName = process.env['STORAGE_TABLE_NAME'];

    var roundedDate = new Date().getHours();
    const rowKey = roundedDate.toString();

    try{
        var tableSvc = azure.createTableService(connectionString);

        var parsedWeatherData = {};
        var weatherData = {};

        let promise = new Promise(function(resolve, reject) {
            tableSvc.retrieveEntity(
                tableName,
                rowKey,
                rowKey,
                async function(error, result, response) {
                    if(!error) {
                        //Query was successful
                        weatherData = result;

                        console.log("Successfully fetched data from storage.");

                        parsedWeatherData = {
                            "data": JSON.parse(weatherData.data['_']),
                            "RowKey": weatherData.RowKey,
                            "PartitionKey": weatherData.PartitionKey
                        };

                        resolve("Success");
                    }
                    else {
                        console.debug("[DEBUG] Failed fetching from storage", error);

                        //Fetch data from yr
                        rawWeatherData = await fetchFromYr();
                        weatherData = processFromYr(rawWeatherData, rowKey);

                        //Store data to Azure
                        await store(tableSvc, tableName, weatherData);

                        console.log("[DEBUG] Successfully fetched and stored data from Yr.");
                        
                        parsedWeatherData = {
                            "data": JSON.parse(weatherData.data),
                            "RowKey": weatherData.RowKey,
                            "PartitionKey": weatherData.PartitionKey
                        };

                        resolve("Success");
                    }
                }
            );
        }).catch(function(reason) {
            throw new Error(reason);
        });

        await promise;
        
        console.log(parsedWeatherData);

        context.res = {
            body: JSON.stringify(parsedWeatherData)
        };
    }
    catch (error) {
        console.error(error);
        context.res = {
            body: JSON.stringify({"data": {"current": null, "tomorrow": null, "dayafter": null}})
        };
    }
}