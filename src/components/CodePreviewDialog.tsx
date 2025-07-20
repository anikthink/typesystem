import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Copy, Check } from 'lucide-react';
import { toast } from 'sonner';
import { ScrollArea } from './ui/scroll-area';

interface CodePreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cssCode: string;
  tailwindCode: string;
}

export function CodePreviewDialog({ open, onOpenChange, cssCode, tailwindCode }: CodePreviewDialogProps) {
  const [copiedCSS, setCopiedCSS] = React.useState(false);
  const [copiedTailwind, setCopiedTailwind] = React.useState(false);

  const copyCSS = () => {
    navigator.clipboard.writeText(cssCode);
    setCopiedCSS(true);
    setTimeout(() => setCopiedCSS(false), 2000);
    toast.success('CSS copied to clipboard');
  };

  const copyTailwind = () => {
    navigator.clipboard.writeText(tailwindCode);
    setCopiedTailwind(true);
    setTimeout(() => setCopiedTailwind(false), 2000);
    toast.success('Tailwind config copied to clipboard');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Export Code Preview</DialogTitle>
          <DialogDescription>
            Preview and copy the generated CSS variables or Tailwind configuration for your typography system.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="css" className="flex-1 flex flex-col min-h-0">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="css">CSS Variables</TabsTrigger>
            <TabsTrigger value="tailwind">Tailwind Config</TabsTrigger>
          </TabsList>
          
          <TabsContent value="css" className="flex-1 flex flex-col mt-4 min-h-0">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium">CSS Custom Properties</h4>
              <Button onClick={copyCSS} size="sm" variant="outline">
                {copiedCSS ? (
                  <Check className="h-4 w-4 mr-2" />
                ) : (
                  <Copy className="h-4 w-4 mr-2" />
                )}
                {copiedCSS ? 'Copied!' : 'Copy CSS'}
              </Button>
            </div>
            <div className="flex-1 min-h-0 bg-muted rounded-lg">
              <ScrollArea className="h-full p-4">
                <pre className="text-sm font-mono whitespace-pre-wrap">{cssCode}</pre>
              </ScrollArea>
            </div>
          </TabsContent>
          
          <TabsContent value="tailwind" className="flex-1 flex flex-col mt-4 min-h-0">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium">Tailwind Configuration</h4>
              <Button onClick={copyTailwind} size="sm" variant="outline">
                {copiedTailwind ? (
                  <Check className="h-4 w-4 mr-2" />
                ) : (
                  <Copy className="h-4 w-4 mr-2" />
                )}
                {copiedTailwind ? 'Copied!' : 'Copy Tailwind'}
              </Button>
            </div>
            <div className="flex-1 min-h-0 bg-muted rounded-lg">
              <ScrollArea className="h-full p-4">
                <pre className="text-sm font-mono whitespace-pre-wrap">{tailwindCode}</pre>
              </ScrollArea>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}