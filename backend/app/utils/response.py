from flask import jsonify


def api_response(data=None, message="", success=True, status_code=200):
    """Standard API response wrapper."""
    return jsonify({"success": success, "data": data, "message": message}), status_code
