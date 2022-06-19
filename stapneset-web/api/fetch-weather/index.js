const https = require('https');

const { TableClient, TableServiceClient } = require("@azure/data-tables");

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

function processFromYr(yrJson, PartitionKey, RowKey) {
    var currentHour = RowKey;
    var data = {
        "current" : yrJson[0],
        "tomorrow" : yrJson[36 - currentHour],
        "dayafter" : yrJson[60 - currentHour]
    }
    return {
        data: JSON.stringify(data),
        RowKey: RowKey,
        PartitionKey: PartitionKey
    };
}

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const connectionString = process.env['STORAGE_CONNECTION_STRING'];
    const tableName = process.env['STORAGE_TABLE_NAME'];

    const PartitionKey = (new Date().toDateString()).replace(/\s/g, '-');
    const RowKey = new Date().getHours().toString();

    const tableSvc = TableClient.fromConnectionString(
        connectionString, tableName);

    var parsedWeatherData = {};
    var weatherData = {};
        
    try {
        var result = await tableSvc.getEntity(PartitionKey, RowKey);
        //Query was successful
        weatherData = result;

        console.log("[DEBUG] Successfully fetched data from storage.");

        parsedWeatherData = {
            data: JSON.parse(weatherData.data),
            RowKey: weatherData.RowKey,
            PartitionKey: weatherData.PartitionKey
        };
        context.res = {
            body: JSON.stringify(parsedWeatherData)
        };
        return;
    }
    catch (error) 
    {
        console.debug("[DEBUG] Failed fetching from storage ...", error);
        console.debug("[DEBUG] fetching from source.", error);
    }
    try {
        //Fetch data from yr
        rawWeatherData = await fetchFromYr();
        weatherData = processFromYr(rawWeatherData, PartitionKey, RowKey);
    }
    catch(error)
    {
        console.error("[ERROR] Failed when fetching from source.", error);
    }

    //Store data to Azure
    try {
        await tableSvc.createEntity(weatherData);
        console.debug("[DEBUG] Successfully fetched and stored data from Yr.");
    }
    catch (error) {
        console.error("[ERROR] Failed when storing response to Azure Storage:", error);
    }
    parsedWeatherData = {
        data: JSON.parse(weatherData.data),
        RowKey: weatherData.RowKey,
        PartitionKey: weatherData.PartitionKey
    };

    context.res = {
        body: JSON.stringify(parsedWeatherData)
    };
    return;
}