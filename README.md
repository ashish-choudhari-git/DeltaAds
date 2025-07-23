# DeltaAds

**DeltaAds** is a full-stack ad delivery and tracking platform built using the MERN stack.  
It allows advertisers to create campaigns, manage multiple ads, define audience targeting, and track real-time performance metrics like impressions, clicks, CTR, and conversions.

---

## 📌 Key Features

- **Campaign Management**  
  Structured ad campaigns with budgets, durations, and audience targeting.

- **Multi-Ad Support**  
  Each campaign can include multiple image or video ads.

- **Audience Targeting**  
  Target users by location, age range, and gender.

- **Real-Time Ad Tracking**  
  Automatically logs impressions, clicks, and conversions.

- **Performance Metrics**  
  View campaign-wise and ad-wise analytics like CTR and engagement.

- **Wallet Integration**  
  Assign budgets from a centralized wallet system.

- **Ad Management**  
  Edit, pause, or delete ads post-publish.

- **Frontend Ad Display Simulation**  
  Ads are served on a dummy social media(instagram) feed for demo purposes.

---

## 📌 Tech Stack

| Layer      | Technology                       |
|------------|----------------------------------|
| Frontend   | React (Vite), Tailwind CSS       |
| Backend    | Node.js, Express.js              |
| Database   | MongoDB                          |


---

## 🗂️ Project Structure

```
deltaAds/
├── Frontend/       # Frontend
└── Backend/       # Backend
```

---

## 📌 How It Works

1. Advertiser logs in (authentication)
2. Creates a campaign with budget and timeline
3. Can add multiple ads (media, link, CTA)
4. Sets audience targeting (location, gender, age)
5. Publishes the campaign
6. Ads are served inside a dummy social media feed
7. Impressions, clicks, and conversions are tracked automatically
8. Analytics are available for each campaign and ad

---

## 📌 Local Setup

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/deltaAds.git
cd deltaAds
```

### 2. Setup Backend
```bash
cd backend
npm install
npm run dev
```

> Make sure to add your MongoDB URI in `.env`

### 3. Setup Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## 📄 License

MIT License  
© 2025 [Aashish Choudhari](https://github.com/ashish-choudhari-git)

This project is licensed under the MIT License.  
**Attribution is required** — if you use or modify this project, you must give credit to the original author.

---

## 💬 Contact

For feedback, suggestions, or collaboration:

📧 contact.ashishchoudhari@gmail.com  
🔗 [GitHub](https://github.com/ashish-choudhari-git)

---
