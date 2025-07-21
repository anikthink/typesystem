import React, { useState, useEffect } from "react";
import { Eye, LayoutGrid } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "./ui/badge";
import { CodePreviewDialog } from "./CodePreviewDialog";
import { AppSidebar } from "./AppSidebar";
import { SidebarProvider } from "./ui/sidebar";
import { TypeScaleTable } from "./TypeScaleTable";
import { WebsitePreview } from "./WebsitePreview";

interface TypeScale {
  name: string;
  size: number;
  lineHeight: number;
  weight: number;
  isHeading?: boolean;
}

interface FontConfig {
  fontFamily: string;
  weights: number[];
  letterSpacing: number;
}

interface LineHeightConfig {
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
  scale: TypeScale[];
  separateFonts: boolean;
  lineHeights: LineHeightConfig;
  useCustomLineHeights: boolean;
  lineHeightPreset: string;
}

const POPULAR_FONTS = [
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

const SCALE_RATIOS = {
  "Minor Second": 1.067,
  "Major Second": 1.125,
  "Minor Third": 1.2,
  "Major Third": 1.25,
  "Perfect Fourth": 1.333,
  "Augmented Fourth": 1.414,
  "Perfect Fifth": 1.5,
  "Golden Ratio": 1.618,
};

const LINE_HEIGHT_PRESETS = {
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

// Helper function to truncate decimals to 3 places
const truncateDecimal = (num: number, places: number = 3): number => {
  return Math.floor(num * Math.pow(10, places)) / Math.pow(10, places);
};

// Helper function to convert px to rem
const pxToRem = (px: number, baseSize: number = 16): number => {
  return truncateDecimal(px / baseSize, 3);
};

// Helper functions to safely get min/max weights with fallbacks
const getSafeMinWeight = (weights: number[]): number => {
  return weights.length > 0 ? Math.min(...weights) : 400;
};

const getSafeMaxWeight = (weights: number[]): number => {
  return weights.length > 0 ? Math.max(...weights) : 700;
};

const getSafeWeight = (weights: number[], targetWeight: number): number => {
  if (weights.length === 0) return 400;
  if (weights.includes(targetWeight)) return targetWeight;
  return weights.find((w) => w <= targetWeight) || getSafeMinWeight(weights);
};

export function TypographyBuilder() {
  const [config, setConfig] = useState<TypographyConfig>({
    headingFont: {
      fontFamily: "Libre Baskerville",
      weights: [400, 700], // Standard weights
      letterSpacing: -0.02,
    },
    bodyFont: {
      fontFamily: "Inter",
      weights: [400, 500], // Standard weights
      letterSpacing: 0,
    },
    baseSize: 16,
    scaleRatio: 1.25,
    scale: [],
    separateFonts: true, // Default to separate fonts
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
  });

  const [customHeadingFont, setCustomHeadingFont] = useState("");
  const [customBodyFont, setCustomBodyFont] = useState("");
  const [loading, setLoading] = useState(false);
  const [codePreviewOpen, setCodePreviewOpen] = useState(false);

  const generateScale = () => {
    const scales = [
      { name: "xs", multiplier: 0.75, isHeading: false },
      { name: "sm", multiplier: 0.875, isHeading: false },
      { name: "base", multiplier: 1, isHeading: false },
      { name: "lg", multiplier: config.scaleRatio, isHeading: true },
      {
        name: "xl",
        multiplier: Math.pow(config.scaleRatio, 2),
        isHeading: true,
      },
      {
        name: "2xl",
        multiplier: Math.pow(config.scaleRatio, 3),
        isHeading: true,
      },
      {
        name: "3xl",
        multiplier: Math.pow(config.scaleRatio, 4),
        isHeading: true,
      },
      {
        name: "4xl",
        multiplier: Math.pow(config.scaleRatio, 5),
        isHeading: true,
      },
      {
        name: "5xl",
        multiplier: Math.pow(config.scaleRatio, 6),
        isHeading: true,
      },
    ];

    const newScale = scales.map((scale) => {
      const font = scale.isHeading ? config.headingFont : config.bodyFont;
      const lineHeight = config.useCustomLineHeights
        ? config.lineHeights[scale.name as keyof LineHeightConfig]
        : scale.multiplier < 1
        ? 1.5
        : Math.max(1.1, 1.6 - scale.multiplier * 0.15);

      return {
        name: scale.name,
        size: truncateDecimal(config.baseSize * scale.multiplier, 3),
        lineHeight: truncateDecimal(lineHeight, 3),
        weight:
          scale.multiplier > 2
            ? getSafeMaxWeight(font.weights)
            : getSafeMinWeight(font.weights),
        isHeading: scale.isHeading,
      };
    });

    setConfig((prev) => ({ ...prev, scale: newScale }));
  };

  const loadGoogleFonts = async () => {
    setLoading(true);
    try {
      const existingLinks = document.querySelectorAll(
        'link[href*="fonts.googleapis.com"]'
      );
      existingLinks.forEach((link) => link.remove());

      const fontsToLoad = config.separateFonts
        ? [config.headingFont, config.bodyFont]
        : [config.headingFont];

      const uniqueFonts = Array.from(
        new Set(fontsToLoad.map((f) => f.fontFamily))
      );

      for (const fontFamily of uniqueFonts) {
        const font = fontsToLoad.find((f) => f.fontFamily === fontFamily);
        if (font && font.weights.length > 0) {
          const link = document.createElement("link");
          link.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(
            /\s+/g,
            "+"
          )}:wght@${font.weights.join(";")}&display=swap`;
          link.rel = "stylesheet";
          document.head.appendChild(link);
        }
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Fonts loaded successfully");
    } catch {
      toast.error("Failed to load fonts");
    } finally {
      setLoading(false);
    }
  };

  const generateCSS = () => {
    const headingWeights = config.headingFont.weights;
    const bodyWeights = config.bodyFont.weights;
    const allWeights = Array.from(
      new Set([...headingWeights, ...bodyWeights])
    ).sort((a, b) => a - b);

    // Ensure we have at least some weights
    if (allWeights.length === 0) {
      allWeights.push(400, 700);
    }

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
${config.scale
  .map(
    (item) =>
      `  --font-size-${item.name}: ${pxToRem(item.size, config.baseSize)}rem;`
  )
  .join("\n")}
  
  /* Line heights */
${config.scale
  .map(
    (item) =>
      `  --line-height-${item.name}: ${truncateDecimal(item.lineHeight, 3)};`
  )
  .join("\n")}
  
  /* Font weights */
${allWeights
  .map((weight) => `  --font-weight-${weight}: ${weight};`)
  .join("\n")}
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

${config.scale
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
  font-weight: var(--font-weight-${getSafeMaxWeight(headingWeights)});
  letter-spacing: var(--letter-spacing-heading);
}

h2 { 
  font-family: var(--font-family-heading);
  font-size: var(--font-size-3xl);
  line-height: var(--line-height-3xl);
  font-weight: var(--font-weight-${getSafeWeight(headingWeights, 600)});
  letter-spacing: var(--letter-spacing-heading);
}

h3 { 
  font-family: var(--font-family-heading);
  font-size: var(--font-size-2xl);
  line-height: var(--line-height-2xl);
  font-weight: var(--font-weight-${getSafeWeight(headingWeights, 600)});
  letter-spacing: var(--letter-spacing-heading);
}

p, body { 
  font-family: var(--font-family-body);
  font-size: var(--font-size-base);
  line-height: var(--line-height-base);
  font-weight: var(--font-weight-${getSafeMinWeight(bodyWeights)});
  letter-spacing: var(--letter-spacing-body);
}`;
  };

  const generateTailwind = () => {
    const headingWeights = config.headingFont.weights;
    const bodyWeights = config.bodyFont.weights;
    const allWeights = Array.from(
      new Set([...headingWeights, ...bodyWeights])
    ).sort((a, b) => a - b);

    // Ensure we have at least some weights
    if (allWeights.length === 0) {
      allWeights.push(400, 700);
    }

    return `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        'heading': ['${config.headingFont.fontFamily}', 'sans-serif'],
        'body': ['${config.bodyFont.fontFamily}', 'sans-serif'],
      },
      fontSize: {
${config.scale
  .map(
    (item) =>
      `        '${item.name}': ['${pxToRem(
        item.size,
        config.baseSize
      )}rem', { lineHeight: '${truncateDecimal(item.lineHeight, 3)}' }],`
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

  const applyLineHeightPreset = (preset: string) => {
    if (preset in LINE_HEIGHT_PRESETS) {
      setConfig((prev) => ({
        ...prev,
        lineHeights:
          LINE_HEIGHT_PRESETS[preset as keyof typeof LINE_HEIGHT_PRESETS],
        lineHeightPreset: preset,
      }));
    }
  };

  useEffect(() => {
    generateScale();
  }, [
    config.baseSize,
    config.scaleRatio,
    config.headingFont.weights,
    config.bodyFont.weights,
    config.useCustomLineHeights,
    config.lineHeights,
  ]);

  useEffect(() => {
    loadGoogleFonts();
  }, [
    config.headingFont.fontFamily,
    config.bodyFont.fontFamily,
    config.headingFont.weights,
    config.bodyFont.weights,
  ]);

  return (
    <SidebarProvider>
      <div className="h-screen max-h-screen flex flex-row">
        {/* Sidebar and Main Content as siblings in a flex row */}
        <div className="flex-shrink-0 w-80 min-w-80 max-w-80 h-full">
          <AppSidebar
            config={config}
            setConfig={setConfig}
            customHeadingFont={customHeadingFont}
            setCustomHeadingFont={setCustomHeadingFont}
            customBodyFont={customBodyFont}
            setCustomBodyFont={setCustomBodyFont}
            loading={loading}
            setCodePreviewOpen={setCodePreviewOpen}
            POPULAR_FONTS={POPULAR_FONTS}
            SCALE_RATIOS={SCALE_RATIOS}
            LINE_HEIGHT_PRESETS={LINE_HEIGHT_PRESETS}
            truncateDecimal={truncateDecimal}
            applyLineHeightPreset={applyLineHeightPreset}
          />
        </div>
        <div className="flex-1 flex flex-col min-w-0">
          {/* Preview Header */}
          <div className="border-b p-4 bg-card">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <span className="font-medium">Live Preview</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {config.scale.length} sizes
                </Badge>
                {config.separateFonts ? (
                  <>
                    <Badge variant="secondary" className="text-xs">
                      H: {config.headingFont.fontFamily}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      B: {config.bodyFont.fontFamily}
                    </Badge>
                  </>
                ) : (
                  <Badge variant="secondary" className="text-xs">
                    {config.headingFont.fontFamily}
                  </Badge>
                )}
              </div>
            </div>
          </div>
          {/* Split Screen Content */}
          <div className="flex-1 flex min-w-0">
            {/* Left Panel - Type Scale Table */}
            <div className="w-1/2 border-r min-w-0">
              <div className="p-4 border-b bg-muted/20">
                <div className="flex items-center gap-2">
                  <LayoutGrid className="h-4 w-4" />
                  <span className="text-sm font-medium">Type Scale</span>
                </div>
              </div>
              <div className="h-full overflow-y-auto p-6">
                <TypeScaleTable
                  scale={config.scale}
                  headingFont={config.headingFont}
                  bodyFont={config.bodyFont}
                  baseSize={config.baseSize}
                  truncateDecimal={truncateDecimal}
                  pxToRem={pxToRem}
                />
              </div>
            </div>
            {/* Right Panel - Website Preview */}
            <WebsitePreview
              scale={config.scale}
              headingFont={config.headingFont}
              bodyFont={config.bodyFont}
              getSafeMaxWeight={getSafeMaxWeight}
              getSafeWeight={getSafeWeight}
            />
          </div>
          <CodePreviewDialog
            open={codePreviewOpen}
            onOpenChange={setCodePreviewOpen}
            cssCode={generateCSS()}
            tailwindCode={generateTailwind()}
          />
        </div>
      </div>
    </SidebarProvider>
  );
}
