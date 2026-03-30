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

export type PreviewMode = "desktop" | "tablet" | "mobile";

export interface PreviewModeConfig {
  label: string;
  width: number;
  baseSizeMultiplier: number;
  scaleRatioMultiplier: number;
  cplWidth: number;
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
  previewMode: PreviewMode;
}

export interface TypographyPreset {
  id: string;
  name: string;
  description: string;
  config: TypographyConfig;
}

export interface SavedTypographyPreset extends TypographyPreset {
  createdAt: string;
}

export interface TypographyInsights {
  cpl: number;
  bodySize: number;
  previewWidth: number;
  warnings: string[];
  recommendations: string[];
}

export const COMMON_FONT_WEIGHTS = [100, 200, 300, 400, 500, 600, 700, 800, 900];

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

export const PREVIEW_MODES: Record<PreviewMode, PreviewModeConfig> = {
  desktop: {
    label: "Desktop",
    width: 1200,
    baseSizeMultiplier: 1,
    scaleRatioMultiplier: 1,
    cplWidth: 1120,
  },
  tablet: {
    label: "Tablet",
    width: 860,
    baseSizeMultiplier: 0.965,
    scaleRatioMultiplier: 0.98,
    cplWidth: 800,
  },
  mobile: {
    label: "Mobile",
    width: 390,
    baseSizeMultiplier: 0.92,
    scaleRatioMultiplier: 0.95,
    cplWidth: 360,
  },
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
} as const;

export const DEFAULT_TYPOGRAPHY_CONFIG: TypographyConfig = {
  headingFont: {
    fontFamily: "Libre Baskerville",
    weights: [400, 700],
    letterSpacing: -0.02,
  },
  bodyFont: {
    fontFamily: "Inter",
    weights: [400, 500],
    letterSpacing: 0,
  },
  baseSize: 16,
  scaleRatio: 1.25,
  separateFonts: true,
  lineHeights: {
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
  useCustomLineHeights: false,
  lineHeightPreset: "Normal",
  previewMode: "desktop",
};

export const TYPOGRAPHY_PRESETS: TypographyPreset[] = [
  {
    id: "editorial",
    name: "Editorial",
    description: "High-contrast serif headings with a clean reading face.",
    config: {
      ...DEFAULT_TYPOGRAPHY_CONFIG,
      headingFont: {
        fontFamily: "Libre Baskerville",
        weights: [400, 700],
        letterSpacing: -0.02,
      },
      bodyFont: {
        fontFamily: "Inter",
        weights: [400, 500],
        letterSpacing: 0,
      },
      previewMode: "tablet",
    },
  },
  {
    id: "product-ui",
    name: "Product UI",
    description: "Balanced, modern sans system for interfaces and dashboards.",
    config: {
      ...DEFAULT_TYPOGRAPHY_CONFIG,
      headingFont: {
        fontFamily: "Space Grotesk",
        weights: [400, 500, 700],
        letterSpacing: -0.01,
      },
      bodyFont: {
        fontFamily: "Inter",
        weights: [400, 500, 600],
        letterSpacing: 0,
      },
      scaleRatio: 1.2,
      previewMode: "desktop",
    },
  },
  {
    id: "compact-code",
    name: "Compact Code",
    description: "Tighter ratios for dense technical UIs and docs.",
    config: {
      ...DEFAULT_TYPOGRAPHY_CONFIG,
      headingFont: {
        fontFamily: "IBM Plex Sans",
        weights: [400, 500, 600],
        letterSpacing: -0.01,
      },
      bodyFont: {
        fontFamily: "IBM Plex Sans",
        weights: [400, 500],
        letterSpacing: 0,
      },
      baseSize: 15,
      scaleRatio: 1.125,
      separateFonts: false,
      useCustomLineHeights: true,
      lineHeightPreset: "Tight",
      previewMode: "mobile",
    },
  },
  {
    id: "display-ledger",
    name: "Display Ledger",
    description: "A more expressive pair for lifestyle, publishing, or brand pages.",
    config: {
      ...DEFAULT_TYPOGRAPHY_CONFIG,
      headingFont: {
        fontFamily: "Cormorant Garamond",
        weights: [400, 500, 600, 700],
        letterSpacing: -0.015,
      },
      bodyFont: {
        fontFamily: "Source Sans Pro",
        weights: [400, 600],
        letterSpacing: 0,
      },
      baseSize: 17,
      scaleRatio: 1.333,
      previewMode: "tablet",
    },
  },
];

export interface TypographyScaleOptions {
  previewMode?: PreviewMode;
}

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

const getAllWeights = (config: Pick<TypographyConfig, "headingFont" | "bodyFont">): number[] => {
  const allWeights = Array.from(
    new Set([...config.headingFont.weights, ...config.bodyFont.weights])
  ).sort((a, b) => a - b);

  if (allWeights.length === 0) {
    allWeights.push(400, 700);
  }

  return allWeights;
};

export const buildTypographyScale = (
  config: TypographyConfig,
  options?: TypographyScaleOptions
): TypeScale[] => {
  const previewMode = options?.previewMode;
  const mode = previewMode ? PREVIEW_MODES[previewMode] : null;
  const baseSize = config.baseSize * (mode?.baseSizeMultiplier ?? 1);
  const scaleRatio = config.scaleRatio * (mode?.scaleRatioMultiplier ?? 1);

  return getScaleSteps(scaleRatio).map((step) => {
    const font = step.isHeading ? config.headingFont : config.bodyFont;
    const lineHeight = config.useCustomLineHeights
      ? config.lineHeights[step.name as keyof LineHeightConfig]
      : step.multiplier < 1
      ? 1.5
      : Math.max(1.1, 1.6 - step.multiplier * 0.15);

    return {
      name: step.name,
      size: truncateDecimal(baseSize * step.multiplier, 3),
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
  const uniqueFonts = Array.from(
    new Set(fontsToLoad.map((font) => font.fontFamily))
  );

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

export const generateTypographyVariablesOnly = (
  config: TypographyConfig,
  scale: TypeScale[]
): string => {
  const allWeights = getAllWeights(config);

  return `:root {
  --font-family-heading: "${config.headingFont.fontFamily}", sans-serif;
  --font-family-body: "${config.bodyFont.fontFamily}", sans-serif;
  --font-size-base: ${pxToRem(config.baseSize, config.baseSize)}rem;
  --scale-ratio: ${config.scaleRatio};
  --letter-spacing-heading: ${truncateDecimal(
    config.headingFont.letterSpacing,
    3
  )}em;
  --letter-spacing-body: ${truncateDecimal(config.bodyFont.letterSpacing, 3)}em;
${scale
  .map(
    (item) =>
      `  --font-size-${item.name}: ${pxToRem(item.size, config.baseSize)}rem;`
  )
  .join("\n")}
${scale
  .map(
    (item) =>
      `  --line-height-${item.name}: ${truncateDecimal(item.lineHeight, 3)};`
  )
  .join("\n")}
${allWeights.map((weight) => `  --font-weight-${weight}: ${weight};`).join("\n")}
}`;
};

export const generateTypographyCSS = (
  config: TypographyConfig,
  scale: TypeScale[]
): string => {
  const allWeights = getAllWeights(config);
  const variablesOnly = generateTypographyVariablesOnly(config, scale);

  return `/* Typography System - ${config.separateFonts ? "Dual Font" : "Single Font"} */
${variablesOnly}

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

export const generateTypographyJSON = (
  config: TypographyConfig,
  scale: TypeScale[]
): string => {
  const payload = {
    fontFamilies: {
      heading: config.headingFont.fontFamily,
      body: config.bodyFont.fontFamily,
    },
    baseSize: config.baseSize,
    scaleRatio: config.scaleRatio,
    separateFonts: config.separateFonts,
    lineHeights: config.lineHeights,
    useCustomLineHeights: config.useCustomLineHeights,
    lineHeightPreset: config.lineHeightPreset,
    scale,
  };

  return JSON.stringify(payload, null, 2);
};

export const generateTypographyInstallInstructions = (
  config: TypographyConfig
): string => {
  const fonts = config.separateFonts
    ? [config.headingFont, config.bodyFont]
    : [config.headingFont];

  return `Typography Setup

1. Add the CSS variables to your global stylesheet.
2. Paste the Tailwind theme extension into your Tailwind config.
3. Load these Google Fonts:
${fonts
  .map(
    (font) =>
      `   - ${font.fontFamily}: weights ${font.weights.join(", ")}`
  )
  .join("\n")}
4. Apply \`.font-heading\`, \`.font-body\`, and \`.text-*\` utilities in your components.

Tip: if you only want the raw variables, use the CSS Variables Only tab.`;
};

export const analyzeTypographySystem = (
  config: TypographyConfig,
  scale: TypeScale[],
  previewMode: PreviewMode
): TypographyInsights => {
  const preview = PREVIEW_MODES[previewMode];
  const body = scale.find((item) => item.name === "base") ?? scale[2];
  const previewWidth = preview.cplWidth;
  const estimatedCharWidth = body.size * 0.52;
  const cpl = Math.max(1, Math.round(previewWidth / estimatedCharWidth));
  const warnings: string[] = [];
  const recommendations: string[] = [];

  if (cpl < 45) {
    warnings.push("Line length is quite short for the chosen preview mode.");
    recommendations.push("Reduce the base size or widen the preview canvas.");
  } else if (cpl > 90) {
    warnings.push("Line length is long and may hurt readability.");
    recommendations.push("Increase the base size or tighten the preview width.");
  }

  if (body.lineHeight < 1.45) {
    warnings.push("Body line height is tight for extended reading.");
    recommendations.push("Increase base line height to around 1.5 or 1.6.");
  }

  if (body.lineHeight > 1.85) {
    warnings.push("Body line height is loose and may feel airy.");
    recommendations.push("Tighten body line height slightly.");
  }

  if (Math.abs(config.headingFont.letterSpacing) > 0.08) {
    warnings.push("Heading letter spacing is aggressive.");
  }

  if (Math.abs(config.bodyFont.letterSpacing) > 0.05) {
    warnings.push("Body letter spacing may affect readability.");
  }

  if (config.scaleRatio < 1.1 || config.scaleRatio > 1.5) {
    warnings.push("Scale ratio is outside the most readable middle ground.");
    recommendations.push("Try a ratio between 1.125 and 1.333.");
  }

  return {
    cpl,
    bodySize: body.size,
    previewWidth,
    warnings,
    recommendations,
  };
};

export const buildTypographyConfigFromPreset = (
  preset: TypographyPreset
): TypographyConfig => ({
  ...preset.config,
  headingFont: {
    ...preset.config.headingFont,
    weights: [...preset.config.headingFont.weights],
  },
  bodyFont: {
    ...preset.config.bodyFont,
    weights: [...preset.config.bodyFont.weights],
  },
  lineHeights: {
    ...preset.config.lineHeights,
  },
});
