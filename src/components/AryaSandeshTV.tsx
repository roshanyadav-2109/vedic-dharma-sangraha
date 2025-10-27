import { Card } from "@/components/ui/card";
import { Youtube } from "lucide-react";

const AryaSandeshTV = () => {
  // Replace "5_s_n4-4_Zk" with your desired YouTube video ID
  const videoId = "5_s_n4-4_Zk";

  return (
    <section id="arya-sandesh-tv" className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block p-6 rounded-full sacred-gradient divine-glow mb-4">
            <Youtube className="w-16 h-16 text-primary-foreground" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            Arya Sandesh TV
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Watch programs and discourses spreading the light of Vedic knowledge.
          </p>
        </div>

        <Card className="temple-shadow max-w-4xl mx-auto overflow-hidden p-2 sm:p-4 bg-card">
          {/* Responsive container for the video */}
          <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="Arya Sandesh TV - YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default AryaSandeshTV;
