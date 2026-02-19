import { useRef } from "react";
import { Printer, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PrintPage = () => {
  const navigate = useNavigate();
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Barra de controle — só aparece na tela, some na impressão */}
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
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <Printer className="w-4 h-4" />
            Imprimir / Salvar PDF
          </button>
        </div>
      </div>

      {/* Conteúdo para impressão */}
      <div ref={printRef} className="max-w-4xl mx-auto px-8 py-10 print:px-6 print:py-4">

        {/* Capa */}
        <div className="print-page-break text-center py-16 print:py-8 border-b-4 border-foreground mb-10">
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

        {/* 1. DNA Freedom */}
        <PrintSection emoji="🧬" title="1. DNA Freedom">
          <PrintSubtitle>Quem somos</PrintSubtitle>
          <p className="mb-4">A Freedom coloca <strong>agentes de IA que executam processos reais</strong> e geram resultado mensurável.</p>

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

        {/* 2. Lei do Comercial */}
        <PrintSection emoji="⚖️" title="2. Lei do Comercial">
          <p className="text-lg font-bold mb-6">Vendas é sobre PERGUNTAR e sobre o IMPACTO DE NÃO TER.</p>

          <PrintSubtitle>As 7 Perguntas que Vendem</PrintSubtitle>
          <div className="space-y-2 mb-6">
            {[
              { num: 1, q: "Onde dói?", desc: "Identificar a dor real" },
              { num: 2, q: "Qual volume?", desc: "Dimensionar oportunidade" },
              { num: 3, q: "Quanto custa hoje?", desc: "Quantificar impacto" },
              { num: 4, q: "O que acontece se nada mudar?", desc: "Criar urgência" },
              { num: 5, q: "Onde estão os dados?", desc: "Validar viabilidade" },
              { num: 6, q: "Quem é sponsor?", desc: "Mapear decisor" },
              { num: 7, q: "Próximo passo com data e dono?", desc: "Travar ação" }
            ].map(item => (
              <div key={item.num} className="flex items-start gap-3 py-2 border-b border-border">
                <span className="font-bold text-foreground w-5 flex-shrink-0">{item.num}.</span>
                <span className="font-semibold text-foreground">{item.q}</span>
                <span className="text-muted-foreground ml-auto text-sm">{item.desc}</span>
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
          <div className="flex items-center gap-3 flex-wrap mt-2">
            {["Diagnóstico", "Impacto de não ter", "Viabilidade", "Próximo passo"].map((step, i, arr) => (
              <span key={step} className="flex items-center gap-3">
                <span className="px-3 py-1 border-2 border-foreground rounded font-semibold text-sm">{step}</span>
                {i < arr.length - 1 && <span className="font-bold">→</span>}
              </span>
            ))}
          </div>

          <PrintSubtitle>Padrão Freedom de Postura</PrintSubtitle>
          <div className="flex gap-4 flex-wrap mt-2">
            {["Direto", "Consultivo", "Adulto", "Sem hype"].map(p => (
              <span key={p} className="px-4 py-2 border border-foreground rounded font-semibold">{p}</span>
            ))}
          </div>
        </PrintSection>

        {/* 3. ICP & Qualificação */}
        <PrintSection emoji="🎯" title="3. ICP & Qualificação">
          <PrintSubtitle>Perfil de Cliente Ideal (ICP)</PrintSubtitle>
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <p className="font-semibold mb-2">✅ Fit Forte</p>
              <PrintList items={[
                "Processo repetitivo + volume",
                "Dados existem (ainda que bagunçados)",
                "Dor que gera custo ou risco mensurável",
                "Sponsor com budget ou vontade de buscar",
                "Operação que escala com a solução"
              ]} />
            </div>
            <div>
              <p className="font-semibold mb-2">❌ Red Flags</p>
              <PrintList items={[
                "Quer projeto pontual, sem processo",
                "Não tem dados estruturados",
                "Dor vaga (\"quero modernizar\")",
                "Sem sponsor claro",
                "Espera resultado em 2 semanas"
              ]} />
            </div>
          </div>

          <PrintSubtitle>MQL → SQL: Critérios</PrintSubtitle>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="font-semibold mb-2">MQL (Marketing Qualified Lead)</p>
              <PrintList items={["Perfil de empresa ICP", "Engajamento com conteúdo", "Cargo relevante (C-level, gestão)"]} />
            </div>
            <div>
              <p className="font-semibold mb-2">SQL (Sales Qualified Lead)</p>
              <PrintList items={["Dor confirmada", "Budget em discussão", "Sponsor identificado", "Timeline definido"]} />
            </div>
          </div>
        </PrintSection>

        {/* 4. CRM & Governança */}
        <PrintSection emoji="🗂️" title="4. CRM & Governança">
          <PrintSubtitle>Regras do Pipeline</PrintSubtitle>
          <PrintList items={[
            "Todo card deve ter tarefa com data e dono",
            "Nenhum card fica mais de 7 dias sem atividade",
            "Valor, probabilidade e data de fechamento sempre atualizados",
            "CRM é fonte de verdade — sem maquiagem",
            "Notas de reunião registradas em até 24h"
          ]} />

          <PrintSubtitle>Campos Obrigatórios por Card</PrintSubtitle>
          <PrintList items={["Nome da empresa + setor", "Cargo e nome do sponsor", "Dor principal identificada", "Valor estimado do negócio", "Data prevista de fechamento", "Próxima atividade + data + responsável"]} />
        </PrintSection>

        {/* 5. Checklists */}
        <PrintSection emoji="✅" title="5. Checklists">
          <div className="grid grid-cols-2 gap-8">
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
          </div>

          <div className="grid grid-cols-2 gap-8 mt-6">
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
                "Documentação técnica entregue",
                "Expectativas de prazo alinhadas",
                "Critérios de sucesso definidos",
                "Closer apresentou time de implantação ao cliente"
              ]} />
            </div>
          </div>

          <PrintSubtitle>Roteiro Durante a Reunião</PrintSubtitle>
          <div className="space-y-3">
            {[
              { step: "1. DIAGNÓSTICO (10-15 min)", items: ["\"O que te fez aceitar essa conversa?\"", "\"Me conta o processo do início ao fim\"", "\"Onde trava? Onde dá mais retrabalho?\""] },
              { step: "2. IMPACTO DE NÃO TER (5-10 min)", items: ["\"Quanto custa isso por mês?\"", "\"O que acontece se nada mudar em 90 dias?\"", "\"Se isso estourar, estoura onde?\""] },
              { step: "3. VIABILIDADE (5-10 min)", items: ["\"Os dados existem? Onde estão?\"", "\"Quem é o sponsor? Quem pode vetar?\"", "\"Qual o timeline ideal?\""] },
              { step: "4. PRÓXIMO PASSO (5 min)", items: ["\"Qual o próximo passo?\"", "\"Quando fazemos isso?\"", "\"Quem é o dono de cada ação?\""] }
            ].map(block => (
              <div key={block.step}>
                <p className="font-semibold text-sm">{block.step}</p>
                <ul className="ml-4">
                  {block.items.map((item, i) => <li key={i} className="text-sm text-muted-foreground">• {item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </PrintSection>

        {/* 6. Follow-up */}
        <PrintSection emoji="🔁" title="6. Follow-up">
          <div className="border-l-4 border-foreground pl-4 mb-6">
            <p className="text-lg font-bold">"Todo follow-up precisa de valor novo. Se não tem valor novo, não manda."</p>
          </div>

          <PrintSubtitle>Tipos de Valor Novo</PrintSubtitle>
          <PrintList items={[
            "Case de cliente parecido",
            "Dado de mercado relevante",
            "Notícia sobre o segmento",
            "Insight sobre o problema deles",
            "Resposta a dúvida técnica pendente",
            "Convite para evento/webinar relevante"
          ]} />

          <PrintSubtitle>Cadência SDR/BDR (5 tentativas)</PrintSubtitle>
          <div className="space-y-2 mb-6">
            {[
              { dia: "D0", canal: "LinkedIn", acao: "Conexão + mensagem personalizada" },
              { dia: "D1", canal: "E-mail", acao: "E-mail de abertura com 2 perguntas" },
              { dia: "D3", canal: "Ligação", acao: "Cold call com script direto" },
              { dia: "D5", canal: "WhatsApp", acao: "Mensagem curta com valor novo" },
              { dia: "D7", canal: "WhatsApp", acao: "Encerramento elegante" }
            ].map(item => (
              <div key={item.dia} className="flex items-center gap-4 py-2 border-b border-border text-sm">
                <span className="font-bold w-8">{item.dia}</span>
                <span className="font-semibold w-24">{item.canal}</span>
                <span className="text-muted-foreground">{item.acao}</span>
              </div>
            ))}
          </div>

          <PrintSubtitle>Template WhatsApp</PrintSubtitle>
          <PrintTemplate text={`[Nome], passando rapidinho.

Vi que [insight/notícia relevante] e lembrei da nossa conversa.

Ainda faz sentido falar sobre [problema]? 

Se timing mudou, sem problema — só me avisa que eu organizo aqui.`} />

          <PrintSubtitle>Encerramento Adulto</PrintSubtitle>
          <PrintTemplate text={`[Nome], percebo que o timing não está batendo.

Sem problema nenhum — prefiro ser honesto do que ficar insistindo.

Vou pausar o contato por agora e voltar em [90 dias / próximo quarter] pra ver se o cenário mudou.

Se antes disso [problema X] virar urgência, é só me chamar.`} />
        </PrintSection>

        {/* 7. Motivos de Perda */}
        <PrintSection emoji="❌" title="7. Motivos de Perda">
          <p className="font-bold text-lg mb-4">Sem taxonomia, você repete erro.</p>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <PrintSubtitle>Etapas SDR FREEDOM</PrintSubtitle>
              <PrintList items={["Não é prioridade agora", "Empresa já cadastrada", "Nunca Interagiu", "Parou de Interagir", "Dados Incorretos", "Busca ERP", "BPO", "Achou caro"]} />
            </div>
            <div>
              <PrintSubtitle>Etapas SDR NALK</PrintSubtitle>
              <PrintList items={["Não é prioridade agora", "Empresa já cadastrada", "Nunca Interagiu", "Parou de Interagir", "Dados Incorretos", "Não tem empresa", "Volume de leads abaixo de 100/mês", "Não tem CRM", "CRM sem integração"]} />
            </div>
          </div>
        </PrintSection>

        {/* 8. Onboarding */}
        <PrintSection emoji="🚀" title="8. Onboarding 30-60-90">
          <p className="font-bold text-lg mb-4">Ramp-up não é sorte. É método.</p>
          <div className="grid grid-cols-3 gap-6">
            <div>
              <PrintSubtitle>Semana 1 — Imersão</PrintSubtitle>
              <PrintList items={[
                "Conhecer o DNA Freedom",
                "Entender os 3 produtos",
                "Dominar a Lei do Comercial",
                "Configurar CRM",
                "Assistir 2 reuniões de Closer",
                "Primeira simulação interna"
              ]} />
            </div>
            <div>
              <PrintSubtitle>30 Dias — Fundamentos</PrintSubtitle>
              <PrintList items={[
                "Conhecer ICP e qualificação",
                "Dominar objeções principais",
                "Fazer 5 simulações de cold call",
                "Acompanhar 5 reuniões reais",
                "Primeiro contato real supervisionado",
                "Primeira meta de atividade"
              ]} />
            </div>
            <div>
              <PrintSubtitle>60-90 Dias — Produtividade</PrintSubtitle>
              <PrintList items={[
                "Pipeline próprio ativo",
                "Primeira reunião realizada solo",
                "Primeira proposta enviada",
                "CRM 100% atualizado",
                "Forecast semanal participativo",
                "Atingir 50-70% da meta"
              ]} />
            </div>
          </div>

          <PrintSubtitle>Critérios de Sucesso — 90 dias</PrintSubtitle>
          <PrintList items={[
            "Domínio completo do playbook",
            "Pipeline ativo e saudável",
            "CRM impecável (0 cards sem tarefa)",
            "Capacidade de conduzir reunião sozinho",
            "Mínimo 50% da meta atingida"
          ]} />
        </PrintSection>

        {/* Rodapé */}
        <div className="mt-16 pt-6 border-t-2 border-foreground text-center text-sm text-muted-foreground print:mt-8">
          <p className="font-semibold">Freedom AI — Playbook Comercial Confidencial</p>
          <p>Uso interno. Não compartilhar externamente.</p>
        </div>
      </div>

      {/* Estilos de impressão */}
      <style>{`
        @media print {
          @page {
            margin: 1.5cm 2cm;
            size: A4;
          }
          body {
            font-size: 11pt;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .print-section {
            page-break-inside: avoid;
          }
          .print-page-break {
            page-break-after: always;
          }
        }
      `}</style>
    </div>
  );
};

/* ── Componentes auxiliares de impressão ── */

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
  return <h3 className="text-base font-bold text-foreground mt-5 mb-2 border-b border-border pb-1">{children}</h3>;
}

function PrintList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-sm">
          <span className="text-foreground mt-0.5 flex-shrink-0">•</span>
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
    <div className="space-y-2 my-3">
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
    <div className="bg-muted/40 border border-border rounded p-3 font-mono text-xs my-3">
      <pre className="whitespace-pre-wrap">{text}</pre>
    </div>
  );
}

export default PrintPage;
