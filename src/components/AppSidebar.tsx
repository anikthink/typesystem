import React, { Dispatch, SetStateAction } from "react";
import {
  Type,
  AlignLeft,
  Settings2,
  LineChart,
  Code,
  MoveHorizontal,
  Sparkles,
  TabletSmartphone,
  LaptopMinimal,
  Trash2,
  Save,
  WandSparkles,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarSeparator,
} from "./ui/sidebar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import type {
  LineHeightConfig,
  PreviewMode,
  PreviewModeConfig,
  SavedTypographyPreset,
  TypographyConfig,
  TypographyInsights,
  TypographyPreset,
} from "@/lib/typography";
import {
  COMMON_FONT_WEIGHTS,
  PREVIEW_MODES,
  truncateDecimal,
} from "@/lib/typography";

interface SidebarProps {
  config: TypographyConfig;
  setConfig: Dispatch<SetStateAction<TypographyConfig>>;
  setCodePreviewOpen: (v: boolean) => void;
  starterPresets: TypographyPreset[];
  savedPresets: SavedTypographyPreset[];
  onApplyPreset: (preset: TypographyPreset) => void;
  onApplySavedPreset: (preset: SavedTypographyPreset) => void;
  onDeleteSavedPreset: (id: string) => void;
  onSaveCurrentPreset: () => void;
  presetName: string;
  setPresetName: (value: string) => void;
  POPULAR_FONTS: string[];
  SCALE_RATIOS: Record<string, number>;
  LINE_HEIGHT_PRESETS: Record<string, LineHeightConfig>;
  onApplyLineHeightPreset: (preset: string) => void;
  onApplyPreviewMode: (mode: PreviewMode) => void;
  fontLoadState: "idle" | "loading" | "ready" | "error";
  insights: TypographyInsights;
}

const weightLabel = (weight: number) => `${weight}`;

const presetIcon = (id: string) => {
  switch (id) {
    case "editorial":
      return <WandSparkles className="h-4 w-4" />;
    case "product-ui":
      return <LaptopMinimal className="h-4 w-4" />;
    case "compact-code":
      return <Sparkles className="h-4 w-4" />;
    default:
      return <TabletSmartphone className="h-4 w-4" />;
  }
};

export function AppSidebar({
  config,
  setConfig,
  setCodePreviewOpen,
  starterPresets,
  savedPresets,
  onApplyPreset,
  onApplySavedPreset,
  onDeleteSavedPreset,
  onSaveCurrentPreset,
  presetName,
  setPresetName,
  POPULAR_FONTS,
  SCALE_RATIOS,
  LINE_HEIGHT_PRESETS,
  onApplyLineHeightPreset,
  onApplyPreviewMode,
  fontLoadState,
  insights,
}: SidebarProps) {
  const toggleWeight = (
    key: "headingFont" | "bodyFont",
    weight: number
  ) => {
    setConfig((prev) => {
      const current = prev[key].weights;
      const nextWeights = current.includes(weight)
        ? current.filter((item) => item !== weight)
        : [...current, weight].sort((a, b) => a - b);

      return {
        ...prev,
        [key]: {
          ...prev[key],
          weights: nextWeights.length > 0 ? nextWeights : [400],
        },
      };
    });
  };

  const fontStatusLabel =
    fontLoadState === "ready"
      ? "Fonts ready"
      : fontLoadState === "loading"
      ? "Loading fonts"
      : fontLoadState === "error"
      ? "Font load issue"
      : "Fonts idle";

  return (
    <Sidebar className="w-80 border-r bg-card/95 backdrop-blur flex flex-col h-full">
      <SidebarHeader className="p-6 border-b bg-gradient-to-br from-slate-950 to-slate-800 text-white">
        <div className="flex items-center gap-2 mb-2">
          <Type className="h-6 w-6 text-white" />
          <h1 className="text-xl font-semibold">Typesystem</h1>
        </div>
        <p className="text-sm text-white/75">
          Sculpt responsive typography, preview it in context, and export the exact tokens you need.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant="secondary" className="text-xs bg-white/10 text-white border-white/15">
            {fontStatusLabel}
          </Badge>
          <Badge variant="secondary" className="text-xs bg-white/10 text-white border-white/15">
            {config.previewMode}
          </Badge>
        </div>
      </SidebarHeader>

      <SidebarContent className="flex-1 overflow-y-auto space-y-6">
        <SidebarGroup className="space-y-3">
          <SidebarGroupLabel>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              <span className="text-md font-semibold">Starter Presets</span>
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent className="space-y-2">
            {starterPresets.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => onApplyPreset(preset)}
                className="w-full rounded-lg border bg-background/80 p-3 text-left transition hover:border-primary/50 hover:bg-primary/5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 text-muted-foreground">
                      {presetIcon(preset.id)}
                    </span>
                    <div>
                      <div className="font-medium">{preset.name}</div>
                      <p className="text-xs text-muted-foreground">{preset.description}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-[10px] uppercase">
                    Apply
                  </Badge>
                </div>
              </button>
            ))}
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>
            <div className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              <span className="text-md font-semibold">Saved Presets</span>
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent className="space-y-3">
            <div className="space-y-2">
              <Input
                value={presetName}
                onChange={(event) => setPresetName(event.target.value)}
                placeholder="Name this preset"
              />
              <Button onClick={onSaveCurrentPreset} className="w-full" size="sm">
                Save current settings
              </Button>
            </div>
            <div className="space-y-2">
              {savedPresets.length === 0 ? (
                <div className="rounded-lg border border-dashed p-3 text-xs text-muted-foreground">
                  No saved presets yet. Save one to come back to it later.
                </div>
              ) : (
                savedPresets.map((preset) => (
                  <div
                    key={preset.id}
                    className="rounded-lg border bg-background/80 p-3 space-y-2"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-medium">{preset.name}</div>
                        <p className="text-xs text-muted-foreground">
                          {preset.description}
                        </p>
                      </div>
                      <Badge variant="secondary" className="text-[10px]">
                        Saved
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => onApplySavedPreset(preset)}
                      >
                        Load
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDeleteSavedPreset(preset.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup className="space-y-3">
          <div className="heading-font">
            <SidebarGroupLabel>
              <div className="flex items-center gap-2">
                <Type className="h-4 w-4" />
                <span className="text-md font-semibold">Heading Font</span>
              </div>
            </SidebarGroupLabel>
            <SidebarGroupContent className="space-y-3">
              <Select
                value={config.headingFont.fontFamily}
                onValueChange={(value) =>
                  setConfig((prev) => ({
                    ...prev,
                    headingFont: { ...prev.headingFont, fontFamily: value },
                    bodyFont: prev.separateFonts
                      ? prev.bodyFont
                      : { ...prev.bodyFont, fontFamily: value },
                  }))
                }
              >
                <SelectTrigger className="h-9 w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="max-h-80">
                  {POPULAR_FONTS.map((font) => (
                    <SelectItem key={font} value={font}>
                      <span style={{ fontFamily: `"${font}", sans-serif` }}>
                        {font}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label className="text-sm">Heading weights</Label>
                  <span className="text-xs text-muted-foreground">
                    {config.headingFont.weights.join(", ")}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {COMMON_FONT_WEIGHTS.map((weight) => {
                    const active = config.headingFont.weights.includes(weight);
                    return (
                      <Button
                        key={weight}
                        type="button"
                        size="sm"
                        variant={active ? "default" : "outline"}
                        className="h-8 px-2"
                        onClick={() => toggleWeight("headingFont", weight)}
                      >
                        {weightLabel(weight)}
                      </Button>
                    );
                  })}
                </div>
              </div>
            </SidebarGroupContent>
          </div>

          <div className="body-font">
            <SidebarGroupLabel className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <AlignLeft className="h-4 w-4" />
                <span className="text-md font-semibold">Body Font</span>
              </div>
              <div className="flex items-center gap-2">
                <Label className="text-xs text-muted-foreground">Separate fonts</Label>
                <Switch
                  checked={config.separateFonts}
                  onCheckedChange={(checked) =>
                    setConfig((prev) => ({
                      ...prev,
                      separateFonts: checked,
                      bodyFont: checked
                        ? prev.bodyFont
                        : {
                            ...prev.bodyFont,
                            fontFamily: prev.headingFont.fontFamily,
                            weights: [...prev.headingFont.weights],
                          },
                    }))
                  }
                />
              </div>
            </SidebarGroupLabel>
            <SidebarGroupContent className="space-y-3">
              <Select
                value={config.bodyFont.fontFamily}
                onValueChange={(value) =>
                  setConfig((prev) => ({
                    ...prev,
                    bodyFont: { ...prev.bodyFont, fontFamily: value },
                  }))
                }
                disabled={!config.separateFonts}
              >
                <SelectTrigger className="h-9 w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  {POPULAR_FONTS.map((font) => (
                    <SelectItem key={font} value={font}>
                      <span style={{ fontFamily: `"${font}", sans-serif` }}>
                        {font}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label className="text-sm">Body weights</Label>
                  <span className="text-xs text-muted-foreground">
                    {config.bodyFont.weights.join(", ")}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {COMMON_FONT_WEIGHTS.map((weight) => {
                    const active = config.bodyFont.weights.includes(weight);
                    return (
                      <Button
                        key={weight}
                        type="button"
                        size="sm"
                        variant={active ? "default" : "outline"}
                        className="h-8 px-2"
                        onClick={() => toggleWeight("bodyFont", weight)}
                        disabled={!config.separateFonts}
                      >
                        {weightLabel(weight)}
                      </Button>
                    );
                  })}
                </div>
                {!config.separateFonts ? (
                  <p className="text-xs text-muted-foreground">
                    Single-font mode keeps the body font aligned with the heading font.
                  </p>
                ) : null}
              </div>
            </SidebarGroupContent>
          </div>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>
            <div className="flex items-center gap-2">
              <MoveHorizontal className="h-4 w-4" />
              <span className="text-md font-semibold">Letter Spacing</span>
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-4 space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label className="text-sm">Heading letter spacing</Label>
                <span className="text-sm text-muted-foreground">
                  {truncateDecimal(config.headingFont.letterSpacing, 3)}em
                </span>
              </div>
              <Slider
                value={[config.headingFont.letterSpacing]}
                onValueChange={([value]) =>
                  setConfig((prev) => ({
                    ...prev,
                    headingFont: { ...prev.headingFont, letterSpacing: value },
                  }))
                }
                min={-0.1}
                max={0.2}
                step={0.01}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label className="text-sm">Body letter spacing</Label>
                <span className="text-sm text-muted-foreground">
                  {truncateDecimal(config.bodyFont.letterSpacing, 3)}em
                </span>
              </div>
              <Slider
                value={[config.bodyFont.letterSpacing]}
                onValueChange={([value]) =>
                  setConfig((prev) => ({
                    ...prev,
                    bodyFont: { ...prev.bodyFont, letterSpacing: value },
                  }))
                }
                min={-0.1}
                max={0.2}
                step={0.01}
                className="w-full"
              />
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>
            <div className="flex items-center gap-2">
              <Settings2 className="h-4 w-4" />
              <span className="text-md font-semibold">Scale</span>
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-4 space-y-5">
            <div className="space-y-2">
              <Label className="text-sm">Preview mode</Label>
              <div className="grid grid-cols-3 gap-2">
                {(Object.entries(PREVIEW_MODES) as [
                  PreviewMode,
                  PreviewModeConfig,
                ][]).map(([mode, value]) => {
                  const active = config.previewMode === mode;
                  return (
                    <Button
                      key={mode}
                      type="button"
                      size="sm"
                      variant={active ? "default" : "outline"}
                      className="h-auto flex-col gap-1 py-2"
                      onClick={() => onApplyPreviewMode(mode)}
                    >
                      {mode === "desktop" ? (
                        <LaptopMinimal className="h-4 w-4" />
                      ) : mode === "tablet" ? (
                        <TabletSmartphone className="h-4 w-4" />
                      ) : (
                        <Sparkles className="h-4 w-4" />
                      )}
                      <span className="text-[11px]">{value.label}</span>
                    </Button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label className="text-sm">Scale ratio</Label>
                <span className="text-sm text-muted-foreground">
                  {config.scaleRatio}
                </span>
              </div>
              <Select
                value={config.scaleRatio.toString()}
                onValueChange={(value) =>
                  setConfig((prev) => ({
                    ...prev,
                    scaleRatio: parseFloat(value),
                  }))
                }
              >
                <SelectTrigger className="h-9 w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(SCALE_RATIOS).map(([name, ratio]) => (
                    <SelectItem key={name} value={ratio.toString()}>
                      {name} ({ratio})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label className="text-sm">Base size</Label>
                <span className="text-sm text-muted-foreground">
                  {config.baseSize}px
                </span>
              </div>
              <Slider
                value={[config.baseSize]}
                onValueChange={([value]) =>
                  setConfig((prev) => ({
                    ...prev,
                    baseSize: value,
                  }))
                }
                min={12}
                max={24}
                step={0.5}
                className="w-full"
              />
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel className="flex justify-between items-center w-full">
            <div className="flex items-center gap-2">
              <LineChart className="h-4 w-4" />
              <span className="text-md font-semibold">Line heights</span>
            </div>
            <Switch
              checked={config.useCustomLineHeights}
              onCheckedChange={(checked) =>
                setConfig((prev) => ({
                  ...prev,
                  useCustomLineHeights: checked,
                }))
              }
            />
          </SidebarGroupLabel>
          <SidebarGroupContent className="space-y-3">
            {config.useCustomLineHeights && (
              <>
                <div className="space-y-2">
                  <Label className="text-sm">Preset</Label>
                  <Select
                    value={config.lineHeightPreset}
                    onValueChange={onApplyLineHeightPreset}
                  >
                    <SelectTrigger className="h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(LINE_HEIGHT_PRESETS).map((preset) => (
                        <SelectItem key={preset} value={preset}>
                          {preset}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  {Object.entries(config.lineHeights).map(([size, height]) => (
                    <div key={size} className="space-y-1">
                      <div className="flex justify-between">
                        <Label className="text-xs">{size}</Label>
                        <span className="text-xs text-muted-foreground">
                          {truncateDecimal(height, 3)}
                        </span>
                      </div>
                      <Slider
                        value={[height]}
                        onValueChange={([value]) =>
                          setConfig((prev) => ({
                            ...prev,
                            lineHeights: { ...prev.lineHeights, [size]: value },
                            lineHeightPreset: "Custom",
                          }))
                        }
                        min={1}
                        max={2}
                        step={0.05}
                        className="w-full"
                      />
                    </div>
                  ))}
                </div>
              </>
            )}
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              <span className="text-md font-semibold">Readability</span>
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="text-xs">
                {insights.cpl} CPL
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {truncateDecimal(insights.bodySize, 2)}px body
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {truncateDecimal(insights.previewWidth, 0)}px canvas
              </Badge>
            </div>
            {insights.warnings.length > 0 ? (
              <div className="space-y-2 rounded-lg border border-amber-200 bg-amber-50 p-3">
                {insights.warnings.map((warning) => (
                  <div key={warning} className="flex gap-2 text-xs text-amber-900">
                    <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                    <span>{warning}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-900">
                Typography looks balanced in the current preview mode.
              </div>
            )}
            {insights.recommendations.length > 0 ? (
              <div className="space-y-2">
                {insights.recommendations.map((item) => (
                  <div key={item} className="text-xs text-muted-foreground">
                    {item}
                  </div>
                ))}
              </div>
            ) : null}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-6 border-t bg-background/90">
        <Button
          onClick={() => setCodePreviewOpen(true)}
          className="w-full h-9"
          variant="outline"
          size="sm"
        >
          <Code className="h-4 w-4 mr-2" />
          Preview & Export Code
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
