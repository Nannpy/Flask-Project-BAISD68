from flask import Blueprint, request
from flask_jwt_extended import get_jwt_identity
from ..services.blog_service import BlogService
from ..utils.response import api_response
from ..utils.decorators import admin_required

blog_bp = Blueprint("blog", __name__, url_prefix="/api/blog")


@blog_bp.route("", methods=["GET"])
def list_posts():
    page = request.args.get("page", 1, type=int)
    per_page = request.args.get("per_page", 10, type=int)
    per_page = min(per_page, 50)  # cap at 50

    pagination = BlogService.get_posts(page=page, per_page=per_page)
    posts = [p.to_dict() for p in pagination.items]

    return api_response(data={
        "posts": posts,
        "total": pagination.total,
        "pages": pagination.pages,
        "current_page": pagination.page,
        "per_page": pagination.per_page,
        "has_next": pagination.has_next,
        "has_prev": pagination.has_prev,
    })


@blog_bp.route("/<string:slug>", methods=["GET"])
def get_post(slug):
    post = BlogService.get_by_slug(slug)
    if not post:
        return api_response(message="Post not found", success=False, status_code=404)
    return api_response(data=post.to_dict(include_content=True))


@blog_bp.route("", methods=["POST"])
@admin_required
def create_post():
    data = request.get_json()
    if not data:
        return api_response(message="Request body is required", success=False, status_code=400)

    title = data.get("title", "").strip()
    content = data.get("content", "").strip()

    if not title or not content:
        return api_response(message="Title and content are required", success=False, status_code=400)

    user_id = int(get_jwt_identity())
    post = BlogService.create(
        title=title,
        content=content,
        excerpt=data.get("excerpt"),
        cover_image=data.get("cover_image"),
        published=data.get("published", False),
        author_id=user_id,
    )
    return api_response(data=post.to_dict(include_content=True), message="Post created", status_code=201)


@blog_bp.route("/<int:post_id>", methods=["PUT"])
@admin_required
def update_post(post_id):
    post = BlogService.get_by_id(post_id)
    if not post:
        return api_response(message="Post not found", success=False, status_code=404)

    data = request.get_json()
    if not data:
        return api_response(message="Request body is required", success=False, status_code=400)

    post = BlogService.update(
        post,
        title=data.get("title"),
        content=data.get("content"),
        excerpt=data.get("excerpt"),
        cover_image=data.get("cover_image"),
        published=data.get("published"),
    )
    return api_response(data=post.to_dict(include_content=True), message="Post updated")


@blog_bp.route("/<int:post_id>", methods=["DELETE"])
@admin_required
def delete_post(post_id):
    post = BlogService.get_by_id(post_id)
    if not post:
        return api_response(message="Post not found", success=False, status_code=404)

    BlogService.delete(post)
    return api_response(message="Post deleted")
