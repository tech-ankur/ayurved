interface KnowledgeItem {
  title: string;
  body: string;
}

export default function KnowledgeBase() {
  const knowledgeItems: KnowledgeItem[] = [
    {
      title: "Six Tastes (Shad Rasa)",
      body: "Madhura, Amla, Lavana, Katu, Tikta, Kashaya — each taste influences doshas uniquely.",
    },
    { 
      title: "Virya (Potency)", 
      body: "Heating vs Cooling — align potency with the patient's imbalance." 
    },
    { 
      title: "Guna (Quality)", 
      body: "Heavy/Light, Dry/Oily — balance through opposite qualities." 
    },
  ];

  return (
    <>
      <div className="page-header">
        <h2 className="h1" style={{ margin: 0 }}>
          Knowledge Base
        </h2>
        <div className="subtle">Principles of Ayurvedic nutrition and clinical pearls.</div>
      </div>

      <div className="grid cols-3">
        {knowledgeItems.map((a, i) => (
          <article key={i} className="card" style={{ padding: "16px" }}>
            <h3 style={{ marginTop: 0 }}>{a.title}</h3>
            <p className="subtle">{a.body}</p>
          </article>
        ))}
      </div>
    </>
  )
}
