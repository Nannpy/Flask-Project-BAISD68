from ..extensions import db
from ..models.blog import BlogPost


class BlogService:
    @staticmethod
    def get_posts(page: int = 1, per_page: int = 10, published_only: bool = True):
        query = BlogPost.query
        if published_only:
            query = query.filter_by(published=True)
        query = query.order_by(BlogPost.created_at.desc())
        pagination = query.paginate(page=page, per_page=per_page, error_out=False)
        return pagination

    @staticmethod
    def get_by_slug(slug: str) -> BlogPost | None:
        return BlogPost.query.filter_by(slug=slug).first()

    @staticmethod
    def get_by_id(post_id: int) -> BlogPost | None:
        return BlogPost.query.get(post_id)

    @staticmethod
    def create(title: str, content: str, excerpt: str = None,
               cover_image: str = None, published: bool = False,
               author_id: int = None) -> BlogPost:
        post = BlogPost(
            title=title,
            content=content,
            excerpt=excerpt,
            cover_image=cover_image,
            published=published,
            author_id=author_id,
        )
        post.generate_slug()
        db.session.add(post)
        db.session.commit()
        return post

    @staticmethod
    def update(post: BlogPost, **kwargs) -> BlogPost:
        for key, value in kwargs.items():
            if hasattr(post, key) and value is not None:
                setattr(post, key, value)
        if "title" in kwargs and kwargs["title"]:
            post.generate_slug()
        db.session.commit()
        return post

    @staticmethod
    def delete(post: BlogPost) -> None:
        db.session.delete(post)
        db.session.commit()
