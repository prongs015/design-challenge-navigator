
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChallengeProvider } from "./context/ChallengeContext";

import Index from "./pages/Index";
import Challenge from "./pages/Challenge";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Companies from "./pages/Companies";
import Whiteboard from "./pages/Whiteboard";
import Submit from "./pages/Submit";
import Progress from "./pages/Progress";
import Navbar from "./components/Navbar";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ChallengeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/challenge/:companyId" element={<Challenge />} />
                <Route path="/challenge/:companyId/:challengeId/whiteboard" element={<Whiteboard />} />
                <Route path="/challenge/:companyId/:challengeId/submit" element={<Submit />} />
                <Route path="/companies" element={<Companies />} />
                <Route path="/progress" element={<Progress />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </ChallengeProvider>
  </QueryClientProvider>
);

export default App;
