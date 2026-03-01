from ..extensions import db
from ..models.user import User


class AuthService:
    @staticmethod
    def register(email: str, password: str, role: str = "user") -> tuple[User | None, str | None]:
        if User.query.filter_by(email=email).first():
            return None, "Email already registered"
        user = User(email=email, role=role)
        user.set_password(password)
        db.session.add(user)
        db.session.commit()
        return user, None

    @staticmethod
    def authenticate(email: str, password: str) -> tuple[User | None, str | None]:
        user = User.query.filter_by(email=email).first()
        if not user or not user.check_password(password):
            return None, "Invalid email or password"
        return user, None
