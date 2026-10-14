import provoleta from "@/assets/dish-provoleta.jpg";
import empanadas from "@/assets/dish-empanadas.jpg";
import rabas from "@/assets/dish-rabas.jpg";
import milaNapo from "@/assets/dish-milanesa-napo.jpg";
import milaCaballo from "@/assets/dish-milanesa-caballo.jpg";
import fugazzeta from "@/assets/dish-fugazzeta.jpg";
import pasta from "@/assets/dish-pasta.jpg";
import parrilla from "@/assets/dish-parrilla.jpg";
import flan from "@/assets/dish-flan.jpg";
import cheesecake from "@/assets/dish-cheesecake.jpg";
import brownie from "@/assets/dish-brownie.jpg";
import vino from "@/assets/dish-vino.jpg";
import cerveza from "@/assets/dish-cerveza.jpg";
import agua from "@/assets/dish-agua.jpg";
import choripan from "@/assets/dish-choripan.jpg";
import matambre from "@/assets/dish-matambre.jpg";
import ensalada from "@/assets/dish-ensalada.jpg";
import noquis from "@/assets/dish-noquis.jpg";
import bondiola from "@/assets/dish-bondiola.jpg";
import tiramisu from "@/assets/dish-tiramisu.jpg";
import fernet from "@/assets/dish-fernet.jpg";
import jugo from "@/assets/dish-jugo.jpg";

export type Dish = {
  id: string;
  name: string;
  price: number;
  shortDescription: string;
  longDescription?: string;
  ingredients?: string[];
  /** Atributos dietarios: los íconos solo se muestran si están en true. */
  vegetarian?: boolean;
  vegan?: boolean;
  glutenFree?: boolean;
  image: string;
};

export type Category = {
  id: string;
  name: string;
  dishes: Dish[];
};

export type Restaurant = {
  name: string;
  tagline: string;
  subtitle: string;
  heroTitle: string;
  heroImage: string;
  footerNote: string;
  developerCredit: string;
  developerUrl: string;
  googleReviewUrl: string;
  currency: string;
  categories: Category[];
};

const fmtCurrency = "$";

export const restaurant: Restaurant = {
  name: "Mailo",
  tagline: "delivery",
  subtitle: "Cocina de barrio, ingredientes reales, sabores que nos representan.",
  heroTitle: "Elegí viendo el plato real",
  heroImage: "/src/assets/hero-dish.jpg",
  footerNote: "Consultá al personal por alérgenos y opciones especiales.",
  developerCredit: "GastroQode",
  // Web del desarrollador: se abre al tocar el crédito del pie de página.
  developerUrl: "https://gastroqode.com",
  // Enlace de reseña de Google. Reemplazalo por el URL exacto de la ficha
  // ("Escribir una reseña") cuando lo tengas.
  googleReviewUrl: "https://www.google.com/maps/search/?api=1&query=Mailo",
  currency: fmtCurrency,
  categories: [
    {
      id: "entradas",
      name: "Entradas",
      dishes: [
        {
          id: "provoleta",
          name: "Provoleta",
          price: 4500,
          vegetarian: true,
          shortDescription: "Provoleta al horno, con orégano y ají molido.",
          longDescription:
            "Queso provolone fundido en sartén de hierro, dorado por fuera y cremoso por dentro. Servido bien caliente con pan tostado.",
          ingredients: ["Queso provolone", "Orégano", "Ají molido", "Aceite de oliva"],
          image: provoleta,
        },
        {
          id: "empanadas",
          name: "Empanadas caseras",
          price: 1800,
          shortDescription: "Carne cortada a cuchillo, horneadas al punto justo.",
          longDescription:
            "Masa fina y crocante rellena con carne cortada a cuchillo, salteada con cebolla, morrón y especias.",
          ingredients: ["Carne", "Cebolla", "Morrón", "Comino", "Pimentón"],
          image: empanadas,
        },
        {
          id: "rabas",
          name: "Rabas",
          price: 7800,
          shortDescription: "Tiernas, crocantes y bien doradas.",
          longDescription:
            "Anillos de calamar frescos rebozados ligeros, fritos al momento. Se acompañan con limón fresco.",
          ingredients: ["Calamar", "Harina", "Limón", "Perejil"],
          image: rabas,
        },
        {
          id: "choripan",
          name: "Choripán",
          price: 3900,
          shortDescription: "Chorizo a la parrilla con chimichurri casero.",
          longDescription:
            "Chorizo parrillero abierto en pan crocante, coronado con chimichurri recién hecho.",
          ingredients: ["Chorizo", "Pan", "Chimichurri"],
          image: choripan,
        },
        {
          id: "ensalada",
          name: "Ensalada mixta",
          price: 3200,
          vegetarian: true,
          vegan: true,
          glutenFree: true,
          shortDescription: "Lechuga, tomate, cebolla y aceite de oliva.",
          longDescription:
            "Clásica ensalada mixta con verduras frescas del día, aliñada con aceite de oliva extra virgen.",
          ingredients: ["Lechuga", "Tomate", "Cebolla", "Aceite de oliva"],
          image: ensalada,
        },
      ],
    },
    {
      id: "principales",
      name: "Platos principales",
      dishes: [
        {
          id: "mila-napo",
          name: "Milanesa napolitana",
          price: 9500,
          shortDescription: "Clásica, con salsa casera, jamón y queso.",
          longDescription:
            "Milanesa de nalga fina, cubierta de salsa de tomate casera, jamón cocido y mozzarella gratinada.",
          ingredients: ["Nalga", "Pan rallado", "Salsa de tomate", "Jamón", "Mozzarella"],
          image: milaNapo,
        },
        {
          id: "mila-caballo",
          name: "Milanesa a caballo",
          price: 8900,
          shortDescription: "Con dos huevos fritos y todo el sabor.",
          longDescription:
            "Milanesa crocante coronada con dos huevos fritos de yema bien dorada.",
          ingredients: ["Nalga", "Huevos", "Pan rallado"],
          image: milaCaballo,
        },
        {
          id: "fugazzeta",
          name: "Fugazzeta",
          price: 8200,
          vegetarian: true,
          shortDescription: "Masa alta, cebolla y queso al gratén.",
          longDescription:
            "Fugazzeta de masa esponjosa con doble mozzarella, cebolla y un toque de orégano.",
          ingredients: ["Masa", "Mozzarella", "Cebolla", "Orégano"],
          image: fugazzeta,
        },
        {
          id: "pasta",
          name: "Pasta casera",
          price: 7900,
          vegetarian: true,
          shortDescription: "Recetas de familia, hechas cada día.",
          longDescription:
            "Spaghetti elaborado en casa con salsa de tomates frescos y queso parmesano rallado al momento.",
          ingredients: ["Pasta fresca", "Tomate", "Albahaca", "Parmesano"],
          image: pasta,
        },
        {
          id: "noquis",
          name: "Ñoquis del 29",
          price: 7400,
          vegetarian: true,
          shortDescription: "Ñoquis de papa con salsa de tomate y parmesano.",
          longDescription:
            "Ñoquis de papa caseros con salsa de tomate de cocción lenta y queso parmesano rallado.",
          ingredients: ["Papa", "Harina", "Tomate", "Parmesano"],
          image: noquis,
        },
        {
          id: "parrilla",
          name: "Parrilla de barrio",
          price: 14500,
          shortDescription: "Cortes seleccionados, al punto justo.",
          longDescription:
            "Selección de cortes a la parrilla con maderas naturales. Servido sobre tabla.",
          ingredients: ["Bife", "Vacío", "Chorizo", "Sal gruesa"],
          image: parrilla,
        },
        {
          id: "matambre",
          name: "Matambre a la pizza",
          price: 11200,
          shortDescription: "Matambre con salsa, mozzarella y orégano.",
          longDescription:
            "Matambre de ternera tierno cubierto con salsa de tomate, mozzarella derretida y orégano fresco.",
          ingredients: ["Matambre", "Tomate", "Mozzarella", "Orégano"],
          image: matambre,
        },
        {
          id: "bondiola",
          name: "Sándwich de bondiola",
          price: 7600,
          shortDescription: "Bondiola braseada con cebollas caramelizadas.",
          longDescription:
            "Bondiola de cerdo cocinada a fuego lento, servida en pan crocante con cebollas caramelizadas.",
          ingredients: ["Bondiola", "Cebolla", "Pan"],
          image: bondiola,
        },
      ],
    },
    {
      id: "postres",
      name: "Postres",
      dishes: [
        {
          id: "flan",
          name: "Flan casero",
          price: 3800,
          vegetarian: true,
          glutenFree: true,
          shortDescription: "Con dulce de leche y crema.",
          longDescription:
            "Flan de huevo casero acompañado de dulce de leche y un copete de crema batida.",
          ingredients: ["Huevo", "Leche", "Dulce de leche", "Crema"],
          image: flan,
        },
        {
          id: "cheesecake",
          name: "Cheesecake",
          price: 4200,
          vegetarian: true,
          shortDescription: "Con salsa de frutos rojos.",
          longDescription:
            "Cheesecake clásico con base de galleta y cobertura de frutos rojos en almíbar.",
          ingredients: ["Queso crema", "Galleta", "Frutos rojos"],
          image: cheesecake,
        },
        {
          id: "brownie",
          name: "Brownie con helado",
          price: 4500,
          vegetarian: true,
          shortDescription: "Tibio, con helado de crema y chocolate.",
          longDescription:
            "Brownie de chocolate semiamargo, servido tibio con helado de crema americana y salsa de chocolate.",
          ingredients: ["Chocolate", "Nueces", "Helado de crema"],
          image: brownie,
        },
        {
          id: "tiramisu",
          name: "Tiramisú",
          price: 4400,
          vegetarian: true,
          shortDescription: "Clásico italiano con café y cacao.",
          longDescription:
            "Capas de bizcochos de café, crema mascarpone y un velo de cacao amargo.",
          ingredients: ["Mascarpone", "Café", "Cacao", "Bizcochos"],
          image: tiramisu,
        },
      ],
    },
    {
      id: "bebidas",
      name: "Bebidas",
      dishes: [
        {
          id: "vino",
          name: "Vino Malbec",
          price: 6500,
          shortDescription: "Tinto de bodega, copa o botella.",
          longDescription:
            "Malbec de Mendoza, en copa o botella. Consultá la carta de vinos completa.",
          image: vino,
        },
        {
          id: "cerveza",
          name: "Cerveza tirada",
          price: 2800,
          shortDescription: "Rubia bien fría, recién tirada.",
          longDescription: "Cerveza artesanal rubia, servida en pinta helada.",
          image: cerveza,
        },
        {
          id: "fernet",
          name: "Fernet con cola",
          price: 3500,
          shortDescription: "Bien cargado, con mucho hielo.",
          longDescription: "El clásico fernet con cola servido en vaso largo con hielo abundante.",
          image: fernet,
        },
        {
          id: "jugo",
          name: "Jugo de naranja",
          price: 2400,
          shortDescription: "Recién exprimido, natural.",
          longDescription: "Jugo de naranja exprimido en el momento, sin azúcar agregada.",
          image: jugo,
        },
        {
          id: "agua",
          name: "Agua con gas",
          price: 1500,
          shortDescription: "Botella fría con rodaja de limón.",
          longDescription: "Agua mineral con o sin gas, servida bien fría.",
          image: agua,
        },
      ],
    },
  ],
};

export function formatPrice(price: number): string {
  return `${restaurant.currency}${price.toLocaleString("es-AR")}`;
}
