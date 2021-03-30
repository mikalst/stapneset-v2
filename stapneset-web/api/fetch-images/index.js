const { BlobServiceClient } = require("@azure/storage-blob");

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
        
    if (req.query.list=='true' || (req.body && req.body.list=='true')){
        let blobs = containerClient.listBlobsFlat();
        let filenames_obj = {
            filenames: []
        };
        for await (const blob of blobs){
            filenames_obj.filenames.push(blob.name);
        }
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: filenames_obj
        };
    }
    else if (req.query.file || (req.body && req.body.file)) {
        const blobClient = containerClient.getBlobClient((req.query.file) || (req.body.name));
        const downloadBlockBlobResponse = await blobClient.download();
        const downloaded = new Uint8Array(
            await streamToBuffer(downloadBlockBlobResponse.readableStreamBody)
          );
        //console.log("Downloaded blob content:", downloaded);
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: downloaded
        };
    }
}