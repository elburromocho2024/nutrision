import { DailyPlan, Supermarket, Recipe, MealType } from "../types";
import { GoogleGenAI, Type } from "@google/genai";

// --- CONFIGURATION DES IMAGES ---
const LOMO_SALTADO_IMAGE = "https://tse4.mm.bing.net/th?q=Lomo%20Saltado%20Peruvian%20Black%20Plate%20Gourmet%20Presentation&w=1200&h=1200&c=7&rs=1&p=0&dpr=2&pid=1.7&mkt=fr-CH&adlt=moderate";

// --- UTILITAIRES PRIX ---
const createPrice = (base: number) => ({
  [Supermarket.MIGROS]: parseFloat((base).toFixed(2)),
  [Supermarket.COOP]: parseFloat((base * 1.05).toFixed(2)),
  [Supermarket.ALDI]: parseFloat((base * 0.70).toFixed(2)),
  [Supermarket.LIDL]: parseFloat((base * 0.65).toFixed(2)),
  [Supermarket.DENNER]: parseFloat((base * 0.75).toFixed(2)),
  [Supermarket.ALIGRO]: parseFloat((base * 0.68).toFixed(2)),
});

// --- PETITS DÉJEUNERS FAMILLE (7 VARIATIONS) ---

// Lundi : Le Classique Confiture
const BK_MON: Recipe = {
  title: "Tartines Confiture & Pomme",
  description: "Réveil en douceur : pain beurré confiture, yaourt nature et quartiers de pomme.",
  ingredients: [
    { item: "Pain de campagne", quantity: "4 tranches", category: "Boulangerie" },
    { item: "Beurre & Confiture", quantity: "Assortiment", category: "Epicerie" },
    { item: "Yaourt Nature", quantity: "2 pots", category: "Crèmerie" },
    { item: "Pomme", quantity: "2 pcs", category: "Fruits" },
    { item: "Jus d'Orange", quantity: "2 verres", category: "Boissons" }
  ],
  instructions: [
    "Faire griller les tranches de pain légèrement pour qu'elles soient croustillantes.",
    "Beurrer généreusement et ajouter la confiture de votre choix.",
    "Laver les pommes et les couper en quartiers (garder la peau pour les vitamines).",
    "Servir avec le yaourt nature et un verre de jus d'orange frais."
  ],
  prepTimeMinutes: 5, cookTimeMinutes: 0, calories: 400,
  priceComparison: createPrice(3.50), isPremiumVideoAvailable: false, protein: "10g", starch: "50g", vegetable: "0g"
};

// Mardi : Miel & Banane
const BK_TUE: Recipe = {
  title: "Tartines Miel & Banane",
  description: "Énergie durable : pain complet au miel, banane riche en potassium.",
  ingredients: [
    { item: "Pain complet", quantity: "4 tranches", category: "Boulangerie" },
    { item: "Miel", quantity: "2 cs", category: "Epicerie" },
    { item: "Yaourt Vanille", quantity: "2 pots", category: "Crèmerie" },
    { item: "Banane", quantity: "2 pcs", category: "Fruits" },
    { item: "Jus de Pomme", quantity: "2 verres", category: "Boissons" }
  ],
  instructions: [
    "Toaster le pain complet.",
    "Napper de miel liquide.",
    "Couper les bananes en rondelles et les disposer sur les tartines ou les manger à côté.",
    "Déguster avec le yaourt à la vanille."
  ],
  prepTimeMinutes: 3, cookTimeMinutes: 0, calories: 420,
  priceComparison: createPrice(3.80), isPremiumVideoAvailable: false, protein: "12g", starch: "55g", vegetable: "0g"
};

// Mercredi : Pâte à Tartiner (Plaisir des enfants)
const BK_WED: Recipe = {
  title: "Tartines Choco & Poire",
  description: "Le plaisir du mercredi : une touche de chocolat avec une poire fraîche.",
  ingredients: [
    { item: "Pain ou Brioche", quantity: "4 tranches", category: "Boulangerie" },
    { item: "Pâte à tartiner", quantity: "30g", category: "Epicerie" },
    { item: "Fromage Blanc", quantity: "200g", category: "Crèmerie" },
    { item: "Poire", quantity: "2 pcs", category: "Fruits" },
    { item: "Jus Multivitaminé", quantity: "2 verres", category: "Boissons" }
  ],
  instructions: [
    "Si vous utilisez de la brioche, la faire tiédir légèrement.",
    "Étaler la pâte à tartiner.",
    "Éplucher la poire si la peau est épaisse, sinon la laver et la croquer.",
    "Mélanger le fromage blanc pour le rendre onctueux et servir."
  ],
  prepTimeMinutes: 5, cookTimeMinutes: 0, calories: 450,
  priceComparison: createPrice(4.00), isPremiumVideoAvailable: false, protein: "14g", starch: "45g", vegetable: "0g"
};

// Jeudi : Céréales & Clémentines
const BK_THU: Recipe = {
  title: "Pain Grillé & Clémentines",
  description: "Vitamines C : tartines croustillantes et clémentines faciles à éplucher.",
  ingredients: [
    { item: "Pain aux céréales", quantity: "4 tranches", category: "Boulangerie" },
    { item: "Beurre doux", quantity: "20g", category: "Crèmerie" },
    { item: "Petit Suisse", quantity: "4 pots", category: "Crèmerie" },
    { item: "Clémentines", quantity: "4 pcs", category: "Fruits" },
    { item: "Jus d'Orange", quantity: "2 verres", category: "Boissons" }
  ],
  instructions: [
    "Griller le pain aux céréales.",
    "Beurrer immédiatement pour que le beurre fonde légèrement.",
    "Éplucher les clémentines et séparer les quartiers.",
    "Démouler les petits suisses dans un bol, ajouter un peu de sucre si désiré."
  ],
  prepTimeMinutes: 5, cookTimeMinutes: 0, calories: 380,
  priceComparison: createPrice(3.90), isPremiumVideoAvailable: false, protein: "16g", starch: "40g", vegetable: "0g"
};

// Vendredi : Kiwi & Biscottes
const BK_FRI: Recipe = {
  title: "Biscottes & Kiwi",
  description: "Rapide et efficace : biscottes craquantes et kiwi pour le tonus.",
  ingredients: [
    { item: "Biscottes/Cracottes", quantity: "6 pcs", category: "Epicerie" },
    { item: "Beurre & Miel", quantity: "Assortiment", category: "Epicerie" },
    { item: "Yaourt aux fruits", quantity: "2 pots", category: "Crèmerie" },
    { item: "Kiwi", quantity: "2 pcs", category: "Fruits" },
    { item: "Jus de Raisin", quantity: "2 verres", category: "Boissons" }
  ],
  instructions: [
    "Beurrer les biscottes (attention à ne pas les casser !).",
    "Couper les kiwis en deux et les manger à la petite cuillère.",
    "Servir avec le yaourt aux fruits et le jus."
  ],
  prepTimeMinutes: 4, cookTimeMinutes: 0, calories: 390,
  priceComparison: createPrice(3.20), isPremiumVideoAvailable: false, protein: "8g", starch: "50g", vegetable: "0g"
};

// Samedi : Brioche & Fruits Rouges
const BK_SAT: Recipe = {
  title: "Brioche & Fruits Rouges",
  description: "Douceur du weekend : brioche moelleuse et fraîcheur des fruits.",
  ingredients: [
    { item: "Brioche tranchée", quantity: "4 tranches", category: "Boulangerie" },
    { item: "Beurre", quantity: "10g", category: "Crèmerie" },
    { item: "Yaourt Grec", quantity: "2 pots", category: "Crèmerie" },
    { item: "Fruits rouges (surgelés)", quantity: "100g", category: "Surgelés" },
    { item: "Jus de Pomme", quantity: "2 verres", category: "Boissons" }
  ],
  instructions: [
    "Sortir les fruits rouges du congélateur 15 min avant ou les passer 30s au micro-ondes.",
    "Servir la brioche nature ou légèrement beurrée.",
    "Mélanger les fruits rouges avec le yaourt grec pour un effet coloré."
  ],
  prepTimeMinutes: 5, cookTimeMinutes: 0, calories: 500,
  priceComparison: createPrice(5.50), isPremiumVideoAvailable: false, protein: "12g", starch: "60g", vegetable: "0g"
};

// Dimanche : Brunch Express
const BK_SUN: Recipe = {
  title: "Brunch Express",
  description: "Un peu de tout : pain frais, fromage, fruits et jus.",
  ingredients: [
    { item: "Baguette fraîche", quantity: "1/2 pc", category: "Boulangerie" },
    { item: "Fromage à tartiner", quantity: "50g", category: "Crèmerie" },
    { item: "Yaourt à boire", quantity: "2 bouteilles", category: "Crèmerie" },
    { item: "Mélange fruits", quantity: "200g", category: "Fruits" },
    { item: "Jus d'Orange pressé", quantity: "2 verres", category: "Boissons" }
  ],
  instructions: [
    "Couper la baguette fraîche en tartines.",
    "Disposer le fromage à tartiner et les fruits lavés sur la table.",
    "Presser les oranges pour un jus ultra frais.",
    "Chacun se sert à sa guise !"
  ],
  prepTimeMinutes: 10, cookTimeMinutes: 0, calories: 550,
  priceComparison: createPrice(6.00), isPremiumVideoAvailable: false, protein: "18g", starch: "65g", vegetable: "0g"
};

const WEEKLY_BREAKFASTS = [BK_MON, BK_TUE, BK_WED, BK_THU, BK_FRI, BK_SAT, BK_SUN];

// --- PETIT DÉJEUNER VEGAN (Alternative) ---
const BREAKFAST_VEGAN: Recipe = {
  title: "Tartines & Yaourt Soja",
  description: "Version végétale : pain, yaourt soja, fruit et amandes.",
  ingredients: [
    { item: "Pain complet", quantity: "4 tranches", category: "Boulangerie" },
    { item: "Yaourt Soja", quantity: "2 pots", category: "Crèmerie" },
    { item: "Fruit de saison", quantity: "2 pcs", category: "Fruits" },
    { item: "Jus de fruit", quantity: "2 verres", category: "Boissons" }
  ],
  instructions: [
    "Griller le pain complet.",
    "Couper les fruits en morceaux.",
    "Mélanger les fruits au yaourt de soja.",
    "Servir avec le jus de fruit frais."
  ],
  prepTimeMinutes: 5, cookTimeMinutes: 0, calories: 350,
  priceComparison: createPrice(3.50), isPremiumVideoAvailable: false, protein: "10g", starch: "50g", vegetable: "0g"
};

// --- RECETTES MONDE (Lomo Star) ---
const RECIPE_LOMO_SALTADO: Recipe = {
  title: "Lomo Saltado",
  description: "Le classique péruvien : bœuf sauté minute, oignons, tomates, soja.",
  imageUrl: LOMO_SALTADO_IMAGE, 
  ingredients: [
    { item: "Filet de bœuf", quantity: "300g", category: "Viande" },
    { item: "Oignon rouge", quantity: "2 pcs", category: "Légumes" },
    { item: "Tomates", quantity: "3 pcs", category: "Légumes" },
    { item: "Frites au four", quantity: "400g", category: "Surgelés" },
    { item: "Sauce soja", quantity: "30ml", category: "Epicerie" },
    { item: "Riz blanc", quantity: "150g", category: "Epicerie" }
  ],
  instructions: [
    "Couper le bœuf en lanières de 2cm et les assaisonner (sel, poivre).",
    "Couper les oignons rouges en grosses lamelles et les tomates en quartiers.",
    "Cuire le riz blanc et les frites au four selon les indications du paquet.",
    "Dans un wok très chaud et fumant, saisir la viande 2 min à feu vif. Réserver.",
    "Dans le même wok, sauter les oignons 1 min, ajouter les tomates.",
    "Remettre la viande, verser la sauce soja (et un peu de vinaigre si dispo), mélanger 30 sec.",
    "Servir immédiatement : le jus de viande doit imbiber le riz et les frites !"
  ],
  prepTimeMinutes: 20, cookTimeMinutes: 10, calories: 680,
  priceComparison: createPrice(13.50), isPremiumVideoAvailable: true, protein: "35g", starch: "50g", vegetable: "25g"
};

// --- CATALOGUE RECETTES VARIÉES (LUNCH/DINNER) ---

// STANDARD (Omnivore)
const STD_1 = { 
  title: "Poulet Roti", desc: "Cuisses de poulet et haricots.", price: 8.20, 
  ing: [
    { i: "Cuisses de poulet", q: "2 pcs", c: "Viande" }, 
    { i: "Haricots verts", q: "300g", c: "Légumes" }, 
    { i: "Pommes de terre", q: "400g", c: "Légumes" }
  ],
  steps: ["Préchauffer le four à 200°C.", "Disposer les cuisses de poulet et les pommes de terre en morceaux dans un plat.", "Enfourner pour 40-45 min.", "Cuire les haricots verts à l'eau bouillante 10 min.", "Servir le tout bien chaud."]
};
const STD_2 = { 
  title: "Pâtes Carbonara", desc: "La vraie : œufs, lardons, parmesan.", price: 7.80, 
  ing: [
    { i: "Spaghetti", q: "200g", c: "Epicerie" }, 
    { i: "Lardons", q: "100g", c: "Viande" }, 
    { i: "Œufs", q: "2 pcs", c: "Crèmerie" }, 
    { i: "Parmesan", q: "40g", c: "Crèmerie" }
  ],
  steps: ["Cuire les pâtes 'al dente' dans l'eau bouillante salée.", "Faire rissoler les lardons à la poêle sans gras ajouté.", "Mélanger les œufs et le parmesan râpé dans un bol avec du poivre.", "Égoutter les pâtes (garder un peu d'eau), mélanger aux lardons hors du feu.", "Ajouter le mélange d'œufs et remuer vivement pour créer une crème (sans cuire l'œuf)."]
};
const STD_3 = { 
  title: "Pavé de Saumon", desc: "Saumon grillé et riz.", price: 14.50, 
  ing: [
    { i: "Pavés de saumon", q: "2 pcs", c: "Poisson" }, 
    { i: "Riz basmati", q: "150g", c: "Epicerie" }, 
    { i: "Brocolis", q: "300g", c: "Légumes" }
  ],
  steps: ["Cuire le riz basmati.", "Cuire les bouquets de brocolis à la vapeur ou à l'eau 8 min.", "Saisir le saumon à la poêle avec un peu d'huile, 3 min côté peau, 2 min côté chair.", "Arroser d'un filet de jus de citron avant de servir."]
};
const STD_4 = { 
  title: "Saucisse & Rësti", desc: "Classique suisse.", price: 9.00, 
  ing: [
    { i: "Saucisse de veau", q: "2 pcs", c: "Viande" }, 
    { i: "Rësti", q: "400g", c: "Frais/Surgelé" }, 
    { i: "Salade mêlée", q: "100g", c: "Légumes" }
  ],
  steps: ["Faire dorer les rësti à la poêle avec du beurre 12-15 min en retournant à mi-cuisson.", "Griller la saucisse de veau incisée sur les côtés.", "Laver et assaisonner la salade verte.", "Servir la saucisse avec les rësti croustillants."]
};
const STD_5 = { 
  title: "Steak Frites", desc: "Bavette et frites au four.", price: 12.00, 
  ing: [
    { i: "Bavette de boeuf", q: "2 pcs", c: "Viande" }, 
    { i: "Frites au four", q: "400g", c: "Surgelés" }, 
    { i: "Salade", q: "100g", c: "Légumes" }
  ],
  steps: ["Étaler les frites sur une plaque et cuire au four selon le paquet (env. 20 min).", "Saisir la bavette 1 min 30 par face dans une poêle très chaude.", "Laisser reposer la viande 2 min sous une feuille alu.", "Servir avec les frites et une salade."]
};
const STD_6 = { 
  title: "Hachis Parmentier", desc: "Gratin viande et purée.", price: 8.50, 
  ing: [
    { i: "Viande hachée", q: "300g", c: "Viande" }, 
    { i: "Pommes de terre", q: "500g", c: "Légumes" }, 
    { i: "Lait", q: "100ml", c: "Crèmerie" }, 
    { i: "Fromage râpé", q: "50g", c: "Crèmerie" }
  ],
  steps: ["Cuire les pommes de terre à l'eau et les écraser en purée avec le lait.", "Faire revenir la viande hachée avec un oignon émincé.", "Dans un plat, étaler la viande, puis la purée.", "Saupoudrer de fromage et gratiner 15 min au four à 200°C."]
};
const STD_7 = { 
  title: "Pâtes Bolo", desc: "Spaghetti sauce tomate bœuf.", price: 7.50, 
  ing: [
    { i: "Spaghetti", q: "200g", c: "Epicerie" }, 
    { i: "Viande hachée", q: "250g", c: "Viande" }, 
    { i: "Sauce tomate", q: "300g", c: "Epicerie" }
  ],
  steps: ["Faire revenir la viande hachée dans une casserole.", "Ajouter la sauce tomate et laisser mijoter 10 min.", "Cuire les spaghettis.", "Mélanger les pâtes et la sauce, servir avec du fromage si désiré."]
};
const STD_8 = { 
  title: "Salade César", desc: "Poulet, croûtons, parmesan.", price: 9.50, 
  ing: [
    { i: "Salade romaine", q: "1 pc", c: "Légumes" }, 
    { i: "Filet de poulet", q: "200g", c: "Viande" }, 
    { i: "Croûtons", q: "50g", c: "Epicerie" }, 
    { i: "Sauce César", q: "50ml", c: "Epicerie" }
  ],
  steps: ["Couper le poulet en émincés et le cuire à la poêle.", "Laver la salade romaine.", "Dans un saladier ou une assiette, disposer la salade, le poulet tiède et les croûtons.", "Napper de sauce César et ajouter des copeaux de parmesan."]
};
const STD_9 = { 
  title: "Filet de Perche", desc: "Meunière avec pommes nature.", price: 15.00, 
  ing: [
    { i: "Filets de perche", q: "300g", c: "Poisson" }, 
    { i: "Beurre", q: "50g", c: "Crèmerie" }, 
    { i: "Citron", q: "1 pc", c: "Fruits" }, 
    { i: "Pommes de terre", q: "400g", c: "Légumes" }
  ],
  steps: ["Cuire les pommes de terre à l'eau ou à la vapeur.", "Fariner légèrement les filets de perche.", "Les cuire au beurre à la poêle 2 min de chaque côté.", "Arroser de beurre fondu et de jus de citron au moment de servir."]
};
const STD_10 = { 
  title: "Cordon Bleu", desc: "Cordon bleu et petits pois.", price: 8.00, 
  ing: [
    { i: "Cordon bleu", q: "2 pcs", c: "Viande" }, 
    { i: "Petits pois carottes", q: "300g", c: "Conserve/Surgelé" }, 
    { i: "Riz", q: "120g", c: "Epicerie" }
  ],
  steps: ["Cuire le riz.", "Réchauffer les petits pois carottes à la casserole.", "Cuire le cordon bleu à la poêle à feu moyen 6-8 min par face pour que le fromage fonde sans brûler la panure."]
};
const STD_11 = { 
  title: "Tartiflette", desc: "Lardons, reblochon, patates.", price: 11.00, 
  ing: [
    { i: "Pommes de terre", q: "500g", c: "Légumes" }, 
    { i: "Lardons", q: "150g", c: "Viande" }, 
    { i: "Reblochon", q: "250g", c: "Crèmerie" }, 
    { i: "Oignons", q: "2 pcs", c: "Légumes" }
  ],
  steps: ["Cuire les pommes de terre à l'eau, les éplucher et couper en rondelles.", "Faire revenir lardons et oignons.", "Dans un plat, alterner pommes de terre et lardons.", "Poser le reblochon coupé en deux par dessus (croûte vers le haut).", "Enfourner 20 min à 200°C."]
};
const STD_12 = { 
  title: "Omelette Complète", desc: "Jambon, fromage, champi.", price: 6.50, 
  ing: [
    { i: "Œufs", q: "4 pcs", c: "Crèmerie" }, 
    { i: "Jambon", q: "100g", c: "Viande" }, 
    { i: "Gruyère râpé", q: "50g", c: "Crèmerie" }, 
    { i: "Champignons", q: "100g", c: "Légumes" }
  ],
  steps: ["Faire sauter les champignons émincés.", "Battre les œufs, saler, poivrer.", "Verser les œufs dans la poêle chaude.", "Ajouter jambon, fromage et champignons quand l'omelette commence à prendre.", "Plier et servir baveux ou bien cuit."]
};
const STD_13 = { 
  title: "Croque Monsieur", desc: "Jambon fromage gratiné.", price: 5.50, 
  ing: [
    { i: "Pain de mie", q: "4 tranches", c: "Boulangerie" }, 
    { i: "Jambon", q: "2 tranches", c: "Viande" }, 
    { i: "Gruyère", q: "100g", c: "Crèmerie" }, 
    { i: "Beurre", q: "20g", c: "Crèmerie" }
  ],
  steps: ["Beurrer les tranches de pain.", "Monter les croques : pain, jambon, fromage, pain.", "Ajouter du fromage râpé sur le dessus.", "Passer au four 10 min à 200°C ou à l'appareil à croque."]
};
const STD_14 = { 
  title: "Chili Con Carne", desc: "Bœuf, haricots rouges, épices.", price: 8.00, 
  ing: [
    { i: "Viande hachée", q: "250g", c: "Viande" }, 
    { i: "Haricots rouges", q: "250g", c: "Conserve" }, 
    { i: "Riz", q: "150g", c: "Epicerie" }, 
    { i: "Tomates concassées", q: "300g", c: "Conserve" }
  ],
  steps: ["Faire revenir la viande.", "Ajouter les tomates concassées, les haricots rouges égouttés et les épices chili.", "Laisser mijoter 15 min.", "Servir accompagné de riz blanc."]
};

// VEGETARIEN
const VEG_1 = { 
  title: "Lasagnes Épinards", desc: "Chèvre et épinards.", price: 7.50, 
  ing: [
    { i: "Feuilles lasagne", q: "6 pcs", c: "Epicerie" }, 
    { i: "Epinards", q: "300g", c: "Légumes" }, 
    { i: "Chèvre frais", q: "150g", c: "Crèmerie" }
  ],
  steps: ["Faire tomber les épinards à la poêle, mélanger avec du chèvre frais.", "Dans un plat, alterner : couche de pâtes, mélange épinards/chèvre, un peu de crème.", "Terminer par du fromage râpé.", "Cuire 30 min au four à 180°C."]
};
const VEG_2 = { 
  title: "Risotto Champi", desc: "Riz crémeux champignons.", price: 6.50, 
  ing: [
    { i: "Riz risotto", q: "180g", c: "Epicerie" }, 
    { i: "Champignons", q: "200g", c: "Légumes" }, 
    { i: "Parmesan", q: "40g", c: "Crèmerie" }
  ],
  steps: ["Faire revenir les champignons, réserver.", "Nacrer le riz dans un peu d'huile.", "Ajouter du bouillon louche par louche en remuant jusqu'à absorption.", "En fin de cuisson (20 min), ajouter les champignons, une noix de beurre et le parmesan."]
};
const VEG_3 = { 
  title: "Quiche Légumes", desc: "Tarte légumes feta.", price: 7.00, 
  ing: [
    { i: "Pâte brisée", q: "1 pc", c: "Frais" }, 
    { i: "Courgette", q: "1 pc", c: "Légumes" }, 
    { i: "Feta", q: "150g", c: "Crèmerie" }, 
    { i: "Œufs", q: "3 pcs", c: "Crèmerie" }
  ],
  steps: ["Étaler la pâte dans un moule.", "Couper la courgette en dés et la feta en cubes, disposer sur la pâte.", "Battre les œufs avec un peu de lait/crème, sel, poivre.", "Verser l'appareil sur les légumes.", "Cuire 35 min à 180°C."]
};
const VEG_4 = { 
  title: "Curry Légumes", desc: "Légumes coco curry.", price: 6.00, 
  ing: [
    { i: "Carottes", q: "200g", c: "Légumes" }, 
    { i: "Chou-fleur", q: "300g", c: "Légumes" }, 
    { i: "Lait coco", q: "200ml", c: "Epicerie" }, 
    { i: "Curry", q: "1 cs", c: "Epicerie" }
  ],
  steps: ["Couper les légumes en morceaux.", "Les faire revenir avec la pâte de curry.", "Mouiller avec le lait de coco.", "Couvrir et laisser mijoter 15-20 min jusqu'à tendreté.", "Servir avec du riz."]
};
const VEG_5 = { 
  title: "Pâtes Pesto", desc: "Fusilli pesto vert mozza.", price: 6.50, 
  ing: [
    { i: "Fusilli", q: "200g", c: "Epicerie" }, 
    { i: "Pesto", q: "90g", c: "Epicerie" }, 
    { i: "Mozzarella", q: "125g", c: "Crèmerie" }, 
    { i: "Tomates cerises", q: "150g", c: "Légumes" }
  ],
  steps: ["Cuire les fusilli.", "Couper les tomates cerises en deux et la mozzarella en billes.", "Égoutter les pâtes, mélanger immédiatement avec le pesto.", "Ajouter tomates et mozza au moment de servir."]
};
const VEG_6 = { 
  title: "Burger Végé", desc: "Galette légume et frites.", price: 8.50, 
  ing: [
    { i: "Pain burger", q: "2 pcs", c: "Boulangerie" }, 
    { i: "Galette végétale", q: "2 pcs", c: "Frais" }, 
    { i: "Salade", q: "50g", c: "Légumes" }, 
    { i: "Frites", q: "300g", c: "Surgelés" }
  ],
  steps: ["Cuire les frites au four.", "Poêler les galettes végétales.", "Toaster les pains à burger.", "Monter le burger : sauce, salade, galette.", "Servir avec les frites."]
};
const VEG_7 = { 
  title: "Salade Caprese", desc: "Tomates, mozza, basilic.", price: 7.00, 
  ing: [
    { i: "Tomates", q: "3 pcs", c: "Légumes" }, 
    { i: "Mozzarella di bufala", q: "250g", c: "Crèmerie" }, 
    { i: "Basilic", q: "1/2 botte", c: "Légumes" }, 
    { i: "Pain", q: "1/2 baguette", c: "Boulangerie" }
  ],
  steps: ["Couper les tomates et la mozzarella en tranches.", "Les disposer en alternance dans l'assiette.", "Parsemer de feuilles de basilic frais.", "Arroser généreusement d'huile d'olive, saler, poivrer."]
};
const VEG_8 = { 
  title: "Gratin Dauphinois", desc: "Pommes de terre crème.", price: 5.00, 
  ing: [
    { i: "Pommes de terre", q: "600g", c: "Légumes" }, 
    { i: "Crème liquide", q: "200ml", c: "Crèmerie" }, 
    { i: "Ail", q: "1 gousse", c: "Légumes" }, 
    { i: "Salade", q: "100g", c: "Légumes" }
  ],
  steps: ["Éplucher et couper les patates en fines rondelles (ne pas rincer !).", "Frotter le plat avec l'ail.", "Disposer les patates, recouvrir de crème liquide assaisonnée.", "Cuire 45-60 min à 160°C. Servir avec salade."]
};
const VEG_9 = { 
  title: "Couscous Végé", desc: "Semoule et légumes.", price: 6.00, 
  ing: [
    { i: "Semoule", q: "150g", c: "Epicerie" }, 
    { i: "Navets", q: "2 pcs", c: "Légumes" }, 
    { i: "Carottes", q: "2 pcs", c: "Légumes" }, 
    { i: "Pois chiches", q: "200g", c: "Conserve" }
  ],
  steps: ["Couper les légumes en gros morceaux, cuire dans un bouillon avec épices à couscous 20 min.", "Ajouter les pois chiches en fin de cuisson.", "Préparer la semoule (graines + eau bouillante + beurre).", "Servir la semoule arrosée de bouillon et légumes."]
};
const VEG_10 = { 
  title: "Tortilla", desc: "Omelette pommes de terre.", price: 4.50, 
  ing: [
    { i: "Œufs", q: "4 pcs", c: "Crèmerie" }, 
    { i: "Pommes de terre", q: "300g", c: "Légumes" }, 
    { i: "Oignons", q: "1 pc", c: "Légumes" }
  ],
  steps: ["Couper patates et oignons en fines lamelles.", "Les faire frire/cuire à la poêle avec de l'huile jusqu'à tendreté.", "Battre les œufs, ajouter aux patates dans la poêle.", "Cuire doucement, retourner l'omelette à l'aide d'une assiette pour cuire l'autre face."]
};
const VEG_11 = { 
  title: "Gnocchis Tomate", desc: "Sauce basilic parmesan.", price: 5.50, 
  ing: [
    { i: "Gnocchis", q: "400g", c: "Frais" }, 
    { i: "Sauce tomate", q: "200g", c: "Epicerie" }, 
    { i: "Parmesan", q: "30g", c: "Crèmerie" }
  ],
  steps: ["Cuire les gnocchis à l'eau bouillante (ils remontent quand c'est cuit).", "Réchauffer la sauce tomate.", "Mélanger gnocchis et sauce.", "Servir avec beaucoup de parmesan râpé."]
};
const VEG_12 = { 
  title: "Falafels & Pita", desc: "Boulettes pois chiches.", price: 7.50, 
  ing: [
    { i: "Falafels", q: "6 pcs", c: "Frais" }, 
    { i: "Pain pita", q: "2 pcs", c: "Boulangerie" }, 
    { i: "Hummus", q: "100g", c: "Frais" }, 
    { i: "Salade", q: "50g", c: "Légumes" }
  ],
  steps: ["Réchauffer les falafels (four ou poêle).", "Humidifier et tiédir les pains pita.", "Garnir les pitas de hummus, salade et falafels.", "Ajouter une sauce yaourt si désiré."]
};
const VEG_13 = { 
  title: "Soupe Minestrone", desc: "Soupe repas italienne.", price: 5.00, 
  ing: [
    { i: "Légumes soupe", q: "300g", c: "Légumes" }, 
    { i: "Haricots blancs", q: "150g", c: "Conserve" }, 
    { i: "Pâtes courtes", q: "80g", c: "Epicerie" }
  ],
  steps: ["Couper les légumes en petits dés.", "Faire revenir dans un faitout, couvrir d'eau/bouillon.", "Ajouter les pâtes et haricots après 15 min.", "Laisser cuire jusqu'à ce que les pâtes soient prêtes."]
};
const VEG_14 = { 
  title: "Pizza Margherita", desc: "Tomate mozza maison.", price: 6.00, 
  ing: [
    { i: "Pâte pizza", q: "1 pc", c: "Frais" }, 
    { i: "Coulis tomate", q: "100g", c: "Epicerie" }, 
    { i: "Mozzarella", q: "125g", c: "Crèmerie" }
  ],
  steps: ["Étaler la pâte à pizza.", "Étaler le coulis de tomate.", "Disposer des tranches de mozzarella.", "Cuire à four très chaud (220-240°C) pendant 10-12 min."]
};

// VEGAN
const VGN_1 = { 
  title: "Chili Sin Carne", desc: "Haricots rouges et maïs.", price: 5.50, 
  ing: [
    { i: "Haricots rouges", q: "300g", c: "Conserve" }, 
    { i: "Maïs", q: "150g", c: "Conserve" }, 
    { i: "Tomates concassées", q: "300g", c: "Conserve" }, 
    { i: "Riz", q: "150g", c: "Epicerie" }
  ],
  steps: ["Faire revenir oignon et ail.", "Ajouter les tomates, haricots et maïs égouttés.", "Assaisonner (cumin, paprika, chili).", "Mijoter 20 min pour épaissir la sauce. Servir avec riz."]
};
const VGN_2 = { 
  title: "Dahl Lentilles", desc: "Lentilles corail coco.", price: 4.80, 
  ing: [
    { i: "Lentilles corail", q: "150g", c: "Epicerie" }, 
    { i: "Lait coco", q: "200ml", c: "Epicerie" }, 
    { i: "Epinards frais", q: "100g", c: "Légumes" }
  ],
  steps: ["Rincer les lentilles corail.", "Cuire avec le lait de coco et un peu d'eau (ratio 1:3).", "Ajouter curry/curcuma.", "Quand les lentilles sont fondantes (15 min), ajouter les épinards frais pour qu'ils tombent."]
};
const VGN_3 = { 
  title: "Wok Tofu", desc: "Tofu sauté légumes.", price: 6.20, 
  ing: [
    { i: "Tofu ferme", q: "200g", c: "Frais" }, 
    { i: "Légumes wok", q: "300g", c: "Légumes" }, 
    { i: "Sauce soja", q: "30ml", c: "Epicerie" }, 
    { i: "Nouilles", q: "150g", c: "Epicerie" }
  ],
  steps: ["Presser le tofu et le couper en dés.", "Le faire dorer à la poêle avec de l'huile.", "Ajouter les légumes wok et sauter à feu vif.", "Ajouter les nouilles précuites et la sauce soja, mélanger."]
};
const VGN_4 = { 
  title: "Curry Pois Chiches", desc: "Pois chiches épicés.", price: 5.00, 
  ing: [
    { i: "Pois chiches", q: "250g", c: "Conserve" }, 
    { i: "Tomates", q: "200g", c: "Légumes" }, 
    { i: "Riz", q: "150g", c: "Epicerie" }, 
    { i: "Cumin/Epices", q: "1 cs", c: "Epicerie" }
  ],
  steps: ["Faire revenir les épices dans l'huile.", "Ajouter pois chiches et dés de tomates.", "Laisser compoter 15 min.", "Servir sur un lit de riz blanc."]
};
const VGN_5 = { 
  title: "Bolo Lentilles", desc: "Pâtes sauce lentilles.", price: 5.20, 
  ing: [
    { i: "Spaghetti", q: "200g", c: "Epicerie" }, 
    { i: "Lentilles vertes", q: "150g", c: "Epicerie" }, 
    { i: "Sauce tomate", q: "300g", c: "Epicerie" }
  ],
  steps: ["Cuire les lentilles vertes à l'eau.", "Dans une autre casserole, mijoter la sauce tomate.", "Mélanger lentilles égouttées et sauce tomate (comme une bolo).", "Servir sur les spaghettis."]
};
const VGN_6 = { 
  title: "Burger Vegan", desc: "Steak soja et salade.", price: 7.50, 
  ing: [
    { i: "Pain burger", q: "2 pcs", c: "Boulangerie" }, 
    { i: "Steak de soja", q: "2 pcs", c: "Frais" }, 
    { i: "Salade", q: "50g", c: "Légumes" }, 
    { i: "Ketchup", q: "20g", c: "Epicerie" }
  ],
  steps: ["Poêler les steaks de soja.", "Toaster les pains.", "Assembler avec salade, tomate, ketchup/moutarde.", "Accompagner d'une salade verte."]
};
const VGN_7 = { 
  title: "Buddha Bowl", desc: "Quinoa, avocat, tofu.", price: 8.00, 
  ing: [
    { i: "Quinoa", q: "120g", c: "Epicerie" }, 
    { i: "Avocat", q: "1 pc", c: "Fruits" }, 
    { i: "Tofu fumé", q: "150g", c: "Frais" }, 
    { i: "Carottes", q: "2 pcs", c: "Légumes" }
  ],
  steps: ["Cuire le quinoa et laisser tiédir.", "Couper l'avocat en lamelles, râper les carottes.", "Couper le tofu fumé en dés.", "Disposer joliment tous les ingrédients dans un bol, assaisonner d'une vinaigrette."]
};
const VGN_8 = { 
  title: "Salade Quinoa", desc: "Quinoa, concombre, menthe.", price: 6.50, 
  ing: [
    { i: "Quinoa", q: "120g", c: "Epicerie" }, 
    { i: "Concombre", q: "1 pc", c: "Légumes" }, 
    { i: "Menthe", q: "1/2 botte", c: "Légumes" }, 
    { i: "Citron", q: "1 pc", c: "Fruits" }
  ],
  steps: ["Cuire le quinoa, refroidir.", "Couper le concombre en petits dés.", "Ciseler la menthe.", "Mélanger le tout avec jus de citron et huile d'olive."]
};
const VGN_9 = { 
  title: "Tacos Haricots", desc: "Haricots noirs épicés.", price: 6.00, 
  ing: [
    { i: "Tortillas", q: "4 pcs", c: "Epicerie" }, 
    { i: "Haricots noirs", q: "250g", c: "Conserve" }, 
    { i: "Avocat", q: "1 pc", c: "Fruits" }, 
    { i: "Salsa", q: "100g", c: "Epicerie" }
  ],
  steps: ["Réchauffer les haricots noirs avec des épices mexicaines.", "Écraser l'avocat grossièrement.", "Garnir les tortillas chaudes de haricots, avocat et salsa."]
};
const VGN_10 = { 
  title: "Ratatouille", desc: "Légumes mijotés et riz.", price: 5.50, 
  ing: [
    { i: "Courgette", q: "2 pcs", c: "Légumes" }, 
    { i: "Aubergine", q: "1 pc", c: "Légumes" }, 
    { i: "Poivron", q: "1 pc", c: "Légumes" }, 
    { i: "Riz", q: "150g", c: "Epicerie" }
  ],
  steps: ["Couper tous les légumes en dés de taille égale.", "Faire revenir les poivrons, puis aubergines, puis courgettes.", "Mélanger le tout, couvrir et mijoter 30-40 min.", "Servir chaud ou froid avec du riz."]
};
const VGN_11 = { 
  title: "Soupe Potimarron", desc: "Velouté courge coco.", price: 4.50, 
  ing: [
    { i: "Potimarron", q: "1 pc", c: "Légumes" }, 
    { i: "Lait coco", q: "100ml", c: "Epicerie" }, 
    { i: "Pain", q: "4 tranches", c: "Boulangerie" }
  ],
  steps: ["Couper le potimarron (pas besoin d'éplucher si bio).", "Cuire dans l'eau bouillante.", "Mixer avec le lait de coco.", "Assaisonner et servir avec du pain grillé."]
};
const VGN_12 = { 
  title: "Sandwich Hummus", desc: "Pain complet grillé.", price: 5.00, 
  ing: [
    { i: "Pain complet", q: "4 tranches", c: "Boulangerie" }, 
    { i: "Hummus", q: "100g", c: "Frais" }, 
    { i: "Tomates séchées", q: "50g", c: "Epicerie" }, 
    { i: "Salade", q: "50g", c: "Légumes" }
  ],
  steps: ["Griller légèrement le pain complet.", "Étaler une couche épaisse de hummus.", "Ajouter tomates séchées et feuilles de salade.", "Refermer et couper en triangle."]
};
const VGN_13 = { 
  title: "Steak Chou-fleur", desc: "Chou-fleur rôti épices.", price: 4.00, 
  ing: [
    { i: "Chou-fleur", q: "1/2 pc", c: "Légumes" }, 
    { i: "Paprika", q: "1 cs", c: "Epicerie" }, 
    { i: "Semoule", q: "120g", c: "Epicerie" }
  ],
  steps: ["Couper le chou-fleur en tranches épaisses (steaks).", "Badigeonner d'huile et paprika.", "Rôtir au four 25 min à 200°C.", "Servir avec de la semoule."]
};
const VGN_14 = { 
  title: "Pad Thai Tofu", desc: "Nouilles riz et tofu.", price: 7.00, 
  ing: [
    { i: "Nouilles riz", q: "150g", c: "Epicerie" }, 
    { i: "Tofu", q: "200g", c: "Frais" }, 
    { i: "Cacahuètes", q: "30g", c: "Epicerie" }, 
    { i: "Sauce soja", q: "20ml", c: "Epicerie" }
  ],
  steps: ["Tremper les nouilles de riz dans l'eau chaude.", "Sauter le tofu au wok.", "Ajouter les nouilles égouttées et la sauce soja/tamarin.", "Servir avec cacahuètes concassées et jus de citron vert."]
};

// WORLD LUNCHES (Dinner is always Lomo)
const WLD_1 = { 
  title: "Pad Thaï", desc: "Nouilles sautées crevettes.", price: 11.00, 
  ing: [
    { i: "Nouilles riz", q: "150g", c: "Epicerie" }, 
    { i: "Crevettes", q: "150g", c: "Poisson" }, 
    { i: "Cacahuètes", q: "30g", c: "Epicerie" }
  ],
  steps: ["Faire tremper les nouilles de riz 10 min dans l'eau tiède.", "Sauter les crevettes au wok.", "Ajouter un œuf brouillé, puis les nouilles.", "Verser la sauce pad thaï, mélanger, ajouter les cacahuètes à la fin."]
};
const WLD_2 = { 
  title: "Tacos Poulet", desc: "Galettes mexicaines.", price: 9.50, 
  ing: [
    { i: "Tortillas", q: "4 pcs", c: "Epicerie" }, 
    { i: "Poulet", q: "200g", c: "Viande" }, 
    { i: "Avocat", q: "1 pc", c: "Fruits" }, 
    { i: "Salsa", q: "100g", c: "Epicerie" }
  ],
  steps: ["Émincer le poulet, cuire à la poêle avec épices à tacos.", "Chauffer les tortillas.", "Garnir de poulet, tranches d'avocat et sauce salsa."]
};
const WLD_3 = { 
  title: "Curry Vert", desc: "Poulet coco thaï.", price: 10.50, 
  ing: [
    { i: "Poulet", q: "200g", c: "Viande" }, 
    { i: "Lait coco", q: "200ml", c: "Epicerie" }, 
    { i: "Curry vert", q: "1 cs", c: "Epicerie" }, 
    { i: "Riz", q: "150g", c: "Epicerie" }
  ],
  steps: ["Chauffer la pâte de curry vert dans un peu d'huile.", "Ajouter le poulet émincé, dorer.", "Verser le lait de coco, laisser mijoter 10 min.", "Servir avec du riz jasmin."]
};
const WLD_4 = { 
  title: "Sushi Bowl", desc: "Riz vinaigré et saumon.", price: 13.00, 
  ing: [
    { i: "Riz sushi", q: "150g", c: "Epicerie" }, 
    { i: "Saumon cru", q: "150g", c: "Poisson" }, 
    { i: "Avocat", q: "1 pc", c: "Fruits" }, 
    { i: "Concombre", q: "1/2 pc", c: "Légumes" }
  ],
  steps: ["Cuire le riz sushi, assaisonner au vinaigre de riz/sucre.", "Couper le saumon cru (qualité sushi !), avocat et concombre en dés.", "Disposer le riz tiède au fond, les ingrédients froids dessus.", "Arroser de sauce soja et sésame."]
};
const WLD_5 = { 
  title: "Poulet Tikka", desc: "Indien épicé.", price: 10.00, 
  ing: [
    { i: "Poulet", q: "200g", c: "Viande" }, 
    { i: "Sauce Tikka", q: "150g", c: "Epicerie" }, 
    { i: "Riz basmati", q: "150g", c: "Epicerie" }, 
    { i: "Naan", q: "2 pcs", c: "Boulangerie" }
  ],
  steps: ["Mariner le poulet dans la sauce Tikka (yaourt/épices) si possible, ou cuire directement.", "Mijoter le poulet dans la sauce.", "Cuire le riz basmati.", "Servir avec un pain Naan chaud."]
};
const WLD_6 = { 
  title: "Paella Express", desc: "Riz safrané fruits mer.", price: 12.00, 
  ing: [
    { i: "Riz rond", q: "180g", c: "Epicerie" }, 
    { i: "Fruits de mer", q: "200g", c: "Surgelés" }, 
    { i: "Petits pois", q: "50g", c: "Surgelés" }, 
    { i: "Safran", q: "1 dosette", c: "Epicerie" }
  ],
  steps: ["Faire revenir le riz rond dans l'huile.", "Ajouter bouillon, safran et fruits de mer (surgelés ou frais).", "Laisser absorber le liquide sans trop remuer (20 min).", "Ajouter les petits pois en fin de cuisson."]
};
const WLD_7 = { 
  title: "Ramen Poulet", desc: "Bouillon nouilles œuf.", price: 9.00, 
  ing: [
    { i: "Nouilles ramen", q: "200g", c: "Epicerie" }, 
    { i: "Poulet", q: "100g", c: "Viande" }, 
    { i: "Œufs", q: "2 pcs", c: "Crèmerie" }, 
    { i: "Bouillon", q: "500ml", c: "Epicerie" }
  ],
  steps: ["Chauffer un bouillon de volaille (enrichi de soja/gingembre).", "Cuire les nouilles ramen à part.", "Cuire l'œuf mollet (6 min).", "Dresser : nouilles, bouillon brûlant, tranches de poulet cuit, œuf coupé en deux."]
};

// Helper pour convertir les objets simplifiés en Recipe complet
const makeRecipe = (data: any, isWorld = false): Recipe => ({
  title: data.title,
  description: data.desc,
  // Map updated ingredient structure
  ingredients: data.ing.map((x: any) => ({ item: x.i, quantity: x.q, category: x.c })),
  // Utilisation des étapes détaillées si disponibles, sinon fallback
  instructions: data.steps || ["Préparer les ingrédients.", "Cuire selon la méthode habituelle.", "Servir chaud."],
  prepTimeMinutes: 15, cookTimeMinutes: 20, calories: 500,
  priceComparison: createPrice(data.price),
  isPremiumVideoAvailable: false,
  protein: "25g", starch: "50g", vegetable: "30g",
  imageUrl: isWorld && data.title === "Lomo Saltado" ? LOMO_SALTADO_IMAGE : undefined
});

// --- CONSTRUCTION DU PLAN SEMAINE ---

const MENU_SCHEDULE = [
  // LUNDI
  {
    standard: { l: makeRecipe(STD_1), d: makeRecipe(STD_2) },
    vegetarian: { l: makeRecipe(VEG_1), d: makeRecipe(VEG_2) },
    vegan: { l: makeRecipe(VGN_1), d: makeRecipe(VGN_3) }, // Wok
    world: { l: makeRecipe(WLD_1), d: RECIPE_LOMO_SALTADO }
  },
  // MARDI
  {
    standard: { l: makeRecipe(STD_3), d: makeRecipe(STD_6) }, // Saumon / Hachis
    vegetarian: { l: makeRecipe(VEG_3), d: makeRecipe(VEG_4) }, // Quiche / Curry
    vegan: { l: makeRecipe(VGN_2), d: makeRecipe(VGN_8) }, // Dahl / Salade Quinoa
    world: { l: makeRecipe(WLD_2), d: RECIPE_LOMO_SALTADO }
  },
  // MERCREDI
  {
    standard: { l: makeRecipe(STD_5), d: makeRecipe(STD_8) }, // Steak / Cesar
    vegetarian: { l: makeRecipe(VEG_5), d: makeRecipe(VEG_7) }, // Pesto / Caprese
    vegan: { l: makeRecipe(VGN_4), d: makeRecipe(VGN_10) }, // Curry Pois / Ratatouille
    world: { l: makeRecipe(WLD_3), d: RECIPE_LOMO_SALTADO }
  },
  // JEUDI
  {
    standard: { l: makeRecipe(STD_7), d: makeRecipe(STD_12) }, // Bolo / Omelette
    vegetarian: { l: makeRecipe(VEG_6), d: makeRecipe(VEG_13) }, // Burger / Minestrone
    vegan: { l: makeRecipe(VGN_5), d: makeRecipe(VGN_11) }, // Bolo Lentille / Potimarron
    world: { l: makeRecipe(WLD_4), d: RECIPE_LOMO_SALTADO }
  },
  // VENDREDI
  {
    standard: { l: makeRecipe(STD_9), d: makeRecipe(STD_13) }, // Perche / Croque
    vegetarian: { l: makeRecipe(VEG_8), d: makeRecipe(VEG_9) }, // Gratin / Salade Grecque (simulé par couscous ici pour var) -> Couscous
    vegan: { l: makeRecipe(VGN_6), d: makeRecipe(VGN_9) }, // Burger / Tacos
    world: { l: makeRecipe(WLD_5), d: RECIPE_LOMO_SALTADO }
  },
  // SAMEDI
  {
    standard: { l: makeRecipe(STD_10), d: makeRecipe(STD_14) }, // Cordon / Chili
    vegetarian: { l: makeRecipe(VEG_9), d: makeRecipe(VEG_10) }, // Couscous / Tortilla
    vegan: { l: makeRecipe(VGN_7), d: makeRecipe(VGN_12) }, // Buddha / Hummus
    world: { l: makeRecipe(WLD_6), d: RECIPE_LOMO_SALTADO }
  },
  // DIMANCHE
  {
    standard: { l: makeRecipe(STD_4), d: makeRecipe(STD_11) }, // Roesti / Tartiflette
    vegetarian: { l: makeRecipe(VEG_14), d: makeRecipe(VEG_11) }, // Pizza / Gnocchis
    vegan: { l: makeRecipe(VGN_13), d: makeRecipe(VGN_14) }, // Choufleur / Pad Thai
    world: { l: makeRecipe(WLD_7), d: RECIPE_LOMO_SALTADO }
  }
];

const DAYS = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

const STATIC_PLAN: DailyPlan[] = DAYS.map((day, idx) => {
  const schedule = MENU_SCHEDULE[idx];
  const dailyBreakfast = WEEKLY_BREAKFASTS[idx];
  
  return {
    day,
    breakfast: {
      standard: dailyBreakfast,
      vegetarian: dailyBreakfast,
      vegan: BREAKFAST_VEGAN, // Yaourt classique non vegan, on garde le spécifique
      world: dailyBreakfast
    },
    lunch: {
      standard: schedule.standard.l,
      vegetarian: schedule.vegetarian.l,
      vegan: schedule.vegan.l,
      world: schedule.world.l
    },
    dinner: {
      standard: schedule.standard.d,
      vegetarian: schedule.vegetarian.d,
      vegan: schedule.vegan.d,
      world: schedule.world.d
    }
  };
});

// --- FONCTION PRINCIPALE ---

export const generateWeeklyPlan = async (useAI: boolean = false): Promise<DailyPlan[]> => {
  
  // 1. Si on n'a pas explicitement demandé l'IA (le bouton 'Nouveau'), on retourne le plan fixe
  if (!useAI) {
    // Simulation d'un petit délai réseau pour l'UX
    await new Promise(resolve => setTimeout(resolve, 800));
    return STATIC_PLAN;
  }

  // 2. Si useAI est TRUE, on appelle Gemini pour générer un NOUVEAU plan
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    Génère un plan de repas hebdomadaire (Lundi-Dimanche) pour une application suisse.
    
    CRITÈRES STRICTS:
    1. Petit-déjeuner: Varié chaque jour, simple et rapide pour les familles (Type: Tartines, Fruit, Yaourt, Jus).
    2. Monde: Le Dîner est TOUJOURS "Lomo Saltado" (recette péruvienne). Le déjeuner varie.
    3. Autres régimes: AUCUNE répétition de plat sur la semaine.
    4. Recettes simples, prix suisses (CHF) bon marché.
    5. INSTRUCTIONS: Fournir impérativement 3 à 5 étapes de préparation claires et détaillées par recette.
    6. INGRÉDIENTS: Préciser systématiquement les quantités (en grammes, ml ou pièces) pour 2 personnes.
  `;

  const recipeSchema = {
    type: Type.OBJECT,
    properties: {
      title: { type: Type.STRING },
      description: { type: Type.STRING },
      protein: { type: Type.STRING },
      starch: { type: Type.STRING },
      vegetable: { type: Type.STRING },
      imageUrl: { type: Type.STRING },
      ingredients: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            item: { type: Type.STRING },
            quantity: { type: Type.STRING },
            category: { type: Type.STRING }
          }
        }
      },
      instructions: { type: Type.ARRAY, items: { type: Type.STRING } },
      prepTimeMinutes: { type: Type.NUMBER },
      cookTimeMinutes: { type: Type.NUMBER },
      calories: { type: Type.NUMBER },
      isPremiumVideoAvailable: { type: Type.BOOLEAN },
      priceComparison: {
        type: Type.OBJECT,
        properties: {
          Migros: { type: Type.NUMBER },
          Coop: { type: Type.NUMBER },
          Lidl: { type: Type.NUMBER },
          Aldi: { type: Type.NUMBER },
          Denner: { type: Type.NUMBER },
          Aligro: { type: Type.NUMBER }
        }
      }
    }
  };

  const daySchema = {
    type: Type.OBJECT,
    properties: {
      day: { type: Type.STRING },
      breakfast: { 
        type: Type.OBJECT, 
        properties: { 
          standard: recipeSchema,
          vegetarian: recipeSchema,
          vegan: recipeSchema,
          world: recipeSchema
        } 
      },
      lunch: { 
        type: Type.OBJECT, 
        properties: { 
          standard: recipeSchema,
          vegetarian: recipeSchema,
          vegan: recipeSchema,
          world: recipeSchema
        } 
      },
      dinner: { 
        type: Type.OBJECT, 
        properties: { 
          standard: recipeSchema,
          vegetarian: recipeSchema,
          vegan: recipeSchema,
          world: recipeSchema
        } 
      }
    }
  };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: daySchema
        }
      }
    });

    const json = JSON.parse(response.text);
    return json as DailyPlan[];
  } catch (error) {
    console.error("AI Generation failed, falling back to static plan", error);
    return STATIC_PLAN;
  }
};