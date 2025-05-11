Absolutely — here’s a clean, well-structured **README.md** for your project that covers all 5 Cypress tests you’ve been working on. You can copy-paste this into a `README.md` file at your project root.

---

# AutomationExercise Cypress Test Suite

This project contains **Cypress end-to-end tests** for validating key user workflows on [AutomationExercise.com](https://automationexercise.com).
It covers **user registration**, **login/logout**, **cart management**, **checkout flow**, and **session persistence** — using real data and randomization via **CSV** and **Faker.js**.

---

## 📂 **Test Files**

| **Spec File**              | **Description**                                                                       |
| -------------------------- | ------------------------------------------------------------------------------------- |
| `userRegistration.cy.js`   | Registers a new user with Faker-generated data and saves credentials to a CSV file    |
| `logoutRelogin.cy.js`      | Verifies logout and re-login flow, ensuring cart persistence                          |
| `cartManagement.cy.js`     | Adds products to cart, updates quantity, verifies totals, and removes item            |
| `checkoutFlow.cy.js`       | Logs in as a random user, completes checkout with fake payment, verifies confirmation |
| `sessionPersistence.cy.js` | Verifies that user session persists across reloads using stored cookies               |

---

## 🚀 **Setup Instructions**

1️⃣ **Clone the repository**

```bash
git clone github.com:KTRYSUJATA/Intuji-QA-Associate-Challenge.git
cd Intuji-QA-Associate-Challenge
```

2️⃣ **Install dependencies**

```bash
npm install
```

3️⃣ **Install PapaParse for CSV handling**

```bash
npm install papaparse
```

4️⃣ **Ensure your file structure looks like:**

```
cypress/
├── e2e/
│   ├── userRegistration.cy.js
│   ├── logoutRelogin.cy.js
│   ├── cartManagement.cy.js
│   ├── checkoutFlow.cy.js
│   ├── sessionPersistence.cy.js
├── fixtures/
│   └── registeredUsers.csv
├── support/
│   ├── commands.js
│   └── utils/
│       └── getRandomUser.js
cypress.config.js
package.json
```

---

## 📊 **CSV File Format** (for saved users)

```
email,password
testuser1@example.com,test123
testuser2@example.com,test456
...
```

CSV file is stored in:
`cypress/fixtures/registeredUsers.csv`

---

## ✨ **Reusable Utilities**

We have a **custom Cypress command** for reusing random user selection from CSV:

```js
cy.getRandomUserFromCSV().then((user) => {
  cy.log(user.email);
});
```

Or alternatively (via utility function):

```js
import { getRandomUser } from '../support/utils/getRandomUser';

getRandomUser().then((user) => {
  cy.log(user.email);
});
```

---

## ▶️ **How to run tests**

**Run all tests headlessly:**

```bash
npx cypress run
```

**Open Cypress Test Runner UI:**

```bash
npx cypress open
```

Then select the `.cy.js` spec files to run them.

---

## ⚙️ **Technologies Used**

* **Cypress** — end-to-end testing framework
* **Faker.js** — realistic random test data
* **PapaParse** — CSV parsing
* **JavaScript (ES6)**

---

## 📝 **Test Descriptions**

1️⃣ **User Registration & Save to CSV**
Generates random user data and registers a new user.
Saves email + password to `registeredUsers.csv` for reuse.

2️⃣ **Logout & Re-login with Cart Persistence**
Logs in, adds item to cart, logs out, logs back in — verifies cart is still intact.

3️⃣ **Cart Management**
Adds two products, updates quantity of one, removes the other — verifies cart state + totals.

4️⃣ **Checkout Flow with Fake Payment**
Logs in as random user, adds item to cart, proceeds to checkout, enters fake card, verifies success.

5️⃣ **Session Persistence**
Stores cookies post-login and verifies session persists after page reload.




