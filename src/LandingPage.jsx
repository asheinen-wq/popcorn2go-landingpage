import { useEffect, useMemo, useState } from "react";

export default function LandingPage() {
  const ADMIN_PASSWORD = process.env.REACT_APP_ADMIN_PASSWORD || "";
  const WHATSAPP_NUMBER = "491702880296";

  const [formData, setFormData] = useState({
  name: "",
  company: "",
  phone: "",
  email: "",
  date: "",
  eventType: "",
  guests: "",
  selectedPackage: "",
  location: "",
  message: "",
});

  const [isMobile, setIsMobile] = useState(false);
  const [popcorns, setPopcorns] = useState([]);

  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState("");
  const [adminPasswordError, setAdminPasswordError] = useState("");

  const [feedbackForm, setFeedbackForm] = useState({
    name: "",
    rating: "5",
    text: "",
  });

  const [customerFeedbacks, setCustomerFeedbacks] = useState([]);

  const benefits = [
    "Lieferung, Aufbau und Abholung direkt durch Popcorn2Go",
    "20 km Anfahrt inklusive, danach nur 0,60 €/km",
    "24h Express nach Verfügbarkeit möglich",
    "Sorgt für Aufmerksamkeit und begeistert Gäste sofort",
    "Optional mit Münzeinwurf",
    "Frisches Popcorn in ca. 90 Sekunden",
  ];

  const steps = [
    {
      title: "1. Anfrage senden",
      text: "Wunschtermin anfragen und passendes Paket auswählen – wir melden uns schnell zurück.",
    },
    {
      title: "2. Lieferung vor Ort",
      text: "Die Popcornmaschine AirPop Go kommt direkt zu deiner Veranstaltung im Saarland und Umgebung.",
    },
    {
      title: "3. Aufbau inklusive",
      text: "Popcorn2Go übernimmt den Aufbau und erklärt alles kurz und verständlich vor Ort.",
    },
    {
      title: "4. Entspannt genießen",
      text: "Nach dem Einsatz holen wir alles zuverlässig wieder ab – ohne zusätzlichen Aufwand für dich.",
    },
  ];

  const testimonials = [
    {
      name: "Jessica M.",
      text: "Super unkompliziert, pünktlich geliefert und ein echtes Highlight auf unserem Geburtstag.",
      rating: "5",
    },
    {
      name: "Eventteam Saarbrücken",
      text: "Perfekt für Promotions. Der Münzeinwurf kam bei den Besuchern richtig gut an.",
      rating: "5",
    },
    {
      name: "Daniel K.",
      text: "Top Service, fairer Preis und das Popcorn war ein echter Publikumsmagnet.",
      rating: "5",
    },
  ];

  const targetGroups = [
    {
      title: "Geburtstage & private Feiern",
      text: "Ideal für Geburtstage, Gartenpartys, Familienfeiern und besondere Anlässe mit echtem Highlight-Faktor.",
    },
    {
      title: "Firmenfeiern & Business-Events",
      text: "Perfekt für Mitarbeiter-Events, Kundenevents, Promotions und Firmenveranstaltungen mit wenig Planungsaufwand.",
    },
    {
      title: "Vereinsfeste & Stadtfeste",
      text: "Stark für Veranstaltungen mit Laufkundschaft, viel Publikumsverkehr und hoher Aufmerksamkeit vor Ort.",
    },
    {
      title: "Promotion & POS",
      text: "Spannend für aufmerksamkeitsstarke Aktionen im Handel, auf Events oder bei Promotions.",
    },
  ];

  const trustHighlights = [
    {
      title: "Bereits vielfach im Einsatz",
      text: "Bereits auf zahlreichen Events im Saarland im Einsatz – von privaten Feiern bis zu Promotion-Aktionen.",
    },
    {
      title: "Echter Blickfang",
      text: "AirPop Go wirkt als Eye-Catcher, Publikumsmagnet und kann die Aufmerksamkeit direkt vor Ort deutlich erhöhen.",
    },
    {
      title: "Wenig Aufwand für dich",
      text: "Der Einsatz ist unkompliziert planbar und ideal, wenn du ein starkes Extra ohne unnötigen Zusatzstress suchst.",
    },
  ];

  const machineHighlights = [
    {
      title: "Heißluft statt Öl und Fett",
      text: "Das Popcorn wird per Heißluft zubereitet – sauber, modern und deutlich leichter als klassisches Fett-Popcorn.",
    },
    {
      title: "Frisch in ca. 90 Sekunden",
      text: "Gäste erleben die Zubereitung direkt vor Ort und erhalten schnell frisches Popcorn aus dem Automaten.",
    },
    {
      title: "Automatische Becherausgabe",
      text: "Sauber, unkompliziert und ideal für Events, Promotions und Standorte mit viel Bewegung.",
    },
  ];

  const cornQualityPoints = [
    {
      title: "Speziell veredelter Popcornmais",
      text: "Unser Mais ist speziell veredelt – der Geschmack steckt schon im Korn.",
    },
    {
      title: "Ohne Gentechnik",
      text: "Der verwendete Popcornmais wird ohne Gentechnik hergestellt.",
    },
    {
      title: "Glutenfrei & ohne Farbstoffe",
      text: "Der Mais ist glutenfrei und kommt ohne Farbstoffe aus.",
    },
    {
      title: "Zertifizierte Qualität",
      text: "Wir setzen auf ausgewählte Anbaugebiete und zertifizierte Partner für gleichbleibend hohe Qualität.",
    },
  ];

  const coinBenefits = [
    "Ideal für Promotions und aufmerksamkeitsstarke Aktionen",
    "Spannend für Events mit Laufkundschaft und hoher Interaktion",
    "Kann Nutzung, Aufmerksamkeit und Erlebnisfaktor vor Ort deutlich erhöhen",
  ];

  const locationAreas = [
    "Saarbrücken",
    "Neunkirchen",
    "Saarlouis",
    "St. Wendel",
    "Homburg",
    "Völklingen",
  ];

  const techSpecs = [
    { label: "Breite", value: "ca. 36,5 cm, mit Rädern ca. 45 cm" },
    { label: "Tiefe", value: "ca. 38 cm, mit Griff ca. 43 cm" },
    { label: "Höhe", value: "154 cm" },
    { label: "Gewicht", value: "ca. 55 kg" },
    { label: "Maisbehälter", value: "8 kg – ausreichend für ca. 200 Portionen" },
    { label: "Becherkapazität", value: "ca. 150 Portionen mit automatischer Ausgabe" },
    { label: "Features", value: "Soundsystem & Effektbeleuchtung" },
    { label: "Münzprüfer", value: "individuell einstellbar" },
    { label: "Stromanschluss", value: "220V" },
  ];

 const faqItems = useMemo(() => [
    {
      question: "Wie viel Platz braucht AirPop Go?",
      answer:
        "Der Automat ist kompakt. Er ist ca. 36,5 cm breit, ca. 38 cm tief und 154 cm hoch. Mit Rädern bzw. Griff braucht er etwas mehr Platz.",
    },
    {
      question: "Brauche ich Strom vor Ort?",
      answer:
        "Ja, für den Betrieb wird ein normaler 220V Stromanschluss benötigt.",
    },
    {
      question: "Wie schnell ist eine Portion fertig?",
      answer:
        "Nach dem Start ist frisches Popcorn in ungefähr 90 Sekunden verfügbar.",
    },
    {
      question: "Wie viele Portionen bzw. Becher sind möglich?",
      answer:
        "Der Maisbehälter fasst ca. 8 kg und reicht für ungefähr 200 Portionen. Der Becherbereich ist auf etwa 150 Portionen ausgelegt.",
    },
    {
      question: "Ist Lieferung und Aufbau wirklich inklusive?",
      answer:
        "Ja – Aufbau und Abholung sind inklusive. Bei der Anfahrt sind 20 km enthalten, danach berechnen wir nur 0,60 €/km.",
    },
    {
      question: "Was ist das Besondere am verwendeten Mais?",
      answer:
        "Wir verwenden speziell veredelten Popcornmais, der glutenfrei ist, ohne Farbstoffe auskommt und ohne Gentechnik hergestellt wird.",
    },
  ], []);

  const requestHelpItems = [
    "Anlass der Veranstaltung",
    "gewünschtes Datum",
    "Einsatzort",
    "ungefähre Gästezahl",
    "gewünschtes Paket oder Einsatzidee",
  ];

  const closingBenefits = [
    "Aufbau inklusive",
    "Abholung inklusive",
    "Schnelle Rückmeldung",
  ];

  const prices = [
    {
      title: "Tages-Tarif",
      price: "69 €/Tag",
      badge: "",
      description: "Perfekt für einzelne Einsätze, Geburtstage oder kleinere Feiern.",
      orientation: "Für private Feiern oft eine starke Wahl.",
      features: [
        "1 Tag Miete",
        "Aufbau und Abholung inklusive",
        "20 km Anfahrt inklusive, danach nur 0,60 €/km",
        "Schnell & unkompliziert",
      ],
      cta: "Jetzt anfragen",
    },
    {
      title: "Wochenend-Special",
      price: "189 € komplett",
      badge: "Beliebt",
      description: "Das stärkste Angebot für Events über das komplette Wochenende.",
      orientation: "Unser meistgebuchtes Paket für Events.",
      features: [
        "Komplettes Wochenende",
        "Aufbau und Abholung inklusive",
        "20 km Anfahrt inklusive, danach nur 0,60 €/km",
        "Ideal für Feiern & Vereinsfeste",
      ],
      cta: "Wochenend-Angebot prüfen",
    },
    {
      title: "Rundum-Sorglos-Paket",
      price: "149 €/Tag",
      badge: "",
      description: "Für alle, die maximal bequem planen und entspannt durchziehen wollen.",
      orientation: "Gut für Events mit höherem Komfortanspruch.",
      features: [
        "1 Tag Miete",
        "Komfort-Komplettservice",
        "Aufbau und Abholung inklusive",
        "Für größere Veranstaltungen",
      ],
      cta: "Jetzt anfragen",
    },
    {
      title: "Business-Monatsabo",
      price: "ab 350 €/Monat",
      badge: "",
      description: "Ideal für Promotion, POS, regelmäßige Firmenaktionen und Kampagnen.",
      orientation: "Besonders interessant für Unternehmen und wiederkehrende Einsätze.",
      features: [
        "Monatlich planbar",
        "Flexible Nutzung",
        "Ideal für Business & Promotion",
        "Individuelle Abstimmung",
      ],
      cta: "Beratung anfragen",
    },
    {
      title: "Partner-Modell",
      price: "0 € Einstieg",
      badge: "NEU",
      description:
        "Mit Popcorn Geld verdienen – ohne Risiko. Wir stellen den Automaten, Sie verdienen mit.",
      orientation: "Spannend für stark frequentierte Flächen.",
      features: [
        "Keine Investition",
        "Kein Wareneinsatz",
        "Umsatzbeteiligung",
        "Komplettservice durch Popcorn2Go",
        "Ideal für stark frequentierte Flächen",
      ],
      cta: "Jetzt Partner werden",
    },
  ];

  const extras = ["Verbrauchspaket Classic: 25 €", "Endreinigung: 29 €"];

  useEffect(() => {
    const previousTitle = document.title;
    document.title =
      "Popcornmaschine mieten Saarland | AirPop Go für Events | Popcorn2Go";

    const ensureMeta = (name, content) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", name);
        document.head.appendChild(meta);
      }
      const previous = meta.getAttribute("content");
      meta.setAttribute("content", content);
      return () => {
        if (previous) {
          meta.setAttribute("content", previous);
        } else {
          meta.remove();
        }
      };
    };

    const cleanupDescription = ensureMeta(
      "description",
      "Popcornmaschine mieten im Saarland: AirPop Go für Events, Geburtstage & Firmenfeiern. Aufbau & Abholung inklusive. Jetzt Termin sichern!"
    );

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "popcorn2go-faq-schema";
    script.text = JSON.stringify(faqSchema);
    document.head.appendChild(script);

    return () => {
      document.title = previousTitle;
      cleanupDescription();
      const existing = document.getElementById("popcorn2go-faq-schema");
      if (existing) existing.remove();
    };
   }, [faqItems]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const savedFeedbacks = localStorage.getItem("popcorn2go-feedbacks");

    if (savedFeedbacks) {
      try {
        setCustomerFeedbacks(JSON.parse(savedFeedbacks));
      } catch (error) {
        console.error("Feedback konnte nicht geladen werden:", error);
      }
    }
  }, []);

  useEffect(() => {
    const createWave = () => {
      const count = isMobile ? 10 : 16;

      const generatedPopcorns = Array.from({ length: count }, (_, i) => {
        const sideBias = Math.random() > 0.5 ? 1 : -1;
        const spreadXBase = isMobile ? 130 : 210;
        const spreadX = 50 + Math.random() * spreadXBase;
        const finalX = sideBias * spreadX;

        const topY = -(150 + Math.random() * (isMobile ? 70 : 120));
        const bottomY = 0;
        const midX = finalX * (0.08 + Math.random() * 0.2);
        const curveX = finalX * (0.42 + Math.random() * 0.22);

        const rotation = -220 + Math.random() * 440;
        const delay = Math.random() * 1.1;
        const duration = 4.6 + Math.random() * 1.8;
        const size = 22 + Math.random() * 26;
        const squash = 0.9 + Math.random() * 0.15;
        const shape = i % 3;

        return {
          id: `${Date.now()}-${i}`,
          finalX,
          topY,
          bottomY,
          midX,
          curveX,
          rotation,
          delay,
          duration,
          size,
          squash,
          shape,
        };
      });

      setPopcorns(generatedPopcorns);
    };

    createWave();
    const interval = setInterval(createWave, 4200);

    return () => clearInterval(interval);
  }, [isMobile]);

  const approvedFeedbacks = useMemo(
    () => customerFeedbacks.filter((item) => item.status === "approved"),
    [customerFeedbacks]
  );

  const pendingFeedbacks = useMemo(
    () => customerFeedbacks.filter((item) => item.status === "pending"),
    [customerFeedbacks]
  );

  const approvedUserFeedbacks = useMemo(
    () => customerFeedbacks.filter((item) => item.status === "approved"),
    [customerFeedbacks]
  );

  const allTestimonials = [
    ...approvedFeedbacks.map((item) => ({
      name: item.name,
      text: item.text,
      rating: item.rating,
      isUserFeedback: true,
    })),
    ...testimonials.map((item) => ({
      ...item,
      isUserFeedback: false,
    })),
  ];

  const persistFeedbacks = (nextFeedbacks) => {
    setCustomerFeedbacks(nextFeedbacks);
    localStorage.setItem("popcorn2go-feedbacks", JSON.stringify(nextFeedbacks));
  };

     const applyInlineStyles = (e, styleObject) => {
    Object.assign(e.currentTarget.style, styleObject);
  };

  const buttonHoverIn = (e) => {
    applyInlineStyles(e, { transform: "translateY(-2px)" });
  };

  const buttonHoverOut = (e) => {
    applyInlineStyles(e, { transform: "translateY(0)" });
  };

  const secondaryHoverIn = (e) => {
    applyInlineStyles(e, {
      backgroundColor: "#f9fafb",
      transform: "translateY(-2px)",
    });
  };

  const secondaryHoverOut = (e) => {
    applyInlineStyles(e, {
      backgroundColor: "#ffffff",
      transform: "translateY(0)",
    });
  };

  const orangeHoverIn = (e) => {
    applyInlineStyles(e, {
      transform: "translateY(-2px)",
      boxShadow: "0 16px 30px rgba(245,158,11,0.28)",
    });
  };

  const orangeHoverOut = (e) => {
    applyInlineStyles(e, {
      transform: "translateY(0)",
      boxShadow: "0 12px 28px rgba(245,158,11,0.22)",
    });
  };

  const whatsappHoverIn = (e) => {
    applyInlineStyles(e, {
      transform: "translateY(-3px) scale(1.02)",
      boxShadow: "0 18px 34px rgba(34,197,94,0.35)",
    });
  };

  const whatsappHoverOut = (e) => {
    applyInlineStyles(e, {
      transform: "translateY(0) scale(1)",
      boxShadow: "0 14px 26px rgba(34,197,94,0.28)",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: value,
      };

      return updated;
    });
  };

  const handlePackageRequest = (packageName) => {
  const packageLabel =
    packageName === "Partner-Modell"
      ? "Partner-Modell"
      : packageName;

  setFormData((prev) => ({
    ...prev,
    selectedPackage: packageLabel,
    message: "",
  }));

  const formSection = document.getElementById("anfrage");
  if (formSection) {
    formSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

  const handleSubmit = (e) => {
    e.preventDefault();

    const subject = encodeURIComponent("Anfrage AirPop Go");
    const body = encodeURIComponent(
        `Name: ${formData.name}
         Firma: ${formData.company}
         Telefon: ${formData.phone}
         E-Mail: ${formData.email}
         Datum: ${formData.date}
         Anlass: ${formData.eventType}
         Gästezahl: ${formData.guests}
         Gewünschtes Paket: ${formData.selectedPackage}
         Einsatzort: ${formData.location}

        Details zur Anfrage:
        ${formData.message}`
        );

    window.location.href = `mailto:popcorn2go@outlook.de?subject=${subject}&body=${body}`;
  };

  const handleFeedbackChange = (e) => {
    const { name, value } = e.target;

    setFeedbackForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();

    const newFeedback = {
      id: Date.now(),
      name: feedbackForm.name.trim(),
      rating: feedbackForm.rating,
      text: feedbackForm.text.trim(),
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    if (!newFeedback.name || !newFeedback.text) {
      return;
    }

    const updatedFeedbacks = [newFeedback, ...customerFeedbacks];
    persistFeedbacks(updatedFeedbacks);

    setFeedbackForm({
      name: "",
      rating: "5",
      text: "",
    });

    setShowFeedbackForm(false);
  };

  const handleApproveFeedback = (feedbackId) => {
    const updatedFeedbacks = customerFeedbacks.map((item) =>
      item.id === feedbackId ? { ...item, status: "approved" } : item
    );

    persistFeedbacks(updatedFeedbacks);
  };

  const handleDeleteFeedback = (feedbackId) => {
    const updatedFeedbacks = customerFeedbacks.filter(
      (item) => item.id !== feedbackId
    );

    persistFeedbacks(updatedFeedbacks);
  };

  const handleAdminUnlock = (e) => {
    e.preventDefault();

    if (!ADMIN_PASSWORD) {
      setAdminPasswordError("Es wurde kein Admin-Passwort in der .env gesetzt.");
      return;
    }

    if (adminPasswordInput === ADMIN_PASSWORD) {
      setIsAdminUnlocked(true);
      setAdminPasswordError("");
      setAdminPasswordInput("");
    } else {
      setAdminPasswordError("Das Passwort ist nicht korrekt.");
    }
  };

  const handleAdminLogout = () => {
    setIsAdminUnlocked(false);
    setShowAdminPanel(false);
    setAdminPasswordInput("");
    setAdminPasswordError("");
  };

  const openWhatsApp = (
    prefill = "Hallo, ich interessiere mich für AirPop Go."
  ) => {
    const text = encodeURIComponent(prefill);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const styles = {
    page: {
      fontFamily: "Arial, sans-serif",
      color: "#1f2937",
      backgroundColor: "#fffdf8",
      lineHeight: 1.5,
      overflowX: "hidden",
      position: "relative",
    },
    hero: {
      position: "relative",
      padding: isMobile ? "32px 0 56px" : "56px 0 88px",
      background:
        "radial-gradient(circle at top left, rgba(255,241,199,0.85) 0%, rgba(255,247,232,1) 22%, rgba(255,253,248,1) 56%, rgba(255,255,255,1) 100%)",
      overflow: "hidden",
    },
    heroPopcornOverlay: {
      position: "absolute",
      inset: 0,
      pointerEvents: "none",
      overflow: "hidden",
      zIndex: 4,
    },
    popcornEmitter: {
      position: "absolute",
      left: isMobile ? "74%" : "73%",
      bottom: isMobile ? "38px" : "72px",
      width: 0,
      height: 0,
      zIndex: 4,
      pointerEvents: "none",
    },
    popcornPiece: {
      position: "absolute",
      left: "0",
      bottom: "0",
      transform: "translateX(-50%) translateY(0)",
      willChange: "transform, opacity",
      animationName: "popcornFromMachine",
      animationTimingFunction: "linear",
      animationFillMode: "forwards",
      opacity: 0,
    },
    popcornInner: {
      position: "relative",
      width: "100%",
      height: "100%",
      filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.12))",
    },
    popcornLobe: {
      position: "absolute",
      background:
        "radial-gradient(circle at 35% 30%, #fffefb 0%, #fff8de 42%, #f4d58b 78%, #e3b85f 100%)",
      border: "1px solid rgba(214, 176, 92, 0.38)",
      boxShadow: "inset 0 2px 5px rgba(255,255,255,0.72)",
    },
    popcornCrumb: {
      position: "absolute",
      width: "22%",
      height: "22%",
      background:
        "radial-gradient(circle at 30% 30%, #f6dea3 0%, #dfb35b 100%)",
      borderRadius: "50%",
      opacity: 0.9,
    },
    container: {
      width: "100%",
      maxWidth: "1320px",
      margin: "0 auto",
      padding: isMobile ? "0 16px" : "0 24px",
      boxSizing: "border-box",
      position: "relative",
      zIndex: 2,
    },
    section: {
      padding: isMobile ? "56px 0" : "84px 0",
    },
    subtleSection: {
      padding: isMobile ? "56px 0" : "84px 0",
      backgroundColor: "#fffaf0",
      borderTop: "1px solid #f5e7bc",
      borderBottom: "1px solid #f5e7bc",
    },
    darkSection: {
      padding: isMobile ? "56px 0" : "84px 0",
      background:
        "linear-gradient(180deg, rgba(17,24,39,1) 0%, rgba(31,41,55,1) 100%)",
    },
    heroGrid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "1.05fr 0.95fr",
      gap: isMobile ? "28px" : "40px",
      alignItems: "center",
    },
    heroImageWrap: {
      position: "relative",
      zIndex: 2,
    },
    heroImage: {
      width: "100%",
      borderRadius: "28px",
      objectFit: "cover",
      boxShadow: "0 24px 60px rgba(0,0,0,0.14)",
      minHeight: isMobile ? "260px" : "520px",
      maxHeight: isMobile ? "360px" : "560px",
      position: "relative",
      zIndex: 2,
    },
    heroImageCard: {
      position: "absolute",
      right: isMobile ? "12px" : "-18px",
      bottom: isMobile ? "12px" : "18px",
      backgroundColor: "rgba(255,255,255,0.95)",
      backdropFilter: "blur(8px)",
      border: "1px solid rgba(255,255,255,0.85)",
      borderRadius: "20px",
      padding: isMobile ? "14px" : "16px",
      boxShadow: "0 18px 40px rgba(17,24,39,0.12)",
      maxWidth: isMobile ? "220px" : "250px",
      zIndex: 3,
    },
    heroImageCardTitle: {
      fontSize: "15px",
      fontWeight: 800,
      color: "#111827",
      margin: "0 0 6px",
    },
    heroImageCardText: {
      fontSize: "14px",
      color: "#4b5563",
      margin: 0,
    },
    kicker: {
      display: "inline-block",
      backgroundColor: "#fff1c7",
      color: "#8a5a00",
      fontWeight: 700,
      fontSize: "14px",
      padding: "8px 14px",
      borderRadius: "999px",
      marginBottom: "18px",
      boxShadow: "0 8px 18px rgba(245,158,11,0.12)",
    },
    warningBanner: {
      marginTop: "18px",
      backgroundColor: "#fff7e8",
      border: "1px solid #f5e7bc",
      color: "#8a5a00",
      borderRadius: "18px",
      padding: "14px 16px",
      fontSize: "14px",
      fontWeight: 700,
      maxWidth: "680px",
    },
    heroNote: {
      marginTop: "16px",
      fontSize: "14px",
      fontWeight: 700,
      color: "#6b7280",
    },
    h1: {
      fontSize: isMobile ? "28px" : "42px",
      lineHeight: 1.2,
      margin: "0 0 18px",
      color: "#111827",
      maxWidth: "700px",
    },
    lead: {
      fontSize: isMobile ? "17px" : "20px",
      margin: "0 0 24px",
      color: "#4b5563",
      maxWidth: "700px",
      whiteSpace: "pre-line",
    },
    heroMeta: {
      display: "flex",
      flexWrap: "wrap",
      gap: "12px",
      marginBottom: "22px",
    },
    metaBadge: {
      backgroundColor: "#ffffff",
      border: "1px solid #f0e5c8",
      borderRadius: "999px",
      padding: "10px 14px",
      fontSize: "14px",
      fontWeight: 700,
      color: "#374151",
      boxShadow: "0 8px 18px rgba(17,24,39,0.04)",
    },
    heroProofBar: {
  display: "grid",
  gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
  gap: "14px",
  marginTop: "26px",
},
    proofCard: {
      backgroundColor: "#ffffff",
      border: "1px solid #eee7d8",
      borderRadius: "18px",
      padding: "16px 18px",
      boxShadow: "0 10px 24px rgba(17,24,39,0.05)",
    },
    proofTitle: {
      fontSize: "15px",
      fontWeight: 800,
      color: "#111827",
      margin: "0 0 6px",
    },
    proofText: {
      fontSize: "14px",
      color: "#6b7280",
      margin: 0,
    },
    buttonRow: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      gap: "14px",
      alignItems: isMobile ? "stretch" : "center",
      justifyContent: "center",
      flexWrap: "wrap",
    },
    primaryButton: {
      backgroundColor: "#f59e0b",
      color: "#ffffff",
      border: "none",
      borderRadius: "14px",
      padding: "14px 22px",
      fontSize: "16px",
      fontWeight: 700,
      cursor: "pointer",
      boxShadow: "0 10px 24px rgba(245,158,11,0.25)",
      transition: "all 0.2s ease",
    },
    secondaryButton: {
      backgroundColor: "#ffffff",
      color: "#111827",
      border: "1px solid #e5e7eb",
      borderRadius: "14px",
      padding: "14px 22px",
      fontSize: "16px",
      fontWeight: 700,
      cursor: "pointer",
      transition: "all 0.2s ease",
    },
    whatsappHeroButton: {
      backgroundColor: "#22c55e",
      color: "#ffffff",
      border: "none",
      borderRadius: "14px",
      padding: "14px 22px",
      fontSize: "16px",
      fontWeight: 700,
      cursor: "pointer",
      boxShadow: "0 14px 26px rgba(34,197,94,0.28)",
      transition: "all 0.2s ease",
    },
    dangerButton: {
      backgroundColor: "#ffffff",
      color: "#b91c1c",
      border: "1px solid #fecaca",
      borderRadius: "12px",
      padding: "12px 16px",
      fontSize: "14px",
      fontWeight: 700,
      cursor: "pointer",
      transition: "all 0.2s ease",
    },
    adminApproveButton: {
      backgroundColor: "#111827",
      color: "#ffffff",
      border: "none",
      borderRadius: "12px",
      padding: "12px 16px",
      fontSize: "14px",
      fontWeight: 700,
      cursor: "pointer",
      transition: "all 0.2s ease",
    },
    sectionTitle: {
      fontSize: isMobile ? "28px" : "42px",
      margin: "0 0 14px",
      color: "#111827",
      textAlign: "center",
    },
    sectionTitleLight: {
      fontSize: isMobile ? "28px" : "42px",
      margin: "0 0 14px",
      color: "#ffffff",
      textAlign: "center",
    },
    sectionText: {
      fontSize: "17px",
      color: "#6b7280",
      textAlign: "center",
      maxWidth: "820px",
      margin: "0 auto 36px",
      whiteSpace: "pre-line",
    },
    sectionTextLight: {
      fontSize: "17px",
      color: "rgba(255,255,255,0.82)",
      textAlign: "center",
      maxWidth: "820px",
      margin: "0 auto 36px",
    },
    grid2: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
      gap: "22px",
    },
    grid3: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
      gap: "22px",
    },
    grid4: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(4, 1fr)",
      gap: "22px",
    },
    card: {
      backgroundColor: "#ffffff",
      border: "1px solid #eee7d8",
      borderRadius: "24px",
      padding: "24px",
      boxShadow: "0 14px 34px rgba(17,24,39,0.06)",
      height: "100%",
      boxSizing: "border-box",
    },
    darkCard: {
      backgroundColor: "rgba(255,255,255,0.08)",
      border: "1px solid rgba(255,255,255,0.12)",
      borderRadius: "24px",
      padding: "24px",
      boxShadow: "0 14px 34px rgba(0,0,0,0.18)",
      height: "100%",
      boxSizing: "border-box",
      backdropFilter: "blur(4px)",
    },
    cardTitle: {
      fontSize: "20px",
      fontWeight: 700,
      marginBottom: "10px",
      color: "#111827",
    },
    darkCardTitle: {
      fontSize: "20px",
      fontWeight: 700,
      marginBottom: "10px",
      color: "#ffffff",
    },
    cardText: {
      color: "#6b7280",
      fontSize: "15px",
      margin: 0,
    },
    darkCardText: {
      color: "rgba(255,255,255,0.82)",
      fontSize: "15px",
      margin: 0,
    },
    imageCard: {
      width: "100%",
      borderRadius: "24px",
      overflow: "hidden",
      backgroundColor: "#ffffff",
      boxShadow: "0 16px 36px rgba(17,24,39,0.08)",
      border: "1px solid #eee7d8",
    },
    image: {
      width: "100%",
      display: "block",
      objectFit: "cover",
      height: isMobile ? "230px" : "300px",
    },
    galleryImage: {
      width: "100%",
      display: "block",
      objectFit: "cover",
      height: isMobile ? "220px" : "260px",
    },
    imageCaption: {
      padding: "16px 18px",
      fontWeight: 700,
      color: "#374151",
      backgroundColor: "#fffefb",
    },
    list: {
      margin: "16px 0 0",
      paddingLeft: "18px",
      color: "#4b5563",
    },
    listItem: {
      marginBottom: "8px",
    },
    pricingIntro: {
      maxWidth: "900px",
      margin: "0 auto 28px",
      backgroundColor: "#fff7e8",
      border: "1px solid #f5e7bc",
      borderRadius: "20px",
      padding: "18px 20px",
      textAlign: "center",
      color: "#8a5a00",
      fontWeight: 700,
      whiteSpace: "pre-line",
    },
    pricingGrid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(5, minmax(0, 1fr))",
      gap: "22px",
      alignItems: "stretch",
    },
    priceCard: {
      position: "relative",
      backgroundColor: "#ffffff",
      border: "1px solid #eee7d8",
      borderRadius: "26px",
      padding: "26px",
      boxShadow: "0 14px 34px rgba(17,24,39,0.06)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      minHeight: "100%",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
    },
    popularCard: {
      position: "relative",
      background:
        "linear-gradient(180deg, rgba(255,247,224,1) 0%, rgba(255,255,255,1) 100%)",
      border: "2px solid #f59e0b",
      borderRadius: "28px",
      padding: "28px",
      boxShadow: "0 22px 48px rgba(245,158,11,0.18)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      minHeight: "100%",
      transform: isMobile ? "none" : "translateY(-8px)",
    },
    partnerCard: {
      position: "relative",
      background:
        "linear-gradient(180deg, rgba(240,253,244,1) 0%, rgba(255,255,255,1) 100%)",
      border: "2px dashed #22c55e",
      borderRadius: "28px",
      padding: "28px",
      boxShadow: "0 18px 40px rgba(34,197,94,0.12)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      minHeight: "100%",
    },
    badge: {
      position: "absolute",
      top: "-12px",
      right: "18px",
      backgroundColor: "#f59e0b",
      color: "#ffffff",
      fontWeight: 800,
      fontSize: "13px",
      padding: "8px 12px",
      borderRadius: "999px",
      boxShadow: "0 10px 20px rgba(245,158,11,0.25)",
    },
    partnerBadge: {
      position: "absolute",
      top: "-12px",
      right: "18px",
      backgroundColor: "#22c55e",
      color: "#ffffff",
      fontWeight: 800,
      fontSize: "13px",
      padding: "8px 12px",
      borderRadius: "999px",
      boxShadow: "0 10px 20px rgba(34,197,94,0.24)",
    },
    price: {
      fontSize: "34px",
      fontWeight: 800,
      color: "#111827",
      margin: "8px 0 12px",
    },
    priceDescription: {
      color: "#6b7280",
      fontSize: "15px",
      marginBottom: "14px",
    },
    priceOrientation: {
      fontSize: "13px",
      fontWeight: 700,
      color: "#8a5a00",
      backgroundColor: "#fff7e8",
      borderRadius: "14px",
      padding: "10px 12px",
      marginBottom: "16px",
    },
    packageButton: {
      marginTop: "18px",
      width: "100%",
      border: "none",
      borderRadius: "14px",
      padding: "14px 18px",
      backgroundColor: "#111827",
      color: "#ffffff",
      fontWeight: 700,
      fontSize: "15px",
      cursor: "pointer",
      transition: "all 0.2s ease",
    },
    popularButton: {
      marginTop: "18px",
      width: "100%",
      border: "none",
      borderRadius: "14px",
      padding: "15px 18px",
      backgroundColor: "#f59e0b",
      color: "#ffffff",
      fontWeight: 800,
      fontSize: "15px",
      cursor: "pointer",
      boxShadow: "0 14px 26px rgba(245,158,11,0.22)",
      transition: "all 0.2s ease",
    },
    partnerButton: {
      marginTop: "18px",
      width: "100%",
      border: "none",
      borderRadius: "14px",
      padding: "15px 18px",
      backgroundColor: "#22c55e",
      color: "#ffffff",
      fontWeight: 800,
      fontSize: "15px",
      cursor: "pointer",
      boxShadow: "0 14px 26px rgba(34,197,94,0.22)",
      transition: "all 0.2s ease",
    },
    featureList: {
      margin: "0",
      paddingLeft: "18px",
      color: "#374151",
      fontSize: "15px",
    },
    extrasBox: {
      marginTop: "28px",
      backgroundColor: "#fff7e8",
      border: "1px solid #f5e7bc",
      borderRadius: "22px",
      padding: "22px",
    },
    trustStrip: {
      marginTop: "26px",
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(4, 1fr)",
      gap: "14px",
    },
    trustItem: {
      backgroundColor: "#ffffff",
      border: "1px solid #eee7d8",
      borderRadius: "18px",
      padding: "16px",
      textAlign: "center",
      boxShadow: "0 10px 24px rgba(17,24,39,0.04)",
    },
    trustNumber: {
      fontSize: "22px",
      fontWeight: 800,
      color: "#111827",
      marginBottom: "4px",
    },
    trustLabel: {
      fontSize: "14px",
      color: "#6b7280",
      margin: 0,
    },
    locationsWrap: {
      display: "flex",
      flexWrap: "wrap",
      gap: "12px",
      justifyContent: "center",
      marginTop: "18px",
    },
    locationChip: {
      backgroundColor: "#ffffff",
      border: "1px solid #eee7d8",
      borderRadius: "999px",
      padding: "10px 14px",
      fontSize: "14px",
      fontWeight: 700,
      color: "#374151",
      boxShadow: "0 8px 18px rgba(17,24,39,0.04)",
    },
    specGrid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
      gap: "16px 24px",
      marginTop: "10px",
    },
    specRow: {
      display: "flex",
      justifyContent: "space-between",
      gap: "18px",
      alignItems: "flex-start",
      padding: "14px 16px",
      backgroundColor: "#ffffff",
      border: "1px solid #eee7d8",
      borderRadius: "16px",
      boxShadow: "0 8px 20px rgba(17,24,39,0.04)",
    },
    specLabel: {
      fontWeight: 800,
      color: "#111827",
      fontSize: "15px",
      flex: "0 0 40%",
    },
    specValue: {
      color: "#4b5563",
      fontSize: "15px",
      textAlign: "right",
      flex: 1,
    },
    formWrap: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "0.92fr 1.08fr",
      gap: "28px",
      alignItems: "start",
    },
    formBox: {
      backgroundColor: "#ffffff",
      border: "1px solid #eee7d8",
      borderRadius: "28px",
      padding: isMobile ? "22px" : "30px",
      boxShadow: "0 16px 38px rgba(17,24,39,0.08)",
    },
    infoBox: {
      background:
        "linear-gradient(180deg, rgba(255,247,232,1) 0%, rgba(255,255,255,1) 100%)",
      border: "1px solid #eee7d8",
      borderRadius: "28px",
      padding: isMobile ? "22px" : "30px",
      boxShadow: "0 14px 34px rgba(17,24,39,0.05)",
    },
    miniContactGrid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
      gap: "14px",
      marginTop: "20px",
    },
    miniContactCard: {
      backgroundColor: "#ffffff",
      border: "1px solid #eee7d8",
      borderRadius: "18px",
      padding: "16px",
    },
    miniContactTitle: {
      fontSize: "15px",
      fontWeight: 800,
      color: "#111827",
      margin: "0 0 6px",
    },
    miniContactText: {
      fontSize: "14px",
      color: "#6b7280",
      margin: 0,
    },
    formHintBox: {
      marginTop: "22px",
      backgroundColor: "#ffffff",
      border: "1px dashed #d1d5db",
      borderRadius: "18px",
      padding: "18px",
    },
    formGrid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
      gap: "16px",
    },
    fullWidth: {
      gridColumn: "1 / -1",
    },
    label: {
      display: "block",
      fontSize: "14px",
      fontWeight: 700,
      marginBottom: "8px",
      color: "#374151",
    },
    input: {
      width: "100%",
      padding: "14px 14px",
      borderRadius: "14px",
      border: "1px solid #d1d5db",
      fontSize: "15px",
      boxSizing: "border-box",
      outline: "none",
      backgroundColor: "#ffffff",
    },
    textarea: {
      width: "100%",
      minHeight: "170px",
      padding: "14px 14px",
      borderRadius: "14px",
      border: "1px solid #d1d5db",
      fontSize: "15px",
      boxSizing: "border-box",
      resize: "vertical",
      outline: "none",
      whiteSpace: "pre-wrap",
      backgroundColor: "#ffffff",
    },
    submitButton: {
      width: "auto",
      minWidth: isMobile ? "100%" : "220px",
      marginTop: "0",
      border: "none",
      borderRadius: "14px",
      padding: "14px 22px",
      backgroundColor: "#f59e0b",
      color: "#ffffff",
      fontWeight: 800,
      fontSize: "16px",
      cursor: "pointer",
      boxShadow: "0 12px 28px rgba(245,158,11,0.22)",
      transition: "all 0.2s ease",
    },
    contactList: {
      margin: "18px 0 0",
      padding: 0,
      listStyle: "none",
      color: "#374151",
    },
    contactItem: {
      marginBottom: "12px",
      fontSize: "16px",
    },
    testimonialCard: {
      backgroundColor: "#ffffff",
      border: "1px solid #eee7d8",
      borderRadius: "24px",
      padding: "24px",
      boxShadow: "0 12px 30px rgba(17,24,39,0.05)",
    },
    quote: {
      color: "#4b5563",
      fontSize: "16px",
      margin: "0 0 16px",
    },
    author: {
      fontWeight: 700,
      color: "#111827",
      margin: 0,
    },
    feedbackTopBar: {
      display: "flex",
      justifyContent: "center",
      gap: "12px",
      marginBottom: "24px",
      flexWrap: "wrap",
    },
    feedbackButton: {
      backgroundColor: "#111827",
      color: "#ffffff",
      border: "none",
      borderRadius: "14px",
      padding: "14px 22px",
      fontSize: "15px",
      fontWeight: 700,
      cursor: "pointer",
      transition: "all 0.2s ease",
    },
    feedbackFormBox: {
      maxWidth: "760px",
      margin: "0 auto 32px",
      backgroundColor: "#ffffff",
      border: "1px solid #eee7d8",
      borderRadius: "22px",
      padding: isMobile ? "20px" : "26px",
      boxShadow: "0 10px 26px rgba(17,24,39,0.05)",
    },
    feedbackFormGrid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "1fr 180px",
      gap: "16px",
      marginBottom: "16px",
    },
    feedbackActions: {
      display: "flex",
      gap: "12px",
      flexDirection: isMobile ? "column" : "row",
      alignItems: "stretch",
    },
    feedbackSecondaryButton: {
      width: "auto",
      minWidth: isMobile ? "100%" : "150px",
      backgroundColor: "#ffffff",
      color: "#374151",
      border: "1px solid #e5e7eb",
      borderRadius: "14px",
      padding: "14px 20px",
      fontSize: "15px",
      fontWeight: 600,
      cursor: "pointer",
      boxShadow: "0 6px 16px rgba(0,0,0,0.05)",
      transition: "all 0.2s ease",
    },
    adminPanel: {
      maxWidth: "900px",
      margin: "0 auto 32px",
      backgroundColor: "#fffaf0",
      border: "1px solid #f5e7bc",
      borderRadius: "22px",
      padding: isMobile ? "20px" : "26px",
    },
    adminCard: {
      backgroundColor: "#ffffff",
      border: "1px solid #eee7d8",
      borderRadius: "18px",
      padding: "18px",
      marginBottom: "14px",
    },
    adminHeader: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "12px",
      flexWrap: "wrap",
      marginBottom: "10px",
    },
    adminMeta: {
      fontSize: "13px",
      color: "#6b7280",
      marginBottom: "10px",
    },
    adminActions: {
      display: "flex",
      gap: "10px",
      flexWrap: "wrap",
      marginTop: "12px",
    },
    adminLoginBox: {
      maxWidth: "520px",
      margin: "0 auto 32px",
      backgroundColor: "#ffffff",
      border: "1px solid #eee7d8",
      borderRadius: "22px",
      padding: isMobile ? "20px" : "26px",
      boxShadow: "0 10px 26px rgba(17,24,39,0.05)",
    },
    adminError: {
      color: "#b91c1c",
      fontSize: "14px",
      marginTop: "10px",
    },
    emptyState: {
      textAlign: "center",
      color: "#6b7280",
      backgroundColor: "#ffffff",
      border: "1px dashed #d1d5db",
      borderRadius: "18px",
      padding: "20px",
    },
    stars: {
      fontSize: "18px",
      marginBottom: "10px",
      color: "#f59e0b",
      letterSpacing: "2px",
    },
    smallBadge: {
      display: "inline-block",
      marginTop: "10px",
      fontSize: "12px",
      fontWeight: 700,
      color: "#8a5a00",
      backgroundColor: "#fff1c7",
      padding: "6px 10px",
      borderRadius: "999px",
    },
    faqCard: {
      backgroundColor: "#ffffff",
      border: "1px solid #eee7d8",
      borderRadius: "22px",
      padding: "22px",
      boxShadow: "0 12px 28px rgba(17,24,39,0.05)",
    },
    faqQuestion: {
      fontSize: "18px",
      fontWeight: 800,
      color: "#111827",
      margin: "0 0 10px",
    },
    faqAnswer: {
      fontSize: "15px",
      color: "#6b7280",
      margin: 0,
    },
    closingStrip: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
      gap: "14px",
      marginTop: "26px",
      marginBottom: "26px",
    },
    closingItem: {
      backgroundColor: "rgba(255,255,255,0.08)",
      border: "1px solid rgba(255,255,255,0.12)",
      color: "#ffffff",
      borderRadius: "18px",
      padding: "16px",
      textAlign: "center",
      fontWeight: 800,
      fontSize: "16px",
    },
    ctaSection: {
      padding: isMobile ? "56px 0 110px" : "84px 0 120px",
    },
    ctaBox: {
      background:
        "linear-gradient(135deg, #111827 0%, #1f2937 55%, #374151 100%)",
      color: "#ffffff",
      borderRadius: "30px",
      padding: isMobile ? "28px" : "42px",
      textAlign: "center",
      boxShadow: "0 28px 60px rgba(17,24,39,0.22)",
    },
    ctaTitle: {
      fontSize: isMobile ? "28px" : "44px",
      margin: "0 0 14px",
      color: "#ffffff",
    },
    ctaText: {
      color: "rgba(255,255,255,0.85)",
      fontSize: "17px",
      margin: "0 auto 24px",
      maxWidth: "760px",
      whiteSpace: "pre-line",
    },
    footerNote: {
      marginTop: "16px",
      fontSize: "14px",
      color: "#9ca3af",
    },
    whatsappFloat: {
      position: "fixed",
      right: isMobile ? "14px" : "22px",
      bottom: isMobile ? "14px" : "22px",
      zIndex: 9999,
      backgroundColor: "#22c55e",
      color: "#ffffff",
      border: "none",
      borderRadius: "999px",
      padding: isMobile ? "14px 16px" : "16px 18px",
      display: "inline-flex",
      alignItems: "center",
      gap: "10px",
      fontSize: isMobile ? "14px" : "15px",
      fontWeight: 800,
      boxShadow: "0 14px 26px rgba(34,197,94,0.28)",
      cursor: "pointer",
      transition: "all 0.2s ease",
    },
    whatsappDot: {
      width: "12px",
      height: "12px",
      borderRadius: "50%",
      backgroundColor: "#ffffff",
      boxShadow: "0 0 0 6px rgba(255,255,255,0.12)",
      flexShrink: 0,
    },
  };

  return (
    <div style={styles.page}>
      <section style={styles.hero}>
        <div style={styles.heroPopcornOverlay}>
          <div style={styles.popcornEmitter}>
            {popcorns.map((popcorn) => (
              <div
                key={popcorn.id}
                style={{
                  ...styles.popcornPiece,
                  width: `${popcorn.size}px`,
                  height: `${popcorn.size}px`,
                  animationDuration: `${popcorn.duration}s`,
                  animationDelay: `${popcorn.delay}s`,
                  "--popcorn-final-x": `${popcorn.finalX}px`,
                  "--popcorn-top-y": `${popcorn.topY}px`,
                  "--popcorn-bottom-y": `${popcorn.bottomY}px`,
                  "--popcorn-mid-x": `${popcorn.midX}px`,
                  "--popcorn-curve-x": `${popcorn.curveX}px`,
                  "--popcorn-rotate": `${popcorn.rotation}deg`,
                  "--popcorn-squash": popcorn.squash,
                }}
              >
                <div style={styles.popcornInner}>
                  <span
                    style={{
                      ...styles.popcornLobe,
                      width: "56%",
                      height: "52%",
                      left: "4%",
                      top: "26%",
                      borderRadius:
                        popcorn.shape === 0
                          ? "58% 42% 50% 46% / 52% 48% 56% 44%"
                          : popcorn.shape === 1
                            ? "50% 56% 42% 48% / 46% 58% 44% 54%"
                            : "62% 40% 54% 44% / 50% 52% 48% 56%",
                    }}
                  />
                  <span
                    style={{
                      ...styles.popcornLobe,
                      width: "54%",
                      height: "54%",
                      right: "2%",
                      top: "24%",
                      borderRadius:
                        popcorn.shape === 0
                          ? "46% 58% 44% 56% / 52% 48% 54% 46%"
                          : popcorn.shape === 1
                            ? "58% 44% 56% 42% / 44% 60% 40% 56%"
                            : "52% 48% 60% 40% / 58% 42% 54% 46%",
                    }}
                  />
                  <span
                    style={{
                      ...styles.popcornLobe,
                      width: "52%",
                      height: "50%",
                      left: "25%",
                      top: "2%",
                      borderRadius:
                        popcorn.shape === 0
                          ? "56% 44% 60% 40% / 48% 56% 44% 52%"
                          : popcorn.shape === 1
                            ? "48% 60% 42% 58% / 54% 46% 58% 42%"
                            : "60% 42% 56% 44% / 46% 58% 42% 54%",
                    }}
                  />
                  <span
                    style={{
                      ...styles.popcornLobe,
                      width: "46%",
                      height: "42%",
                      left: "28%",
                      bottom: "4%",
                      borderRadius:
                        popcorn.shape === 0
                          ? "54% 46% 58% 42% / 56% 44% 52% 48%"
                          : popcorn.shape === 1
                            ? "44% 58% 46% 54% / 50% 54% 46% 50%"
                            : "58% 40% 52% 48% / 54% 46% 56% 44%",
                    }}
                  />
                  <span
                    style={{
                      ...styles.popcornCrumb,
                      left: "18%",
                      top: "58%",
                    }}
                  />
                  <span
                    style={{
                      ...styles.popcornCrumb,
                      right: "18%",
                      top: "52%",
                      transform: "scale(0.85)",
                    }}
                  />
                  <span
                    style={{
                      ...styles.popcornCrumb,
                      left: "44%",
                      top: "18%",
                      transform: "scale(0.7)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.container}>
          <div style={styles.heroGrid}>
            <div style={{ position: "relative", zIndex: 5 }}>
              <span style={styles.kicker}>Popcorn2Go · Saarland und Umgebung</span>
            <h1 style={styles.h1}>
                            Popcornmaschine mieten im Saarland.
                  <br />
                     <span>
                            Das Highlight für dein Event – Gäste lieben es
                     </span>
                     </h1>
            
              <p style={styles.lead}>
                Frisches Popcorn, das Gäste begeistert – inklusive Aufbau & Abholung.
                {"\n"}Jetzt Termin sichern, bevor Wochenenden ausgebucht sind.
              </p>

              <div style={styles.heroMeta}>
                <span style={styles.metaBadge}>Heißluft statt Öl/Fett</span>
                <span style={styles.metaBadge}>ca. 90 Sekunden pro Portion</span>
                <span style={styles.metaBadge}>20 km Anfahrt inklusive, danach nur 0,60 €/km</span>
                <span style={styles.metaBadge}>Hohe Nachfrage an Wochenenden</span>
              </div>

              <div style={{ ...styles.buttonRow, justifyContent: "flex-start" }}>
                <button
                  style={styles.primaryButton}
                  onMouseEnter={buttonHoverIn}
                  onMouseLeave={buttonHoverOut}
                  onClick={() => handlePackageRequest("Wochenend-Special")}
                >
                  Jetzt Verfügbarkeit prüfen
                </button>

                <button
                  style={styles.whatsappHeroButton}
                  onMouseEnter={whatsappHoverIn}
                  onMouseLeave={whatsappHoverOut}
                  onClick={() =>
                    openWhatsApp("Hallo, ich möchte AirPop Go für mein Event anfragen.")
                  }
                >
                  Sofort per WhatsApp anfragen
                </button>

                <a
                  href="tel:+491702880296"
                  style={{
                    ...styles.secondaryButton,
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onMouseEnter={secondaryHoverIn}
                  onMouseLeave={secondaryHoverOut}
                >
                  +49 (0)170-2880296
                </a>
              </div>

              <div style={styles.warningBanner}>
                Begrenzte Verfügbarkeit – besonders an Wochenenden und in der Hauptsaison empfehlen wir eine frühe Anfrage.
              </div>

              <div style={styles.heroNote}>
                Bereits auf zahlreichen Events im Saarland im Einsatz
              </div>

             <div style={styles.heroProofBar}>
  <div style={styles.proofCard}>
    <p style={styles.proofTitle}>Frisch & schnell</p>
    <p style={styles.proofText}>
      Frisches Popcorn in ca. 90 Sekunden – ideal für Events mit Gästen und Laufkundschaft.
    </p>
  </div>

  <div style={styles.proofCard}>
    <p style={styles.proofTitle}>Komplettservice</p>
    <p style={styles.proofText}>
      Kein Aufwand für dich: Aufbau und Abholung inklusive.
    </p>
  </div>

  <div style={styles.proofCard}>
    <p style={styles.proofTitle}>Publikumsmagnet</p>
    <p style={styles.proofText}>
      AirPop Go zieht Blicke auf sich und sorgt direkt für Aufmerksamkeit vor Ort.
    </p>
  </div>

  <div style={styles.proofCard}>
    <p style={styles.proofTitle}>Meistgebucht für Wochenenden</p>
    <p style={styles.proofText}>
      Besonders gefragt für Geburtstage, Vereinsfeste und Events mit viel Laufkundschaft.
    </p>
  </div>
</div>
            </div>

            <div style={{ ...styles.heroImageWrap, position: "relative" }}>

<img
  src="/images/logo.png"
  alt="Popcorn2Go Logo"
  style={{
  position: "absolute",
  top: "0",
  left: "50%",
  transform: "translate(-50%, -150%)",
  width: "190px",
  zIndex: 10,
}}
/>

              <img
                src="/images/airpopgo-1.jpg"
                alt="Popcornmaschine AirPop Go mieten Saarland Event"
                style={styles.heroImage}
              />
             
            </div>
          </div>
        </div>
      </section>

      <section style={{ ...styles.section, paddingTop: isMobile ? "34px" : "40px" }}>
        <div style={styles.container}>
          <div style={styles.trustStrip}>
            <div style={styles.trustItem}>
              <div style={styles.trustNumber}>220V</div>
              <p style={styles.trustLabel}>normaler Stromanschluss</p>
            </div>
            <div style={styles.trustItem}>
              <div style={styles.trustNumber}>150</div>
              <p style={styles.trustLabel}>Portionen ca. ausgabebereit</p>
            </div>
            <div style={styles.trustItem}>
              <div style={styles.trustNumber}>8 kg</div>
              <p style={styles.trustLabel}>Maisbehälter</p>
            </div>
            <div style={styles.trustItem}>
              <div style={styles.trustNumber}>~90s</div>
              <p style={styles.trustLabel}>bis frisches Popcorn</p>
            </div>
          </div>
        </div>
      </section>

      <section style={styles.section}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>Warum AirPop Go von Popcorn2Go?</h2>
          <p style={styles.sectionText}>
            Wenn du eine Popcornmaschine im Saarland mieten willst, brauchst du ein Angebot, das nicht nur funktioniert, sondern Eindruck macht.
          </p>

          <div style={styles.grid3}>
            {benefits.map((item, index) => (
              <div key={index} style={styles.card}>
                <h3 style={styles.cardTitle}>Vorteil {index + 1}</h3>
                <p style={styles.cardText}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={styles.darkSection}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitleLight}>Was AirPop Go besonders macht</h2>
          <p style={styles.sectionTextLight}>
            Nicht einfach nur ein Automat, sondern ein starkes Event-Element mit frischer Zubereitung, wenig Aufwand und hoher Aufmerksamkeit.
          </p>

          <div style={styles.grid3}>
            {machineHighlights.map((item, index) => (
              <div key={index} style={styles.darkCard}>
                <h3 style={styles.darkCardTitle}>{item.title}</h3>
                <p style={styles.darkCardText}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={styles.subtleSection}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>Unser Mais – Qualität, die man schmeckt</h2>
          <p style={styles.sectionText}>
            Für unser Popcorn verwenden wir speziell veredelten Mais aus ausgewählten Anbaugebieten.
            {"\n"}So entsteht ein hochwertiges Geschmackserlebnis, das nicht nur frisch aussieht, sondern auch qualitativ überzeugt.
          </p>

          <div style={styles.grid4}>
            {cornQualityPoints.map((item, index) => (
              <div key={index} style={styles.card}>
                <h3 style={styles.cardTitle}>{item.title}</h3>
                <p style={styles.cardText}>{item.text}</p>
              </div>
            ))}
          </div>

          <div style={styles.extrasBox}>
            <h3 style={{ ...styles.cardTitle, marginBottom: "12px" }}>
              Kurz zusammengefasst
            </h3>
            <ul style={styles.list}>
              <li style={styles.listItem}>Speziell veredelter Popcornmais</li>
              <li style={styles.listItem}>Glutenfrei</li>
              <li style={styles.listItem}>Ohne Farbstoffe</li>
              <li style={styles.listItem}>Ohne Gentechnik hergestellt</li>
              <li style={styles.listItem}>Zertifizierte Qualität und ausgewählte Partner</li>
            </ul>
          </div>
        </div>
      </section>

      <section style={styles.subtleSection}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>Für welche Events eignet sich AirPop Go?</h2>
          <p style={styles.sectionText}>
            Ob Popcornmaschine für Geburtstage, Firmenfeiern oder Promotion – AirPop Go passt zu vielen Einsatzbereichen.
          </p>

          <div style={styles.grid4}>
            {targetGroups.map((item, index) => (
              <div key={index} style={styles.card}>
                <h3 style={styles.cardTitle}>{item.title}</h3>
                <p style={styles.cardText}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={styles.section}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>Vertrauen, das Anfragen leichter macht</h2>
          <p style={styles.sectionText}>
            Klare Kommunikation, planbarer Ablauf und ein Angebot, das direkt überzeugt – ohne unnötige Komplexität.
          </p>

          <div style={styles.grid3}>
            {trustHighlights.map((item, index) => (
              <div key={index} style={styles.card}>
                <h3 style={styles.cardTitle}>{item.title}</h3>
                <p style={styles.cardText}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={styles.section}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>Technische Daten auf einen Blick</h2>
          <p style={styles.sectionText}>
            Kompakt, mobil und einfach planbar – hier siehst du die wichtigsten Eckdaten des AirPop Go.
          </p>

          <div style={styles.specGrid}>
            {techSpecs.map((item, index) => (
              <div key={index} style={styles.specRow}>
                <span style={styles.specLabel}>{item.label}</span>
                <span style={styles.specValue}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={styles.section}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>AirPop Go im Überblick</h2>
          <p style={styles.sectionText}>
            Der AirPop Go ist mehr als ein Popcornautomat – er zieht Blicke auf sich, sorgt für Stimmung und macht dein Event unvergesslich.
          </p>

          <div style={styles.grid3}>
            <div style={styles.imageCard}>
              <img
                src="/images/airpopgo-2.jpg"
                alt="Popcorn Automat AirPop Go mieten Saarland"
                style={styles.image}
              />
              <div style={styles.imageCaption}>Der Automat im Überblick</div>
            </div>

            <div style={styles.imageCard}>
              <img
                src="/images/airpopgo-3.jpg"
                alt="Popcorn Automat Ausgabe frisch Popcorn Event"
                style={styles.image}
              />
              <div style={styles.imageCaption}>Frische Popcorn-Ausgabe</div>
            </div>

            <div style={styles.imageCard}>
              <img
                src="/images/airpopgo-4.jpg"
                alt="Popcornmaschine mit Münzeinwurf Event"
                style={styles.image}
              />
              <div style={styles.imageCaption}>Optional mit Münzeinwurf</div>
            </div>
          </div>
        </div>
      </section>

      <section style={styles.darkSection}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitleLight}>Warum der Münzeinwurf ein echter Mehrwert ist</h2>
          <p style={styles.sectionTextLight}>
            Nicht nur ein Extra, sondern ein starkes Feature für Aufmerksamkeit, Interaktion und Erlebnisfaktor.
          </p>

          <div style={styles.grid3}>
            {coinBenefits.map((item, index) => (
              <div key={index} style={styles.darkCard}>
                <h3 style={styles.darkCardTitle}>Mehrwert {index + 1}</h3>
                <p style={styles.darkCardText}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={styles.section}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>So einfach läuft’s ab</h2>
          <p style={styles.sectionText}>
            Von der Anfrage bis zur Abholung: klar, schnell und ohne Stress.
          </p>

          <div style={styles.grid4}>
            {steps.map((step, index) => (
              <div key={index} style={styles.card}>
                <h3 style={styles.cardTitle}>{step.title}</h3>
                <p style={styles.cardText}>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={styles.subtleSection}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>Im Saarland für dich unterwegs</h2>
          <p style={styles.sectionText}>
            Wir liefern AirPop Go im gesamten Saarland, zum Beispiel nach Saarbrücken, Neunkirchen, Saarlouis, St. Wendel, Homburg und Völklingen.
            {"\n"}Wenn du eine Popcornmaschine im Saarland mieten willst, prüfen wir schnell die Verfügbarkeit für deinen Termin.
          </p>

          <div style={styles.locationsWrap}>
            {locationAreas.map((area, index) => (
              <span key={index} style={styles.locationChip}>
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section style={styles.section}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>Preise & Pakete</h2>
          <p style={styles.sectionText}>
            Transparent kalkuliert, flexibel einsetzbar und direkt anfragbar.
          </p>

          <div style={styles.pricingIntro}>
            Für private Feiern sind meist Tages-Tarif oder Wochenend-Special besonders interessant. Für Unternehmen, Promotion und regelmäßige Einsätze sind Business-Abo und Partner-Modell oft die stärkere Lösung.
            {"\n"}20 km Anfahrt inklusive, danach nur 0,60 €/km
          </div>

          <div style={styles.pricingGrid}>
            {prices.map((item, index) => {
              const isPopular = item.badge === "Beliebt";
              const isPartner = item.title === "Partner-Modell";

              return (
                <div
                  key={index}
                  style={
                    isPopular
                      ? styles.popularCard
                      : isPartner
                        ? styles.partnerCard
                        : styles.priceCard
                  }
                >
                  {isPopular ? <div style={styles.badge}>{item.badge}</div> : null}
                  {isPartner ? <div style={styles.partnerBadge}>{item.badge}</div> : null}

                  <div>
                    <h3 style={styles.cardTitle}>{item.title}</h3>
                    <div style={styles.price}>{item.price}</div>
                    <p style={styles.priceDescription}>{item.description}</p>
                    <div style={styles.priceOrientation}>{item.orientation}</div>

                    <ul style={styles.featureList}>
                      {item.features.map((feature, featureIndex) => (
                        <li key={featureIndex} style={styles.listItem}>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    style={
                      isPopular
                        ? styles.popularButton
                        : isPartner
                          ? styles.partnerButton
                          : styles.packageButton
                    }
                    onMouseEnter={
                      isPopular
                        ? orangeHoverIn
                        : isPartner
                          ? whatsappHoverIn
                          : buttonHoverIn
                    }
                    onMouseLeave={
                      isPopular
                        ? orangeHoverOut
                        : isPartner
                          ? whatsappHoverOut
                          : buttonHoverOut
                    }
                    onClick={() => handlePackageRequest(item.title)}
                  >
                    {item.cta}
                  </button>
                </div>
              );
            })}
          </div>

          <div style={styles.extrasBox}>
            <h3 style={{ ...styles.cardTitle, marginBottom: "12px" }}>Extras</h3>
            <ul style={styles.list}>
              {extras.map((extra, index) => (
                <li key={index} style={styles.listItem}>
                  {extra}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section style={styles.section}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>Echte Eindrücke vom Einsatz</h2>
          <p style={styles.sectionText}>
            Neben Produktbildern verkauft vor allem der echte Einsatz auf Veranstaltungen, Feiern und Promotion-Flächen.
          </p>

          <div style={styles.grid2}>
            <div style={styles.imageCard}>
              <img
                src="/images/airpopgo-1.jpg"
                alt="Popcornmaschine auf Event im Saarland"
                style={styles.galleryImage}
              />
              <div style={styles.imageCaption}>AirPop Go als Highlight auf Veranstaltungen</div>
            </div>

            <div style={styles.imageCard}>
              <img
                src="/images/airpopgo-3.jpg"
                alt="Frische Popcorn-Ausgabe bei Event"
                style={styles.galleryImage}
              />
              <div style={styles.imageCaption}>Frische Ausgabe direkt vor Ort</div>
            </div>

            <div style={styles.imageCard}>
              <img
                src="/images/airpopgo-4.jpg"
                alt="Münzeinwurf Popcornmaschine Eventeinsatz"
                style={styles.galleryImage}
              />
              <div style={styles.imageCaption}>Münzeinwurf für interaktive Einsätze</div>
            </div>

            <div style={styles.imageCard}>
              <img
                src="/images/airpopgo-2.jpg"
                alt="Popcornmaschine für Promotion und POS"
                style={styles.galleryImage}
              />
              <div style={styles.imageCaption}>Geeignet für Promotion, POS und Laufkundschaft</div>
            </div>
          </div>
        </div>
      </section>

      <section id="anfrage" style={styles.section}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>
            In 30 Sekunden zur Anfrage – wir melden uns schnell zurück
          </h2>
          <p style={styles.sectionText}>
            Unverbindliche Anfrage – wir melden uns schnell zurück. Keine automatische Buchung.
          </p>

          <div style={styles.formWrap}>
            <div style={styles.infoBox}>
              <h3 style={styles.cardTitle}>Popcorn2Go</h3>
              <p style={styles.cardText}>
                AirPop Go für Saarland und Umgebung. Lieferung, Aufbau und
                Abholung erfolgen immer durch Popcorn2Go.
              </p>

              <ul style={styles.contactList}>
                <li style={styles.contactItem}>
                  <strong>Telefon:</strong>{" "}
                  <a href="tel:+491702880296">+49 (0)170-2880296</a>
                </li>
                <li style={styles.contactItem}>
                  <strong>E-Mail:</strong>{" "}
                  <a href="mailto:popcorn2go@outlook.de">popcorn2go@outlook.de</a>
                </li>
                <li style={styles.contactItem}>
                  <strong>Region:</strong> Saarland und Umgebung
                </li>
                <li style={styles.contactItem}>
                  <strong>Anfahrt:</strong> 20 km Anfahrt inklusive, danach nur 0,60 €/km, danach nur 0,60 €/km
                </li>
              </ul>

              <div style={styles.miniContactGrid}>
                <div style={styles.miniContactCard}>
                  <p style={styles.miniContactTitle}>Sofort per WhatsApp anfragen</p>
                  <p style={styles.miniContactText}>
                    Ideal für kurzfristige Fragen oder schnelle Terminchecks.
                  </p>
                </div>
                <div style={styles.miniContactCard}>
                  <p style={styles.miniContactTitle}>Kompakt planbar</p>
                  <p style={styles.miniContactText}>
                    Ca. 36,5 cm breit, 154 cm hoch und mit normalem 220V Stromanschluss nutzbar.
                  </p>
                </div>
              </div>

              <div style={styles.formHintBox}>
                <p style={{ ...styles.miniContactTitle, marginBottom: "10px" }}>
                  Hilfreich für eine schnelle Rückmeldung
                </p>
                <ul style={styles.list}>
                  {requestHelpItems.map((item, index) => (
                    <li key={index} style={styles.listItem}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ marginTop: "18px" }}>
                <button
                  style={styles.whatsappHeroButton}
                  onMouseEnter={whatsappHoverIn}
                  onMouseLeave={whatsappHoverOut}
                  onClick={() =>
                    openWhatsApp("Hallo, ich möchte AirPop Go für mein Event anfragen.")
                  }
                >
                  Sofort per WhatsApp anfragen
                </button>
              </div>
            </div>

            <form style={styles.formBox} onSubmit={handleSubmit}>
              <p
  style={{
    fontSize: "16px",
    fontWeight: 600,
    marginBottom: "16px",
    color: "#374151",
  }}
>
  Je mehr Infos du angibst, desto schneller bekommst du ein passendes Angebot.
</p>
              <div style={styles.formGrid}>
                <div>
                  <label style={styles.label}>Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    style={styles.input}
                    placeholder="Dein Name"
                    required
                  />
                </div>

                <div>
                  <label style={styles.label}>Firma</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    style={styles.input}
                    placeholder="Optional"
                  />
                </div>

                <div>
                  <label style={styles.label}>Telefon *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    style={styles.input}
                    placeholder="+49 ..."
                    required
                  />
                </div>

                <div>
                  <label style={styles.label}>E-Mail *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    style={styles.input}
                    placeholder="name@mail.de"
                    required
                  />
                </div>

                <div>
                  <label style={styles.label}>Datum</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    style={styles.input}
                  />
                </div>

                <div>
  <label style={styles.label}>Anlass der Veranstaltung</label>
  <input
    type="text"
    name="eventType"
    value={formData.eventType || ""}
    onChange={handleChange}
    style={styles.input}
    placeholder="z. B. Geburtstag, Firmenfeier, Promotion"
  />
</div>

<div>
  <label style={styles.label}>Ungefähre Gästezahl</label>
  <input
    type="text"
    name="guests"
    value={formData.guests || ""}
    onChange={handleChange}
    style={styles.input}
    placeholder="z. B. 30, 80, 200"
  />
</div>

<div>
  <label style={styles.label}>Gewünschtes Paket</label>
  <select
    name="selectedPackage"
    value={formData.selectedPackage || ""}
    onChange={handleChange}
    style={styles.input}
  >
    <option value="">Bitte auswählen</option>
    <option value="Tages-Tarif">Tages-Tarif</option>
    <option value="Wochenend-Special">Wochenend-Special</option>
    <option value="Rundum-Sorglos-Paket">Rundum-Sorglos-Paket</option>
    <option value="Business-Monatsabo">Business-Monatsabo</option>
    <option value="Partner-Modell">Partner-Modell</option>
  </select>
</div>

                <div>
                  <label style={styles.label}>Einsatzort</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    style={styles.input}
                    placeholder="Ort / Location"
                  />
                </div>

                <div style={styles.fullWidth}>
                  <label style={styles.label}>Nachricht</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    style={styles.textarea}
                    placeholder="Weitere Infos, Wünsche oder Fragen zu deinem Event"
                  />
                </div>
              </div>

              <div style={{ marginTop: "18px" }}>
                <button
                  type="submit"
                  style={{
                    ...styles.submitButton,
                    minWidth: isMobile ? "100%" : "320px",
                  }}
                  onMouseEnter={orangeHoverIn}
                  onMouseLeave={orangeHoverOut}
                >
                  Jetzt Termin unverbindlich anfragen
                </button>
              </div>
              <p
                style={{
               fontSize: "13px",
               color: "#6b7280",
               marginTop: "10px",
               lineHeight: 1.5,
             }}
          >
             ✔ Antwort meist innerhalb weniger Stunden
            <br />
             ✔ Unverbindlich und kostenlos
          </p>
            </form>
          </div>
        </div>
      </section>

      <section style={styles.section}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>Kundenstimmen & Feedback</h2>
          <p style={styles.sectionText}>
            Echte Kundenmeinungen aus dem Saarland.
            ⭐ Bereits mehrfach erfolgreich im Einsatz
          </p>

          <div style={styles.feedbackTopBar}>
            <button
              type="button"
              style={styles.feedbackButton}
              onMouseEnter={buttonHoverIn}
              onMouseLeave={buttonHoverOut}
              onClick={() => setShowFeedbackForm((prev) => !prev)}
            >
              {showFeedbackForm ? "Feedback-Formular schließen" : "Feedback abgeben"}
            </button>

            {isAdminUnlocked ? (
              <>
                <button
                  type="button"
                  style={styles.feedbackSecondaryButton}
                  onMouseEnter={secondaryHoverIn}
                  onMouseLeave={secondaryHoverOut}
                  onClick={() => setShowAdminPanel((prev) => !prev)}
                >
                  {showAdminPanel
                    ? "Freigabe-Bereich schließen"
                    : `Freigabe-Bereich (${pendingFeedbacks.length})`}
                </button>

                <button
                  type="button"
                  style={styles.feedbackSecondaryButton}
                  onMouseEnter={secondaryHoverIn}
                  onMouseLeave={secondaryHoverOut}
                  onClick={handleAdminLogout}
                >
                  Admin abmelden
                </button>
              </>
            ) : (
              <button
                type="button"
                style={styles.feedbackSecondaryButton}
                onMouseEnter={secondaryHoverIn}
                onMouseLeave={secondaryHoverOut}
                onClick={() => setShowAdminPanel((prev) => !prev)}
              >
                Admin-Bereich öffnen
              </button>
            )}
          </div>

          {showFeedbackForm && (
            <form style={styles.feedbackFormBox} onSubmit={handleFeedbackSubmit}>
              <div style={styles.feedbackFormGrid}>
                <div>
                  <label style={styles.label}>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={feedbackForm.name}
                    onChange={handleFeedbackChange}
                    style={styles.input}
                    placeholder="Dein Name"
                    required
                  />
                </div>

                <div>
                  <label style={styles.label}>Bewertung</label>
                  <select
                    name="rating"
                    value={feedbackForm.rating}
                    onChange={handleFeedbackChange}
                    style={styles.input}
                  >
                    <option value="5">5 Sterne</option>
                    <option value="4">4 Sterne</option>
                    <option value="3">3 Sterne</option>
                    <option value="2">2 Sterne</option>
                    <option value="1">1 Stern</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label style={styles.label}>Feedback</label>
                <textarea
                  name="text"
                  value={feedbackForm.text}
                  onChange={handleFeedbackChange}
                  style={styles.textarea}
                  placeholder="Wie war deine Erfahrung mit Popcorn2Go?"
                  required
                />
              </div>

              <div style={styles.feedbackActions}>
                <button
                  type="submit"
                  style={{
                    ...styles.submitButton,
                    flex: isMobile ? "unset" : "0 0 auto",
                  }}
                  onMouseEnter={orangeHoverIn}
                  onMouseLeave={orangeHoverOut}
                >
                  Feedback absenden
                </button>

                <button
                  type="button"
                  style={{
                    ...styles.feedbackSecondaryButton,
                    flex: isMobile ? "unset" : "0 0 auto",
                  }}
                  onMouseEnter={secondaryHoverIn}
                  onMouseLeave={secondaryHoverOut}
                  onClick={() => {
                    setFeedbackForm({
                      name: "",
                      rating: "5",
                      text: "",
                    });
                    setShowFeedbackForm(false);
                  }}
                >
                  Abbrechen
                </button>
              </div>

              <div style={{ ...styles.adminMeta, marginTop: "14px" }}>
                Neues Feedback wird erst nach Freigabe öffentlich angezeigt.
              </div>
            </form>
          )}

          {showAdminPanel && !isAdminUnlocked && (
            <form style={styles.adminLoginBox} onSubmit={handleAdminUnlock}>
              <h3 style={{ ...styles.cardTitle, marginBottom: "14px" }}>
                Admin-Zugang
              </h3>

              <label style={styles.label}>Passwort</label>
              <input
                type="password"
                value={adminPasswordInput}
                onChange={(e) => {
                  setAdminPasswordInput(e.target.value);
                  setAdminPasswordError("");
                }}
                style={styles.input}
                placeholder="Admin-Passwort eingeben"
                required
              />

              {adminPasswordError ? (
                <div style={styles.adminError}>{adminPasswordError}</div>
              ) : null}

              <div style={{ ...styles.feedbackActions, marginTop: "16px" }}>
                <button
                  type="submit"
                  style={{
                    ...styles.submitButton,
                    flex: isMobile ? "unset" : "0 0 auto",
                    minWidth: isMobile ? "100%" : "260px",
                  }}
                  onMouseEnter={orangeHoverIn}
                  onMouseLeave={orangeHoverOut}
                >
                  Freigabe-Bereich entsperren
                </button>

                <button
                  type="button"
                  style={{
                    ...styles.feedbackSecondaryButton,
                    flex: isMobile ? "unset" : "0 0 auto",
                    minWidth: isMobile ? "100%" : "140px",
                  }}
                  onMouseEnter={secondaryHoverIn}
                  onMouseLeave={secondaryHoverOut}
                  onClick={() => {
                    setShowAdminPanel(false);
                    setAdminPasswordInput("");
                    setAdminPasswordError("");
                  }}
                >
                  Schließen
                </button>
              </div>
            </form>
          )}

          {showAdminPanel && isAdminUnlocked && (
            <div style={styles.adminPanel}>
              <h3 style={{ ...styles.cardTitle, marginBottom: "14px" }}>
                Feedback-Freigabe
              </h3>

              {pendingFeedbacks.length === 0 ? (
                <div style={styles.emptyState}>
                  Aktuell wartet kein Feedback auf Freigabe.
                </div>
              ) : (
                pendingFeedbacks.map((item) => (
                  <div key={item.id} style={styles.adminCard}>
                    <div style={styles.adminHeader}>
                      <strong>{item.name}</strong>
                      <span style={styles.smallBadge}>Wartet auf Freigabe</span>
                    </div>

                    <div style={styles.stars}>
                      {"★".repeat(Number(item.rating || 5))}
                    </div>

                    <div style={styles.adminMeta}>
                      Eingegangen:{" "}
                      {new Date(item.createdAt).toLocaleString("de-DE")}
                    </div>

                    <p style={{ ...styles.quote, marginBottom: 0 }}>
                      “{item.text}”
                    </p>

                    <div style={styles.adminActions}>
                      <button
                        type="button"
                        style={styles.adminApproveButton}
                        onMouseEnter={buttonHoverIn}
                        onMouseLeave={buttonHoverOut}
                        onClick={() => handleApproveFeedback(item.id)}
                      >
                        Freigeben
                      </button>

                      <button
                        type="button"
                        style={styles.dangerButton}
                        onMouseEnter={secondaryHoverIn}
                        onMouseLeave={secondaryHoverOut}
                        onClick={() => handleDeleteFeedback(item.id)}
                      >
                        Löschen
                      </button>
                    </div>
                  </div>
                ))
              )}

              <h3 style={{ ...styles.cardTitle, margin: "28px 0 14px" }}>
                Bereits freigegebene Feedbacks
              </h3>

              {approvedUserFeedbacks.length === 0 ? (
                <div style={styles.emptyState}>
                  Aktuell gibt es keine freigegebenen Feedbacks.
                </div>
              ) : (
                approvedUserFeedbacks.map((item) => (
                  <div key={`approved-${item.id}`} style={styles.adminCard}>
                    <div style={styles.adminHeader}>
                      <strong>{item.name}</strong>
                      <span style={styles.smallBadge}>Freigegeben</span>
                    </div>

                    <div style={styles.stars}>
                      {"★".repeat(Number(item.rating || 5))}
                    </div>

                    <div style={styles.adminMeta}>
                      Freigegebenes Feedback vom{" "}
                      {new Date(item.createdAt).toLocaleString("de-DE")}
                    </div>

                    <p style={{ ...styles.quote, marginBottom: 0 }}>
                      “{item.text}”
                    </p>

                    <div style={styles.adminActions}>
                      <button
                        type="button"
                        style={styles.dangerButton}
                        onMouseEnter={secondaryHoverIn}
                        onMouseLeave={secondaryHoverOut}
                        onClick={() => handleDeleteFeedback(item.id)}
                      >
                        Sichtbares Feedback löschen
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          <div style={styles.grid3}>
            {allTestimonials.map((item, index) => (
              <div key={`${item.name}-${index}`} style={styles.testimonialCard}>
                <div style={styles.stars}>
                  {"★".repeat(Number(item.rating || 5))}
                </div>
                <p style={styles.quote}>“{item.text}”</p>
                <p style={styles.author}>{item.name}</p>
                {item.isUserFeedback && (
                  <span style={styles.smallBadge}>Freigegebenes Kundenfeedback</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={styles.subtleSection}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>Häufige Fragen vor der Anfrage</h2>
          <p style={styles.sectionText}>
            Eine kleine FAQ nimmt Unsicherheiten raus und macht die Entscheidung leichter.
          </p>

          <div style={styles.grid2}>
            {faqItems.map((item, index) => (
              <div key={index} style={styles.faqCard}>
                <h3 style={styles.faqQuestion}>{item.question}</h3>
                <p style={styles.faqAnswer}>{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={styles.ctaSection}>
        <div style={styles.container}>
          <div style={styles.ctaBox}>
            <h2 style={styles.ctaTitle}>
              Sichere dir jetzt AirPop Go für dein Event
            </h2>
            <p style={styles.ctaText}>
              Ob Geburtstag, Firmenveranstaltung oder Promotion: Popcorn2Go bringt das Highlight direkt zu dir.
              {"\n"}Begrenzte Verfügbarkeit – sichere dir jetzt deinen Wunschtermin.
            </p>

            <div style={styles.closingStrip}>
              {closingBenefits.map((item, index) => (
                <div key={index} style={styles.closingItem}>
                  {item}
                </div>
              ))}
            </div>

            <div style={styles.buttonRow}>
              <button
                style={styles.primaryButton}
                onMouseEnter={buttonHoverIn}
                onMouseLeave={buttonHoverOut}
                onClick={() => handlePackageRequest("Wochenend-Special")}
              >
                Jetzt Verfügbarkeit prüfen
              </button>

              <button
                style={styles.whatsappHeroButton}
                onMouseEnter={whatsappHoverIn}
                onMouseLeave={whatsappHoverOut}
                onClick={() =>
                  openWhatsApp("Hallo, ich möchte AirPop Go für mein Event reservieren.")
                }
              >
                Sofort per WhatsApp anfragen
              </button>
            </div>
              </div>

<div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "6px" }}>
  <span style={{ fontSize: "14px", color: "#374151", fontWeight: 500 }}>
    ⭐ Beliebt für Geburtstage & Firmenfeiern
  </span>
  <span style={{ fontSize: "14px", color: "#374151", fontWeight: 500 }}>
    📍 Im gesamten Saarland im Einsatz
  </span>
</div>
<div style={{ marginTop: "10px", fontSize: "14px", color: "#111827", fontWeight: 700 }}>
   🔥 Beliebte Wochenenden sind oft früh ausgebucht – sichere dir rechtzeitig deinen Termin.
</div>
<div style={styles.footerNote}>
            <div style={styles.footerNote}>
              Popcorn2Go · Tel. +49 (0)170-2880296 · popcorn2go@outlook.de
            </div>
          </div>
        </div>
      </section>

      <button
        type="button"
        style={styles.whatsappFloat}
        onMouseEnter={whatsappHoverIn}
        onMouseLeave={whatsappHoverOut}
        onClick={() =>
          openWhatsApp("Hallo, ich interessiere mich für AirPop Go.")
        }
        aria-label="WhatsApp Kontakt öffnen"
      >
        <span style={styles.whatsappDot} />
        WhatsApp
      </button>

      <style>
        {`
          @keyframes popcornFromMachine {
            0% {
              opacity: 0;
              transform:
                translateX(-50%)
                translateY(0)
                scale(0.16)
                rotate(0deg);
            }

            6% {
              opacity: 1;
              transform:
                translateX(-50%)
                translateY(0)
                scale(0.92)
                rotate(8deg);
            }

            22% {
              opacity: 1;
              transform:
                translateX(calc(-50% + var(--popcorn-mid-x)))
                translateY(calc(var(--popcorn-top-y) * 0.58))
                scale(1)
                rotate(calc(var(--popcorn-rotate) * 0.22));
            }

            38% {
              opacity: 1;
              transform:
                translateX(calc(-50% + var(--popcorn-curve-x)))
                translateY(var(--popcorn-top-y))
                scale(1.04)
                rotate(calc(var(--popcorn-rotate) * 0.45));
            }

            64% {
              opacity: 1;
              transform:
                translateX(calc(-50% + calc(var(--popcorn-final-x) * 0.94)))
                translateY(calc(var(--popcorn-top-y) * 0.28))
                scale(1.06)
                rotate(calc(var(--popcorn-rotate) * 0.72));
            }

            82% {
              opacity: 1;
              transform:
                translateX(calc(-50% + var(--popcorn-final-x)))
                translateY(var(--popcorn-bottom-y))
                scaleX(calc(var(--popcorn-squash) * 1.08))
                scaleY(calc(var(--popcorn-squash) * 0.82))
                rotate(var(--popcorn-rotate));
            }

            90% {
              opacity: 1;
              transform:
                translateX(calc(-50% + var(--popcorn-final-x)))
                translateY(calc(var(--popcorn-bottom-y) - 8px))
                scaleX(calc(var(--popcorn-squash) * 0.98))
                scaleY(calc(var(--popcorn-squash) * 1.02))
                rotate(calc(var(--popcorn-rotate) * 0.98));
            }

            97% {
              opacity: 1;
              transform:
                translateX(calc(-50% + var(--popcorn-final-x)))
                translateY(var(--popcorn-bottom-y))
                scale(var(--popcorn-squash))
                rotate(var(--popcorn-rotate));
            }

            100% {
              opacity: 0;
              transform:
                translateX(calc(-50% + var(--popcorn-final-x)))
                translateY(var(--popcorn-bottom-y))
                scale(var(--popcorn-squash))
                rotate(var(--popcorn-rotate));
            }
          }
        `}
      </style>
    </div>
  );
}