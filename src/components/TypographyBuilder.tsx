"use client";

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
  analyzeTypographySystem,
  buildTypographyConfigFromPreset,
  buildTypographyScale,
  DEFAULT_TYPOGRAPHY_CONFIG,
  generateTypographyCSS,
  generateTypographyInstallInstructions,
  generateTypographyJSON,
  generateTypographyTailwind,
  generateTypographyVariablesOnly,
  getGoogleFontHrefs,
  getSafeMaxWeight,
  getSafeWeight,
  LINE_HEIGHT_PRESETS,
  POPULAR_FONTS,
  PREVIEW_MODES,
  SCALE_RATIOS,
  TYPOGRAPHY_PRESETS,
  type PreviewMode,
  type SavedTypographyPreset,
  type TypographyConfig,
  type TypographyPreset,
} from "@/lib/typography";

const SAVED_PRESETS_STORAGE_KEY = "typesystem-saved-presets";

const cloneConfig = (config: TypographyConfig): TypographyConfig => ({
  ...config,
  headingFont: {
    ...config.headingFont,
    weights: [...config.headingFont.weights],
  },
  bodyFont: {
    ...config.bodyFont,
    weights: [...config.bodyFont.weights],
  },
  lineHeights: {
    ...config.lineHeights,
  },
});

export function TypographyBuilder() {
  const [config, setConfig] = useState<TypographyConfig>(
    DEFAULT_TYPOGRAPHY_CONFIG
  );
  const [codePreviewOpen, setCodePreviewOpen] = useState(false);
  const [presetName, setPresetName] = useState("");
  const [savedPresets, setSavedPresets] = useState<SavedTypographyPreset[]>([]);
  const [fontLoadState, setFontLoadState] = useState<
    "idle" | "loading" | "ready" | "error"
  >("idle");

  const actualScale = buildTypographyScale(config);
  const previewScale = buildTypographyScale(config, {
    previewMode: config.previewMode,
  });
  const fontHrefs = useMemo(
    () =>
      getGoogleFontHrefs({
        headingFont: config.headingFont,
        bodyFont: config.bodyFont,
        separateFonts: config.separateFonts,
      }),
    [
      config.headingFont,
      config.bodyFont,
      config.separateFonts,
    ]
  );
  const insights = useMemo(
    () => analyzeTypographySystem(config, previewScale, config.previewMode),
    [config, previewScale]
  );
  const cssVariablesOnly = useMemo(
    () => generateTypographyVariablesOnly(config, actualScale),
    [config, actualScale]
  );
  const cssCode = useMemo(
    () => generateTypographyCSS(config, actualScale),
    [config, actualScale]
  );
  const tailwindCode = useMemo(
    () => generateTypographyTailwind(config, actualScale),
    [config, actualScale]
  );
  const jsonCode = useMemo(
    () => generateTypographyJSON(config, actualScale),
    [config, actualScale]
  );
  const installInstructions = useMemo(
    () => generateTypographyInstallInstructions(config),
    [config]
  );
  const activePreviewMode = PREVIEW_MODES[config.previewMode];

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(SAVED_PRESETS_STORAGE_KEY);
      if (!raw) {
        return;
      }

      const parsed = JSON.parse(raw) as SavedTypographyPreset[];
      setSavedPresets(Array.isArray(parsed) ? parsed : []);
    } catch {
      setSavedPresets([]);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(
      SAVED_PRESETS_STORAGE_KEY,
      JSON.stringify(savedPresets)
    );
  }, [savedPresets]);

  useEffect(() => {
    let cancelled = false;

    const loadGoogleFonts = async () => {
      setFontLoadState("loading");

      try {
        document
          .querySelectorAll('link[data-typesystem-font="true"]')
          .forEach((link) => link.remove());

        const results = await Promise.allSettled(
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

        if (cancelled) {
          return;
        }

        if (results.some((result) => result.status === "rejected")) {
          setFontLoadState("error");
          toast.error("One or more fonts failed to load");
          return;
        }

        setFontLoadState("ready");
        toast.success("Fonts loaded successfully");
      } catch {
        if (!cancelled) {
          setFontLoadState("error");
          toast.error("Failed to load fonts");
        }
      }
    };

    loadGoogleFonts();

    return () => {
      cancelled = true;
    };
  }, [fontHrefs]);

  const applyPreset = (preset: TypographyPreset) => {
    setConfig(buildTypographyConfigFromPreset(preset));
  };

  const applyPreviewMode = (previewMode: PreviewMode) => {
    setConfig((prev) => ({
      ...prev,
      previewMode,
    }));
  };

  const applyLineHeightPreset = (preset: string) => {
    if (preset in LINE_HEIGHT_PRESETS) {
      setConfig((prev) => ({
        ...prev,
        lineHeights:
          LINE_HEIGHT_PRESETS[preset as keyof typeof LINE_HEIGHT_PRESETS],
        lineHeightPreset: preset,
        useCustomLineHeights: true,
      }));
    }
  };

  const saveCurrentPreset = () => {
    const name = presetName.trim();
    const label =
      name || `${config.headingFont.fontFamily} / ${config.bodyFont.fontFamily}`;

    const nextPreset: SavedTypographyPreset = {
      id: `${Date.now()}`,
      name: label,
      description: "Saved from the local builder.",
      createdAt: new Date().toISOString(),
      config: cloneConfig(config),
    };

    setSavedPresets((current) => [nextPreset, ...current].slice(0, 12));
    setPresetName("");
    toast.success(`Saved "${label}"`);
  };

  const loadSavedPreset = (preset: SavedTypographyPreset) => {
    setConfig(cloneConfig(preset.config));
    toast.success(`Loaded "${preset.name}"`);
  };

  const deleteSavedPreset = (id: string) => {
    setSavedPresets((current) => current.filter((preset) => preset.id !== id));
    toast.success("Preset deleted");
  };

  return (
    <SidebarProvider>
      <div className="h-screen max-h-screen flex flex-row bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.9),rgba(241,245,249,1))]">
        <div className="flex-shrink-0 w-80 min-w-80 max-w-80 h-full">
          <AppSidebar
            config={config}
            setConfig={setConfig}
            setCodePreviewOpen={setCodePreviewOpen}
            starterPresets={TYPOGRAPHY_PRESETS}
            savedPresets={savedPresets}
            onApplyPreset={applyPreset}
            onApplySavedPreset={loadSavedPreset}
            onDeleteSavedPreset={deleteSavedPreset}
            onSaveCurrentPreset={saveCurrentPreset}
            presetName={presetName}
            setPresetName={setPresetName}
            POPULAR_FONTS={POPULAR_FONTS}
            SCALE_RATIOS={SCALE_RATIOS}
            LINE_HEIGHT_PRESETS={LINE_HEIGHT_PRESETS}
            onApplyLineHeightPreset={applyLineHeightPreset}
            onApplyPreviewMode={applyPreviewMode}
            fontLoadState={fontLoadState}
            insights={insights}
          />
        </div>

        <div className="flex-1 flex flex-col min-w-0">
          <div className="border-b px-4 py-3 bg-white/80 backdrop-blur-sm">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <span className="font-medium">Live Preview</span>
                <Badge variant="secondary" className="text-xs">
                  {actualScale.length} sizes
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {activePreviewMode.label}
                </Badge>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge
                  variant={fontLoadState === "error" ? "destructive" : "secondary"}
                  className="text-xs"
                >
                  Fonts {fontLoadState}
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
                    Shared: {config.headingFont.fontFamily}
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <div className="flex-1 flex min-w-0">
            <div className="w-1/2 border-r min-w-0">
              <div className="p-4 border-b bg-slate-50/80">
                <div className="flex items-center gap-2">
                  <LayoutGrid className="h-4 w-4" />
                  <span className="text-sm font-medium">Type Scale</span>
                </div>
              </div>
              <div className="h-full overflow-y-auto p-6">
                <TypeScaleTable
                  scale={actualScale}
                  headingFont={config.headingFont}
                  bodyFont={config.bodyFont}
                  baseSize={config.baseSize}
                />
              </div>
            </div>

            <WebsitePreview
              scale={previewScale}
              headingFont={config.headingFont}
              bodyFont={config.bodyFont}
              previewMode={config.previewMode}
              previewModeConfig={activePreviewMode}
              insights={insights}
              getSafeMaxWeight={getSafeMaxWeight}
              getSafeWeight={getSafeWeight}
            />
          </div>

          <CodePreviewDialog
            open={codePreviewOpen}
            onOpenChange={setCodePreviewOpen}
            cssCode={cssCode}
            cssVariablesOnlyCode={cssVariablesOnly}
            tailwindCode={tailwindCode}
            jsonCode={jsonCode}
            installInstructions={installInstructions}
          />
        </div>
      </div>
    </SidebarProvider>
  );
}
