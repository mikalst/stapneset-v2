const https = require('https');
const { DefaultAzureCredential } = require("@azure/identity");
const { SecretClient } = require("@azure/keyvault-secrets");



module.exports = async function (context, myTimer) {

    // DefaultAzureCredential expects the following three environment variables:
    // * AZURE_TENANT_ID: The tenant ID in Azure Active Directory
    // * AZURE_CLIENT_ID: The application (client) ID registered in the AAD tenant
    // * AZURE_CLIENT_SECRET: The client secret for the registered application
    const credential = new DefaultAzureCredential();
    const vaultName = "stapneset-keyvault";
    const url = `https://${vaultName}.vault.azure.net`;

    const client = new SecretClient(url, credential);
    const secretName = "ig-api-access-token";
    const igAccessToken = await (await client.getSecret(secretName)).value;
    
    let urlRefresh = "https://graph.instagram.com/refresh_access_token?"
        + `grant_type=ig_refresh_token&access_token=${igAccessToken}`;

    let http_promise = new Promise((resolve, reject) => {
        https.get(urlRefresh, {headers: {}}, (response) => {
            let chunks_of_data = [];

            response.on('data', (fragment) => {
                chunks_of_data.push(fragment);
            });

            response.on('end', () => {
                let response_body = Buffer.concat(chunks_of_data);
                resolve(response_body.toString());
            });

            response.on('error', (error) => {
                console.log.error(error);
                reject(error);
            }, );
        });
    });

    try {
        let igRefreshedAccessToken = JSON.parse(await http_promise).access_token;
        await client.setSecret(secretName, igRefreshedAccessToken);
    
        context.log('Successfully refreshed token at', new Date());   
    }
    catch (ex) {
        console.log.error(ex);
    }

};