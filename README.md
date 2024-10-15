**Expense Tracker and Management App**
This is a full-featured, responsive expense tracking and management application, built with React, TypeScript, Chakra UI, React Query, and Axios. It allows users to track expenses, manage their finances, set spending limits, and view their spending habits by category.

**Features**
**General Features:**

*User Authentication:* Secure account creation and login with email and password. Sessions are managed via localStorage.

*Responsive Design:* The application adjusts seamlessly across mobile, tablet, and desktop screen sizes.

*Error Handling:* Intuitive feedback when incorrect data is entered or issues arise during form submissions.

**Expense Management:**

*Add Expenses:* Add new expenses by selecting a category, entering the amount, and optionally attaching a description or image.

*View Expenses:* Display expenses in a sortable table, organized by category or amount.

*Edit and Delete Expenses:* Modify or remove existing expense entries directly from the table.

*Expense Limit Tracking:* Set income and spending limits, and monitor how much has been spent in each category.

*Data Persistence:* All data is managed with React Query and Axios to handle data fetching, posting, and updating.

**Income and Limit Management:**

*Set Income and Limits:* Users can input their total income and assign spending limits across predefined categories (Housing, Transport, Food, etc.).

*Category-Specific Colors:* Categories are color-coded for easier tracking of spending habits.

**Technologies Used**

*React:* Dynamic, component-based UI framework.

*TypeScript:* Ensures type safety and enhances development with static typing.

*Chakra UI:* Accessible, responsive component library for quick and flexible UI development.

*React Query:* Efficient server-state management with data fetching, caching, and synchronization.

*Axios:* Promise-based HTTP client for making API requests.

*React Router:* Handles navigation and routing between pages.

*FileReader API:* Converts images to base64 format for easy attachment to expenses.

**Components Overview**

*AddExpenses*

Form for adding new expenses, with fields for category, amount, description, and optional image upload.
Submits data using the custom usePostExpense hook.

*Expenses*

Displays a table of all expenses, including total amount spent and remaining balance.
Allows users to sort, edit, and delete expenses directly from the table.

*ChangeValue*

Allows users to edit the amount of any given expense with a popover input, making quick updates simple.

*Expensestables*

A reusable table component for displaying expenses, with sorting, editing, and deletion capabilities.


**Setup and Installation**


Prerequisites
Node.js installed on your machine.
npm or Yarn as the package manager.

git clone https://github.com/melvinsjostrand/Ekonomisk-Dashboard
cd Ekonomsik

npm install
yarn install


yarn start
npm run start


