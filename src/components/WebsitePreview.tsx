import React from "react";

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

interface WebsitePreviewProps {
  scale: TypeScale[];
  headingFont: FontConfig;
  bodyFont: FontConfig;
  getSafeMaxWeight: (weights: number[]) => number;
  getSafeWeight: (weights: number[], targetWeight: number) => number;
}

export const WebsitePreview: React.FC<WebsitePreviewProps> = ({
  scale,
  headingFont,
  bodyFont,
  getSafeMaxWeight,
  getSafeWeight,
}) => {
  return (
    <div className="w-1/2">
      <div className="p-4 border-b bg-muted/20">
        <div className="flex items-center gap-2">
          {/* FileText icon should be rendered by parent if needed */}
          <span className="text-sm font-medium">Website Preview</span>
        </div>
      </div>
      <div
        className="h-full overflow-y-auto p-6"
      >
        <div className="max-w-2xl">
          {/* Blog Header */}
          <div className="space-y-4 mb-8">
            <div
              style={{
                fontFamily: `"${bodyFont.fontFamily}", sans-serif`,
                fontSize: `${scale.find((s) => s.name === "sm")?.size || 14}px`,
                lineHeight:
                  scale.find((s) => s.name === "sm")?.lineHeight || 1.5,
                letterSpacing: `${bodyFont.letterSpacing}em`,
                color: "#000000",
              }}
              className="opacity-70"
            >
              The Blog
            </div>
            <div
              style={{
                fontFamily: `"${headingFont.fontFamily}", sans-serif`,
                fontSize: `${
                  scale.find((s) => s.name === "3xl")?.size || 30
                }px`,
                lineHeight:
                  scale.find((s) => s.name === "3xl")?.lineHeight || 1.2,
                fontWeight: getSafeMaxWeight(headingFont.weights),
                letterSpacing: `${headingFont.letterSpacing}em`,
                color: "#000000",
              }}
            >
              Exploring the mysteries of Atlantis
            </div>
            <div
              style={{
                fontFamily: `"${bodyFont.fontFamily}", sans-serif`,
                fontSize: `${scale.find((s) => s.name === "sm")?.size || 14}px`,
                lineHeight:
                  scale.find((s) => s.name === "sm")?.lineHeight || 1.5,
                letterSpacing: `${bodyFont.letterSpacing}em`,
                color: "#000000",
              }}
              className="opacity-70"
            >
              Jul 20th, 2025 — By Stephanie
            </div>
          </div>

          {/* Article Content */}
          <div className="space-y-6">
            <div
              style={{
                fontFamily: `"${bodyFont.fontFamily}", sans-serif`,
                fontSize: `${
                  scale.find((s) => s.name === "base")?.size || 16
                }px`,
                lineHeight:
                  scale.find((s) => s.name === "base")?.lineHeight || 1.5,
                letterSpacing: `${bodyFont.letterSpacing}em`,
                color: "#000000",
              }}
            >
              Atlantis, the Lost City of Myth and Legend, has captivated the
              human imagination for centuries. Join us as we dive deep into this
              enigmatic sunken realm and uncover the secrets hidden beneath the
              waves.
            </div>

            <div
              style={{
                fontFamily: `"${headingFont.fontFamily}", sans-serif`,
                fontSize: `${scale.find((s) => s.name === "xl")?.size || 20}px`,
                lineHeight:
                  scale.find((s) => s.name === "xl")?.lineHeight || 1.4,
                fontWeight: getSafeWeight(headingFont.weights, 600),
                letterSpacing: `${headingFont.letterSpacing}em`,
                color: "#000000",
              }}
            >
              The origins of Atlantis
            </div>

            <div
              style={{
                fontFamily: `"${bodyFont.fontFamily}", sans-serif`,
                fontSize: `${
                  scale.find((s) => s.name === "base")?.size || 16
                }px`,
                lineHeight:
                  scale.find((s) => s.name === "base")?.lineHeight || 1.5,
                letterSpacing: `${bodyFont.letterSpacing}em`,
                color: "#000000",
              }}
            >
              The first mention of Atlantis can be traced back to the works of
              the ancient Greek philosopher Plato. He described a powerful and
              advanced civilization that disappeared beneath the ocean&apos;s
              surface, leaving behind only speculation and intrigue.
            </div>

            <div
              style={{
                fontFamily: `"${headingFont.fontFamily}", sans-serif`,
                fontSize: `${scale.find((s) => s.name === "xl")?.size || 20}px`,
                lineHeight:
                  scale.find((s) => s.name === "xl")?.lineHeight || 1.4,
                fontWeight: getSafeWeight(headingFont.weights, 600),
                letterSpacing: `${headingFont.letterSpacing}em`,
                color: "#000000",
              }}
            >
              Theories and speculations
            </div>

            <div
              style={{
                fontFamily: `"${bodyFont.fontFamily}", sans-serif`,
                fontSize: `${
                  scale.find((s) => s.name === "base")?.size || 16
                }px`,
                lineHeight:
                  scale.find((s) => s.name === "base")?.lineHeight || 1.5,
                letterSpacing: `${bodyFont.letterSpacing}em`,
                color: "#000000",
              }}
            >
              Over the years, numerous theories and speculations have arisen
              regarding the existence and fate of Atlantis. Some believe it was
              a highly advanced society with technology far beyond its time,
              while others argue that it was purely a product of Plato&apos;s
              imagination.
            </div>

            <div
              style={{
                fontFamily: `"${headingFont.fontFamily}", sans-serif`,
                fontSize: `${scale.find((s) => s.name === "lg")?.size || 18}px`,
                lineHeight:
                  scale.find((s) => s.name === "lg")?.lineHeight || 1.4,
                fontWeight: getSafeWeight(headingFont.weights, 500),
                letterSpacing: `${headingFont.letterSpacing}em`,
                color: "#000000",
              }}
            >
              Archaeological evidence
            </div>

            <div
              style={{
                fontFamily: `"${bodyFont.fontFamily}", sans-serif`,
                fontSize: `${
                  scale.find((s) => s.name === "base")?.size || 16
                }px`,
                lineHeight:
                  scale.find((s) => s.name === "base")?.lineHeight || 1.5,
                letterSpacing: `${bodyFont.letterSpacing}em`,
                color: "#000000",
              }}
            >
              Recent underwater excavations have uncovered fascinating artifacts
              that challenge our understanding of ancient civilizations. These
              discoveries continue to fuel the debate about Atlantis and its
              possible historical basis.
            </div>

            {/* Call to action or metadata */}
            <div className="mt-8 pt-6 border-t border-current">
              <div
                style={{
                  fontFamily: `"${bodyFont.fontFamily}", sans-serif`,
                  fontSize: `${
                    scale.find((s) => s.name === "sm")?.size || 14
                  }px`,
                  lineHeight:
                    scale.find((s) => s.name === "sm")?.lineHeight || 1.5,
                  letterSpacing: `${bodyFont.letterSpacing}em`,
                  color: "#000000",
                }}
                className="opacity-60"
              >
                5 min read • Ancient History
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
