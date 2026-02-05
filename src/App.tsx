import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DNAPage from "./pages/DNAPage";
import LeiComercialPage from "./pages/LeiComercialPage";
import ICPQualificacaoPage from "./pages/ICPQualificacaoPage";
import ProdutosPage from "./pages/ProdutosPage";
import CRMGovernancaPage from "./pages/CRMGovernancaPage";
import MetricasGestaoPage from "./pages/MetricasGestaoPage";
import ChecklistsPage from "./pages/ChecklistsPage";
import ObjecoesPage from "./pages/ObjecoesPage";
import FollowUpPage from "./pages/FollowUpPage";
// FunilInverso now embedded in MetricasGestaoPage
import MotivosPerdaPage from "./pages/MotivosPerdaPage";
import OnboardingPage from "./pages/OnboardingPage";
import TemplatesPage from "./pages/TemplatesPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dna" element={<DNAPage />} />
          <Route path="/lei-comercial" element={<LeiComercialPage />} />
          <Route path="/icp-qualificacao" element={<ICPQualificacaoPage />} />
          <Route path="/produtos" element={<ProdutosPage />} />
          <Route path="/crm-governanca" element={<CRMGovernancaPage />} />
          <Route path="/metricas-gestao" element={<MetricasGestaoPage />} />
          <Route path="/checklists" element={<ChecklistsPage />} />
          <Route path="/objecoes" element={<ObjecoesPage />} />
          <Route path="/follow-up" element={<FollowUpPage />} />
          {/* Funil Inverso agora está dentro de /metricas-gestao */}
          <Route path="/motivos-perda" element={<MotivosPerdaPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/templates" element={<TemplatesPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
