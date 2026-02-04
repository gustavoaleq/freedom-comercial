import {
  Fingerprint,
  Scale,
  Target,
  Box,
  LayoutGrid,
  BarChart3,
  CheckCircle2,
  MessageSquare,
  RefreshCw,
  Filter,
  AlertCircle,
  Rocket,
  Wrench,
  LucideIcon
} from "lucide-react";

export interface PlaybookSection {
  id: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  iconColor: "blue" | "purple" | "green" | "orange" | "yellow" | "red" | "teal" | "pink";
  route: string;
}

export const playbookSections: PlaybookSection[] = [
  {
    id: "dna",
    title: "DNA Freedom",
    subtitle: "Identidade, valores e cultura que movem o time.",
    icon: Fingerprint,
    iconColor: "blue",
    route: "/dna"
  },
  {
    id: "lei-comercial",
    title: "Lei do Comercial",
    subtitle: "Vendas é perguntar + impacto de não ter. Princípios e 7 perguntas.",
    icon: Scale,
    iconColor: "purple",
    route: "/lei-comercial"
  },
  {
    id: "icp-qualificacao",
    title: "ICP & Qualificação",
    subtitle: "MQL/SQL, checklist de fit e perguntas que filtram rápido.",
    icon: Target,
    iconColor: "green",
    route: "/icp-qualificacao"
  },
  {
    id: "produtos",
    title: "Produtos",
    subtitle: "Vision, Finance Core e Legal Hub: pitch, fit, perguntas e uso.",
    icon: Box,
    iconColor: "orange",
    route: "/produtos"
  },
  {
    id: "crm-governanca",
    title: "CRM & Governança",
    subtitle: "Regras do pipeline, cores, campos obrigatórios e disciplina.",
    icon: LayoutGrid,
    iconColor: "blue",
    route: "/crm-governanca"
  },
  {
    id: "metricas-gestao",
    title: "Métricas & Gestão",
    subtitle: "KPIs, forecast, conversões e rotinas de análise.",
    icon: BarChart3,
    iconColor: "purple",
    route: "/metricas-gestao"
  },
  {
    id: "checklists",
    title: "Checklists",
    subtitle: "Roteiros práticos para reuniões, proposta e handoff.",
    icon: CheckCircle2,
    iconColor: "green",
    route: "/checklists"
  },
  {
    id: "objecoes",
    title: "Objeções",
    subtitle: "Matriz de respostas + pergunta que destrava + próximo passo.",
    icon: MessageSquare,
    iconColor: "orange",
    route: "/objecoes"
  },
  {
    id: "follow-up",
    title: "Follow-up",
    subtitle: "Cadências e follow-ups inteligentes que geram valor real.",
    icon: RefreshCw,
    iconColor: "blue",
    route: "/follow-up"
  },
  {
    id: "funil-inverso",
    title: "Funil Inverso",
    subtitle: "Engenharia reversa de meta: meta → ganhos → pipeline → reuniões.",
    icon: Filter,
    iconColor: "purple",
    route: "/funil-inverso"
  },
  {
    id: "motivos-perda",
    title: "Motivos de Perda",
    subtitle: "Taxonomia de perdido + aprendizado obrigatório.",
    icon: AlertCircle,
    iconColor: "red",
    route: "/motivos-perda"
  },
  {
    id: "onboarding",
    title: "Onboarding",
    subtitle: "Plano 30-60-90 e ramp-up para novos vendedores.",
    icon: Rocket,
    iconColor: "yellow",
    route: "/onboarding"
  }
];

export const sidebarItems = [
  { title: "Home", route: "/" },
  ...playbookSections.map(s => ({ title: s.title, route: s.route })),
  { title: "Templates Comerciais", route: "/templates", icon: Wrench }
];

// Intenções disponíveis para templates (anti-duplicação)
export const templateIntencoes = [
  "abertura-outbound",
  "abertura-inbound",
  "qualificacao",
  "confirmacao-reuniao",
  "lembrete-1h",
  "no-show",
  "pos-reuniao",
  "pos-proposta",
  "objecao-preco",
  "objecao-tempo",
  "objecao-ti-juridico",
  "objecao-budget",
  "objecao-concorrente",
  "objecao-pensar",
  "reativacao",
  "encerramento",
  "linkedin-conexao",
  "linkedin-pos-conexao",
  "mapeamento-stakeholders",
  "diagnostico",
  "roi-impacto",
  "juridico-procurement",
  "reagendamento",
  "pergunta-poderosa",
  "produto-vision",
  "produto-finance",
  "produto-legal",
  "produto-nalk",
  "produto-agents"
] as const;

export type TemplateIntencao = typeof templateIntencoes[number];

// Templates Database - COM CAMPO INTENÇÃO
export interface Template {
  id: string;
  nome: string;
  tipo: "SDR" | "BDR" | "Closer" | "Gestão" | "CRM" | "Métricas" | "Objeção" | "Checklist" | "Proposta" | "Lost";
  canal: ("WhatsApp" | "Ligação" | "E-mail" | "LinkedIn" | "Presencial")[];
  objetivo: "Agendar" | "Confirmar" | "Fazer comparecer" | "Avançar decisão" | "Destravar TI" | "Destravar Sponsor" | "Recuperar" | "Encerrar elegante";
  tom: "Direto" | "Consultivo" | "Provocativo" | "Técnico" | "Urgente" | "Leve";
  contexto?: "Outbound" | "Inbound" | "Reativação" | "Pós-proposta" | "No-show" | "Vision" | "Finance" | "Legal" | "Nalk" | "Freedom Agents";
  intencao: TemplateIntencao;
  quandoUsar: string;
  perguntaChave: string;
  impactoNaoTer: string;
  template: string;
  proximoPasso: string;
}

// Função anti-duplicação
export function checkDuplicateTemplate(
  newTemplate: Partial<Template>,
  existingTemplates: Template[]
): { isDuplicate: boolean; similarTemplates: Template[]; similarity: number } {
  const similarTemplates: Template[] = [];
  let maxSimilarity = 0;

  for (const existing of existingTemplates) {
    // Verificar intenção igual
    if (newTemplate.intencao && existing.intencao === newTemplate.intencao) {
      // Verificar canal igual
      const hasMatchingChannel = newTemplate.canal?.some(c => existing.canal.includes(c));
      
      if (hasMatchingChannel) {
        // Calcular similaridade de texto
        const newText = (newTemplate.template || "").toLowerCase().replace(/\s+/g, " ");
        const existingText = existing.template.toLowerCase().replace(/\s+/g, " ");
        
        const similarity = calculateTextSimilarity(newText, existingText);
        
        if (similarity >= 0.7) {
          similarTemplates.push(existing);
          maxSimilarity = Math.max(maxSimilarity, similarity);
        }
      }
    }
  }

  return {
    isDuplicate: similarTemplates.length > 0,
    similarTemplates,
    similarity: Math.round(maxSimilarity * 100)
  };
}

// Função auxiliar para calcular similaridade de texto (Jaccard)
function calculateTextSimilarity(text1: string, text2: string): number {
  const words1 = new Set(text1.split(/\s+/).filter(w => w.length > 2));
  const words2 = new Set(text2.split(/\s+/).filter(w => w.length > 2));
  
  const intersection = new Set([...words1].filter(w => words2.has(w)));
  const union = new Set([...words1, ...words2]);
  
  return union.size > 0 ? intersection.size / union.size : 0;
}

export const templates: Template[] = [
  // ========== NOVOS TEMPLATES (LINGUAGEM ATUALIZADA) ==========
  {
    id: "new-outbound-1",
    nome: "Outbound direto — dor + resposta binária",
    tipo: "SDR",
    canal: ["WhatsApp"],
    objetivo: "Agendar",
    tom: "Direto",
    contexto: "Outbound",
    intencao: "abertura-outbound",
    quandoUsar: "Primeiro contato com lead frio",
    perguntaChave: "O custo maior está em tempo, dinheiro ou risco?",
    impactoNaoTer: "Abertura genérica = ignora.",
    template: "[NOME], [SEU NOME] da Freedom.ai. Vou ser direto: hoje o custo maior aí está em tempo, dinheiro ou risco?\nMe responde com 1 palavra que eu te digo onde normalmente dá para atacar primeiro.",
    proximoPasso: "Qualificar baseado na resposta"
  },
  {
    id: "new-outbound-2",
    nome: "Outbound com corte — anti-curioso",
    tipo: "SDR",
    canal: ["WhatsApp"],
    objetivo: "Agendar",
    tom: "Direto",
    contexto: "Outbound",
    intencao: "abertura-outbound",
    quandoUsar: "Quando quer evitar conversa longa",
    perguntaChave: "Vocês querem resolver algo em 30 dias ou isso é pra 'um dia a gente vê'?",
    impactoNaoTer: "Conversa sem corte = perda de tempo.",
    template: "[NOME], pra eu não te puxar pra uma conversa inútil: vocês querem resolver algo em 30 dias ou isso é pra \"um dia a gente vê\"?\nSe for 30 dias, me diga o tema (financeiro / jurídico / operação / vendas).",
    proximoPasso: "Qualificar ou encerrar"
  },
  {
    id: "new-linkedin-1",
    nome: "LinkedIn conexão — autoridade + pergunta",
    tipo: "SDR",
    canal: ["LinkedIn"],
    objetivo: "Agendar",
    tom: "Consultivo",
    contexto: "Outbound",
    intencao: "linkedin-conexao",
    quandoUsar: "Pedido de conexão",
    perguntaChave: "Quero te mandar uma pergunta objetiva sobre [TEMA].",
    impactoNaoTer: "Conexão sem contexto = ignora.",
    template: "[NOME], vi você à frente de [ÁREA] na [EMPRESA]. Trabalho com IA aplicada para reduzir retrabalho e risco em processos críticos.\nQuero te mandar uma pergunta objetiva sobre [TEMA].",
    proximoPasso: "Enviar pergunta pós-conexão"
  },
  {
    id: "new-linkedin-2",
    nome: "Pós-conexão — binário",
    tipo: "SDR",
    canal: ["LinkedIn"],
    objetivo: "Agendar",
    tom: "Direto",
    contexto: "Outbound",
    intencao: "linkedin-pos-conexao",
    quandoUsar: "Após aceitar conexão",
    perguntaChave: "Hoje vocês estão mais travados por processo ou por pessoas?",
    impactoNaoTer: "Conexão aceita sem follow-up = oportunidade perdida.",
    template: "[NOME], rapidinho: hoje vocês estão mais travados por processo ou por pessoas?\nMe diz qual dos dois que eu te devolvo um diagnóstico curto.",
    proximoPasso: "Qualificar e agendar"
  },
  {
    id: "new-confirmacao-1",
    nome: "Confirmação de reunião — sem 'faz sentido'",
    tipo: "SDR",
    canal: ["WhatsApp"],
    objetivo: "Confirmar",
    tom: "Direto",
    intencao: "confirmacao-reuniao",
    quandoUsar: "Agendamento automático entrou (confirmar)",
    perguntaChave: "O foco é tempo, dinheiro ou risco? (1 palavra)",
    impactoNaoTer: "Sem contexto prévio, reunião vira genérica.",
    template: "[NOME], aqui é [SEU NOME] da Freedom.ai. Vi que ficou agendado [DIA] às [HORA].\nPra eu preparar certo: o foco é tempo, dinheiro ou risco? (1 palavra)",
    proximoPasso: "Adaptar pauta da reunião ao contexto"
  },
  {
    id: "new-confirmacao-2",
    nome: "1h antes da reunião — link + compromisso",
    tipo: "SDR",
    canal: ["WhatsApp"],
    objetivo: "Fazer comparecer",
    tom: "Direto",
    intencao: "lembrete-1h",
    quandoUsar: "1 hora antes da reunião",
    perguntaChave: "Entra com 2 informações: onde dói mais e quem decide.",
    impactoNaoTer: "Lembrete 1h antes reduz no-show em até 50%.",
    template: "[NOME], combinando: nossa reunião é em 1h.\nAqui está o link: [LINK].\nEntra por favor com 2 informações na mão: 1) onde dói mais 2) quem decide.",
    proximoPasso: "Aguardar na reunião"
  },
  {
    id: "new-noshow-1",
    nome: "No-show — cobrança elegante + próxima data",
    tipo: "SDR",
    canal: ["WhatsApp"],
    objetivo: "Recuperar",
    tom: "Direto",
    contexto: "No-show",
    intencao: "no-show",
    quandoUsar: "Cliente faltou",
    perguntaChave: "Prefere remarcar hoje ou amanhã? Me responde com 1 ou 2.",
    impactoNaoTer: "Não cobrar = perde controle.",
    template: "[NOME], você não apareceu. Sem drama — só preciso organizar minha agenda.\nPrefere remarcar hoje ou amanhã? Me responde com 1 ou 2.",
    proximoPasso: "Reagendar ou encerrar"
  },
  {
    id: "new-posreuniao-1",
    nome: "Pós-reunião — recap forte + próximo passo fechado",
    tipo: "Closer",
    canal: ["WhatsApp"],
    objetivo: "Avançar decisão",
    tom: "Direto",
    intencao: "pos-reuniao",
    quandoUsar: "Após reunião realizada",
    perguntaChave: "Se faltar alguém decisivo, já me diga quem.",
    impactoNaoTer: "Sem recap escrito, cada um lembra diferente.",
    template: "[NOME], recap objetivo:\n• Dor: [DOR]\n• Custo de manter: [IMPACTO]\n• Resultado esperado: [RESULTADO]\nAgora o próximo passo é: [PASSO] em [DATA/HORA] com [PESSOAS].\nSe faltar alguém decisivo, já me diga quem.",
    proximoPasso: "Executar próximo passo"
  },
  {
    id: "new-posproposta-1",
    nome: "Pós-proposta — sem pedir retorno",
    tipo: "Closer",
    canal: ["WhatsApp"],
    objetivo: "Avançar decisão",
    tom: "Direto",
    contexto: "Pós-proposta",
    intencao: "pos-proposta",
    quandoUsar: "Proposta enviada e silêncio",
    perguntaChave: "O que está travando: decisão, orçamento, jurídico/compras ou prioridade?",
    impactoNaoTer: "Perguntar 'viu a proposta?' não gera decisão.",
    template: "[NOME], eu não vou perguntar 'viu a proposta'. Vou ser prático: o que está travando isso agora é\n1) decisão 2) orçamento 3) jurídico/compras 4) prioridade.\nMe responde com um número.",
    proximoPasso: "Atacar pendência identificada"
  },
  {
    id: "new-posproposta-2",
    nome: "Pós-proposta — puxar evento e data",
    tipo: "Closer",
    canal: ["WhatsApp"],
    objetivo: "Avançar decisão",
    tom: "Consultivo",
    contexto: "Pós-proposta",
    intencao: "pos-proposta",
    quandoUsar: "Para transformar em evidência real",
    perguntaChave: "Qual é o próximo evento interno que define isso?",
    impactoNaoTer: "Sem data de evento, forecast é chute.",
    template: "[NOME], qual é o próximo evento interno que define isso? (CFO, jurídico, comitê).\nSe você me der nome + data, eu encaixo o processo e a gente resolve sem arrastar.",
    proximoPasso: "Alinhar com evento do cliente"
  },
  {
    id: "new-objecao-caro-1",
    nome: "\"Tá caro\" — versão afiada",
    tipo: "Closer",
    canal: ["WhatsApp"],
    objetivo: "Avançar decisão",
    tom: "Provocativo",
    intencao: "objecao-preco",
    quandoUsar: "Objeção de preço",
    perguntaChave: "Qual é a conta mensal de manter [DOR] do jeito atual?",
    impactoNaoTer: "Sem número, você negocia no escuro.",
    template: "[NOME], justo. Só tem uma pergunta que decide se é caro ou barato:\nqual é a conta mensal de manter [DOR] do jeito atual?\nSe a conta for menor que o investimento, eu mesmo pauso isso aqui.",
    proximoPasso: "Calcular ROI ou pausar"
  },
  {
    id: "new-objecao-ti-1",
    nome: "\"Preciso falar com TI/Jurídico\" — sem submissão",
    tipo: "Closer",
    canal: ["WhatsApp"],
    objetivo: "Destravar TI",
    tom: "Direto",
    intencao: "objecao-ti-juridico",
    quandoUsar: "Cliente joga pra TI/jurídico sem dono",
    perguntaChave: "Quem é a pessoa (nome/cargo) e quando ela entra?",
    impactoNaoTer: "Sem responsável + data, isso vira fila e morre.",
    template: "Perfeito. Sem TI/jurídico, isso não anda mesmo.\nQuem é a pessoa (nome/cargo) e quando ela entra?\nSe não tiver responsável + data, isso vira fila e morre.",
    proximoPasso: "Agendar com TI/jurídico"
  },
  {
    id: "new-reativacao-1",
    nome: "Reativação — gatilho com corte",
    tipo: "SDR",
    canal: ["WhatsApp"],
    objetivo: "Recuperar",
    tom: "Direto",
    contexto: "Reativação",
    intencao: "reativacao",
    quandoUsar: "Lead antigo parado",
    perguntaChave: "Isso morreu por prioridade ou por orçamento? (1 palavra)",
    impactoNaoTer: "Lead parado esquece de você.",
    template: "[NOME], vou fechar seu contato pra não virar ruído na sua caixa.\nAntes: isso morreu por prioridade ou por orçamento? (1 palavra)",
    proximoPasso: "Requalificar ou encerrar"
  },
  {
    id: "new-vision-1",
    nome: "Vision — sem 'faz sentido'",
    tipo: "SDR",
    canal: ["WhatsApp"],
    objetivo: "Agendar",
    tom: "Provocativo",
    contexto: "Vision",
    intencao: "produto-vision",
    quandoUsar: "Lead com operação e câmeras",
    perguntaChave: "Qual evento hoje custa mais caro: perda, fila, risco ou comportamento?",
    impactoNaoTer: "Câmera sem IA = custo sem retorno.",
    template: "[NOME], vocês já têm câmera. A pergunta é: ela serve pra ver depois ou pra agir na hora?\nQual evento hoje custa mais caro aí: perda, fila, risco ou comportamento?",
    proximoPasso: "Agendar discovery de Vision"
  },
  {
    id: "new-agents-1",
    nome: "Freedom Agents — clareza enterprise",
    tipo: "Closer",
    canal: ["WhatsApp"],
    objetivo: "Agendar",
    tom: "Consultivo",
    contexto: "Freedom Agents",
    intencao: "produto-agents",
    quandoUsar: "Discovery enterprise multiáreas",
    perguntaChave: "Vocês estão travados porque cada área pede uma coisa ou porque TI não tem braço?",
    impactoNaoTer: "Sem diagnóstico, você vende feature.",
    template: "[NOME], empresas enterprise não querem 'aprender plataforma'. Elas querem agente pronto rodando.\nHoje vocês estão travados porque cada área pede uma coisa ou porque TI não tem braço?\nMe responde: áreas ou TI.",
    proximoPasso: "Direcionar conversa para dor principal"
  },

  // ========== TEMPLATES EXISTENTES (LINGUAGEM ATUALIZADA) ==========
  // SDR/BDR Templates
  {
    id: "sdr-1",
    nome: "Abertura — Dor direta",
    tipo: "SDR",
    canal: ["E-mail", "LinkedIn"],
    objetivo: "Agendar",
    tom: "Direto",
    contexto: "Outbound",
    intencao: "abertura-outbound",
    quandoUsar: "Primeiro contato com lead frio",
    perguntaChave: "Qual processo manual mais trava sua operação hoje?",
    impactoNaoTer: "Enquanto vocês fazem isso manualmente, o concorrente automatiza.",
    template: "Oi [Nome], tudo bem?\n\nVi que a [Empresa] atua em [segmento]. Uma pergunta rápida:\n\nQual processo repetitivo mais trava a operação de vocês hoje?\n\nPergunto porque ajudamos empresas como a [Referência do setor] a eliminar retrabalho com IA que executa de verdade.\n\nSe tiver fit, te devolvo um diagnóstico em 15 min. Se não tiver, eu mesmo pauso.\n\nAbs,\n[Seu nome]",
    proximoPasso: "Agendar call de qualificação"
  },
  {
    id: "sdr-2",
    nome: "Abertura — Dor + dono",
    tipo: "SDR",
    canal: ["E-mail", "LinkedIn"],
    objetivo: "Agendar",
    tom: "Consultivo",
    contexto: "Outbound",
    intencao: "abertura-outbound",
    quandoUsar: "Quando você sabe quem é o responsável pelo problema",
    perguntaChave: "Quem sofre mais com esse gargalo hoje?",
    impactoNaoTer: "Sem identificar o dono, a demanda morre na caixa de entrada.",
    template: "Oi [Nome],\n\nEmpresas do porte de vocês geralmente têm um desafio: [problema específico do segmento].\n\nQuem na [Empresa] cuida disso hoje? Você ou outra pessoa?\n\nQuero entender se vale apresentar como outras empresas resolveram isso com agentes de IA.\n\n15 minutos essa semana funcionam?\n\nAbs,\n[Seu nome]",
    proximoPasso: "Identificar sponsor e agendar"
  },
  {
    id: "sdr-3",
    nome: "Impacto de não ter — 90 dias",
    tipo: "SDR",
    canal: ["WhatsApp", "E-mail"],
    objetivo: "Agendar",
    tom: "Provocativo",
    intencao: "roi-impacto",
    quandoUsar: "Quando lead demonstrou interesse mas não agendou",
    perguntaChave: "O que acontece nos próximos 90 dias se nada mudar?",
    impactoNaoTer: "Daqui 90 dias o problema vai estar maior, não menor.",
    template: "[Nome], pensando aqui...\n\nSe vocês não resolverem [problema identificado] nos próximos 90 dias, o que acontece?\n\nPergunto porque muitas empresas deixam pra depois e o custo invisível só cresce.\n\nUma conversa de 15 min pode mostrar se existe atalho. Qual horário funciona: manhã ou tarde?",
    proximoPasso: "Forçar decisão de agenda"
  },
  {
    id: "sdr-4",
    nome: "Qualificação rápida — 3 perguntas",
    tipo: "SDR",
    canal: ["Ligação", "WhatsApp"],
    objetivo: "Agendar",
    tom: "Direto",
    intencao: "qualificacao",
    quandoUsar: "Para filtrar rapidamente se vale avançar",
    perguntaChave: "Volume, urgência e autonomia de decisão?",
    impactoNaoTer: "Sem filtrar rápido, você perde tempo com deal que não fecha.",
    template: "[Nome], antes de agendar a conversa, 3 perguntas rápidas:\n\n1. Qual volume mensal vocês processam de [processo]?\n2. Isso é prioridade Q1 ou mais pra frente?\n3. Você decide ou precisa envolver mais alguém?\n\nMe responde que eu te digo se vale a conversa ou não.",
    proximoPasso: "Qualificar ou descartar"
  },
  {
    id: "sdr-5",
    nome: "Corte elegante — dados",
    tipo: "SDR",
    canal: ["WhatsApp", "E-mail"],
    objetivo: "Encerrar elegante",
    tom: "Leve",
    intencao: "encerramento",
    quandoUsar: "Quando não há fit claro",
    perguntaChave: "Vou pausar e voltar quando tiver estrutura.",
    impactoNaoTer: "Forçar deal sem fit queima relacionamento futuro.",
    template: "[Nome], pensando no que você disse...\n\nParece que hoje vocês ainda não têm [dados/volume/estrutura] pra extrair o máximo de uma solução como a nossa.\n\nVou pausar e voltar em [prazo] quando isso estiver mais maduro.\n\nSem problema nenhum, prefiro ser honesto do que forçar algo que não vai funcionar.",
    proximoPasso: "Marcar lembrete para retorno futuro"
  },
  {
    id: "sdr-6",
    nome: "Sponsor — quem assina e quem trava",
    tipo: "SDR",
    canal: ["Ligação", "WhatsApp"],
    objetivo: "Destravar Sponsor",
    tom: "Consultivo",
    intencao: "mapeamento-stakeholders",
    quandoUsar: "Para mapear decision makers",
    perguntaChave: "Quem assina o contrato e quem pode vetar?",
    impactoNaoTer: "Sem sponsor mapeado, proposta morre no limbo.",
    template: "[Nome], pra gente não perder tempo...\n\nQuem na empresa:\n- Assina esse tipo de contrato?\n- Pode vetar ou travar a decisão?\n- Cuida da parte técnica de integração?\n\nQuero garantir que a gente envolva as pessoas certas desde o início.",
    proximoPasso: "Mapear stakeholders"
  },
  {
    id: "sdr-7",
    nome: "Volume — onde aparece ROI",
    tipo: "SDR",
    canal: ["Ligação", "E-mail"],
    objetivo: "Agendar",
    tom: "Técnico",
    intencao: "qualificacao",
    quandoUsar: "Para dimensionar oportunidade",
    perguntaChave: "Quantos [processos] vocês fazem por mês?",
    impactoNaoTer: "Sem volume, não existe ROI que justifique o projeto.",
    template: "[Nome], uma pergunta de negócio:\n\nQuantos [notas fiscais / contratos / análises / atendimentos] vocês processam por mês?\n\nPergunto porque nosso ROI aparece a partir de [X] volume. Abaixo disso, geralmente não vale.\n\nMe conta o número que te digo se vale a conversa.",
    proximoPasso: "Qualificar por volume"
  },
  {
    id: "sdr-8",
    nome: "Prioridade — chato vs insustentável",
    tipo: "SDR",
    canal: ["Ligação", "WhatsApp"],
    objetivo: "Agendar",
    tom: "Provocativo",
    intencao: "qualificacao",
    quandoUsar: "Para testar urgência real",
    perguntaChave: "Isso é um incômodo ou um problema insustentável?",
    impactoNaoTer: "Se é só chato, não vira prioridade. Se é insustentável, fecha.",
    template: "[Nome], pergunta direta:\n\nEsse problema de [X] é um incômodo que dá pra conviver ou já virou insustentável?\n\nSe for incômodo, talvez não seja o momento.\nSe for insustentável, a gente precisa conversar essa semana.\n\nQual dos dois?",
    proximoPasso: "Forçar declaração de prioridade"
  },
  {
    id: "sdr-9",
    nome: "Confirmação imediata — reunião automática",
    tipo: "SDR",
    canal: ["WhatsApp", "E-mail"],
    objetivo: "Confirmar",
    tom: "Direto",
    intencao: "confirmacao-reuniao",
    quandoUsar: "Imediatamente após agendar",
    perguntaChave: "Confirma presença e agenda?",
    impactoNaoTer: "Sem confirmação imediata, no-show aumenta 40%.",
    template: "[Nome], confirmado!\n\n📅 [Data e hora]\n📍 [Link da reunião]\n\nVou te mandar um lembrete 1h antes.\n\nSó pra confirmar: [Fulano] também participa ou só você?\n\nNos vemos [dia]!",
    proximoPasso: "Enviar lembrete 1h antes"
  },
  {
    id: "sdr-11",
    nome: "Sumiu — prioridade/pausa",
    tipo: "SDR",
    canal: ["WhatsApp", "E-mail"],
    objetivo: "Recuperar",
    tom: "Direto",
    contexto: "Reativação",
    intencao: "reativacao",
    quandoUsar: "Quando lead parou de responder",
    perguntaChave: "Ainda é prioridade ou prefere que eu pause?",
    impactoNaoTer: "Ficar no limbo é pior do que um não.",
    template: "[Nome], percebi que a conversa esfriou.\n\nSem problema! Só quero entender:\n\n1. Mudou a prioridade?\n2. Entrou outro projeto na frente?\n3. Só correria mesmo?\n\nMe diz que eu organizo aqui do meu lado.",
    proximoPasso: "Definir próximo passo ou encerrar"
  },
  {
    id: "sdr-12",
    nome: "Valor novo — dono do dado vs dono do processo",
    tipo: "SDR",
    canal: ["E-mail", "LinkedIn"],
    objetivo: "Avançar decisão",
    tom: "Consultivo",
    intencao: "mapeamento-stakeholders",
    quandoUsar: "Para adicionar valor ao follow-up",
    perguntaChave: "Quem é dono do processo e quem é dono do dado?",
    impactoNaoTer: "Sem valor novo, follow-up vira cobrança.",
    template: "[Nome], pensando na nossa conversa...\n\nVi que em empresas como a [Empresa], geralmente existe uma pessoa que é dona do processo (operação) e outra que é dona do dado (TI/dados).\n\nQuem são esses dois na [Empresa]? Isso muda o desenho da solução.\n\nMe conta que eu preparo algo mais direcionado.",
    proximoPasso: "Mapear stakeholders técnicos"
  },
  {
    id: "sdr-13",
    nome: "Pré-mortem leve — dados ou política",
    tipo: "SDR",
    canal: ["Ligação", "WhatsApp"],
    objetivo: "Destravar TI",
    tom: "Consultivo",
    intencao: "diagnostico",
    quandoUsar: "Para antecipar travas",
    perguntaChave: "O que pode travar: dados ou política interna?",
    impactoNaoTer: "Trava descoberta tarde mata o deal.",
    template: "[Nome], antes de avançar, uma pergunta de pré-mortem:\n\nNa sua visão, o que pode travar esse projeto:\n\n1. Questão de dados (acesso, qualidade, integração)?\n2. Questão de política interna (aprovações, budget, TI)?\n\nQuero antecipar qualquer obstáculo agora, não no final.",
    proximoPasso: "Desenhar plano para destravar"
  },
  {
    id: "sdr-14",
    nome: "Diagnóstico sem venda — devolver impacto",
    tipo: "SDR",
    canal: ["E-mail", "LinkedIn"],
    objetivo: "Agendar",
    tom: "Consultivo",
    intencao: "diagnostico",
    quandoUsar: "Abordagem de valor antes de vender",
    perguntaChave: "Posso fazer um diagnóstico rápido e devolver pra você?",
    impactoNaoTer: "Sem valor antecipado, você é só mais um vendedor.",
    template: "[Nome], proposta:\n\nPosso fazer um diagnóstico rápido do processo de [X] de vocês — sem compromisso, sem apresentação de produto.\n\nTe devolvo um relatório de 1 página com:\n- Onde vocês estão perdendo tempo/dinheiro\n- Quanto isso custa por mês (estimativa)\n- O que empresas parecidas fizeram\n\nSe fizer sentido pra você, a gente conversa. Se não, você fica com o material.\n\nTopa?",
    proximoPasso: "Agendar call de diagnóstico"
  },
  {
    id: "sdr-15",
    nome: "\"Não agora\" — condição de retorno",
    tipo: "SDR",
    canal: ["WhatsApp", "E-mail"],
    objetivo: "Encerrar elegante",
    tom: "Leve",
    intencao: "encerramento",
    quandoUsar: "Quando lead adia indefinidamente",
    perguntaChave: "O que precisa acontecer pra virar prioridade?",
    impactoNaoTer: "Sem condição clara, você volta no escuro.",
    template: "[Nome], entendi que agora não é o momento.\n\nSó pra eu saber quando voltar:\n\nO que precisa acontecer na [Empresa] pra isso virar prioridade?\n\n- Virada de quarter?\n- Budget novo?\n- Algum evento específico?\n\nMe conta que eu programo aqui.",
    proximoPasso: "Marcar retorno condicional"
  },
  {
    id: "sdr-16",
    nome: "Ligação — abertura direta",
    tipo: "SDR",
    canal: ["Ligação"],
    objetivo: "Agendar",
    tom: "Direto",
    contexto: "Outbound",
    intencao: "abertura-outbound",
    quandoUsar: "Abertura de cold call",
    perguntaChave: "Tem 2 minutos pra eu explicar por que liguei?",
    impactoNaoTer: "Abertura ruim = desligam em 10 segundos.",
    template: "Oi [Nome], aqui é [Seu nome] da Freedom AI.\n\nSei que você não tava esperando essa ligação. Tem 2 minutos pra eu explicar por que liguei?\n\n[Se sim]\n\nA gente ajuda empresas como a [Referência] a automatizar [processo] com IA. Não é chatbot, é agente que executa de verdade.\n\nQuero entender se vale uma conversa de 15 min essa semana.",
    proximoPasso: "Agendar ou marcar retorno"
  },
  {
    id: "sdr-17",
    nome: "Ligação — CTA sem enrolação",
    tipo: "SDR",
    canal: ["Ligação"],
    objetivo: "Agendar",
    tom: "Urgente",
    intencao: "abertura-outbound",
    quandoUsar: "Fechamento de cold call",
    perguntaChave: "Quinta às 10h ou sexta às 14h?",
    impactoNaoTer: "CTA aberto = perda de controle.",
    template: "Então, [Nome], pra gente não perder tempo:\n\nPosso te mandar um convite pra uma conversa de 15 min.\n\nQual funciona melhor: quinta às 10h ou sexta às 14h?\n\n[Espera resposta — se enrolar, repete opções]",
    proximoPasso: "Enviar convite imediatamente"
  },
  {
    id: "sdr-18",
    nome: "LinkedIn — mensagem 1",
    tipo: "SDR",
    canal: ["LinkedIn"],
    objetivo: "Agendar",
    tom: "Leve",
    contexto: "Outbound",
    intencao: "linkedin-conexao",
    quandoUsar: "Primeira conexão LinkedIn",
    perguntaChave: "Vi que você cuida de [área]. Como tá esse desafio aí?",
    impactoNaoTer: "Mensagem genérica = ignora.",
    template: "Oi [Nome]!\n\nVi que você cuida de [área] na [Empresa]. Uma curiosidade:\n\nComo vocês estão lidando com [desafio comum do segmento] hoje?\n\nPergunto porque ajudamos empresas parecidas a resolver isso com IA — e queria entender se vale trocar uma ideia.\n\nAbs!",
    proximoPasso: "Aguardar resposta e qualificar"
  },

  // Closer Templates
  {
    id: "closer-1",
    nome: "Abertura — \"não vim mostrar IA\"",
    tipo: "Closer",
    canal: ["Presencial", "Ligação"],
    objetivo: "Avançar decisão",
    tom: "Consultivo",
    intencao: "diagnostico",
    quandoUsar: "Início da reunião de descoberta",
    perguntaChave: "O que te fez aceitar essa conversa?",
    impactoNaoTer: "Começar por produto = perda de controle.",
    template: "[Nome], antes de qualquer coisa:\n\nNão vim aqui mostrar IA. Vim entender se a gente consegue resolver um problema real de vocês.\n\nO que te fez aceitar essa conversa? O que tá pegando de verdade?",
    proximoPasso: "Mergulhar no diagnóstico"
  },
  {
    id: "closer-2",
    nome: "Pergunta processo fim a fim",
    tipo: "Closer",
    canal: ["Presencial", "Ligação"],
    objetivo: "Avançar decisão",
    tom: "Consultivo",
    intencao: "diagnostico",
    quandoUsar: "Para entender o fluxo completo",
    perguntaChave: "Me conta o processo do início ao fim — onde trava?",
    impactoNaoTer: "Sem entender o processo, você prescreve errado.",
    template: "Me ajuda a entender:\n\nComo funciona esse processo do início ao fim?\n\n- Começa onde? Termina onde?\n- Quem toca cada etapa?\n- Onde trava? Onde dá mais retrabalho?\n\nQuero montar o mapa antes de pensar em solução.",
    proximoPasso: "Documentar processo e gargalos"
  },
  {
    id: "closer-3",
    nome: "Volume",
    tipo: "Closer",
    canal: ["Presencial", "Ligação"],
    objetivo: "Avançar decisão",
    tom: "Técnico",
    intencao: "qualificacao",
    quandoUsar: "Para dimensionar ROI",
    perguntaChave: "Qual o volume mensal? Quantas pessoas fazem isso?",
    impactoNaoTer: "Sem volume, não existe business case.",
    template: "Pra eu dimensionar:\n\n- Quantos [processos/transações/documentos] por mês?\n- Quantas pessoas fazem isso hoje?\n- Quanto tempo cada uma gasta nisso?\n\nQuero entender o tamanho da dor antes de pensar em solução.",
    proximoPasso: "Calcular custo atual vs. automação"
  },
  {
    id: "closer-4",
    nome: "Custo invisível",
    tipo: "Closer",
    canal: ["Presencial", "Ligação"],
    objetivo: "Avançar decisão",
    tom: "Provocativo",
    intencao: "roi-impacto",
    quandoUsar: "Para descobrir dor financeira oculta",
    perguntaChave: "Qual custo ninguém coloca na planilha?",
    impactoNaoTer: "Custo invisível é onde está o ROI de verdade.",
    template: "Uma pergunta que poucas empresas conseguem responder:\n\nQuando esse processo dá errado, quanto custa?\n\n- Retrabalho?\n- Perda de cliente?\n- Multa ou penalidade?\n- Hora de gente sênior apagando incêndio?\n\nQuero entender o custo que não aparece no orçamento.",
    proximoPasso: "Quantificar impacto financeiro"
  },
  {
    id: "closer-5",
    nome: "Impacto mensal",
    tipo: "Closer",
    canal: ["Presencial", "Ligação"],
    objetivo: "Avançar decisão",
    tom: "Provocativo",
    intencao: "roi-impacto",
    quandoUsar: "Para criar urgência",
    perguntaChave: "Quanto vocês perdem por mês enquanto isso não muda?",
    impactoNaoTer: "Sem número mensal, não existe pressão de timing.",
    template: "Vamos colocar um número:\n\nSe vocês gastam [X horas] com isso por mês, a [R$ Y/hora], são R$ [Z] por mês.\n\nSão [Z × 12] por ano.\n\nE isso tá acontecendo todo mês, certo?\n\nQuanto tempo vocês aceitam conviver com isso?",
    proximoPasso: "Validar número e criar proposta"
  },
  {
    id: "closer-6",
    nome: "Impacto risco",
    tipo: "Closer",
    canal: ["Presencial", "Ligação"],
    objetivo: "Avançar decisão",
    tom: "Provocativo",
    intencao: "roi-impacto",
    quandoUsar: "Quando dor é de risco, não de custo",
    perguntaChave: "Se isso estourar, estoura onde?",
    impactoNaoTer: "Risco não quantificado = prioridade baixa.",
    template: "Pergunta de risco:\n\nSe esse processo falhar de verdade — não um erro pequeno, um estouro grande — o que acontece?\n\n- Perda de cliente grande?\n- Problema regulatório?\n- Dano de imagem?\n\nQuero entender o tamanho do risco, não só o custo do dia a dia.",
    proximoPasso: "Conectar solução à mitigação de risco"
  },
  {
    id: "closer-7",
    nome: "Sponsor",
    tipo: "Closer",
    canal: ["Presencial", "Ligação"],
    objetivo: "Destravar Sponsor",
    tom: "Direto",
    intencao: "mapeamento-stakeholders",
    quandoUsar: "Para mapear poder de decisão",
    perguntaChave: "Quem assina e quem pode travar?",
    impactoNaoTer: "Deal sem sponsor morre no funil.",
    template: "Pra gente não perder tempo no processo:\n\n- Quem assina esse tipo de contrato? É você ou precisa de alguém acima?\n- Tem alguém que pode vetar — TI, jurídico, financeiro?\n- Preciso envolver essas pessoas já na próxima conversa?",
    proximoPasso: "Mapear e agendar com decisores"
  },
  {
    id: "closer-8",
    nome: "Dados",
    tipo: "Closer",
    canal: ["Presencial", "Ligação"],
    objetivo: "Destravar TI",
    tom: "Técnico",
    intencao: "diagnostico",
    quandoUsar: "Para validar viabilidade técnica",
    perguntaChave: "Os dados existem? Estão acessíveis? Em que formato?",
    impactoNaoTer: "Sem dados, não existe IA. Ponto.",
    template: "Sobre a parte técnica:\n\n- Os dados que a gente precisa existem hoje? Onde estão?\n- Estão em sistema (ERP, CRM) ou em planilhas/PDFs?\n- Conseguimos acesso via API ou precisa de extração manual?\n- Quem é o dono técnico desses dados?\n\nSem isso claro, não consigo garantir prazo nem resultado.",
    proximoPasso: "Agendar call técnica com TI"
  },
  {
    id: "closer-9",
    nome: "Próximo passo com data e dono",
    tipo: "Closer",
    canal: ["Presencial", "Ligação"],
    objetivo: "Avançar decisão",
    tom: "Direto",
    intencao: "pos-reuniao",
    quandoUsar: "Fechamento de toda reunião",
    perguntaChave: "Qual o próximo passo, quando e quem é o dono?",
    impactoNaoTer: "Reunião sem próximo passo = deal morre.",
    template: "Antes de terminar, vamos travar o próximo passo:\n\n1. O que precisa acontecer pra gente avançar?\n2. Quando fazemos isso?\n3. Quem é o dono de cada ação?\n\nVou te mandar um resumo por escrito com esses pontos agora.",
    proximoPasso: "Enviar resumo e agendar próxima etapa"
  },
  {
    id: "closer-11",
    nome: "Pós-proposta — mini ROI",
    tipo: "Closer",
    canal: ["WhatsApp", "E-mail"],
    objetivo: "Avançar decisão",
    tom: "Técnico",
    contexto: "Pós-proposta",
    intencao: "pos-proposta",
    quandoUsar: "Follow-up após envio de proposta",
    perguntaChave: "Quer revisar o ROI juntos?",
    impactoNaoTer: "Proposta sem ROI vira planilha de preço.",
    template: "[Nome], passando pra ver se teve chance de olhar a proposta.\n\nPensando no que conversamos:\n\n- Custo atual: R$ [X]/mês\n- Investimento Freedom: R$ [Y]/mês\n- Economia líquida: R$ [X-Y]/mês\n- Payback: [Z] meses\n\nQuer revisar esses números juntos? Me confirma um horário.",
    proximoPasso: "Agendar call de revisão"
  },
  {
    id: "closer-12",
    nome: "Pós-proposta — pré-mortem",
    tipo: "Closer",
    canal: ["WhatsApp", "Ligação"],
    objetivo: "Avançar decisão",
    tom: "Consultivo",
    contexto: "Pós-proposta",
    intencao: "pos-proposta",
    quandoUsar: "Quando proposta está parada",
    perguntaChave: "O que pode matar esse deal?",
    impactoNaoTer: "Objeção não surfada = deal perdido de surpresa.",
    template: "[Nome], pergunta de pré-mortem:\n\nSe esse projeto morrer nas próximas 2 semanas, qual vai ser o motivo?\n\n1. Prioridade mudou?\n2. Budget travou?\n3. Alguém interno vetou?\n4. Outra coisa?\n\nMe conta que a gente resolve antes de virar problema.",
    proximoPasso: "Resolver trava identificada"
  },
  {
    id: "closer-13",
    nome: "Proposta — entrega executiva",
    tipo: "Closer",
    canal: ["E-mail"],
    objetivo: "Avançar decisão",
    tom: "Consultivo",
    intencao: "pos-proposta",
    quandoUsar: "Envio formal de proposta",
    perguntaChave: "Montei baseado na nossa conversa. Falta algo?",
    impactoNaoTer: "Proposta sem contexto = comparação de preço.",
    template: "Assunto: Proposta Freedom AI — [Empresa]\n\n[Nome],\n\nConforme alinhamos, segue a proposta.\n\n**Resumo:**\n- Problema: [Dor identificada]\n- Solução: [O que entregamos]\n- Resultado esperado: [Métrica ou benefício]\n- Investimento: R$ [X]/mês\n- Prazo de implantação: [Y] semanas\n\nAnexei o documento completo.\n\nMontei baseado na nossa conversa — se faltou algo, me avisa que ajusto.\n\nPróximo passo: [Ação + data]\n\nAbs,\n[Seu nome]",
    proximoPasso: "Aguardar feedback e ligar em 48h"
  },
  {
    id: "closer-14",
    nome: "Negociação — âncora e valor",
    tipo: "Closer",
    canal: ["Presencial", "Ligação"],
    objetivo: "Avançar decisão",
    tom: "Consultivo",
    intencao: "objecao-preco",
    quandoUsar: "Quando cliente quer desconto",
    perguntaChave: "O que é mais importante: preço ou resultado?",
    impactoNaoTer: "Negociar sem âncora = perder margem desnecessária.",
    template: "[Nome], entendo que preço é importante.\n\nMas antes de falar em desconto, deixa eu te fazer uma pergunta:\n\nO que é mais importante pra vocês: pagar menos ou ter certeza que vai funcionar?\n\nPergunto porque se a prioridade for resultado, talvez a gente precise manter [X] no escopo. Se for preço, a gente pode ajustar [Y].\n\nO que faz mais sentido?",
    proximoPasso: "Ajustar escopo ou manter valor"
  },
  {
    id: "closer-15",
    nome: "Fechamento — resumo final",
    tipo: "Closer",
    canal: ["Presencial", "Ligação"],
    objetivo: "Avançar decisão",
    tom: "Direto",
    intencao: "pos-proposta",
    quandoUsar: "Momento de pedir o fechamento",
    perguntaChave: "Fechamos?",
    impactoNaoTer: "Não pedir o fechamento = prolongar ciclo à toa.",
    template: "[Nome], deixa eu resumir:\n\n- Problema: [X]\n- Custo de não resolver: [Y]\n- O que entregamos: [Z]\n- Investimento: [R$]\n- Prazo: [semanas]\n\nVocê tinha dúvida sobre [ponto levantado] — resolvemos isso.\n\nTem mais alguma coisa que você precisa saber antes de avançar?\n\n[Se não]\n\nFechamos?",
    proximoPasso: "Enviar contrato ou alinhar próximos passos"
  },

  // Templates de confirmação
  {
    id: "confirmacao-1",
    nome: "Confirmação — Agendamento automático (dor antes)",
    tipo: "SDR",
    canal: ["WhatsApp"],
    objetivo: "Confirmar",
    tom: "Consultivo",
    intencao: "confirmacao-reuniao",
    quandoUsar: "Assim que uma reunião entrar via Typebot (Lead Score ≥ 50)",
    perguntaChave: "Qual é a dor nº1 que você quer resolver hoje?",
    impactoNaoTer: "Sem confirmação imediata e contexto, no-show aumenta.",
    template: "Oi, [NOME]! Aqui é o [SEU NOME] da Freedom.ai 👋 Vi que você agendou nossa conversa para [DIA] às [HORA]. Tá confirmado pra você?\nPra eu te entregar algo bem objetivo: qual é a dor nº1 que você quer resolver hoje? (1 frase já me ajuda).",
    proximoPasso: "Aguardar resposta e preparar reunião"
  },
  {
    id: "confirmacao-4",
    nome: "Confirmação — 1 hora antes (gatilho de reagendamento)",
    tipo: "SDR",
    canal: ["WhatsApp"],
    objetivo: "Fazer comparecer",
    tom: "Direto",
    intencao: "lembrete-1h",
    quandoUsar: "1 hora antes quando lead costuma dar no-show",
    perguntaChave: "Precisa reagendar?",
    impactoNaoTer: "Oferecer reagendamento antecipado evita fantasma.",
    template: "[NOME], confirmando nosso horário de [HORA]. Link: [LINK]\nSe precisar reagendar, me manda 2 horários ainda hoje que eu encaixo com prioridade.",
    proximoPasso: "Confirmar ou reagendar"
  },
  {
    id: "noshow-2",
    nome: "Pós No-show — Tom firme e breve",
    tipo: "SDR",
    canal: ["WhatsApp"],
    objetivo: "Recuperar",
    tom: "Direto",
    contexto: "No-show",
    intencao: "no-show",
    quandoUsar: "2º no-show ou quando precisa de resposta rápida",
    perguntaChave: "Você ainda tem interesse ou eu encerro?",
    impactoNaoTer: "Permanecer no limbo é custo de oportunidade.",
    template: "[NOME], você não apareceu de novo. Vou ser direto: você ainda tem interesse ou eu encerro por aqui?\nMe responde com sim ou não.",
    proximoPasso: "Encerrar ou reagendar definitivo"
  },
  {
    id: "noshow-3",
    nome: "Pós No-show — Closer (valor + próxima data)",
    tipo: "Closer",
    canal: ["WhatsApp"],
    objetivo: "Recuperar",
    tom: "Consultivo",
    contexto: "No-show",
    intencao: "no-show",
    quandoUsar: "Reunião de proposta/demo que não aconteceu",
    perguntaChave: "Quero garantir que o que eu preparei faça sentido pra você.",
    impactoNaoTer: "Perder reunião de proposta = voltar pra discovery.",
    template: "[NOME], não conseguimos nos falar hoje. Eu tinha preparado [X] pra te mostrar, mas fica pra próxima.\nMe confirma um novo horário e eu ajusto — quero garantir que o que eu trouxe faça sentido pra você.",
    proximoPasso: "Reagendar com proposta pronta"
  },
  {
    id: "posreuniao-2",
    nome: "Pós-reunião — Faltou decisor (próximo passo)",
    tipo: "Closer",
    canal: ["WhatsApp"],
    objetivo: "Destravar Sponsor",
    tom: "Direto",
    intencao: "mapeamento-stakeholders",
    quandoUsar: "Quando falta decisor no processo",
    perguntaChave: "Quem além de você precisa estar na decisão?",
    impactoNaoTer: "Sem decisor, deal morre no limbo.",
    template: "[NOME], pra eu garantir que isso não vire retrabalho, eu preciso de 1 coisa:\nquem além de você precisa estar na decisão?\nEu prefiro que o próximo passo já seja com essa pessoa — economiza semanas.",
    proximoPasso: "Agendar com decisor"
  },
  {
    id: "posproposta-1",
    nome: "Pós-proposta — Pergunta que vira decisão",
    tipo: "Closer",
    canal: ["WhatsApp"],
    objetivo: "Avançar decisão",
    tom: "Provocativo",
    contexto: "Pós-proposta",
    intencao: "pos-proposta",
    quandoUsar: "24–48h após envio de proposta",
    perguntaChave: "O que ainda te impediria de avançar?",
    impactoNaoTer: "Perguntar 'viu a proposta?' não gera decisão.",
    template: "[NOME], antes de você perder tempo lendo tudo:\nse eu provar que dá pra [RESULTADO PRINCIPAL] em [PRAZO], o que ainda te impediria de avançar?\nQuero atacar o ponto real, não ficar no 'vamos vendo'.",
    proximoPasso: "Resolver objeção identificada"
  },
  {
    id: "posproposta-2",
    nome: "Pós-proposta — Checklist do SIM",
    tipo: "Closer",
    canal: ["WhatsApp"],
    objetivo: "Avançar decisão",
    tom: "Direto",
    contexto: "Pós-proposta",
    intencao: "pos-proposta",
    quandoUsar: "Quando a conversa virou morna e você quer destravar",
    perguntaChave: "3 coisas pra sair do modo conversa.",
    impactoNaoTer: "Sem checklist, você não sabe onde está.",
    template: "[NOME], pra sair do modo conversa e entrar no modo decisão, me confirma 3 coisas:\n1. isso é prioridade neste trimestre?\n2. quem decide/assina?\n3. qual evento define a data (comitê, CFO, jurídico)?\nCom isso eu fecho o plano e a gente acelera.",
    proximoPasso: "Atacar pendências identificadas"
  },
  {
    id: "posproposta-3",
    nome: "Pós-proposta — Vou estar perto",
    tipo: "Closer",
    canal: ["WhatsApp"],
    objetivo: "Avançar decisão",
    tom: "Leve",
    contexto: "Pós-proposta",
    intencao: "pos-proposta",
    quandoUsar: "Quando lead está silencioso mas quente",
    perguntaChave: "Posso passar aí 15 min?",
    impactoNaoTer: "Follow-up diferente pode reengajar.",
    template: "[NOME], hoje eu vou estar perto da sua região.\nPosso passar aí 15 min só pra conhecer a operação e sair com 2 insights práticos (mesmo que a gente não feche agora). Quer?",
    proximoPasso: "Visita presencial ou reagendar"
  },
  {
    id: "juridico-1",
    nome: "Jurídico/Procurement — Pedido com prazo e dono",
    tipo: "Closer",
    canal: ["WhatsApp"],
    objetivo: "Avançar decisão",
    tom: "Direto",
    intencao: "juridico-procurement",
    quandoUsar: "Quando entra em contrato e precisa de SLA real",
    perguntaChave: "Quem é o responsável pelo jurídico e qual a data de retorno?",
    impactoNaoTer: "Sem dono e prazo, contrato trava indefinidamente.",
    template: "[NOME], pra eu organizar o lado de cá e não travar o processo:\nquem é o responsável pelo jurídico/contrato aí e qual a data real de retorno?\nSe você me passar nome + data, eu ajusto tudo e a gente não perde timing.",
    proximoPasso: "Alinhar com jurídico do cliente"
  },
  {
    id: "concorrencia-1",
    nome: "Concorrência — Comparativo em 1 página",
    tipo: "Closer",
    canal: ["WhatsApp"],
    objetivo: "Avançar decisão",
    tom: "Consultivo",
    intencao: "objecao-concorrente",
    quandoUsar: "Quando cliente diz que está comparando soluções",
    perguntaChave: "Qual é o critério nº1 de comparação?",
    impactoNaoTer: "Sem entender critério, você perde para quem entende.",
    template: "[NOME], se vocês estão comparando opções, me diz o critério nº1 (preço, prazo, risco, integração, resultado).\nEu te mando um comparativo em 1 página baseado no seu critério — sem marketing — pra facilitar a decisão.",
    proximoPasso: "Enviar comparativo direcionado"
  },
  {
    id: "morno-quente-1",
    nome: "Morno → Quente (provocação respeitosa)",
    tipo: "Closer",
    canal: ["WhatsApp"],
    objetivo: "Avançar decisão",
    tom: "Provocativo",
    intencao: "pergunta-poderosa",
    quandoUsar: "Cliente está em cima do muro",
    perguntaChave: "Isso é prioridade real ou fica para depois?",
    impactoNaoTer: "Sem provocação, morno vira frio.",
    template: "[NOME], sendo bem honesto: se vocês não atacarem [DOR] agora, vocês vão continuar pagando [IMPACTO].\nO que eu preciso entender é: isso é prioridade real ou fica para depois?",
    proximoPasso: "Forçar declaração de prioridade"
  },
  {
    id: "encerramento-closer-1",
    nome: "Encerramento elegante (Closer)",
    tipo: "Closer",
    canal: ["WhatsApp"],
    objetivo: "Encerrar elegante",
    tom: "Leve",
    intencao: "encerramento",
    quandoUsar: "Cliente sumiu e você quer fechar loop sem queimar relação",
    perguntaChave: "Me chama com RETOMAR que eu respondo com prioridade.",
    impactoNaoTer: "Ficar insistindo queima relacionamento futuro.",
    template: "[NOME], como não consegui retorno, vou pausar esse assunto pra não te incomodar.\nSe voltar a ser prioridade, me chama com 'RETOMAR' e eu te respondo com prioridade.",
    proximoPasso: "Marcar lembrete 90 dias"
  },
  {
    id: "proposta-info-1",
    nome: "Preciso de 2 infos pra fechar proposta",
    tipo: "Closer",
    canal: ["WhatsApp"],
    objetivo: "Avançar decisão",
    tom: "Direto",
    intencao: "pos-proposta",
    quandoUsar: "Antes de enviar proposta",
    perguntaChave: "Preciso de 2 infos pra proposta real.",
    impactoNaoTer: "Proposta sem info vira chute.",
    template: "[NOME], pra eu te devolver uma proposta real (sem chute), preciso de 2 infos:\n1. [INFO 1]\n2. [INFO 2]\nCom isso eu consigo montar um plano que faça sentido de verdade.",
    proximoPasso: "Aguardar infos e preparar proposta"
  },
  {
    id: "followup-valor-1",
    nome: "Follow-up de valor (mini plano de 7 dias)",
    tipo: "Closer",
    canal: ["WhatsApp"],
    objetivo: "Avançar decisão",
    tom: "Consultivo",
    contexto: "Pós-proposta",
    intencao: "pos-proposta",
    quandoUsar: "Cliente demorando e você quer dar algo concreto",
    perguntaChave: "Consegue me dar um ok/ajusta ainda hoje?",
    impactoNaoTer: "Follow-up sem valor vira cobrança.",
    template: "[NOME], montei um plano de 7 dias com os primeiros passos pra vocês verem resultado rápido.\nSe eu te mandar, você consegue me dar um 'ok/ajusta' ainda hoje? (é curto)",
    proximoPasso: "Enviar plano e aguardar feedback"
  },
  {
    id: "reagendamento-1",
    nome: "Reagendamento com duas opções",
    tipo: "SDR",
    canal: ["WhatsApp"],
    objetivo: "Confirmar",
    tom: "Direto",
    intencao: "reagendamento",
    quandoUsar: "Quando precisa reagendar sem trocar 10 mensagens",
    perguntaChave: "Qual funciona: opção 1 ou opção 2?",
    impactoNaoTer: "Reagendamento aberto = perde controle.",
    template: "[NOME], pra ficar fácil: posso te atender em [OPÇÃO 1] ou [OPÇÃO 2]. Qual funciona?",
    proximoPasso: "Enviar convite imediatamente"
  },
  {
    id: "atrasado-1",
    nome: "Cheguei atrasado (SDR/Closer)",
    tipo: "SDR",
    canal: ["WhatsApp"],
    objetivo: "Confirmar",
    tom: "Direto",
    intencao: "confirmacao-reuniao",
    quandoUsar: "Imprevisto e você vai atrasar",
    perguntaChave: "Me manda 2 horários se não funcionar.",
    impactoNaoTer: "Não avisar atraso = péssima impressão.",
    template: "[NOME], imprevisto aqui — vou entrar em [X] minutos.\nSe pra você não funcionar, me manda 2 horários que eu encaixo com prioridade.",
    proximoPasso: "Entrar na reunião ou reagendar"
  },

  // OUTBOUND / ABERTURAS (SDR)
  {
    id: "outbound-1",
    nome: "Abertura — Dor direta (Outbound)",
    tipo: "SDR",
    canal: ["WhatsApp"],
    objetivo: "Agendar",
    tom: "Direto",
    contexto: "Outbound",
    intencao: "abertura-outbound",
    quandoUsar: "Primeiro contato com lead frio (lista/outbound)",
    perguntaChave: "Vocês conseguem medir/reduzir ou ainda fica no feeling?",
    impactoNaoTer: "Abertura genérica = ignora.",
    template: "[NOME], aqui é [SEU NOME] da Freedom.ai. Vou ser direto: hoje vocês já conseguem medir e reduzir o custo de [DOR DO SETOR] ou isso ainda fica no feeling/planilha?\nSe você me responder \"sim/não\", eu te digo em 1 min se vale a conversa.",
    proximoPasso: "Qualificar baseado na resposta"
  },
  {
    id: "outbound-2",
    nome: "Abertura — Dor + impacto do não ter",
    tipo: "SDR",
    canal: ["WhatsApp"],
    objetivo: "Agendar",
    tom: "Provocativo",
    contexto: "Outbound",
    intencao: "abertura-outbound",
    quandoUsar: "Quando você quer provocar com impacto real",
    perguntaChave: "Quanto custa por mês não ter [CAPACIDADE]?",
    impactoNaoTer: "Sem provocação, lead não sente urgência.",
    template: "[NOME], pergunta objetiva: quanto custa por mês não ter [CAPACIDADE] aí dentro?\nEx.: tempo perdido, retrabalho, risco, vazamento.\nSe você me disser onde dói mais, eu te mando um diagnóstico rápido.",
    proximoPasso: "Enviar diagnóstico direcionado"
  },
  {
    id: "outbound-3",
    nome: "Abertura — Vi um padrão no seu setor",
    tipo: "SDR",
    canal: ["WhatsApp"],
    objetivo: "Agendar",
    tom: "Consultivo",
    contexto: "Outbound",
    intencao: "abertura-outbound",
    quandoUsar: "Para parecer consultivo sem ser genérico",
    perguntaChave: "Isso acontece aí?",
    impactoNaoTer: "Sem contexto de setor, você é só mais um.",
    template: "[NOME], tenho visto um padrão em empresas de [SETOR]: elas crescem e começam a pagar caro em [RISCO 1] e [RISCO 2].\nIsso acontece aí? Se sim, te faço 3 perguntas e te devolvo um mapa do problema.",
    proximoPasso: "Iniciar diagnóstico se positivo"
  },
  {
    id: "outbound-5",
    nome: "Abertura — Eu não vendo reunião",
    tipo: "SDR",
    canal: ["WhatsApp"],
    objetivo: "Agendar",
    tom: "Consultivo",
    contexto: "Outbound",
    intencao: "abertura-outbound",
    quandoUsar: "Para quebrar resistência de 'não quero reunião'",
    perguntaChave: "Posso fazer 2 perguntas em 2 minutos?",
    impactoNaoTer: "Lead foge de vendedor insistente.",
    template: "[NOME], eu não quero te vender reunião. Quero entender se vale.\nSe eu fizer 2 perguntas e em 2 minutos te disser \"não é pra vocês\", você me dá essa chance?",
    proximoPasso: "Qualificar em 2 perguntas"
  },
  {
    id: "outbound-8",
    nome: "Outbound — Micro caso",
    tipo: "SDR",
    canal: ["WhatsApp"],
    objetivo: "Agendar",
    tom: "Consultivo",
    contexto: "Outbound",
    intencao: "abertura-outbound",
    quandoUsar: "Quando quiser aumentar resposta com prova social leve",
    perguntaChave: "Está mais para baixo controle, parcial ou controlado?",
    impactoNaoTer: "Sem prova social, você é só promessa.",
    template: "[NOME], em empresas parecidas com a [EMPRESA], a gente costuma encontrar um vazamento: [EX.: tarefas manuais, risco jurídico, filas, retrabalho].\nVocê diria que aí está mais para: 1) baixo controle 2) controle parcial 3) controlado?",
    proximoPasso: "Qualificar e agendar"
  },
  {
    id: "outbound-9",
    nome: "Outbound — Custo real",
    tipo: "SDR",
    canal: ["WhatsApp"],
    objetivo: "Agendar",
    tom: "Provocativo",
    contexto: "Outbound",
    intencao: "abertura-outbound",
    quandoUsar: "Para empresas com processos pesados",
    perguntaChave: "Quanto custa por mês esse processo do jeito que está?",
    impactoNaoTer: "Sem número, não existe urgência.",
    template: "[NOME], pergunta objetiva: quanto custa por mês manter [PROCESSO] do jeito que está?\nSe você me disser 'não sei', é sinal de que tem custo invisível ali.",
    proximoPasso: "Calcular impacto e agendar"
  },
  {
    id: "outbound-10",
    nome: "Outbound — Gancho de risco",
    tipo: "SDR",
    canal: ["WhatsApp"],
    objetivo: "Agendar",
    tom: "Provocativo",
    contexto: "Outbound",
    intencao: "abertura-outbound",
    quandoUsar: "Lead em setor de alto risco regulatório/jurídico",
    perguntaChave: "Qual risco está mais exposto hoje?",
    impactoNaoTer: "Risco não mapeado = surpresa ruim.",
    template: "[NOME], em [SETOR], normalmente os riscos mais caros são: [RISCO 1], [RISCO 2], [RISCO 3].\nQual desses vocês ainda não conseguem mapear ou prevenir de verdade?",
    proximoPasso: "Qualificar e agendar discovery"
  },

  // PRODUTO: VISION (OPERAÇÃO)
  {
    id: "vision-1",
    nome: "Vision — Gancho de câmera",
    tipo: "SDR",
    canal: ["WhatsApp"],
    objetivo: "Agendar",
    tom: "Provocativo",
    contexto: "Vision",
    intencao: "produto-vision",
    quandoUsar: "Lead com operação e câmeras",
    perguntaChave: "Câmera serve pra ver depois ou pra agir na hora?",
    impactoNaoTer: "Câmera sem IA = custo sem retorno.",
    template: "[NOME], vocês já têm câmera na operação. A pergunta é: ela serve pra ver depois ou pra agir na hora?\nSe for pra ver depois, vocês estão pagando por um custo afundado.",
    proximoPasso: "Qualificar e agendar discovery"
  },
  {
    id: "vision-2",
    nome: "Vision — Dor de fila/tempo/comportamento",
    tipo: "SDR",
    canal: ["WhatsApp"],
    objetivo: "Agendar",
    tom: "Consultivo",
    contexto: "Vision",
    intencao: "produto-vision",
    quandoUsar: "Lead com problema de operação visível",
    perguntaChave: "Maior dor é fila, tempo ou comportamento?",
    impactoNaoTer: "Sem diagnóstico, você vende feature.",
    template: "[NOME], em operações como a de vocês, a maior dor geralmente está em fila, tempo de atendimento ou comportamento de equipe.\nQual desses pesa mais aí hoje?",
    proximoPasso: "Direcionar conversa pra dor principal"
  },
  {
    id: "vision-3",
    nome: "Vision — Pós-proposta com entrega de valor",
    tipo: "Closer",
    canal: ["WhatsApp"],
    objetivo: "Avançar decisão",
    tom: "Consultivo",
    contexto: "Vision",
    intencao: "produto-vision",
    quandoUsar: "Lead sumiu após proposta",
    perguntaChave: "Qual evento vocês mais querem detectar?",
    impactoNaoTer: "Proposta genérica = comparação de preço.",
    template: "[NOME], montei um checklist de 5 eventos críticos que empresas como a [EMPRESA] costumam detectar com Vision.\nSe eu te mandar, você me diz qual é o mais importante pra vocês? Ajusto a proposta pro ponto certo.",
    proximoPasso: "Enviar checklist e ajustar proposta"
  },

  // PRODUTO: FINANCE CORE (FINANCEIRO)
  {
    id: "finance-1",
    nome: "Finance — Gancho de contas a pagar",
    tipo: "SDR",
    canal: ["WhatsApp"],
    objetivo: "Agendar",
    tom: "Provocativo",
    contexto: "Finance",
    intencao: "produto-finance",
    quandoUsar: "Lead com operação financeira manual",
    perguntaChave: "Quanto tempo por mês vocês gastam com contas a pagar?",
    impactoNaoTer: "Financeiro manual = erro e atraso.",
    template: "[NOME], quanto tempo por mês a equipe de vocês gasta com contas a pagar (conferência, aprovação, lançamento)?\nSe for mais de 40h/mês, provavelmente tem custo invisível ali.",
    proximoPasso: "Qualificar e agendar discovery"
  },
  {
    id: "finance-2",
    nome: "Finance — Erro de lançamento",
    tipo: "SDR",
    canal: ["WhatsApp"],
    objetivo: "Agendar",
    tom: "Consultivo",
    contexto: "Finance",
    intencao: "produto-finance",
    quandoUsar: "Lead com histórico de erro financeiro",
    perguntaChave: "Quanto custa um erro de lançamento?",
    impactoNaoTer: "Erro financeiro = custo real + risco.",
    template: "[NOME], em empresas com volume de [X] transações/mês, a gente costuma encontrar erros de lançamento que custam [R$ Y] em retrabalho + risco.\nVocês medem isso? Se não, pode ter custo invisível ali.",
    proximoPasso: "Calcular impacto e agendar"
  },
  {
    id: "finance-3",
    nome: "Finance — Pós-proposta com entrega de valor",
    tipo: "Closer",
    canal: ["WhatsApp"],
    objetivo: "Avançar decisão",
    tom: "Consultivo",
    contexto: "Finance",
    intencao: "produto-finance",
    quandoUsar: "Lead sumiu após proposta",
    perguntaChave: "Qual processo mais trava o financeiro?",
    impactoNaoTer: "Proposta genérica = comparação de preço.",
    template: "[NOME], montei um checklist de 5 processos que empresas como a [EMPRESA] automatizam no financeiro.\nSe eu te mandar, você me diz qual trava mais aí? Ajusto a proposta pro ponto certo.",
    proximoPasso: "Enviar checklist e ajustar proposta"
  },

  // PRODUTO: LEGAL HUB (JURÍDICO)
  {
    id: "legal-1",
    nome: "Legal — Gancho de contrato",
    tipo: "SDR",
    canal: ["WhatsApp"],
    objetivo: "Agendar",
    tom: "Provocativo",
    contexto: "Legal",
    intencao: "produto-legal",
    quandoUsar: "Lead com volume de contratos",
    perguntaChave: "Quanto tempo por contrato vocês gastam em análise?",
    impactoNaoTer: "Jurídico manual = gargalo e risco.",
    template: "[NOME], quanto tempo em média vocês gastam pra analisar 1 contrato hoje?\nSe for mais de 2h, provavelmente tem custo invisível ali.",
    proximoPasso: "Qualificar e agendar discovery"
  },
  {
    id: "legal-2",
    nome: "Legal — Risco de cláusula",
    tipo: "SDR",
    canal: ["WhatsApp"],
    objetivo: "Agendar",
    tom: "Consultivo",
    contexto: "Legal",
    intencao: "produto-legal",
    quandoUsar: "Lead com histórico de risco jurídico",
    perguntaChave: "Quantos contratos passam sem revisão completa?",
    impactoNaoTer: "Contrato mal revisado = risco real.",
    template: "[NOME], em empresas com volume de [X] contratos/mês, a gente costuma encontrar cláusulas de risco que passam despercebidas.\nVocês conseguem revisar 100% ou alguns passam sem análise completa?",
    proximoPasso: "Calcular impacto e agendar"
  },
  {
    id: "legal-3",
    nome: "Legal — Pós-proposta com entrega de valor",
    tipo: "Closer",
    canal: ["WhatsApp"],
    objetivo: "Avançar decisão",
    tom: "Consultivo",
    contexto: "Legal",
    intencao: "produto-legal",
    quandoUsar: "Lead sumiu após proposta",
    perguntaChave: "Qual dos 3 riscos mais preocupa?",
    impactoNaoTer: "Proposta genérica = comparação de preço.",
    template: "[NOME], montei um checklist de 3 riscos que empresas como a [EMPRESA] costumam ter no jurídico.\nSe eu te mandar, você me diz qual preocupa mais aí? Ajusto a proposta pro ponto certo.",
    proximoPasso: "Enviar checklist e ajustar proposta"
  },

  // PRODUTO: NALK (DADOS)
  {
    id: "nalk-1",
    nome: "Nalk — Gancho de dados",
    tipo: "SDR",
    canal: ["WhatsApp"],
    objetivo: "Agendar",
    tom: "Provocativo",
    contexto: "Nalk",
    intencao: "produto-nalk",
    quandoUsar: "Lead com desafio de dados/BI",
    perguntaChave: "Os dados respondem perguntas ou vocês ainda têm que cavar?",
    impactoNaoTer: "Dado que não responde = decisão no escuro.",
    template: "[NOME], hoje os dados de vocês respondem perguntas ou vocês ainda têm que cavar pra entender o que tá acontecendo?\nSe for cavar, normalmente tem muito custo invisível aí.",
    proximoPasso: "Qualificar e agendar discovery"
  },
  {
    id: "nalk-2",
    nome: "Nalk — Onde está o gap de dados?",
    tipo: "SDR",
    canal: ["WhatsApp"],
    objetivo: "Agendar",
    tom: "Consultivo",
    contexto: "Nalk",
    intencao: "produto-nalk",
    quandoUsar: "Entender onde dados falham",
    perguntaChave: "Gap está em coleta, organização ou acesso?",
    impactoNaoTer: "Sem diagnóstico, você vende feature.",
    template: "[NOME], quando vocês precisam tomar decisão com dado, o gap está em coleta, organização ou acesso?\nMe diz qual dos três que eu te mando um diagnóstico específico.",
    proximoPasso: "Enviar diagnóstico direcionado"
  },
  {
    id: "nalk-3",
    nome: "Nalk — Pós-proposta com entrega de valor",
    tipo: "Closer",
    canal: ["WhatsApp"],
    objetivo: "Avançar decisão",
    tom: "Consultivo",
    contexto: "Nalk",
    intencao: "produto-nalk",
    quandoUsar: "Lead sumiu após proposta",
    perguntaChave: "Qual pergunta de negócio vocês mais querem responder?",
    impactoNaoTer: "Proposta genérica = comparação de preço.",
    template: "[NOME], qual é a pergunta de negócio que vocês mais querem responder e não conseguem hoje?\nMe diz em 1 frase que eu te mando um esboço de como resolver isso em 30 dias.",
    proximoPasso: "Enviar esboço e ajustar proposta"
  },

  // OBJEÇÕES
  {
    id: "objecao-tempo-1",
    nome: "Objeção — Estou sem tempo",
    tipo: "SDR",
    canal: ["WhatsApp"],
    objetivo: "Agendar",
    tom: "Direto",
    intencao: "objecao-tempo",
    quandoUsar: "Lead diz que está sem tempo",
    perguntaChave: "Quando posso te ligar em 5 min?",
    impactoNaoTer: "Aceitar 'sem tempo' = perder deal.",
    template: "Entendo. E se eu te ligar em 5 min e, se em 2 min não fizer sentido, a gente encerra?\nQual horário funciona: agora ou amanhã cedo?",
    proximoPasso: "Ligar no horário combinado"
  },
  {
    id: "objecao-caro-1",
    nome: "Objeção — Tá caro (comparativo)",
    tipo: "Closer",
    canal: ["WhatsApp"],
    objetivo: "Avançar decisão",
    tom: "Provocativo",
    intencao: "objecao-preco",
    quandoUsar: "Objeção de preço — ângulo comparativo",
    perguntaChave: "Caro comparado com o quê?",
    impactoNaoTer: "Aceitar 'tá caro' = perder margem ou deal.",
    template: "Caro comparado com o quê?\n1. Outra solução do mercado?\n2. O que vocês investem hoje no problema?\n3. O custo de não resolver?\nMe diz o número 1, 2 ou 3.",
    proximoPasso: "Ajustar proposta ou justificar valor"
  },
  {
    id: "objecao-pensar-1",
    nome: "Objeção — Preciso pensar",
    tipo: "Closer",
    canal: ["WhatsApp"],
    objetivo: "Avançar decisão",
    tom: "Consultivo",
    intencao: "objecao-pensar",
    quandoUsar: "Lead pede tempo para pensar",
    perguntaChave: "O que exatamente você precisa pensar?",
    impactoNaoTer: "Aceitar 'preciso pensar' = deal morre no limbo.",
    template: "Faz total sentido. Só pra eu te ajudar: o que exatamente você precisa pensar?\n1. Valor vs. investimento?\n2. Timing?\n3. Envolver mais alguém?\nMe responde com o número.",
    proximoPasso: "Resolver objeção específica"
  },
  {
    id: "objecao-budget-1",
    nome: "Objeção — Sem budget agora",
    tipo: "Closer",
    canal: ["WhatsApp"],
    objetivo: "Avançar decisão",
    tom: "Direto",
    intencao: "objecao-budget",
    quandoUsar: "Lead diz que não tem orçamento",
    perguntaChave: "Quando abre o próximo ciclo de budget?",
    impactoNaoTer: "Aceitar 'sem budget' = perder timing.",
    template: "Entendo. Pergunta prática: quando abre o próximo ciclo de budget?\nSe eu te mandar uma proposta agora, você consegue colocar na fila?\nAssim a gente não perde timing.",
    proximoPasso: "Enviar proposta para próximo ciclo"
  },
  {
    id: "objecao-concorrente-1",
    nome: "Objeção — Já uso concorrente",
    tipo: "Closer",
    canal: ["WhatsApp"],
    objetivo: "Avançar decisão",
    tom: "Consultivo",
    intencao: "objecao-concorrente",
    quandoUsar: "Lead já tem solução",
    perguntaChave: "O que você manteria e o que mudaria?",
    impactoNaoTer: "Aceitar 'já tenho' = perder oportunidade de troca.",
    template: "Ótimo — isso ajuda. Então a pergunta é: o que você manteria e o que você mudaria no que vocês têm hoje?\nSe você me disser 1 coisa que incomoda, eu te digo se vale comparar.",
    proximoPasso: "Comparar e mostrar diferencial"
  },
  {
    id: "objecao-email-1",
    nome: "Objeção — Manda por e-mail",
    tipo: "SDR",
    canal: ["WhatsApp"],
    objetivo: "Agendar",
    tom: "Direto",
    intencao: "abertura-outbound",
    quandoUsar: "Lead foge da conversa",
    perguntaChave: "O que você quer resolver: tempo, dinheiro ou risco?",
    impactoNaoTer: "E-mail genérico = ignora.",
    template: "Eu mando sim. Só pra eu não mandar coisa genérica:\no que você quer resolver com mais urgência hoje — tempo, dinheiro ou risco? (1 palavra)\nCom isso eu mando a coisa certa.",
    proximoPasso: "Enviar material direcionado"
  },
  {
    id: "objecao-fornecedor-1",
    nome: "Objeção — Já tenho fornecedor",
    tipo: "Closer",
    canal: ["WhatsApp"],
    objetivo: "Avançar decisão",
    tom: "Consultivo",
    intencao: "objecao-concorrente",
    quandoUsar: "Cliente já tem alguém",
    perguntaChave: "O que você manteria e o que mudaria no atual?",
    impactoNaoTer: "Sem entender gap, você é só alternativa.",
    template: "Ótimo — isso ajuda. Então a pergunta é: o que você manteria e o que você mudaria no fornecedor atual?\nSe você me disser 1 coisa que incomoda, eu te digo se a Freedom faz melhor ou se não vale nem comparar.",
    proximoPasso: "Comparar e mostrar diferencial"
  },

  // PÓS-PROPOSTA INTELIGENTE (Closer)
  {
    id: "posproposta-1pagina-1",
    nome: "Pós-proposta — Resumo em 1 página",
    tipo: "Closer",
    canal: ["WhatsApp"],
    objetivo: "Avançar decisão",
    tom: "Leve",
    contexto: "Pós-proposta",
    intencao: "pos-proposta",
    quandoUsar: "Lead quer comparar rápido",
    perguntaChave: "Quer que eu resuma tudo em 1 página?",
    impactoNaoTer: "Proposta longa = não lê.",
    template: "[NOME], quer que eu resuma tudo em 1 página?\nEu coloco: dor, impacto de não resolver, plano de 30 dias e custo. Você decide sem perder tempo.",
    proximoPasso: "Enviar resumo executivo"
  },

  // JURÍDICO / PROCUREMENT (Closer)
  {
    id: "juridico-data-1",
    nome: "Jurídico — Sem data, sem forecast",
    tipo: "Closer",
    canal: ["WhatsApp"],
    objetivo: "Avançar decisão",
    tom: "Direto",
    intencao: "juridico-procurement",
    quandoUsar: "Para educar e puxar compromisso",
    perguntaChave: "Qual data realista você quer colocar pra decisão?",
    impactoNaoTer: "Sem data, vira fila infinita.",
    template: "[NOME], sem data combinada isso vira fila e a gente perde timing.\nQual data realista você quer colocar pra decisão? Eu trabalho com essa data e organizo o processo.",
    proximoPasso: "Registrar data de fechamento"
  },

  // REATIVAÇÃO (SDR/Closer)
  {
    id: "reativacao-1",
    nome: "Reativação — Vi isso e lembrei de você",
    tipo: "SDR",
    canal: ["WhatsApp"],
    objetivo: "Recuperar",
    tom: "Leve",
    contexto: "Reativação",
    intencao: "reativacao",
    quandoUsar: "Lead antigo parado",
    perguntaChave: "Isso ainda é prioridade ou ficou pra depois?",
    impactoNaoTer: "Lead parado esquece de você.",
    template: "[NOME], vi um caso essa semana que me lembrou você: [1 linha do caso].\nIsso ainda é prioridade aí ou ficou pra depois?",
    proximoPasso: "Requalificar ou encerrar"
  },
  {
    id: "reativacao-2",
    nome: "Reativação — Mudou alguma coisa?",
    tipo: "Closer",
    canal: ["WhatsApp"],
    objetivo: "Recuperar",
    tom: "Direto",
    contexto: "Reativação",
    intencao: "reativacao",
    quandoUsar: "30–60 dias após sumiço",
    perguntaChave: "Mudou prioridade, budget ou dono do projeto?",
    impactoNaoTer: "Retomar sem contexto = perde tempo.",
    template: "[NOME], última vez que falamos o cenário era [CENÁRIO].\nMudou alguma coisa desde então — prioridade, budget ou dono do projeto?",
    proximoPasso: "Atualizar status e reengajar"
  },

  // E-MAILS CURTOS (SDR/Closer)
  {
    id: "email-1pergunta-1",
    nome: "Email — 1 pergunta que resolve",
    tipo: "SDR",
    canal: ["E-mail"],
    objetivo: "Agendar",
    tom: "Direto",
    contexto: "Outbound",
    intencao: "abertura-outbound",
    quandoUsar: "Primeiro e-mail frio",
    perguntaChave: "Maior custo: tempo, dinheiro ou risco?",
    impactoNaoTer: "E-mail longo = não lê.",
    template: "Assunto: 1 pergunta rápida, [NOME]\n\nOi [NOME], tudo bem?\nHoje o maior custo aí está em tempo, dinheiro ou risco?\nSe você me responder com 1 palavra, eu te digo se vale 20 min ou se não é o momento.",
    proximoPasso: "Esperar resposta ou ligar"
  },
  {
    id: "email-recap-1",
    nome: "Email — Pós-reunião (recap + agenda)",
    tipo: "Closer",
    canal: ["E-mail"],
    objetivo: "Avançar decisão",
    tom: "Consultivo",
    intencao: "pos-reuniao",
    quandoUsar: "Após reunião com múltiplos stakeholders",
    perguntaChave: "Se algo estiver fora, me sinalize.",
    impactoNaoTer: "Sem recap escrito, cada um lembra diferente.",
    template: "Assunto: Recap + próximo passo (para avançar)\n\n[NOME], recap do que alinhamos:\n• Dor: [DOR]\n• Impacto de não resolver: [IMPACTO]\n• Resultado esperado: [RESULTADO]\nPróximo passo: [PASSO] em [DATA/HORA].\nSe algo estiver fora, me sinalize — prefiro corrigir agora do que perder semanas.",
    proximoPasso: "Aguardar confirmação e executar"
  },

  // FECHAMENTO DE LOOP
  {
    id: "encerramento-sdr-2",
    nome: "Encerramento — Educado e firme (SDR)",
    tipo: "SDR",
    canal: ["WhatsApp"],
    objetivo: "Encerrar elegante",
    tom: "Leve",
    intencao: "encerramento",
    quandoUsar: "Lead não responde e você vai encerrar",
    perguntaChave: "Me chama com RETOMAR.",
    impactoNaoTer: "Ficar insistindo queima relacionamento.",
    template: "[NOME], vou encerrar por aqui pra não te incomodar.\nSe isso voltar a ser prioridade, me chama com 'RETOMAR' que eu te respondo rápido.",
    proximoPasso: "Marcar lembrete 90 dias"
  },
  {
    id: "encerramento-closer-2",
    nome: "Encerramento — Com alternativa (Closer)",
    tipo: "Closer",
    canal: ["WhatsApp"],
    objetivo: "Encerrar elegante",
    tom: "Consultivo",
    intencao: "encerramento",
    quandoUsar: "Cliente some depois de proposta",
    perguntaChave: "Prefere ajustar escopo, timing, investimento ou encerrar?",
    impactoNaoTer: "Encerrar sem opção = perde chance de ajuste.",
    template: "[NOME], como não tive retorno, vou pausar.\nAntes de eu encerrar de vez: você prefere que eu 1) ajuste escopo 2) ajuste timing 3) ajuste investimento ou 4) encerramos mesmo? Me responde com um número.",
    proximoPasso: "Ajustar ou encerrar"
  },

  // PERGUNTAS PODEROSAS
  {
    id: "pergunta-resolver-1",
    nome: "Pergunta — O que muda se resolver?",
    tipo: "Closer",
    canal: ["WhatsApp"],
    objetivo: "Avançar decisão",
    tom: "Consultivo",
    intencao: "pergunta-poderosa",
    quandoUsar: "Para puxar resultado esperado real",
    perguntaChave: "O que muda na prática aí dentro?",
    impactoNaoTer: "Sem resultado claro, proposta vira genérica.",
    template: "[NOME], se isso estiver resolvido em 90 dias, o que muda na prática aí dentro? (métrica ou consequência)",
    proximoPasso: "Documentar resultado esperado"
  },
  {
    id: "pergunta-naoresolver-1",
    nome: "Pergunta — O que acontece se não resolver?",
    tipo: "Closer",
    canal: ["WhatsApp"],
    objetivo: "Avançar decisão",
    tom: "Provocativo",
    intencao: "pergunta-poderosa",
    quandoUsar: "Para criar urgência sem empurrar",
    perguntaChave: "Qual é a conta que chega?",
    impactoNaoTer: "Sem custo de não resolver, não existe urgência.",
    template: "[NOME], e se vocês não resolverem isso neste trimestre, o que acontece? Qual é a conta que chega?",
    proximoPasso: "Quantificar impacto"
  },
  {
    id: "pergunta-sofre-1",
    nome: "Pergunta — Quem sofre mais com isso?",
    tipo: "Closer",
    canal: ["WhatsApp"],
    objetivo: "Destravar Sponsor",
    tom: "Consultivo",
    intencao: "mapeamento-stakeholders",
    quandoUsar: "Mapear dono e áreas envolvidas",
    perguntaChave: "Quem sofre mais hoje?",
    impactoNaoTer: "Sem dono, projeto não anda.",
    template: "[NOME], quem sofre mais com isso hoje? (área/pessoa). Se eu souber o dono, eu deixo o plano muito mais certeiro.",
    proximoPasso: "Mapear stakeholders"
  },
  {
    id: "pergunta-criterio-1",
    nome: "Pergunta — Critério nº1",
    tipo: "Closer",
    canal: ["WhatsApp"],
    objetivo: "Avançar decisão",
    tom: "Direto",
    intencao: "pergunta-poderosa",
    quandoUsar: "Para guiar proposta e comparação",
    perguntaChave: "Qual é o critério nº1 pra você dizer sim?",
    impactoNaoTer: "Sem critério, você negocia no escuro.",
    template: "[NOME], qual é o critério nº1 pra você dizer sim? (resultado, risco, prazo, integração ou investimento)",
    proximoPasso: "Ajustar proposta ao critério"
  }
];

// Filter options (SEM ETAPAS)
export const filterOptions = {
  tipos: ["SDR", "BDR", "Closer", "Gestão", "CRM", "Métricas", "Objeção", "Checklist", "Proposta", "Lost"],
  canais: ["WhatsApp", "Ligação", "E-mail", "LinkedIn", "Presencial"],
  objetivos: ["Agendar", "Confirmar", "Fazer comparecer", "Avançar decisão", "Destravar TI", "Destravar Sponsor", "Recuperar", "Encerrar elegante"],
  tons: ["Direto", "Consultivo", "Provocativo", "Técnico", "Urgente", "Leve"],
  contextos: ["Outbound", "Inbound", "Reativação", "Pós-proposta", "No-show", "Vision", "Finance", "Legal", "Nalk", "Freedom Agents"],
  intencoes: templateIntencoes
};

export const quickFilters = [
  { label: "Só SDR", filter: { tipo: "SDR" } },
  { label: "Só Closer", filter: { tipo: "Closer" } },
  { label: "Só WhatsApp", filter: { canal: "WhatsApp" } },
  { label: "Outbound", filter: { contexto: "Outbound" } },
  { label: "Pós-proposta", filter: { contexto: "Pós-proposta" } },
  { label: "Reativação", filter: { contexto: "Reativação" } },
  { label: "Encerramento elegante", filter: { objetivo: "Encerrar elegante" } }
];
