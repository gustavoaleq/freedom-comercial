import { AppLayout } from "@/components/layout/AppLayout";
import { PageHero } from "@/components/ui/PageHero";
import { ContentBlock } from "@/components/ui/ContentBlock";
import { CopyButton } from "@/components/ui/CopyButton";

const ICPQualificacaoPage = () => {
  const checklist = `☐ Dor tem dono identificado?
☐ Volume justifica automação?
☐ Dados existem e são acessíveis?
☐ Sponsor mapeado?
☐ ROI estimável?
☐ Próximo passo definido?`;

  return (
    <AppLayout>
      <PageHero
        emoji="🎯"
        title="ICP & Qualificação"
        subtitle="Se você não filtra, você vira call center."
      />

      <div className="space-y-4 max-w-4xl">
        <ContentBlock title="MQL (Lei)">
          <div className="p-4 bg-primary-weak/50 rounded-xl border border-primary/20">
            <p className="text-lg font-semibold text-foreground">
              Faturamento &gt; R$ 20M <span className="text-muted-foreground mx-2">e</span> &gt; 100 funcionários
            </p>
          </div>
        </ContentBlock>

        <ContentBlock title="SQL (Lei Prática)">
          <div className="p-4 bg-muted/50 rounded-xl border border-border">
            <p className="text-foreground font-medium">
              MQL + <strong>dor clara</strong> + <strong>viabilidade</strong> + <strong>sponsor</strong> + <strong>próximo passo</strong>
            </p>
          </div>
        </ContentBlock>

        <ContentBlock 
          title="Checklist de Qualificação" 
          copyable 
          copyText={checklist}
        >
          <div className="bg-card border border-border rounded-xl p-4 font-mono text-sm">
            <pre className="whitespace-pre-wrap text-foreground">{checklist}</pre>
          </div>
        </ContentBlock>

        <ContentBlock title="Perguntas por Trava">
          <div className="grid gap-3">
            {[
              { trava: "Sem urgência", pergunta: "O que acontece se vocês não resolverem isso nos próximos 90 dias?" },
              { trava: "Sem dono", pergunta: "Quem sofre mais com esse problema hoje? Quem perde bônus se não resolver?" },
              { trava: "Sem dados", pergunta: "Os dados existem em algum sistema ou estão em planilhas/cabeças?" },
              { trava: "Sem sponsor", pergunta: "Quem assina esse tipo de contrato? Você ou precisa de alguém acima?" }
            ].map((item, index) => (
              <div key={index} className="p-4 bg-muted/50 rounded-xl border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <span className="badge-muted">
                    {item.trava}
                  </span>
                </div>
                <p className="text-foreground italic">"{item.pergunta}"</p>
              </div>
            ))}
          </div>
        </ContentBlock>
      </div>
    </AppLayout>
  );
};

export default ICPQualificacaoPage;
