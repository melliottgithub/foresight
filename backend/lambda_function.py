import json
from service import analyze


def lambda_handler(event, context):
    params = event.get('body')
    if type(params) == str:
        params = json.loads(event.get('body'))

    response = None

    sequence = params.get('sequence')
    if (sequence is not None):
        return analyze(sequence)
    else:
        response = {
            'error': 'Invalid action'
        }

    return {
        'statusCode': 200,
        'body': json.dumps(response),
        'headers': {
            'Access-Control-Allow-Origin': '*',
        }
    }
