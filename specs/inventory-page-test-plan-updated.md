# Saucedemo Inventory Page - Comprehensive Test Plan

## Application Overview

The Inventory page is a product listing interface for the Saucedemo e-commerce application. It displays a catalog of available products with key features including:

- **Product Display**: Grid layout showing product images, names, descriptions, and prices
- **Sorting Functionality**: Dropdown to sort products by name (A-Z, Z-A) and price (low to high, high to low)
- **Product Navigation**: Clickable product links to view detailed product pages
- **Cart Management**: Add/Remove items from shopping cart with real-time badge counter
- **Shopping Cart Access**: Badge counter in header showing number of items in cart
- **Responsive Layout**: Header with menu button, logo, product filter/sort controls, and cart badge

## Priority Levels

- **P0 (Critical)**: Core functionality that must work. Failures block user workflows and prevent basic operations. These tests should be automated first.
- **P1 (High)**: Important features that enhance user experience. Failures impact significant user flows but may have workarounds.
- **P2 (Medium)**: Nice-to-have features and edge cases. Failures have minimal impact on primary workflows.

## Test Coverage Summary

| Priority | Count | Sections |
|----------|-------|----------|
| **P0 (Critical)** | 7 | Page Load (1.1, 1.2), Add to Cart (4.1, 4.2, 4.3), Cart Access (5.1, 5.2) |
| **P1 (High)** | 15 | Sorting (2.1-2.5), Product Navigation (3.1-3.4), Remove from Cart (4.4, 4.5), Cart Link (5.3), Header (7.1) |
| **P2 (Medium)** | 12 | Product Info (6.1-6.3), Menu (7.2), Layout (8.1-8.2), Edge Cases (9.1-9.3), Footer (10.1-10.2) |

---

## Test Scenarios

### 1. Page Load and Initial State

#### 1.1 Inventory Page Loads Successfully
**Priority:** P0 (Critical) | **Status:** ✅ Implemented

**Assumptions:** User is logged in with valid credentials (standard_user / secret_sauce)

**Steps:**
1. Navigate to https://www.saucedemo.com/inventory.html
2. Verify the page fully loads without errors
3. Confirm the page displays all 6 products in the grid
4. Verify sorting dropdown is present and set to "Name (A to Z)" by default
5. Verify cart badge shows "0" or is not visible (empty cart)
6. Verify the header contains "Swag Labs" logo
7. Verify the "Products" heading is displayed

**Expected Results:**
- Page loads completely within reasonable time
- All 6 products are visible: Sauce Labs Backpack, Sauce Labs Bike Light, Sauce Labs Bolt T-Shirt, Sauce Labs Fleece Jacket, Sauce Labs Onesie, Test.allTheThings() T-Shirt (Red)
- Default sort order is "Name (A to Z)"
- Cart badge is not visible or shows 0 items
- All product elements (images, names, descriptions, prices) are properly rendered
- Page title shows "Swag Labs"

**Rationale:** This is the foundation test. Users cannot proceed if the page doesn't load or products aren't visible.

---

#### 1.2 Page Redirects Non-Logged-In Users
**Priority:** P0 (Critical) | **Status:** ✅ Implemented

**Assumptions:** User is not logged in

**Steps:**
1. Navigate directly to https://www.saucedemo.com/inventory.html without logging in
2. Observe page behavior

**Expected Results:**
- Page redirects to login page (https://www.saucedemo.com/)
- Error message displays: "Epic sadface: You can only access '/inventory.html' when you are logged in."
- User cannot access inventory page without valid authentication

**Rationale:** Security-critical. Prevents unauthorized access to protected pages.

---

### 2. Product Sorting Functionality

#### 2.1 Sort Products by Name (A to Z)
**Priority:** P1 (High) | **Status:** ⏳ Not Implemented

**Assumptions:** User is logged in and on inventory page

**Steps:**
1. Click on the sorting dropdown
2. Select "Name (A to Z)" option
3. Observe product order

**Expected Results:**
- Products are displayed in alphabetical order from A to Z
- Order is: Sauce Labs Backpack, Sauce Labs Bike Light, Sauce Labs Bolt T-Shirt, Sauce Labs Fleece Jacket, Sauce Labs Onesie, Test.allTheThings() T-Shirt (Red)
- Dropdown shows "Name (A to Z)" as selected option

**Rationale:** Core sorting feature that helps users find products efficiently.

---

#### 2.2 Sort Products by Name (Z to A)
**Priority:** P1 (High) | **Status:** ⏳ Not Implemented

**Assumptions:** User is logged in and on inventory page

**Steps:**
1. Click on the sorting dropdown
2. Select "Name (Z to A)" option
3. Observe product order

**Expected Results:**
- Products are displayed in reverse alphabetical order from Z to A
- Order is: Test.allTheThings() T-Shirt (Red), Sauce Labs Onesie, Sauce Labs Fleece Jacket, Sauce Labs Bolt T-Shirt, Sauce Labs Bike Light, Sauce Labs Backpack
- Dropdown shows "Name (Z to A)" as selected option

**Rationale:** Alternative sorting option that completes the name-based sorting feature set.

---

#### 2.3 Sort Products by Price (Low to High)
**Priority:** P1 (High) | **Status:** ⏳ Not Implemented

**Assumptions:** User is logged in and on inventory page

**Steps:**
1. Click on the sorting dropdown
2. Select "Price (low to high)" option
3. Observe product order and prices

**Expected Results:**
- Products are sorted by price from lowest to highest
- Order is: Sauce Labs Onesie ($7.99), Sauce Labs Bike Light ($9.99), Sauce Labs Bolt T-Shirt ($15.99), Test.allTheThings() T-Shirt (Red) ($15.99), Sauce Labs Backpack ($29.99), Sauce Labs Fleece Jacket ($49.99)
- Dropdown shows "Price (low to high)" as selected option

**Rationale:** Price sorting is highly relevant for e-commerce users seeking budget-friendly options.

---

#### 2.4 Sort Products by Price (High to Low)
**Priority:** P1 (High) | **Status:** ⏳ Not Implemented

**Assumptions:** User is logged in and on inventory page

**Steps:**
1. Click on the sorting dropdown
2. Select "Price (high to low)" option
3. Observe product order and prices

**Expected Results:**
- Products are sorted by price from highest to lowest
- Order is: Sauce Labs Fleece Jacket ($49.99), Sauce Labs Backpack ($29.99), Sauce Labs Bolt T-Shirt ($15.99), Test.allTheThings() T-Shirt (Red) ($15.99), Sauce Labs Bike Light ($9.99), Sauce Labs Onesie ($7.99)
- Dropdown shows "Price (high to low)" as selected option

**Rationale:** Completes the price-based sorting options for flexible product discovery.

---

#### 2.5 Sort Persistence After Page Interactions
**Priority:** P1 (High) | **Status:** ⏳ Not Implemented

**Assumptions:** User is logged in and on inventory page

**Steps:**
1. Select "Price (low to high)" sort option
2. Add a product to cart
3. View the inventory page (if redirected away)
4. Observe the sort order

**Expected Results:**
- Selected sort order is maintained after adding items to cart
- Products remain sorted by price (low to high)

**Rationale:** Ensures sorting preference persists across user interactions, improving usability.

---

### 3. Product Selection and Navigation

#### 3.1 Click Product Image to View Details
**Priority:** P1 (High) | **Status:** ⏳ Not Implemented

**Assumptions:** User is logged in and on inventory page

**Steps:**
1. Click on the product image for "Sauce Labs Backpack"
2. Wait for page to load
3. Verify page content

**Expected Results:**
- User is navigated to product detail page URL: https://www.saucedemo.com/inventory-item.html?id=4
- Product name "Sauce Labs Backpack" is displayed
- Product description is displayed
- Product price "$29.99" is displayed
- Product image is displayed
- "Add to cart" button is present
- "Back to products" button is present

**Rationale:** Primary method for users to view detailed product information before purchase.

---

#### 3.2 Click Product Name Link to View Details
**Priority:** P1 (High) | **Status:** ⏳ Not Implemented

**Assumptions:** User is logged in and on inventory page

**Steps:**
1. Click on the product name link for "Sauce Labs Bike Light"
2. Wait for page to load
3. Verify page content

**Expected Results:**
- User is navigated to product detail page URL: https://www.saucedemo.com/inventory-item.html?id=0
- Product name "Sauce Labs Bike Light" is displayed
- Product description is displayed
- Product price "$9.99" is displayed
- Product image is displayed

**Rationale:** Alternative navigation path to product details; ensures all entry points work.

---

#### 3.3 Navigate Back from Product Details
**Priority:** P1 (High) | **Status:** ⏳ Not Implemented

**Assumptions:** User is on a product detail page

**Steps:**
1. Click "Back to products" button
2. Wait for page to load

**Expected Results:**
- User is navigated back to inventory page URL: https://www.saucedemo.com/inventory.html
- Inventory page is displayed with all products
- Previous sort order is maintained (if any was applied)

**Rationale:** Essential for user navigation flow; ensures users can easily return to product listing.

---

#### 3.4 View All Product Details
**Priority:** P1 (High) | **Status:** ⏳ Not Implemented

**Assumptions:** User is logged in and on inventory page

**Steps:**
1. Click on each product (image or name link) and verify details can be viewed
2. Products to test: Sauce Labs Backpack, Sauce Labs Bike Light, Sauce Labs Bolt T-Shirt, Sauce Labs Fleece Jacket, Sauce Labs Onesie, Test.allTheThings() T-Shirt (Red)

**Expected Results:**
- Each product has a unique detail page with correct information
- All product detail pages display product image, name, description, and price
- All product detail pages have functional "Back to products" button

**Rationale:** Comprehensive test ensuring all products have properly configured detail pages.

---

### 4. Add to Cart Functionality

#### 4.1 Add Single Product to Cart
**Priority:** P0 (Critical) | **Status:** ✅ Implemented

**Assumptions:** User is logged in, on inventory page, and cart is empty

**Steps:**
1. Locate "Sauce Labs Backpack" product
2. Click "Add to cart" button for this product
3. Observe cart badge
4. Observe button state change

**Expected Results:**
- Cart badge appears in header showing "1"
- "Add to cart" button changes to "Remove" button
- Product remains in the inventory list
- No page navigation occurs

**Rationale:** Core e-commerce functionality. Without this, users cannot purchase products.

---

#### 4.2 Add Multiple Products to Cart
**Priority:** P0 (Critical) | **Status:** ✅ Implemented

**Assumptions:** User is logged in and on inventory page

**Steps:**
1. Click "Add to cart" for Sauce Labs Onesie
2. Click "Add to cart" for Sauce Labs Bike Light
3. Click "Add to cart" for Test.allTheThings() T-Shirt (Red)
4. Observe cart badge

**Expected Results:**
- Cart badge updates to show "3" (or cumulative count)
- All three products show "Remove" button instead of "Add to cart"
- Other products still show "Add to cart" button
- All products remain visible on page

**Rationale:** Validates that cart can handle multiple items and badge updates correctly.

---

#### 4.3 Cart Badge Updates Correctly
**Priority:** P0 (Critical) | **Status:** ✅ Implemented

**Assumptions:** User is logged in and on inventory page

**Steps:**
1. Add 5 different products to cart one by one
2. Observe cart badge after each addition

**Expected Results:**
- Cart badge increments correctly with each product added
- Badge shows "1", then "2", then "3", then "4", then "5"
- Badge is always visible in the header near the cart icon

**Rationale:** Real-time cart feedback is critical for user confidence in the shopping process.

---

#### 4.4 Remove Product from Cart
**Priority:** P1 (High) | **Status:** ⏳ Not Implemented

**Assumptions:** User has items in cart and is on inventory page

**Steps:**
1. Locate a product with "Remove" button (previously added to cart)
2. Click "Remove" button for that product

**Expected Results:**
- Button changes from "Remove" back to "Add to cart"
- Cart badge count decreases by 1
- If cart becomes empty, cart badge disappears or shows "0"
- Product remains visible on inventory page

**Rationale:** Users need the ability to change their shopping selections before checkout.

---

#### 4.5 Remove All Products from Cart
**Priority:** P1 (High) | **Status:** ⏳ Not Implemented

**Assumptions:** User has multiple items in cart and is on inventory page

**Steps:**
1. Click "Remove" button for each product that's in the cart
2. Continue until all items are removed

**Expected Results:**
- Each removal decreases cart badge count correctly
- When last item is removed, cart badge disappears or shows "0"
- All products show "Add to cart" button
- No errors occur during removal process

**Rationale:** Ensures cart can be fully cleared, allowing users to restart their shopping session.

---

### 5. Cart Access and Navigation

#### 5.1 Navigate to Cart from Inventory Page
**Priority:** P0 (Critical) | **Status:** ✅ Implemented

**Assumptions:** User is logged in, has items in cart, and is on inventory page

**Steps:**
1. Verify cart badge shows a count (e.g., "1")
2. Click on the cart badge or cart icon
3. Wait for page to load

**Expected Results:**
- User is navigated to cart page URL: https://www.saucedemo.com/cart.html
- Page title shows "Swag Labs"
- "Your Cart" heading is displayed
- Cart contains the expected items with correct quantities and prices
- Cart badge still shows correct item count

**Rationale:** Essential pathway to checkout. Without this, users cannot proceed to purchase.

---

#### 5.2 Cart Badge Reflects Current Items
**Priority:** P0 (Critical) | **Status:** ✅ Implemented

**Assumptions:** User has added items to cart

**Steps:**
1. Add 2 products to cart
2. Navigate away from inventory page
3. Return to inventory page
4. Observe cart badge

**Expected Results:**
- Cart badge persists and shows "2" on inventory page
- Cart badge shows consistent count across page navigation
- Cart state is maintained in session

**Rationale:** Cart persistence is fundamental to session management and user trust.

---

#### 5.3 Cart Link in Header Works
**Priority:** P1 (High) | **Status:** ⏳ Not Implemented

**Assumptions:** User is logged in and on inventory page with items in cart

**Steps:**
1. Verify cart badge is clickable
2. Click cart badge/link
3. Verify navigation to cart page

**Expected Results:**
- Cart badge is clickable (has cursor pointer)
- Clicking navigates to cart page
- Cart contents are displayed accurately

**Rationale:** Accessibility check ensuring cart is easily accessible via standard header link.

---

### 6. Product Information Accuracy

#### 6.1 Product Prices Display Correctly
**Priority:** P2 (Medium) | **Status:** ⏳ Not Implemented

**Assumptions:** User is logged in and on inventory page

**Steps:**
1. Verify all product prices are displayed
2. Check that prices match expected values

**Expected Results:**
- Sauce Labs Backpack: $29.99
- Sauce Labs Bike Light: $9.99
- Sauce Labs Bolt T-Shirt: $15.99
- Sauce Labs Fleece Jacket: $49.99
- Sauce Labs Onesie: $7.99
- Test.allTheThings() T-Shirt (Red): $15.99

**Rationale:** Data accuracy is important but covered by integration tests. Display testing is lower priority.

---

#### 6.2 Product Descriptions Display Correctly
**Priority:** P2 (Medium) | **Status:** ⏳ Not Implemented

**Assumptions:** User is logged in and on inventory page

**Steps:**
1. Verify each product has a description
2. Check that descriptions are meaningful and readable
3. Verify descriptions are not truncated

**Expected Results:**
- Each product displays complete description text
- Descriptions provide useful information about the product
- No broken or missing description text
- Descriptions are relevant to the product

**Rationale:** Content validation; important for UX but doesn't block core workflows.

---

#### 6.3 Product Images Load Successfully
**Priority:** P2 (Medium) | **Status:** ⏳ Not Implemented

**Assumptions:** User is logged in and on inventory page

**Steps:**
1. Verify all product images are visible
2. Check that images load properly (not broken)
3. Verify image alt text is present

**Expected Results:**
- All 6 products have images displayed
- Images are properly sized and visible
- No broken image icons
- Images have appropriate alt text for accessibility

**Rationale:** Visual and accessibility testing; important for UX but doesn't block core functionality.

---

### 7. Header and Navigation Elements

#### 7.1 Header Elements Are Present and Functional
**Priority:** P1 (High) | **Status:** ✅ Partially Implemented

**Assumptions:** User is logged in and on inventory page

**Steps:**
1. Verify "Swag Labs" logo/text is present in header
2. Verify menu button is present
3. Verify cart badge is present
4. Verify "Products" heading is visible

**Expected Results:**
- All header elements are displayed
- Logo is clickable and navigates appropriately
- Menu button is functional
- Cart badge is visible and updates dynamically

**Rationale:** Header is primary navigation interface; users depend on these elements to navigate.

---

#### 7.2 Menu Button Opens Navigation Menu
**Priority:** P2 (Medium) | **Status:** ⏳ Not Implemented

**Assumptions:** User is logged in and on inventory page

**Steps:**
1. Click "Open Menu" button
2. Observe menu behavior

**Expected Results:**
- Menu opens/displays
- Menu contains navigation options
- Menu is accessible and functional

**Rationale:** Menu is secondary navigation. While useful, core workflows don't depend on it.

---

### 8. Responsive Layout and Display

#### 8.1 Products Display in Grid Layout
**Priority:** P2 (Medium) | **Status:** ⏳ Not Implemented

**Assumptions:** User is logged in and on inventory page

**Steps:**
1. Observe product layout on page
2. Verify grid structure

**Expected Results:**
- Products are displayed in a multi-column grid
- Grid is responsive and well-organized
- All 6 products are visible without excessive scrolling
- Products are evenly spaced

**Rationale:** Layout is secondary to functionality. Products are displayed (P0), but specific layout is nice-to-have.

---

#### 8.2 Product Cards Display Complete Information
**Priority:** P2 (Medium) | **Status:** ⏳ Not Implemented

**Assumptions:** User is logged in and on inventory page

**Steps:**
1. Examine a product card
2. Verify all required information is present

**Expected Results:**
- Each product card displays: image, name, description, price, and action button
- Layout is clean and organized
- Information is easily readable
- Action button (Add to cart / Remove) is clearly visible

**Rationale:** Information presence is tested in other scenarios (P0/P1). Presentation is secondary.

---

### 9. Edge Cases and Error Handling

#### 9.1 Rapid Add/Remove Actions
**Priority:** P2 (Medium) | **Status:** ⏳ Not Implemented

**Assumptions:** User is logged in and on inventory page

**Steps:**
1. Rapidly click "Add to cart" for a product
2. Immediately click "Remove" for same product
3. Rapidly add/remove multiple items in succession

**Expected Results:**
- Cart badge updates correctly without errors
- No duplicate items in cart
- Application remains responsive
- No console errors occur

**Rationale:** Edge case testing; important for robustness but not core workflow.

---

#### 9.2 Add to Cart While Sorted
**Priority:** P2 (Medium) | **Status:** ⏳ Not Implemented

**Assumptions:** User has applied sorting and inventory page is displayed

**Steps:**
1. Sort products by "Price (high to low)"
2. Add a product to cart
3. Verify cart functionality and sort persistence

**Expected Results:**
- Item is added to cart successfully
- Cart badge updates correctly
- Sort order is maintained
- No errors occur

**Rationale:** Interaction between two features; validates they work together properly.

---

#### 9.3 Navigate Away and Return
**Priority:** P2 (Medium) | **Status:** ⏳ Not Implemented

**Assumptions:** User has added items to cart and is on inventory page

**Steps:**
1. Add 2 items to cart
2. Click product to view details
3. Click "Back to products"
4. Verify cart state

**Expected Results:**
- Cart items are preserved when navigating away
- Cart items are preserved when returning to inventory page
- Cart badge shows correct count
- Previous items still show "Remove" button

**Rationale:** Session state edge case; important for reliability but not blocking.

---

### 10. Footer and External Links

#### 10.1 Social Media Links Are Present
**Priority:** P2 (Medium) | **Status:** ✅ Implemented

**Assumptions:** User is logged in and on inventory page

**Steps:**
1. Scroll to footer
2. Verify social media links are present

**Expected Results:**
- Twitter link is present
- Facebook link is present
- LinkedIn link is present
- All links have proper href attributes

**Rationale:** Social links are nice-to-have; don't impact core shopping experience.

---

#### 10.2 Footer Information Displays
**Priority:** P2 (Medium) | **Status:** ✅ Implemented

**Assumptions:** User is logged in and on inventory page

**Steps:**
1. Scroll to footer
2. Verify copyright and policy information

**Expected Results:**
- Copyright notice is displayed: "© 2025 Sauce Labs. All Rights Reserved."
- "Terms of Service" link is present
- "Privacy Policy" link is present

**Rationale:** Legal/informational content; important for compliance but doesn't affect shopping workflows.

---

## Test Data

### Products Available
1. **Sauce Labs Backpack** - ID: 4 - Price: $29.99
2. **Sauce Labs Bike Light** - ID: 0 - Price: $9.99
3. **Sauce Labs Bolt T-Shirt** - ID: 3 - Price: $15.99
4. **Sauce Labs Fleece Jacket** - ID: 5 - Price: $49.99
5. **Sauce Labs Onesie** - ID: 2 - Price: $7.99
6. **Test.allTheThings() T-Shirt (Red)** - ID: 1 - Price: $15.99

### Valid Login Credentials
- **Username:** standard_user
- **Password:** secret_sauce

---

## Implementation Roadmap

### Phase 1: Critical Functionality (P0)
**Target:** Implement first for core functionality validation

- ✅ 1.1 Inventory Page Loads Successfully
- ✅ 1.2 Page Redirects Non-Logged-In Users
- ✅ 4.1 Add Single Product to Cart
- ✅ 4.2 Add Multiple Products to Cart
- ✅ 4.3 Cart Badge Updates Correctly
- ✅ 5.1 Navigate to Cart from Inventory Page
- ✅ 5.2 Cart Badge Reflects Current Items

**Status:** 7/7 tests complete and passing

---

### Phase 2: High-Priority Features (P1)
**Target:** Implement after P0 for important feature coverage

- ⏳ 2.1-2.5 Product Sorting Functionality (5 tests)
- ⏳ 3.1-3.4 Product Selection and Navigation (4 tests)
- ⏳ 4.4-4.5 Remove from Cart (2 tests)
- ⏳ 5.3 Cart Link in Header Works (1 test)
- ✅ 7.1 Header Elements Are Present and Functional (Partially)

**Status:** 1/15 tests complete, 14/15 tests pending

---

### Phase 3: Medium-Priority Features (P2)
**Target:** Implement for comprehensive edge case and visual testing

- ⏳ 6.1-6.3 Product Information Accuracy (3 tests)
- ⏳ 7.2 Menu Button Opens Navigation Menu (1 test)
- ⏳ 8.1-8.2 Responsive Layout and Display (2 tests)
- ⏳ 9.1-9.3 Edge Cases and Error Handling (3 tests)
- ✅ 10.1-10.2 Footer and External Links (2 tests)

**Status:** 2/12 tests complete, 10/12 tests pending

---

## Success Criteria

All tests pass if:
1. Page loads without errors
2. All products display with correct information
3. Sorting functionality works for all options
4. Cart operations (add/remove) function correctly
5. Navigation between pages works
6. Cart badge updates accurately
7. No console errors appear
8. Page remains responsive throughout user interactions

---

## Test Execution Guidelines

### Running P0 Tests Only (Critical Path)
Use when validating core functionality or in pre-release testing.

### Running P0 + P1 Tests (Comprehensive)
Use for release validation and feature branch testing.

### Running All Tests (P0 + P1 + P2)
Use for regression testing and release candidates.

### Selective Testing
- **Smoke Tests:** Run P0 tests after each commit
- **Feature Tests:** Run P0 + P1 for feature branches
- **Regression Tests:** Run all tests before release
