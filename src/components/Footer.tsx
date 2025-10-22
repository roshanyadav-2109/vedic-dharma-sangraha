const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Logo and Description */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full sacred-gradient flex items-center justify-center">
                  <span className="text-xl font-bold text-primary-foreground">ॐ</span>
                </div>
                <h3 className="text-xl font-bold font-devanagari text-gradient">
                  वैदिक हवन पद्धति
                </h3>
              </div>
              <p className="text-sm font-devanagari text-muted-foreground leading-relaxed">
                सनातन धर्म की शाश्वत परंपरा और वैदिक ज्ञान का पवित्र संग्रह
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold font-devanagari text-foreground mb-4">त्वरित लिंक</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#home" className="text-sm font-devanagari text-muted-foreground hover:text-primary transition-colors">
                    मुख्य पृष्ठ
                  </a>
                </li>
                <li>
                  <a href="#mantras" className="text-sm font-devanagari text-muted-foreground hover:text-primary transition-colors">
                    मंत्र संग्रह
                  </a>
                </li>
                <li>
                  <a href="#havan" className="text-sm font-devanagari text-muted-foreground hover:text-primary transition-colors">
                    हवन विधि
                  </a>
                </li>
                <li>
                  <a href="#about" className="text-sm font-devanagari text-muted-foreground hover:text-primary transition-colors">
                    परिचय
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold font-devanagari text-foreground mb-4">संपर्क</h4>
              <div className="space-y-2 text-sm font-devanagari text-muted-foreground">
                <p>वैदिक विचार मंच</p>
                <p>सिद्धि प्लाजा, बड़ीवान रोड</p>
                <p>सिलीगुड़ी</p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-border">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm font-devanagari text-muted-foreground text-center md:text-left">
                © 2025 वैदिक हवन पद्धति। सर्वाधिकार सुरक्षित।
              </p>
              <div className="flex items-center gap-4">
                <p className="text-sm font-sanskrit text-primary">
                  ॐ ���ान्तिः शान्तिः शान्तिः
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
