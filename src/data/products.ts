export interface ProductOption {
    id: string;
    name: string;
    choices: string[];
}

export interface Product {
    id: string;
    name: string;
    description: string;
    longDescription?: string;
    price: number;
    unit: string;
    category: string;
    image: string;
    images?: string[];
    ingredients?: string;
    allergens?: string[];
    options?: ProductOption[];
    isSoldOut?: boolean;
}

export const mockProducts: Product[] = [
    {
        id: "1",
        name: "Pieguski Klasyczne",
        description: "Kruche ciasteczka z kawałkami belgijskiej czekolady.",
        longDescription: "Nasze Pieguski Klasyczne powstają z tradycyjnego przepisu pełnego maślanego smaku, uwielbianego przez pokolenia. Wypiekane codziennie rano z dodatkiem grubo krojonej belgijskiej czekolady, by w każdej porcji znaleźć chrupiącą niespodziankę. Idealne do popołudniowej kawy.",
        price: 24.0,
        unit: "Paczka 500g",
        category: "Ciasteczka i Drobne Wypieki",
        image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=600&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=600&auto=format&fit=crop"
        ],
        ingredients: "Mąka pszenna, masło (82%), cukier trzcinowy, czekolada belgijska (miazga kakaowa, cukier, tłuszcz kakaowy, emulgator: lecytyna sojowa), jaja z wolnego wybiegu, proszek do pieczenia.",
        allergens: ["Gluten", "Mleko", "Jaja", "Soja"],
    },
    {
        id: "2",
        name: "Makaroniki Malina",
        description: "Migdałowe makaroniki z nadzieniem malinowym.",
        longDescription: "Francuski szyk i elegancja w delikatnych łupinkach utartych z najlepszych hiszpańskich migdałów. Bogate i lekko kwaskowe nadzienie z konfitury malinowej nadaje idealny balans słodyczy.",
        price: 45.0,
        unit: "Paczka 500g",
        category: "Ciasteczka i Drobne Wypieki",
        image: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?q=80&w=600&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1569864358642-9d1684040f43?q=80&w=600&auto=format&fit=crop"
        ],
        ingredients: "Mąka migdałowa, cukier puder, białka jaj, przecier malinowy, pektyna, sok z cytryny.",
        allergens: ["Orzechy", "Jaja"],
        isSoldOut: true,
    },
    {
        id: "5",
        name: "Ptyś Premium",
        description: "Chrupiący ptyś z kruszonką i kremem pralinowym.",
        longDescription: "Ptyś parzony z nałożoną delikatną, chrupiącą kruszonką o smaku masełkowo-karmelowym, wypełniony po brzegi puszystym kremem pralinowym na bazie orzechów laskowych.",
        price: 18.0,
        unit: "1 sztuka",
        category: "Ciasteczka i Drobne Wypieki",
        image: "https://images.unsplash.com/photo-1599805096570-5b5c9ced9dd0?q=80&w=600&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1599805096570-5b5c9ced9dd0?q=80&w=600&auto=format&fit=crop"
        ],
        ingredients: "Mąka pszenna, masło, mleko, jaja, praliné orzechowe, śmietanka 36%",
        allergens: ["Orzechy", "Mleko", "Gluten", "Jaja"],
        isSoldOut: true,
    },
    {
        id: "3",
        name: "Malinowa Chmurka",
        description: "Lekki tort z bezą, kremem mascarpone i malinami.",
        longDescription: "Bestseller przygotowywany na najbardziej wyjątkowe okazje. Pyszne, leciutkie warstwy bezy francuskiej, przedzielone aksamitnym kremem mascarpone-śmietanka. Środek skrywa obfitą warstwę świeżych malin zanurzonych w delikatnym malinowym musie (żelce).",
        price: 160.0,
        unit: "1 sztuka",
        category: "Torty i Ciasta",
        image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=600&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?q=80&w=600&auto=format&fit=crop"
        ],
        ingredients: "Białka jaj, cukier, maliny świeże, serek mascarpone (mleko), śmietanka 36%, mąka ziemniaczana.",
        allergens: ["Mleko", "Jaja"],
        options: [
            {
                id: "base",
                name: "Wybór bazy (spodu)",
                choices: ["Tradycyjny (zawiera gluten)", "Bez glutenu"]
            },
            {
                id: "dairy",
                name: "Nabiał",
                choices: ["Tradycyjny", "Mleko/Śmietana bez laktozy"]
            }
        ]
    },
    {
        id: "4",
        name: "Sernik Nowojorski",
        description: "Klasyczny, kremowy sernik na kruchym spodzie.",
        longDescription: "Esencja sernika w amerykańskim stylu! Ciężki, gęsty, potężnie kremowy i jedwabisty, wypiekany w kąpieli wodnej by zapewnić idealną kremową strukturę. Ciasteczkowy spód perfekcyjnie komponuje się z uderzająco waniliowym nadzieniem.",
        price: 120.0,
        unit: "1 sztuka",
        category: "Torty i Ciasta",
        image: "https://images.unsplash.com/photo-1524351199678-941a58a3df50?q=80&w=600&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1524351199678-941a58a3df50?q=80&w=600&auto=format&fit=crop"
        ],
        ingredients: "Twaróg półtłusty zmielony, śmietana kwaśna 18%, cukier, mąka pszenna, masło, ekstrakt z wanilii, jaja.",
        allergens: ["Gluten", "Mleko", "Jaja"],
        options: [
            {
                id: "dairy",
                name: "Wybór nabiału",
                choices: ["Tradycyjny", "Bez laktozy (twaróg/śmietana/masło bez laktozy)"]
            }
        ]
    },
];
