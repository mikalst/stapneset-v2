const { BlobServiceClient, BlobSASPermissions, CommonGenerateSasUrlOptions } = require("@azure/storage-blob");

async function streamToBuffer(readableStream) {
    return new Promise((resolve, reject) => {
      const chunks = [];
      readableStream.on("data", (data) => {
        chunks.push(data instanceof Buffer ? data : Buffer.from(data));
      });
      readableStream.on("end", () => {
        resolve(Buffer.concat(chunks));
      });
      readableStream.on("error", reject);
    });
}

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const blobServiceClient = BlobServiceClient.fromConnectionString(
        process.env['STORAGE_CONNECTION_STRING']);

    const containerClient = blobServiceClient.getContainerClient(
        process.env['STORAGE_IMAGES_BLOB_CONTAINER_NAME']);

    let blobs = containerClient.listBlobsFlat();
    let urls = [];

    const sasOptions = {
        permissions : BlobSASPermissions.parse("read")
    };
    sasOptions.startsOn = new Date();
    sasOptions.expiresOn = new Date();
    sasOptions.expiresOn.setHours(new Date().getHours() + 1);
    console.log(sasOptions.expiresOn);
    console.log(sasOptions.startsOn);

    for await (const blob of blobs){
        let blobClient = containerClient.getBlobClient(blob.name);
        urls.push(await blobClient.generateSasUrl(sasOptions));
    }
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: urls
    };
}