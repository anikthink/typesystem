"use client";

import React from "react";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ScrollArea } from "./ui/scroll-area";

interface CodePreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cssCode: string;
  cssVariablesOnlyCode: string;
  tailwindCode: string;
  jsonCode: string;
  installInstructions: string;
}

const useCopyState = () => {
  const [copiedKey, setCopiedKey] = React.useState<string | null>(null);

  const copy = async (key: string, value: string, message: string) => {
    await navigator.clipboard.writeText(value);
    setCopiedKey(key);
    window.setTimeout(() => setCopiedKey(null), 2000);
    toast.success(message);
  };

  return { copiedKey, copy };
};

export function CodePreviewDialog({
  open,
  onOpenChange,
  cssCode,
  cssVariablesOnlyCode,
  tailwindCode,
  jsonCode,
  installInstructions,
}: CodePreviewDialogProps) {
  const { copiedKey, copy } = useCopyState();
  const copyAll = async () => {
    await navigator.clipboard.writeText(
      [
        "# CSS Variables Only",
        cssVariablesOnlyCode,
        "",
        "# Full CSS",
        cssCode,
        "",
        "# Tailwind Config",
        tailwindCode,
        "",
        "# JSON Tokens",
        jsonCode,
        "",
        "# Install Guide",
        installInstructions,
      ].join("\n")
    );
    toast.success("All exports copied to clipboard");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex h-[84vh] max-w-5xl flex-col overflow-hidden border-slate-200 bg-gradient-to-br from-white to-slate-50 p-0">
        <div className="border-b border-slate-200 px-6 py-5">
          <DialogHeader className="space-y-2">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <DialogTitle className="text-xl">Export Code Preview</DialogTitle>
                <DialogDescription>
                  Copy the exact typography outputs you need, including raw variables, a full CSS layer, Tailwind tokens, and portable JSON.
                </DialogDescription>
              </div>
              <Button onClick={copyAll} variant="outline" size="sm">
                <Copy className="mr-2 h-4 w-4" />
                Copy all
              </Button>
            </div>
          </DialogHeader>
        </div>

        <Tabs defaultValue="variables" className="flex min-h-0 flex-1 flex-col px-6 pb-6 pt-5">
          <TabsList className="grid w-full grid-cols-5 rounded-full bg-slate-100 p-1">
            <TabsTrigger value="variables">Variables</TabsTrigger>
            <TabsTrigger value="css">Full CSS</TabsTrigger>
            <TabsTrigger value="tailwind">Tailwind</TabsTrigger>
            <TabsTrigger value="json">JSON</TabsTrigger>
            <TabsTrigger value="install">Install</TabsTrigger>
          </TabsList>

          <TabsContent value="variables" className="mt-4 flex min-h-0 flex-1 flex-col">
            <div className="mb-3 flex items-center justify-between">
              <h4 className="text-sm font-medium text-slate-700">CSS variables only</h4>
              <Button
                onClick={() => copy("variables", cssVariablesOnlyCode, "Variables copied")}
                size="sm"
                variant="outline"
              >
                {copiedKey === "variables" ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                {copiedKey === "variables" ? "Copied" : "Copy variables"}
              </Button>
            </div>
            <div className="min-h-0 flex-1 rounded-2xl border border-slate-200 bg-slate-950 shadow-xl shadow-slate-200/50">
              <ScrollArea className="h-full">
                <pre className="p-5 text-sm leading-6 text-slate-100">
                  {cssVariablesOnlyCode}
                </pre>
              </ScrollArea>
            </div>
          </TabsContent>

          <TabsContent value="css" className="mt-4 flex min-h-0 flex-1 flex-col">
            <div className="mb-3 flex items-center justify-between">
              <h4 className="text-sm font-medium text-slate-700">Full CSS output</h4>
              <Button
                onClick={() => copy("css", cssCode, "CSS copied")}
                size="sm"
                variant="outline"
              >
                {copiedKey === "css" ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                {copiedKey === "css" ? "Copied" : "Copy CSS"}
              </Button>
            </div>
            <div className="min-h-0 flex-1 rounded-2xl border border-slate-200 bg-slate-950 shadow-xl shadow-slate-200/50">
              <ScrollArea className="h-full">
                <pre className="p-5 text-sm leading-6 text-slate-100">
                  {cssCode}
                </pre>
              </ScrollArea>
            </div>
          </TabsContent>

          <TabsContent value="tailwind" className="mt-4 flex min-h-0 flex-1 flex-col">
            <div className="mb-3 flex items-center justify-between">
              <h4 className="text-sm font-medium text-slate-700">Tailwind config snippet</h4>
              <Button
                onClick={() => copy("tailwind", tailwindCode, "Tailwind copied")}
                size="sm"
                variant="outline"
              >
                {copiedKey === "tailwind" ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                {copiedKey === "tailwind" ? "Copied" : "Copy Tailwind"}
              </Button>
            </div>
            <div className="min-h-0 flex-1 rounded-2xl border border-slate-200 bg-slate-950 shadow-xl shadow-slate-200/50">
              <ScrollArea className="h-full">
                <pre className="p-5 text-sm leading-6 text-slate-100">
                  {tailwindCode}
                </pre>
              </ScrollArea>
            </div>
          </TabsContent>

          <TabsContent value="json" className="mt-4 flex min-h-0 flex-1 flex-col">
            <div className="mb-3 flex items-center justify-between">
              <h4 className="text-sm font-medium text-slate-700">JSON tokens</h4>
              <Button
                onClick={() => copy("json", jsonCode, "JSON copied")}
                size="sm"
                variant="outline"
              >
                {copiedKey === "json" ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                {copiedKey === "json" ? "Copied" : "Copy JSON"}
              </Button>
            </div>
            <div className="min-h-0 flex-1 rounded-2xl border border-slate-200 bg-slate-950 shadow-xl shadow-slate-200/50">
              <ScrollArea className="h-full">
                <pre className="p-5 text-sm leading-6 text-slate-100">
                  {jsonCode}
                </pre>
              </ScrollArea>
            </div>
          </TabsContent>

          <TabsContent value="install" className="mt-4 flex min-h-0 flex-1 flex-col">
            <div className="mb-3 flex items-center justify-between">
              <h4 className="text-sm font-medium text-slate-700">Install instructions</h4>
              <Button
                onClick={() => copy("install", installInstructions, "Install guide copied")}
                size="sm"
                variant="outline"
              >
                {copiedKey === "install" ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                {copiedKey === "install" ? "Copied" : "Copy guide"}
              </Button>
            </div>
            <div className="min-h-0 flex-1 rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50">
              <ScrollArea className="h-full">
                <pre className="whitespace-pre-wrap p-5 text-sm leading-7 text-slate-700">
                  {installInstructions}
                </pre>
              </ScrollArea>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
