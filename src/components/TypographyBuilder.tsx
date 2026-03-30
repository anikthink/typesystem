import React, { useEffect, useMemo, useState } from "react";
import { Eye, LayoutGrid } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "./ui/badge";
import { CodePreviewDialog } from "./CodePreviewDialog";
import { AppSidebar } from "./AppSidebar";
import { SidebarProvider } from "./ui/sidebar";
import { TypeScaleTable } from "./TypeScaleTable";
import { WebsitePreview } from "./WebsitePreview";
import {
  buildTypographyScale,
  generateTypographyCSS,
  generateTypographyTailwind,
  getGoogleFontHrefs,
  getSafeMaxWeight,
  getSafeWeight,
  LINE_HEIGHT_PRESETS,
  POPULAR_FONTS,
  SCALE_RATIOS,
  type TypographyConfig,
} from "@/lib/typography";

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
  const [codePreviewOpen, setCodePreviewOpen] = useState(false);
  const scale = buildTypographyScale(config);
  const headingFontFamily = config.headingFont.fontFamily;
  const headingFontWeights = config.headingFont.weights;
  const headingLetterSpacing = config.headingFont.letterSpacing;
  const bodyFontFamily = config.bodyFont.fontFamily;
  const bodyFontWeights = config.bodyFont.weights;
  const bodyLetterSpacing = config.bodyFont.letterSpacing;
  const separateFonts = config.separateFonts;
  const fontHrefs = useMemo(
    () =>
      getGoogleFontHrefs({
        headingFont: {
          fontFamily: headingFontFamily,
          weights: headingFontWeights,
          letterSpacing: headingLetterSpacing,
        },
        bodyFont: {
          fontFamily: bodyFontFamily,
          weights: bodyFontWeights,
          letterSpacing: bodyLetterSpacing,
        },
        separateFonts,
      }),
    [
      headingFontFamily,
      headingFontWeights,
      headingLetterSpacing,
      bodyFontFamily,
      bodyFontWeights,
      bodyLetterSpacing,
      separateFonts,
    ]
  );

  useEffect(() => {
    let cancelled = false;

    const loadGoogleFonts = async () => {
      try {
        document
          .querySelectorAll('link[data-typesystem-font="true"]')
          .forEach((link) => link.remove());

        await Promise.all(
          fontHrefs.map(
            (href) =>
              new Promise<void>((resolve, reject) => {
                const link = document.createElement("link");
                link.href = href;
                link.rel = "stylesheet";
                link.dataset.typesystemFont = "true";
                link.onload = () => resolve();
                link.onerror = () => reject(new Error(`Failed to load ${href}`));
                document.head.appendChild(link);
              })
          )
        );

        if (!cancelled) {
          toast.success("Fonts loaded successfully");
        }
      } catch {
        if (!cancelled) {
          toast.error("Failed to load fonts");
        }
      }
    };

    loadGoogleFonts();

    return () => {
      cancelled = true;
    };
  }, [
    fontHrefs,
  ]);

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

  const cssCode = useMemo(
    () => generateTypographyCSS(config, scale),
    [config, scale]
  );

  const tailwindCode = useMemo(
    () => generateTypographyTailwind(config, scale),
    [config, scale]
  );

  return (
    <SidebarProvider>
      <div className="h-screen max-h-screen flex flex-row">
        {/* Sidebar and Main Content as siblings in a flex row */}
        <div className="flex-shrink-0 w-80 min-w-80 max-w-80 h-full">
          <AppSidebar
            config={config}
            setConfig={setConfig}
            setCodePreviewOpen={setCodePreviewOpen}
            POPULAR_FONTS={POPULAR_FONTS}
            SCALE_RATIOS={SCALE_RATIOS}
            LINE_HEIGHT_PRESETS={LINE_HEIGHT_PRESETS}
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
                  {scale.length} sizes
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
                  <>
                    <Badge variant="secondary" className="text-xs">
                      Shared font
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {config.headingFont.fontFamily}
                    </Badge>
                  </>
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
                  scale={scale}
                  headingFont={config.headingFont}
                  bodyFont={config.bodyFont}
                  baseSize={config.baseSize}
                />
              </div>
            </div>
            {/* Right Panel - Website Preview */}
            <WebsitePreview
              scale={scale}
              headingFont={config.headingFont}
              bodyFont={config.bodyFont}
              getSafeMaxWeight={getSafeMaxWeight}
              getSafeWeight={getSafeWeight}
            />
          </div>
          <CodePreviewDialog
            open={codePreviewOpen}
            onOpenChange={setCodePreviewOpen}
            cssCode={cssCode}
            tailwindCode={tailwindCode}
          />
        </div>
      </div>
    </SidebarProvider>
  );
}
