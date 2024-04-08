const recipes = [
  {
    name: "zurek",
    steps: "zagotuj wode",
    is_warm: true,
    icon_link: "/vite.svg",
    is_public: true,
    ingredients: [
      {
        ingredient: "jajko",
        quantity: 5,
      },
      {
        ingredient: "kielba",
        quantity: 3,
      },
    ],
    categories: ["fast", "healthy"],
    flavours: ["spicy"],
    type_name: "breakfast",
    user_login: "mati",
  },
  {
    name: "cezar",
    steps: [
      "Umieść sałatę w misce.",
      "Dodaj pokrojone pomidory.",
      "Wrzuć kawałki kurczaka.",
      "Posyp startym serem.",
      "Polej sosem cezar.",
    ],
    is_warm: false,
    icon_link: "/vite.svg",
    is_public: true,
    ingredients: [
      { ingredient: "Sałata rzymska", quantity: 1 },
      { ingredient: "Pomidory", quantity: 2 },
      { ingredient: "Filety z kurczaka", quantity: 2 },
      { ingredient: "Ser żółty", quantity: 50 },
      { ingredient: "Sos cezar", quantity: 3 },
    ],
    categories: ["Sałatka"],
    flavours: ["Wyważony"],
    type_name: "Kolacja",
    user_login: "smakosz88",
  },
  {
    name: "pomidorowa z makaronem",
    steps: [
      "Zagotuj wodę.",
      "Dodaj kostkę rosołową.",
      "Wrzuć pokrojone pomidory.",
      "Gotuj przez 10 minut.",
      "Dodaj ugotowany makaron.",
    ],
    is_warm: true,
    icon_link: "/vite.svg",
    is_public: true,
    ingredients: [
      { ingredient: "Pomidory", quantity: 4 },
      { ingredient: "Makaron", quantity: 100 },
    ],
    categories: ["Zupa"],
    flavours: ["Pikantny"],
    type_name: "Obiad",
    user_login: "kucharka123",
  },
];

export default recipes;
