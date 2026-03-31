"use client";

import React, { useMemo } from "react";
import { AlertTriangle, ArrowUpRight, Eye, LayoutPanelTop } from "lucide-react";
import type {
  FontConfig,
  PreviewMode,
  PreviewModeConfig,
  TypeScale,
  TypographyInsights,
} from "@/lib/typography";

interface WebsitePreviewProps {
  scale: TypeScale[];
  headingFont: FontConfig;
  bodyFont: FontConfig;
  previewMode: PreviewMode;
  previewModeConfig: PreviewModeConfig;
  insights: TypographyInsights;
  getSafeMaxWeight: (weights: number[]) => number;
  getSafeWeight: (weights: number[], targetWeight: number) => number;
}

const scaleMapFrom = (scale: TypeScale[]) =>
  Object.fromEntries(scale.map((item) => [item.name, item]));

export function WebsitePreview({
  scale,
  headingFont,
  bodyFont,
  previewMode,
  previewModeConfig,
  insights,
  getSafeMaxWeight,
  getSafeWeight,
}: WebsitePreviewProps) {
  const scaleMap = useMemo(() => scaleMapFrom(scale), [scale]);

  const body = scaleMap.base ?? scale[2];
  const eyebrow = scaleMap.sm ?? scale[0];
  const h1 = scaleMap["4xl"] ?? scale[scale.length - 1];
  const h2 = scaleMap["2xl"] ?? scale[4] ?? h1;
  const h3 = scaleMap.xl ?? scale[3] ?? h2;

  return (
    <div className="w-1/2 min-w-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.96)_0%,rgba(15,23,42,0.92)_100%)] text-white">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
        <div className="flex items-center gap-2">
          <Eye className="h-4 w-4 text-cyan-300" />
          <span className="text-sm font-medium tracking-wide">Website Preview</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-white/65">
          <LayoutPanelTop className="h-3.5 w-3.5" />
          <span>{previewModeConfig.label}</span>
          <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5">
            {previewModeConfig.width}px
          </span>
        </div>
      </div>

      <div className="h-full overflow-y-auto px-5 py-6">
        <div className="mx-auto max-w-[1120px]">
          <div
            className="mx-auto rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-4 shadow-[0_30px_120px_rgba(0,0,0,0.35)] backdrop-blur"
            style={{
              width: `min(100%, ${previewModeConfig.width}px)`,
            }}
            data-preview-mode={previewMode}
          >
            <div className="rounded-[1.5rem] border border-white/10 bg-slate-50 text-slate-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-5 py-4">
                <div className="space-y-1">
                  <div
                    style={{
                      fontFamily: `"${bodyFont.fontFamily}", sans-serif`,
                      fontSize: `${eyebrow?.size ?? 14}px`,
                      lineHeight: eyebrow?.lineHeight ?? 1.5,
                      letterSpacing: `${bodyFont.letterSpacing}em`,
                    }}
                    className="uppercase tracking-[0.22em] text-slate-500"
                  >
                    Field Notes
                  </div>
                  <div
                    style={{
                      fontFamily: `"${headingFont.fontFamily}", serif`,
                      fontSize: `${h1?.size ?? 44}px`,
                      lineHeight: h1?.lineHeight ?? 1.05,
                      fontWeight: getSafeMaxWeight(headingFont.weights),
                      letterSpacing: `${headingFont.letterSpacing}em`,
                    }}
                    className="max-w-[16ch]"
                  >
                    The shape of a system becomes visible when it hits the page.
                  </div>
                </div>

                <div className="grid gap-2 text-xs text-slate-600">
                  <div className="rounded-full border border-slate-200 bg-white px-3 py-1.5">
                    {previewModeConfig.label} canvas
                  </div>
                  <div className="rounded-full border border-slate-200 bg-white px-3 py-1.5">
                    {insights.cpl} CPL
                  </div>
                </div>
              </div>

              <div className="grid gap-6 px-5 py-5 lg:grid-cols-[1.3fr_0.7fr]">
                <article className="space-y-6">
                  <p
                    style={{
                      fontFamily: `"${bodyFont.fontFamily}", sans-serif`,
                      fontSize: `${body?.size ?? 17}px`,
                      lineHeight: body?.lineHeight ?? 1.6,
                      letterSpacing: `${bodyFont.letterSpacing}em`,
                    }}
                    className="max-w-[62ch] text-slate-700"
                  >
                    This preview is wired to the same tokens you export. It shows how your scale, spacing, and font pairing feel in a real editorial context, not just as isolated swatches.
                  </p>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <section className="rounded-2xl border border-slate-200 bg-white p-4">
                      <div
                        style={{
                          fontFamily: `"${headingFont.fontFamily}", serif`,
                          fontSize: `${h2?.size ?? 28}px`,
                          lineHeight: h2?.lineHeight ?? 1.15,
                          fontWeight: getSafeWeight(headingFont.weights, 700),
                          letterSpacing: `${headingFont.letterSpacing}em`,
                        }}
                      >
                        A restrained hero
                      </div>
                      <p
                        style={{
                          fontFamily: `"${bodyFont.fontFamily}", sans-serif`,
                          fontSize: `${body?.size ?? 17}px`,
                          lineHeight: body?.lineHeight ?? 1.6,
                          letterSpacing: `${bodyFont.letterSpacing}em`,
                        }}
                        className="mt-3 text-slate-600"
                      >
                        Use this area to judge whether your headings have enough contrast and whether the body copy still breathes at the current scale.
                      </p>
                    </section>

                    <section className="rounded-2xl border border-slate-200 bg-slate-900 p-4 text-white">
                      <div className="flex items-center justify-between">
                        <span className="text-xs uppercase tracking-[0.2em] text-white/55">
                          Readability
                        </span>
                        <ArrowUpRight className="h-4 w-4 text-cyan-300" />
                      </div>
                      <div
                        style={{
                          fontFamily: `"${headingFont.fontFamily}", serif`,
                          fontSize: `${h3?.size ?? 24}px`,
                          lineHeight: h3?.lineHeight ?? 1.2,
                          fontWeight: getSafeWeight(headingFont.weights, 600),
                          letterSpacing: `${headingFont.letterSpacing}em`,
                        }}
                        className="mt-6"
                      >
                        {insights.bodySize}px body type, {insights.cpl} CPL
                      </div>
                      <p className="mt-3 text-sm leading-6 text-white/70">
                        Keep an eye on the warnings panel if the line length gets too tight or too airy for the selected device.
                      </p>
                    </section>
                  </div>

                  <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4">
                    <div
                      style={{
                        fontFamily: `"${headingFont.fontFamily}", serif`,
                        fontSize: `${h3?.size ?? 24}px`,
                        lineHeight: h3?.lineHeight ?? 1.2,
                        fontWeight: getSafeWeight(headingFont.weights, 600),
                        letterSpacing: `${headingFont.letterSpacing}em`,
                      }}
                    >
                      The system in motion
                    </div>
                    <div
                      style={{
                        fontFamily: `"${bodyFont.fontFamily}", sans-serif`,
                        fontSize: `${body?.size ?? 17}px`,
                        lineHeight: body?.lineHeight ?? 1.6,
                        letterSpacing: `${bodyFont.letterSpacing}em`,
                      }}
                      className="space-y-4 text-slate-700"
                    >
                      <p>
                        When you change the preview mode, the canvas width, body size, and line-length analysis all respond together so you can compare device-specific typography decisions in one pass.
                      </p>
                      <p>
                        That makes it easier to catch the small misalignments that usually slip through when the preview and export surfaces are disconnected.
                      </p>
                    </div>
                  </section>
                </article>

                <aside className="space-y-4">
                  <section className="rounded-2xl border border-white/10 bg-slate-950 p-4 text-white">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/55">
                      <AlertTriangle className="h-3.5 w-3.5 text-amber-300" />
                      Warnings
                    </div>
                    <div className="mt-4 space-y-3">
                      {insights.warnings.length > 0 ? (
                        insights.warnings.map((warning) => (
                          <div key={warning} className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-3 text-sm text-amber-50">
                            {warning}
                          </div>
                        ))
                      ) : (
                        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-sm text-emerald-50">
                          The current preview sits in a readable range.
                        </div>
                      )}
                    </div>
                  </section>

                  <section className="rounded-2xl border border-white/10 bg-white/5 p-4 text-white backdrop-blur">
                    <div className="text-xs uppercase tracking-[0.2em] text-white/55">
                      Active tokens
                    </div>
                    <div className="mt-4 space-y-3 text-sm text-white/75">
                      <div className="flex items-center justify-between gap-4">
                        <span>Heading font</span>
                        <span className="text-white">{headingFont.fontFamily}</span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span>Body font</span>
                        <span className="text-white">{bodyFont.fontFamily}</span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span>Scale ratio</span>
                        <span className="text-white">{previewModeConfig.scaleRatioMultiplier.toFixed(2)}x</span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span>Canvas width</span>
                        <span className="text-white">{previewModeConfig.width}px</span>
                      </div>
                    </div>
                  </section>

                  {insights.recommendations.length > 0 ? (
                    <section className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-4 text-sm text-cyan-50">
                      <div className="text-xs uppercase tracking-[0.2em] text-cyan-100/70">
                        Suggestions
                      </div>
                      <div className="mt-3 space-y-2">
                        {insights.recommendations.map((item) => (
                          <div key={item}>{item}</div>
                        ))}
                      </div>
                    </section>
                  ) : null}
                </aside>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
