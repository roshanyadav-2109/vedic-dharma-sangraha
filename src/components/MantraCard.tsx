import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

interface MantraCardProps {
  title: string;
  mantra: string;
  meaning?: string;
}

const MantraCard = ({ title, mantra, meaning }: MantraCardProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(mantra);
      setCopied(true);
      toast.success("मंत्र कॉपी हो गया!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("कॉपी करने में त्रुटि");
    }
  };

  return (
    <Card className="p-6 temple-shadow hover:divine-glow transition-all duration-500 border-2 border-border/50 hover:border-primary/30 bg-card">
      <div className="flex justify-between items-start gap-4 mb-4">
        <h3 className="text-xl font-bold font-devanagari text-primary">{title}</h3>
        <Button
          onClick={handleCopy}
          size="sm"
          variant="outline"
          className="shrink-0 hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-1" />
              कॉपी हुआ
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-1" />
              कॉपी
            </>
          )}
        </Button>
      </div>
      
      <div className="space-y-4">
        <p className="text-2xl leading-relaxed font-sanskrit text-foreground/90 select-all">
          {mantra}
        </p>
        
        {meaning && (
          <div className="pt-4 border-t border-border/50">
            <p className="text-sm font-devanagari text-muted-foreground italic">
              {meaning}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default MantraCard;
