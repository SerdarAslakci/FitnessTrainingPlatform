import React, { useState } from "react";
import axios from "axios";

function NutritionPlanAI() {
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("male");
    const [goal, setGoal] = useState("Maintain Weight");
    const [aiPlan, setAiPlan] = useState([]);
    const [loading, setLoading] = useState(false);

    const mealList = [
        {
            food: "1 tablespoon of honey (21g)",
            calories: 64,
            carbs: 17,
            protein: 0.1,
            fat: 0
        },
        {
          food: "bread",
          calories: 100,
          carbs: 17,
          protein: 0.1,
          fat: 0
      }
    ];

    const handleGeneratePlan = async (e) => {
        e.preventDefault();

        if (!weight || !height || !age) {
            alert("Please fill in all fields");
            return;
        }

        setLoading(true);
        setAiPlan([]);

        const token = localStorage.getItem("token");

        try {
            const metabolismResponse = await axios.get("http://localhost:5029/api/profile/GetMetabolismInfo", 
            {
              headers: {Authorization: `Bearer ${token}`}
            });

            const { bmr, tdee, calculatedAt } = metabolismResponse.data;

            // 2. Yapay zeka için prompt oluştur
            const prompt = `
              Benim için bir Sabah kahvaltısı planı hazırla. Bilgilerim şunlar:
              - Yaş: ${age}
              - Boy: ${height} cm
              - Kilo: ${weight} kg
              - Cinsiyet: ${gender === "male" ? "Erkek" : "Kadın"}
              - Hedef: ${goal}
              - Bazal metabolizma hızı (BMR): ${bmr}
              - Toplam günlük enerji harcaması (TDEE): ${tdee}

              Lütfen sadece sabah öğününü ve bu öğünlerin içeriklerini belirt. Beslenme planını sadece öğünlerin ve içeriklerinin listesi olarak ver ve açıklamalardan kaçın.
              Javascript listesi şeklinde ver cevabı başka hiçbir şey yazma. Listede yiyecek adı, adeti, kalorisi ve değerleri olsun. Eksik yazma listeyi tamamla.

              Listeyi şu şekilde ver (örnek format):
              [
                  {
                      "food": "örnek yiyecek",
                      "calories": örnek kalori,
                      "carbs": örnek kalori,
                      "protein": örnek kalori,
                      "fat": örnek kalori
                  },
                  {
                      "food": "bread",
                      "calories": 100,
                      "carbs": 17,
                      "protein": 0.1,
                      "fat": 0
                  }
              ]
              Bu liste yapısına birebir uysun, hiçbir şey değiştirme.Sadece örnek yazan yerlere bir şeyler ekle liste yapısını asla değiştirme
              `;


            // 3. OpenAI veya başka bir yapay zeka API'ye isteği gönder
            const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
              method: "POST",
              headers: {
                "Authorization": `Bearer your api key`,
                "HTTP-Referer": "http://localhost:5173",
                "X-Title": "My Workout App",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                model: "deepseek/deepseek-r1-zero:free",
                messages: [{ role: "user", content: prompt }],
              }),
            });

            const aiResponse = await response.json();
            console.log("AI Response:", aiResponse);

            const aiMessage = aiResponse.choices?.[0]?.message?.content || "Yapay zeka yanıtı alınamadı.";
            const matches = aiMessage.match(/\[([^\]]+)\]/g);
            
            if (matches) {
                const cleanedMatches = matches.map(match => match.replace(/[\[\]\\]/g, "").trim());
            
                const parsedPlan = cleanedMatches.map(item => {
                    if (typeof item === "string" && item.includes(", ")) {
                        const [food, calories, carbs, protein, fat] = item.split(", ");
                        
                        return {
                            food: food.trim(),
                            calories: parseFloat(calories.split(":")[1]),
                            carbs: parseFloat(carbs.split(":")[1]),
                            protein: parseFloat(protein.split(":")[1]),
                            fat: parseFloat(fat.split(":")[1]),
                        };
                    } else {
                        // item geçersizse boş bir nesne döndür veya bu öğeyi atla
                        return null;
                    }
                }).filter(item => item !== null); // null olanları filtrele
            
                setAiPlan(parsedPlan);
            } else {
                setAiPlan([]);
            }

        } catch (error) {
            console.error("Hata:", error);
            alert("Bir hata oluştu. Lütfen tekrar deneyin.");
        } finally {
            setLoading(false);
        }
    };

    const renderNutritionPlan = (plan) => {
        if (!plan || plan.length === 0) return <p>Beslenme planı bulunamadı.</p>;

        return (
            <div className="card mt-4 p-4 shadow">
                <h5>📋 Önerilen Beslenme Planı</h5>
                <ul>
                    {plan.map((item, idx) => (
                        <li key={idx}>
                            <strong>{item.food}</strong> - Kalori: {item.calories} kcal, Karbonhidrat: {item.carbs}g, Protein: {item.protein}g, Yağ: {item.fat}g
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    return (
        <div className="container py-5">
            <h3 className="text-center mb-4">Yapay Zeka Destekli Beslenme Planı</h3>

            <form onSubmit={handleGeneratePlan} className="card p-4 shadow">
                <div className="row">
                    <div className="col-md-4 mb-3">
                        <label className="form-label">Kilo (kg)</label>
                        <input type="number" className="form-control" value={weight} onChange={(e) => setWeight(e.target.value)} />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label className="form-label">Boy (cm)</label>
                        <input type="number" className="form-control" value={height} onChange={(e) => setHeight(e.target.value)} />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label className="form-label">Yaş</label>
                        <input type="number" className="form-control" value={age} onChange={(e) => setAge(e.target.value)} />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Cinsiyet</label>
                        <select className="form-select" value={gender} onChange={(e) => setGender(e.target.value)}>
                            <option value="male">Erkek</option>
                            <option value="female">Kadın</option>
                        </select>
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Hedef</label>
                        <select className="form-select" value={goal} onChange={(e) => setGoal(e.target.value)}>
                            <option value="Maintain Weight">Korumak</option>
                            <option value="Weight Loss">Kilo Vermek</option>
                            <option value="Weight Gain">Kilo Almak</option>
                        </select>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                    {loading ? "Oluşturuluyor..." : "Plan Oluştur"}
                </button>
            </form>

            {renderNutritionPlan(aiPlan)}
        </div>
    );
}

export default NutritionPlanAI;
