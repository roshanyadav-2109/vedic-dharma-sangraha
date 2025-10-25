import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CoreTenets = () => {
  const principles = [
    "God is the primary source of all true knowledge and of everything known by its means.",
    "God is All-truth, All-knowledge, Almighty, Immortal, Creator of the Universe, worthy of worship.",
    "The Vedas are the books of true knowledge and it is the paramount duty of all Aryas to read, teach, recite and hear them being read.",
    "An Arya should always be ready to accept truth and renounce untruth.",
    "All actions should be performed in accordance with Dharma, i.e., after due consideration of right and wrong.",
    "The primary objective of Arya Samaj is to do good to the whole world, i.e., physical, spiritual and social progress of all humans.",
    "All should be treated with love, justice and due merit.",
    "Ignorance should be dispelled and knowledge should be promoted.",
    "No one should remain content with his/her own welfare alone, but should look for his/her welfare in the welfare of all.",
    "All men should abide by the rules which regulate the well-being of all, whereas in following rules of individual welfare, all are free."
  ];

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gradient">
          The Ten Principles of Arya Samaj
        </h2>
        <Card className="temple-shadow max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-devanagari">आर्य समाज के दस नियम</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-4 text-muted-foreground leading-relaxed">
              {principles.map((principle, index) => (
                <li key={index} className="flex gap-4">
                  <span className="font-bold text-primary text-xl min-w-[2rem]">{index + 1}.</span>
                  <span>{principle}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CoreTenets;
