// Pizza Knowledge Base for Manchi Chatbot
// Comprehensive information about Chicago Style vs New York Style Pizza

// Bilingual Responses
export const bilingualResponses = {
  greeting: {
    en: "Hi! I'm Manchi, your pizza expert! 🍕 Just ask me anything about Manhattan Chicago Pizza!",
    es: "¡Hola! Soy Manchi, ¡tu experto en pizzas! 🍕 ¡Pregúntame lo que quieras sobre Manhattan Chicago Pizza!"
  },
  languageSwitch: {
    en: "I'll continue in English. How can I help you?",
    es: "Continuaré en español. ¿En qué puedo ayudarte?"
  },
  menu: {
    en: "Here's our menu with both Chicago Deep Dish and New York Style pizzas, plus other Italian favorites!",
    es: "¡Aquí está nuestro menú con pizzas estilo Chicago Deep Dish y New York, además de otros favoritos italianos!"
  },
  hours: {
    en: "We're open weekdays 11 AM - 10 PM and weekends 11 AM - 11 PM.",
    es: "Estamos abiertos de lunes a viernes de 11 AM a 10 PM y fines de semana de 11 AM a 11 PM."
  },
  delivery: {
    en: "Yes, we offer delivery! You can order through our website or DoorDash.",
    es: "¡Sí, hacemos entregas! Puedes ordenar a través de nuestro sitio web o DoorDash."
  },
  location: {
    en: "We're located at 12715 S Dixie Hwy, Pinecrest, FL. Call us at +1 786-581-9240 or email manchipizza@gmail.com!",
    es: "Estamos ubicados en 12715 S Dixie Hwy, Pinecrest, FL. ¡Llámanos al +1 786-581-9240 o envía email a manchipizza@gmail.com!"
  }
};

// Chicago Style vs New York Style Pizza
export const pizzaStyles = {
  chicago: {
    name: "Chicago Style Deep Dish",
    description: "Our signature deep dish pizza with thick, buttery crust that creates a bowl-like shape",
    characteristics: [
      "Thick, buttery crust that extends up the sides forming a deep bowl",
      "Cheese layered directly on the crust (reverse assembly)",
      "Multiple layers of toppings and fillings",
      "Chunky, delicate-flavored tomato sauce on top",
      "Baked for 30-50 minutes at lower temperature",
      "Served with fork and knife like a casserole",
      "More filling - one slice can be a full meal",
      "Sometimes features stuffed variety with top crust layer"
    ],
    history: "Originated in Chicago in the early 20th century, with some attributing its invention to Pizzeria Uno in 1943",
    cookingMethod: "Baked in deep steel pans or iron skillets, oiled for easy removal and crispy bottom",
    calories: "Approximately 460 calories per slice",
    eatingStyle: "Requires utensils, eaten like a pie or casserole"
  },
  newYork: {
    name: "New York Style Thin Crust",
    description: "Classic thin crust pizza that's foldable and perfect for eating on-the-go",
    characteristics: [
      "Thin, crispy yet flexible crust that can be folded",
      "Light, smooth layer of well-seasoned marinara sauce",
      "Low-moisture mozzarella cheese that stretches beautifully",
      "Simple, single layer of toppings for balanced proportions",
      "Quick bake at high temperature (12-15 minutes)",
      "Cut into large triangular slices",
      "Eaten by hand, often folded in half",
      "Perfect for quick meals and snacking"
    ],
    history: "Dating back to 1905 with the opening of America's first pizzeria, Lombardi's in NYC",
    cookingMethod: "Baked in industrial ovens at high temperatures for quick cooking",
    calories: "Approximately 250 calories per slice",
    eatingStyle: "Hand-held, often folded in half for easy eating"
  },
  comparison: {
    mainDifferences: [
      "Crust thickness: NY is thin and crispy, Chicago is thick and buttery",
      "Assembly order: NY has sauce on bottom, Chicago has sauce on top",
      "Eating method: NY by hand (foldable), Chicago with utensils",
      "Cooking time: NY 12-15 minutes, Chicago 30-50 minutes",
      "Portion size: NY lighter for snacking, Chicago more filling meal",
      "Toppings: NY simple single layer, Chicago multiple generous layers"
    ],
    popularity: "27 US states prefer thin crust style, while 21 prefer deep dish style"
  }
};

// Restaurant Information
export const restaurantInfo = {
  name: "Manhattan Chicago Pizza",
  location: {
    address: "12715 S Dixie Hwy, Pinecrest, FL, United States, Florida",
    phone: "+1 786-581-9240",
    email: "manchipizza@gmail.com",
    hours: {
      weekdays: "11:00 AM - 10:00 PM",
      weekends: "11:00 AM - 11:00 PM"
    },
    delivery: {
      available: true,
      methods: ["Direct delivery", "DoorDash"],
      area: "Pinecrest and surrounding areas"
    },
    orderingOptions: {
      online: "manhattanchicagopizzeria.com",
      phone: "+1 786-581-9240",
      email: "manchipizza@gmail.com",
      thirdParty: "DoorDash"
    }
  },
  specialty: "Authentic New York and Chicago style pizzas",
  description: "We offer both New York and Chicago style pizzas using fresh ingredients and traditional recipes",
  hours: {
    weekdays: "11:00 AM - 10:00 PM",
    weekends: "11:00 AM - 11:00 PM"
  },
  services: ["Dine-in", "Takeout", "Delivery", "Catering"],
  orderingOptions: [
    "In-store",
    "Phone: +1 786-581-9240",
    "Email: manchipizza@gmail.com",
    "Online at manhattanchicagopizzeria.com",
    "DoorDash delivery"
  ]
};

// Menu Highlights
export const menuHighlights = {
  pizzas: {
    chicago: [
      "The Original Chicago Deep Dish",
      "The Cheese Chicago Deep Dish",
      "Supreme Deep Dish",
      "Meat Lovers Deep Dish"
    ],
    newYork: [
      "Liberty Supreme",
      "Hawaiian at Yankee Stadium",
      "Classic Margherita",
      "Pepperoni NY Style"
    ]
  },
  otherItems: [
    "Fresh pasta dishes",
    "Garden salads",
    "Italian sandwiches",
    "Garlic rolls",
    "Baked chicken wings",
    "Calzones and Strombolis",
    "Appetizers and soups"
  ],
  ingredients: "We use only fresh, high-quality ingredients in all our dishes"
};

// Common Questions and Answers
export const faq = {
  "What's the difference between Chicago and New York pizza?": "Chicago style features a thick, deep-dish crust with sauce on top and is eaten with utensils, while New York style has a thin, foldable crust with sauce under the cheese.",
  "How long does Chicago deep dish take to cook?": "Our Chicago deep dish pizzas take 30-50 minutes to bake properly due to their thick crust and multiple layers.",
  "Can I fold your New York style pizza?": "Yes! Our New York style pizza has the classic thin, flexible crust that's perfect for folding and eating by hand.",
  "Do you deliver?": "Yes, we offer delivery through our restaurant and also through DoorDash.",
  "What are your hours?": "We're open 11 AM to 10 PM on weekdays and 11 AM to 11 PM on weekends.",
  "Where are you located?": "We're located at 12715 S Dixie Hwy, Pinecrest, FL. You can call us at +1 786-581-9240 or email manchipizza@gmail.com.",
  "Do you use fresh ingredients?": "Absolutely! We pride ourselves on using only fresh, high-quality ingredients in all our dishes.",
  "Can I order online?": "Yes, you can order online at manhattanchicagopizzeria.com or through DoorDash."
};

// Pricing Information from Miami Menu
export const pricingInfo = {
  toppings: {
    premium: {
      name: "Premium Toppings",
      price: {
        small: 2.50,
        medium: 3.00,
        large: 3.50,
        xlarge: 4.00
      },
      items: ["Pepperoni", "Italian Sausage", "Ground Beef", "Bacon", "Ham", "Salami", "Anchovies"]
    },
    regular: {
      name: "Regular Toppings",
      price: {
        small: 2.00,
        medium: 2.50,
        large: 3.00,
        xlarge: 3.50
      },
      items: ["Mushrooms", "Green Peppers", "Onions", "Black Olives", "Green Olives", "Tomatoes", "Jalapeños"]
    },
    specialty: {
      name: "Specialty Toppings",
      price: {
        small: 3.00,
        medium: 3.50,
        large: 4.00,
        xlarge: 4.50
      },
      items: ["Fresh Mozzarella", "Ricotta Cheese", "Feta Cheese", "Goat Cheese", "Pineapple", "Sun-dried Tomatoes", "Artichoke Hearts", "Spinach"]
    }
  },
  pizzaSizes: {
    small: {
      name: "Small (10\")",
      basePrice: {
        cheese: 12.99,
        deepDish: 15.99
      }
    },
    medium: {
      name: "Medium (12\")",
      basePrice: {
        cheese: 15.99,
        deepDish: 18.99
      }
    },
    large: {
      name: "Large (14\")",
      basePrice: {
        cheese: 18.99,
        deepDish: 21.99
      }
    },
    xlarge: {
      name: "X-Large (16\")",
      basePrice: {
        cheese: 21.99,
        deepDish: 24.99
      }
    }
  },
  specialtyPizzas: {
    supreme: {
      name: "Supreme",
      description: "Pepperoni, sausage, mushrooms, green peppers, onions",
      price: {
        small: 18.99,
        medium: 21.99,
        large: 24.99,
        xlarge: 27.99
      }
    },
    meatLovers: {
      name: "Meat Lovers",
      description: "Pepperoni, sausage, bacon, ham, ground beef",
      price: {
        small: 19.99,
        medium: 22.99,
        large: 25.99,
        xlarge: 28.99
      }
    },
    veggie: {
      name: "Veggie Deluxe",
      description: "Mushrooms, green peppers, onions, black olives, tomatoes",
      price: {
        small: 17.99,
        medium: 20.99,
        large: 23.99,
        xlarge: 26.99
      }
    },
    hawaiian: {
      name: "Hawaiian",
      description: "Ham and pineapple",
      price: {
        small: 16.99,
        medium: 19.99,
        large: 22.99,
        xlarge: 25.99
      }
    },
    margherita: {
      name: "Margherita",
      description: "Fresh mozzarella, basil, tomato sauce",
      price: {
        small: 16.99,
        medium: 19.99,
        large: 22.99,
        xlarge: 25.99
      }
    }
  },
  appetizers: {
    garlicBread: { name: "Garlic Bread", price: 6.99 },
    mozzarellaSticks: { name: "Mozzarella Sticks (8 pcs)", price: 8.99 },
    wings: { name: "Buffalo Wings (10 pcs)", price: 12.99 },
    calamari: { name: "Fried Calamari", price: 11.99 },
    bruschetta: { name: "Bruschetta (4 pcs)", price: 7.99 }
  },
  salads: {
    caesar: { name: "Caesar Salad", price: 9.99 },
    garden: { name: "Garden Salad", price: 8.99 },
    greek: { name: "Greek Salad", price: 11.99 },
    antipasto: { name: "Antipasto Salad", price: 12.99 }
  },
  pasta: {
    spaghetti: { name: "Spaghetti & Meatballs", price: 14.99 },
    fettuccine: { name: "Fettuccine Alfredo", price: 13.99 },
    lasagna: { name: "Meat Lasagna", price: 16.99 },
    penne: { name: "Penne Arrabbiata", price: 12.99 }
  },
  beverages: {
    soda: { name: "Soft Drinks", price: 2.99 },
    water: { name: "Bottled Water", price: 1.99 },
    juice: { name: "Fresh Juice", price: 3.99 },
    coffee: { name: "Coffee", price: 2.49 }
  },
  desserts: {
    tiramisu: { name: "Tiramisu", price: 6.99 },
    cannoli: { name: "Cannoli (2 pcs)", price: 5.99 },
    cheesecake: { name: "New York Cheesecake", price: 5.99 },
    gelato: { name: "Gelato (per scoop)", price: 3.99 }
  },
  extras: {
    extraCheese: { name: "Extra Cheese", price: { small: 2.00, medium: 2.50, large: 3.00, xlarge: 3.50 } },
    extraSauce: { name: "Extra Sauce", price: 1.50 },
    glutenFreeCrust: { name: "Gluten-Free Crust", price: 3.00 },
    deliveryFee: { name: "Delivery Fee", price: 3.50 },
    cateringSetup: { name: "Catering Setup Fee", price: 25.00 }
  }
};

// Bilingual responses
export const bilingualResponses = {
  greeting: {
    en: "Hi, I'm Manchi, ask me anything about pizza. Habla español.",
    es: "¡Hola, soy Manchi! Pregúntame cualquier cosa sobre nuestras pizzas. I speak English too."
  },
  menu: {
    en: "Here's what we offer",
    es: "Esto es lo que ofrecemos"
  },
  commonPhrases: {
    thanks: {
      en: "You're welcome! Anything else about our delicious pizzas?",
      es: "¡De nada! ¿Algo más sobre nuestras deliciosas pizzas?"
    },
    orderHelp: {
      en: "You can order online at manhattanchicagopizzeria.com, call us at +1 786-581-9240, email manchipizza@gmail.com, or use DoorDash!",
      es: "Puedes ordenar en línea en manhattanchicagopizzeria.com, llamarnos al +1 786-581-9240, enviar email a manchipizza@gmail.com, ¡o usar DoorDash!"
    },
    location: {
      en: "We're located at 12715 S Dixie Hwy, Pinecrest, FL, United States, Florida. Call us at +1 786-581-9240 or email manchipizza@gmail.com!",
      es: "Estamos ubicados en 12715 S Dixie Hwy, Pinecrest, FL, United States, Florida. ¡Llámanos al +1 786-581-9240 o envía email a manchipizza@gmail.com!"
    }
    hours: {
      en: "We're open from 11:00 AM to 10:00 PM on weekdays, and 11:00 AM to 11:00 PM on weekends.",
      es: "Estamos abiertos de 11:00 AM a 10:00 PM entre semana, y de 11:00 AM a 11:00 PM los fines de semana."
    },
    delivery: {
      en: "Yes, we offer delivery! You can order directly through us or via DoorDash.",
      es: "¡Sí, hacemos entregas! Puedes ordenar directamente con nosotros o a través de DoorDash."
    },
    prices: {
      en: "Our prices vary by size and style. Would you like to know about specific items?",
      es: "Nuestros precios varían según el tamaño y el estilo. ¿Te gustaría saber sobre algún producto en particular?"
    },
    default: {
      en: "I'm here to help! Ask me about our menu, hours, location, delivery, or anything else!",
      es: "¡Estoy aquí para ayudarte! Pregúntame sobre nuestro menú, horarios, ubicación, entregas, ¡o cualquier otra cosa!"
    }
  },
  pizzaTypes: {
    chicago: {
      en: "Our Chicago-style deep dish pizza features a thick, buttery crust filled with layers of cheese, toppings, and topped with chunky tomato sauce.",
      es: "Nuestra pizza estilo Chicago deep dish tiene una corteza gruesa y mantequillosa, rellena con capas de queso, ingredientes, y cubierta con salsa de tomate."
    },
    newYork: {
      en: "Our New York-style pizza has a thin, crispy yet foldable crust with traditional toppings and perfectly melted cheese.",
      es: "Nuestra pizza estilo Nueva York tiene una corteza delgada, crujiente pero flexible, con ingredientes tradicionales y queso perfectamente derretido."
    }
  }
};