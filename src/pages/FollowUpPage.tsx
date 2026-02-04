import { AppLayout } from "@/components/layout/AppLayout";
import { PageHero } from "@/components/ui/PageHero";
import { ContentBlock } from "@/components/ui/ContentBlock";
import { CopyButton } from "@/components/ui/CopyButton";

const FollowUpPage = () => {
  const valoresNovos = [
    "Case de cliente parecido",
    "Dado de mercado relevante",
    "Notícia sobre o segmento",
    "Insight sobre o problema deles",
    "Resposta a dúvida técnica pendente",
    "Convite para evento/webinar relevante"
  ];

  const cadenciaSDR = [
    { dia: "D0", canal: "LinkedIn", acao: "Conexão + mensagem personalizada" },
    { dia: "D1", canal: "E-mail", acao: "E-mail de abertura com 2 perguntas" },
    { dia: "D3", canal: "Ligação", acao: "Cold call com script direto" },
    { dia: "D5", canal: "WhatsApp", acao: "Mensagem curta com valor novo" },
    { dia: "D7", canal: "WhatsApp", acao: "Encerramento elegante" }
  ];

  const templatesCanal = {
    whatsapp: `[Nome], passando rapidinho.

Vi que [insight/notícia relevante] e lembrei da nossa conversa.

Ainda faz sentido falar sobre [problema]? 

Se timing mudou, sem problema — só me avisa que eu organizo aqui.`,
    email: `Assunto: [Valor novo] + próximo passo

[Nome],

Estava pensando na nossa conversa e encontrei [valor novo relevante].

[1-2 frases conectando com a dor deles]

Faz sentido retomarmos? [Próximo passo claro]

Abs,
[Seu nome]`,
    ligacao: `"Oi [Nome], aqui é [Seu nome] da Freedom AI.

Estou ligando porque [valor novo / motivo relevante].

Lembra que a gente conversou sobre [problema]?

Tinha uma atualização que achei que valia compartilhar...

[Valor novo em 30 segundos]

Faz sentido a gente retomar? Qual o melhor próximo passo?"`
  };

  const encerramentoAdulto = `[Nome], percebo que o timing não está batendo.

Sem problema nenhum — prefiro ser honesto do que ficar insistindo.

Vou pausar o contato por agora e voltar em [90 dias / próximo quarter] pra ver se o cenário mudou.

Se antes disso [problema X] virar urgência, é só me chamar.

Sucesso e até breve!
[Seu nome]`;

  return (
    <AppLayout>
      <PageHero
        emoji="🔁"
        title="Follow-up"
        subtitle="Follow-up não é pedir retorno. É mover decisão com valor novo."
      />

      <div className="space-y-4 max-w-4xl">
        <ContentBlock title="Lei do Follow-up">
          <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
            <p className="text-xl font-bold text-foreground">
              "Todo follow-up precisa de valor novo. Se não tem valor novo, não manda."
            </p>
          </div>
        </ContentBlock>

        <ContentBlock title="Tipos de Valor Novo">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {valoresNovos.map((valor, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-medium flex items-center justify-center flex-shrink-0">
                  {index + 1}
                </span>
                <span className="text-foreground">{valor}</span>
              </div>
            ))}
          </div>
        </ContentBlock>

        <ContentBlock title="Cadência SDR/BDR (5 tentativas)">
          <div className="space-y-2">
            {cadenciaSDR.map((item, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-secondary/50 rounded-lg">
                <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-foreground font-bold text-sm">{item.dia}</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{item.canal}</p>
                  <p className="text-sm text-muted-foreground">{item.acao}</p>
                </div>
              </div>
            ))}
          </div>
        </ContentBlock>

        <ContentBlock 
          title="Template WhatsApp" 
          copyable 
          copyText={templatesCanal.whatsapp}
        >
          <div className="bg-card border border-border rounded-lg p-4 font-mono text-sm">
            <pre className="whitespace-pre-wrap text-foreground">{templatesCanal.whatsapp}</pre>
          </div>
        </ContentBlock>

        <ContentBlock 
          title="Template E-mail" 
          copyable 
          copyText={templatesCanal.email}
        >
          <div className="bg-card border border-border rounded-lg p-4 font-mono text-sm">
            <pre className="whitespace-pre-wrap text-foreground">{templatesCanal.email}</pre>
          </div>
        </ContentBlock>

        <ContentBlock 
          title="Template Ligação" 
          copyable 
          copyText={templatesCanal.ligacao}
        >
          <div className="bg-card border border-border rounded-lg p-4 font-mono text-sm">
            <pre className="whitespace-pre-wrap text-foreground">{templatesCanal.ligacao}</pre>
          </div>
        </ContentBlock>

        <ContentBlock 
          title="Encerramento Adulto (sem perder respeito)" 
          copyable 
          copyText={encerramentoAdulto}
        >
          <div className="bg-card border border-border rounded-lg p-4 font-mono text-sm">
            <pre className="whitespace-pre-wrap text-foreground">{encerramentoAdulto}</pre>
          </div>
        </ContentBlock>
      </div>
    </AppLayout>
  );
};

export default FollowUpPage;
