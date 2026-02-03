import { AppLayout } from "@/components/layout/AppLayout";
import { PageHero } from "@/components/ui/PageHero";
import { ContentBlock } from "@/components/ui/ContentBlock";
import { Check, X } from "lucide-react";

const DNAPage = () => {
  return (
    <AppLayout>
      <PageHero
        emoji="🧬"
        title="DNA Freedom"
        subtitle="Aqui, a gente não vende IA. A gente vende resultado com execução, governança e caixa."
      />

      <div className="space-y-4 max-w-4xl">
        <ContentBlock title="Quem somos em 20 segundos">
          <p className="text-lg">
            A Freedom coloca <strong className="text-foreground">agentes de IA que executam processos reais</strong> e geram resultado mensurável.
          </p>
        </ContentBlock>

        <ContentBlock title="Tese comercial">
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <span><strong className="text-foreground">Cliente compra impacto, não tecnologia.</strong></span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <span><strong className="text-foreground">Processo repetitivo + volume + dados = ROI rápido.</strong></span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <span><strong className="text-foreground">Projeto que não vira padrão = consultoria disfarçada</strong> (não queremos).</span>
            </li>
          </ul>
        </ContentBlock>

        <ContentBlock title="Valores inegociáveis">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              "Cliente em primeiro lugar",
              "Entrega > discurso",
              "Autonomia & responsabilidade",
              "Disciplina e excelência",
              "Movimento constante"
            ].map((value, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl border border-border">
                <div className="w-8 h-8 rounded-lg bg-primary-weak flex items-center justify-center">
                  <span className="text-foreground font-bold text-sm">{index + 1}</span>
                </div>
                <span className="font-medium text-foreground">{value}</span>
              </div>
            ))}
          </div>
        </ContentBlock>

        <ContentBlock title="Comportamentos esperados (SIM ✅)">
          <ul className="space-y-2">
            {[
              "Assume dono do problema e da solução",
              "Comunica cedo — boas e más notícias",
              "Simplifica — menos slides, mais clareza",
              "CRM é verdade — sem maquiagem",
              "Cada ação move decisão — ou não faz"
            ].map((behavior, index) => (
              <li key={index} className="flex items-start gap-3 p-2 rounded-lg hover:bg-primary-weak/30 transition-colors">
                <div className="w-5 h-5 rounded-full bg-primary-weak flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-foreground" />
                </div>
                <span className="text-foreground">{behavior}</span>
              </li>
            ))}
          </ul>
        </ContentBlock>

        <ContentBlock title="Comportamentos proibidos (NÃO ❌)">
          <ul className="space-y-2">
            {[
              "Sumir sem dar status",
              "Follow-up pedindo retorno sem valor novo",
              "Card sem tarefa no CRM",
              "Proposta sem impacto de não ter",
              "Falar de feature antes de entender dor"
            ].map((behavior, index) => (
              <li key={index} className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                  <X className="w-3 h-3 text-muted-foreground" />
                </div>
                <span className="text-foreground">{behavior}</span>
              </li>
            ))}
          </ul>
        </ContentBlock>
      </div>
    </AppLayout>
  );
};

export default DNAPage;
