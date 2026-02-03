import { AppLayout } from "@/components/layout/AppLayout";
import { PageHero } from "@/components/ui/PageHero";
import { ContentBlock } from "@/components/ui/ContentBlock";

const MetricasGestaoPage = () => {
  return (
    <AppLayout>
      <PageHero
        emoji="📊"
        title="Métricas & Gestão"
        subtitle="Sem placar, vira opinião. Opinião não bate meta."
      />

      <div className="space-y-4 max-w-4xl">
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

        <ContentBlock title="Régua de Probabilidade (Padrão Sugerido)">
          <div className="space-y-2">
            {[
              { etapa: "Agendada", prob: "10–20%" },
              { etapa: "Realizada", prob: "30–40%" },
              { etapa: "Proposta", prob: "50–60%" },
              { etapa: "Negociação ativa", prob: "70–80%" },
              { etapa: "Contrato", prob: "85–95%" }
            ].map((item) => (
              <div key={item.etapa} className="flex items-center justify-between p-3 bg-muted/50 rounded-xl border border-border">
                <span className="font-medium text-foreground">{item.etapa}</span>
                <span className="px-3 py-1 bg-primary text-primary-foreground rounded-lg text-sm font-medium">
                  {item.prob}
                </span>
              </div>
            ))}
          </div>
        </ContentBlock>

        <ContentBlock title="Conversões Oficiais">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-card rounded-xl border border-border">
              <p className="text-sm text-muted-foreground mb-1">Closer</p>
              <p className="font-semibold text-foreground">Realizada → Ganho</p>
            </div>
            <div className="p-4 bg-card rounded-xl border border-border">
              <p className="text-sm text-muted-foreground mb-1">SDR/BDR</p>
              <p className="font-semibold text-foreground">MQL → Realizada</p>
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
