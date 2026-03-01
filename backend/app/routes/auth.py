from flask import Blueprint, request
from flask_jwt_extended import (
    create_access_token,
    get_jwt_identity,
    jwt_required,
    set_access_cookies,
    unset_jwt_cookies,
)
from ..services.auth_service import AuthService
from ..utils.response import api_response

auth_bp = Blueprint("auth", __name__, url_prefix="/api/auth")


@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    if not data:
        return api_response(message="Request body is required", success=False, status_code=400)

    email = data.get("email", "").strip()
    password = data.get("password", "")

    if not email or not password:
        return api_response(message="Email and password are required", success=False, status_code=400)
    if len(password) < 6:
        return api_response(message="Password must be at least 6 characters", success=False, status_code=400)

    user, error = AuthService.register(email, password)
    if error:
        return api_response(message=error, success=False, status_code=409)

    return api_response(data=user.to_dict(), message="Registration successful", status_code=201)


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    if not data:
        return api_response(message="Request body is required", success=False, status_code=400)

    email = data.get("email", "").strip()
    password = data.get("password", "")

    if not email or not password:
        return api_response(message="Email and password are required", success=False, status_code=400)

    user, error = AuthService.authenticate(email, password)
    if error:
        return api_response(message=error, success=False, status_code=401)

    access_token = create_access_token(identity=str(user.id))
    response_data, status_code = api_response(
        data=user.to_dict(), message="Login successful"
    )
    resp = response_data
    set_access_cookies(resp, access_token)
    return resp, status_code


@auth_bp.route("/logout", methods=["POST"])
def logout():
    response_data, status_code = api_response(message="Logout successful")
    resp = response_data
    unset_jwt_cookies(resp)
    return resp, status_code


@auth_bp.route("/me", methods=["GET"])
@jwt_required()
def me():
    user_id = get_jwt_identity()
    from ..models.user import User
    user = User.query.get(int(user_id))
    if not user:
        return api_response(message="User not found", success=False, status_code=404)
    return api_response(data=user.to_dict())
