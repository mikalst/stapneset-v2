const azure = require('azure-storage');
const https = require('https');
const { DefaultAzureCredential } = require("@azure/identity");
const { SecretClient } = require("@azure/keyvault-secrets");


async function fetchFromIg() {
    // DefaultAzureCredential expects the following three environment variables:
    // * AZURE_TENANT_ID: The tenant ID in Azure Active Directory
    // * AZURE_CLIENT_ID: The application (client) ID registered in the AAD tenant
    // * AZURE_CLIENT_SECRET: The client secret for the registered application
    const credential = new DefaultAzureCredential();
    const vaultName = "stapneset-keyvault";
    const url = `https://${vaultName}.vault.azure.net`;

    const client = new SecretClient(url, credential);
    const secretName = "ig-api-access-token";

    try {
        const igAccessToken = await (await client.getSecret(secretName)).value;
        let url = `https://graph.instagram.com/${process.env['IG_API_USER_ID']}`
            + `/media?access_token=${igAccessToken}&fields=id`
            + `,username,media_type,media_url,caption`;
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