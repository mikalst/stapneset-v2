const AzureTables = require("@azure/data-tables");

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const account = "stapnesetstorage";
    const accountKey = process.env.STAPNESET_WEATHER_STORAGE_ACCOUNT_KEY;
    const tableName = "tasktable";

    const credential = new AzureTables.TablesSharedKeyCredential(account, accountKey);
    const client = new AzureTables.TableClient(
        `https://${account}.table.core.windows.net`,
        tableName,
        credential
    );

    let weather_data = [];

    let date = new Date();
    date.setHours(12, 0, 0, 0);
    
    for (i = 0; i < 3; i++) {
        let rowKey = date.toISOString().slice(0, -5)+"Z";
        let entity = await client.getEntity("taskNorway", rowKey);

        let sixHourPeriod = {
            'time': entity._response.parsedBody['RowKey'],
            'time_formatted':
                ['Sun',
                'Mon',
                'Tue',
                'Wed',
                'Thu',
                'Fri',
                'Sat'][date.getDay()],
            'air_temperature': entity._response.parsedBody['air_temperature'],
            'cloud_area_fraction': entity._response.parsedBody['cloud_area_fraction'],
            'cloud_icon':
                ['wb_sunny',
                'filter_drama',
                'wb_cloudy'][Math.floor(0.029999*entity._response.parsedBody['cloud_area_fraction'])],
            'wind_speed': entity._response.parsedBody['wind_speed']
        }

        weather_data.push(sixHourPeriod)

        date.setHours(date.getHours() + 24);
    }

    const name = (req.query.name || (req.body && req.body.name));

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: weather_data
    };
}