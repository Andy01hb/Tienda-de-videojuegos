import click 
from api.models import db, User, Product, Order, OrderItem, Wishlist

def setup_commands(app):
    @app.cli.command("insert-test-users")
    @click.argument("count")
    def insert_test_users(count):
        print("Creating test users")
        for x in range(1, int(count) + 1):
            user = User(
                email=f"test_user{x}@test.com",
                password="123456",  # In a real app, use hashed passwords
                is_active=True,
                role="client"
            )
            db.session.add(user)
        db.session.commit()
        print("All test users created")

    @app.cli.command("insert-test-products")
    @click.argument("count")
    def insert_test_products(count):
        print("Creating test products")
        for x in range(1, int(count) + 1):
            product = Product(
                title=f"Test Game {x}",
                description="This is a test game",
                price=19.99 + x,
                category="Action",
                stock=10,
                image_url="https://via.placeholder.com/300x200?text=Test+Game"
            )
            db.session.add(product)
        db.session.commit()
        print("All test products created")

    @app.cli.command("insert-test-orders")
    @click.argument("count")
    def insert_test_orders(count):
        print("Creating test orders")
        users = User.query.all()
        products = Product.query.all()
        for x in range(1, int(count) + 1):
            if users and products:
                user = users[x % len(users)]
                order = Order(
                    user_id=user.id,
                    total=0
                )
                db.session.add(order)
                db.session.commit()
                total = 0
                for product in products[:3]:  # Add first 3 products to order
                    order_item = OrderItem(
                        order_id=order.id,
                        product_id=product.id,
                        quantity=1,
                        price=product.price
                    )
                    db.session.add(order_item)
                    total += product.price
                order.total = total
                db.session.commit()
                print(f"Order {order.id} created for user {user.email}.")
        print("All test orders created")

    @app.cli.command("insert-test-wishlist")
    @click.argument("count")
    def insert_test_wishlist(count):
        print("Creating test wishlists")
        users = User.query.all()
        products = Product.query.all()
        for user in users:
            for product in products[:int(count)]:
                wishlist_item = Wishlist(
                    user_id=user.id,
                    product_id=product.id
                )
                db.session.add(wishlist_item)
            db.session.commit()
            print(f"Wishlist created for user {user.email}.")
        print("All test wishlists created")
