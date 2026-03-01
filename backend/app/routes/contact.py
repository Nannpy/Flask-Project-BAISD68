import re
from flask import Blueprint, request
from ..extensions import db, limiter
from ..models.contact import ContactMessage
from ..utils.response import api_response

contact_bp = Blueprint("contact", __name__, url_prefix="/api/contact")

EMAIL_REGEX = re.compile(r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")


@contact_bp.route("", methods=["POST"])
@limiter.limit("5 per hour")
def submit_contact():
    data = request.get_json()
    if not data:
        return api_response(message="Request body is required", success=False, status_code=400)

    name = data.get("name", "").strip()
    email = data.get("email", "").strip()
    message = data.get("message", "").strip()
    company = data.get("company", "").strip()

    # Validation
    errors = []
    if not name:
        errors.append("Name is required")
    if not email:
        errors.append("Email is required")
    elif not EMAIL_REGEX.match(email):
        errors.append("Invalid email format")
    if not message:
        errors.append("Message is required")
    if len(message) > 5000:
        errors.append("Message must be under 5000 characters")

    if errors:
        return api_response(message="; ".join(errors), success=False, status_code=400)

    contact = ContactMessage(
        name=name,
        email=email,
        company=company if company else None,
        message=message,
    )
    db.session.add(contact)
    db.session.commit()

    return api_response(
        data=contact.to_dict(),
        message="Thank you for your message. We'll get back to you soon.",
        status_code=201,
    )
