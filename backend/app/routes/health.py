from flask import Blueprint
from ..utils.response import api_response

health_bp = Blueprint("health", __name__, url_prefix="/api")


@health_bp.route("/health", methods=["GET"])
def health_check():
    return api_response(data={"status": "healthy", "service": "kbon-api"}, message="OK")
