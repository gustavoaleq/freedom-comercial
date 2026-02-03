import { AppLayout } from "@/components/layout/AppLayout";
import { PageHero } from "@/components/ui/PageHero";
import { ContentBlock } from "@/components/ui/ContentBlock";
import { CopyButton } from "@/components/ui/CopyButton";

const LeiComercialPage = () => {
  const impactoPhrases = [
    "Se vocês não resolverem isso, o que continua acontecendo no mês que vem?",
    "Qual custo invisível ninguém coloca na planilha?",
    "Se isso estourar, estoura onde?",
    "Quanto tempo por mês vocês perdem com isso?"
  ];

  return (
    <AppLayout>
      <PageHero
        emoji="⚖️"
        title="Lei do Comercial"
        subtitle="Vendas é sobre PERGUNTAR e sobre o IMPACTO DE NÃO TER."
      />

      <div className="space-y-4 max-w-4xl">
        <ContentBlock title="As 7 perguntas que vendem (sempre)">
          <div className="grid gap-3">
            {[
              { num: 1, question: "Onde dói?", desc: "Identificar a dor real" },
              { num: 2, question: "Qual volume?", desc: "Dimensionar oportunidade" },
              { num: 3, question: "Quanto custa hoje?", desc: "Quantificar impacto" },
              { num: 4, question: "O que acontece se nada mudar?", desc: "Criar urgência" },
              { num: 5, question: "Onde estão os dados?", desc: "Validar viabilidade" },
              { num: 6, question: "Quem é sponsor?", desc: "Mapear decisor" },
              { num: 7, question: "Próximo passo com data e dono?", desc: "Travar ação" }
            ].map((item) => (
              <div key={item.num} className="flex items-center gap-4 p-4 bg-muted/50 rounded-xl border border-border hover:bg-primary-weak/30 hover:border-primary/20 transition-all">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-foreground font-bold">{item.num}</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">{item.question}</p>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </ContentBlock>

        <ContentBlock title="Impacto de não ter (frases prontas)">
          <div className="space-y-3">
            {impactoPhrases.map((phrase, index) => (
              <div key={index} className="flex items-start justify-between gap-4 p-4 bg-primary-weak/40 rounded-xl border border-primary/10">
                <p className="text-foreground font-medium italic">"{phrase}"</p>
                <CopyButton text={phrase} className="flex-shrink-0" />
              </div>
            ))}
          </div>
        </ContentBlock>

        <ContentBlock title="Sequência obrigatória de conversa">
          <div className="flex flex-wrap items-center gap-3">
            {["Diagnóstico", "Impacto de não ter", "Viabilidade", "Próximo passo"].map((step, index, arr) => (
              <div key={step} className="flex items-center gap-3">
                <div className="px-4 py-2 bg-primary text-primary-foreground rounded-xl font-medium">
                  {step}
                </div>
                {index < arr.length - 1 && (
                  <span className="text-muted-foreground">→</span>
                )}
              </div>
            ))}
          </div>
        </ContentBlock>

        <ContentBlock title="Padrão Freedom de postura">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {["Direto", "Consultivo", "Adulto", "Sem hype"].map((item) => (
              <div key={item} className="text-center p-4 bg-muted/50 rounded-xl border border-border">
                <span className="font-semibold text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </ContentBlock>
      </div>
    </AppLayout>
  );
};

export default LeiComercialPage;
