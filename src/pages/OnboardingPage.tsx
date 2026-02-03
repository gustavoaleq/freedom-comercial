import { AppLayout } from "@/components/layout/AppLayout";
import { PageHero } from "@/components/ui/PageHero";
import { ContentBlock } from "@/components/ui/ContentBlock";

const OnboardingPage = () => {
  const semana1 = [
    "Conhecer o DNA Freedom (valores, cultura, postura)",
    "Entender os 3 produtos (Vision, Finance Core, Legal Hub)",
    "Dominar a Lei do Comercial (7 perguntas + impacto de não ter)",
    "Configurar CRM e entender regras de governança",
    "Assistir 2 reuniões de Closer como observador",
    "Fazer primeira simulação interna (roleplay)"
  ];

  const dias30 = [
    "Conhecer ICP e qualificação (MQL/SQL)",
    "Dominar objeções principais e como destravá-las",
    "Fazer 5 simulações de cold call",
    "Acompanhar 5 reuniões reais (SDR ou Closer)",
    "Fazer primeiro contato real supervisionado",
    "Primeira meta de atividade (ex: 50 tentativas)"
  ];

  const dias60_90 = [
    "Pipeline próprio ativo",
    "Primeira reunião realizada solo",
    "Primeira proposta enviada",
    "CRM 100% atualizado e conforme regras",
    "Forecast semanal participativo",
    "Atingir 50-70% da meta individual"
  ];

  const provas = [
    { tipo: "Simulação", desc: "Roleplay de cold call e reunião de diagnóstico" },
    { tipo: "CRM", desc: "Avaliação de higiene e governança do pipeline" },
    { tipo: "Métricas", desc: "Apresentação semanal de números e próximos passos" },
    { tipo: "Case", desc: "Apresentar um deal do início ao fim (ganho ou perdido)" }
  ];

  return (
    <AppLayout>
      <PageHero
        emoji="🚀"
        title="Onboarding 30-60-90"
        subtitle="Ramp-up não é sorte. É método."
      />

      <div className="space-y-4 max-w-4xl">
        <ContentBlock title="Semana 1 — Imersão">
          <div className="grid gap-2">
            {semana1.map((item, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-secondary/50 rounded-lg">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-foreground text-xs font-bold">{index + 1}</span>
                </div>
                <span className="text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </ContentBlock>

        <ContentBlock title="30 Dias — Fundamentos">
          <div className="grid gap-2">
            {dias30.map((item, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-secondary/50 rounded-lg">
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-bold">{index + 1}</span>
                </div>
                <span className="text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </ContentBlock>

        <ContentBlock title="60-90 Dias — Produtividade">
          <div className="grid gap-2">
            {dias60_90.map((item, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-secondary/50 rounded-lg">
                <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-bold">{index + 1}</span>
                </div>
                <span className="text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </ContentBlock>

        <ContentBlock title="Provas e Validações">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {provas.map((prova, index) => (
              <div key={index} className="p-4 bg-card rounded-lg border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded">
                    {prova.tipo}
                  </span>
                </div>
                <p className="text-foreground">{prova.desc}</p>
              </div>
            ))}
          </div>
        </ContentBlock>

        <ContentBlock title="Critérios de Sucesso">
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-green-800 font-medium mb-3">
              Ao final de 90 dias, o vendedor deve demonstrar:
            </p>
            <ul className="space-y-2 text-green-700">
              <li>✓ Domínio completo do playbook</li>
              <li>✓ Pipeline ativo e saudável</li>
              <li>✓ CRM impecável (0 cards sem tarefa)</li>
              <li>✓ Capacidade de conduzir reunião sozinho</li>
              <li>✓ Mínimo 50% da meta atingida</li>
            </ul>
          </div>
        </ContentBlock>
      </div>
    </AppLayout>
  );
};

export default OnboardingPage;
