import { AppLayout } from "@/components/layout/AppLayout";
import { PageHero } from "@/components/ui/PageHero";
import { ContentBlock } from "@/components/ui/ContentBlock";

const MotivosPerdaPage = () => {
  const motivosPrincipais = [
    { motivo: "Timing", desc: "Não é prioridade agora", acao: "Marcar retorno condicional" },
    { motivo: "Budget", desc: "Sem verba aprovada", acao: "Entender ciclo de budget e voltar" },
    { motivo: "Concorrência", desc: "Escolheram outro fornecedor", acao: "Entender critério de decisão para próximos" },
    { motivo: "Inércia", desc: "Preferiram não fazer nada", acao: "Melhorar impacto de não ter no pitch" },
    { motivo: "Sponsor sumiu", desc: "Contato parou de responder", acao: "Abordar por outro caminho ou pausar" },
    { motivo: "Fit técnico", desc: "Não conseguimos atender", acao: "Documentar gap para roadmap" },
    { motivo: "Política interna", desc: "Travou em aprovação", acao: "Mapear stakeholders antes da próxima vez" }
  ];

  const motivosSecundarios = [
    "Preço alto",
    "Funcionalidade faltando",
    "Integração complexa",
    "Riscos de IA",
    "Decisor mudou",
    "Empresa em crise"
  ];

  return (
    <AppLayout>
      <PageHero
        emoji="❌"
        title="Motivos de Perda"
        subtitle="Sem taxonomia, você repete erro."
      />

      <div className="space-y-4 max-w-4xl">
        <ContentBlock title="Taxonomia (1 principal + 1 secundário)">
          <p className="text-muted-foreground mb-4">
            Sempre registrar <strong>1 motivo principal</strong> + <strong>1 motivo secundário</strong> para cada deal perdido.
          </p>
        </ContentBlock>

        <ContentBlock title="Motivos Principais + Ação Corretiva">
          <div className="space-y-3">
            {motivosPrincipais.map((item, index) => (
              <div key={index} className="p-4 bg-secondary/50 rounded-lg">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded">
                        {item.motivo}
                      </span>
                    </div>
                    <p className="text-foreground">{item.desc}</p>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <p className="text-xs text-muted-foreground mb-1">Ação corretiva:</p>
                    <p className="text-sm text-green-700 bg-green-50 px-2 py-1 rounded">{item.acao}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ContentBlock>

        <ContentBlock title="Motivos Secundários">
          <div className="flex flex-wrap gap-2">
            {motivosSecundarios.map((motivo, index) => (
              <span 
                key={index} 
                className="px-3 py-2 bg-secondary rounded-lg text-sm font-medium text-foreground"
              >
                {motivo}
              </span>
            ))}
          </div>
        </ContentBlock>

        <ContentBlock title="Registro Obrigatório">
          <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
            <p className="text-foreground font-medium mb-3">
              Para cada deal perdido, obrigatório registrar:
            </p>
            <ol className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="font-bold text-primary">1.</span>
                <span>Motivo principal (da lista acima)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-primary">2.</span>
                <span>Motivo secundário (se houver)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-primary">3.</span>
                <span>Nota de 2 linhas explicando o contexto</span>
              </li>
            </ol>
          </div>
        </ContentBlock>

        <ContentBlock title="Template de Registro">
          <div className="bg-card border border-border rounded-lg p-4 font-mono text-sm">
            <pre className="whitespace-pre-wrap text-foreground">{`Motivo principal: [Timing/Budget/Concorrência/etc]
Motivo secundário: [Preço/Funcionalidade/etc]

Nota: [O que aconteceu + o que aprendemos + condição de retorno]

Exemplo:
"Sponsor adorou a proposta mas budget já estava comprometido pro ano. Voltar em janeiro quando abrir novo ciclo. Manter relacionamento com conteúdo mensal."`}</pre>
          </div>
        </ContentBlock>
      </div>
    </AppLayout>
  );
};

export default MotivosPerdaPage;
