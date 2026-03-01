"""
CLI commands for managing the Kbon app.
Usage:
    flask --app run seed    # Seeds the database
"""
import click
from flask.cli import with_appcontext
from .utils.seed import seed_database


def register_cli(app):
    @app.cli.command("seed")
    @with_appcontext
    def seed():
        """Seed the database with sample data."""
        click.echo("Seeding database...")
        seed_database()
        click.echo("Done!")
