import json
from service import analyze


def lambda_handler(event, context):
    params = event.get('body')
    if type(params) == str:
        params = json.loads(event.get('body'))

    response = None

    action = params.get('action')
    if (action == 'analyze'):
        return analyze(params.get('sequence')
    else:
        response = {
            'error': 'Invalid action'
        }

    return {
        'statusCode': 200,
        'body': json.dumps(response)
    }
