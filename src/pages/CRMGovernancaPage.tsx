import { AppLayout } from "@/components/layout/AppLayout";
import { PageHero } from "@/components/ui/PageHero";
import { ContentBlock } from "@/components/ui/ContentBlock";
import { CopyButton } from "@/components/ui/CopyButton";

const CRMGovernancaPage = () => {
  const higieneChecklist = `☐ 0 cards sem tarefa agendada
☐ 100% negociação com probabilidade preenchida
☐ 100% negociação com data de fechamento esperada`;

  return (
    <AppLayout>
      <PageHero
        emoji="🧱"
        title="CRM & Governança"
        subtitle="CRM é verdade ou fantasia. Aqui é verdade."
      />

      <div className="space-y-4 max-w-4xl">
        <ContentBlock title="Lei do CRM">
          <div className="p-4 bg-primary-weak/50 rounded-xl border border-primary/20">
            <p className="text-xl font-bold text-foreground">
              "Sem próxima atividade agendada = fora do forecast."
            </p>
          </div>
        </ContentBlock>

        <ContentBlock title="Cores dos Cards (Gestão Visual)">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { color: "bg-primary", label: "Verde", desc: "Tarefa para hoje" },
              { color: "bg-muted", label: "Cinza", desc: "Tarefa futura" },
              { color: "bg-primary-weak", label: "Amarelo", desc: "Sem tarefa" },
              { color: "bg-muted-foreground", label: "Vermelho", desc: "Tarefa atrasada" }
            ].map((item) => (
              <div key={item.label} className="p-4 bg-card rounded-xl border border-border text-center">
                <div className={`w-8 h-8 ${item.color} rounded-lg mx-auto mb-2`} />
                <p className="font-semibold text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </ContentBlock>

        <ContentBlock title="Pipeline SDR/BDR (4 etapas)">
          <div className="flex flex-wrap gap-2">
            {["Lead", "Contato Inicial", "Qualificado", "Reunião Agendada"].map((stage, index, arr) => (
              <div key={stage} className="flex items-center gap-2">
                <div className="px-4 py-2 bg-muted/50 rounded-xl font-medium text-foreground border border-border">
                  {stage}
                </div>
                {index < arr.length - 1 && <span className="text-muted-foreground">→</span>}
              </div>
            ))}
          </div>
        </ContentBlock>

        <ContentBlock title="Agendamento Automático (Lei)">
          <p className="text-foreground">
            SDR confirma ao entrar na etapa "Reunião Agendada" e <strong>envia link 1h antes</strong>.
          </p>
        </ContentBlock>

        <ContentBlock title="Pipeline Closer">
          <div className="flex flex-wrap gap-2">
            {["Reunião Agendada", "Reunião Realizada", "Negociação/Proposta", "Contrato", "Ganho"].map((stage, index, arr) => (
              <div key={stage} className="flex items-center gap-2">
                <div className="px-4 py-2 bg-muted/50 rounded-xl font-medium text-foreground text-sm border border-border">
                  {stage}
                </div>
                {index < arr.length - 1 && <span className="text-muted-foreground">→</span>}
              </div>
            ))}
          </div>
        </ContentBlock>

        <ContentBlock title="Campos Obrigatórios (Lei)">
          <p className="text-foreground mb-3">Para mover para negociação:</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {["Produto", "Valor", "Probabilidade", "Data fechamento esperada"].map((field) => (
              <div key={field} className="p-3 bg-primary-weak/50 rounded-xl text-center border border-primary/20">
                <span className="font-medium text-foreground">{field}</span>
              </div>
            ))}
          </div>
        </ContentBlock>

        <ContentBlock title="No-show (Lei)">
          <div className="p-4 bg-primary-weak/50 rounded-xl border border-primary/20">
            <p className="text-foreground">
              Closer marca atividade como <strong>no-show</strong> → volta para SDR em "Qualificado".
            </p>
          </div>
        </ContentBlock>

        <ContentBlock 
          title="Checklist de Higiene" 
          copyable 
          copyText={higieneChecklist}
        >
          <div className="bg-card border border-border rounded-xl p-4 font-mono text-sm">
            <pre className="whitespace-pre-wrap text-foreground">{higieneChecklist}</pre>
          </div>
        </ContentBlock>
      </div>
    </AppLayout>
  );
};

export default CRMGovernancaPage;
