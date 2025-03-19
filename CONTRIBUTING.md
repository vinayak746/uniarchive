# Contributing to UniArchive

Thank you for your interest in contributing to UniArchive! We welcome contributions from everyone.

## Getting Started

1.  **Fork the repository:** Click the "Fork" button in the top right corner of the GitHub page.
2.  **Clone your fork:**

    ```bash
    git clone [https://github.com/your-username/uniarchive.git](https://www.google.com/search?q=https://github.com/your-username/uniarchive.git)
    cd uniarchive
    ```

3.  **Create a branch:**

    ```bash
    git checkout -b feature/your-feature-name
    ```

    or

    ```bash
    git checkout -b bugfix/your-bugfix-name
    ```

4.  **Install dependencies:**

    ```bash
    cd server
    yarn # or npm install
    cd ../client
    yarn # or npm install
    ```

5.  **Create `.env` files:**

    - Create `.env` files in both the `server` and `client` directories based on the `.env.example` files.
    - Populate the `.env` files with the required environment variables.
    - Refer to the `.env.example` files in the `server` and `client` directories for the list of required variables and their expected formats.

6.  **Make your changes:** Implement your feature or bug fix.

7.  **Commit your changes:**

    ```bash
    git add .
    git commit -m "Add your feature or fix your bug"
    ```

8.  **Push your changes:**

    ```bash
    git push origin feature/your-feature-name
    ```

9.  **Create a pull request:** Go to the original repository on GitHub and click the "New pull request" button.

## Contribution Guidelines

- **Issues:**
  - Use GitHub issues to report bugs, suggest features, or propose changes.
  - Search existing issues before creating new ones.
  - Use clear and descriptive titles and provide detailed descriptions.
  - Use relevant labels (e.g., `bug`, `feature`, `frontend`, `backend`).
  - Include screenshots or code snippets when necessary.
- **TODO.md:**
  - Refer to the `TODO.md` files in the `client` and `server` directories for tasks to work on.
  - Remove completed tasks from the `TODO.md` files.
- **Code Quality:**
  - Use Prettier for code formatting. You can install it as a plugin in your editor.
  - Validate all incoming data using Zod. Please refer to the Zod documentation for examples.
  - Write clear and concise code with proper comments.
- **Code Reviews:**
  - All pull requests will be reviewed for functionality, readability, maintainability, security, and adherence to best practices.
  - Provide constructive feedback on pull requests.
- **Communication:**
  - Use GitHub issues for discussions and questions.

## Coding Standards

- Follow the existing coding style and conventions.
- Write clear and concise code.
- Add comments to explain complex logic.
- Use meaningful variable and function names.
- Use Prettier for code formatting.
- Use Zod for data validation.

## Reporting Bugs

- When reporting bugs, please include:
  - A clear and descriptive title.
  - Steps to reproduce the bug.
  - The expected behavior.
  - The actual behavior.
  - Any relevant error messages or screenshots.

## Suggesting Features

- When suggesting features, please include:
  - A clear and descriptive title.
  - A detailed description of the feature.
  - Any relevant use cases.
  - Any potential benefits or drawbacks.

## Thank You!

We appreciate your contributions to UniArchive!
