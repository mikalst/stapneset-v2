import datetime
import logging
import requests
import os

import azure.functions as func
from azure.cosmosdb.table.tableservice import TableService
from azure.cosmosdb.table.models import Entity
from azure.cosmosdb.table.tablebatch import TableBatch


def upload():

    utc_timestamp = datetime.datetime.utcnow().replace(
        tzinfo=datetime.timezone.utc).isoformat()

    yr_req = requests.get('https://api.met.no/weatherapi/locationforecast/2.0/compact?altitude=50&lat=58.381492&lon=6.045954')

    table_service = TableService(
        account_name='stapnesetstorage',
        account_key=os.environ['STAPNESET_WEATHER_STORAGE_ACCOUNT_KEY']
    )

    batch = TableBatch()
    for obj in yr_req.json()['properties']['timeseries']:
        task = {
            'PartitionKey': 'taskNorway',
            'RowKey': str(obj['time'])
        }
        for key, value in (obj['data']['instant']['details']).items():
            task[key] = value
        batch.insert_or_replace_entity(task)

    table_service.commit_batch('tasktable', batch)
    
if __name__=='__main__':
    upload()