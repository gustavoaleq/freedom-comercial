import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHero } from "@/components/ui/PageHero";
import { ContentBlock } from "@/components/ui/ContentBlock";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator, AlertCircle } from "lucide-react";

const FunilInversoPage = () => {
  const [meta, setMeta] = useState("");
  const [ticketMedio, setTicketMedio] = useState("");
  const [txLeadMql, setTxLeadMql] = useState("");
  const [txMqlReuniao, setTxMqlReuniao] = useState("");
  const [txReuniaoGanho, setTxReuniaoGanho] = useState("");
  const [erro, setErro] = useState("");

  const [resultado, setResultado] = useState<{
    vendasNecessarias: number;
    reunioesNecessarias: number;
    mqlsNecessarios: number;
    leadsNecessarios: number;
  } | null>(null);

  const calcular = () => {
    setErro("");
    setResultado(null);

    const metaNum = parseFloat(meta) || 0;
    const ticketNum = parseFloat(ticketMedio) || 0;
    const txLeadMqlNum = parseFloat(txLeadMql) || 0;
    const txMqlReuniaoNum = parseFloat(txMqlReuniao) || 0;
    const txReuniaoGanhoNum = parseFloat(txReuniaoGanho) || 0;

    // Validação
    if (ticketNum <= 0 || txLeadMqlNum <= 0 || txMqlReuniaoNum <= 0 || txReuniaoGanhoNum <= 0) {
      setErro("Preencha Ticket e todas as taxas com valores > 0.");
      return;
    }

    // Fórmulas
    const vendasNecessarias = metaNum / ticketNum;
    const reunioesNecessarias = Math.ceil(vendasNecessarias / (txReuniaoGanhoNum / 100));
    const mqlsNecessarios = Math.ceil(reunioesNecessarias / (txMqlReuniaoNum / 100));
    const leadsNecessarios = Math.ceil(mqlsNecessarios / (txLeadMqlNum / 100));

    setResultado({
      vendasNecessarias,
      reunioesNecessarias,
      mqlsNecessarios,
      leadsNecessarios
    });
  };

  const formatarMoeda = (valor: number) => {
    return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
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
            {["Meta", "Vendas", "Reuniões", "MQLs", "Leads"].map((step, index, arr) => (
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
                <label className="text-sm font-medium text-foreground mb-2 block">Lead → MQL (%)</label>
                <Input
                  type="number"
                  placeholder="Ex: 20"
                  value={txLeadMql}
                  onChange={(e) => setTxLeadMql(e.target.value)}
                  className="bg-card border-border focus-visible:ring-primary"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">MQL → Reunião Realizada (%)</label>
                <Input
                  type="number"
                  placeholder="Ex: 50"
                  value={txMqlReuniao}
                  onChange={(e) => setTxMqlReuniao(e.target.value)}
                  className="bg-card border-border focus-visible:ring-primary"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Reunião Realizada → Ganho (%)</label>
                <Input
                  type="number"
                  placeholder="Ex: 30"
                  value={txReuniaoGanho}
                  onChange={(e) => setTxReuniaoGanho(e.target.value)}
                  className="bg-card border-border focus-visible:ring-primary"
                />
              </div>
            </div>

            {erro && (
              <div className="flex items-center gap-2 p-4 bg-destructive/10 border border-destructive/20 rounded-xl text-destructive">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p className="text-sm font-medium">{erro}</p>
              </div>
            )}

            <Button onClick={calcular} className="w-full md:w-auto bg-primary hover:bg-primary-hover text-primary-foreground">
              <Calculator className="w-4 h-4 mr-2" />
              Calcular Funil
            </Button>

            {resultado && (
              <div className="mt-6 p-6 bg-primary-weak/30 rounded-2xl border border-primary/20">
                <h4 className="text-lg font-bold text-foreground mb-4">Resultado do Funil</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="text-center p-6 bg-card rounded-xl border border-border shadow-sm">
                    <p className="text-3xl font-bold text-foreground">{resultado.leadsNecessarios.toLocaleString("pt-BR")}</p>
                    <p className="text-sm text-muted-foreground mt-1">Leads necessários</p>
                  </div>
                  <div className="text-center p-6 bg-card rounded-xl border border-border shadow-sm">
                    <p className="text-3xl font-bold text-foreground">{resultado.mqlsNecessarios.toLocaleString("pt-BR")}</p>
                    <p className="text-sm text-muted-foreground mt-1">MQLs necessários</p>
                  </div>
                  <div className="text-center p-6 bg-card rounded-xl border border-border shadow-sm">
                    <p className="text-3xl font-bold text-foreground">{resultado.reunioesNecessarias.toLocaleString("pt-BR")}</p>
                    <p className="text-sm text-muted-foreground mt-1">Reuniões realizadas necessárias</p>
                  </div>
                </div>

                <div className="text-center p-3 bg-muted/50 rounded-xl border border-border">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Vendas necessárias:</span>{" "}
                    {resultado.vendasNecessarias.toFixed(2).replace(".", ",")} vendas ({formatarMoeda(parseFloat(meta) || 0)} ÷ {formatarMoeda(parseFloat(ticketMedio) || 0)})
                  </p>
                </div>

                <div className="mt-5 p-4 bg-primary-weak/50 rounded-xl border border-primary/20">
                  <p className="text-foreground text-sm font-medium italic text-center">
                    "Se você não tem esses volumes, você não bate a meta. O funil é matemática — agora você sabe onde atacar."
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
              <li>• Quantos Leads gerar por semana?</li>
              <li>• Quantos MQLs qualificar por semana?</li>
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
