import { AppLayout } from "@/components/layout/AppLayout";
import { PageHero } from "@/components/ui/PageHero";
import { ContentBlock } from "@/components/ui/ContentBlock";
import { CopyButton } from "@/components/ui/CopyButton";

const ObjecoesPage = () => {
  const objecoes = [
    {
      objecao: "Tá caro",
      resposta: "Entendo. Vamos voltar pro impacto: quanto vocês perdem por mês com isso?",
      pergunta: "Se o investimento se pagar em X meses, ainda parece caro?",
      impacto: "Cada mês que passa são R$ [X] jogados fora.",
      proximoPasso: "Revisar ROI juntos e recalcular payback"
    },
    {
      objecao: "Já tenho automação/RPA",
      resposta: "Ótimo! RPA é bom pra tarefas simples. Onde ele não consegue decidir sozinho?",
      pergunta: "Qual processo hoje depende de alguém olhar e decidir?",
      impacto: "RPA faz, IA decide. São camadas diferentes.",
      proximoPasso: "Mapear gaps do RPA atual"
    },
    {
      objecao: "Preciso falar com TI/jurídico",
      resposta: "Faz sentido. Posso preparar um resumo técnico/jurídico pra facilitar?",
      pergunta: "O que eles vão querer saber? Segurança, integração, compliance?",
      impacto: "Quanto tempo essa aprovação costuma levar?",
      proximoPasso: "Agendar call técnica de 20 min com TI"
    },
    {
      objecao: "IA dá risco",
      resposta: "Concordo que IA mal implementada dá risco. Por isso a gente começa com piloto controlado.",
      pergunta: "Qual risco específico te preocupa mais? Erro, viés, compliance?",
      impacto: "O risco de não fazer nada também existe — e cresce todo mês.",
      proximoPasso: "Apresentar cases de mitigação de risco"
    },
    {
      objecao: "Vamos pensar",
      resposta: "Entendo. O que especificamente vocês precisam pensar?",
      pergunta: "É timing, budget, ou alguma preocupação que a gente não endereçou?",
      impacto: "Enquanto vocês pensam, o problema continua custando R$ [X]/mês.",
      proximoPasso: "Definir data de retorno e condição de decisão"
    },
    {
      objecao: "Manda mais detalhe",
      resposta: "Claro. Qual detalhe específico você precisa pra avançar?",
      pergunta: "É técnico, comercial, ou case de referência?",
      impacto: "Fico preocupado de mandar material que não responde a dúvida real.",
      proximoPasso: "Entender dúvida real antes de enviar material"
    },
    {
      objecao: "Concorrente mais barato",
      resposta: "Faz sentido comparar. O que exatamente eles entregam pelo preço?",
      pergunta: "Eles garantem o mesmo SLA, suporte e resultado?",
      impacto: "Barato que não funciona sai caro. Já passaram por isso antes?",
      proximoPasso: "Fazer comparativo técnico lado a lado"
    }
  ];

  return (
    <AppLayout>
      <PageHero
        emoji="🛡️"
        title="Objeções"
        subtitle="Objeção é falta de clareza. Clareza se resolve com pergunta."
      />

      <div className="space-y-4 max-w-4xl">
        <ContentBlock title="Estrutura Fixa de Resposta">
          <div className="flex flex-wrap gap-2">
            {["Resposta curta", "Pergunta que destrava", "Impacto de não ter", "Próximo passo"].map((step, index, arr) => (
              <div key={step} className="flex items-center gap-2">
                <div className="px-4 py-2 bg-primary text-primary-foreground rounded-xl font-medium text-sm">
                  {index + 1}. {step}
                </div>
                {index < arr.length - 1 && <span className="text-muted-foreground">→</span>}
              </div>
            ))}
          </div>
        </ContentBlock>

        <ContentBlock title="Biblioteca de Objeções" collapsible={false}>
          <div className="space-y-4">
            {objecoes.map((item, index) => (
              <div key={index} className="p-5 bg-card rounded-2xl border border-border">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-bold text-foreground">"{item.objecao}"</h4>
                  <CopyButton 
                    text={`Objeção: ${item.objecao}\n\nResposta: ${item.resposta}\n\nPergunta: ${item.pergunta}\n\nImpacto: ${item.impacto}\n\nPróximo passo: ${item.proximoPasso}`} 
                  />
                </div>
                <div className="space-y-3">
                  <div className="p-3 bg-muted/50 rounded-xl border border-border">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Resposta</p>
                    <p className="text-foreground">{item.resposta}</p>
                  </div>
                  <div className="p-3 bg-primary-weak/40 rounded-xl border border-primary/10">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Pergunta que destrava</p>
                    <p className="text-foreground font-medium">{item.pergunta}</p>
                  </div>
                  <div className="p-3 bg-primary-weak/30 rounded-xl border border-primary/10">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Impacto de não ter</p>
                    <p className="text-foreground">{item.impacto}</p>
                  </div>
                  <div className="p-3 rounded-xl border" style={{ backgroundColor: 'hsl(var(--success-weak))', borderColor: 'hsl(var(--success) / 0.2)' }}>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Próximo passo</p>
                    <p className="text-foreground">{item.proximoPasso}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ContentBlock>
      </div>
    </AppLayout>
  );
};

export default ObjecoesPage;
