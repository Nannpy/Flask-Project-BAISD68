import logging
from flask import Flask, jsonify
from .config import config_map
from .extensions import db, jwt, limiter, migrate

def create_app(config_name="development"):
    app = Flask(__name__)
    app.config.from_object(config_map[config_name])

    # ── Logging ──────────────────────────────────────────────
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    )
    app.logger.setLevel(logging.INFO)

    # ── Extensions ───────────────────────────────────────────
    db.init_app(app)
    jwt.init_app(app)
    limiter.init_app(app)
    migrate.init_app(app, db)

    # ── CORS ─────────────────────────────────────────────────
    from flask_cors import CORS
    CORS(
        app,
        resources={r"/api/*": {"origins": app.config.get("CORS_ORIGINS", "*")}},
        supports_credentials=True,
    )

    # ── Blueprints ───────────────────────────────────────────
    from .routes.auth import auth_bp
    from .routes.blog import blog_bp
    from .routes.contact import contact_bp
    from .routes.health import health_bp

    app.register_blueprint(health_bp)
    app.register_blueprint(auth_bp)
    app.register_blueprint(blog_bp)
    app.register_blueprint(contact_bp)

    # ── Error handlers ───────────────────────────────────────
    @app.errorhandler(400)
    def bad_request(e):
        return jsonify(success=False, data=None, message=str(e.description)), 400

    @app.errorhandler(404)
    def not_found(e):
        return jsonify(success=False, data=None, message="Resource not found"), 404

    @app.errorhandler(405)
    def method_not_allowed(e):
        return jsonify(success=False, data=None, message="Method not allowed"), 405

    @app.errorhandler(429)
    def rate_limit(e):
        return jsonify(success=False, data=None, message="Rate limit exceeded. Try again later."), 429

    @app.errorhandler(500)
    def internal_error(e):
        app.logger.error(f"Internal error: {e}")
        return jsonify(success=False, data=None, message="Internal server error"), 500

    # ── JWT error handlers ───────────────────────────────────
    @jwt.expired_token_loader
    def expired_token(jwt_header, jwt_payload):
        return jsonify(success=False, data=None, message="Token has expired"), 401

    @jwt.invalid_token_loader
    def invalid_token(error):
        return jsonify(success=False, data=None, message="Invalid token"), 401

    @jwt.unauthorized_loader
    def missing_token(error):
        return jsonify(success=False, data=None, message="Authorization required"), 401

    # ── Create tables ────────────────────────────────────────
    # ── CLI commands ────────────────────────────────────────
    from .cli import register_cli
    register_cli(app)

    with app.app_context():
        from . import models  # noqa: F401
        db.create_all()

    return app
