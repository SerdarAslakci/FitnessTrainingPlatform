import { useState } from 'react';

const WorkoutGenerator = () => {
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(false);

 

  const generateWorkout = async () => {
    setLoading(true); // Yükleniyor yazısını göster
    const days = [
      { day: "Monday", groups: ["Chest", "Triceps"] },
      { day: "Wednesday", groups: ["Back", "Biceps"] },
      { day: "Friday", groups: ["Legs", "Shoulders"] },
    ];
    
    const liste = [
      {
        Id: 1,
        Name: "Bench Press",
        Description: "Temel göğüs egzersizi, üst vücut gücünü artırır.",
        Sets: 4,
        Reps: 10,
        Day: "Monday",
        IsCompleted: false,
        MuscleGroup: "Chest",
      },
    ];
    
    for (const [index, { day, groups }] of days.entries()) {
      const prompt = `
        ${JSON.stringify(liste)} içindeki alanlara uygun (set ve rep integer tek değer) olarak ${day} günü için bir antrenman programı oluştur.
        Kas grupları: "${groups[0]}" ve "${groups[1]}" olacak. 
        Her kas grubundan 3'er egzersiz olmalı. Aşağıdaki yapıya uygun olsun:
        - Id: 1'den başlayarak sırayla artmalı
        - Name: Egzersizin adı
        - Description: Egzersizin kısa açıklaması
        - Sets: Set sayısı (örneğin 4)
        - Reps: Tekrar sayısı (örneğin 10)
        - Day: "${day}"
        - IsCompleted: false
        - MuscleGroup: "${groups[0]}" veya "${groups[1]}"
        Sadece bu yapıya uygun bir JSON liste döndür.
      `;
    
      try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer your deepseek api key`,
            "HTTP-Referer": "http://localhost:5173",
            "X-Title": "My Workout App",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "deepseek/deepseek-r1-zero:free",
            messages: [{ role: "user", content: prompt }],
          }),
        });
    
        const data = await response.json();
        const content = data.choices?.[0]?.message?.content || "";
    
        console.log(`--- ${day} JSON Cevabı ---`);
        console.log(content);
    
        const matches = content.match(/\[.*\]/s);
        if (matches && matches[0]) {
          const jsonData = JSON.parse(matches[0]);
    
          const payloadList = jsonData.map((ex) => ({
            workoutPlanId: 6,
            name: ex.Name,
            description: ex.Description,
            sets: ex.Sets,
            reps: ex.Reps,
            day: ex.Day,
            isCompleted: ex.IsCompleted,
            muscleGroup: ex.MuscleGroup,
            videoUrl: "",
          }));
    
          // Veritabanına gönder
          const postResponse = await fetch("http://localhost:5029/api/MyWorkoutPlan/create-plan", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payloadList),
          });
    
          if (!postResponse.ok) {
            const errorText = await postResponse.text();
            console.error(`Gönderme başarısız (${day}):`, errorText);
          } else {
            console.log(`${day} günü için egzersizler başarıyla eklendi.`);
          }
        } else {
          console.error(`${day} günü için geçerli JSON bulunamadı.`);
        }
      } catch (error) {
        console.error(`${day} günü için hata:`, error);
      }
      finally
      {
        setLoading(false); // Yükleniyor yazısını göster
      }
    }
    
    };

  return (
    <div>
      <button onClick={generateWorkout}>Antrenman Programı Oluştur</button>
      {loading && <p>Yükleniyor...</p>}
      <div>
        {workout && (
          <pre>{JSON.stringify(workout, null, 2)}</pre>
        )}
      </div>
    </div>
  );
};

export default WorkoutGenerator;
