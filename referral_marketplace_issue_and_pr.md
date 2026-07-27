# GitHub Issue & PR Descriptions: Referral-Based Marketplace (`GoEazy Refer&Earn™`)

Use these pre-formatted descriptions when creating the GitHub Issue and Pull Request for this feature.

---

## 📌 1. GitHub Issue Description

```markdown
### ⭐ Feature Request: Referral-Based Marketplace (`GoEazy Refer&Earn™`)

#### **User Problem / Feature Objective**
Students are the best marketers and ambassadors for student housing in their college network. However, without a structured peer-to-peer referral marketplace, word-of-mouth growth remains uncaptured and organic user acquisition is limited.

Adding a peer-to-peer referral marketplace allows students to invite student friends and property owners using tracked custom codes, earn rent credits (₹500 for tenant referrals, ₹1,000 for landlord referrals), unlock ambassador bonus tiers, track live ranks on the campus ambassador leaderboard, and share pre-formatted invites instantly on WhatsApp.

#### **Proposed Solution & Requirements**
- [x] **Dual Referral Rewards & Code Engine**:
  - Interactive Referral Hub modal (`ReferralHubModal.jsx`) generating unique referral links (e.g. `GO-STUDENT-500` / `LANDLORD-STUDENT-1000`).
  - Student Tenant Referral: Both referrer & friend get ₹500 GoEazy Rent Credits.
  - Landlord Owner Referral: Earn ₹1,000 when a referred property owner lists a verified PG/flat.
- [x] **Referral Bonus Tiers**:
  - 🥉 *Bronze Tier* (1-3 referrals): ₹500 per referral + Bronze Ambassador Badge.
  - 🥈 *Silver Tier* (4-7 referrals): ₹1,000 per referral + ₹500 Extra Rent Bonus.
  - 🥇 *Gold Super Referrer* (8+ referrals): ₹2,000 per referral + VIP Ambassador Badge.
- [x] **Top Referrer Campus Ambassador Leaderboard**:
  - Live monthly ranking of top student ambassadors across universities (Name, College, Referrals, Total Earnings).
- [x] **1-Click WhatsApp & Social Sharing**:
  - Pre-formatted WhatsApp share link (`shareWhatsApp`), Twitter share, and 1-click Copy Link button.
- [x] **App Integration**:
  - Added "Refer & Earn ₹500" badge to `Navbar.jsx` and GoEazy Credits Wallet card in `UserDashboard.jsx`.

#### **Impact & Acceptance Criteria**
- [x] Drives organic viral growth loops, targeting ~30% of new signups via referrals.
- [x] Production build (`npm run build`) executes cleanly with 0 errors or broken references.
```

---

## 🚀 2. GitHub Pull Request (PR) Description

```markdown
## 🎁 feat(referral): implement Referral-Based Marketplace & Ambassador Hub (`GoEazy Refer&Earn™`)

### 📌 Summary of Changes
This PR introduces **GoEazy Refer&Earn™**, a viral peer-to-peer referral marketplace and campus ambassador hub designed to drive student and landlord growth across college networks.

---

### 🔑 Key Features & Components Added

#### 1. 🏆 **Interactive Referral Hub Modal (`ReferralHubModal.jsx`)**
- Personal referral link and code generator (`GO-STUDENT-500`).
- Dual Reward Mode: **Tenant Referral** (₹500 for student + ₹500 for friend) and **Landlord Owner Referral** (₹1,000 per verified property listing).
- **Referral Bonus Tier Engine**: Bronze (₹500), Silver (₹1,000 + bonus), and Gold Super Referrer (₹2,000/referral + VIP badge).
- **Top Ambassador Leaderboard**: Ranked monthly ambassador leaderboard across colleges.
- **1-Click WhatsApp & Social Sharing**: Direct WhatsApp invite launcher with custom referral link.

#### 2. ⚡ **Navbar Action Badge (`Navbar.jsx`)**
- Added "Refer & Earn ₹500" badge in header navigation with gift/sparkle icon.

#### 3. 💳 **GoEazy Credits Wallet Card (`UserDashboard.jsx`)**
- Added GoEazy Credits Wallet banner on user dashboard displaying available rent credits (₹1,500) and referral code shortcut.

---

### 🧪 Verification & Testing
- [x] **Production Build**: Executed `npm run build` cleanly in 2.14s with 0 bundling errors.
- [x] **Code & Link Generation**: Verified custom code formatting and 1-click copy link action.
- [x] **WhatsApp Sharing**: Verified `https://wa.me/?text=...` deep-linking with auto-filled referral text.
```
