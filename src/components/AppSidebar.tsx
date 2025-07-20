import React, { Dispatch, SetStateAction } from "react";
import {
  Type,
  AlignLeft,
  Settings2,
  LineChart,
  Code,
  MoveHorizontal,
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
import type { TypographyConfig } from "./TypographyBuilder";

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

interface FontConfig {
  fontFamily: string;
  weights: number[];
  letterSpacing: number;
}

interface SidebarProps {
  config: TypographyConfig & {
    separateFonts: boolean;
    headingFont: FontConfig;
    bodyFont: FontConfig;
    baseSize: number;
    scaleRatio: number;
    useCustomLineHeights: boolean;
    lineHeightPreset: string;
    lineHeights: LineHeightConfig;
  };
  setConfig: Dispatch<SetStateAction<TypographyConfig>>;
  customHeadingFont: string;
  setCustomHeadingFont: (v: string) => void;
  customBodyFont: string;
  setCustomBodyFont: (v: string) => void;
  loading: boolean;
  setCodePreviewOpen: (v: boolean) => void;
  POPULAR_FONTS: string[];
  SCALE_RATIOS: Record<string, number>;
  LINE_HEIGHT_PRESETS: Record<string, LineHeightConfig>;
  truncateDecimal: (num: number, places?: number) => number;
  applyLineHeightPreset: (preset: string) => void;
}

export function AppSidebar({
  config,
  setConfig,
  setCodePreviewOpen,
  POPULAR_FONTS,
  SCALE_RATIOS,
  LINE_HEIGHT_PRESETS,
  truncateDecimal,
  applyLineHeightPreset,
}: SidebarProps) {
  return (
    <Sidebar className="w-80 border-r bg-card flex flex-col h-full">
      <SidebarHeader className="p-6 border-b">
        <div className="flex items-center gap-2 mb-2">
          <Type className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-semibold">Typesystem</h1>
        </div>
        <p className="text-sm text-muted-foreground">
          Create perfect typography scales with separate heading and body fonts
        </p>
      </SidebarHeader>
      <SidebarContent className="flex-1 overflow-y-auto space-y-6">
        <SidebarGroup className="space-y-3">
          <div className="heading-font">
            <SidebarGroupLabel>
              <div className="flex items-center gap-2">
                <Type className="h-4 w-4" />
                <span className="text-md font-semibold">Heading Font</span>
              </div>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="space-y-2">
                <Select
                  value={config.headingFont.fontFamily}
                  onValueChange={(value) =>
                    setConfig((prev: SidebarProps["config"]) => ({
                      ...prev,
                      headingFont: { ...prev.headingFont, fontFamily: value },
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
              </div>
            </SidebarGroupContent>
          </div>
          <div className="body-font">
            <SidebarGroupLabel>
              <div className="flex items-center gap-2">
                <AlignLeft className="h-4 w-4" />
                <span className="text-md font-semibold">Body Font</span>
              </div>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="space-y-3">
                <Select
                  value={config.bodyFont.fontFamily}
                  onValueChange={(value) =>
                    setConfig((prev: SidebarProps["config"]) => ({
                      ...prev,
                      bodyFont: { ...prev.bodyFont, fontFamily: value },
                    }))
                  }
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
                  setConfig((prev: SidebarProps["config"]) => ({
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
                  setConfig((prev: SidebarProps["config"]) => ({
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
          <SidebarGroupContent className="mt-4">
            <div className="flex gap-2 mb-4">
              <Label className="text-sm">Ratio:</Label>
              <Select
                value={config.scaleRatio.toString()}
                onValueChange={(value) =>
                  setConfig((prev: SidebarProps["config"]) => ({
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
                  setConfig((prev: SidebarProps["config"]) => ({
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
                  setConfig((prev: SidebarProps["config"]) => ({
                    ...prev,
                    useCustomLineHeights: checked,
                  }))
                }
              />    
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="flex items-center justify-between mb-2">
              <span></span>
              
            </div>
            {config.useCustomLineHeights && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm">Preset</Label>
                  <Select
                    value={config.lineHeightPreset}
                    onValueChange={(value) => {
                      applyLineHeightPreset(value);
                    }}
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
                          setConfig((prev: SidebarProps["config"]) => ({
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
              </div>
            )}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-6 border-t">
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
