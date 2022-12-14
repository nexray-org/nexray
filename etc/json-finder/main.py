from jsonfinder import jsonfinder
import json

def run(request):
    """Responds to any HTTP request.
    Args:
        request (flask.Request): HTTP request object.
    Returns:
        The response text or any set of values that can be turned into a
        Response object using
        `make_response <http://flask.pocoo.org/docs/1.0/api/#flask.Flask.make_response>`.
    """

    if request.method == 'OPTIONS':
      headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Max-Age': '3600'
      }
      return ('', 204, headers)

    headers = {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    }

    request_json = request.get_json()
    if not request_json or not request_json['text'] or request.method.upper() != 'POST':
        return ({ "error": "No test body attribute found" }, 200, headers)
    else:
        objs_discovered = []
        for start, end, obj in jsonfinder(request_json['text']):
            if obj is not None and len(obj) > 0:
                objs_discovered.append([start, end, obj])
        return ({ "found": objs_discovered }, 200, headers)
