import React from "react";
import { Badge } from "./ui/badge";

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

interface TypeScaleTableProps {
  scale: TypeScale[];
  headingFont: FontConfig;
  bodyFont: FontConfig;
  baseSize: number;
  truncateDecimal: (num: number, places?: number) => number;
  pxToRem: (px: number, baseSize?: number) => number;
}

export const TypeScaleTable: React.FC<TypeScaleTableProps> = ({
  scale,
  headingFont,
  bodyFont,
  baseSize,
  truncateDecimal,
  pxToRem,
}) => {
  return (
    <div className="space-y-6">
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left text-xs font-medium text-muted-foreground pb-3 pr-4">
              Size
            </th>
            <th className="text-left text-xs font-medium text-muted-foreground pb-3 pr-4">
              Rem
            </th>
            <th className="text-left text-xs font-medium text-muted-foreground pb-3 pr-4">
              Line
            </th>
            <th className="text-left text-xs font-medium text-muted-foreground pb-3 pr-4">
              Type
            </th>
            <th className="text-left text-xs font-medium text-muted-foreground pb-3">
              Sample
            </th>
          </tr>
        </thead>
        <tbody>
          {scale.map((item) => {
            const font = item.isHeading ? headingFont : bodyFont;
            return (
              <tr key={item.name} className="group hover:bg-muted/20">
                <td className="py-3 pr-4">
                  <div className="text-xs font-mono text-muted-foreground">
                    {item.name}
                  </div>
                </td>
                <td className="py-3 pr-4">
                  <div className="text-xs font-mono text-muted-foreground">
                    {pxToRem(item.size, baseSize)}rem
                  </div>
                </td>
                <td className="py-3 pr-4">
                  <div className="text-xs font-mono text-muted-foreground">
                    {truncateDecimal(item.lineHeight, 3)}
                  </div>
                </td>
                <td className="py-3 pr-4">
                  <Badge variant="outline" className="text-xs h-4 px-1">
                    {item.isHeading ? "H" : "B"}
                  </Badge>
                </td>
                <td className="py-3">
                  <div
                    style={{
                      fontFamily: `"${font.fontFamily}", sans-serif`,
                      fontSize: `${item.size}px`,
                      lineHeight: item.lineHeight,
                      fontWeight: item.weight,
                      letterSpacing: `${font.letterSpacing}em`,
                      color: "#000000",
                    }}
                  >
                    A wizard&apos;s job is to vex chumps quickly in fog
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
