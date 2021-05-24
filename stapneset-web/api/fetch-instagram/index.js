const azure = require('azure-storage');
const https = require('https');


async function fetchFromIg() {
    try {
        let url = `https://graph.instagram.com/${process.env['IG_USER_ID']}`
            + `/media?access_token=${process.env['IG_ACCESS_TOKEN']}&fields=id`
            + `,username,media_type,media_url`;
        let http_promise = new Promise((resolve, reject) => {
            https.get(url, {headers: {}}, (response) => {
                let chunks_of_data = [];
    
                response.on('data', (fragment) => {
                    chunks_of_data.push(fragment);
                });
    
                response.on('end', () => {
                    let response_body = Buffer.concat(chunks_of_data);
                    console.log(response_body.toString());
                    resolve(response_body.toString());
                });
    
                response.on('error', (error) => {
                    reject(error);
                }, );
            });
        });

        let json = JSON.parse(await http_promise).data;
        return json;
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    try{
        data = await fetchFromIg();
        context.res = {
            body: JSON.stringify({"data": data})
        };
    }
    catch (error) {
        console.log(error);
        context.res = {
            body: JSON.stringify({"data": [null, null]})
        };
    }
}