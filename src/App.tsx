
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChallengeProvider } from "./context/ChallengeContext";

import Index from "./pages/Index";
import Whiteboard from "./pages/Whiteboard";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Evaluation from "./pages/Evaluation";

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
                <Route path="/whiteboard/:challengeId" element={<Whiteboard />} />
                <Route path="/evaluation/:challengeId" element={<Evaluation />} />
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
