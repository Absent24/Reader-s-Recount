# Reader's Recount

**Reader's Recount** is a personal project built for learning purposes. This is the first working version, and I plan to add more features over time. It utilizes the OpenLibrary API to fetch book data, which is displayed in a dropdown menu during searches. The project allows users to create profiles, leave reviews, and manage their own reviews, along with viewing reviews made by other users.

## Live Demo

**Link** https://readers-recount.vercel.app/

## Features

Reader's Recount currently includes the following features:

- **Search for Books:** Users can search for any book available via the OpenLibrary API.
- **User Profiles:** Users can create a profile, edit their profile information, and view other users' profiles.
- **Reviews:** Users can leave a review on a book, view reviews made by other users, and edit or delete their own reviews.
- **Database Storage:** Profile information and reviewed books (along with reviews) are stored in the database.
- **Display Reviewed Books:** The homepage displays all books that have been reviewed.
- **Sort Reviewed Books:** Users can sort all books that have been reviewed by chosen criteria.

## Usage

1. View all reviews made by users on a page.
2. Search for any book using the OpenLibrary API.
3. Create a user profile (provided by Clerk).
4. Leave a review on a book.
5. Edit or delete your own reviews.
6. View reviews made by other users.

## Technologies/Dependencies

The project uses the following technologies:

- **Clerk**: For user authentication and profile management.
- **React**: Frontend JavaScript library for building the user interface.
- **Tailwind CSS**: Utility-first CSS framework for styling the application.
- **Next.js**: React framework for server-side rendering and static site generation.
- **Prisma**: ORM (Object-Relational Mapping) for database interactions.
- **Axios**: HTTP client for making API requests to OpenLibrary.
- **Supabase**: Used as the backend for storing data.
- **Zod**: TypeScript-first schema declaration and validation library.

## Contact Information

If you have any questions or want to get in touch, you can reach me at:

- **Email**: danijel.selja@gmail.com

## Project Motivation

This project is primarily for my own learning and skill development. In the future, I plan to enhance this application with additional features.

## Disclaimer

This project is not intended for installation or external use. It is being hosted on GitHub to allow for free hosting on Vercel and to showcase my code.
