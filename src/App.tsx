import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import RitualPage from "./pages/RitualPage";
import BhajansIndex from "./pages/BhajansIndex";
import BhajanDetail from "./pages/BhajanDetail";
import FestivalPage from "./pages/FestivalPage";
import MantrasLibrary from "./pages/MantrasLibrary";
import DonatePage from "./pages/DonatePage";
import StaticPage from "./pages/StaticPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/rituals/:slug" element={<RitualPage />} />
          <Route path="/bhajans" element={<BhajansIndex />} />
          <Route path="/bhajans/:id" element={<BhajanDetail />} />
          <Route path="/festivals/:slug" element={<FestivalPage />} />
          
          {/* UPDATED ROUTES FOR MANTRAS */}
          <Route path="/mantras" element={<MantrasLibrary />} />
          <Route path="/mantras/:category" element={<MantrasLibrary />} />

          <Route path="/donate" element={<DonatePage />} />
          <Route path="/:slug" element={<StaticPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
