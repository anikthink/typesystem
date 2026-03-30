export interface TypeScale {
  name: string;
  size: number;
  lineHeight: number;
  weight: number;
  isHeading?: boolean;
}

export interface FontConfig {
  fontFamily: string;
  weights: number[];
  letterSpacing: number;
}

export interface LineHeightConfig {
  xs: number;
  sm: number;
  base: number;
  lg: number;
  xl: number;
  "2xl": number;
  "3xl": number;
  "4xl": number;
  "5xl": number;
}

export interface TypographyConfig {
  headingFont: FontConfig;
  bodyFont: FontConfig;
  baseSize: number;
  scaleRatio: number;
  separateFonts: boolean;
  lineHeights: LineHeightConfig;
  useCustomLineHeights: boolean;
  lineHeightPreset: string;
}

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
  if (weights.length === 0) {
    return 400;
  }

  if (weights.includes(targetWeight)) {
    return targetWeight;
  }

  return weights.find((weight) => weight <= targetWeight) || getSafeMinWeight(weights);
};

const getScaleSteps = (scaleRatio: number) => [
  { name: "xs", multiplier: 0.75, isHeading: false },
  { name: "sm", multiplier: 0.875, isHeading: false },
  { name: "base", multiplier: 1, isHeading: false },
  { name: "lg", multiplier: scaleRatio, isHeading: true },
  { name: "xl", multiplier: Math.pow(scaleRatio, 2), isHeading: true },
  { name: "2xl", multiplier: Math.pow(scaleRatio, 3), isHeading: true },
  { name: "3xl", multiplier: Math.pow(scaleRatio, 4), isHeading: true },
  { name: "4xl", multiplier: Math.pow(scaleRatio, 5), isHeading: true },
  { name: "5xl", multiplier: Math.pow(scaleRatio, 6), isHeading: true },
];

const getAllWeights = (config: TypographyConfig): number[] => {
  const allWeights = Array.from(
    new Set([...config.headingFont.weights, ...config.bodyFont.weights])
  ).sort((a, b) => a - b);

  if (allWeights.length === 0) {
    allWeights.push(400, 700);
  }

  return allWeights;
};

export const buildTypographyScale = (config: TypographyConfig): TypeScale[] => {
  return getScaleSteps(config.scaleRatio).map((step) => {
    const font = step.isHeading ? config.headingFont : config.bodyFont;
    const lineHeight = config.useCustomLineHeights
      ? config.lineHeights[step.name as keyof LineHeightConfig]
      : step.multiplier < 1
      ? 1.5
      : Math.max(1.1, 1.6 - step.multiplier * 0.15);

    return {
      name: step.name,
      size: truncateDecimal(config.baseSize * step.multiplier, 3),
      lineHeight: truncateDecimal(lineHeight, 3),
      weight:
        step.multiplier > 2
          ? getSafeMaxWeight(font.weights)
          : getSafeMinWeight(font.weights),
      isHeading: step.isHeading,
    };
  });
};

export const getGoogleFontHrefs = ({
  headingFont,
  bodyFont,
  separateFonts,
}: Pick<TypographyConfig, "headingFont" | "bodyFont" | "separateFonts">): string[] => {
  const fontsToLoad = separateFonts ? [headingFont, bodyFont] : [headingFont];
  const uniqueFonts = Array.from(new Set(fontsToLoad.map((font) => font.fontFamily)));

  return uniqueFonts.flatMap((fontFamily) => {
    const font = fontsToLoad.find((item) => item.fontFamily === fontFamily);

    if (!font || font.weights.length === 0) {
      return [];
    }

    return [
      `https://fonts.googleapis.com/css2?family=${fontFamily.replace(
        /\s+/g,
        "+"
      )}:wght@${font.weights.join(";")}&display=swap`,
    ];
  });
};

export const generateTypographyCSS = (
  config: TypographyConfig,
  scale: TypeScale[]
): string => {
  const allWeights = getAllWeights(config);

  return `/* Typography System - ${
    config.separateFonts ? "Dual Font" : "Single Font"
  } */
:root {
  /* Font families */
  --font-family-heading: "${config.headingFont.fontFamily}", sans-serif;
  --font-family-body: "${config.bodyFont.fontFamily}", sans-serif;
  
  /* Base configuration */
  --font-size-base: ${pxToRem(config.baseSize, config.baseSize)}rem;
  --scale-ratio: ${config.scaleRatio};
  
  /* Letter spacing */
  --letter-spacing-heading: ${truncateDecimal(
    config.headingFont.letterSpacing,
    3
  )}em;
  --letter-spacing-body: ${truncateDecimal(config.bodyFont.letterSpacing, 3)}em;
  
  /* Font sizes */
${scale
  .map(
    (item) =>
      `  --font-size-${item.name}: ${pxToRem(item.size, config.baseSize)}rem;`
  )
  .join("\n")}
  
  /* Line heights */
${scale
  .map(
    (item) =>
      `  --line-height-${item.name}: ${truncateDecimal(item.lineHeight, 3)};`
  )
  .join("\n")}
  
  /* Font weights */
${allWeights.map((weight) => `  --font-weight-${weight}: ${weight};`).join("\n")}
}

/* Typography utility classes */
.font-heading { 
  font-family: var(--font-family-heading); 
  letter-spacing: var(--letter-spacing-heading);
}

.font-body { 
  font-family: var(--font-family-body); 
  letter-spacing: var(--letter-spacing-body);
}

${scale
  .map(
    (item) => `.text-${item.name} {
  font-size: var(--font-size-${item.name});
  line-height: var(--line-height-${item.name});
}`
  )
  .join("\n\n")}

${allWeights
  .map(
    (weight) => `.font-${weight} { font-weight: var(--font-weight-${weight}); }`
  )
  .join("\n")}

/* Semantic heading styles */
h1 { 
  font-family: var(--font-family-heading);
  font-size: var(--font-size-4xl);
  line-height: var(--line-height-4xl);
  font-weight: var(--font-weight-${getSafeMaxWeight(config.headingFont.weights)});
  letter-spacing: var(--letter-spacing-heading);
}

h2 { 
  font-family: var(--font-family-heading);
  font-size: var(--font-size-3xl);
  line-height: var(--line-height-3xl);
  font-weight: var(--font-weight-${getSafeWeight(config.headingFont.weights, 600)});
  letter-spacing: var(--letter-spacing-heading);
}

h3 { 
  font-family: var(--font-family-heading);
  font-size: var(--font-size-2xl);
  line-height: var(--line-height-2xl);
  font-weight: var(--font-weight-${getSafeWeight(config.headingFont.weights, 600)});
  letter-spacing: var(--letter-spacing-heading);
}

p, body { 
  font-family: var(--font-family-body);
  font-size: var(--font-size-base);
  line-height: var(--line-height-base);
  font-weight: var(--font-weight-${getSafeMinWeight(config.bodyFont.weights)});
  letter-spacing: var(--letter-spacing-body);
}`;
};

export const generateTypographyTailwind = (
  config: TypographyConfig,
  scale: TypeScale[]
): string => {
  const allWeights = getAllWeights(config);

  return `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        'heading': ['${config.headingFont.fontFamily}', 'sans-serif'],
        'body': ['${config.bodyFont.fontFamily}', 'sans-serif'],
      },
      fontSize: {
${scale
  .map(
    (item) =>
      `        '${item.name}': ['${pxToRem(item.size, config.baseSize)}rem', { lineHeight: '${truncateDecimal(item.lineHeight, 3)}' }],`
  )
  .join("\n")}
      },
      fontWeight: {
${allWeights.map((weight) => `        '${weight}': '${weight}',`).join("\n")}
      },
      letterSpacing: {
        'heading': '${truncateDecimal(config.headingFont.letterSpacing, 3)}em',
        'body': '${truncateDecimal(config.bodyFont.letterSpacing, 3)}em',
      }
    }
  }
}`;
};
