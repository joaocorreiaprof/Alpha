# Alpha - Social Network Website

Alpha is a social network website inspired by Facebook. It allows users to connect, share, and engage with each other through posts, comments, and likes. The project is built with a focus on user authentication, profile management, and social interactions.

## Screenshots

## Live

Check out the live application on Railway: [Alpha](https://alpha-production.up.railway.app/)

## Mobile View

The site is fully optimized for mobile view, ensuring a seamless user experience across all devices.

## Features

- **User Authentication**:

  - Users must sign in to see anything except the sign-in page.
  - Users can sign in using Google authentication or email and password.

- **User Interactions**:

  - Users can send follow requests to other users.
  - Users can create text-only posts (support for videos and photos will be added later).
  - Users can like posts.
  - Users can comment on posts.
  - Posts display the post content, author, comments, and likes.

- **Profile Management**:

  - Users' profile pictures are fetched from Google if they sign in with Google. For email sign-ups, a default profile picture is set, which users can change later.
  - A user’s profile page contains their profile information, profile photo, cover image, posts, and friends.
  - Users can update their profile photo.

- **Index Pages**:
  - An index page for posts.
  - An index page for users, showing all users and buttons for sending follow requests to users the user is not already following or have a pending request.

## Project Structure

This project follows a well-structured organization to ensure maintainability and scalability:

### Server

```plaintext
Alpha-Server/

├── app.js              # Main application entry point
├── cloudinary.js       # Cloudinary configuration for file uploads
├── passport-config.js  # Passport.js configuration for authentication
├── controllers/        # Controllers for handling route logic
├── node_modules/       # Node.js dependencies (auto-generated)
├── package.json        # Project metadata and dependencies
├── package-lock.json   # Dependency tree lock file
├── prisma/             # Prisma schema and migrations
│   ├── migrations/     # Database migrations
│   └── schema.prisma   # Prisma schema file
├── public/             # Static assets (CSS, JS, images)
├── routes/             # Express route definitions
├── uploads/            # Local directory for temporarily storing uploaded files
├── views/              # EJS templates for server-side rendering

```

### Client

```plaintext
Alpha-Client/

├── src/
│   ├── assets/         # Static assets such as images and icons
│   ├── components/     # React components
│   │   ├── index.jsx   # Component entry point
│   │   └── index.css   # Component styles
│   ├── contexts/       # Context providers for state management
│   ├── hooks/          # Custom hooks
│   ├── layouts/        # Layout components
│   ├── pages/          # React pages
│   │   ├── index.jsx   # Page entry point
│   │   └── index.css   # Page styles
│   ├── services/       # Service-related code
│   ├── App.jsx         # Main App component
│   ├── index.jsx       # Main entry point
│   └── index.css       # Global styles
├── node_modules/       # Node.js dependencies (auto-generated)
├── package.json        # Project metadata and dependencies
├── package-lock.json   # Dependency tree lock file
├── public/             # Public assets
└── README.md           # Project documentation

```

- **Pages and Components**:

  - Each page and component has its own `index.jsx` and `index.css` file for better modularity and separation of concerns.

- **Hooks**:

  - Custom hooks are organized in the `hooks` folder, making them easily reusable across the application.

- **Services**:

  - All service-related code is placed in the `services` folder, ensuring a clear separation between business logic and UI components.

- **Assets**:

  - Static assets such as images and icons are managed in the `assets` folder.

- **Contexts**:

  - Context providers are organized in the `contexts` folder, facilitating state management across the application.

- **Layouts**:
  - Layout components are placed in the `layouts` folder, ensuring a consistent structure and design across different pages.

## Deployment

The application is deployed on Railway, making it accessible from anywhere without the need for local setup. The deployment process involved:

- Handling packages and scripts to ensure both the server and client are running smoothly.
- Managing environment variables for secure and efficient configuration.
- Setting up and maintaining the Prisma PostgreSQL database, including schema migrations and seeding.
- Configuring build and deployment pipelines to automate the deployment process.
- Ensuring seamless integration between the backend and frontend, with proper routing and API endpoints.

## Technologies Used

- **Backend**:

  - Node.js with Express for API routing and server-side logic.
  - Prisma ORM for database management.
  - Passport.js for authentication.
  - PostgreSQL for the relational database.

- **Frontend**:

  - React for building the front-end UI.
  - Vite as the build tool for the React app.
  - CSS for styling.

- **Authentication**:
  - Google OAuth for Google authentication.
  - JWT (JSON Web Tokens) for handling user authentication and authorization.

## Future Improvements

- Support for video and photo posts.
- Pagination or infinite scroll for better handling of large post and user lists.

## License

This project is licensed under the [MIT License](https://opensource.org/license/mit).

## Credits

- Developed by João Correia.
- Special thanks to the contributors and the resources that made this project possible. If you encounter any issues, feel free to open an issue or submit a pull request.
