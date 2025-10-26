import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check, Volume2, VolumeX } from "lucide-react";
import { toast } from "sonner";

interface MantraCardProps {
  title: string;
  mantra: string;
  meaning?: string;
}

const MantraCard = ({ title, mantra, meaning }: MantraCardProps) => {
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

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

  const handleRecite = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(mantra);
    utterance.lang = 'hi-IN';
    utterance.rate = 0.8;
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      setIsSpeaking(true);
      toast.success("मंत्र उच्चारण शुरू");
    };

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      toast.error("उच्चारण में त्रुटि");
    };

    window.speechSynthesis.speak(utterance);
  };

  return (
    <Card className="group p-8 temple-shadow hover:divine-glow transition-all duration-500 border-2 border-border/50 hover:border-primary/40 bg-gradient-to-br from-card via-card to-primary/5 hover:shadow-2xl">
      <div className="flex justify-between items-start gap-6 mb-6">
        <h3 className="text-2xl font-bold font-devanagari text-gradient leading-tight">{title}</h3>
        <div className="flex gap-3 shrink-0">
          <Button
            onClick={handleRecite}
            size="lg"
            variant="outline"
            className="font-devanagari hover:bg-primary hover:text-primary-foreground transition-all hover:scale-105 border-2"
          >
            {isSpeaking ? (
              <>
                <VolumeX className="w-5 h-5 mr-2" />
                रोकें
              </>
            ) : (
              <>
                <Volume2 className="w-5 h-5 mr-2" />
                सुनें
              </>
            )}
          </Button>
          <Button
            onClick={handleCopy}
            size="lg"
            variant="outline"
            className="font-devanagari hover:bg-primary hover:text-primary-foreground transition-all hover:scale-105 border-2"
          >
            {copied ? (
              <>
                <Check className="w-5 h-5 mr-2" />
                कॉपी हुआ
              </>
            ) : (
              <>
                <Copy className="w-5 h-5 mr-2" />
                कॉपी
              </>
            )}
          </Button>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="bg-background/50 backdrop-blur-sm rounded-lg p-6 border border-primary/10">
          <p className="text-3xl md:text-4xl leading-loose font-sanskrit text-foreground select-all tracking-wide">
            {mantra}
          </p>
        </div>
        
        {meaning && (
          <div className="pt-6 border-t-2 border-primary/20">
            <p className="text-base font-devanagari text-muted-foreground italic leading-relaxed">
              {meaning}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default MantraCard;
