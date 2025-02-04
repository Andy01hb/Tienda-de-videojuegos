import click
from api.models import db, User, Product

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
            print("User:", user.email, "created.")
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
            print("Product:", product.title, "created.")
        print("All test products created")
