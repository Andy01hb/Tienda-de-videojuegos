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
			// Global state for products, user, and token
			products: [],
			user: null,
			token: null
		},
		actions: {
			// Use getActions to call a function within a function
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
					setStore({ user: data.user, token: data.token });
					return data;
				} catch (error) {
					console.error("Error logging in", error);
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

			// NEW: Action to fetch purchase history (orders) from the backend
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

			// NEW: Action to fetch the user's library (purchased games) from the backend
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

			// NEW: Action to fetch featured promotions for the home page
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

			// NEW: Action to fetch testimonials for the home page
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

			// NEW: Action to fetch discount offers for the home page
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

			// NEW: Action to register a new user (optional: you can also call the endpoint directly in your Register page)
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
			}
		}
	};
};

export default getState;
