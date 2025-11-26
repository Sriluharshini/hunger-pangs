# 🍽️ Hunger Pangs  
A MERN stack web application designed to connect **food donors** with **volunteers** to reduce food waste.  
Donors can post surplus food, and volunteers can view & claim donations to distribute them to those in need.

Built with **MongoDB, Express.js, React.js, Node.js, and TailwindCSS**.

---

## 🌟 Features

### 👤 User Authentication
- Login/Signup using JWT.
- Password hashing & secure token storage.

### 📝 Donation Management
- Donors can create new donation posts.
- Volunteers can view available donations.
- Each donation card displays:
  - Food details  
  - Quantity  
  - Pickup location  
  - Time posted  

### 🤝 Claim System
- Volunteers can claim a donation.
- Prevents multiple users from claiming the same donation.
- Real-time feedback using **React Toastify**.

### 📱 Responsive UI
- Fully designed with **TailwindCSS** for modern, mobile-friendly layouts.

### 🔒 Secure Backend
- API routes protected using JWT middleware.
- Sanitized inputs and structured MongoDB models.

---

## 🛠️ Tech Stack

### **Frontend**
- React.js
- React Router
- TailwindCSS
- React Toastify
- Axios / Fetch

### **Backend**
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- BCrypt password hashing

---

## 🔄 Application Flow

1. **User Registers/Logs in**  
   → Backend generates a JWT  
   → Token stored in `localStorage`.

2. **User Views All Donations**  
   → Frontend fetches `/api/donations`  
   → Items appear in **DonationCard** components.

3. **Claiming a Donation**  
   → On click, frontend sends claim request  
   → Backend updates donation as "claimed"  
   → User sees a toast notific
