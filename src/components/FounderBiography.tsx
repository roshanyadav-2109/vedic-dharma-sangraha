import { Badge } from "@/components/ui/badge";

const FounderBiography = () => {
  return (
    <section className="w-full py-20 lg:py-40 bg-muted/30">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-8 items-center lg:grid-cols-2">
          <div className="bg-muted rounded-md aspect-[4/5] overflow-hidden">
            <img
              src="https://placehold.co/500x600/ff9933/ffffff?text=Maharshi+Dayanand"
              alt="Maharshi Dayanand Saraswati"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "https://placehold.co/500x600/ff9933/ffffff?text=Maharshi";
              }}
            />
          </div>
          <div className="flex gap-4 flex-col">
            <div>
              <Badge variant="outline">1824 - 1883</Badge>
            </div>
            <div className="flex gap-4 flex-col">
              <h1 className="text-5xl md:text-7xl max-w-lg tracking-tighter text-left font-regular">
                Maharshi Dayanand Saraswati
              </h1>
              <p className="text-lg font-devanagari text-muted-foreground mb-2">
                महर्षि दयानन्द सरस्वती
              </p>
              <p className="text-xl leading-relaxed tracking-tight text-muted-foreground max-w-md text-left">
                Born as Mool Shankar Tiwari in 1824 in Gujarat, Maharshi Dayanand Saraswati was a profound 
                scholar and social reformer who dedicated his life to reviving Vedic wisdom and eradicating 
                social evils from Hindu society.
              </p>
              <p className="text-xl leading-relaxed tracking-tight text-muted-foreground max-w-md text-left">
                After years of rigorous study and spiritual practice, he founded Arya Samaj in Mumbai in 1875 
                with the mission to propagate Vedic knowledge and reform society. His clarion call "Back to the Vedas" 
                resonated across India.
              </p>
              <p className="text-xl leading-relaxed tracking-tight text-muted-foreground max-w-md text-left">
                He authored "Satyarth Prakash" (The Light of Truth), which outlines his philosophy and vision 
                for a reformed society based on Vedic principles. He championed women's rights, opposed the 
                caste system, and fought against superstitions.
              </p>
              <p className="text-xl leading-relaxed tracking-tight text-muted-foreground max-w-md text-left">
                His teachings continue to inspire millions worldwide, emphasizing truth, righteousness, 
                and the pursuit of knowledge through the eternal wisdom of the Vedas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderBiography;
