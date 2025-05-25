# Getting Started with Create React App
✨ Key Functionalities Explanition
🔍 Top Navigation Bar
**Logo & Branding:** Displays the ShopIT logo and name, maintaining brand identity.

**Search Bar**: Allows the admin to search for a product by name across the platform.

**Cart Indicator:** Shows the number of items currently in the cart.

**Admin Profile** Dropdown: Includes options for viewing the admin profile or logging out.

**📊 Main Dashboard Area
🗓️ Date Filters**
Start Date & End Date Fields: Let the admin define a date range for filtering analytics (like sales and orders) between specific time frames.

Fetch Button: On click, triggers the dashboard to refresh and show filtered sales and order stats.

**📦 Stats Overview
Sales Card (Green):**

Displays total revenue ($0.00) generated in the selected date range.

Helps monitor performance in real-time.

Orders Card (Red):

Shows the number of orders (0) placed in the selected date range.

Useful for daily/weekly tracking.

**📂 Sidebar Navigation
1. Dashboard**
Default landing page showing key stats like sales and orders with date filters.

**2. New Product**
Redirects to a form where the admin can add a new product, including name, price, images, stock, etc.

**3. Products**
Displays a list of all existing products with options to edit or delete.

Helps manage inventory.

**4. Orders**
Lists all customer orders with statuses (e.g., pending, delivered).

Admins can update order statuses or view order details.

**5. Users**
Shows registered users of the platform.

Admins can view, manage, or remove users if needed.

**6. Reviews**
Displays all product reviews submitted by users.

Admins can approve, respond to, or remove inappropriate reviews.

⚙️ Dependencies
The following packages are required to run the ShopIT front-end:

Package	Purpose
React	Core library for building UI
React Router DOM	Client-side routing
Axios	API requests to backend
React Icons / FontAwesome	Icon library
Moment.js / Day.js (optional)	Date formatting
Bootstrap / Tailwind CSS / Custom CSS	Styling and layout
React Toastify	Notifications (toasts)
Chart.js / Recharts (optional)	Admin dashboard charts
React Hook Form / Formik (optional)	Advanced form handling

The exact list depends on your codebase. You can check in your package.json file.

**🧪 Installation Instructions
** Follow these steps to set up the ShopIT front-end locally:

**1. Clone the Repository**
bash
Copy
Edit
git clone https://github.com/your-username/ShopIT-frontend.git
cd ShopIT-frontend
**2. Install Dependencies**
Make sure you have Node.js installed.

bash
Copy
Edit
npm install
**3. Create a .env File**
Create a file named .env in the root directory and add your API base URL:

bash
Copy
Edit
REACT_APP_API_URL=http://localhost:5000/api
Replace with your actual backend URL or hosted API.

**🚀 Running the Front-End Locally**
bash
Copy
Edit
npm start
Runs the app in development mode.

Open http://localhost:3000 to view in your browser.

The page reloads when you make changes.

**🛠️ Build for Production**
bash
Copy
Edit
npm run build
Builds the app for production to the build/ folder.

It bundles React in optimized mode.
### Deployment



