# BloomMom AI 🌸 — Smart AI-Powered Pregnancy & Delivery Tracker

An intelligent, full-featured web application designed to guide expectant mothers from **ovulation & conception all the way to labor & delivery**. Packed with week-by-week fetal development, medical milestones, comprehensive trimester diet plans, food safety checker, Dr. Bloom AI companion, contraction timer with 5-1-1 clinical alerts, fetal kick counter, weight gain tracker, hospital bag checklist, and prenatal appointments log.

---

## ✨ Key Features

1. **Gestational Age & Delivery Engine (Weeks 1 to 42)**
   - **4 Calculation Methods**:
     - By **Ovulation / Conception Date** (ideal for tracked cycles & IVF)
     - By **Last Menstrual Period (LMP)** (Naegele's 280-day rule)
     - By **Estimated Due Date (EDD)**
     - By **Ultrasound Scan Date & Gestational Age**
   - Precise gestational age (`Week 24, Day 3`), trimester status, and live delivery countdown.
   - Interactive Week Navigator to preview any week (Week 1 to Week 42).

2. **Week-by-Week Baby & Mom Encyclopedia**
   - Visual baby-to-fruit size comparison with length (cm & in) and weight (g & oz).
   - Weekly anatomical milestones (brain development, heartbeat, fingerprints, lung surfactant, kicks).
   - Mom's bodily changes & common symptoms.
   - Doctor's weekly tests checklist (NIPT, Glucose screen, GBS, Ultrasound).

3. **Maternal Nutrition Hub & "Can I Eat This?" Safety Checker**
   - **Searchable Food Safety Database**:
     - 🚫 **Strictly Avoid**: High mercury fish, raw meats/sushi, unpasteurized milk & cheeses (Listeria risk), cold deli meats, alcohol, raw sprouts.
     - ⚠️ **Consume with Caution**: Caffeine limit (<200mg/day), canned tuna, sodium, specific herbs.
     - ✅ **Superfoods**: Pastured eggs (Choline), wild salmon (DHA Omega-3), Greek yogurt, avocados, lentils, dark leafy greens, sweet potatoes, late-pregnancy dates (36w+).
   - **Trimester Meal Plans**: Full daily menus (Breakfast, Mid-Morning Snack, Balanced Lunch, Afternoon Snack, Dinner, Bedtime Snack).
   - **Symptom-Specific Food Remedies**: Tailored diets for Morning Sickness, Heartburn / Acid Reflux, Constipation, Fatigue / Low Iron, and Gestational Diabetes prevention.
   - **Key Micronutrients Cheat Sheet**: Folic Acid, Iron, Calcium, DHA, Choline, Vitamin D targets.

4. **Dr. Bloom AI Companion (Obstetrics Assistant)**
   - **Instant Medical Intelligence**: Answers symptom questions, food safety concerns, and labor prep out-of-the-box (zero API key needed).
   - **Optional Google Gemini API Integration**: Connect your free Google Gemini API key in one click for live cloud AI conversation (stored only in local browser).

5. **Clinical Pregnancy Tools & Trackers**
   - ⏱️ **Contraction Timer & 5-1-1 Alert**: Accurately tracks contraction duration and frequency. Flags the clinical **5-1-1 Rule** (5 mins apart, lasting 1 min, for 1 hour -> Alert to head to hospital!).
   - 👣 **Baby Kick Counter**: 10-kick countdown circle with session timer and historical log adhering to ACOG guidelines.
   - ⚖️ **Weight Gain Tracker & Chart**: Pre-pregnancy BMI calculator with Institute of Medicine (IOM) healthy pregnancy weight gain curves.
   - 📋 **Hospital Bag Checklist**: Interactive categorized packing list (Documents, For Mom, For Baby, For Birth Partner) with % packed progress and custom item addition.
   - 🩺 **Doctor Visits & Vitals Log**: Schedule prenatal visits, log blood pressure and ultrasound notes, and print medical summaries for OB-GYN checkups.
   - 👶 **Baby Names Explorer**: Curated names with meanings, origins, and shortlist bookmarking.
   - 🚨 **Emergency Red Flags Guide**: Immediate guidance for critical symptoms (bleeding, reduced movement, preeclampsia warning signs).

---

## 🚀 How to Publish to GitHub & Connect with Cloudflare

### Step 1: Push to GitHub

1. Open your terminal in this project folder (`d:\Pregency tracker`).
2. Run these commands to commit your files:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of BloomMom AI Pregnancy Tracker"
   ```
3. Create a new repository on [GitHub](https://github.com/new) named `pregnancy-tracker` (set to **Public** or **Private**).
4. Link your local project to GitHub and push:
   ```bash
   git branch -M main
   git remote add origin https://github.com/<YOUR-USERNAME>/pregnancy-tracker.git
   git push -u origin main
   ```

---

### Step 2: Connect GitHub with Cloudflare Pages (Free 1-Click Hosting)

Cloudflare Pages provides free, unlimited bandwidth, instant global CDN deployment, and automatic builds whenever you push to GitHub.

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/) and sign up or log in.
2. In the left sidebar, click **Workers & Pages**.
3. Click **Create Application** > choose the **Pages** tab.
4. Click **Connect to Git** and choose **GitHub**.
5. Select your repository: `pregnancy-tracker`.
6. Configure the build settings (Cloudflare detects Vite automatically):
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Node.js version**: (Default is fine, or set Environment Variable `NODE_VERSION` = `20` or higher)
7. Click **Save and Deploy**!

🎉 Within ~40 seconds, Cloudflare will give you a live production URL (e.g. `https://pregnancy-tracker.pages.dev`) with free SSL and lightning-fast worldwide delivery!

Whenever you make updates and run `git push`, Cloudflare Pages will automatically rebuild and deploy the new version in seconds.

---

## 💻 Local Development

To run the app on your computer:

```bash
# Install dependencies
npm install

# Start local dev server
npm run dev
```

Visit the local URL shown in terminal (usually `http://localhost:5173`).

---

## 🔒 Privacy & Data Storage

All pregnancy data, dates, notes, kick counts, and weight logs are stored securely on the user's device in **Browser LocalStorage**. No personal medical data is sent to external databases.
