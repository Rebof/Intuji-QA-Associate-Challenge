## 📁 Project Overview

This repository contains a Cypress-based UI test suite designed to validate various user flows including registration, login, product search, cart management, and checkout for automationexercise.com.

## 🖥️ OS Compatibility Notice

> ⚠️ **Important for Windows/macOS Users:**

This repository was initialized and configured on a **Linux system**. If you are cloning or downloading this repo on **Windows or macOS**, you may face issues such as:

- Incompatibility with shell scripts (e.g., `bash` or `rm` commands).
- Permissions or path issues with files and folders.
- Pre-installed folders like `node_modules/`, `.cache/`, or `.git/` being incompatible or bloated.

### 🔧 Recommended Actions for Windows/macOS Users

1. After cloning, **delete the `node_modules` folder** if it exists:
   - On Windows (Command Prompt):
     ```
     rmdir /s /q node_modules
     ```
   - On macOS/Linux:
     ```
     rm -rf node_modules
     ```

2. Reinstall fresh dependencies:
   npm init -y
   npm install cypress faker
   npx cypress open


4. If you encounter permission issues, try: chmod -R 755

5. If you get Cypress execution issues, reinstall Cypress


🛠️ Tools & Plugins Used

| Tool           | Purpose                                  |
| -------------- | ---------------------------------------- |
| Cypress        | End-to-end testing framework             |
| Faker          | Generate dynamic fake data               |
| cy.session()   | Persist user sessions across tests       |


🧱 Folder Structure
├── cypress/
│   ├── e2e/                # Test specs
│   ├── fixtures/           # Static JSON data
│   └── support/            # Custom commands and helpers
├── node_modules/
├── package.json
├── cypress.config.js


⚠️ Known Limitations

    Uploaded Full Cypress Folder:
    Due to initial commit, the full Cypress structure including possible node_modules may be included. It’s recommended to clean and reinstall as outlined above.

    Known Bug in Test Case TC_UI_007:
    Invalid product detail pages still show product information due to a known frontend bug. This is expected to fail until fixed.

✅ Author
Rebof Katwal
📧 rebofkatwal7@gmail.com
📅 Date: 2025-05-26

Note:
I have been working on the same project just a few days ago. The previous version was more rigid and less dynamic.
In this current version, I have enhanced the project to be more dynamic and scalable and improving the overall structure.
You can find the previous version here: https://github.com/Rebof/Ecommerce-e2e-cypress
This older repository also includes separate appointment booking tests from a different website and additional test cases as well.
Due to my prior experience with the project, completing this improved version was much faster.

Thank you!





