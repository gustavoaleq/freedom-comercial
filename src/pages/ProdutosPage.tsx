import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHero } from "@/components/ui/PageHero";
import { ContentBlock } from "@/components/ui/ContentBlock";
import { CopyButton } from "@/components/ui/CopyButton";
import { cn } from "@/lib/utils";

type ProductTab = "vision" | "finance" | "legal" | "nalk";

interface ProductData {
  name: string;
  oQueE: string;
  paraQuemE: string[];
  dorQueResolve: string[];
  oQueEntrega: {
    intro?: string;
    modulos: string[];
  };
  comoViraResultado: string[];
  perguntasQueVendem: string[];
  impactoNaoTer: string[];
  fitForte: string[];
  redFlags: string[];
  objecoes: { objecao: string; resposta: string }[];
  proximoPasso: string;
}

const products: Record<ProductTab, ProductData> = {
  vision: {
    name: "Vision",
    oQueE: "Freedom Vision é visão computacional operacional: transforma vídeo em decisão e ação, em tempo real. Não é \"monitoramento\", é execução: a operação para de reagir e passa a prevenir perdas, organizar fluxo e padronizar loja/unidade.",
    paraQuemE: [
      "Varejo (principalmente alimentar), farmácias/drogarias, postos/conveniência",
      "Centros de distribuição, indústrias, instituições de ensino",
      "Ambientes com operação viva, múltiplos pontos de atenção e perdas \"silenciosas\""
    ],
    dorQueResolve: [
      "Perdas acima da média (fraude/ruptura/erros operacionais)",
      "Filas mal geridas e experiência ruim do cliente",
      "Ruptura de gôndola recorrente / execução inconsistente",
      "Monitoramento reativo (\"só vejo quando já deu ruim\")",
      "Baixa visibilidade estruturada (tem vídeo, mas não tem dado)"
    ],
    oQueEntrega: {
      intro: "Análise visual em tempo real + alertas operacionais. Dashboards em tempo real + trilhas de auditoria (o que aconteceu, onde e quando).",
      modulos: [
        "Segurança / prevenção de perdas",
        "Filas / fluxo operacional",
        "Segurança do trabalho",
        "Produtividade / execução",
        "Gôndolas / conformidade de exposição"
      ]
    },
    comoViraResultado: [
      "Redução de perdas e fraudes",
      "Menos ruptura de estoque",
      "Melhor gestão de filas (e aumento de conversão)",
      "Dados estruturados para operação e diretoria",
      "Decisão baseada em IA em vez de \"achismo do turno\""
    ],
    perguntasQueVendem: [
      "\"Hoje vocês descobrem perda quando? No dia? Na semana? No fechamento?\"",
      "\"Quanto custa 1% de perda a mais por mês na sua operação?\"",
      "\"Fila é problema de horário, escala ou gargalo do processo? Como você mede?\"",
      "\"Ruptura acontece por reposição, pedido, ou execução? Vocês têm dado por loja?\"",
      "\"Se eu te der um alerta em tempo real… quem age e em quanto tempo?\"",
      "\"O que você faria diferente se tivesse um painel com 'o que está acontecendo agora'?\""
    ],
    impactoNaoTer: [
      "Você paga perda todo dia e chama de \"normal do varejo\"",
      "Você treina time para apagar incêndio — e incêndio custa caro",
      "Você tem câmera, mas não tem controle (vídeo não é dado)",
      "Você perde dinheiro sem conseguir provar onde perdeu (e sem conseguir corrigir)"
    ],
    fitForte: [
      "Muitas câmeras / muitas lojas / operação com padrão inconsistente",
      "Dor de perda/filas/ruptura \"todo mundo sabe que existe\"",
      "Alguém com dor e poder (operações, prevenção de perdas, diretoria)"
    ],
    redFlags: [
      "\"Quero IA por curiosidade\" sem dor operacional real",
      "Não tem responsável para agir quando o alerta aparece",
      "Infraestrutura impossível / nenhuma abertura para ajustes técnicos"
    ],
    objecoes: [
      {
        objecao: "\"Já tenho câmeras.\"",
        resposta: "Perfeito. Câmera sem inteligência é só gravação. A pergunta é: você quer vídeo ou quer decisão e prevenção?"
      },
      {
        objecao: "\"Minha operação é diferente.\"",
        resposta: "Ótimo. O Vision nasce de diagnóstico: o que é repetitivo vira regra. O diferente vira exceção com trilha e evidência."
      }
    ],
    proximoPasso: "\"Vamos mapear 3 dores em 15 minutos (perda, fila, ruptura) e eu te devolvo um desenho de como isso vira alerta + rotina de ação.\""
  },
  finance: {
    name: "Finance Core",
    oQueE: "Freedom Finance Core é o cérebro financeiro autônomo: conecta nos sistemas (ERP/CRM/BI) e executa o ciclo financeiro de ponta a ponta com rastreabilidade e auditoria. Não é \"robôzinho\", é mão de obra digital 24/7.",
    paraQuemE: [
      "Empresas com alto volume de faturamento",
      "Operação com recebíveis complexos, conciliações demoradas e retrabalho",
      "CFO/financeiro que precisa de previsibilidade e controle (não só relatório)"
    ],
    dorQueResolve: [
      "Conciliação lenta, manual e sujeita a erro",
      "Duplicidade, erros fiscais, retrabalho e risco de fraude",
      "Falta de previsibilidade real de caixa / DSO alto",
      "Cobrança inconsistente (cada pessoa faz de um jeito)"
    ],
    oQueEntrega: {
      intro: "Jornada completa: pré-faturamento → emissão → cobrança → recebimento → análise. Integrações nativas: ERP, bancos, adquirentes e canais de cobrança.",
      modulos: [
        "Pré-faturamento inteligente (valida premissas/cadastros/contratos antes de emitir)",
        "Emissão de NF/Fatura (gatilhos automáticos por pedido/entrega/marcos)",
        "Conciliação bancária inteligente (divergências, tarifas, chargeback)",
        "Cobrança omnicanal (jornadas por perfil de cliente, lembretes e regras)",
        "Visão do CFO (ageing, DSO, projeção de recebíveis, riscos)"
      ]
    },
    comoViraResultado: [
      "Automação de 70–90% do ciclo financeiro (menos custo e retrabalho)",
      "Governança e compliance: padronização + trilha de auditoria",
      "Previsibilidade em tempo real (o CFO deixa de pilotar no escuro)",
      "Tempo médio de faturamento por ciclo reduzido",
      "Taxa de refaturamento / erros de emissão reduzida",
      "DSO por cliente/segmento otimizado",
      "Divergências de conciliação e custos (tarifas/chargeback) controlados"
    ],
    perguntasQueVendem: [
      "\"Quanto tempo seu time gasta por semana em conciliação e correção?\"",
      "\"Qual a taxa de refaturamento / erro de emissão hoje?\"",
      "\"Seu DSO está subindo por quê? Você sabe por cliente?\"",
      "\"Quantos pagamentos você descobre que estavam errados depois que já saiu do caixa?\"",
      "\"Se eu te desse previsibilidade real hoje, que decisão você tomaria amanhã?\""
    ],
    impactoNaoTer: [
      "Você compra receita e perde no backoffice",
      "Você perde caixa por erro, fraude, inconsistência e atraso — e chama de \"custo do financeiro\"",
      "Você tem relatório, mas não tem controle operacional do ciclo"
    ],
    fitForte: [
      "Volume alto de notas, recebíveis, múltiplos canais de cobrança",
      "CFO/Controller patrocinando (dono do problema)",
      "Dores com impacto direto em caixa e eficiência"
    ],
    redFlags: [
      "\"Financeiro é pequeno, não dói\" (até você mostrar o custo invisível)",
      "Sem acesso a dados/sistemas ou ninguém para liberar integração mínima"
    ],
    objecoes: [
      {
        objecao: "\"Meu ERP já faz isso.\"",
        resposta: "ERP registra. A pergunta é: ele executa o processo com validação, prevenção de erro e trilha auditável, ou só vira 'lançamento' que alguém confere manualmente?"
      },
      {
        objecao: "\"Tenho medo de mexer no financeiro.\"",
        resposta: "A arquitetura é feita para ambiente crítico: rastreabilidade, validação e governança. Você ganha controle, não perde."
      }
    ],
    proximoPasso: "\"Me dá 30 minutos com quem vive o ciclo (faturamento+cobrança+conciliação). Eu devolvo o mapa do processo + onde a IA assume e o ROI aparece.\""
  },
  legal: {
    name: "Legal Hub",
    oQueE: "Freedom Legal Hub é uma central autônoma de produção jurídica. Não é gerador de template: ele lê o processo, extrai provas e constrói peças robustas e combativas, mantendo o advogado no controle final.",
    paraQuemE: [
      "Jurídicos corporativos e escritórios com alto volume",
      "Contencioso massificado / produção de peças repetitivas e críticas",
      "Times que precisam de padrão técnico, escala e redução de risco"
    ],
    dorQueResolve: [
      "Produção lenta, cara e inconsistente",
      "Risco de erro/prazo perdido e contingência subindo",
      "Advogado gastando tempo em PDF, não em estratégia",
      "Baixa padronização: cada um escreve de um jeito"
    ],
    oQueEntrega: {
      intro: "Extração de provas em larga escala (valores, datas, faturas, logs, fatos). Pipeline jurídico com validações (probatórias, normativas e jurídicas). Documento final com padrão técnico elevado, pronto para revisão e protocolo.",
      modulos: [
        "Peças processuais complexas (recursos, contrarrazões, manifestações)",
        "Análise/elaboração de contratos (red flags, políticas, modelos)",
        "Due diligence (classificação, sumários e riscos)",
        "Gestão de prepostos (escala e instruções de audiência)",
        "Resposta de ofícios + triagem LGPD",
        "Gestão de contratos (esteira, SLA, alertas)"
      ]
    },
    comoViraResultado: [
      "Escala de produção com consistência (padrão ouro)",
      "Menos risco operacional (prazos, LGPD, conformidade)",
      "Mais produtividade: advogado volta para estratégia",
      "Governança: visibilidade do pipeline jurídico"
    ],
    perguntasQueVendem: [
      "\"Quantas peças por mês vocês produzem? Quantas são repetitivas?\"",
      "\"Quantas horas por semana viram leitura de PDF e extração de prova?\"",
      "\"Qual o custo de 1 erro de prazo? E o custo de uma peça fraca?\"",
      "\"O padrão técnico é o mesmo entre advogados diferentes?\"",
      "\"Se você pudesse dobrar produção sem dobrar equipe, o que mudaria?\""
    ],
    impactoNaoTer: [
      "Você paga advogado para fazer trabalho de máquina",
      "Você aceita inconsistência como normal — até virar contingência e prejuízo",
      "Você perde escala e abre mão de padrão técnico (e isso custa processo)"
    ],
    fitForte: [
      "Volume alto, repetição, risco real",
      "Liderança do jurídico patrocinando"
    ],
    redFlags: [
      "\"Quer só template\"",
      "Não tem teses/padrões minimamente definidos",
      "Dados/documentos inacessíveis"
    ],
    objecoes: [
      {
        objecao: "\"IA não entende meu caso.\"",
        resposta: "Ela entende o que é prova, tese e padrão. E o advogado continua no controle final. O ganho é tirar o trabalho braçal e elevar o padrão."
      },
      {
        objecao: "\"Tenho medo de qualidade.\"",
        resposta: "A régua é evidência + validação. Pior que IA é manter peça fraca e inconsistente no volume."
      }
    ],
    proximoPasso: "\"Me manda 3 exemplos reais de processos/peças. Eu te devolvo uma demonstração do 'antes e depois' em cima da sua realidade.\""
  },
  nalk: {
    name: "NALK",
    oQueE: "NALK é uma plataforma de Marketing & Sales Analytics / Revenue Analytics: centraliza dados de CRM + mídia + automações, cria dashboards e leitura executiva e permite tomar decisão baseada em dado (inclusive com perguntas para a IA sobre os dados).",
    paraQuemE: [
      "Empresas com investimento em mídia + CRM + funis comerciais",
      "Operações que sofrem com \"cada um tem um número\"",
      "Lideranças que precisam de: CAC real, ROI por canal, conversão por etapa, previsibilidade"
    ],
    dorQueResolve: [
      "Dados espalhados em ferramentas e planilhas",
      "Conflito marketing x vendas (\"lead ruim\" vs \"vendas não trabalha\")",
      "Falta de clareza do que gera receita (ROI por canal)",
      "Forecast fraco por falta de visibilidade real do funil"
    ],
    oQueEntrega: {
      intro: "Dashboards interativos e personalizáveis (self BI). Integração com CRM + ferramentas de marketing + canais de mídia. Automação de dados e alertas. Insights gerados por IA (perguntas e respostas sobre performance e funil).",
      modulos: [
        "Visão de jornada do cliente: do clique à venda",
        "Dashboards interativos e personalizáveis",
        "Integração com CRM + ferramentas de marketing + canais de mídia",
        "Automação de dados e alertas",
        "Insights gerados por IA"
      ]
    },
    comoViraResultado: [
      "Reduz desperdício de mídia (você corta o que não vende)",
      "Aumenta previsibilidade (funil com leitura consistente)",
      "Acelera decisão (menos tempo montando relatório, mais tempo agindo)",
      "Alinha marketing e vendas com um \"número da verdade\""
    ],
    perguntasQueVendem: [
      "\"Hoje você sabe, com confiança, qual canal gera mais venda com menor custo?\"",
      "\"Qual etapa do funil mais mata seu crescimento?\"",
      "\"Seu time decide por dado ou por opinião?\"",
      "\"Se eu te mostrasse 3 campanhas que geram lead mas não geram venda… você corta amanhã?\""
    ],
    impactoNaoTer: [
      "Você queima verba em canal que parece bonito, mas não fecha",
      "Você perde tempo discutindo e não executando (guerra interna)",
      "Você não tem previsibilidade e vive de 'sensação'"
    ],
    fitForte: [
      "Investimento contínuo em aquisição + uso real de CRM + necessidade de gestão"
    ],
    redFlags: [
      "\"Não medimos nada\"",
      "\"Não temos dono do número\"",
      "\"Não temos acesso aos dados\""
    ],
    objecoes: [
      {
        objecao: "\"Meu CRM já tem relatório.\"",
        resposta: "Relatório não é inteligência. A pergunta é: você enxerga ROI por canal, jornada completa e correlação com receita de verdade?"
      },
      {
        objecao: "\"Vai dar trabalho integrar.\"",
        resposta: "O trabalho já existe — só está escondido em planilha e retrabalho. A integração é o que compra o tempo de volta."
      }
    ],
    proximoPasso: "\"Me diga quais ferramentas vocês usam (CRM, mídia, automação). Eu devolvo um mapa de integração + quais 5 métricas mudam o jogo na primeira semana.\""
  }
};

const ProdutosPage = () => {
  const [activeTab, setActiveTab] = useState<ProductTab>("vision");

  const tabs: { id: ProductTab; name: string }[] = [
    { id: "vision", name: "Vision" },
    { id: "finance", name: "Finance Core" },
    { id: "legal", name: "Legal Hub" },
    { id: "nalk", name: "NALK" }
  ];

  const renderProduct = (product: ProductData) => {
    const perguntasTexto = product.perguntasQueVendem.join("\n");

    return (
      <div className="space-y-4 max-w-4xl">
        {/* 1. O que é */}
        <ContentBlock title="1) O que é">
          <div className="p-5 bg-primary-weak/30 rounded-xl border border-primary/20">
            <p className="text-foreground text-lg leading-relaxed">{product.oQueE}</p>
          </div>
        </ContentBlock>

        {/* 2. Para quem é */}
        <ContentBlock title="2) Para quem é (ICP)">
          <ul className="space-y-2">
            {product.paraQuemE.map((item, index) => (
              <li key={index} className="flex items-start gap-3 p-3 bg-card rounded-xl border border-border">
                <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span className="text-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </ContentBlock>

        {/* 3. Dor que isso resolve */}
        <ContentBlock title="3) Dor que isso resolve">
          <ul className="space-y-2">
            {product.dorQueResolve.map((dor, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-lg bg-destructive/10 text-destructive text-sm font-bold flex items-center justify-center flex-shrink-0">
                  ✗
                </span>
                <span className="text-foreground">{dor}</span>
              </li>
            ))}
          </ul>
        </ContentBlock>

        {/* 4. O que a Freedom entrega */}
        <ContentBlock title="4) O que a Freedom entrega">
          <div className="space-y-4">
            {product.oQueEntrega.intro && (
              <p className="text-foreground leading-relaxed">{product.oQueEntrega.intro}</p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {product.oQueEntrega.modulos.map((modulo, index) => (
                <div key={index} className="p-4 bg-card rounded-xl border border-border">
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-lg bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center flex-shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-foreground text-sm">{modulo}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ContentBlock>

        {/* 5. Como isso vira resultado */}
        <ContentBlock title="5) Como isso vira resultado">
          <ul className="space-y-2">
            {product.comoViraResultado.map((resultado, index) => (
              <li key={index} className="flex items-start gap-3 p-3 bg-success-weak/50 rounded-xl border border-success/20">
                <span className="text-success font-bold">✓</span>
                <span className="text-foreground">{resultado}</span>
              </li>
            ))}
          </ul>
        </ContentBlock>

        {/* 6. Perguntas que vendem */}
        <ContentBlock title="6) Perguntas que vendem">
          <div className="space-y-4">
            <div className="flex justify-end">
              <CopyButton text={perguntasTexto} />
            </div>
            <ul className="space-y-3">
              {product.perguntasQueVendem.map((pergunta, index) => (
                <li key={index} className="flex items-start gap-3 p-4 bg-primary-weak/50 rounded-xl border border-primary/20">
                  <span className="w-6 h-6 rounded-lg bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-foreground italic">{pergunta}</span>
                </li>
              ))}
            </ul>
          </div>
        </ContentBlock>

        {/* 7. Impacto de não ter */}
        <ContentBlock title="7) Impacto de não ter (o custo invisível)">
          <ul className="space-y-2">
            {product.impactoNaoTer.map((impacto, index) => (
              <li key={index} className="flex items-start gap-3 p-4 bg-destructive/10 rounded-xl border border-destructive/20">
                <span className="text-destructive font-bold text-lg">⚠</span>
                <span className="text-foreground">{impacto}</span>
              </li>
            ))}
          </ul>
        </ContentBlock>

        {/* 8. Sinais de fit / red flags */}
        <ContentBlock title="8) Sinais de fit / red flags">
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">✅ Fit forte</h4>
              <ul className="space-y-2">
                {product.fitForte.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 p-3 bg-success-weak/50 rounded-xl border border-success/20">
                    <span className="text-success font-bold">✓</span>
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">🚫 Red flags</h4>
              <ul className="space-y-2">
                {product.redFlags.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 p-3 bg-destructive/10 rounded-xl border border-destructive/20">
                    <span className="text-destructive font-bold">✗</span>
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ContentBlock>

        {/* 9. Objeções comuns */}
        <ContentBlock title="9) Objeções comuns + como responder">
          <div className="space-y-4">
            {product.objecoes.map((obj, index) => (
              <div key={index} className="p-4 bg-card rounded-xl border border-border space-y-3">
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-lg bg-muted text-muted-foreground text-sm font-bold flex items-center justify-center flex-shrink-0">
                    💬
                  </span>
                  <p className="text-foreground font-semibold">{obj.objecao}</p>
                </div>
                <div className="flex items-start gap-3 pl-11">
                  <span className="text-primary font-bold">→</span>
                  <p className="text-foreground italic">{obj.resposta}</p>
                </div>
              </div>
            ))}
          </div>
        </ContentBlock>

        {/* 10. Próximo passo */}
        <ContentBlock title="10) Próximo passo recomendado">
          <div className="p-5 bg-primary-weak/50 rounded-xl border border-primary/20">
            <p className="text-foreground text-lg font-medium italic">{product.proximoPasso}</p>
          </div>
        </ContentBlock>
      </div>
    );
  };

  return (
    <AppLayout>
      <PageHero
        emoji="🧩"
        title="Produtos"
        subtitle="Produto é consequência do diagnóstico. Quem não pergunta, perde."
      />

      <div className="space-y-6 max-w-5xl">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200",
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-card text-foreground border border-border hover:bg-muted/50"
              )}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Product content */}
        {renderProduct(products[activeTab])}
      </div>
    </AppLayout>
  );
};

export default ProdutosPage;
