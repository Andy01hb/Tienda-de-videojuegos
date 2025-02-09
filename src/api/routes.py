from flask import Blueprint, request, jsonify, url_for
from api.models import db, User, Product, Order, OrderItem, Wishlist, LibraryItem
from api.utils import APIException, generate_sitemap
from werkzeug.security import generate_password_hash, check_password_hash
import jwt, datetime
from flask_cors import CORS
from functools import wraps
import os
import random, string  # For generating download codes

api = Blueprint('api', __name__)
CORS(api)

# Use a secret key from environment or a default for JWT (do not use default in production)
JWT_SECRET = os.environ.get("JWT_SECRET", "mysecret")

def token_required(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        token = None
        if "Authorization" in request.headers:
            auth_header = request.headers["Authorization"]
            parts = auth_header.split()
            if len(parts) == 2 and parts[0] == "Bearer":
                token = parts[1]
        if not token:
            return jsonify({"message": "Token is missing!"}), 401
        try:
            data = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
            current_user = User.query.get(data["user_id"])
            if not current_user:
                return jsonify({"message": "User not found"}), 401
        except Exception as e:
            return jsonify({"message": "Token is invalid!", "error": str(e)}), 401
        return f(current_user, *args, **kwargs)
    return decorator

# -------------------------
# Authentication Endpoints
# -------------------------
@api.route("/auth/register", methods=["POST"])
def register():
    data = request.get_json()
    if not data or not "email" in data or not "password" in data:
        return jsonify({"message": "Email and password required"}), 400
    email = data["email"]
    password = data["password"]
    if User.query.filter_by(email=email).first():
        return jsonify({"message": "User already exists"}), 400
    hashed_password = generate_password_hash(password)
    new_user = User(email=email, password=hashed_password, is_active=True, role="client")
    db.session.add(new_user)
    db.session.commit()
    return jsonify(new_user.serialize()), 201

@api.route("/auth/login", methods=["POST"])
def login():
    data = request.get_json()
    if not data or not "email" in data or not "password" in data:
        return jsonify({"message": "Email and password required"}), 400
    email = data["email"]
    password = data["password"]
    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password, password):
        return jsonify({"message": "Invalid credentials"}), 401
    token = jwt.encode(
        {"user_id": user.id, "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=24)},
        JWT_SECRET,
        algorithm="HS256"
    )
    return jsonify({"token": token, "user": user.serialize()}), 200

# -------------------------
# Product Endpoints
# -------------------------
@api.route("/products", methods=["GET"])
def get_products():
    products = Product.query.all()
    return jsonify([p.serialize() for p in products]), 200

@api.route("/products", methods=["POST"])
@token_required
def create_product(current_user):
    if current_user.role != "admin":
        return jsonify({"message": "Not authorized"}), 403
    data = request.get_json()
    new_product = Product(
        title=data.get("title"),
        description=data.get("description"),
        price=data.get("price"),
        category=data.get("category"),
        stock=data.get("stock", 0),
        image_url=data.get("image_url")
    )
    db.session.add(new_product)
    db.session.commit()
    return jsonify(new_product.serialize()), 201

@api.route("/products/<int:product_id>", methods=["PUT"])
@token_required
def update_product(current_user, product_id):
    if current_user.role != "admin":
        return jsonify({"message": "Not authorized"}), 403
    product = Product.query.get(product_id)
    if not product:
        return jsonify({"message": "Product not found"}), 404
    data = request.get_json()
    product.title = data.get("title", product.title)
    product.description = data.get("description", product.description)
    product.price = data.get("price", product.price)
    product.category = data.get("category", product.category)
    product.stock = data.get("stock", product.stock)
    product.image_url = data.get("image_url", product.image_url)
    db.session.commit()
    return jsonify(product.serialize()), 200

@api.route("/products/<int:product_id>", methods=["DELETE"])
@token_required
def delete_product(current_user, product_id):
    if current_user.role != "admin":
        return jsonify({"message": "Not authorized"}), 403
    product = Product.query.get(product_id)
    if not product:
        return jsonify({"message": "Product not found"}), 404
    db.session.delete(product)
    db.session.commit()
    return jsonify({"message": "Product deleted"}), 200

# -------------------------
# Orders Endpoints
# -------------------------
@api.route("/orders", methods=["POST"])
@token_required
def create_order(current_user):
    data = request.get_json()
    items_data = data.get("items", [])
    if not items_data:
        return jsonify({"message": "No items provided"}), 400
    total = 0
    order_items = []
    library_items = []  # To store new library items
    for item in items_data:
        product = Product.query.get(item["product_id"])
        if not product:
            return jsonify({"message": f"Product with id {item['product_id']} not found"}), 404
        quantity = item["quantity"]
        if product.stock < quantity:
            return jsonify({"message": f"Not enough stock for {product.title}"}), 400
        total += product.price * quantity
        order_item = OrderItem(
            product_id=product.id,
            quantity=quantity,
            price=product.price
        )
        order_items.append(order_item)
        product.stock -= quantity

        # Create library items for each quantity purchased
        for i in range(quantity):
            download_code = "GAME-" + "".join(random.choices(string.ascii_uppercase + string.digits, k=6))
            library_item = LibraryItem(
                user_id=current_user.id,
                product_id=product.id,
                download_code=download_code
            )
            library_items.append(library_item)
    new_order = Order(
        user_id=current_user.id,
        total=total,
        items=order_items
    )
    db.session.add(new_order)
    # Add library items to the session
    for item in library_items:
        db.session.add(item)
    db.session.commit()
    return jsonify(new_order.serialize()), 201

@api.route("/orders", methods=["GET"])
@token_required
def get_orders(current_user):
    orders = Order.query.filter_by(user_id=current_user.id).all()
    return jsonify([order.serialize() for order in orders]), 200

# -------------------------
# Wishlist Endpoints
# -------------------------
@api.route("/wishlist", methods=["GET"])
@token_required
def get_wishlist(current_user):
    wishlist_items = Wishlist.query.filter_by(user_id=current_user.id).all()
    return jsonify([item.serialize() for item in wishlist_items]), 200

@api.route("/wishlist", methods=["POST"])
@token_required
def add_to_wishlist(current_user):
    data = request.get_json()
    product_id = data.get("product_id")
    if not product_id:
        return jsonify({"message": "Product id is required"}), 400
    existing = Wishlist.query.filter_by(user_id=current_user.id, product_id=product_id).first()
    if existing:
        return jsonify({"message": "Product already in wishlist"}), 400
    new_item = Wishlist(user_id=current_user.id, product_id=product_id)
    db.session.add(new_item)
    db.session.commit()
    return jsonify(new_item.serialize()), 201

@api.route("/wishlist/<int:item_id>", methods=["DELETE"])
@token_required
def remove_from_wishlist(current_user, item_id):
    item = Wishlist.query.get(item_id)
    if not item or item.user_id != current_user.id:
        return jsonify({"message": "Item not found"}), 404
    db.session.delete(item)
    db.session.commit()
    return jsonify({"message": "Item removed from wishlist"}), 200

# -------------------------
# Library Endpoints
# -------------------------
@api.route("/library", methods=["GET"])
@token_required
def get_library(current_user):
    library_items = LibraryItem.query.filter_by(user_id=current_user.id).all()
    return jsonify([item.serialize() for item in library_items]), 200

# -------------------------
# Reviews Endpoint (Simple Implementation)
# -------------------------
@api.route("/reviews", methods=["POST"])
@token_required
def add_review(current_user):
    data = request.get_json()
    product_id = data.get("product_id")
    comment = data.get("comment")
    rating = data.get("rating")
    if not product_id or not comment or not rating:
        return jsonify({"message": "Missing data"}), 400
    review = {
        "user_id": current_user.id,
        "product_id": product_id,
        "comment": comment,
        "rating": rating
    }
    return jsonify(review), 201

# -------------------------
# NEW: Home Page Endpoints
# -------------------------

@api.route("/home/promotions", methods=["GET"])
def get_promotions():
    promotions = [
        {
            "id": 1,
            "title": 'Lanzamiento Destacado: "Aventura Épica"',
            "description": 'Descubre el nuevo mundo de Aventura Épica con un 20% de descuento por tiempo limitado.',
            "imageUrl": "https://forum.xboxera.com/uploads/default/original/2X/1/13f2199320bb47c3b0658cfe603057b2f0a2b41b.jpeg"
        }
    ]
    return jsonify(promotions), 200

@api.route("/home/testimonials", methods=["GET"])
def get_testimonials():
    testimonials = [
        {
            "id": 1,
            "user": "Juan Pérez",
            "comment": "¡La mejor tienda de videojuegos en línea! Atención impecable y ofertas increíbles.",
            "rating": 5
        },
        {
            "id": 2,
            "user": "María Gómez",
            "comment": "Encuentro siempre los juegos que busco. ¡Muy recomendable!",
            "rating": 4
        }
    ]
    return jsonify(testimonials), 200

@api.route("/home/discounts", methods=["GET"])
def get_discount_offers():
    discount_offers = [
        {
            "id": 1,
            "title": 'Oferta Flash: 50% en "Aventura Épica"',
            "expiresAt": (datetime.datetime.utcnow() + datetime.timedelta(hours=1)).isoformat() + "Z",
            "imageUrl": "https://press-start.com.au/wp-content/uploads/2023/01/games-coming-in-february-770x433.jpg"
        }
    ]
    return jsonify(discount_offers), 200

@api.route("/sitemap", methods=["GET"])
def sitemap():
    return generate_sitemap(api)
