// --- TypographyBuilder Utilities ---
export const POPULAR_FONTS = [
  "Inter",
  "Roboto",
  "Open Sans",
  "Lato",
  "Montserrat",
  "Source Sans Pro",
  "Raleway",
  "Poppins",
  "Nunito",
  "Work Sans",
  "Playfair Display",
  "Merriweather",
  "IBM Plex Sans",
  "DM Sans",
  "Space Grotesk",
  "JetBrains Mono",
  "Fira Code",
  "Crimson Text",
  "Libre Baskerville",
  "Cormorant Garamond",
];

export const SCALE_RATIOS = {
  "Minor Second": 1.067,
  "Major Second": 1.125,
  "Minor Third": 1.2,
  "Major Third": 1.25,
  "Perfect Fourth": 1.333,
  "Augmented Fourth": 1.414,
  "Perfect Fifth": 1.5,
  "Golden Ratio": 1.618,
};

export const LINE_HEIGHT_PRESETS = {
  Tight: {
    xs: 1.2,
    sm: 1.25,
    base: 1.4,
    lg: 1.25,
    xl: 1.2,
    "2xl": 1.15,
    "3xl": 1.1,
    "4xl": 1.05,
    "5xl": 1.0,
  },
  Normal: {
    xs: 1.4,
    sm: 1.5,
    base: 1.6,
    lg: 1.4,
    xl: 1.3,
    "2xl": 1.25,
    "3xl": 1.2,
    "4xl": 1.15,
    "5xl": 1.1,
  },
  Loose: {
    xs: 1.6,
    sm: 1.75,
    base: 1.8,
    lg: 1.6,
    xl: 1.5,
    "2xl": 1.45,
    "3xl": 1.4,
    "4xl": 1.35,
    "5xl": 1.3,
  },
  "Extra Loose": {
    xs: 1.8,
    sm: 2.0,
    base: 2.0,
    lg: 1.8,
    xl: 1.7,
    "2xl": 1.65,
    "3xl": 1.6,
    "4xl": 1.55,
    "5xl": 1.5,
  },
};

export const truncateDecimal = (num: number, places: number = 3): number => {
  return Math.floor(num * Math.pow(10, places)) / Math.pow(10, places);
};

export const pxToRem = (px: number, baseSize: number = 16): number => {
  return truncateDecimal(px / baseSize, 3);
};

export const getSafeMinWeight = (weights: number[]): number => {
  return weights.length > 0 ? Math.min(...weights) : 400;
};

export const getSafeMaxWeight = (weights: number[]): number => {
  return weights.length > 0 ? Math.max(...weights) : 700;
};

export const getSafeWeight = (
  weights: number[],
  targetWeight: number
): number => {
  if (weights.length === 0) return 400;
  if (weights.includes(targetWeight)) return targetWeight;
  return weights.find((w) => w <= targetWeight) || getSafeMinWeight(weights);
};

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


