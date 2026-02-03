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

// Templates Database
export interface Template {
  id: string;
  nome: string;
  tipo: "SDR" | "BDR" | "Closer" | "Gestão" | "CRM" | "Métricas" | "Objeção" | "Checklist" | "Proposta" | "Lost";
  etapa: "Lead" | "Contato Inicial" | "Qualificado" | "Reunião Agendada" | "Reunião Realizada" | "Negociação/Proposta" | "Contrato" | "Ganho" | "Perdido";
  canal: ("WhatsApp" | "Ligação" | "E-mail" | "LinkedIn" | "Presencial")[];
  objetivo: "Agendar" | "Confirmar" | "Fazer comparecer" | "Avançar decisão" | "Destravar TI" | "Destravar Sponsor" | "Recuperar" | "Encerrar elegante";
  tom: "Direto" | "Consultivo" | "Provocativo" | "Técnico" | "Urgente" | "Leve";
  quandoUsar: string;
  perguntaChave: string;
  impactoNaoTer: string;
  template: string;
  proximoPasso: string;
}

export const templates: Template[] = [
  // SDR/BDR Templates (20)
  {
    id: "sdr-1",
    nome: "Abertura — Dor direta",
    tipo: "SDR",
    etapa: "Lead",
    canal: ["E-mail", "LinkedIn"],
    objetivo: "Agendar",
    tom: "Direto",
    quandoUsar: "Primeiro contato com lead frio",
    perguntaChave: "Qual processo manual mais trava sua operação hoje?",
    impactoNaoTer: "Enquanto vocês fazem isso manualmente, o concorrente automatiza.",
    template: "Oi [Nome], tudo bem?\n\nVi que a [Empresa] atua em [segmento]. Uma pergunta rápida:\n\nQual processo repetitivo mais trava a operação de vocês hoje?\n\nPergunto porque ajudamos empresas como a [Referência do setor] a eliminar retrabalho com IA que executa de verdade.\n\nFaz sentido uma conversa de 15 min pra entender se tem fit?\n\nAbs,\n[Seu nome]",
    proximoPasso: "Agendar call de qualificação"
  },
  {
    id: "sdr-2",
    nome: "Abertura — Dor + dono",
    tipo: "SDR",
    etapa: "Lead",
    canal: ["E-mail", "LinkedIn"],
    objetivo: "Agendar",
    tom: "Consultivo",
    quandoUsar: "Quando você sabe quem é o responsável pelo problema",
    perguntaChave: "Quem sofre mais com esse gargalo hoje?",
    impactoNaoTer: "Sem identificar o dono, a demanda morre na caixa de entrada.",
    template: "Oi [Nome],\n\nEmpresas do porte de vocês geralmente têm um desafio: [problema específico do segmento].\n\nQuem na [Empresa] cuida disso hoje? Você ou outra pessoa?\n\nQuero entender se faz sentido apresentar como outras empresas resolveram isso com agentes de IA.\n\n15 minutos essa semana funcionam?\n\nAbs,\n[Seu nome]",
    proximoPasso: "Identificar sponsor e agendar"
  },
  {
    id: "sdr-3",
    nome: "Impacto de não ter — 90 dias",
    tipo: "SDR",
    etapa: "Contato Inicial",
    canal: ["WhatsApp", "E-mail"],
    objetivo: "Agendar",
    tom: "Provocativo",
    quandoUsar: "Quando lead demonstrou interesse mas não agendou",
    perguntaChave: "O que acontece nos próximos 90 dias se nada mudar?",
    impactoNaoTer: "Daqui 90 dias o problema vai estar maior, não menor.",
    template: "[Nome], pensando aqui...\n\nSe vocês não resolverem [problema identificado] nos próximos 90 dias, o que acontece?\n\nPergunto porque muitas empresas deixam pra depois e o custo invisível só cresce.\n\nUma conversa de 15 min pode mostrar se existe atalho. Bora?",
    proximoPasso: "Forçar decisão de agenda"
  },
  {
    id: "sdr-4",
    nome: "Qualificação rápida — 3 perguntas",
    tipo: "SDR",
    etapa: "Contato Inicial",
    canal: ["Ligação", "WhatsApp"],
    objetivo: "Agendar",
    tom: "Direto",
    quandoUsar: "Para filtrar rapidamente se vale avançar",
    perguntaChave: "Volume, urgência e autonomia de decisão?",
    impactoNaoTer: "Sem filtrar rápido, você perde tempo com deal que não fecha.",
    template: "[Nome], antes de agendar a conversa, 3 perguntas rápidas:\n\n1. Qual volume mensal vocês processam de [processo]?\n2. Isso é prioridade Q1 ou mais pra frente?\n3. Você decide ou precisa envolver mais alguém?\n\nResponde que te digo se faz sentido a gente conversar.",
    proximoPasso: "Qualificar ou descartar"
  },
  {
    id: "sdr-5",
    nome: "Corte elegante — dados",
    tipo: "SDR",
    etapa: "Qualificado",
    canal: ["WhatsApp", "E-mail"],
    objetivo: "Encerrar elegante",
    tom: "Leve",
    quandoUsar: "Quando não há fit claro",
    perguntaChave: "Faz sentido pausar e voltar quando tiver estrutura?",
    impactoNaoTer: "Forçar deal sem fit queima relacionamento futuro.",
    template: "[Nome], pensando no que você disse...\n\nParece que hoje vocês ainda não têm [dados/volume/estrutura] pra extrair o máximo de uma solução como a nossa.\n\nFaz sentido a gente pausar e eu voltar em [prazo] quando isso estiver mais maduro?\n\nSem problema nenhum, prefiro ser honesto do que forçar algo que não vai funcionar.",
    proximoPasso: "Marcar lembrete para retorno futuro"
  },
  {
    id: "sdr-6",
    nome: "Sponsor — quem assina e quem trava",
    tipo: "SDR",
    etapa: "Contato Inicial",
    canal: ["Ligação", "WhatsApp"],
    objetivo: "Destravar Sponsor",
    tom: "Consultivo",
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
    etapa: "Contato Inicial",
    canal: ["Ligação", "E-mail"],
    objetivo: "Agendar",
    tom: "Técnico",
    quandoUsar: "Para dimensionar oportunidade",
    perguntaChave: "Quantos [processos] vocês fazem por mês?",
    impactoNaoTer: "Sem volume, não existe ROI que justifique o projeto.",
    template: "[Nome], uma pergunta de negócio:\n\nQuantos [notas fiscais / contratos / análises / atendimentos] vocês processam por mês?\n\nPergunto porque nosso ROI aparece a partir de [X] volume. Abaixo disso, geralmente não faz sentido.\n\nMe conta o número que te digo se vale a conversa.",
    proximoPasso: "Qualificar por volume"
  },
  {
    id: "sdr-8",
    nome: "Prioridade — chato vs insustentável",
    tipo: "SDR",
    etapa: "Contato Inicial",
    canal: ["Ligação", "WhatsApp"],
    objetivo: "Agendar",
    tom: "Provocativo",
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
    etapa: "Reunião Agendada",
    canal: ["WhatsApp", "E-mail"],
    objetivo: "Confirmar",
    tom: "Direto",
    quandoUsar: "Imediatamente após agendar",
    perguntaChave: "Confirma presença e agenda?",
    impactoNaoTer: "Sem confirmação imediata, no-show aumenta 40%.",
    template: "[Nome], confirmado!\n\n📅 [Data e hora]\n📍 [Link da reunião]\n\nVou te mandar um lembrete 1h antes.\n\nSó pra confirmar: [Fulano] também participa ou só você?\n\nNos vemos [dia]!",
    proximoPasso: "Enviar lembrete 1h antes"
  },
  {
    id: "sdr-10",
    nome: "Link 1h antes — obrigatório",
    tipo: "SDR",
    etapa: "Reunião Agendada",
    canal: ["WhatsApp"],
    objetivo: "Fazer comparecer",
    tom: "Leve",
    quandoUsar: "1 hora antes da reunião",
    perguntaChave: "Confirma que está de pé?",
    impactoNaoTer: "Lembrete reduz no-show em até 50%.",
    template: "[Nome], só passando pra confirmar!\n\nNossa conversa é daqui 1h: [horário]\n\n📍 Link: [link]\n\nTudo certo aí? Qualquer imprevisto, me avisa que a gente reagenda.",
    proximoPasso: "Aguardar na reunião"
  },
  {
    id: "sdr-11",
    nome: "Sumiu — prioridade/pausa",
    tipo: "SDR",
    etapa: "Qualificado",
    canal: ["WhatsApp", "E-mail"],
    objetivo: "Recuperar",
    tom: "Direto",
    quandoUsar: "Quando lead parou de responder",
    perguntaChave: "Ainda é prioridade ou prefere que eu pause?",
    impactoNaoTer: "Ficar no limbo é pior do que um não.",
    template: "[Nome], percebi que a conversa esfriou.\n\nSem problema! Só quero entender:\n\n1. Mudou a prioridade e faz sentido pausar?\n2. Entrou outro projeto na frente?\n3. Ou só correria mesmo?\n\nMe diz que eu organizo aqui do meu lado.",
    proximoPasso: "Definir próximo passo ou encerrar"
  },
  {
    id: "sdr-12",
    nome: "Valor novo — dono do dado vs dono do processo",
    tipo: "SDR",
    etapa: "Qualificado",
    canal: ["E-mail", "LinkedIn"],
    objetivo: "Avançar decisão",
    tom: "Consultivo",
    quandoUsar: "Para adicionar valor ao follow-up",
    perguntaChave: "Quem é dono do processo e quem é dono do dado?",
    impactoNaoTer: "Sem valor novo, follow-up vira cobrança.",
    template: "[Nome], pensando na nossa conversa...\n\nVi que em empresas como a [Empresa], geralmente existe uma pessoa que é dona do processo (operação) e outra que é dona do dado (TI/dados).\n\nQuem são esses dois na [Empresa]? Faz diferença na hora de desenhar a solução.\n\nMe conta que eu preparo algo mais direcionado.",
    proximoPasso: "Mapear stakeholders técnicos"
  },
  {
    id: "sdr-13",
    nome: "Pré-mortem leve — dados ou política",
    tipo: "SDR",
    etapa: "Qualificado",
    canal: ["Ligação", "WhatsApp"],
    objetivo: "Destravar TI",
    tom: "Consultivo",
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
    etapa: "Contato Inicial",
    canal: ["E-mail", "LinkedIn"],
    objetivo: "Agendar",
    tom: "Consultivo",
    quandoUsar: "Abordagem de valor antes de vender",
    perguntaChave: "Posso fazer um diagnóstico rápido e devolver pra você?",
    impactoNaoTer: "Sem valor antecipado, você é só mais um vendedor.",
    template: "[Nome], proposta:\n\nPosso fazer um diagnóstico rápido do processo de [X] de vocês — sem compromisso, sem apresentação de produto.\n\nTe devolvo um relatório de 1 página com:\n- Onde vocês estão perdendo tempo/dinheiro\n- Quanto isso custa por mês (estimativa)\n- O que empresas parecidas fizeram\n\nSe fizer sentido, a gente conversa. Se não, você fica com o material.\n\nTopa?",
    proximoPasso: "Agendar call de diagnóstico"
  },
  {
    id: "sdr-15",
    nome: "\"Não agora\" — condição de retorno",
    tipo: "SDR",
    etapa: "Qualificado",
    canal: ["WhatsApp", "E-mail"],
    objetivo: "Encerrar elegante",
    tom: "Leve",
    quandoUsar: "Quando lead adia indefinidamente",
    perguntaChave: "O que precisa acontecer pra virar prioridade?",
    impactoNaoTer: "Sem condição clara, você volta no escuro.",
    template: "[Nome], entendi que agora não é o momento.\n\nSó pra eu saber quando faz sentido voltar:\n\nO que precisa acontecer na [Empresa] pra isso virar prioridade?\n\n- Virada de quarter?\n- Budget novo?\n- Algum evento específico?\n\nMe conta que eu programo aqui.",
    proximoPasso: "Marcar retorno condicional"
  },
  {
    id: "sdr-16",
    nome: "Ligação — abertura direta",
    tipo: "SDR",
    etapa: "Lead",
    canal: ["Ligação"],
    objetivo: "Agendar",
    tom: "Direto",
    quandoUsar: "Abertura de cold call",
    perguntaChave: "Tem 2 minutos pra eu explicar por que liguei?",
    impactoNaoTer: "Abertura ruim = desligam em 10 segundos.",
    template: "Oi [Nome], aqui é [Seu nome] da Freedom AI.\n\nSei que você não tava esperando essa ligação. Tem 2 minutos pra eu explicar por que liguei?\n\n[Se sim]\n\nA gente ajuda empresas como a [Referência] a automatizar [processo] com IA. Não é chatbot, é agente que executa de verdade.\n\nFaz sentido uma conversa de 15 min essa semana?",
    proximoPasso: "Agendar ou marcar retorno"
  },
  {
    id: "sdr-17",
    nome: "Ligação — CTA sem enrolação",
    tipo: "SDR",
    etapa: "Contato Inicial",
    canal: ["Ligação"],
    objetivo: "Agendar",
    tom: "Urgente",
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
    etapa: "Lead",
    canal: ["LinkedIn"],
    objetivo: "Agendar",
    tom: "Leve",
    quandoUsar: "Primeira conexão LinkedIn",
    perguntaChave: "Vi que você cuida de [área]. Como tá esse desafio aí?",
    impactoNaoTer: "Mensagem genérica = ignora.",
    template: "Oi [Nome]!\n\nVi que você cuida de [área] na [Empresa]. Uma curiosidade:\n\nComo vocês estão lidando com [desafio comum do segmento] hoje?\n\nPergunto porque ajudamos empresas parecidas a resolver isso com IA — e queria entender se faz sentido trocar uma ideia.\n\nAbs!",
    proximoPasso: "Aguardar resposta e qualificar"
  },
  {
    id: "sdr-19",
    nome: "E-mail — 2 perguntas",
    tipo: "SDR",
    etapa: "Lead",
    canal: ["E-mail"],
    objetivo: "Agendar",
    tom: "Direto",
    quandoUsar: "E-mail curto para gerar resposta",
    perguntaChave: "Duas perguntas rápidas — pode responder?",
    impactoNaoTer: "E-mail longo demais = não lê.",
    template: "Assunto: 2 perguntas rápidas, [Nome]\n\n[Nome],\n\nDuas perguntas:\n\n1. [Problema X] é prioridade pra vocês esse trimestre?\n2. Se sim, você é a pessoa certa pra conversar?\n\nSe as duas respostas forem sim, vale uma conversa de 15 min.\n\nAbs,\n[Seu nome]",
    proximoPasso: "Esperar resposta ou ligar"
  },
  {
    id: "sdr-20",
    nome: "Encerramento — 5ª tentativa",
    tipo: "SDR",
    etapa: "Qualificado",
    canal: ["E-mail", "WhatsApp"],
    objetivo: "Encerrar elegante",
    tom: "Leve",
    quandoUsar: "Última tentativa antes de pausar",
    perguntaChave: "Faz sentido eu pausar e voltar em 3 meses?",
    impactoNaoTer: "Encerramento mal feito queima relacionamento.",
    template: "[Nome], última mensagem por agora.\n\nPercebo que o timing não tá batendo — sem problema nenhum.\n\nVou pausar o contato e voltar em 3 meses pra ver se o cenário mudou.\n\nSe antes disso [problema X] virar urgência, é só me chamar.\n\nAbs e sucesso!\n[Seu nome]",
    proximoPasso: "Marcar lembrete 90 dias"
  },

  // Closer Templates (20)
  {
    id: "closer-1",
    nome: "Abertura — \"não vim mostrar IA\"",
    tipo: "Closer",
    etapa: "Reunião Realizada",
    canal: ["Presencial", "Ligação"],
    objetivo: "Avançar decisão",
    tom: "Consultivo",
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
    etapa: "Reunião Realizada",
    canal: ["Presencial", "Ligação"],
    objetivo: "Avançar decisão",
    tom: "Consultivo",
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
    etapa: "Reunião Realizada",
    canal: ["Presencial", "Ligação"],
    objetivo: "Avançar decisão",
    tom: "Técnico",
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
    etapa: "Reunião Realizada",
    canal: ["Presencial", "Ligação"],
    objetivo: "Avançar decisão",
    tom: "Provocativo",
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
    etapa: "Reunião Realizada",
    canal: ["Presencial", "Ligação"],
    objetivo: "Avançar decisão",
    tom: "Provocativo",
    quandoUsar: "Para criar urgência",
    perguntaChave: "Quanto vocês perdem por mês enquanto isso não muda?",
    impactoNaoTer: "Sem número mensal, não existe pressão de timing.",
    template: "Vamos colocar um número:\n\nSe vocês gastam [X horas] com isso por mês, a [R$ Y/hora], são R$ [Z] por mês.\n\nSão [Z × 12] por ano.\n\nE isso tá acontecendo todo mês, certo?\n\nQuanto tempo faz sentido conviver com isso?",
    proximoPasso: "Validar número e criar proposta"
  },
  {
    id: "closer-6",
    nome: "Impacto risco",
    tipo: "Closer",
    etapa: "Reunião Realizada",
    canal: ["Presencial", "Ligação"],
    objetivo: "Avançar decisão",
    tom: "Provocativo",
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
    etapa: "Reunião Realizada",
    canal: ["Presencial", "Ligação"],
    objetivo: "Destravar Sponsor",
    tom: "Direto",
    quandoUsar: "Para mapear poder de decisão",
    perguntaChave: "Quem assina e quem pode travar?",
    impactoNaoTer: "Deal sem sponsor morre no funil.",
    template: "Pra gente não perder tempo no processo:\n\n- Quem assina esse tipo de contrato? É você ou precisa de alguém acima?\n- Tem alguém que pode vetar — TI, jurídico, financeiro?\n- Faz sentido envolver essas pessoas já na próxima conversa?",
    proximoPasso: "Mapear e agendar com decisores"
  },
  {
    id: "closer-8",
    nome: "Dados",
    tipo: "Closer",
    etapa: "Reunião Realizada",
    canal: ["Presencial", "Ligação"],
    objetivo: "Destravar TI",
    tom: "Técnico",
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
    etapa: "Reunião Realizada",
    canal: ["Presencial", "Ligação"],
    objetivo: "Avançar decisão",
    tom: "Direto",
    quandoUsar: "Fechamento de toda reunião",
    perguntaChave: "Qual o próximo passo, quando e quem é o dono?",
    impactoNaoTer: "Reunião sem próximo passo = deal morre.",
    template: "Antes de terminar, vamos travar o próximo passo:\n\n1. O que precisa acontecer pra gente avançar?\n2. Quando fazemos isso?\n3. Quem é o dono de cada ação?\n\nVou te mandar um resumo por escrito com esses pontos agora.",
    proximoPasso: "Enviar resumo e agendar próxima etapa"
  },
  {
    id: "closer-10",
    nome: "Resumo pós-reunião",
    tipo: "Closer",
    etapa: "Reunião Realizada",
    canal: ["E-mail"],
    objetivo: "Avançar decisão",
    tom: "Consultivo",
    quandoUsar: "Imediatamente após a reunião",
    perguntaChave: "Alinhei certo? Faltou algo?",
    impactoNaoTer: "Sem resumo escrito, cada um lembra diferente.",
    template: "Assunto: Resumo — [Empresa] + Freedom AI\n\n[Nome],\n\nObrigado pela conversa! Resumo do que alinhamos:\n\n**Problema:**\n[Descrição da dor]\n\n**Impacto:**\n[Custo mensal / risco identificado]\n\n**Próximos passos:**\n1. [Ação 1] — Dono: [Nome] — Data: [Data]\n2. [Ação 2] — Dono: [Nome] — Data: [Data]\n\nAlinhei certo? Faltou algo?\n\nAbs,\n[Seu nome]",
    proximoPasso: "Aguardar confirmação e executar"
  },
  {
    id: "closer-11",
    nome: "Pós-proposta — mini ROI",
    tipo: "Closer",
    etapa: "Negociação/Proposta",
    canal: ["WhatsApp", "E-mail"],
    objetivo: "Avançar decisão",
    tom: "Técnico",
    quandoUsar: "Follow-up após envio de proposta",
    perguntaChave: "Faz sentido revisar o ROI juntos?",
    impactoNaoTer: "Proposta sem ROI vira planilha de preço.",
    template: "[Nome], passando pra ver se teve chance de olhar a proposta.\n\nPensando no que conversamos:\n\n- Custo atual: R$ [X]/mês\n- Investimento Freedom: R$ [Y]/mês\n- Economia líquida: R$ [X-Y]/mês\n- Payback: [Z] meses\n\nFaz sentido a gente revisar esses números juntos?",
    proximoPasso: "Agendar call de revisão"
  },
  {
    id: "closer-12",
    nome: "Pós-proposta — pré-mortem",
    tipo: "Closer",
    etapa: "Negociação/Proposta",
    canal: ["WhatsApp", "Ligação"],
    objetivo: "Avançar decisão",
    tom: "Consultivo",
    quandoUsar: "Quando proposta está parada",
    perguntaChave: "O que pode matar esse deal?",
    impactoNaoTer: "Objeção não surfada = deal perdido de surpresa.",
    template: "[Nome], pergunta de pré-mortem:\n\nSe esse projeto não sair, vai ser por quê?\n\n- Timing errado?\n- Budget?\n- Alguém que ainda não aprovou?\n- Alguma preocupação técnica?\n\nQuero entender agora, não depois que já tiver perdido.",
    proximoPasso: "Resolver objeção identificada"
  },
  {
    id: "closer-13",
    nome: "Pós-proposta — call TI 20 min",
    tipo: "Closer",
    etapa: "Negociação/Proposta",
    canal: ["E-mail", "WhatsApp"],
    objetivo: "Destravar TI",
    tom: "Técnico",
    quandoUsar: "Quando TI é bloqueador",
    perguntaChave: "Faz sentido uma call técnica de 20 min?",
    impactoNaoTer: "TI sem resposta = deal trava indefinidamente.",
    template: "[Nome], sobre a parte técnica:\n\nFaz sentido uma call de 20 min entre nosso time técnico e o [responsável TI] de vocês?\n\nAgenda:\n1. Como funciona a integração\n2. Requisitos de infra\n3. Questões de segurança/dados\n\nAssim a gente destrava qualquer dúvida técnica antes de avançar.",
    proximoPasso: "Agendar call técnica"
  },
  {
    id: "closer-14",
    nome: "Pós-proposta — A/B de escopo",
    tipo: "Closer",
    etapa: "Negociação/Proposta",
    canal: ["E-mail", "WhatsApp"],
    objetivo: "Avançar decisão",
    tom: "Consultivo",
    quandoUsar: "Quando preço é barreira",
    perguntaChave: "Prefere escopo A ou escopo B?",
    impactoNaoTer: "Proposta única = tudo ou nada.",
    template: "[Nome], pensando em facilitar a decisão:\n\nTenho duas opções:\n\n**Opção A — Escopo completo**\n[Descrição] — R$ [X]/mês\n\n**Opção B — Piloto**\n[Descrição reduzida] — R$ [Y]/mês\n\nQual faz mais sentido pro momento de vocês?",
    proximoPasso: "Fechar em uma das opções"
  },
  {
    id: "closer-15",
    nome: "Pós-proposta — checklist aprovação",
    tipo: "Closer",
    etapa: "Negociação/Proposta",
    canal: ["E-mail", "WhatsApp"],
    objetivo: "Avançar decisão",
    tom: "Direto",
    quandoUsar: "Para mapear processo de compra",
    perguntaChave: "O que falta pra aprovar?",
    impactoNaoTer: "Sem checklist, você não sabe onde está.",
    template: "[Nome], pra eu entender o processo:\n\nO que falta pra vocês aprovarem?\n\n☐ Alinhamento técnico\n☐ Aprovação de budget\n☐ OK do [sponsor]\n☐ Revisão jurídica\n☐ Outro: ___\n\nMe ajuda a entender onde estamos e o que eu posso fazer pra acelerar.",
    proximoPasso: "Atacar pendências uma a uma"
  },
  {
    id: "closer-16",
    nome: "Pós-proposta — prioridade/pausa",
    tipo: "Closer",
    etapa: "Negociação/Proposta",
    canal: ["WhatsApp", "E-mail"],
    objetivo: "Recuperar",
    tom: "Direto",
    quandoUsar: "Quando proposta esfriou",
    perguntaChave: "Ainda é prioridade ou faz sentido pausar?",
    impactoNaoTer: "Ficar no limbo consome seu tempo sem resultado.",
    template: "[Nome], percebo que a conversa esfriou.\n\nSem problema — mas preciso entender:\n\n1. Isso ainda é prioridade pro Q [atual]?\n2. Entrou outro projeto na frente?\n3. Faz mais sentido pausar e voltar em [prazo]?\n\nPrefiro um não honesto do que ficar no limbo.",
    proximoPasso: "Definir status ou encerrar"
  },
  {
    id: "closer-17",
    nome: "Travou sponsor — texto para repassar",
    tipo: "Closer",
    etapa: "Negociação/Proposta",
    canal: ["E-mail", "WhatsApp"],
    objetivo: "Destravar Sponsor",
    tom: "Consultivo",
    quandoUsar: "Quando precisa do sponsor que você não fala direto",
    perguntaChave: "Posso te mandar um texto pronto pra você encaminhar?",
    impactoNaoTer: "Seu contato não sabe vender internamente.",
    template: "[Nome], sei que você precisa alinhar com [Sponsor].\n\nPosso te mandar um resumo de 1 parágrafo, pronto pra encaminhar?\n\nAssim você não precisa explicar do zero e a mensagem chega certinha.\n\nFunciona?",
    proximoPasso: "Enviar resumo executivo"
  },
  {
    id: "closer-18",
    nome: "Negociação — prazo custa dinheiro",
    tipo: "Closer",
    etapa: "Negociação/Proposta",
    canal: ["Ligação", "WhatsApp"],
    objetivo: "Avançar decisão",
    tom: "Provocativo",
    quandoUsar: "Quando cliente quer adiar decisão",
    perguntaChave: "Cada mês de atraso custa quanto?",
    impactoNaoTer: "Adiamento sem custo = adiamento infinito.",
    template: "[Nome], entendo que vocês precisam de tempo.\n\nMas pensa comigo:\n\nCada mês que passa, vocês continuam gastando R$ [X] com [problema].\n\nSe a gente começa em [mês], vocês economizam R$ [Y] até o final do ano.\n\nSe começa em [mês+2], são R$ [2X] a mais jogados fora.\n\nFaz sentido esperar?",
    proximoPasso: "Forçar data de decisão"
  },
  {
    id: "closer-19",
    nome: "Concessão com troca (X por Y)",
    tipo: "Closer",
    etapa: "Negociação/Proposta",
    canal: ["Ligação", "E-mail"],
    objetivo: "Avançar decisão",
    tom: "Direto",
    quandoUsar: "Quando cliente pede desconto",
    perguntaChave: "Consigo [X] se vocês fizerem [Y].",
    impactoNaoTer: "Desconto sem troca = margem jogada fora.",
    template: "[Nome], sobre o pedido de [desconto/prazo/condição]:\n\nConsigo fazer [concessão X] se vocês:\n\n- Fecharem até [data], ou\n- Pagarem anual antecipado, ou\n- Começarem com escopo [maior/menor]\n\nQual dessas funciona pra vocês?",
    proximoPasso: "Fechar acordo com contrapartida"
  },
  {
    id: "closer-20",
    nome: "Fechamento — condição verdadeira do \"sim\"",
    tipo: "Closer",
    etapa: "Contrato",
    canal: ["Ligação", "Presencial"],
    objetivo: "Avançar decisão",
    tom: "Direto",
    quandoUsar: "Momento de fechar",
    perguntaChave: "Se eu resolver [X], você fecha hoje?",
    impactoNaoTer: "Sem condição clara, você negocia no escuro.",
    template: "[Nome], pergunta direta:\n\nSe eu conseguir [condição que ele pediu], você fecha hoje?\n\nQuero saber se isso é a única coisa que falta ou se tem mais alguma questão.\n\nO que você me diz?",
    proximoPasso: "Enviar contrato ou resolver pendência final"
  }
];

// Filter options
export const filterOptions = {
  tipos: ["SDR", "BDR", "Closer", "Gestão", "CRM", "Métricas", "Objeção", "Checklist", "Proposta", "Lost"],
  etapas: ["Lead", "Contato Inicial", "Qualificado", "Reunião Agendada", "Reunião Realizada", "Negociação/Proposta", "Contrato", "Ganho", "Perdido"],
  canais: ["WhatsApp", "Ligação", "E-mail", "LinkedIn", "Presencial"],
  objetivos: ["Agendar", "Confirmar", "Fazer comparecer", "Avançar decisão", "Destravar TI", "Destravar Sponsor", "Recuperar", "Encerrar elegante"],
  tons: ["Direto", "Consultivo", "Provocativo", "Técnico", "Urgente", "Leve"]
};

export const quickFilters = [
  { label: "Só SDR", filter: { tipo: "SDR" } },
  { label: "Só Closer", filter: { tipo: "Closer" } },
  { label: "Só WhatsApp", filter: { canal: "WhatsApp" } },
  { label: "Só Pós-proposta", filter: { etapa: "Negociação/Proposta" } },
  { label: "Encerramento elegante", filter: { objetivo: "Encerrar elegante" } }
];
