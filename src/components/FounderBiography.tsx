import { Badge } from "@/components/ui/badge";

const FounderBiography = () => {
  return (
    <section className="w-full py-20 lg:py-40 bg-muted/30">
      {/* Removed px-2 from the container div */}
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-8 items-center lg:grid-cols-2">
          {/* Image Section */}
          <div className="bg-muted rounded-md aspect-[4/5] overflow-hidden temple-shadow">
            <img
              src="https://source.unsplash.com/random/500x600?portrait,hindu,sage"
              alt="Maharshi Dayanand Saraswati"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Text Content Section */}
          <div className="flex gap-4 flex-col">
            <div>
              <Badge variant="outline">1824 - 1883</Badge>
            </div>
            <div className="flex gap-4 flex-col">
              <h1 className="text-5xl md:text-7xl max-w-lg tracking-tighter text-left font-regular text-gradient">
                Maharshi Dayanand Saraswati
              </h1>
              <p className="text-lg font-devanagari text-muted-foreground mb-4">
                महर्षि दयानन्द सरस्वती
              </p>
              {/* Added mb-6 (margin-bottom) to each paragraph for more spacing */}
              <p className="text-xl leading-relaxed tracking-tight text-muted-foreground max-w-md text-left mb-6">
                Born as Mool Shankar Tiwari in 1824 in Gujarat, Maharshi Dayanand Saraswati was a profound
                scholar and social reformer who dedicated his life to reviving Vedic wisdom and eradicating
                social evils from Hindu society.
              </p>
              <p className="text-xl leading-relaxed tracking-tight text-muted-foreground max-w-md text-left mb-6">
                After years of rigorous study and spiritual practice, he founded Arya Samaj in Mumbai in 1875
                with the mission to propagate Vedic knowledge and reform society. His clarion call "Back to the Vedas"
                resonated across India.
              </p>
              <p className="text-xl leading-relaxed tracking-tight text-muted-foreground max-w-md text-left mb-6">
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
