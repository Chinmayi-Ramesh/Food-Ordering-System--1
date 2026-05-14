# CraveIt - Full-Stack Food Ordering System
## Project Documentation

### 1. Project Overview
CraveIt is a modern, responsive, full-stack web application tailored for online food ordering. The system allows users to browse a dynamic menu, add items to a persistent cart, securely log in, place orders, and track or cancel their order history. It features a custom "Dark Mode" UI built entirely with native CSS to provide a premium user experience.

### 2. Technology Stack (MERN)
* **Frontend:** React.js, Vite, React Router, Context API
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Local), Mongoose ORM
* **Security & Auth:** JSON Web Tokens (JWT), bcrypt.js, Axios

---

### 3. Application Architecture & File Roles

#### **A. Frontend (`/src`)**
The frontend is built using component-based architecture for maximum reusability.

* **`main.jsx` & `App.jsx`**: The entry points of the application. They configure the React Router for page navigation and wrap the app in the global context provider.
* **`Context/StoreContext.jsx`**: The "brain" of the frontend. It uses React's Context API to manage global state (the user's authentication token, the current cart items, and live search queries). It automatically synchronizes the cart with `localStorage` so data isn't lost if the page refreshes.
* **`components/`**: Reusable UI blocks.
  * **`Navbar/`**: Contains navigation links, dynamic profile/login buttons, and the live search bar.
  * **`LoginPopup/`**: A floating modal that handles both User Registration and Sign-In seamlessly.
  * **`ExploreMenu/` & `FoodDisplay/`**: Components that map through the `food_list` array and render individual dishes. Features category filtering and live-text search functionality.
  * **`FoodItem/`**: Individual card for a dish, featuring dynamic "Add to Cart" counters.
* **`pages/`**: The main route views.
  * **`Cart/`**: Displays chosen items, calculates subtotals, applies delivery fees, and computes the grand total.
  * **`PlaceOrder/`**: The checkout form capturing user delivery details.
  * **`MyOrders/`**: A protected dashboard where logged-in users can view their past/current orders and cancel them.

#### **B. Backend (`/backend`)**
The backend follows strict **MVC (Model-View-Controller)** architecture principles.

* **`server.js`**: The Express server initialization file. It connects to the database, configures CORS, and mounts the API routes.
* **`config/db.js`**: Establishes the connection to the MongoDB instance (`mongodb://127.0.0.1:27017/foodDB`).
* **`models/` (Data Layer)**: Mongoose schemas defining database structure.
  * `User.js`: Stores user emails, hashed passwords, and local cart data.
  * `Order.js`: Stores exact order details (items, amounts, addresses, and status).
* **`controllers/` (Logic Layer)**: Where the core business logic happens.
  * `userController.js`: Handles encrypting passwords (`bcrypt`), checking credentials, and issuing JWT tokens upon successful login.
  * `orderController.js`: Handles creating new orders, fetching a specific user's orders, and deleting (cancelling) orders.
* **`routes/` (Routing Layer)**: Maps incoming HTTP requests to specific controller functions (e.g., POST `/api/orders/cancel` triggers `cancelOrder`).
* **`middleware/auth.js`**: A security middleware. It intercepts protected requests, decrypts the JWT token, and securely injects the `userId` into the request so users can only access their own data.

---

### 4. Core Workflows (How It Works)

#### **Authentication Workflow**
1. User enters credentials into the `LoginPopup` component.
2. Frontend sends an Axios POST request to `/api/auth/register` or `/api/auth/login`.
3. The `userController` validates the data, hashes the password (if registering), and generates a secure JWT.
4. The JWT is returned to the frontend, saved in `localStorage`, and tracked by `StoreContext`. The UI immediately updates to show the user's profile dropdown.

#### **Cart & Checkout Workflow**
1. User clicks "+" on a `FoodItem`. The ID is added to the `cartItems` object in `StoreContext`.
2. When navigating to `/cart` or `/placeorder`, the user reviews and fills out delivery details.
3. The frontend packages the address data and cart total into a JSON payload and sends a POST request to `/api/orders`.
4. The `orderController` saves this new document directly into the MongoDB `Order` collection.

#### **Order Tracking & Cancellation Workflow**
1. When opening `/myorders`, the frontend requests `/api/orders/userorders`, passing the JWT in the headers.
2. `auth.js` verifies the token and retrieves the exact user ID.
3. MongoDB returns only the orders belonging to that ID.
4. If the user clicks "Cancel Order", an API call is made to `/api/orders/cancel` with the Order ID. The backend verifies ownership and deletes the document, instantly reflecting on the frontend.

---

### 5. Running the Project Locally
To run the full-stack environment, two terminal instances are required:

**1. Start Backend:**
Navigate to `/backend` and run:
```bash
npm start
```
*(Runs nodemon server on port 5000, connects to local MongoDB)*

**2. Start Frontend:**
Navigate to the root directory and run:
```bash
npm run dev
```
*(Runs Vite React server on port 5173)*
