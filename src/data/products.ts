export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number; // en Dirhams (DH)
  category: 'parfumerie' | 'bijouterie' | 'horlogerie' | 'antiquites';
  subcategory: 'homme' | 'femme' | 'unisex' | 'argent' | 'cuivre' | 'inspiration' | 'epoque';
  image: string;
  badge?: 'Tendance 2026' | 'Exclusivité Maroc' | 'Pièce Unique' | 'Édition Limitée' | 'Édition Privée';
  description: string;
  material: string;
  artisanOrigin?: string;
  
  // Spécifications spécifiques
  specs: {
    volume?: string; // Parfumerie
    concentration?: string; // Parfumerie
    topNotes?: string[]; // Parfumerie
    heartNotes?: string[]; // Parfumerie
    baseNotes?: string[]; // Parfumerie
    
    metalType?: string; // Bijouterie
    stone?: string; // Bijouterie
    weight?: string; // Bijouterie
    hallmark?: string; // Bijouterie
    artisanName?: string;
    
    movement?: string; // Horlogerie
    reserve?: string; // Horlogerie
    complication?: string; // Horlogerie
    case?: string; // Horlogerie
    diameter?: string; // Horlogerie
    strap?: string; // Horlogerie
    glass?: string; // Horlogerie
  };
}

export const products: Product[] = [
  // --- PARFUMERIE EN PREMIER (MANDATE USER) ---
  {
    id: 'soir-marrakech',
    name: "Soir de Marrakech - Eau de Parfum",
    brand: "Les Parfums du Soleil (Abderrazzak Benchaâbane)",
    price: 1450,
    category: 'parfumerie',
    subcategory: 'unisex',
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=1000",
    badge: "Tendance 2026",
    material: "Fleur d'oranger, Ambre & Patchouli",
    artisanOrigin: "Distillé à Marrakech, Maroc",
    description: "Le parfum mythique conçu par le célèbre créateur marocain Abderrazzak Benchaâbane (concepteur des parfums du Jardin Majorelle). Une invitation sensorielle dans les nuits envoûtantes de Marrakech, alliant la fraîcheur zestée de la fleur d'oranger à la volupté de l'ambre gris.",
    specs: {
      volume: "100 ml",
      concentration: "Eau de Parfum de Prestige",
      topNotes: ["Fleur d'Oranger", "Citron de Taroudant"],
      heartNotes: ["Jasmin de Nuit", "Patchouli d'Indonésie"],
      baseNotes: ["Ambre Musqué", "Vanille de Madagascar"]
    }
  },
  {
    id: 'baccarat-rouge',
    name: "Baccarat Rouge 540 - Extrait de Parfum",
    brand: "Maison Francis Kurkdjian",
    price: 3950,
    category: 'parfumerie',
    subcategory: 'femme',
    image: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&q=80&w=1000",
    badge: "Tendance 2026",
    material: "Cristal, Safran & Jasmin",
    artisanOrigin: "Importation Prestige (Tendance Elite Maroc)",
    description: "Le sillage de luxe le plus prisé et le plus tendance dans les salons élitistes de Casablanca et Rabat en 2026. Baccarat Rouge 540 pose une signature olfactive hautement sophistiquée, aux notes ambrées, fleuries et boisées nées de l'alchimie des sens.",
    specs: {
      volume: "70 ml",
      concentration: "Extrait de Parfum Absolu",
      topNotes: ["Safran rouge de Taliouine", "Amande amère"],
      heartNotes: ["Jasmin d'Égypte", "Cèdre rouge"],
      baseNotes: ["Ambre gris minéral", "Musc boisé"]
    }
  },
  {
    id: 'oud-santal-ourika',
    name: "Oud & Santal de l'Ourika",
    brand: "Héritage Berbère Marrakech",
    price: 1350,
    category: 'parfumerie',
    subcategory: 'unisex',
    image: "https://images.unsplash.com/photo-1613521076081-2820f9746a2d?auto=format&fit=crop&q=80&w=1000",
    badge: "Exclusivité Maroc",
    material: "Bois de Santal & Oud précieux",
    artisanOrigin: "Atelier de la Médina de Marrakech",
    description: "Une création de niche marocaine ultra-tendance signée Héritage Berbère. Distillée dans la vallée de l'Ourika, cette fragrance enveloppante réunit la douceur boisée et lactée du santal de l'Atlas à la force mystique d'une résine de Oud rare.",
    specs: {
      volume: "100 ml",
      concentration: "Extrait de Parfum Artisanal",
      topNotes: ["Cardamome", "Gingembre de l'Ourika"],
      heartNotes: ["Bois de Santal", "Cèdre de l'Atlas"],
      baseNotes: ["Oud de Malaisie", "Ambre Doux", "Musc"]
    }
  },
  {
    id: 'tom-ford-oud-wood',
    name: "Oud Wood Intense",
    brand: "Tom Ford",
    price: 3100,
    category: 'parfumerie',
    subcategory: 'homme',
    image: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&q=80&w=1000",
    badge: "Tendance 2026",
    material: "Bois de Oud royal & Cardamome",
    artisanOrigin: "Importation Prestige (Casablanca Elite)",
    description: "Un sillage incontournable et indémodable plébiscité par les hommes d'affaires au Maroc. Tom Ford Oud Wood libère une puissance olfactive noble, mystique et enveloppée d'épices chaudes.",
    specs: {
      volume: "100 ml",
      concentration: "Eau de Parfum Intense",
      topNotes: ["Cardamome", "Poivre du Sichuan"],
      heartNotes: ["Bois de Oud", "Bois de Santal", "Vétiver"],
      baseNotes: ["Fève Tonka", "Vanille", "Ambre précieux"]
    }
  },
  {
    id: 'ambre-mystique',
    name: "Ambre Mystique - Extrait de Parfum",
    brand: "Dar El Sanna Édition Privée",
    price: 1800,
    category: 'parfumerie',
    subcategory: 'unisex',
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=1000",
    badge: "Édition Privée",
    material: "Oud précieux & Ambre gris",
    artisanOrigin: "Grasse & Marrakech (Distillation)",
    description: "Une œuvre olfactive sacrée sans frontière de genre. Ce sillage hypnotique s'ouvre sur les fumées d'encens mystiques de l'Atlas, avant de laisser place à la profondeur tellurique d'un Oud précieux de Malaisie et de l'ambre gris sauvage. Un sillage éternel et magnétique.",
    specs: {
      volume: "100 ml",
      concentration: "Extrait de Parfum Royal (28% de concentré de parfum)",
      topNotes: ["Encens de l'Atlas", "Baies Roses", "Gingembre"],
      heartNotes: ["Oud de Malaisie", "Patchouli d'Indonésie", "Labdanum"],
      baseNotes: ["Ambre Gris sauvage", "Musc Blanc", "Cuir Doux", "Ciste"]
    }
  },
  {
    id: 'cuir-atlas',
    name: "Cuir de l'Atlas - Parfum Extrait",
    brand: "Dar El Sanna Édition Privée",
    price: 1650,
    category: 'parfumerie',
    subcategory: 'homme',
    image: "https://images.unsplash.com/photo-1515688594390-b649af70d282?auto=format&fit=crop&q=80&w=1000",
    badge: "Édition Limitée",
    material: "Essence de Cèdre & Safran",
    artisanOrigin: "Moyen-Atlas (Cèdre) & Taliouine (Safran)",
    description: "Un sillage d'une puissance rare, masculin et mystique. Il s'ouvre sur le mordant du safran rouge de Taliouine, puis dévoile un cœur sensuel de cuir tanné à l'ancienne. Le fond boisé repose sur le cèdre centenaire de l'Atlas.",
    specs: {
      volume: "100 ml",
      concentration: "Extrait de Parfum (24% de concentré de parfum)",
      topNotes: ["Safran de Taliouine", "Poivre Noir de Madagascar", "Cardamome"],
      heartNotes: ["Cuir de Fès", "Bois de Gaiac", "Tabac Blond"],
      baseNotes: ["Cèdre de l'Atlas", "Ambre Noir", "Vétiver de Java"]
    }
  },

  // --- HAUTE JOAILLERIE ---
  {
    id: 'manchette-tiznit',
    name: "Bracelet Manchette Tiznit Impérial",
    brand: "Dar El Sanna Orfèvres",
    price: 4500,
    category: 'bijouterie',
    subcategory: 'argent',
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=1000",
    badge: "Pièce Unique",
    material: "Argent Massif 925/1000",
    artisanOrigin: "Tiznit, Souss-Massa",
    description: "Une manchette majestueuse ciselée à la main par nos Maâlems bijoutiers de Tiznit. Cette création intègre des motifs géométriques berbères traditionnels réinventés pour la haute joaillerie contemporaine. Une véritable sculpture portative chargée d'histoire.",
    specs: {
      metalType: "Argent Massif 925/1000",
      weight: "48g",
      hallmark: "Poinçon de l'État marocain (Garantie de titre)",
      artisanName: "Maâlem Belkacem"
    }
  },
  {
    id: 'bague-fibule',
    name: "Bague Fibule Ciselée",
    brand: "Dar El Sanna Orfèvres",
    price: 1900,
    category: 'bijouterie',
    subcategory: 'argent',
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&q=80&w=1000",
    badge: "Édition Limitée",
    material: "Argent 925 & Turquoise",
    artisanOrigin: "Médina de Marrakech",
    description: "Inspirée des anciennes fibules berbères du Sud marocain, cette bague allie la pureté de l'argent massif gravé à la main à la vibration spirituelle d'une turquoise naturelle sélectionnée pour sa rareté.",
    specs: {
      metalType: "Argent Massif 925/1000",
      stone: "Turquoise naturelle d'Iran",
      weight: "14g",
      hallmark: "Poinçon officiel du Royaume du Maroc",
      artisanName: "Maâlem Abdeljalil"
    }
  },
  {
    id: 'manchette-cuivre',
    name: "Manchette Cuivre Martelé d'Amizmiz",
    brand: "Dar El Sanna Orfèvres",
    price: 2800,
    category: 'bijouterie',
    subcategory: 'cuivre',
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=1000",
    badge: "Édition Limitée",
    material: "Cuivre rouge pur",
    artisanOrigin: "Amizmiz, Haut-Atlas",
    description: "Une manchette large contemporaine en cuivre rouge pur martelé à l'enclume. Sa texture organique capte et sublime la lumière de façon unique. Le cuivre a été subtilement traité avec un vernis hypoallergénique de protection.",
    specs: {
      metalType: "Cuivre rouge 99,9% pur",
      weight: "32g",
      artisanName: "Maâlem Brahim"
    }
  },

  // --- HAUTE HORLOGERIE ---
  {
    id: 'chronographe-moresque',
    name: "Chronographe Moresque I",
    brand: "Dar El Sanna Atelier Horloger",
    price: 18500,
    category: 'horlogerie',
    subcategory: 'inspiration',
    image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=1000",
    badge: "Édition Limitée",
    material: "Acier 316L & Cuir d'Autruche",
    artisanOrigin: "Inspiration Horlogère, Fès (Maroquinerie)",
    description: "Garde-temps automatique d'exception rendant hommage aux complications de la haute horlogerie. Le boîtier en acier brossé abrite un cadran noir texturé. Le bracelet est confectionné en cuir d'autruche cousu main dans notre atelier de Fès.",
    specs: {
      movement: "Automatique (Mouvement suisse modifié, calibre DS-01)",
      reserve: "42 heures",
      case: "Acier inoxydable 316L de qualité chirurgicale",
      diameter: "40 mm",
      strap: "Cuir d'autruche noble de Fès (Marron mat, coutures or)",
      glass: "Verre saphir double dôme inrayable avec traitement antireflet"
    }
  },
  {
    id: 'astral-fes',
    name: "L'Astral de Fès (Squelette)",
    brand: "Dar El Sanna Atelier Horloger",
    price: 24000,
    category: 'horlogerie',
    subcategory: 'inspiration',
    image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&q=80&w=1000",
    badge: "Pièce Unique",
    material: "Or Jaune 18k & Crocodile",
    artisanOrigin: "Inspiration Horlogère, Casablanca (Montage)",
    description: "Montre squelette automatique unique en son genre qui révèle avec majesté l'intimité de ses rouages. Le boîtier est plaqué or jaune 18 carats de 3 microns. Elle intègre une complication phase de lune poétique gravée de décors arabo-andalous.",
    specs: {
      movement: "Automatique squelette fini à la main",
      reserve: "48 heures",
      complication: "Phase de lune à 6 heures",
      case: "Acier 316L plaqué Or Jaune 18 carats (épaisseur 3 microns)",
      diameter: "41 mm",
      strap: "Cuir de crocodile véritable noir, tannage végétal",
      glass: "Saphir cristal avant et arrière"
    }
  },
  {
    id: 'astrolabe-fes-18',
    name: "Astrolabe en Laiton de Fès (XVIIIe Siècle)",
    brand: "Antiquités Rares Dar El Sanna",
    price: 75000,
    category: 'antiquites',
    subcategory: 'epoque',
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80&w=1000",
    badge: "Pièce Unique",
    material: "Laiton ciselé à la main",
    artisanOrigin: "Ancienne Médina de Fès",
    description: "Une pièce de musée d'une rareté absolue. Cet astrolabe arabo-andalou en laiton massif a été ciselé par les maîtres astronomes de Fès au cours du XVIIIe siècle. Cet instrument de précision servait à calculer le mouvement des étoiles, l'heure solaire et la direction de la Qibla. Une pièce historique d'exception pour collectionneurs d'élite.",
    specs: {
      metalType: "Laiton massif patiné",
      weight: "1.2 kg",
      hallmark: "Inscriptions calligraphiées d'époque",
      artisanName: "Maître Horloger Astronomique de Fès (XVIIIe)"
    }
  },
  {
    id: 'coffre-dot-essaouira',
    name: "Coffre de Dot en Cèdre Sculpté (XIXe Siècle)",
    brand: "Antiquités Rares Dar El Sanna",
    price: 32000,
    category: 'antiquites',
    subcategory: 'epoque',
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=1000",
    badge: "Pièce Unique",
    material: "Bois de cèdre de l'Atlas & marqueterie",
    artisanOrigin: "Mogador (Essaouira), Maroc",
    description: "Authentique coffre de dot (Sandoq) de la région d'Essaouira (Mogador) datant de la fin du XIXe siècle. Façonné en bois de cèdre odorant de l'Atlas, il arbore de splendides motifs géométriques sculptés au ciseau à bois et marquetés d'ébène et de citronnier. Les ferrures d'origine en fer forgé ajoutent à son caractère historique inégalable.",
    specs: {
      metalType: "Fer forgé d'époque",
      stone: "Marqueterie d'Ébène et Citronnier",
      weight: "24 kg",
      hallmark: "Certificat d'Origine et d'Authenticité Dar El Sanna"
    }
  },

  // --- HAUTE BIJOUTERIE (compléments) ---
  {
    id: 'collier-ambre-rif',
    name: "Collier d'Ambre du Rif — Pièce Ancienne",
    brand: "Dar El Sanna Orfèvres",
    price: 3200,
    category: 'bijouterie',
    subcategory: 'femme',
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=1000",
    badge: "Exclusivité Maroc",
    material: "Ambre naturel du Rif & Argent 925",
    artisanOrigin: "Rif, Nord Maroc",
    description: "Un sautoir de prestige composé de perles d'ambre brut authentique du Rif marocain, sélectionnées pour leur couleur miel profonde et leur translucidité. Les intercalaires en argent massif 925 ciselés à la main par nos maâlems de Tétouan apportent une touche de raffinement contemporain à cette pièce chargée d'histoire.",
    specs: {
      metalType: "Argent Massif 925/1000 & Ambre naturel",
      weight: "62g",
      hallmark: "Poinçon officiel du Royaume du Maroc",
      artisanName: "Maâlem Hamid, Tétouan"
    }
  },
  {
    id: 'boucles-coral-argent',
    name: "Boucles d'Oreilles Corail & Argent Berbère",
    brand: "Dar El Sanna Orfèvres",
    price: 2100,
    category: 'bijouterie',
    subcategory: 'femme',
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=1000",
    badge: "Pièce Unique",
    material: "Corail rouge naturel & Argent 925",
    artisanOrigin: "Médina de Tiznit",
    description: "Magnifiques boucles d'oreilles pendantes à motifs de croissant de lune, sertissant un corail rouge naturel de la côte atlantique. Ce duo allie la symbolique protectrice du corail (très prisée dans la culture berbère) à la maîtrise orfèvrière des bijoutiers de Tiznit. Livrées dans leur écrin de velours noir.",
    specs: {
      metalType: "Argent Massif 925/1000",
      stone: "Corail rouge naturel de l'Atlantique",
      weight: "18g",
      hallmark: "Poinçon de l'État marocain (Garantie de titre)",
      artisanName: "Maâlem Fatima"
    }
  },
  {
    id: 'khamsa-or-engraissee',
    name: "Main de Fatima (Khamsa) Or & Turquoise",
    brand: "Dar El Sanna Orfèvres",
    price: 5800,
    category: 'bijouterie',
    subcategory: 'unisex',
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=1000",
    badge: "Édition Limitée",
    material: "Plaqué Or 18k & Turquoise persane",
    artisanOrigin: "Atelier Dar El Sanna, Fès",
    description: "La Khamsa (Main de Fatima), symbole de protection dans tout le monde islamique, ici sublimée en pendentif de haute joaillerie. La base en argent massif est couverte d'un plaquage or 18 carats micronisé, orné d'une turquoise persane en cabochon et d'une calligraphie arabe finement gravée à la main. Un talisman d'exception.",
    specs: {
      metalType: "Argent Massif 925, plaqué Or Jaune 18k",
      stone: "Turquoise naturelle de Perse",
      weight: "22g",
      hallmark: "Certification artisanale Dar El Sanna",
      artisanName: "Maâlem Youssef, Fès"
    }
  },

  // --- HAUTE HORLOGERIE (compléments) ---
  {
    id: 'dame-andalouse',
    name: "Dame Andalouse — Automatique Dame",
    brand: "Dar El Sanna Atelier Horloger",
    price: 14500,
    category: 'horlogerie',
    subcategory: 'femme',
    image: "https://images.unsplash.com/photo-1548171915-e79a380a2a4b?auto=format&fit=crop&q=80&w=1000",
    badge: "Exclusivité Maroc",
    material: "Acier satiné & Bracelet Milanais doré",
    artisanOrigin: "Inspiration Horlogère, Grenade & Rabat",
    description: "Une montre d'exception dédiée à la femme d'élite. Son cadran ivoire nacré est orné de décors arabesques gravés à la loupe par nos horlogers. La lunette biseautée en acier satiné encadre ce chef-d'œuvre miniature d'une aura délicate. Le bracelet Milanais en mailles dorées finit ce tableau de sophistication absolue.",
    specs: {
      movement: "Automatique (Calibre Swiss Sellita SW200-1)",
      reserve: "38 heures",
      case: "Acier inoxydable 316L brossé et poli",
      diameter: "34 mm",
      strap: "Bracelet Milanais en acier doré PVD"
    }
  },
  {
    id: 'sultan-diver',
    name: "Le Sultan — Plongée de Prestige 300m",
    brand: "Dar El Sanna Atelier Horloger",
    price: 16800,
    category: 'horlogerie',
    subcategory: 'homme',
    image: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&q=80&w=1000",
    badge: "Édition Limitée",
    material: "Acier 316L & Caoutchouc FKM",
    artisanOrigin: "Inspiration Horlogère, Agadir (Côte Atlantique)",
    description: "Montre de plongée de luxe étanche jusqu'à 300 mètres, dont le cadran d'un bleu profond évoque les eaux de l'Atlantique au large d'Agadir. La lunette tournante unidirectionnelle en céramique noire et les index Super-LumiNova assurent une lisibilité maximale en toutes conditions. Un outil sportif au standing irréprochable.",
    specs: {
      movement: "Automatique (Calibre Miyota 9015 modifié)",
      reserve: "42 heures",
      case: "Acier 316L traité de revêtement DLC noir",
      diameter: "42 mm",
      strap: "Caoutchouc FKM bleu marine, boucle déployante"
    }
  },
  {
    id: 'medersa-tourbillon',
    name: "Médèrsa — Grande Complication Tourbillon",
    brand: "Dar El Sanna Atelier Horloger",
    price: 145000,
    category: 'horlogerie',
    subcategory: 'inspiration',
    image: "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?auto=format&fit=crop&q=80&w=1000",
    badge: "Pièce Unique",
    material: "Platine 950 & Cuir Veau Grainé",
    artisanOrigin: "Atelier Haute Horlogerie Suisse, sous direction Dar El Sanna",
    description: "Le summum de notre savoir-faire horloger. Ce tourbillon volant en platine 950 est animé d'une grande complication réunissant le tourbillon à une minute, la sonnerie à la demande et le calendrier perpétuel. Le pont en forme d'arche de la Médersa Ben Youssef de Marrakech est gravé à la main sur le mouvement. Seulement 3 pièces produites par an.",
    specs: {
      movement: "Tourbillon volant à une minute, Sonnerie à la demande, Calendrier Perpétuel",
      reserve: "72 heures",
      complication: "Tourbillon + Grande Sonnerie + Calendrier Perpétuel",
      case: "Platine 950, étanchéité 30m",
      diameter: "43 mm",
      strap: "Veau grainé main, coutures dorées (inclus 2 bracelets)"
    }
  },

  // --- ANTIQUITÉS RARES (compléments) ---
  {
    id: 'zellige-marinide',
    name: "Panneau de Zelliges Mérinides (XIVe Siècle)",
    brand: "Antiquités Rares Dar El Sanna",
    price: 88000,
    category: 'antiquites',
    subcategory: 'epoque',
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=1000",
    badge: "Pièce Unique",
    material: "Terre cuite émaillée & pigments minéraux",
    artisanOrigin: "Fès, Époque mérinide",
    description: "Fragment de revêtement mural en zelliges provenant d'un palais mérinide de Fès daté du XIVe siècle, déposé lors d'une restauration supervisée par le Ministère de la Culture. La géométrie parfaite et l'éclat des pigments naturels — cobalt, manganèse et oxyde de cuivre — témoignent de la maîtrise technique incomparable des mâalemines de cette époque glorieuse.",
    specs: {
      metalType: "Terre cuite émaillée aux pigments minéraux purs",
      weight: "8.4 kg",
      hallmark: "Certification du Ministère de la Culture du Maroc — Exeat d'exportation inclus",
      artisanName: "Maâlemines mérinides anonymes (XIVe siècle)"
    }
  },
  {
    id: 'fusil-berbere-18',
    name: "Fusil de Parade Berbère Niellé (XVIIIe)",
    brand: "Antiquités Rares Dar El Sanna",
    price: 42000,
    category: 'antiquites',
    subcategory: 'epoque',
    image: "https://images.unsplash.com/photo-1580130732478-4e339fb6836f?auto=format&fit=crop&q=80&w=1000",
    badge: "Pièce Unique",
    material: "Crosse en bois de cèdre & métal niellé d'argent",
    artisanOrigin: "Région de Meknès-Tafilalet, XVIIIe siècle",
    description: "Fusil de parade à silex d'apparat, typique des tribus berbères du Moyen-Atlas au XVIIIe siècle. La crosse en bois de cèdre sculpté est entièrement recouverte de niellelures d'argent de toute beauté figurant des étoiles et entrelacs. L'armurerie berbère, à mi-chemin entre l'art et la guerre, atteint ici son expression la plus aboutie. Livré avec support en bois de chêne.",
    specs: {
      metalType: "Acier forgé & argent niellé à la main",
      weight: "3.1 kg (arme) + 0.8 kg (support)",
      hallmark: "Certificat d'Authenticité Dar El Sanna + Rapport Historique",
      artisanName: "Armurerie berbère du Moyen-Atlas (XVIIIe)"
    }
  }
];
