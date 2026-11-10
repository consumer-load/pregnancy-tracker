/**
 * AI Pregnancy Companion Engine
 * Supports two modes:
 * 1. Offline Intelligent Obstetrics Knowledge Base (Instant, no API key needed)
 * 2. Live Google Gemini API (when user supplies their free Google AI key)
 */

const SYSTEM_OB_PROMPT = `You are "Dr. Bloom AI", an empathetic, highly knowledgeable, board-certified obstetrician and maternal-fetal medicine health companion.
Your goal is to guide expectant mothers through their pregnancy journey from ovulation to delivery with warmth, clear science-backed guidance, nutritional advice, and reassurance.
Always follow clinical safety standards:
- Always remind the user that your guidance is educational and does not substitute for their personal OB-GYN, midwife, or emergency medical care.
- If symptoms like heavy bleeding, severe headache with vision changes, decreased fetal movement, or fluid leakage are mentioned, urgently advise contacting labor & delivery or emergency triage.
- Use encouraging, gentle language and clear markdown bullet points.`;

export async function askPregnancyAI({ question, currentWeek, trimester, userContext, geminiApiKey }) {
  // If user provided a Gemini API Key, call Gemini API
  if (geminiApiKey && geminiApiKey.trim().length > 10) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${encodeURIComponent(
          geminiApiKey.trim()
        )}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [
                  {
                    text: `${SYSTEM_OB_PROMPT}\n\nPatient Context: Currently at Week ${currentWeek || "unknown"} (Trimester ${trimester || "unknown"}).\nUser Question: ${question}`,
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.4,
              maxOutputTokens: 800,
            },
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          return {
            source: "gemini",
            content: text,
          };
        }
      }
    } catch (err) {
      console.warn("Gemini API call failed, falling back to smart local clinical engine:", err);
    }
  }

  // Built-in intelligent clinical responder
  return {
    source: "local-bloom",
    content: generateSmartClinicalResponse(question, currentWeek, trimester),
  };
}

function generateSmartClinicalResponse(question, week = 20, trimester = 2) {
  const q = question.toLowerCase();

  // Cramps / Pain
  if (q.includes("cramp") || q.includes("abdominal pain") || q.includes("twinge") || q.includes("round ligament")) {
    return `### Understanding Cramping & Pelvic Sensations at Week ${week}

Mild, occasional cramping or pulling twinges can be very common during pregnancy, but it's important to differentiate normal stretching from red flags:

- **Round Ligament Pain (Very Normal):** In trimesters 1 and 2, the thick ligaments supporting your expanding uterus stretch like rubber bands. Sudden movements, rolling over, or coughing can trigger a sharp, brief twinge in your lower belly or groin.
- **Uterine Growth:** Your uterus is expanding dramatically, pulling on surrounding muscles and tissue.
- **Dehydration:** Inadequate hydration can trigger mild uterine cramping. Drinking a tall glass of electrolyte water and resting on your left side often helps.

⚠️ **When to call your OB-GYN immediately:**
- Severe, persistent, or intensifying pain
- Cramping accompanied by vaginal bleeding, spotting, or unusual fluid leakage
- Pain accompanied by fever, chills, or burning with urination

*Educational note: Always reach out to your maternity triage if cramping doesn't subside with rest and water.*`;
  }

  // Bleeding / Spotting
  if (q.includes("bleed") || q.includes("spotting") || q.includes("blood")) {
    return `### Vaginal Bleeding & Spotting Assessment

Any vaginal bleeding during pregnancy warrants a phone call to your healthcare provider, though the causes vary by trimester:

- **1st Trimester:** Light pinkish or brown spotting can result from blastocyst implantation (weeks 3-4), cervical sensitivity after intimacy or pelvic exam, or harmless subchorionic hematomas.
- **2nd & 3rd Trimester:** Could indicate cervical changes, placental positioning (such as placenta previa or partial detachment), or the bloody show before labor.

🚨 **Immediate Red Flags (Go to ER / Labor & Delivery):**
- Bright red blood soaking through a sanitary pad within an hour
- Passing large clots
- Bleeding accompanied by sharp abdominal pain or dizziness

*Recommendation: Put on a clean pad to monitor the volume and color, and contact your doctor or labor & delivery unit right now.*`;
  }

  // Diet / Food safety
  if (q.includes("eat") || q.includes("food") || q.includes("cheese") || q.includes("fish") || q.includes("coffee") || q.includes("caffeine") || q.includes("sushi")) {
    if (q.includes("coffee") || q.includes("caffeine")) {
      return `### Caffeine Guidelines in Pregnancy

- **Safe Limit:** Up to **200 mg per day** according to ACOG (American College of Obstetricians and Gynecologists).
- **What that looks like:** Approximately one 12 oz brewed coffee, two shots of espresso, or 2-3 cups of black/green tea.
- **Why limit?** Caffeine crosses the placenta easily, and baby’s developing metabolism cannot process it quickly. High intake (> 200mg) is associated with low birth weight.
- **Tip:** If craving coffee rituals, try half-caf, roasted chicory root, or golden turmeric lattes!`;
    }
    if (q.includes("sushi") || q.includes("raw fish")) {
      return `### Sushi & Seafood Safety

- **Raw Sushi / Sashimi:** Avoid raw fish and raw oysters due to risk of parasitic worms and bacteria (like Listeria and Salmonella).
- **Safe Sushi Alternatives:** You can safely enjoy **cooked rolls**! California rolls (cooked imitation crab), tempura shrimp rolls, cooked eel (unagi), avocado rolls, and cucumber rolls are delicious and completely safe.
- **Beneficial Cooked Seafood:** Cooked wild salmon, canned light tuna (max 6oz/wk), and shrimp are rich in DHA Omega-3s essential for baby's brain.`;
    }
    if (q.includes("cheese") || q.includes("feta") || q.includes("brie")) {
      return `### Cheese Safety in Pregnancy

- **The Golden Rule:** Always check that the label states **"Made with Pasteurized Milk"**.
- **Safe Cheeses:** Hard cheeses (cheddar, parmesan, Swiss, gouda) and pasteurized soft cheeses (pasteurized mozzarella, cream cheese, pasteurized feta, cottage cheese).
- **Avoid:** Any unpasteurized (raw milk) soft cheeses like artisan French Brie, Camembert, or unpasteurized Mexican queso fresco due to Listeria risk. In the US and EU, most commercial grocery store feta is pasteurized and completely safe!`;
    }
    return `### Essential Pregnancy Nutrition Guidelines for Week ${week}

1. **Top Superfoods:** Pastured eggs (for brain-boosting Choline), wild cooked salmon (for DHA Omega-3), Greek yogurt (calcium & protein), sweet potatoes (beta-carotene), lentils & dark leafy greens (folate & iron).
2. **Foods to Avoid:** Raw/undercooked meats, high-mercury fish (shark, swordfish, king mackerel), unpasteurized milk/cheeses, raw sprouts, alcohol, and unheated deli meats.
3. **Hydration Target:** 8 to 10 glasses of water daily. Hydration prevents premature contractions, swelling, and UTIs.`;
  }

  // Medications / Painkillers
  if (q.includes("medication") || q.includes("tylenol") || q.includes("advil") || q.includes("ibuprofen") || q.includes("headache") || q.includes("pill")) {
    return `### Safe Medications & Headache Relief During Pregnancy

- **Generally Safe (Category B):** **Acetaminophen (Tylenol)** taken at standard therapeutic dosages (max 1000mg per dose, max 3000mg/24h) is the first-line doctor-approved pain reliever.
- 🚫 **STRICTLY AVOID:** **Ibuprofen (Advil, Motrin), Naproxen (Aleve), and Aspirin** (NSAIDs), especially after 20 weeks. NSAIDs can cause low amniotic fluid levels (oligohydramnios) and premature closure of the baby's ductus arteriosus heart vessel.
- **Natural Headache Relief:** Drink 16 oz of cold water, apply a cool gel pack to your forehead, rest in a dim quiet room, or take a warm shower.
- ⚠️ **Important:** A severe, persistent headache that doesn't respond to acetaminophen, especially when accompanied by vision changes or upper right abdominal pain, can be a symptom of preeclampsia. Report this promptly to your doctor.`;
  }

  // Sleeping position
  if (q.includes("sleep") || q.includes("position") || q.includes("back") || q.includes("insomnia")) {
    return `### Optimal Sleep Positions for Pregnancy

- **Best Position:** **Left Side (SOS - Sleep On Side):** Sleeping on your left side maximizes blood flow and nutrient delivery to the placenta and prevents the weight of your uterus from compressing the inferior vena cava (the main vein returning blood to your heart).
- **Is Back Sleeping OK?** In the first trimester, sleeping on your back is fine. From week 20 onwards, sleeping flat on your back can cause dizziness, low blood pressure, and decreased circulation. If you wake up on your back, don't panic! Just roll gently onto your side.
- **Sleep Comfort Hacks:**
  - Place a pillow between your knees to align hips and pelvis.
  - Tuck a small wedge pillow under your baby bump.
  - Keep a supportive pregnancy U-pillow behind your back to prevent rolling.`;
  }

  // Contractions vs Braxton Hicks / 5-1-1 Rule
  if (q.includes("contraction") || q.includes("braxton") || q.includes("labor") || q.includes("5-1-1")) {
    return `### Braxton Hicks vs. True Labor Contractions

- **Braxton Hicks (Practice Contractions):**
  - Feel like irregular, painless or mildly tight hardening across your belly.
  - Usually subside if you drink water, change positions, take a warm bath, or rest.
  - Do NOT get progressively closer together or more intense.
- **True Labor Contractions:**
  - Start in the lower back and radiate around to the front of the abdomen.
  - Get progressively longer, stronger, and closer together over time.
  - Do NOT go away with walking, water, or changing positions.
- **The Golden 5-1-1 Rule to go to Hospital:**
  - Contractions are **5 minutes apart** (from start of one to start of the next),
  - Lasting at least **1 full minute (60 seconds)** each,
  - Continuing steadily for at least **1 full hour**.
  - *(For second-time moms, many doctors advise heading in at the 4-1-1 or 5-1-1 mark!)*`;
  }

  // Fetal movement / Kicks
  if (q.includes("kick") || q.includes("movement") || q.includes("active") || q.includes("quiet")) {
    return `### Fetal Movement & Baby Kick Counts

- **When to start counting:** From Week 28 onward, daily kick counts are recommended by obstetricians.
- **How to do a Kick Count:**
  - Choose a time when baby is typically active (often in the evening or after dinner).
  - Lie down comfortably on your left side in a quiet room.
  - Count any roll, flutter, jab, or kick until you reach **10 movements**.
  - Most babies reach 10 movements within 15 to 45 minutes; 2 hours is the standard maximum.
- 🚨 **What if movement feels low?** Drink a cold glass of orange juice or ice water, lie on your left side, and focus for 2 hours. If baby doesn't achieve 10 movements, call labor & delivery triage immediately—do not wait.`;
  }

  // Default warm comprehensive reply
  return `### Hello Mama! Guidance for Week ${week} (Trimester ${trimester})

Thank you for reaching out. At **Week ${week}**, your body and baby are undergoing remarkable changes:

- **Baby's Growth:** Baby is continuing critical organ maturation, practicing reflexes, and developing sensory connections with you.
- **Self-Care Priorities:**
  - Drink at least 8-10 glasses of water daily to support expanding amniotic fluid and blood volume.
  - Nourish your body with clean protein, healthy fats (Omega-3 DHA), iron, and folate.
  - Honor your energy: rest when fatigued, and enjoy gentle walks or prenatal stretches.
- **Always Remember:** If you ever experience sudden bleeding, persistent abdominal pain, severe headaches with vision changes, or decreased baby movement, contact your OB-GYN or hospital triage right away.

Feel free to ask me anything specific about pregnancy symptoms, foods to avoid, meal plans, kick counts, or labor preparation!`;
}
