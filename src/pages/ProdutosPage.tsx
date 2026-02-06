import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHero } from "@/components/ui/PageHero";
import { ContentBlock } from "@/components/ui/ContentBlock";
import { CopyButton } from "@/components/ui/CopyButton";
import { cn } from "@/lib/utils";
import { ObjecoesSection } from "@/components/produtos/ObjecoesSection";
import {
  objecoesVision,
  objecoesFinance,
  objecoesLegal,
  objecoesNalk,
  objecoesAgents,
  objecoesLetramento,
} from "@/data/objecoesExpandidas";

type ProductTab = "vision" | "finance" | "legal" | "nalk" | "agents" | "letramento";

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
  },
  agents: {
    name: "Freedom Agents",
    oQueE: "Freedom Agents é a oferta onde a Freedom atua como fornecedor central de agentes de média e alta complexidade para múltiplas áreas da empresa — vendas, financeiro, dados, jurídico, operações e o que mais fizer sentido.\n\nA tese é simples: o cliente enterprise não quer criar a plataforma e nem quer \"aprender a construir agente\". Ele quer os agentes prontos, rodando em produção, com dono do fluxo e governança.\n\nA Freedom desenha o escopo, constrói na plataforma no-code, entrega o agente em operação (com canal, integrações, regras, guardrails) e vira o dono do fluxo com manutenção evolutiva.",
    paraQuemE: [
      "Empresas que querem escalar IA internamente sem depender de time técnico grande",
      "Múltiplos processos e áreas precisando de automação e decisão",
      "Necessidade de padronizar 'como se faz agente' com governança",
      "Dados e sistemas espalhados (CRM/ERP/BI/Docs/WhatsApp etc.)",
      "Buscam um fornecedor central para a estratégia de agentes",
      "Enterprise / operações complexas com múltiplos stakeholders (TI + área + diretoria)"
    ],
    dorQueResolve: [
      "\"A gente quer IA, mas cada área pede uma coisa\"",
      "\"Sem time técnico, tudo vira travado\"",
      "\"Já tentamos e virou piloto infinito\"",
      "\"Temos ferramentas, mas ninguém entrega agente pronto\"",
      "\"Falta governança, padrão, dono e manutenção\""
    ],
    oQueEntrega: {
      intro: "O cliente compra agentes prontos em produção. O diferencial não é \"ter uma plataforma\" — é ter uma fábrica que entrega agente pronto com padronização.",
      modulos: [
        "Fluxo desenhado e documentado",
        "Regras e decisões automatizadas",
        "Integrações com sistemas internos (quando aplicável)",
        "Canal de uso (WhatsApp, web, interno, etc.)",
        "Governança e dono do fluxo",
        "Evolução contínua conforme novos processos"
      ]
    },
    comoViraResultado: [
      "Diagnóstico e mapa de agentes (mapear processos, priorizar por impacto)",
      "Desenho de escopo pelo comercial (entradas/saídas, regras, dados, canal)",
      "Construção na plataforma no-code da Freedom (multiagentes se necessário)",
      "Deploy + operação (agente rodando com governança e monitoramento)",
      "Escala para múltiplas áreas (vendas, financeiro, dados, jurídico, RAG)"
    ],
    perguntasQueVendem: [
      "\"Hoje, quantas áreas estão pedindo IA ao mesmo tempo?\"",
      "\"O que custa mais caro: o tempo perdido, o risco ou a falta de padronização?\"",
      "\"Vocês querem construir plataforma… ou querem agente pronto rodando?\"",
      "\"Qual processo, se resolvesse em 30 dias, traria maior impacto?\"",
      "\"Quem seria o dono interno desse agente? (pra não virar piloto infinito)\"",
      "\"Hoje vocês já têm governança de automações/agentes ou cada área faz do seu jeito?\""
    ],
    impactoNaoTer: [
      "A empresa vira refém de projetos isolados e \"iniciativas soltas\"",
      "Custo explode com retrabalho e múltiplos fornecedores",
      "Agentes não escalam por falta de padrão e ownership",
      "Áreas criam automações paralelas → risco e bagunça"
    ],
    fitForte: [
      "Agente pronto, não \"ferramenta pra você montar\"",
      "Plataforma no-code própria + expertise em arquitetura de agentes",
      "Fornecedor central para todas as áreas (escala por padrão)",
      "Governança e ownership do fluxo (sem piloto infinito)",
      "Multiagentes para processos de média e alta complexidade"
    ],
    redFlags: [
      "\"Quero só testar\" sem escopo e sem dono",
      "Sem patrocinador interno claro",
      "Empresa muito pequena sem processos definidos"
    ],
    objecoes: [
      {
        objecao: "\"Parece muito amplo.\"",
        resposta: "A gente não começa amplo. A gente começa com 1 agente de impacto e cria padrão pra escala."
      },
      {
        objecao: "\"TI vai travar.\"",
        resposta: "Por isso a abordagem é governança + checklist técnico + integração mínima no começo."
      },
      {
        objecao: "\"Quero só testar.\"",
        resposta: "Testar sem escopo vira ruído. A gente faz piloto com métrica e dono."
      }
    ],
    proximoPasso: "\"[NOME], a Freedom é especialista em multiagentes. Em vez de vender plataforma pra você construir, a gente entrega agentes prontos em produção, com governança, canal e integração. E a ideia é virar o fornecedor central de agentes da empresa — começando por 1 caso de uso com impacto em 30 dias e escalando pra outras áreas.\""
  },
  letramento: {
    name: "Letramento IA",
    oQueE: "Letramento IA é um workshop corporativo presencial premium para gerar fluência corporativa em Inteligência Artificial e elevar a maturidade digital do time.",
    paraQuemE: [
      "Liderança (C-levels)",
      "Operações",
      "Marketing",
      "Vendas",
      "Atendimento",
      "RH",
      "Administrativo",
      "Inovação & Estratégia",
      "Qualquer empresa que deseje profissionalizar o uso de IA e criar base cultural para adoção com governança"
    ],
    dorQueResolve: [
      "Falta de conhecimento técnico e conceitual — time \"usa IA\", mas não entende",
      "Uso superficial ou inseguro de IA — risco por falta de boas práticas",
      "Dificuldade de identificar onde aplicar IA de forma produtiva",
      "Medo ou resistência à tecnologia — barreira cultural",
      "Incerteza sobre boas práticas, limites e riscos (privacidade, ética, segurança)"
    ],
    oQueEntrega: {
      intro: "",
      modulos: [
        "Presencial — 16 horas",
        "Imersivo e prático",
        "Conteúdo corporativo e acessível",
        "Demonstrações ao vivo",
        "Exercícios guiados",
        "Material completo incluso",
        "Entrega imediata de conhecimento aplicável"
      ]
    },
    comoViraResultado: [
      "Equipe mais preparada",
      "Uso seguro e eficiente de IA",
      "Menos dúvidas, mais clareza",
      "Mais produtividade no dia a dia",
      "Cultura digital fortalecida"
    ],
    perguntasQueVendem: [
      "\"Hoje sua equipe usa IA de forma padronizada… ou cada um 'do seu jeito'?\"",
      "\"Qual o custo do retrabalho quando alguém usa IA errado e entrega algo inconsistente?\"",
      "\"Quem aqui tem autonomia pra dizer o que pode e o que não pode fazer com IA?\"",
      "\"Se eu pedir 'mostra o playbook de boas práticas de IA da empresa'… existe?\"",
      "\"O que acontece se um colaborador colar dado sensível num prompt amanhã?\"",
      "\"Quanto tempo por semana o time perde 'tentando' IA sem método?\"",
      "\"Qual área teria maior ROI imediato com IA: atendimento, marketing, vendas, RH ou operações?\"",
      "\"Qual seu nível de maturidade: curiosidade, adoção informal ou uso profissional?\"",
      "\"O que te impediria de escalar IA: cultura, risco, falta de padrão ou falta de casos?\"",
      "\"Se eu entrevistar 5 pessoas do time, vou ouvir 5 versões diferentes do que é IA?\"",
      "\"Você quer que IA vire 'moda interna' ou competência operacional?\"",
      "\"Qual decisão hoje é tomada no 'achismo' que poderia ser apoiada por IA com segurança?\""
    ],
    impactoNaoTer: [
      "Você paga o custo do improviso — IA sem método vira ruído, não resultado.",
      "Você cria risco invisível — sem boas práticas, o erro é questão de tempo.",
      "Você perde produtividade — o time \"brinca de IA\" em vez de aplicar com foco.",
      "Você perde vantagem competitiva — empresas preparadas aceleram mais rápido."
    ],
    fitForte: [
      "Liderança quer profissionalizar IA (não só \"testar\")",
      "Time grande/multiáreas e necessidade de padronizar uso",
      "Existe urgência por produtividade e clareza de aplicação",
      "Preocupação real com segurança, privacidade e compliance",
      "Empresa quer criar base cultural para depois escalar automações/agentes"
    ],
    redFlags: [
      "\"Quero só uma palestra motivacional\" — sem intenção de aplicação",
      "\"Não posso mexer em nada / não quero regras\" — sem abertura pra boas práticas",
      "\"IA é só curiosidade\" — sem dor e sem dono interno",
      "Espera \"milagre\" sem mudar rotina e processo"
    ],
    objecoes: [
      {
        objecao: "\"Meu time já usa ChatGPT, não precisa.\"",
        resposta: "Usar e usar bem são coisas diferentes. A pergunta é: existe padrão, boas práticas e governança? Ou cada um faz do jeito que quer — inclusive colando dado sensível?"
      },
      {
        objecao: "\"Isso é treinamento… a gente precisa de entrega, não aula.\"",
        resposta: "Exato — por isso não é palestra. É imersão prática com exercícios, demonstrações e aplicação real. O resultado é gente pronta pra aplicar IA no dia seguinte."
      },
      {
        objecao: "\"Não tenho tempo pra tirar o time 2 dias.\"",
        resposta: "Quanto tempo por semana o time perde tentando IA sem método? Dois dias resolvem o que meses de tentativa e erro não vão resolver."
      },
      {
        objecao: "\"Tenho medo de vazar informação.\"",
        resposta: "Esse é exatamente o ponto. Sem letramento, o risco já existe — só que invisível. O workshop ensina boas práticas de privacidade e segurança."
      },
      {
        objecao: "\"TI/Compliance vai travar isso.\"",
        resposta: "Pelo contrário: compliance é um dos pilares do workshop. O conteúdo inclui governança, limites e boas práticas — é o que TI quer que o time saiba."
      },
      {
        objecao: "\"Não sei se IA serve pro meu setor.\"",
        resposta: "Toda empresa que tem processo repetitivo, decisão com dado e comunicação interna tem espaço pra IA. O workshop mostra onde começar com segurança."
      },
      {
        objecao: "\"Isso é básico demais.\"",
        resposta: "Se o time inteiro já usa IA com padrão, governança e resultado mensurável, ok. Se não, o básico ainda não está resolvido."
      },
      {
        objecao: "\"Isso é avançado demais pro meu time.\"",
        resposta: "O conteúdo é corporativo e acessível. A didática foi construída pra quem não é técnico. Ninguém precisa saber programar."
      },
      {
        objecao: "\"Prefiro um curso online mais barato.\"",
        resposta: "Curso online é conteúdo genérico. Workshop presencial é imersão com aplicação real na sua realidade, com diagnóstico e plano de ação."
      },
      {
        objecao: "\"Qual o ROI de um workshop?\"",
        resposta: "Quanto custa o retrabalho, o risco e a ineficiência de IA sem método? O ROI está no que você deixa de perder a partir do dia seguinte."
      }
    ],
    proximoPasso: ""
  }
};

const ProdutosPage = () => {
  const [activeTab, setActiveTab] = useState<ProductTab>("vision");

  const tabs: { id: ProductTab; name: string }[] = [
    { id: "vision", name: "Vision" },
    { id: "finance", name: "Finance Core" },
    { id: "legal", name: "Legal Hub" },
    { id: "nalk", name: "NALK" },
    { id: "agents", name: "Freedom Agents" },
    { id: "letramento", name: "Letramento IA" }
  ];

  const renderLetramentoProduct = () => {
    const product = products.letramento;
    const perguntasTexto = product.perguntasQueVendem.join("\n");
    const impactoTexto = "Sem fluência e padrão, IA vira tentativa e erro. E tentativa e erro em empresa custa caro.";
    const pitchTexto = "Letramento IA é a fluência corporativa que transforma IA em uso produtivo e seguro. Em 16 horas presenciais, a gente eleva maturidade, cria padrão, reduz risco e entrega um plano inicial com diagnóstico, material completo e diretrizes de próximos passos. Antes de escalar automações e agentes, você precisa preparar pessoas.";

    return (
      <div className="space-y-4 max-w-4xl">
        {/* 1. O que é */}
        <ContentBlock title="1) O que é">
          <div className="space-y-4">
            <div className="p-5 bg-primary-weak/30 rounded-xl border border-primary/20">
              <p className="text-foreground text-lg leading-relaxed">{product.oQueE}</p>
            </div>
            <div className="p-4 bg-primary/10 rounded-xl border border-primary/30">
              <p className="text-foreground font-semibold italic">"O desafio agora não é tecnologia — é preparar pessoas. IA já está redefinindo como empresas operam, decidem e crescem."</p>
            </div>
            <ul className="space-y-2 text-foreground">
              <li className="flex items-start gap-3"><span className="text-primary font-bold">→</span>Não é "palestra". É imersão prática para transformar IA em uso produtivo e seguro no dia a dia.</li>
              <li className="flex items-start gap-3"><span className="text-primary font-bold">→</span>Entrega conhecimento aplicável imediato, com demonstrações e exercícios guiados.</li>
              <li className="flex items-start gap-3"><span className="text-primary font-bold">→</span>Serve como primeiro passo para empresas que querem profissionalizar o uso de IA antes de escalar automações/agentes.</li>
            </ul>
          </div>
        </ContentBlock>

        {/* 2. Para quem é */}
        <ContentBlock title="2) Para quem é (ICP)">
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {product.paraQuemE.slice(0, 8).map((item, index) => (
                <div key={index} className="p-3 bg-card rounded-xl border border-border text-center">
                  <span className="text-foreground text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
            <div className="p-4 bg-primary-weak/30 rounded-xl border border-primary/20">
              <p className="text-foreground text-sm italic">{product.paraQuemE[8]}</p>
            </div>
          </div>
        </ContentBlock>

        {/* 3. Dor que isso resolve */}
        <ContentBlock title="3) Dor que isso resolve">
          <div className="space-y-4">
            <ul className="space-y-2">
              {product.dorQueResolve.map((dor, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-lg bg-destructive/10 text-destructive text-sm font-bold flex items-center justify-center flex-shrink-0">✗</span>
                  <span className="text-foreground">{dor}</span>
                </li>
              ))}
            </ul>
            <div className="p-4 bg-primary/10 rounded-xl border border-primary/30">
              <p className="text-foreground font-semibold italic">"Pra competir num mercado acelerado, é essencial elevar a maturidade digital das equipes."</p>
            </div>
          </div>
        </ContentBlock>

        {/* 4. O que a Freedom entrega */}
        <ContentBlock title="4) O que a Freedom entrega">
          <div className="space-y-6">
            {/* Formato do Workshop */}
            <div>
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">📋 Formato do Workshop</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {product.oQueEntrega.modulos.map((modulo, index) => (
                  <div key={index} className="p-4 bg-card rounded-xl border border-border">
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-lg bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center flex-shrink-0">{index + 1}</span>
                      <span className="text-foreground text-sm">{modulo}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quem conduz */}
            <div>
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">👤 Quem conduz</h4>
              <div className="p-5 bg-card rounded-xl border border-border">
                <p className="text-foreground font-semibold text-lg mb-2">André Cardia</p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Especialista em Ciência de Dados e Inteligência Artificial</li>
                  <li>• Instrutor corporativo</li>
                  <li>• Certificações internacionais</li>
                  <li>• Responsável técnico da Freedom Academy</li>
                </ul>
              </div>
            </div>

            {/* Entregáveis */}
            <div>
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">📦 O que a empresa recebe</h4>
              <div className="space-y-3">
                {[
                  "Diagnóstico de maturidade em IA (com radar/nota de maturidade)",
                  "Workbook impresso",
                  "Certificados individuais",
                  "Material completo do conteúdo",
                  "Relatório pós-workshop com diretrizes iniciais e próximos passos"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-primary-weak/30 rounded-xl border border-primary/20">
                    <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center flex-shrink-0">{index + 1}</span>
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ContentBlock>

        {/* 5. Como isso vira resultado */}
        <ContentBlock title="5) Como isso vira resultado">
          <div className="space-y-4">
            <ul className="space-y-2">
              {product.comoViraResultado.map((resultado, index) => (
                <li key={index} className="flex items-start gap-3 p-3 bg-success-weak/50 rounded-xl border border-success/20">
                  <span className="text-success font-bold">✓</span>
                  <span className="text-foreground">{resultado}</span>
                </li>
              ))}
            </ul>
            <div className="p-4 bg-primary/10 rounded-xl border border-primary/30">
              <p className="text-foreground font-semibold italic">"IA explicada por quem constrói IA — com foco em resultado real."</p>
            </div>
          </div>
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
                  <span className="w-6 h-6 rounded-lg bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center flex-shrink-0">{index + 1}</span>
                  <span className="text-foreground italic">{pergunta}</span>
                </li>
              ))}
            </ul>
          </div>
        </ContentBlock>

        {/* 7. Impacto de não ter */}
        <ContentBlock title="7) Impacto de não ter (o custo invisível)">
          <div className="space-y-4">
            <ul className="space-y-2">
              {product.impactoNaoTer.map((impacto, index) => (
                <li key={index} className="flex items-start gap-3 p-4 bg-destructive/10 rounded-xl border border-destructive/20">
                  <span className="text-destructive font-bold text-lg">⚠</span>
                  <span className="text-foreground">{impacto}</span>
                </li>
              ))}
            </ul>
            <div className="p-4 bg-destructive/10 rounded-xl border border-destructive/20">
              <div className="flex items-center justify-between">
                <p className="text-foreground font-semibold italic">"{impactoTexto}"</p>
                <CopyButton text={impactoTexto} />
              </div>
            </div>
          </div>
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

        {/* 9. Objeções comuns — expandidas */}
        <ObjecoesSection objecoes={objecoesLetramento} />

        {/* Bloco final: Como vender em 20 segundos */}
        <ContentBlock title="🎯 Como vender Letramento IA em 20 segundos" collapsible={false}>
          <div className="p-5 bg-primary-weak/50 rounded-xl border border-primary/30">
            <p className="text-foreground leading-relaxed mb-4">
              "{pitchTexto}"
            </p>
            <div className="flex justify-end">
              <CopyButton text={pitchTexto} />
            </div>
          </div>
        </ContentBlock>
      </div>
    );
  };

  const expandedObjecoesMap: Record<ProductTab, import("@/components/produtos/ObjecoesSection").ExpandedObjection[]> = {
    vision: objecoesVision,
    finance: objecoesFinance,
    legal: objecoesLegal,
    nalk: objecoesNalk,
    agents: objecoesAgents,
    letramento: objecoesLetramento,
  };

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
        <ObjecoesSection objecoes={expandedObjecoesMap[activeTab] || []} />

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
        {activeTab === "letramento" ? renderLetramentoProduct() : renderProduct(products[activeTab])}
      </div>
    </AppLayout>
  );
};

export default ProdutosPage;
