import pytest
from app import create_app
from app.extensions import db


@pytest.fixture
def app():
    app = create_app("testing")
    with app.app_context():
        db.create_all()
        yield app
        db.drop_all()


@pytest.fixture
def client(app):
    return app.test_client()


def test_health_check(client):
    resp = client.get("/api/health")
    data = resp.get_json()
    assert resp.status_code == 200
    assert data["success"] is True
    assert data["data"]["status"] == "healthy"


def test_register(client):
    resp = client.post("/api/auth/register", json={
        "email": "test@example.com",
        "password": "test123"
    })
    data = resp.get_json()
    assert resp.status_code == 201
    assert data["success"] is True
    assert data["data"]["email"] == "test@example.com"


def test_register_duplicate(client):
    client.post("/api/auth/register", json={
        "email": "dup@example.com",
        "password": "test123"
    })
    resp = client.post("/api/auth/register", json={
        "email": "dup@example.com",
        "password": "test123"
    })
    assert resp.status_code == 409


def test_login(client):
    client.post("/api/auth/register", json={
        "email": "login@example.com",
        "password": "test123"
    })
    resp = client.post("/api/auth/login", json={
        "email": "login@example.com",
        "password": "test123"
    })
    data = resp.get_json()
    assert resp.status_code == 200
    assert data["success"] is True


def test_login_invalid(client):
    resp = client.post("/api/auth/login", json={
        "email": "nobody@example.com",
        "password": "wrong"
    })
    assert resp.status_code == 401


def test_blog_list_empty(client):
    resp = client.get("/api/blog")
    data = resp.get_json()
    assert resp.status_code == 200
    assert data["data"]["posts"] == []


def test_contact_validation(client):
    resp = client.post("/api/contact", json={
        "name": "",
        "email": "bad",
        "message": ""
    })
    assert resp.status_code == 400


def test_contact_submit(client):
    resp = client.post("/api/contact", json={
        "name": "John Doe",
        "email": "john@example.com",
        "company": "Acme Corp",
        "message": "Hello, I'm interested in your solutions."
    })
    data = resp.get_json()
    assert resp.status_code == 201
    assert data["success"] is True
