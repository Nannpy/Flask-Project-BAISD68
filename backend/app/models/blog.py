from datetime import datetime, timezone
from slugify import slugify
from ..extensions import db


class BlogPost(db.Model):
    __tablename__ = "blog_posts"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(300), nullable=False)
    slug = db.Column(db.String(350), unique=True, nullable=False, index=True)
    excerpt = db.Column(db.Text, nullable=True)
    content = db.Column(db.Text, nullable=False)
    cover_image = db.Column(db.String(500), nullable=True)
    published = db.Column(db.Boolean, default=False)
    author_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = db.Column(
        db.DateTime,
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
    )

    author = db.relationship("User", backref="posts", lazy=True)

    def generate_slug(self) -> None:
        base = slugify(self.title)
        slug = base
        counter = 1
        while BlogPost.query.filter_by(slug=slug).first() is not None:
            slug = f"{base}-{counter}"
            counter += 1
        self.slug = slug

    def to_dict(self, include_content: bool = False) -> dict:
        data = {
            "id": self.id,
            "title": self.title,
            "slug": self.slug,
            "excerpt": self.excerpt,
            "cover_image": self.cover_image,
            "published": self.published,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }
        if include_content:
            data["content"] = self.content
        return data
