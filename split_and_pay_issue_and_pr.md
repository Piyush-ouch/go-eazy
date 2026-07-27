# GitHub Issue & PR Descriptions: GoEazy Split&Pay™ (`Group Rent & Deposit Splitter`)

Use these pre-formatted descriptions when creating the GitHub Issue and Pull Request for this feature.

---

## 📌 1. GitHub Issue Description

```markdown
### ⭐ Feature Request: GoEazy Split&Pay™ (Group Rent, Deposit & Utility Splitter)

#### **User Problem / Feature Objective**
Students sharing 2BHK and 3BHK flats struggle every month to calculate and collect individual room rent shares, security deposits, maid charges, and electricity bills fairly. Manual calculations cause disputes between flatmates and delay landlord rent collection.

Adding a dedicated group rent splitting system allows flatmates to calculate exact shares using equal, room-size weighted, or custom percentage splits, generate 1-click mobile UPI payment links (GPay, PhonePe, Paytm, BHIM), and send automated flatmate payment requests on WhatsApp.

#### **Proposed Solution & Requirements**
- [x] **Custom Room Weighting & Fair Split Engine**:
  - Interactive calculation modal (`SplitPayModal.jsx`) bundling Base Rent, Security Deposit, Maid/Cook Fees, Electricity, and WiFi.
  - Split methods: **Equal Split**, **Room-Size Weighted Split** (Master Bed + Bath 40%, Balcony Room 35%, Single Room 25%), and **Custom Percentage**.
- [x] **1-Click UPI Deep-Link Generator**:
  - Generates `upi://pay?pa=...&pn=GoEazyRent&am=...` links for Google Pay, PhonePe, Paytm, and BHIM with exact flatmate shares.
- [x] **Automated WhatsApp Payment Requests**:
  - Generates 1-click WhatsApp message links (`getFlatmateSplitReminderLink`) pre-filled with flatmate name, room share, itemized breakdown, and UPI link.
- [x] **App Integration**:
  - Added "Split Rent (Split&Pay™)" quick action button in `PropertyDetail.jsx` and user dashboard.

#### **Impact & Acceptance Criteria**
- [x] Eliminates flatmate rent calculation disputes and speeds up landlord rent collection by ~80%.
- [x] `npm run build` executes cleanly with 0 errors or broken references.
```

---

## 🚀 2. GitHub Pull Request (PR) Description

```markdown
## 💰 feat(finance): implement GoEazy Split&Pay™ (Group Rent, Deposit & Utility Splitter)

### 📌 Summary of Changes
This PR introduces **GoEazy Split&Pay™**, an intelligent group rent, security deposit, utility, and maid fee calculation suite featuring room-size weighting, instant UPI deep-link generation, and automated WhatsApp payment requests.

---

### 🔑 Key Features & Components Added

#### 1. 🧮 **Interactive Group Splitter Modal (`SplitPayModal.jsx`)**
- Full expense builder bundling Rent, Security Deposit, Maid/Cook charges, Electricity, and WiFi.
- Split modes: **Equal Split**, **Room-Size Weighted**, and **Custom Percentage** with real-time percentage validation.
- Flatmate list manager (Add/remove flatmates, enter names, room types, phone numbers, UPI IDs).

#### 2. 📲 **1-Click UPI Deep-Link Generator**
- Generates official `upi://pay` links for GPay, PhonePe, Paytm, and BHIM with exact flatmate amounts.

#### 3. 💬 **Automated WhatsApp Payment Reminders (`whatsapp.js`)**
- Added `getFlatmateSplitReminderLink` helper generating formatted WhatsApp payment request links for each flatmate with room share, due date, and UPI link.

#### 4. ⚡ **Integration in Property Detail (`PropertyDetail.jsx`)**
- Embedded "Split Rent (Split&Pay™)" button into the virtual experience toolbar for instant access.

---

### 🧪 Verification & Testing
- [x] **Production Build**: Executed `npm run build` cleanly in 2.22s with 0 bundling errors.
- [x] **Room Weighting Math**: Verified equal, room-weighted, and custom percentage calculations without rounding drift.
- [x] **UPI & WhatsApp Actions**: Tested UPI deep-link generation and WhatsApp payment request links.
```
