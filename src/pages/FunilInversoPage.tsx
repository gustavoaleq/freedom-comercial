import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHero } from "@/components/ui/PageHero";
import { ContentBlock } from "@/components/ui/ContentBlock";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator } from "lucide-react";

const FunilInversoPage = () => {
  const [meta, setMeta] = useState("");
  const [ticketMedio, setTicketMedio] = useState("");
  const [winRate, setWinRate] = useState("");
  const [showRate, setShowRate] = useState("");
  const [mqlRate, setMqlRate] = useState("");

  const [resultado, setResultado] = useState<{
    ganhos: number;
    propostas: number;
    reunioes: number;
    agendadas: number;
    mqls: number;
    leads: number;
    semana: {
      mqls: number;
      agendamentos: number;
    };
  } | null>(null);

  const calcular = () => {
    const metaNum = parseFloat(meta) || 0;
    const ticketNum = parseFloat(ticketMedio) || 1;
    const winRateNum = (parseFloat(winRate) || 30) / 100;
    const showRateNum = (parseFloat(showRate) || 80) / 100;
    const mqlRateNum = (parseFloat(mqlRate) || 20) / 100;

    const ganhos = Math.ceil(metaNum / ticketNum);
    const propostas = Math.ceil(ganhos / winRateNum);
    const reunioes = propostas;
    const agendadas = Math.ceil(reunioes / showRateNum);
    const mqls = Math.ceil(agendadas / mqlRateNum);
    const leads = Math.ceil(mqls / 0.1);

    setResultado({
      ganhos,
      propostas,
      reunioes,
      agendadas,
      mqls,
      leads,
      semana: {
        mqls: Math.ceil(mqls / 4),
        agendamentos: Math.ceil(agendadas / 4)
      }
    });
  };

  return (
    <AppLayout>
      <PageHero
        emoji="🧮"
        title="Funil Inverso"
        subtitle="Meta não se deseja. Meta se calcula."
      />

      <div className="space-y-4 max-w-4xl">
        <ContentBlock title="Método">
          <div className="flex flex-wrap items-center gap-2 text-sm">
            {["Meta", "Ganhos", "Pipeline", "Reuniões", "MQL", "Leads"].map((step, index, arr) => (
              <div key={step} className="flex items-center gap-2">
                <div className="px-3 py-1.5 bg-muted/50 rounded-xl font-medium text-foreground border border-border">
                  {step}
                </div>
                {index < arr.length - 1 && <span className="text-muted-foreground">←</span>}
              </div>
            ))}
          </div>
          <p className="mt-4 text-muted-foreground">
            Começamos pela meta e voltamos calculando quanto precisamos em cada etapa do funil.
          </p>
        </ContentBlock>

        <ContentBlock title="Calculadora de Funil Inverso" collapsible={false}>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Meta mensal (R$)</label>
                <Input
                  type="number"
                  placeholder="Ex: 500000"
                  value={meta}
                  onChange={(e) => setMeta(e.target.value)}
                  className="bg-card border-border focus-visible:ring-primary"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Ticket médio (R$)</label>
                <Input
                  type="number"
                  placeholder="Ex: 50000"
                  value={ticketMedio}
                  onChange={(e) => setTicketMedio(e.target.value)}
                  className="bg-card border-border focus-visible:ring-primary"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Win rate (%)</label>
                <Input
                  type="number"
                  placeholder="Ex: 30"
                  value={winRate}
                  onChange={(e) => setWinRate(e.target.value)}
                  className="bg-card border-border focus-visible:ring-primary"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Show rate (%)</label>
                <Input
                  type="number"
                  placeholder="Ex: 80"
                  value={showRate}
                  onChange={(e) => setShowRate(e.target.value)}
                  className="bg-card border-border focus-visible:ring-primary"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">MQL → Agendado (%)</label>
                <Input
                  type="number"
                  placeholder="Ex: 20"
                  value={mqlRate}
                  onChange={(e) => setMqlRate(e.target.value)}
                  className="bg-card border-border focus-visible:ring-primary"
                />
              </div>
            </div>

            <Button onClick={calcular} className="w-full md:w-auto bg-primary hover:bg-primary-hover text-primary-foreground">
              <Calculator className="w-4 h-4 mr-2" />
              Calcular Funil
            </Button>

            {resultado && (
              <div className="mt-6 p-6 bg-primary-weak/30 rounded-2xl border border-primary/20">
                <h4 className="text-lg font-bold text-foreground mb-4">Resultado do Funil</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-card rounded-xl border border-border">
                    <p className="text-2xl font-bold text-foreground">{resultado.ganhos}</p>
                    <p className="text-sm text-muted-foreground">Deals ganhos</p>
                  </div>
                  <div className="text-center p-4 bg-card rounded-xl border border-border">
                    <p className="text-2xl font-bold text-foreground">{resultado.propostas}</p>
                    <p className="text-sm text-muted-foreground">Propostas</p>
                  </div>
                  <div className="text-center p-4 bg-card rounded-xl border border-border">
                    <p className="text-2xl font-bold text-foreground">{resultado.reunioes}</p>
                    <p className="text-sm text-muted-foreground">Reuniões realizadas</p>
                  </div>
                  <div className="text-center p-4 bg-card rounded-xl border border-border">
                    <p className="text-2xl font-bold text-foreground">{resultado.agendadas}</p>
                    <p className="text-sm text-muted-foreground">Reuniões agendadas</p>
                  </div>
                  <div className="text-center p-4 bg-card rounded-xl border border-border">
                    <p className="text-2xl font-bold text-foreground">{resultado.mqls}</p>
                    <p className="text-sm text-muted-foreground">MQLs</p>
                  </div>
                  <div className="text-center p-4 bg-card rounded-xl border border-border">
                    <p className="text-2xl font-bold text-foreground">{resultado.leads}</p>
                    <p className="text-sm text-muted-foreground">Leads</p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-primary-weak/50 rounded-xl border border-primary/20">
                  <h5 className="font-semibold text-foreground mb-2">📅 Meta Semanal</h5>
                  <p className="text-foreground">
                    <strong>{resultado.semana.mqls} MQLs</strong> e <strong>{resultado.semana.agendamentos} agendamentos</strong> por semana
                  </p>
                </div>
              </div>
            )}
          </div>
        </ContentBlock>

        <ContentBlock title="Plano Semanal">
          <div className="p-4 bg-muted/50 rounded-xl border border-border">
            <p className="text-foreground mb-3">
              Divida a meta mensal por 4 semanas e acompanhe:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Quantos MQLs gerar por semana?</li>
              <li>• Quantos agendamentos fechar por semana?</li>
              <li>• Quantas reuniões realizar por semana?</li>
              <li>• Está no ritmo? Se não, o que precisa mudar?</li>
            </ul>
          </div>
        </ContentBlock>
      </div>
    </AppLayout>
  );
};

export default FunilInversoPage;
