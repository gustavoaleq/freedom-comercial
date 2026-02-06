import { AppLayout } from "@/components/layout/AppLayout";
import { PageHero } from "@/components/ui/PageHero";
import { ContentBlock } from "@/components/ui/ContentBlock";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalculadoraProbabilidade } from "@/components/calculadora/CalculadoraProbabilidade";
import { CalculadoraFunilInverso } from "@/components/calculadora/CalculadoraFunilInverso";
import { CalculadoraROI } from "@/components/calculadora/CalculadoraROI";

const MetricasGestaoPage = () => {
  return (
    <AppLayout>
      <PageHero
        emoji="📊"
        title="Métricas & Gestão"
        subtitle="Sem placar, vira opinião. Opinião não bate meta."
      />

      <div className="space-y-6 max-w-5xl">
        <ContentBlock title="Forecast (Lei)">
          <div className="p-4 bg-primary-weak/50 rounded-xl border border-primary/20 space-y-2">
            <p className="text-foreground font-medium">
              Forecast mensal = soma (Valor × Probabilidade)
            </p>
            <p className="text-muted-foreground">
              Só entra se data de fechamento esperada estiver dentro do mês.
            </p>
          </div>
        </ContentBlock>

        {/* Seção Calculadoras com Tabs */}
        <ContentBlock title="🧮 Calculadoras" collapsible={false}>
          <Tabs defaultValue="funil-inverso" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="funil-inverso">Funil Inverso</TabsTrigger>
              <TabsTrigger value="roi-payback">ROI & Payback</TabsTrigger>
              <TabsTrigger value="probabilidade">Probabilidade</TabsTrigger>
            </TabsList>

            <TabsContent value="funil-inverso">
              <CalculadoraFunilInverso />
            </TabsContent>

            <TabsContent value="roi-payback">
              <CalculadoraROI />
            </TabsContent>

            <TabsContent value="probabilidade">
              <CalculadoraProbabilidade />
            </TabsContent>
          </Tabs>
        </ContentBlock>

        <ContentBlock title="Métricas Avaliadas">
          <div className="space-y-6">
            {/* SDR */}
            <div>
              <p className="font-semibold text-foreground mb-3">SDR</p>
              <div className="space-y-2">
                {[
                  { de: "Lead", para: "Contato Inicial", metrica: "Tempo de uma etapa para outra" },
                  { de: "Contato Inicial", para: "Qualificado", metrica: "Taxa de MQL para SQL" },
                  { de: "Qualificado", para: "Reunião Agendada", metrica: "Taxa de SQL para agendamento" },
                  { de: "Reunião Agendada", para: "Reunião Realizada", metrica: "Taxa de no-show" },
                  { de: "MQL", para: "Reunião Realizada Validada", metrica: "Taxa de conversão do SDR" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl border border-border text-sm">
                    <span className="font-medium text-foreground whitespace-nowrap">{item.de} → {item.para}</span>
                    <span className="text-muted-foreground">— {item.metrica}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CLOSER */}
            <div>
              <p className="font-semibold text-foreground mb-3">Closer</p>
              <div className="space-y-2">
                {[
                  { de: "Reunião Realizada Válida", para: "Negociação/Proposta", metrica: "Taxa de evolução" },
                  { de: "Negociação/Proposta", para: "Contrato", metrica: "Taxa de evolução" },
                  { de: "Contrato", para: "Ganho", metrica: "Receita" },
                  { de: "Reunião Realizada Válida", para: "Ganho", metrica: "Taxa de conversão do Closer" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl border border-border text-sm">
                    <span className="font-medium text-foreground whitespace-nowrap">{item.de} → {item.para}</span>
                    <span className="text-muted-foreground">— {item.metrica}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* PERDIDO */}
            <div>
              <p className="font-semibold text-foreground mb-3">Perdido</p>
              <div className="space-y-2">
                <div className="p-3 bg-muted/50 rounded-xl border border-border text-sm">
                  <span className="font-medium text-foreground">Lead + Contato Inicial + Qualificado + Reunião Agendada</span>
                  <span className="text-muted-foreground"> — Motivo de perdido SDR</span>
                </div>
                <div className="p-3 bg-muted/50 rounded-xl border border-border text-sm">
                  <span className="font-medium text-foreground">Reunião Realizada + Negociação/Proposta + Contrato</span>
                  <span className="text-muted-foreground"> — Motivo de perdido Closer</span>
                </div>
              </div>
            </div>
          </div>
        </ContentBlock>

        <ContentBlock title="KPIs SDR/BDR">
          <div className="space-y-3">
            {[
              { kpi: "Contato por tentativa", mede: "Eficiência de alcance", corrige: "Melhorar horários e canais" },
              { kpi: "MQL rate", mede: "Qualidade da base", corrige: "Refinar ICP e fonte de leads" },
              { kpi: "Show rate", mede: "Qualidade do agendamento", corrige: "Melhorar confirmação e valor percebido" },
              { kpi: "Tempo até agendar", mede: "Velocidade de conversão", corrige: "Reduzir toques, aumentar urgência" },
              { kpi: "Conversão MQL→Realizada", mede: "Efetividade do SDR", corrige: "Treinar qualificação e objeções" }
            ].map((item, index) => (
              <div key={index} className="p-4 bg-muted/50 rounded-xl border border-border">
                <p className="font-semibold text-foreground mb-2">{item.kpi}</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">O que mede:</p>
                    <p className="text-foreground">{item.mede}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Como corrigir:</p>
                    <p className="text-foreground">{item.corrige}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ContentBlock>

        <ContentBlock title="KPIs Closer">
          <div className="space-y-3">
            {[
              { kpi: "Win rate", mede: "Efetividade de fechamento", corrige: "Melhorar diagnóstico e negociação" },
              { kpi: "Ciclo médio", mede: "Velocidade de venda", corrige: "Antecipar objeções, acelerar decisão" },
              { kpi: "Proposta→Negociação ativa", mede: "Qualidade da proposta", corrige: "Melhorar ROI e impacto de não ter" },
              { kpi: "Precisão forecast", mede: "Previsibilidade", corrige: "Disciplina de probabilidade e data" },
              { kpi: "Lost reasons", mede: "Padrão de perda", corrige: "Ações corretivas por motivo" }
            ].map((item, index) => (
              <div key={index} className="p-4 bg-muted/50 rounded-xl border border-border">
                <p className="font-semibold text-foreground mb-2">{item.kpi}</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">O que mede:</p>
                    <p className="text-foreground">{item.mede}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Como corrigir:</p>
                    <p className="text-foreground">{item.corrige}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ContentBlock>

        <ContentBlock title="Higiene do CRM (Meta 0/100)">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: "% cards sem tarefa", meta: "= 0" },
              { label: "% negociação sem data", meta: "= 0" },
              { label: "% negociação sem prob", meta: "= 0" }
            ].map((item) => (
              <div key={item.label} className="p-4 bg-primary-weak/50 rounded-xl border border-primary/20 text-center">
                <p className="text-sm text-foreground mb-1">{item.label}</p>
                <p className="text-2xl font-bold text-foreground">{item.meta}</p>
              </div>
            ))}
          </div>
        </ContentBlock>

        <ContentBlock title="Rotinas">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-card rounded-xl border border-border">
              <p className="font-semibold text-foreground mb-2">Diário (15 min)</p>
              <p className="text-sm text-muted-foreground">Revisão de tarefas do dia, cards críticos</p>
            </div>
            <div className="p-4 bg-card rounded-xl border border-border">
              <p className="font-semibold text-foreground mb-2">Semanal (60 min)</p>
              <p className="text-sm text-muted-foreground">Top 10 deals, forecast, lost, funil inverso</p>
            </div>
          </div>
        </ContentBlock>
      </div>
    </AppLayout>
  );
};

export default MetricasGestaoPage;
