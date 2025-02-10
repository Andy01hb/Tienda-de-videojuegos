const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			// Global state para productos, usuario, token, carrito y wishlist
			products: [],
			user: null,
			token: null,
			cartItems: []
		},
		actions: {
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
					const data = await resp.json();
					setStore({ message: data.message });
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error);
				}
			},

			changeColor: (index, color) => {
				const store = getStore();
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});
				setStore({ demo: demo });
			},

			getProducts: async () => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/products");
					if (!resp.ok) throw new Error("Failed to fetch products");
					const data = await resp.json();
					setStore({ products: data });
					return data;
				} catch (error) {
					console.error("Error fetching products", error);
				}
			},

			loginUser: async (email, password) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/auth/login", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ email, password })
					});
					if (!resp.ok) throw new Error("Login failed");
					const data = await resp.json();
					// Actualizamos el store y persistimos el token
					setStore({ user: data.user, token: data.token });
					localStorage.setItem("token", data.token);
					return data;
				} catch (error) {
					console.error("Error logging in", error);
				}
			},

			logoutUser: () => {
				// Limpiamos el store y removemos el token
				setStore({ user: null, token: null });
				localStorage.removeItem("token");
			},

			loadTokenFromLocalStorage: () => {
				const token = localStorage.getItem("token");
				if (token) {
					setStore({ token: token });
					// Opcional: se puede realizar una petición para obtener la info del usuario o decodificar el token
				}
			},

			getWishlist: async () => {
				try {
					const store = getStore();
					const resp = await fetch(process.env.BACKEND_URL + "/api/wishlist", {
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${store.token}`
						}
					});
					if (!resp.ok) throw new Error("Failed to fetch wishlist");
					const data = await resp.json();
					return data;
				} catch (error) {
					console.error("Error fetching wishlist", error);
				}
			},

			addToWishlist: async (productId) => {
				try {
					const store = getStore();
					const resp = await fetch(process.env.BACKEND_URL + "/api/wishlist", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${store.token}`
						},
						body: JSON.stringify({ product_id: productId })
					});
					if (!resp.ok) throw new Error("Failed to add product to wishlist");
					const data = await resp.json();
					return data;
				} catch (error) {
					console.error("Error adding to wishlist", error);
				}
			},

			removeFromWishlist: async (wishlistId) => {
				try {
					const store = getStore();
					const resp = await fetch(`${process.env.BACKEND_URL}/api/wishlist/${wishlistId}`, {
						method: "DELETE",
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${store.token}`
						}
					});
					if (!resp.ok) throw new Error("Failed to remove item from wishlist");
					const data = await resp.json();
					return data;
				} catch (error) {
					console.error("Error removing from wishlist", error);
				}
			},

			updateUser: async (updatedData) => {
				try {
					const store = getStore();
					const resp = await fetch(process.env.BACKEND_URL + "/api/auth/update", {
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${store.token}`
						},
						body: JSON.stringify(updatedData)
					});
					if (!resp.ok) throw new Error("Failed to update user data");
					const data = await resp.json();
					setStore({ user: data.user });
					return data;
				} catch (error) {
					console.error("Error updating user", error);
				}
			},

			getOrders: async () => {
				try {
					const store = getStore();
					const resp = await fetch(process.env.BACKEND_URL + "/api/orders", {
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${store.token}`
						}
					});
					if (!resp.ok) throw new Error("Failed to fetch orders");
					const data = await resp.json();
					return data;
				} catch (error) {
					console.error("Error fetching orders", error);
				}
			},

			getLibrary: async () => {
				try {
					const store = getStore();
					const resp = await fetch(process.env.BACKEND_URL + "/api/library", {
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${store.token}`
						}
					});
					if (!resp.ok) throw new Error("Failed to fetch library");
					const data = await resp.json();
					return data;
				} catch (error) {
					console.error("Error fetching library", error);
				}
			},

			getPromotions: async () => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/home/promotions");
					if (!resp.ok) throw new Error("Failed to fetch promotions");
					const data = await resp.json();
					return data;
				} catch (error) {
					console.error("Error fetching promotions", error);
				}
			},

			getTestimonials: async () => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/home/testimonials");
					if (!resp.ok) throw new Error("Failed to fetch testimonials");
					const data = await resp.json();
					return data;
				} catch (error) {
					console.error("Error fetching testimonials", error);
				}
			},

			getDiscountOffers: async () => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/home/discounts");
					if (!resp.ok) throw new Error("Failed to fetch discount offers");
					const data = await resp.json();
					return data;
				} catch (error) {
					console.error("Error fetching discount offers", error);
				}
			},

			registerUser: async (email, password) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/auth/register", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ email, password })
					});
					if (!resp.ok) {
						const errorData = await resp.json();
						throw new Error(errorData.message || "Registration failed");
					}
					const data = await resp.json();
					return data;
				} catch (error) {
					console.error("Error registering user", error);
					throw error;
				}
			},

			addToCart: (product, quantity = 1) => {
				const store = getStore();
				const existingItem = store.cartItems.find(item => item.id === product.id);
				if (existingItem) {
					const updatedCart = store.cartItems.map(item =>
						item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
					);
					setStore({ cartItems: updatedCart });
				} else {
					setStore({ cartItems: [...store.cartItems, { ...product, quantity }] });
				}
			},

			updateCartItem: (id, newQuantity) => {
				const store = getStore();
				const updatedCart = store.cartItems.map(item =>
					item.id === id ? { ...item, quantity: newQuantity } : item
				);
				setStore({ cartItems: updatedCart });
			},

			removeFromCart: (id) => {
				const store = getStore();
				const updatedCart = store.cartItems.filter(item => item.id !== id);
				setStore({ cartItems: updatedCart });
			},

			clearCart: () => {
				setStore({ cartItems: [] });
			}
		}
	};
};

export default getState;
