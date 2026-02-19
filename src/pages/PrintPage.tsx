import { useRef } from "react";
import { Printer, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  objecoesVision,
  objecoesFinance,
  objecoesLegal,
  objecoesNalk,
  objecoesAgents,
  objecoesLetramento,
} from "@/data/objecoesExpandidas";

const PrintPage = () => {
  const navigate = useNavigate();
  const printRef = useRef<HTMLDivElement>(null);

  const objecoes = [
    { produto: "Vision", items: objecoesVision },
    { produto: "Finance Core", items: objecoesFinance },
    { produto: "Legal Hub", items: objecoesLegal },
    { produto: "NALK", items: objecoesNalk },
    { produto: "Freedom Agents", items: objecoesAgents },
    { produto: "Letramento IA", items: objecoesLetramento },
  ];

  const objecoesGerais = [
    { objecao: "Tá caro", resposta: "Entendo. Vamos voltar pro impacto: quanto vocês perdem por mês com isso?", pergunta: "Se o investimento se pagar em X meses, ainda parece caro?", impacto: "Cada mês que passa são R$ [X] jogados fora.", proximoPasso: "Revisar ROI juntos e recalcular payback" },
    { objecao: "Já tenho automação/RPA", resposta: "Ótimo! RPA é bom pra tarefas simples. Onde ele não consegue decidir sozinho?", pergunta: "Qual processo hoje depende de alguém olhar e decidir?", impacto: "RPA faz, IA decide. São camadas diferentes.", proximoPasso: "Mapear gaps do RPA atual" },
    { objecao: "Preciso falar com TI/jurídico", resposta: "Faz sentido. Posso preparar um resumo técnico/jurídico pra facilitar?", pergunta: "O que eles vão querer saber? Segurança, integração, compliance?", impacto: "Quanto tempo essa aprovação costuma levar?", proximoPasso: "Agendar call técnica de 20 min com TI" },
    { objecao: "IA dá risco", resposta: "Concordo que IA mal implementada dá risco. Por isso a gente começa com piloto controlado.", pergunta: "Qual risco específico te preocupa mais? Erro, viés, compliance?", impacto: "O risco de não fazer nada também existe — e cresce todo mês.", proximoPasso: "Apresentar cases de mitigação de risco" },
    { objecao: "Vamos pensar", resposta: "Entendo. O que especificamente vocês precisam pensar?", pergunta: "É timing, budget, ou alguma preocupação que a gente não endereçou?", impacto: "Enquanto vocês pensam, o problema continua custando R$ [X]/mês.", proximoPasso: "Definir data de retorno e condição de decisão" },
    { objecao: "Manda mais detalhe", resposta: "Claro. Qual detalhe específico você precisa pra avançar?", pergunta: "É técnico, comercial, ou case de referência?", impacto: "Fico preocupado de mandar material que não responde a dúvida real.", proximoPasso: "Entender dúvida real antes de enviar material" },
    { objecao: "Concorrente mais barato", resposta: "Faz sentido comparar. O que exatamente eles entregam pelo preço?", pergunta: "Eles garantem o mesmo SLA, suporte e resultado?", impacto: "Barato que não funciona sai caro. Já passaram por isso antes?", proximoPasso: "Fazer comparativo técnico lado a lado" },
    { objecao: "Não tenho budget agora", resposta: "Entendo. Só pra eu não te empurrar nada: quando você diz 'sem budget', é porque não existe verba ou porque a verba existe, mas não está priorizada?", pergunta: "O que teria que acontecer pra isso virar prioridade ainda neste trimestre?", impacto: "Cada mês que passa vocês seguem pagando o custo invisível de [DOR].", proximoPasso: "Mapear 1 cenário mínimo (MVP) + ROI básico." },
    { objecao: "Agora não é prioridade", resposta: "Perfeito. Só quero entender se é 'não é prioridade' porque não dói, ou porque não tem dono.", pergunta: "Se nada mudar nos próximos 90 dias, qual consequência você aceita pagar?", impacto: "O custo não para — ele só fica invisível até virar urgência.", proximoPasso: "Definir dono + 1 métrica de sucesso + data de reavaliação." },
    { objecao: "Estamos sem tempo para implementar", resposta: "Entendo. Só que 'falta de tempo' normalmente é o sintoma do problema — vocês já estão sobrecarregados.", pergunta: "Qual time hoje paga a conta do caos: financeiro, jurídico, operações ou comercial?", impacto: "Quanto mais vocês esperam, mais a rotina vira dependência de pessoas.", proximoPasso: "Plano de implantação em 2 fases: (1) quick win em X dias (2) expansão." },
    { objecao: "Meu time vai resistir / não vão usar", resposta: "Faz sentido. Por isso a gente não vende ferramenta — a gente vende alívio e resultado pro time.", pergunta: "Se eu te provar que o time economiza [X] horas/semana, quem vira o maior aliado interno?", impacto: "Sem adesão, vocês continuam dependentes de heróis e apagadores de incêndio.", proximoPasso: "Escolher 1 'champion' + rodar piloto com 10 usuários e medir economia." },
    { objecao: "Isso parece complexo demais", resposta: "Complexo é continuar com [DOR] do jeito atual. A gente começa simples, com uma primeira entrega objetiva.", pergunta: "Qual seria o 'sim' mais fácil? Resolver 1 processo específico em 30 dias.", impacto: "Complexidade cresce com o tempo: mais exceções, mais retrabalho, mais risco.", proximoPasso: "Definir escopo mínimo (1 caso de uso) + 1 métrica + cronograma." },
    { objecao: "Não quero depender de IA", resposta: "Perfeito — e você está certo em ter esse cuidado. IA aqui tem governança: o que pode, o que não pode, e rastreio.", pergunta: "Qual risco você quer eliminar primeiro: dado sensível, erro de resposta ou acesso indevido?", impacto: "O risco hoje já existe: processos manuais, gente compartilhando dado por WhatsApp.", proximoPasso: "Rodar com guardrails + logs + política de acesso e validação." },
    { objecao: "Preciso aprovar com CFO / diretoria", resposta: "Perfeito. Só vamos evitar telefone sem fio. Eu prefiro explicar em 15 min com números: custo atual vs ROI.", pergunta: "O CFO decide mais por redução de custo, aumento de receita ou redução de risco?", impacto: "Sem patrocínio, a empresa segue pagando custo invisível e atrasando decisões.", proximoPasso: "Agendar call com CFO + levar 1 página de ROI e plano em 30 dias." },
    { objecao: "Não confio nos dados que temos", resposta: "Entendo. A maioria das empresas está assim. A boa notícia: dá pra começar com o que vocês têm e ir melhorando.", pergunta: "Qual parte do dado falha mais: qualidade, acesso ou padronização?", impacto: "Sem dado confiável, vocês tomam decisão no escuro e pagam com erro e retrabalho.", proximoPasso: "Diagnóstico de dados + primeiro caso de uso que exige pouco dado." },
    { objecao: "Nossa TI não deixa / é travado", resposta: "Normal. Por isso a gente trabalha com padrão corporativo: acesso controlado, permissões e trilha.", pergunta: "O bloqueio é por segurança, por prioridade do time ou por integração?", impacto: "TI travada = negócio travado. A operação fica refém do manual e do improviso.", proximoPasso: "Call com TI com checklist técnico + definir modelo de integração mínimo." },
    { objecao: "A gente não tem clareza do problema ainda", resposta: "Ótimo — porque venda boa começa com pergunta. A gente faz diagnóstico antes de falar de produto.", pergunta: "Hoje o que dói mais: tempo, dinheiro ou risco?", impacto: "Sem clareza, vocês continuam atacando sintomas e o problema volta.", proximoPasso: "Reunião de diagnóstico com 6 perguntas + mapa de gargalos." },
    { objecao: "Pode dar errado / não quero ser o responsável", resposta: "Entendo. Então vamos fazer do jeito correto: piloto, métrica clara, governança e decisão baseada em evidência.", pergunta: "O que seria 'dar errado' pra você? Custo, reputação, compliance ou performance?", impacto: "Se vocês não fazem nada, a responsabilidade continua existindo — só que pelo problema atual.", proximoPasso: "Definir risco aceitável + piloto controlado + critérios de sucesso." },
    { objecao: "Quero só testar de graça", resposta: "Entendo o impulso. Só que teste sem escopo e sem dono vira ruído. Se for pra testar, vamos testar direito.", pergunta: "Qual métrica você quer provar em 30 dias pra dizer 'sim'?", impacto: "'Teste infinito' mantém vocês no mesmo lugar e o problema continua cobrando.", proximoPasso: "Piloto pago com escopo mínimo e métrica fechada (sem virar projeto eterno)." },
    { objecao: "Já tentamos isso antes e não funcionou", resposta: "Faz total sentido estar cético. A pergunta é: falhou por tecnologia ou por falta de processo/dono/adesão?", pergunta: "O que exatamente deu errado da última vez: escopo, dados, adesão ou expectativa?", impacto: "Trauma vira paralisia. E o problema continua acontecendo do mesmo jeito.", proximoPasso: "Autópsia da tentativa anterior + novo plano em 2 fases (quick win + escala)." },
    { objecao: "Me manda um preço pra eu decidir", resposta: "Eu posso te dar um range, mas preço sem diagnóstico vira chute — e geralmente dá errado.", pergunta: "Pra eu te dizer o valor certo: você quer resolver 1 processo ou vários? E qual a urgência (30/60/90 dias)?", impacto: "Se vocês decidem só por preço, quase sempre pagam mais depois em retrabalho/risco.", proximoPasso: "Diagnóstico rápido (15–20 min) e envio do range + recomendação." },
    { objecao: "Só fechamos com fornecedor homologado / compras", resposta: "Perfeito — isso é saudável. Só preciso entender o fluxo pra eu encaixar e não perder timing.", pergunta: "Qual é o passo mais demorado: homologação, jurídico ou aprovação financeira?", impacto: "Sem encaixar no processo, o projeto morre na fila e o problema segue custando.", proximoPasso: "Mapear processo de compras + checklist de documentos + data de decisão." },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Barra de controle — some na impressão */}
      <div className="print:hidden sticky top-0 z-50 bg-card border-b border-border px-6 py-3 flex items-center justify-between shadow-sm">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao Playbook
        </button>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">Versão para impressão — Playbook Comercial Freedom AI</span>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <Printer className="w-4 h-4" />
            Imprimir / Salvar PDF
          </button>
        </div>
      </div>

      {/* Conteúdo para impressão */}
      <div ref={printRef} className="max-w-4xl mx-auto px-8 py-10 print:px-6 print:py-4">

        {/* ── CAPA ── */}
        <div className="text-center py-16 print:py-8 border-b-4 border-foreground mb-10">
          <div className="text-6xl mb-4">⚡</div>
          <h1 className="text-4xl font-bold text-foreground mb-3 tracking-tight">Playbook Comercial</h1>
          <h2 className="text-2xl font-semibold text-muted-foreground mb-6">Freedom AI</h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Guia completo de processos, diretrizes e cultura de vendas.
          </p>
          <div className="mt-8 text-sm text-muted-foreground">
            Gerado em {new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}
          </div>
        </div>

        {/* ── 1. DNA FREEDOM ── */}
        <PrintSection emoji="🧬" title="1. DNA Freedom">
          <PrintSubtitle>Quem somos</PrintSubtitle>
          <p className="mb-4 text-sm">A Freedom coloca <strong>agentes de IA que executam processos reais</strong> e geram resultado mensurável.</p>

          <PrintSubtitle>Tese Comercial</PrintSubtitle>
          <PrintList items={[
            "Cliente compra impacto, não tecnologia.",
            "Processo repetitivo + volume + dados = ROI rápido.",
            "Projeto que não vira padrão = consultoria disfarçada (não queremos)."
          ]} />

          <PrintSubtitle>Valores Inegociáveis</PrintSubtitle>
          <PrintList items={["Cliente em primeiro lugar", "Entrega > discurso", "Autonomia & responsabilidade", "Disciplina e excelência", "Movimento constante"]} />

          <div className="grid grid-cols-2 gap-6 mt-4">
            <div>
              <PrintSubtitle>✅ Comportamentos Esperados</PrintSubtitle>
              <PrintList items={[
                "Assume dono do problema e da solução",
                "Comunica cedo — boas e más notícias",
                "Simplifica — menos slides, mais clareza",
                "CRM é verdade — sem maquiagem",
                "Cada ação move decisão — ou não faz"
              ]} />
            </div>
            <div>
              <PrintSubtitle>❌ Comportamentos Proibidos</PrintSubtitle>
              <PrintList items={[
                "Sumir sem dar status",
                "Follow-up pedindo retorno sem valor novo",
                "Card sem tarefa no CRM",
                "Proposta sem impacto de não ter",
                "Falar de feature antes de entender dor"
              ]} />
            </div>
          </div>
        </PrintSection>

        {/* ── 2. LEI DO COMERCIAL ── */}
        <PrintSection emoji="⚖️" title="2. Lei do Comercial">
          <div className="border-l-4 border-foreground pl-4 mb-5">
            <p className="text-base font-bold">Vendas é sobre PERGUNTAR e sobre o IMPACTO DE NÃO TER.</p>
          </div>

          <PrintSubtitle>As 7 Perguntas que Vendem</PrintSubtitle>
          <div className="space-y-1.5 mb-5">
            {[
              { num: 1, q: "Onde dói?", desc: "Identificar a dor real" },
              { num: 2, q: "Qual volume?", desc: "Dimensionar oportunidade" },
              { num: 3, q: "Quanto custa hoje?", desc: "Quantificar impacto" },
              { num: 4, q: "O que acontece se nada mudar?", desc: "Criar urgência" },
              { num: 5, q: "Onde estão os dados?", desc: "Validar viabilidade" },
              { num: 6, q: "Quem é sponsor?", desc: "Mapear decisor" },
              { num: 7, q: "Próximo passo com data e dono?", desc: "Travar ação" }
            ].map(item => (
              <div key={item.num} className="flex items-center gap-3 py-1.5 border-b border-border text-sm">
                <span className="font-bold text-foreground w-5 flex-shrink-0">{item.num}.</span>
                <span className="font-semibold text-foreground flex-1">{item.q}</span>
                <span className="text-muted-foreground text-xs">{item.desc}</span>
              </div>
            ))}
          </div>

          <PrintSubtitle>Frases de Impacto de Não Ter</PrintSubtitle>
          <PrintQuotes items={[
            "Se vocês não resolverem isso, o que continua acontecendo no mês que vem?",
            "Qual custo invisível ninguém coloca na planilha?",
            "Se isso estourar, estoura onde?",
            "Quanto tempo por mês vocês perdem com isso?"
          ]} />

          <PrintSubtitle>Sequência Obrigatória de Conversa</PrintSubtitle>
          <div className="flex items-center gap-2 flex-wrap mt-2 mb-4">
            {["Diagnóstico", "Impacto de não ter", "Viabilidade", "Próximo passo"].map((step, i, arr) => (
              <span key={step} className="flex items-center gap-2">
                <span className="px-3 py-1 border-2 border-foreground rounded font-semibold text-sm">{step}</span>
                {i < arr.length - 1 && <span className="font-bold">→</span>}
              </span>
            ))}
          </div>

          <PrintSubtitle>Padrão Freedom de Postura</PrintSubtitle>
          <div className="flex gap-3 flex-wrap mt-1">
            {["Direto", "Consultivo", "Adulto", "Sem hype"].map(p => (
              <span key={p} className="px-4 py-1.5 border border-foreground rounded font-semibold text-sm">{p}</span>
            ))}
          </div>
        </PrintSection>

        {/* ── 3. ICP & QUALIFICAÇÃO ── */}
        <PrintSection emoji="🎯" title="3. ICP & Qualificação">
          <div className="border-l-4 border-foreground pl-4 mb-5">
            <p className="font-bold">Se você não filtra, você vira call center.</p>
          </div>

          <PrintSubtitle>Como funciona (3 camadas que coexistem)</PrintSubtitle>
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[
              { chip: "Etapa do funil", desc: "Onde o lead está no processo" },
              { chip: "Lead Score", desc: "Potencial estimado (para priorizar)" },
              { chip: "Classificação", desc: "Lead / MQL / SQL — prontidão comercial" },
            ].map(item => (
              <div key={item.chip} className="p-3 border border-border rounded text-center text-sm">
                <p className="font-bold mb-1">{item.chip}</p>
                <p className="text-muted-foreground text-xs">{item.desc}</p>
              </div>
            ))}
          </div>

          <PrintSubtitle>Lead Score</PrintSubtitle>
          <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
            <div>
              <p className="font-semibold mb-1">✅ Para que é usado</p>
              <PrintList items={["Ranquear leads dentro da etapa LEAD", "Priorizar atendimento do SDR", "Avaliar qualidade de campanhas", "Comparar canais, produtos e mensagens", "Orientar o contexto inicial do atendimento"]} />
            </div>
            <div>
              <p className="font-semibold mb-1">🚫 O que NÃO é</p>
              <PrintList items={["Não valida dor real", "Não substitui conversa humana", "Não bloqueia atendimento", "Não define SQL sozinho", "Não é fonte de verdade absoluta"]} />
            </div>
          </div>

          <PrintSubtitle>Regra Automática de Classificação (etapa LEAD)</PrintSubtitle>
          <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
            <div className="p-2 border border-border rounded"><span className="font-mono">Lead Score &lt; 55</span> → Classificação: <strong>LEAD</strong></div>
            <div className="p-2 border border-border rounded"><span className="font-mono">Lead Score ≥ 55</span> → Classificação: <strong>MQL</strong></div>
          </div>

          <PrintSubtitle>Destinos do Lead em CONTATO INICIAL</PrintSubtitle>
          <div className="space-y-3 text-sm">
            {[
              { titulo: "❌ DESQUALIFICADO", quando: ["O lead mentiu no formulário", "O porte ou contexto não têm fit", "Não existe aderência mínima com a Freedom"], acao: ["Marcar como DESQUALIFICADO", "Corrigir os dados no CRM (quando aplicável)"], obs: "Desqualificado é não-fit real, não é 'perdido por não responder'." },
              { titulo: "🚫 PERDIDO", quando: ["Foram feitas 7 tentativas de contato sem sucesso", "Menos de 7 tentativas, mas com motivo objetivo e relevante (obrigatório registrar)"], acao: ["Marcar como PERDIDO", "Registrar o motivo obrigatório no campo correspondente"], obs: "'Perdido' não é chute: precisa ter tentativas registradas e/ou motivo objetivo." },
              { titulo: "🟡 MQL (mantido como MQL)", quando: ["A dor ainda é exploratória", "A prioridade é baixa ou futura", "O SDR não consegue definir próximo passo claro"], acao: ["Manter como MQL (lead em maturação)", "Criar tarefa de follow-up com data (proibido ficar sem tarefa)"], obs: "MQL não é erro. MQL é lead em maturação." },
              { titulo: "✅ SQL (objetivo principal)", quando: ["Dor real e concreta confirmada", "Prioridade atual ou comportamento ativo", "Próximo passo claro acordado"], acao: ["Classificar no CRM como SQL", "Garantir próximo passo registrado como tarefa (data + responsável)"], obs: "" },
            ].map(d => (
              <div key={d.titulo} className="border border-border rounded p-3">
                <p className="font-bold mb-2">{d.titulo}</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase text-muted-foreground mb-1">Quando acontece</p>
                    <PrintList items={d.quando} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase text-muted-foreground mb-1">Ação no CRM</p>
                    <PrintList items={d.acao} />
                  </div>
                </div>
                {d.obs && <p className="mt-2 text-xs italic text-muted-foreground">{d.obs}</p>}
              </div>
            ))}
          </div>

          <PrintSubtitle>Mapa do Fluxo</PrintSubtitle>
          <div className="flex items-center gap-3 flex-wrap text-sm font-semibold my-2">
            <span className="px-3 py-1 border border-border rounded">LEAD (score ranqueia)</span>
            <span>→</span>
            <span className="px-3 py-1 border border-border rounded">CONTATO INICIAL (SDR valida)</span>
            <span>→</span>
            <span className="px-2 py-1 border border-border rounded text-xs">Perdido / MQL / SQL</span>
          </div>
          <PrintList items={["O lead passou pela validação do SDR", "Existe dor confirmada", "Existe intenção ou movimento real", "A partir daqui avança para reuniões, proposta e fechamento"]} />

          <PrintSubtitle>Missão do SDR em Contato Inicial</PrintSubtitle>
          <PrintList items={["1. Converter o máximo possível para SQL", "2. Manter como MQL quando ainda não há maturidade", "3. Encerrar corretamente como Perdido ou Desqualificado quando aplicável"]} />
        </PrintSection>

        {/* ── 4. PRODUTOS ── */}
        <PrintSection emoji="📦" title="4. Produtos">
          {[
            {
              name: "Vision",
              oQueE: "Plataforma de IA que se conecta às câmeras para enxergar, entender e agir sobre eventos críticos da operação. Transforma visão em decisão operacional.",
              paraQuemE: ["Varejo (alimentar, farmácias, drogarias, postos)", "Centros de distribuição, indústrias, instituições de ensino", "Ambientes com operação viva e múltiplos pontos de atenção"],
              dores: ["Perdas invisíveis: furtos, fraudes e conluio corroem a margem silenciosamente", "Baixa produtividade: filas, ruptura de gôndola e falhas no planograma", "Segurança reativa: monitoramento humano age só depois do incidente"],
              perguntas: ["\"Hoje vocês descobrem perda quando? No dia? Na semana? No fechamento?\"", "\"Quanto custa 1% de perda a mais por mês na sua operação?\"", "\"Suas câmeras servem para ver depois ou para agir na hora?\""],
              fitForte: ["Muitas câmeras / muitas lojas / operação com padrão inconsistente", "Dor de perda, filas ou ruptura que 'todo mundo sabe que existe'", "Alguém com dor e poder: operações, prevenção de perdas, diretoria"],
              redFlags: ["'Quero IA por curiosidade' sem dor operacional real", "Não tem responsável para agir quando o alerta aparece"],
            },
            {
              name: "Finance Core",
              oQueE: "Sistema autônomo que executa o ciclo financeiro de ponta a ponta. Substitui trabalho manual por mão de obra digital 24/7 com padronização, controle e trilha de auditoria.",
              paraQuemE: ["Empresas com alto volume de faturamento e operações financeiras complexas", "CFO/Controller que precisa de previsibilidade, controle e governança", "Processos de pagamento de fretes, fornecedores e múltiplos documentos fiscais"],
              dores: ["Pagamentos fraudulentos ou em duplicidade descobertos depois que o dinheiro saiu", "Processo de fretes extremamente manual (NF-e, CT-e, comprovante de entrega)", "Gestão de caixa reativa: decisões tomadas sob pressão"],
              perguntas: ["\"Quanto tempo seu time gasta por semana em conciliação e correção?\"", "\"Quantos pagamentos vocês descobrem que estavam errados depois que já saíram do caixa?\"", "\"A gestão de caixa de vocês é reativa ou preditiva?\""],
              fitForte: ["Volume alto de notas, recebíveis, múltiplos fornecedores e documentos fiscais", "CFO/Controller patrocinando (dono do problema)", "Dores com impacto direto em caixa, eficiência e risco de fraude"],
              redFlags: ["'Financeiro é pequeno, não dói' (até mostrar o custo invisível)", "Sem acesso a dados/sistemas ou ninguém para liberar integração mínima"],
            },
            {
              name: "Legal Hub",
              oQueE: "Sistema autônomo que atua como central de produção jurídica: cria peças processuais complexas do início ao fim, com padrão técnico elevado e prontas para protocolo.",
              paraQuemE: ["Jurídicos corporativos e escritórios de grande porte com alto volume de contencioso", "Contencioso massificado: recursos de apelação, contrarrazões e peças repetitivas"],
              dores: ["Volume e custo elevado: recursos repetitivos consomem horas de advogados em tarefas manuais", "Risco e inconsistência: produção manual gera peças com qualidade variável", "Advogados gastam a maior parte do tempo lendo PDFs e extraindo fatos"],
              perguntas: ["\"Quantas peças por mês vocês produzem? Quantas são repetitivas?\"", "\"Quantas horas por semana viram leitura de PDF e extração de prova?\"", "\"Se você pudesse dobrar produção sem dobrar equipe, o que mudaria?\""],
              fitForte: ["Volume alto de contencioso repetitivo com risco real", "Liderança do jurídico patrocinando a mudança", "Carteira com milhares de processos similares (bancos, seguradoras, telecoms)"],
              redFlags: ["'Quer só template' — sem necessidade de escala ou padrão", "Não tem teses/padrões minimamente definidos"],
            },
            {
              name: "NALK",
              oQueE: "Plataforma de Marketing & Sales Analytics: centraliza dados de CRM + mídia + automações, cria dashboards, leitura executiva e permite tomar decisão baseada em dado.",
              paraQuemE: ["Empresas com investimento em mídia + CRM + funis comerciais", "Operações que sofrem com 'cada um tem um número'", "Lideranças que precisam de: CAC real, ROI por canal, conversão por etapa, previsibilidade"],
              dores: ["Dados espalhados em ferramentas e planilhas", "Conflito marketing x vendas ('lead ruim' vs 'vendas não trabalha')", "Forecast fraco por falta de visibilidade real do funil"],
              perguntas: ["\"Hoje você sabe, com confiança, qual canal gera mais venda com menor custo?\"", "\"Qual etapa do funil mais mata seu crescimento?\"", "\"Seu time decide por dado ou por opinião?\""],
              fitForte: ["Investimento contínuo em aquisição + uso real de CRM + necessidade de gestão"],
              redFlags: ["'Não medimos nada'", "'Não temos dono do número'", "'Não temos acesso aos dados'"],
            },
            {
              name: "Freedom Agents",
              oQueE: "Oferta enterprise onde a Freedom atua como fornecedor central de agentes de média e alta complexidade para múltiplas áreas. O cliente recebe agentes prontos, rodando em produção, com dono do fluxo e governança.",
              paraQuemE: ["Empresas que querem escalar IA internamente sem depender de time técnico grande", "Enterprise / operações complexas com múltiplos stakeholders (TI + área + diretoria)"],
              dores: ["'A gente quer IA, mas cada área pede uma coisa'", "'Sem time técnico, tudo vira travado'", "'Já tentamos e virou piloto infinito'"],
              perguntas: ["\"Hoje, quantas áreas estão pedindo IA ao mesmo tempo?\"", "\"Vocês querem construir plataforma… ou querem agente pronto rodando?\"", "\"Qual processo, se resolvesse em 30 dias, traria maior impacto?\""],
              fitForte: ["Agente pronto, não 'ferramenta pra você montar'", "Fornecedor central para todas as áreas (escala por padrão)", "Governança e ownership do fluxo (sem piloto infinito)"],
              redFlags: ["'Quero só testar' sem escopo e sem dono", "Sem patrocinador interno claro"],
            },
            {
              name: "Letramento IA",
              oQueE: "Workshop corporativo presencial premium (16h) para gerar fluência corporativa em IA e elevar a maturidade digital do time.",
              paraQuemE: ["Liderança (C-levels), Operações, Marketing, Vendas, Atendimento, RH", "Qualquer empresa que deseje profissionalizar o uso de IA e criar base cultural para adoção com governança"],
              dores: ["Time 'usa IA', mas não entende — sem padrão e sem governança", "Uso superficial ou inseguro — risco por falta de boas práticas", "Medo ou resistência à tecnologia — barreira cultural"],
              perguntas: ["\"Hoje sua equipe usa IA de forma padronizada… ou cada um 'do seu jeito'?\"", "\"Se eu pedir 'mostra o playbook de boas práticas de IA da empresa'… existe?\"", "\"O que acontece se um colaborador colar dado sensível num prompt amanhã?\""],
              fitForte: ["Liderança quer profissionalizar IA (não só 'testar')", "Time grande/multiáreas e necessidade de padronizar uso", "Empresa quer criar base cultural para depois escalar automações/agentes"],
              redFlags: ["'Quero só uma palestra motivacional' — sem intenção de aplicação", "'IA é só curiosidade' — sem dor e sem dono interno"],
            },
          ].map((prod) => (
            <div key={prod.name} className="mb-8 border border-border rounded-lg p-4">
              <h3 className="text-lg font-bold border-b border-border pb-2 mb-3">{prod.name}</h3>
              <p className="text-sm mb-3">{prod.oQueE}</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-semibold mb-1 text-xs uppercase text-muted-foreground">Para quem é</p>
                  <PrintList items={prod.paraQuemE} />
                </div>
                <div>
                  <p className="font-semibold mb-1 text-xs uppercase text-muted-foreground">Dores que resolve</p>
                  <PrintList items={prod.dores} />
                </div>
                <div>
                  <p className="font-semibold mb-1 text-xs uppercase text-muted-foreground">Fit Forte</p>
                  <PrintList items={prod.fitForte} />
                </div>
                <div>
                  <p className="font-semibold mb-1 text-xs uppercase text-muted-foreground">Red Flags</p>
                  <PrintList items={prod.redFlags} />
                </div>
              </div>
              <div className="mt-3">
                <p className="font-semibold mb-1 text-xs uppercase text-muted-foreground">Perguntas que vendem</p>
                <PrintQuotes items={prod.perguntas} />
              </div>
            </div>
          ))}
        </PrintSection>

        {/* ── 5. CRM & GOVERNANÇA ── */}
        <PrintSection emoji="🗂️" title="5. CRM & Governança">
          <div className="border-l-4 border-foreground pl-4 mb-5">
            <p className="font-bold">CRM é verdade ou fantasia. Aqui é verdade.</p>
          </div>

          <PrintSubtitle>Esteira SDR/BDR</PrintSubtitle>
          <div className="flex items-center gap-2 flex-wrap text-sm font-semibold mb-3">
            {["Lead", "Contato Inicial", "Qualificado", "Reunião Agendada"].map((s, i, arr) => (
              <span key={s} className="flex items-center gap-2">
                <span className="px-2 py-1 border border-border rounded">{s}</span>
                {i < arr.length - 1 && <span>→</span>}
              </span>
            ))}
          </div>
          <div className="space-y-2 text-sm mb-4">
            {[
              { step: "1. Lead", desc: "O lead entra e fica em LEAD até alguém agir. Não existe lead 'se atendendo sozinho'." },
              { step: "2. Contato Inicial (botão Iniciar Qualificação)", desc: "Ao clicar, CRM move automaticamente para CONTATO INICIAL. A partir desse momento é obrigatório ter tarefa agendada." },
              { step: "3. Qualificado = SQL na prática", desc: "MQL validado (score ≥ 55) + Produto identificado + Dor clara confirmada." },
              { step: "4. Reunião Agendada", desc: "Deve conter: informações sobre o lead e horário e dia da reunião." },
            ].map(item => (
              <div key={item.step} className="p-2 border border-border rounded">
                <p className="font-semibold">{item.step}</p>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>

          <PrintSubtitle>Esteira Closer</PrintSubtitle>
          <div className="flex items-center gap-2 flex-wrap text-sm font-semibold mb-3">
            {["Reunião Agendada", "Reunião Realizada", "Negociação/Proposta", "Contrato", "Ganho"].map((s, i, arr) => (
              <span key={s} className="flex items-center gap-2">
                <span className="px-2 py-1 border border-border rounded text-xs">{s}</span>
                {i < arr.length - 1 && <span>→</span>}
              </span>
            ))}
          </div>
          <div className="space-y-2 text-sm mb-4">
            {[
              { step: "1. Reunião Agendada", desc: "Closer revisa: produto sugerido, dor e contexto. Objetivo: chegar na reunião com controle." },
              { step: "2. No-show", desc: "Clicar NO-SHOW → card volta para QUALIFICADO → tarefa retorna para o SDR responsável." },
              { step: "3. Negociação/Proposta (campos obrigatórios)", desc: "Produto + Valor do produto + Probabilidade + Data de fechamento. Probabilidade calculada automaticamente via análise da call." },
              { step: "4. Ganho", desc: "Só marcar GANHO quando o fechamento for real (contrato/PO/OK final conforme regra do time)." },
            ].map(item => (
              <div key={item.step} className="p-2 border border-border rounded">
                <p className="font-semibold">{item.step}</p>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>

          <PrintSubtitle>Agendamento Automático (Typebot)</PrintSubtitle>
          <PrintList items={["Acontece somente para Lead Score ≥ 70", "SDR deve contatar para confirmar (WhatsApp)", "1 hora antes: SDR manda WhatsApp com confirmação + link da reunião"]} />
          <div className="border-l-4 border-foreground pl-4 mt-3 mb-4">
            <p className="font-bold text-sm">"Reunião marcada não é reunião confirmada. Quem confirma, vende."</p>
          </div>

          <PrintSubtitle>Tarefas: Alertas e Regras</PrintSubtitle>
          <PrintList items={["🔴 Vermelho = Tarefa atrasada (ZERAR imediatamente)", "🟡 Amarelo = Sem tarefa (PROIBIDO)", "🟢 Verde = Tarefa para hoje", "⚪ Cinza = Tarefa futura"]} />
          <p className="text-sm mt-2 font-semibold">É PROIBIDO ficar sem tarefa agendada. É PROIBIDO ter tarefa atrasada.</p>

          <PrintSubtitle>Forecast</PrintSubtitle>
          <div className="border-l-4 border-foreground pl-4 mb-3">
            <p className="font-bold text-sm">Forecast = Valor do produto × Probabilidade (filtra fechamentos previstos no mês)</p>
          </div>

          <PrintSubtitle>Padrão Mínimo de Cadastro de Lead</PrintSubtitle>
          <PrintList items={["Nome da empresa", "Nome do contato", "Telefone", "Origem (inbound/outbound/canal)"]} />

          <PrintSubtitle>Proibições de Governança</PrintSubtitle>
          <PrintList items={["Lead sem tarefa", "Tarefa atrasada", "Mover etapa sem critério", "'Inventar' probabilidade (use a calculadora)", "Deixar lead parado por falta de dono"]} />

          <PrintSubtitle>Checklist Diário do Vendedor</PrintSubtitle>
          <PrintChecklist items={["Verificar aba TAREFAS", "Zerar vermelho (atrasadas)", "Zerar amarelo (sem tarefa)", "Repriorizar por Lead Score (SDR)", "Atualizar etapa após cada interação relevante"]} />

          <PrintSubtitle>Erros Comuns e Correções</PrintSubtitle>
          <div className="space-y-2 text-sm">
            {[
              { erro: "'Lead ficou parado'", correcao: "Iniciar qualificação + tarefa na hora." },
              { erro: "'Reunião agendada mas ninguém confirmou'", correcao: "SDR confirma ao entrar + 1h antes manda link." },
              { erro: "'Probabilidade chutada'", correcao: "Usar calculadora e preencher evidências." },
              { erro: "'Negociação sem campos preenchidos'", correcao: "Travar passagem até preencher produto/valor/probabilidade/data." },
            ].map((item, i) => (
              <div key={i} className="p-2 border border-border rounded">
                <p className="font-semibold text-destructive">Erro: {item.erro}</p>
                <p className="text-muted-foreground">✓ {item.correcao}</p>
              </div>
            ))}
          </div>
        </PrintSection>

        {/* ── 6. MÉTRICAS & GESTÃO ── */}
        <PrintSection emoji="📊" title="6. Métricas & Gestão">
          <div className="border-l-4 border-foreground pl-4 mb-5">
            <p className="font-bold">Sem placar, vira opinião. Opinião não bate meta.</p>
          </div>

          <PrintSubtitle>Forecast (Lei)</PrintSubtitle>
          <p className="text-sm mb-4"><strong>Forecast mensal = soma (Valor × Probabilidade)</strong> — Só entra se data de fechamento esperada estiver dentro do mês.</p>

          <PrintSubtitle>Métricas Avaliadas — SDR</PrintSubtitle>
          <div className="space-y-1.5 text-sm mb-4">
            {[
              { de: "Lead → Contato Inicial", metrica: "Tempo de uma etapa para outra" },
              { de: "Contato Inicial → Qualificado", metrica: "Taxa de MQL para SQL" },
              { de: "Qualificado → Reunião Agendada", metrica: "Taxa de SQL para agendamento" },
              { de: "Reunião Agendada → Reunião Realizada", metrica: "Taxa de no-show" },
              { de: "MQL → Reunião Realizada Validada", metrica: "Taxa de conversão do SDR" },
            ].map((item, i) => (
              <div key={i} className="flex gap-2 p-1.5 border-b border-border">
                <span className="font-medium text-foreground">{item.de}</span>
                <span className="text-muted-foreground">— {item.metrica}</span>
              </div>
            ))}
          </div>

          <PrintSubtitle>Métricas Avaliadas — Closer</PrintSubtitle>
          <div className="space-y-1.5 text-sm mb-4">
            {[
              { de: "Reunião Realizada → Negociação/Proposta", metrica: "Taxa de evolução" },
              { de: "Negociação/Proposta → Contrato", metrica: "Taxa de evolução" },
              { de: "Contrato → Ganho", metrica: "Receita" },
              { de: "Reunião Realizada Válida → Ganho", metrica: "Taxa de conversão do Closer" },
            ].map((item, i) => (
              <div key={i} className="flex gap-2 p-1.5 border-b border-border">
                <span className="font-medium text-foreground">{item.de}</span>
                <span className="text-muted-foreground">— {item.metrica}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <PrintSubtitle>KPIs SDR/BDR</PrintSubtitle>
              <div className="space-y-2 text-sm">
                {[
                  { kpi: "Contato por tentativa", mede: "Eficiência de alcance", corrige: "Melhorar horários e canais" },
                  { kpi: "MQL rate", mede: "Qualidade da base", corrige: "Refinar ICP e fonte de leads" },
                  { kpi: "Show rate", mede: "Qualidade do agendamento", corrige: "Melhorar confirmação e valor percebido" },
                  { kpi: "Tempo até agendar", mede: "Velocidade de conversão", corrige: "Reduzir toques, aumentar urgência" },
                  { kpi: "Conversão MQL→Realizada", mede: "Efetividade do SDR", corrige: "Treinar qualificação e objeções" }
                ].map(item => (
                  <div key={item.kpi} className="p-2 border border-border rounded">
                    <p className="font-semibold">{item.kpi}</p>
                    <p className="text-muted-foreground text-xs">Mede: {item.mede}</p>
                    <p className="text-muted-foreground text-xs">Corrige: {item.corrige}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <PrintSubtitle>KPIs Closer</PrintSubtitle>
              <div className="space-y-2 text-sm">
                {[
                  { kpi: "Win rate", mede: "Efetividade de fechamento", corrige: "Melhorar diagnóstico e negociação" },
                  { kpi: "Ciclo médio", mede: "Velocidade de venda", corrige: "Antecipar objeções, acelerar decisão" },
                  { kpi: "Proposta→Negociação ativa", mede: "Qualidade da proposta", corrige: "Melhorar ROI e impacto de não ter" },
                  { kpi: "Precisão forecast", mede: "Previsibilidade", corrige: "Disciplina de probabilidade e data" },
                  { kpi: "Lost reasons", mede: "Padrão de perda", corrige: "Ações corretivas por motivo" }
                ].map(item => (
                  <div key={item.kpi} className="p-2 border border-border rounded">
                    <p className="font-semibold">{item.kpi}</p>
                    <p className="text-muted-foreground text-xs">Mede: {item.mede}</p>
                    <p className="text-muted-foreground text-xs">Corrige: {item.corrige}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <PrintSubtitle>Higiene do CRM (Meta 0/100)</PrintSubtitle>
          <div className="grid grid-cols-3 gap-3 text-sm text-center">
            {[
              { label: "% cards sem tarefa", meta: "= 0" },
              { label: "% negociação sem data", meta: "= 0" },
              { label: "% negociação sem prob", meta: "= 0" }
            ].map(item => (
              <div key={item.label} className="p-3 border border-border rounded">
                <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                <p className="text-2xl font-bold">{item.meta}</p>
              </div>
            ))}
          </div>

          <PrintSubtitle>Rotinas</PrintSubtitle>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="p-3 border border-border rounded">
              <p className="font-semibold">Diário (15 min)</p>
              <p className="text-muted-foreground">Revisão de tarefas do dia, cards críticos</p>
            </div>
            <div className="p-3 border border-border rounded">
              <p className="font-semibold">Semanal (60 min)</p>
              <p className="text-muted-foreground">Top 10 deals, forecast, lost, funil inverso</p>
            </div>
          </div>
        </PrintSection>

        {/* ── 7. CHECKLISTS ── */}
        <PrintSection emoji="✅" title="7. Checklists">
          <div className="border-l-4 border-foreground pl-4 mb-5">
            <p className="font-bold">Checklist não é burocracia. É blindagem contra erro.</p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <PrintSubtitle>Checklist Pré-Reunião (10 min)</PrintSubtitle>
              <PrintChecklist items={[
                "Pesquisei a empresa (site, LinkedIn, notícias recentes)",
                "Sei quem vai participar e qual o cargo de cada um",
                "Tenho hipótese de dor baseada no segmento",
                "Preparei 3-5 perguntas de diagnóstico",
                "Testei o link da reunião",
                "Tenho o contexto do que o SDR já qualificou"
              ]} />
            </div>
            <div>
              <PrintSubtitle>Checklist Pós-Reunião (CRM obrigatório)</PrintSubtitle>
              <PrintChecklist items={[
                "Atualizei o card com notas da reunião",
                "Defini próxima atividade com data",
                "Atualizei valor, probabilidade e data de fechamento",
                "Enviei resumo por escrito pro cliente",
                "Agendei próximo passo no calendário",
                "Comuniquei internamente se precisa de suporte técnico"
              ]} />
            </div>
            <div>
              <PrintSubtitle>Checklist Proposta</PrintSubtitle>
              <PrintChecklist items={[
                "Dor claramente descrita (nas palavras do cliente)",
                "Impacto quantificado (R$/mês ou % de ganho)",
                "Premissas listadas (volume, dados, escopo)",
                "Cronograma com marcos claros",
                "Investimento com opções (se aplicável)",
                "Próximo passo definido após aceite",
                "ROI / payback calculado"
              ]} />
            </div>
            <div>
              <PrintSubtitle>Checklist Handoff Implantação</PrintSubtitle>
              <PrintChecklist items={[
                "Contrato assinado e disponível",
                "Kick-off agendado com cliente",
                "Sponsor e contatos operacionais mapeados",
                "Documentação técnica entregue (acessos, integrações)",
                "Expectativas de prazo alinhadas",
                "Critérios de sucesso definidos",
                "Closer apresentou time de implantação ao cliente"
              ]} />
            </div>
          </div>

          <PrintSubtitle>Roteiro Durante a Reunião</PrintSubtitle>
          <div className="grid grid-cols-2 gap-4 text-sm">
            {[
              { step: "1. DIAGNÓSTICO (10-15 min)", items: ["\"O que te fez aceitar essa conversa?\"", "\"Me conta o processo do início ao fim\"", "\"Onde trava? Onde dá mais retrabalho?\""] },
              { step: "2. IMPACTO DE NÃO TER (5-10 min)", items: ["\"Quanto custa isso por mês?\"", "\"O que acontece se nada mudar em 90 dias?\"", "\"Se isso estourar, estoura onde?\""] },
              { step: "3. VIABILIDADE (5-10 min)", items: ["\"Os dados existem? Onde estão?\"", "\"Quem é o sponsor? Quem pode vetar?\"", "\"Qual o timeline ideal?\""] },
              { step: "4. PRÓXIMO PASSO (5 min)", items: ["\"Qual o próximo passo?\"", "\"Quando fazemos isso?\"", "\"Quem é o dono de cada ação?\""] }
            ].map(block => (
              <div key={block.step} className="p-2 border border-border rounded">
                <p className="font-semibold text-xs mb-1">{block.step}</p>
                {block.items.map((item, i) => <p key={i} className="text-xs text-muted-foreground">• {item}</p>)}
              </div>
            ))}
          </div>
        </PrintSection>

        {/* ── 8. OBJEÇÕES ── */}
        <PrintSection emoji="🛡️" title="8. Objeções">
          <div className="border-l-4 border-foreground pl-4 mb-5">
            <p className="font-bold">Objeção é falta de clareza. Clareza se resolve com pergunta.</p>
          </div>

          <PrintSubtitle>Estrutura Fixa de Resposta</PrintSubtitle>
          <div className="flex items-center gap-2 flex-wrap mb-5 text-sm">
            {["1. Resposta curta", "2. Pergunta que destrava", "3. Impacto de não ter", "4. Próximo passo"].map((step, i, arr) => (
              <span key={step} className="flex items-center gap-2">
                <span className="px-3 py-1 border-2 border-foreground rounded font-semibold">{step}</span>
                {i < arr.length - 1 && <span>→</span>}
              </span>
            ))}
          </div>

          <PrintSubtitle>Objeções Gerais</PrintSubtitle>
          <div className="space-y-3 text-sm mb-6">
            {objecoesGerais.map((item, i) => (
              <div key={i} className="border border-border rounded p-3">
                <p className="font-bold mb-2">"{item.objecao}"</p>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-semibold mb-0.5">Resposta</p>
                    <p>{item.resposta}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-semibold mb-0.5">Pergunta que destrava</p>
                    <p>{item.pergunta}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-semibold mb-0.5">Impacto de não ter</p>
                    <p className="italic">{item.impacto}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-semibold mb-0.5">Próximo passo</p>
                    <p>{item.proximoPasso}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <PrintSubtitle>Objeções por Produto</PrintSubtitle>
          {objecoes.map(grupo => (
            <div key={grupo.produto} className="mb-6">
              <h4 className="font-bold text-base border-b border-border pb-1 mb-3">{grupo.produto}</h4>
              <div className="space-y-2 text-sm">
                {grupo.items.map((item, i) => (
                  <div key={i} className="border border-border rounded p-3">
                    <p className="font-bold mb-2">{item.objecao}</p>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase font-semibold mb-0.5">Resposta</p>
                        <p>{item.resposta}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase font-semibold mb-0.5">Pergunta que destrava</p>
                        <p>{item.perguntaDestrava}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase font-semibold mb-0.5">Impacto de não ter</p>
                        <p className="italic">{item.impactoNaoTer}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase font-semibold mb-0.5">Próximo passo</p>
                        <p>{item.proximoPasso}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </PrintSection>

        {/* ── 9. FOLLOW-UP ── */}
        <PrintSection emoji="🔁" title="9. Follow-up">
          <div className="border-l-4 border-foreground pl-4 mb-5">
            <p className="font-bold">"Todo follow-up precisa de valor novo. Se não tem valor novo, não manda."</p>
          </div>

          <PrintSubtitle>Tipos de Valor Novo</PrintSubtitle>
          <PrintList items={["Case de cliente parecido", "Dado de mercado relevante", "Notícia sobre o segmento", "Insight sobre o problema deles", "Resposta a dúvida técnica pendente", "Convite para evento/webinar relevante"]} />

          <PrintSubtitle>Cadência SDR/BDR (5 tentativas)</PrintSubtitle>
          <div className="space-y-1.5 text-sm mb-4">
            {[
              { dia: "D0", canal: "LinkedIn", acao: "Conexão + mensagem personalizada" },
              { dia: "D1", canal: "E-mail", acao: "E-mail de abertura com 2 perguntas" },
              { dia: "D3", canal: "Ligação", acao: "Cold call com script direto" },
              { dia: "D5", canal: "WhatsApp", acao: "Mensagem curta com valor novo" },
              { dia: "D7", canal: "WhatsApp", acao: "Encerramento elegante" }
            ].map(item => (
              <div key={item.dia} className="flex gap-4 p-1.5 border-b border-border">
                <span className="font-bold w-8">{item.dia}</span>
                <span className="font-semibold w-24">{item.canal}</span>
                <span className="text-muted-foreground">{item.acao}</span>
              </div>
            ))}
          </div>

          <PrintSubtitle>Template WhatsApp</PrintSubtitle>
          <PrintTemplate text={`[Nome], passando rapidinho.\n\nVi que [insight/notícia relevante] e lembrei da nossa conversa.\n\nAinda faz sentido falar sobre [problema]? \n\nSe timing mudou, sem problema — só me avisa que eu organizo aqui.`} />

          <PrintSubtitle>Template E-mail</PrintSubtitle>
          <PrintTemplate text={`Assunto: [Valor novo] + próximo passo\n\n[Nome],\n\nEstava pensando na nossa conversa e encontrei [valor novo relevante].\n\n[1-2 frases conectando com a dor deles]\n\nFaz sentido retomarmos? [Próximo passo claro]\n\nAbs,\n[Seu nome]`} />

          <PrintSubtitle>Template Ligação</PrintSubtitle>
          <PrintTemplate text={`"Oi [Nome], aqui é [Seu nome] da Freedom AI.\n\nEstou ligando porque [valor novo / motivo relevante].\n\nLembra que a gente conversou sobre [problema]?\n\nTinha uma atualização que achei que valia compartilhar...\n\n[Valor novo em 30 segundos]\n\nFaz sentido a gente retomar? Qual o melhor próximo passo?"`} />

          <PrintSubtitle>Encerramento Adulto (sem perder respeito)</PrintSubtitle>
          <PrintTemplate text={`[Nome], percebo que o timing não está batendo.\n\nSem problema nenhum — prefiro ser honesto do que ficar insistindo.\n\nVou pausar o contato por agora e voltar em [90 dias / próximo quarter] pra ver se o cenário mudou.\n\nSe antes disso [problema X] virar urgência, é só me chamar.\n\nSucesso e até breve!\n[Seu nome]`} />
        </PrintSection>

        {/* ── 10. MOTIVOS DE PERDA ── */}
        <PrintSection emoji="❌" title="10. Motivos de Perda">
          <div className="border-l-4 border-foreground pl-4 mb-5">
            <p className="font-bold">Sem taxonomia, você repete erro.</p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <PrintSubtitle>Etapas SDR FREEDOM</PrintSubtitle>
              <p className="text-sm text-muted-foreground mb-2">Selecione o motivo ao marcar um negócio como perdido nas etapas de SDR.</p>
              <PrintChecklist items={["Não é prioridade agora", "Empresa já cadastrada", "Nunca Interagiu", "Parou de Interagir", "Dados Incorretos", "Busca ERP", "BPO", "Achou caro"]} />
            </div>
            <div>
              <PrintSubtitle>Etapas SDR NALK</PrintSubtitle>
              <p className="text-sm text-muted-foreground mb-2">Selecione o motivo ao marcar um negócio como perdido nas etapas de SDR NALK.</p>
              <PrintChecklist items={["Não é prioridade agora", "Empresa já cadastrada", "Nunca Interagiu", "Parou de Interagir", "Dados Incorretos", "Não tem empresa", "Volume de leads abaixo de 100/mês", "Não tem CRM", "CRM sem integração"]} />
            </div>
          </div>

          <PrintSubtitle>Template de Registro</PrintSubtitle>
          <PrintTemplate text={`Motivo da Perda: [Não é prioridade agora / Empresa já cadastrada / Nunca Interagiu / Parou de Interagir / Dados Incorretos / Busca ERP / BPO / Achou caro]\n\nNota (opcional): [O que aconteceu + condição de retorno]\n\nExemplo:\n"Lead nunca respondeu após 7 tentativas de contato por diferentes canais. Marcar como Nunca Interagiu."`} />
        </PrintSection>

        {/* ── 11. ONBOARDING 30-60-90 ── */}
        <PrintSection emoji="🚀" title="11. Onboarding 30-60-90">
          <div className="border-l-4 border-foreground pl-4 mb-5">
            <p className="font-bold">Ramp-up não é sorte. É método.</p>
          </div>
          <div className="grid grid-cols-3 gap-5">
            <div>
              <PrintSubtitle>Semana 1 — Imersão</PrintSubtitle>
              <PrintList items={[
                "Conhecer o DNA Freedom (valores, cultura, postura)",
                "Entender os 3 produtos (Vision, Finance Core, Legal Hub)",
                "Dominar a Lei do Comercial (7 perguntas + impacto de não ter)",
                "Configurar CRM e entender regras de governança",
                "Assistir 2 reuniões de Closer como observador",
                "Fazer primeira simulação interna (roleplay)"
              ]} />
            </div>
            <div>
              <PrintSubtitle>30 Dias — Fundamentos</PrintSubtitle>
              <PrintList items={[
                "Conhecer ICP e qualificação (MQL/SQL)",
                "Dominar objeções principais e como destravá-las",
                "Fazer 5 simulações de cold call",
                "Acompanhar 5 reuniões reais (SDR ou Closer)",
                "Fazer primeiro contato real supervisionado",
                "Primeira meta de atividade (ex: 50 tentativas)"
              ]} />
            </div>
            <div>
              <PrintSubtitle>60-90 Dias — Produtividade</PrintSubtitle>
              <PrintList items={[
                "Pipeline próprio ativo",
                "Primeira reunião realizada solo",
                "Primeira proposta enviada",
                "CRM 100% atualizado e conforme regras",
                "Forecast semanal participativo",
                "Atingir 50-70% da meta individual"
              ]} />
            </div>
          </div>

          <PrintSubtitle>Provas e Validações</PrintSubtitle>
          <div className="grid grid-cols-2 gap-3 text-sm">
            {[
              { tipo: "Simulação", desc: "Roleplay de cold call e reunião de diagnóstico" },
              { tipo: "CRM", desc: "Avaliação de higiene e governança do pipeline" },
              { tipo: "Métricas", desc: "Apresentação semanal de números e próximos passos" },
              { tipo: "Case", desc: "Apresentar um deal do início ao fim (ganho ou perdido)" }
            ].map(p => (
              <div key={p.tipo} className="p-2 border border-border rounded">
                <p className="font-bold">{p.tipo}</p>
                <p className="text-muted-foreground">{p.desc}</p>
              </div>
            ))}
          </div>

          <PrintSubtitle>Critérios de Sucesso — 90 dias</PrintSubtitle>
          <PrintList items={["Domínio completo do playbook", "Pipeline ativo e saudável", "CRM impecável (0 cards sem tarefa)", "Capacidade de conduzir reunião sozinho", "Mínimo 50% da meta atingida"]} />
        </PrintSection>

        {/* Rodapé */}
        <div className="mt-16 pt-6 border-t-2 border-foreground text-center text-sm text-muted-foreground print:mt-8">
          <p className="font-semibold">Freedom AI — Playbook Comercial Confidencial</p>
          <p>Uso interno. Não compartilhar externamente.</p>
        </div>
      </div>

      <style>{`
        @media print {
          @page { margin: 1.5cm 2cm; size: A4; }
          body { font-size: 10pt; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .print-section { page-break-inside: avoid; }
        }
      `}</style>
    </div>
  );
};

/* ── Componentes auxiliares ── */
function PrintSection({ emoji, title, children }: { emoji: string; title: string; children: React.ReactNode }) {
  return (
    <div className="print-section mb-10 print:mb-6">
      <div className="flex items-center gap-3 mb-5 pb-2 border-b-2 border-foreground">
        <span className="text-2xl">{emoji}</span>
        <h2 className="text-2xl font-bold text-foreground tracking-tight">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function PrintSubtitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-sm font-bold text-foreground mt-5 mb-2 border-b border-border pb-1 uppercase tracking-wide">{children}</h3>;
}

function PrintList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-sm">
          <span className="flex-shrink-0 mt-0.5">•</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function PrintChecklist({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-sm">
          <span className="w-4 h-4 border border-foreground rounded-sm flex-shrink-0 mt-0.5 inline-block" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function PrintQuotes({ items }: { items: string[] }) {
  return (
    <div className="space-y-1.5 my-2">
      {items.map((item, i) => (
        <div key={i} className="pl-3 border-l-2 border-foreground text-sm italic">
          "{item}"
        </div>
      ))}
    </div>
  );
}

function PrintTemplate({ text }: { text: string }) {
  return (
    <div className="bg-muted/40 border border-border rounded p-3 font-mono text-xs my-2">
      <pre className="whitespace-pre-wrap">{text}</pre>
    </div>
  );
}

export default PrintPage;
