import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHero } from "@/components/ui/PageHero";
import { ContentBlock } from "@/components/ui/ContentBlock";
import { CopyButton } from "@/components/ui/CopyButton";
import { cn } from "@/lib/utils";

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
    oQueE: "Nossa plataforma de IA se conecta às suas câmeras para enxergar, entender e, principalmente, agir sobre os eventos mais críticos da sua operação. Não somos uma ferramenta de vigilância passiva. Somos tecnologia de execução para prevenção de perdas, segurança e produtividade. O Vision não grava imagens. Ele transforma visão em decisão operacional.",
    paraQuemE: [
      "Varejo (alimentar, farmácias, drogarias, postos, conveniência)",
      "Centros de distribuição, indústrias, instituições de ensino",
      "Ambientes com operação viva, múltiplos pontos de atenção e perdas silenciosas",
      "Empresas com câmeras instaladas que querem transformar vídeo em dado e ação"
    ],
    dorQueResolve: [
      "Perdas invisíveis: furtos, fraudes operacionais e conluio entre colaboradores e clientes corroem a margem de lucro silenciosamente",
      "Baixa produtividade: filas longas, ruptura de gôndola e falhas na execução de planogramas impactam experiência do cliente e vendas",
      "Segurança reativa: monitoramento humano é limitado, caro e age apenas depois que o incidente crítico já ocorreu",
      "Sem visibilidade estruturada: tem vídeo, mas não tem dado acionável"
    ],
    oQueEntrega: {
      intro: "Agentes de IA analisam o fluxo de vídeo 24/7 para identificar padrões e anomalias. Detecção em tempo real + alertas contextualizados + dashboard centralizado com heatmaps de risco e trilhas de auditoria.",
      modulos: [
        "Segurança — Furtos em Loja: detecção de movimento de esconder produto, permanência prolongada em zonas de risco, troca de embalagem",
        "Segurança — Fraudes Operacionais: monitoramento de caixa e conluio entre colaboradores e clientes",
        "Segurança — Incidentes Críticos: aglomeração, correria, comportamento suspeito em tempo real",
        "Segurança — Outros Controles: gestão de acesso a áreas restritas e auditoria de rotinas operacionais",
        "Eficiência — Gestão de Filas: monitoramento em tempo real do tamanho das filas e do tempo de espera para otimizar alocação de pessoal",
        "Eficiência — Gestão de Gôndolas: alertas automáticos de ruptura (prateleiras vazias) + auditoria de planograma (posição e precificação correta)"
      ]
    },
    comoViraResultado: [
      "Redução da perda estimada com detecção e prevenção em tempo real",
      "Menos ruptura de estoque com alertas automáticos de reposição",
      "Melhor gestão de filas e aumento de conversão na loja",
      "Dados estruturados para operação e diretoria (dashboard + heatmaps + resumos)",
      "Agente conversacional integrado: pergunte sobre eventos, incidentes e indicadores diretamente ao Vision",
      "Governança e segurança: implantação com validação de boas práticas da Grant Thornton"
    ],
    perguntasQueVendem: [
      "\"Hoje vocês descobrem perda quando? No dia? Na semana? No fechamento?\"",
      "\"Quanto custa 1% de perda a mais por mês na sua operação?\"",
      "\"Suas câmeras servem para ver depois ou para agir na hora?\"",
      "\"Fila é problema de horário, escala ou gargalo do processo? Como vocês medem?\"",
      "\"Ruptura acontece por reposição, pedido ou execução? Vocês têm dado por loja?\"",
      "\"Se eu te der um alerta em tempo real, quem age e em quanto tempo?\""
    ],
    impactoNaoTer: [
      "Você paga perda todo dia e chama de \"normal do varejo\"",
      "Monitoramento humano é limitado e caro — e age só depois que o incidente já ocorreu",
      "Você tem câmera, mas não tem controle (vídeo não é dado, é gravação)",
      "Você perde dinheiro sem conseguir provar onde perdeu e sem conseguir corrigir",
      "Filas longas e ruptura de gôndola impactam vendas e experiência sem que ninguém veja em tempo real"
    ],
    fitForte: [
      "Muitas câmeras / muitas lojas / operação com padrão inconsistente",
      "Dor de perda, filas ou ruptura que \"todo mundo sabe que existe\"",
      "Alguém com dor e poder: operações, prevenção de perdas, diretoria",
      "Abertura para integração com câmeras existentes"
    ],
    redFlags: [
      "\"Quero IA por curiosidade\" sem dor operacional real",
      "Não tem responsável para agir quando o alerta aparece",
      "Infraestrutura impossível / nenhuma abertura para ajustes técnicos"
    ],
    objecoes: [
      {
        objecao: "\"Já tenho câmeras.\"",
        resposta: "Perfeito. Câmera sem inteligência é só gravação. A pergunta é: você quer vídeo ou quer decisão e prevenção em tempo real?"
      },
      {
        objecao: "\"Minha operação é diferente.\"",
        resposta: "Ótimo. O Vision nasce de diagnóstico: o que é repetitivo vira regra. O diferente vira exceção com trilha e evidência."
      }
    ],
    proximoPasso: "\"Agende uma demonstração e veja como podemos transformar a visão da sua operação em resultados. Vamos mapear suas 3 maiores dores (perda, fila, ruptura) e te devolver um desenho de como isso vira alerta + rotina de ação.\""
  },
  finance: {
    name: "Finance Core",
    oQueE: "O Freedom Finance Core é um sistema autônomo que se conecta aos seus sistemas (ERP, CRM, BI) para executar o ciclo financeiro de ponta a ponta. Ele substitui o trabalho manual por uma mão de obra digital que opera 24/7 com padronização, controle e uma trilha de auditoria completa.",
    paraQuemE: [
      "Empresas com alto volume de faturamento e operações financeiras complexas",
      "Operações com recebíveis complexos, conciliações demoradas e retrabalho",
      "CFO/Controller que precisa de previsibilidade, controle e governança (não só relatório)",
      "Empresas com processos de pagamento de fretes, fornecedores e múltiplos documentos fiscais"
    ],
    dorQueResolve: [
      "Pagamentos fraudulentos ou em duplicidade (boletos falsos, erros manuais) descobertos só depois que o dinheiro já saiu do caixa",
      "Processo de validar e pagar fretes extremamente manual e complexo, exigindo cruzamento de múltiplos documentos (NF-e, CT-e, comprovante de entrega)",
      "Gestão de caixa reativa: decisões de captação e postergação tomadas sob pressão, quando o problema de liquidez já está acontecendo",
      "Conciliação lenta, manual e sujeita a erro — duplicidade, erros fiscais e risco de fraude"
    ],
    oQueEntrega: {
      intro: "Agentes autônomos que executam o processo completo (NF → validação → pagamento → conciliação), não apenas tarefas isoladas. Arquitetura própria para ambientes críticos com segurança, escala e trilha de auditoria. Método de implantação com diagnóstico, desenho do processo e acompanhamento de resultados mensuráveis.",
      modulos: [
        "Bloqueio ativo de pagamentos fraudulentos: validação cruzada em tempo real (CNPJ na Receita Federal + base histórica + sinais de adulteração)",
        "Automação do processo de pagamento de fretes: match triplo CT-e + NF-e + comprovante de entrega antes de liberar pagamento",
        "Gestão preditiva do fluxo de caixa: projeção de gaps de liquidez com antecedência a partir de contas a pagar, a receber e histórico",
        "Conciliação bancária inteligente: 98% das transações reconciliadas automaticamente",
        "Validação de NF-e com ERP (SAP e outros) em tempo real"
      ]
    },
    comoViraResultado: [
      "Automação de 70 a 90% do ciclo financeiro, reduzindo drasticamente custos operacionais e retrabalho",
      "Processos padronizados e auditáveis 24/7, eliminando erros fiscais, duplicidades e risco de fraudes",
      "Previsibilidade em tempo real: todos os indicadores financeiros e fluxo de caixa em dashboard único para decisões estratégicas",
      "Eliminação de perdas financeiras por fraude e erro — segurança automatizada acima do nível humano",
      "Redução de até 90% do trabalho manual no processo de fretes, pagando apenas por serviços comprovadamente realizados",
      "Tomada de decisão financeira proativa: antecipar necessidades de caixa e negociar melhores taxas antes da crise de liquidez"
    ],
    perguntasQueVendem: [
      "\"Quanto tempo seu time gasta por semana em conciliação e correção?\"",
      "\"Quantos pagamentos vocês descobrem que estavam errados depois que já saíram do caixa?\"",
      "\"Seu processo de fretes é manual? Quantos documentos precisam cruzar antes de pagar?\"",
      "\"A gestão de caixa de vocês é reativa ou preditiva? Vocês antecipam gaps de liquidez?\"",
      "\"Se eu te desse previsibilidade real do fluxo de caixa hoje, que decisão você tomaria amanhã?\""
    ],
    impactoNaoTer: [
      "Você perde caixa por fraude, erro e duplicidade — e chama de \"custo do financeiro\"",
      "Decisões de captação e pagamento são tomadas sob pressão, quando o problema já está acontecendo",
      "Verificação humana não alcança o nível de segurança que a automação entrega",
      "Você paga fretes por serviços não comprovados e descobre tarde demais",
      "Sua equipe financeira gasta tempo em trabalho repetitivo em vez de decisão estratégica"
    ],
    fitForte: [
      "Volume alto de notas, recebíveis, múltiplos fornecedores e documentos fiscais",
      "CFO/Controller patrocinando (dono do problema)",
      "Processos de pagamento complexos (fretes, fornecedores, conciliação)",
      "Dores com impacto direto em caixa, eficiência e risco de fraude"
    ],
    redFlags: [
      "\"Financeiro é pequeno, não dói\" (até mostrar o custo invisível)",
      "Sem acesso a dados/sistemas ou ninguém para liberar integração mínima"
    ],
    objecoes: [
      {
        objecao: "\"Meu ERP já faz isso.\"",
        resposta: "ERP registra. A pergunta é: ele executa o processo com validação cruzada em tempo real, prevenção de fraude e trilha auditável, ou só vira lançamento que alguém confere manualmente?"
      },
      {
        objecao: "\"Tenho medo de mexer no financeiro.\"",
        resposta: "A arquitetura é feita para ambiente crítico: rastreabilidade, validação e governança desde o primeiro dia. Você ganha controle, não perde."
      }
    ],
    proximoPasso: "\"Libere sua equipe financeira do trabalho repetitivo. Me dá 30 minutos com quem vive o ciclo (faturamento + pagamentos + conciliação) e eu devolvo o mapa do processo + onde a IA assume e o ROI aparece.\""
  },
  legal: {
    name: "Legal Hub",
    oQueE: "O Freedom Legal Hub é um sistema autônomo que atua como uma central de produção, automatizando a criação de peças jurídicas complexas do início ao fim. Não somos um gerador de templates. Somos tecnologia de execução que constrói peças combativas, com padrão técnico elevado e prontas para protocolo. Ele replica a capacidade analítica de um advogado para ler o processo, extrair provas e construir a melhor tese de defesa, liberando sua equipe para o trabalho estratégico.",
    paraQuemE: [
      "Jurídicos corporativos e escritórios de grande porte com alto volume de contencioso",
      "Contencioso massificado: milhares de recursos de apelação, contrarrazões e peças repetitivas",
      "Times que precisam de padrão técnico elevado, escala e redução de risco e contingência"
    ],
    dorQueResolve: [
      "Volume e custo elevado: volume gigantesco de recursos judiciais repetitivos consome horas de advogados em tarefas manuais, inflando custos operacionais",
      "Risco e inconsistência: produção manual em escala gera peças com qualidade variável, quebras de padrão técnico e alto risco de erros, aumentando a contingência",
      "Baixa produtividade: advogados gastam a maior parte do tempo lendo PDFs e extraindo fatos, em vez de focar na estratégia jurídica que agrega valor",
      "Advogados diferentes usam teses diferentes e precedentes desatualizados para casos semelhantes, enfraquecendo a posição jurídica do cliente"
    ],
    oQueEntrega: {
      intro: "Os 3 pilares da entrega: 1) Extração completa de provas — o agente lê centenas de páginas de processo e extrai automaticamente todas as provas cruciais (valores, datas, faturas, logs, fatos). 2) Pipeline jurídico com validações — esteira de validações probatórias, normativas e jurídicas, selecionando automaticamente as melhores teses, precedentes e súmulas. 3) Peça final forte e pronta para protocolo — documento combativo com padrão técnico elevado, pronto para revisão final e protocolo.",
      modulos: [
        "Peças processuais complexas: contrarrazões, recursos, manifestações — únicas e baseadas em evidências do caso",
        "Extração e validação de provas em larga escala: base de dados estruturada vinculando cada fato ao documento de origem",
        "Padrão técnico e jurisprudência atualizada: configurado com as melhores teses e constantemente atualizado com precedentes (súmulas, IRDRs)",
        "Análise e elaboração de contratos (red flags, políticas, modelos)",
        "Gestão de prepostos (escala e instruções de audiência)",
        "Resposta de ofícios + triagem LGPD"
      ]
    },
    comoViraResultado: [
      "Produção de milhares de peças únicas, robustas e baseadas em evidências por mês — elevando a qualidade da defesa em toda a carteira",
      "Advogados liberados da extração manual de dados, focando na estratégia jurídica que agrega valor",
      "\"Padrão ouro\" de qualidade: consistência, rigor técnico e uso dos melhores argumentos jurídicos possíveis em todas as peças",
      "Nenhuma prova crítica esquecida: base estruturada com cada fato vinculado ao documento de origem",
      "Governança: visibilidade completa do pipeline jurídico (peças em produção, contratos em análise, ofícios pendentes, audiências)"
    ],
    perguntasQueVendem: [
      "\"Quantas peças por mês vocês produzem? Quantas são repetitivas?\"",
      "\"Quantas horas por semana viram leitura de PDF e extração de prova?\"",
      "\"Qual o custo de 1 erro de prazo? E o custo de uma peça fraca que aumenta contingência?\"",
      "\"O padrão técnico é o mesmo entre advogados diferentes? Vocês usam as mesmas teses e precedentes?\"",
      "\"Se você pudesse dobrar produção sem dobrar equipe, o que mudaria na sua operação?\""
    ],
    impactoNaoTer: [
      "Você paga advogado para fazer trabalho de máquina — ler PDF e extrair dados manualmente",
      "Produção manual em escala gera peças com qualidade variável e quebras de padrão, aumentando contingência",
      "Advogados diferentes usam teses e precedentes desatualizados, enfraquecendo a defesa do cliente",
      "Provas críticas são esquecidas por erro humano em processos de centenas de páginas",
      "Você perde escala e abre mão de padrão técnico — e isso custa processo"
    ],
    fitForte: [
      "Volume alto de contencioso repetitivo com risco real",
      "Liderança do jurídico patrocinando a mudança",
      "Necessidade de escala sem perder padrão técnico",
      "Carteira com milhares de processos similares (bancos, seguradoras, telecoms)"
    ],
    redFlags: [
      "\"Quer só template\" — sem necessidade de escala ou padrão",
      "Não tem teses/padrões minimamente definidos",
      "Dados/documentos inacessíveis para extração"
    ],
    objecoes: [
      {
        objecao: "\"IA não entende meu caso.\"",
        resposta: "Ela replica a capacidade analítica de ler o processo, extrair provas e construir a melhor tese. O advogado continua no controle final. O ganho é tirar o trabalho braçal e elevar o padrão."
      },
      {
        objecao: "\"Tenho medo de qualidade.\"",
        resposta: "A plataforma é configurada com as melhores teses do escritório e atualizada com precedentes recentes. O resultado é um padrão ouro — consistente e combativo em todas as peças."
      }
    ],
    proximoPasso: "\"Eleve a escala e a qualidade da sua produção jurídica. Me manda 3 exemplos reais de processos/peças e eu te devolvo uma demonstração do 'antes e depois' em cima da sua realidade.\""
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
