# 🧪 E-commerce UI Test Suite with Cypress

This repository contains a **Cypress-based end-to-end (E2E) testing framework** for validating key user flows on [automationexercise.com](https://automationexercise.com). It includes tests for:

- ✅ User Registration  
- ✅ Login & Logout  
- ✅ Product Search  
- ✅ Cart Management  
- ✅ Checkout Process  

---

## ⚙️ Project Setup

### 📦 Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Cypress](https://www.cypress.io/)

---

### 🛠️ Installation

```bash
git clone https://github.com/Rebof/Intuji-QA-Associate-Challenge.git
npm init -y
npm install cypress faker
npx cypress open
```

---

## ⚠️ OS Compatibility Notice

> 🖥️ This project was originally configured on **Linux**. Windows and macOS users may encounter the following issues:

- Incompatibility with shell scripts (`bash`, `rm`, etc.)
- Path-related errors or permission issues
- Presence of pre-existing `node_modules/`, `.cache/`, or `.git/` folders

### ✅ Recommended Fixes

1. **Delete existing `node_modules/` folder:**
   - **Windows (CMD):**
     ```
     rmdir /s /q node_modules
     ```
   - **macOS/Linux:**
     ```
     rm -rf node_modules
     ```

2. **Reinstall dependencies:**
   ```bash
   npm install cypress faker
   ```

3. **Fix permissions (Linux/macOS only):**
   ```bash
   chmod -R 755 .
   ```

4. **If Cypress fails to execute**, try:
   ```bash
   npx cypress install
   ```

---

## 🧰 Tools & Technologies

| Tool         | Description                             |
| ------------ | --------------------------------------- |
| Cypress      | Main E2E testing framework              |
| Faker        | Dynamic test data generation            |
| `cy.session()` | Maintains session across test files    |

---

## 📂 Folder Structure

```
├── cypress/
│   ├── e2e/           # Test specifications
│   ├── fixtures/      # Static JSON data
│   └── support/       # Custom commands and helpers
├── node_modules/
├── cypress.config.js
├── package.json
```

---

## 🐞 Known Issues

- **Initial Commit Size:**  
  The uploaded repo may contain large pre-installed folders like `node_modules`. Clean and reinstall as shown above for stability.

- **Test Case Bug – `TC_PO_007`:**  
  Invalid product pages still render product details due to a **known frontend issue**. This test is expected to fail until resolved.

---

## 🔁 Previous Version

An earlier version of this project, which I had been working on, is available here: 
🔗 [Old Repo - Ecommerce-e2e-cypress](https://github.com/Rebof/Ecommerce-e2e-cypress)  
This version includes:

- Appointment booking tests from another platform  
- More rigid test design  
- Additional test scenarios

The current repository is a refined, **more dynamic and scalable** version, leveraging my earlier experience for faster and cleaner development.

---

## 👨‍💻 Author

**Rebof Katwal**  
📧 rebofkatwal7@gmail.com  
📅 *Last Updated: May 26, 2025*

---

## 🙏 Acknowledgements

Thanks for checking out this repository. Feel free to raise issues or submit PRs if you notice bugs or have suggestions! 🚀
