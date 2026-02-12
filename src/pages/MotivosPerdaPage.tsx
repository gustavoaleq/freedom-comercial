import { AppLayout } from "@/components/layout/AppLayout";
import { PageHero } from "@/components/ui/PageHero";
import { ContentBlock } from "@/components/ui/ContentBlock";

const MotivosPerdaPage = () => {
  const motivosSDR = [
    "Não é prioridade agora",
    "Empresa já cadastrada",
    "Nunca Interagiu",
    "Parou de Interagir",
    "Dados Incorretos",
    "Busca ERP",
    "BPO",
    "Achou caro"
  ];

  const motivosCloserNalk = [
    "Não é prioridade agora",
    "Empresa já cadastrada",
    "Nunca Interagiu",
    "Parou de Interagir",
    "Dados Incorretos",
    "Não tem empresa",
    "Volume de leads abaixo de 100/mês",
    "Não tem CRM",
    "CRM sem integração"
  ];

  return (
    <AppLayout>
      <PageHero
        emoji="❌"
        title="Motivos de Perda"
        subtitle="Sem taxonomia, você repete erro."
      />

      <div className="space-y-4 max-w-4xl">
        <ContentBlock title="Motivos de Perda — Etapas SDR FREEDOM">
          <p className="text-muted-foreground mb-4">
            Selecione o motivo ao marcar um negócio como perdido nas etapas de SDR.
          </p>
          <div className="space-y-2">
            {motivosSDR.map((motivo, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                <span className="w-6 h-6 rounded-full border-2 border-muted-foreground/30 flex-shrink-0" />
                <span className="text-foreground font-medium">{motivo}</span>
              </div>
            ))}
          </div>
        </ContentBlock>

        <ContentBlock title="Motivos de Perda — Etapas SDR NALK">
          <p className="text-muted-foreground mb-4">
            Selecione o motivo ao marcar um negócio como perdido nas etapas de SDR NALK.
          </p>
          <div className="space-y-2">
            {motivosCloserNalk.map((motivo, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                <span className="w-6 h-6 rounded-full border-2 border-muted-foreground/30 flex-shrink-0" />
                <span className="text-foreground font-medium">{motivo}</span>
              </div>
            ))}
          </div>
        </ContentBlock>

        <ContentBlock title="Template de Registro">
          <div className="bg-card border border-border rounded-lg p-4 font-mono text-sm">
            <pre className="whitespace-pre-wrap text-foreground">{`Motivo da Perda: [Não é prioridade agora / Empresa já cadastrada / Nunca Interagiu / Parou de Interagir / Dados Incorretos / Busca ERP / BPO / Achou caro]

Nota (opcional): [O que aconteceu + condição de retorno]

Exemplo:
"Lead nunca respondeu após 7 tentativas de contato por diferentes canais. Marcar como Nunca Interagiu."`}</pre>
          </div>
        </ContentBlock>
      </div>
    </AppLayout>
  );
};

export default MotivosPerdaPage;
