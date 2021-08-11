export const COLORS = {
  white: "hsl(0deg, 0%, 100%)",
  gray: {
    100: "hsl(185deg, 5%, 95%)",
    300: "hsl(190deg, 5%, 80%)",
    500: "hsl(196deg, 4%, 60%)",
    700: "hsl(220deg, 5%, 40%)",
    900: "hsl(220deg, 3%, 20%)",
  },
  primary: "hsl(340deg, 65%, 47%)",
  secondary: "hsl(240deg, 60%, 63%)",
};

export enum BREAKPOINTS {
  phoneMax = 550,
  tabletMax = 1100,
  laptopMax = 1500,
}
export const QUERIES = {
  phone: `(max-width: ${BREAKPOINTS.phoneMax / 16}rem)`,
  tablet: `(max-width: ${BREAKPOINTS.tabletMax / 16}rem)`,
  laptop: `(max-width: ${BREAKPOINTS.laptopMax / 16}rem)`,
};

export enum FONTSIZES {
  pageHeadXL = "48px",
  postTitle = "36px",
  pageHead = "20px",
  base = "16px",
}

export enum WEIGHTS {
  normal = 500,
  medium = 600,
  bold = 800,
}

export enum EMOJIS {
  movie = "📽️",
  restaurant = "🍔",
  album = "🎵",
  show = "📺",
  book = "📖",
  event = "",
  shop = "🏬",
  experience = "🛶",
  performance = "🎸",
  play = "🎭",
  pizza = "🍕",
  bagel = "🥯",
  art = "🎨",
  judo = "🥋",
}

export const RATINGS = {
  hate: "🔥💩🔥",
  0: "💩",
  1: "★",
  2: "★★",
  3: "★★★",
  4: "★★★★",
  5: "★★★★★",
};
