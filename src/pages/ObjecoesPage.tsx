import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHero } from "@/components/ui/PageHero";
import { ContentBlock } from "@/components/ui/ContentBlock";
import { CopyButton } from "@/components/ui/CopyButton";
import { Input } from "@/components/ui/input";
import { Search, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Objecao {
  objecao: string;
  tags: string[];
  resposta: string;
  pergunta: string;
  impacto: string;
  proximoPasso: string;
}

const ObjecoesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const objecoes: Objecao[] = [
    {
      objecao: "Tá caro",
      tags: ["Closer", "Finance", "Pricing"],
      resposta: "Entendo. Vamos voltar pro impacto: quanto vocês perdem por mês com isso?",
      pergunta: "Se o investimento se pagar em X meses, ainda parece caro?",
      impacto: "Cada mês que passa são R$ [X] jogados fora.",
      proximoPasso: "Revisar ROI juntos e recalcular payback"
    },
    {
      objecao: "Já tenho automação/RPA",
      tags: ["Closer", "TI", "Concorrência"],
      resposta: "Ótimo! RPA é bom pra tarefas simples. Onde ele não consegue decidir sozinho?",
      pergunta: "Qual processo hoje depende de alguém olhar e decidir?",
      impacto: "RPA faz, IA decide. São camadas diferentes.",
      proximoPasso: "Mapear gaps do RPA atual"
    },
    {
      objecao: "Preciso falar com TI/jurídico",
      tags: ["Closer", "Autoridade/Decisor", "TI"],
      resposta: "Faz sentido. Posso preparar um resumo técnico/jurídico pra facilitar?",
      pergunta: "O que eles vão querer saber? Segurança, integração, compliance?",
      impacto: "Quanto tempo essa aprovação costuma levar?",
      proximoPasso: "Agendar call técnica de 20 min com TI"
    },
    {
      objecao: "IA dá risco",
      tags: ["Closer", "Segurança/Compliance", "Risco"],
      resposta: "Concordo que IA mal implementada dá risco. Por isso a gente começa com piloto controlado.",
      pergunta: "Qual risco específico te preocupa mais? Erro, viés, compliance?",
      impacto: "O risco de não fazer nada também existe — e cresce todo mês.",
      proximoPasso: "Apresentar cases de mitigação de risco"
    },
    {
      objecao: "Vamos pensar",
      tags: ["Closer", "Prioridade/Timing"],
      resposta: "Entendo. O que especificamente vocês precisam pensar?",
      pergunta: "É timing, budget, ou alguma preocupação que a gente não endereçou?",
      impacto: "Enquanto vocês pensam, o problema continua custando R$ [X]/mês.",
      proximoPasso: "Definir data de retorno e condição de decisão"
    },
    {
      objecao: "Manda mais detalhe",
      tags: ["SDR", "Closer", "Follow-up"],
      resposta: "Claro. Qual detalhe específico você precisa pra avançar?",
      pergunta: "É técnico, comercial, ou case de referência?",
      impacto: "Fico preocupado de mandar material que não responde a dúvida real.",
      proximoPasso: "Entender dúvida real antes de enviar material"
    },
    {
      objecao: "Concorrente mais barato",
      tags: ["Closer", "Concorrência", "Pricing"],
      resposta: "Faz sentido comparar. O que exatamente eles entregam pelo preço?",
      pergunta: "Eles garantem o mesmo SLA, suporte e resultado?",
      impacto: "Barato que não funciona sai caro. Já passaram por isso antes?",
      proximoPasso: "Fazer comparativo técnico lado a lado"
    },
    // 15 novas objeções
    {
      objecao: "Não tenho budget agora",
      tags: ["Closer", "Finance", "Prioridade/Timing"],
      resposta: "Entendo. Só pra eu não te empurrar nada: quando você diz 'sem budget', é porque não existe verba ou porque a verba existe, mas não está priorizada?",
      pergunta: "O que teria que acontecer pra isso virar prioridade ainda neste trimestre?",
      impacto: "Cada mês que passa vocês seguem pagando o custo invisível de [DOR] (tempo, retrabalho, risco), e a conta normalmente aparece em atraso/erro/multa.",
      proximoPasso: "Mapear 1 cenário mínimo (MVP) + ROI básico e validar se dá pra começar pequeno."
    },
    {
      objecao: "Agora não é prioridade",
      tags: ["Closer", "Prioridade/Timing"],
      resposta: "Perfeito. Só quero entender se é 'não é prioridade' porque não dói, ou porque não tem dono.",
      pergunta: "Se nada mudar nos próximos 90 dias, qual consequência você aceita pagar?",
      impacto: "O custo não para — ele só fica invisível até virar urgência (atraso, risco, perda, pressão).",
      proximoPasso: "Definir dono + 1 métrica de sucesso + data de reavaliação (30 dias)."
    },
    {
      objecao: "Estamos sem tempo para implementar",
      tags: ["Closer", "Operação", "Prazo"],
      resposta: "Entendo. Só que 'falta de tempo' normalmente é o sintoma do problema — vocês já estão sobrecarregados.",
      pergunta: "Qual time hoje paga a conta do caos: financeiro, jurídico, operações ou comercial?",
      impacto: "Quanto mais vocês esperam, mais a rotina vira dependência de pessoas e o gargalo só aumenta.",
      proximoPasso: "Plano de implantação em 2 fases: (1) quick win em X dias (2) expansão."
    },
    {
      objecao: "Meu time vai resistir / não vão usar",
      tags: ["Closer", "Change Management", "Risco"],
      resposta: "Faz sentido. Por isso a gente não vende ferramenta — a gente vende alívio e resultado pro time.",
      pergunta: "Se eu te provar que o time economiza [X] horas/semana, quem vira o maior aliado interno?",
      impacto: "Sem adesão, vocês continuam dependentes de heróis e apagadores de incêndio.",
      proximoPasso: "Escolher 1 'champion' + rodar piloto com 10 usuários e medir economia."
    },
    {
      objecao: "Isso parece complexo demais",
      tags: ["Closer", "TI", "Prazo"],
      resposta: "Complexo é continuar com [DOR] do jeito atual. A gente começa simples, com uma primeira entrega objetiva.",
      pergunta: "Qual seria o 'sim' mais fácil? Resolver 1 processo específico em 30 dias.",
      impacto: "Complexidade cresce com o tempo: mais exceções, mais retrabalho, mais risco.",
      proximoPasso: "Definir escopo mínimo (1 caso de uso) + 1 métrica + cronograma."
    },
    {
      objecao: "Não quero depender de IA (medo de virar 'caixa-preta')",
      tags: ["Closer", "Segurança/Compliance", "Risco"],
      resposta: "Perfeito — e você está certo em ter esse cuidado. IA aqui tem governança: o que pode, o que não pode, e rastreio.",
      pergunta: "Qual risco você quer eliminar primeiro: dado sensível, erro de resposta ou acesso indevido?",
      impacto: "O risco hoje já existe: processos manuais, gente compartilhando dado por WhatsApp, decisão sem trilha.",
      proximoPasso: "Rodar com guardrails + logs + política de acesso e validação."
    },
    {
      objecao: "Preciso aprovar com CFO / diretoria",
      tags: ["Closer", "Autoridade/Decisor"],
      resposta: "Perfeito. Só vamos evitar telefone sem fio. Eu prefiro explicar em 15 min com números: custo atual vs ROI.",
      pergunta: "O CFO decide mais por redução de custo, aumento de receita ou redução de risco?",
      impacto: "Sem patrocínio, a empresa segue pagando custo invisível e atrasando decisões.",
      proximoPasso: "Agendar call com CFO + levar 1 página de ROI e plano em 30 dias."
    },
    {
      objecao: "Não confio nos dados que temos",
      tags: ["Closer", "Dados", "TI"],
      resposta: "Entendo. A maioria das empresas está assim. A boa notícia: dá pra começar com o que vocês têm e ir melhorando.",
      pergunta: "Qual parte do dado falha mais: qualidade, acesso ou padronização?",
      impacto: "Sem dado confiável, vocês tomam decisão no escuro e pagam com erro e retrabalho.",
      proximoPasso: "Diagnóstico de dados + primeiro caso de uso que exige pouco dado."
    },
    {
      objecao: "Nossa TI não deixa / é travado",
      tags: ["Closer", "TI", "Segurança/Compliance"],
      resposta: "Normal. Por isso a gente trabalha com padrão corporativo: acesso controlado, permissões e trilha.",
      pergunta: "O bloqueio é por segurança, por prioridade do time ou por integração?",
      impacto: "TI travada = negócio travado. A operação fica refém do manual e do improviso.",
      proximoPasso: "Call com TI com checklist técnico + definir modelo de integração mínimo."
    },
    {
      objecao: "A gente não tem clareza do problema ainda",
      tags: ["SDR", "Closer", "Diagnóstico"],
      resposta: "Ótimo — porque venda boa começa com pergunta. A gente faz diagnóstico antes de falar de produto.",
      pergunta: "Hoje o que dói mais: tempo, dinheiro ou risco?",
      impacto: "Sem clareza, vocês continuam atacando sintomas e o problema volta.",
      proximoPasso: "Reunião de diagnóstico com 6 perguntas + mapa de gargalos."
    },
    {
      objecao: "Pode dar errado / não quero ser o responsável",
      tags: ["Closer", "Risco", "Autoridade"],
      resposta: "Entendo. Então vamos fazer do jeito correto: piloto, métrica clara, governança e decisão baseada em evidência.",
      pergunta: "O que seria 'dar errado' pra você? Custo, reputação, compliance ou performance?",
      impacto: "Se vocês não fazem nada, a responsabilidade continua existindo — só que pelo problema atual.",
      proximoPasso: "Definir risco aceitável + piloto controlado + critérios de sucesso."
    },
    {
      objecao: "Quero só testar de graça",
      tags: ["Closer", "Finance", "Negociação"],
      resposta: "Entendo o impulso. Só que teste sem escopo e sem dono vira ruído. Se for pra testar, vamos testar direito.",
      pergunta: "Qual métrica você quer provar em 30 dias pra dizer 'sim'?",
      impacto: "'Teste infinito' mantém vocês no mesmo lugar e o problema continua cobrando.",
      proximoPasso: "Piloto pago com escopo mínimo e métrica fechada (sem virar projeto eterno)."
    },
    {
      objecao: "Já tentamos isso antes e não funcionou",
      tags: ["Closer", "Objeções", "Histórico"],
      resposta: "Faz total sentido estar cético. A pergunta é: falhou por tecnologia ou por falta de processo/dono/adesão?",
      pergunta: "O que exatamente deu errado da última vez: escopo, dados, adesão ou expectativa?",
      impacto: "Trauma vira paralisia. E o problema continua acontecendo do mesmo jeito.",
      proximoPasso: "Autópsia da tentativa anterior + novo plano em 2 fases (quick win + escala)."
    },
    {
      objecao: "Me manda um preço pra eu decidir",
      tags: ["SDR", "Closer", "Pricing"],
      resposta: "Eu posso te dar um range, mas preço sem diagnóstico vira chute — e geralmente dá errado.",
      pergunta: "Pra eu te dizer o valor certo: você quer resolver 1 processo ou vários? E qual a urgência (30/60/90 dias)?",
      impacto: "Se vocês decidem só por preço, quase sempre pagam mais depois em retrabalho/risco.",
      proximoPasso: "Diagnóstico rápido (15–20 min) e envio do range + recomendação."
    },
    {
      objecao: "Só fechamos com fornecedor homologado / compras",
      tags: ["Closer", "Procurement", "Jurídico"],
      resposta: "Perfeito — isso é saudável. Só preciso entender o fluxo pra eu encaixar e não perder timing.",
      pergunta: "Qual é o passo mais demorado: homologação, jurídico ou aprovação financeira?",
      impacto: "Sem encaixar no processo, o projeto morre na fila e o problema segue custando.",
      proximoPasso: "Mapear processo de compras + checklist de documentos + data de decisão."
    }
  ];

  const filteredObjecoes = objecoes.filter((item) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      item.objecao.toLowerCase().includes(searchLower) ||
      item.resposta.toLowerCase().includes(searchLower) ||
      item.pergunta.toLowerCase().includes(searchLower) ||
      item.impacto.toLowerCase().includes(searchLower) ||
      item.proximoPasso.toLowerCase().includes(searchLower) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
  });

  const getCopyText = (item: Objecao) => {
    return `Objeção: ${item.objecao}\n\nResposta: ${item.resposta}\n\nPergunta: ${item.pergunta}\n\nImpacto: ${item.impacto}\n\nPróximo passo: ${item.proximoPasso}`;
  };

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
          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar por nome, texto ou palavra-chave..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-muted/50 border-border"
            />
          </div>

          {/* Results count */}
          <p className="text-sm text-muted-foreground mb-4">
            {filteredObjecoes.length} objeção{filteredObjecoes.length !== 1 ? 'ões' : ''} encontrada{filteredObjecoes.length !== 1 ? 's' : ''}
          </p>

          {/* Accordion cards */}
          <Accordion type="multiple" className="space-y-3">
            {filteredObjecoes.map((item, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card rounded-2xl border border-border px-5 py-0 data-[state=open]:pb-4"
              >
                <AccordionTrigger className="hover:no-underline py-4">
                  <div className="flex items-center justify-between w-full pr-4">
                    <div className="flex flex-col items-start gap-2">
                      <h4 className="text-lg font-bold text-foreground text-left">"{item.objecao}"</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {item.tags.map((tag, tagIndex) => (
                          <Badge 
                            key={tagIndex} 
                            variant="secondary"
                            className="text-xs bg-muted text-muted-foreground"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div onClick={(e) => e.stopPropagation()} className="ml-4">
                      <CopyButton text={getCopyText(item)} />
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 pt-2">
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
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {filteredObjecoes.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              Nenhuma objeção encontrada para "{searchQuery}"
            </div>
          )}
        </ContentBlock>
      </div>
    </AppLayout>
  );
};

export default ObjecoesPage;
