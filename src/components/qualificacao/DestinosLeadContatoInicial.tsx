import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface DestinoCard {
  id: string;
  emoji: string;
  titulo: string;
  subtitulo: string;
  colorClasses: {
    bg: string;
    border: string;
    badge: string;
  };
  quando: string[];
  acaoCRM: string[];
  observacoes: string[];
  extra?: React.ReactNode;
}

const destinos: DestinoCard[] = [
  {
    id: "desqualificado",
    emoji: "❌",
    titulo: "DESQUALIFICADO",
    subtitulo: "Não-fit real confirmado pelo SDR",
    colorClasses: {
      bg: "bg-red-50 dark:bg-red-950/20",
      border: "border-red-200 dark:border-red-800/40",
      badge: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    },
    quando: [
      "O lead mentiu no formulário",
      "O porte ou contexto não têm fit",
      "Não existe aderência mínima com a Freedom",
    ],
    acaoCRM: [
      "Marcar como DESQUALIFICADO",
      "Corrigir os dados no CRM (quando aplicável)",
    ],
    observacoes: [
      "Desqualificado é não-fit real, não é \"perdido por não responder\".",
    ],
  },
  {
    id: "perdido",
    emoji: "🚫",
    titulo: "PERDIDO",
    subtitulo: "Sem contato efetivo ou motivo objetivo registrado",
    colorClasses: {
      bg: "bg-muted/40",
      border: "border-border",
      badge: "bg-muted text-muted-foreground",
    },
    quando: [
      "Foram feitas 7 tentativas de contato sem sucesso, OU",
      "Menos de 7 tentativas, mas com motivo objetivo e relevante (obrigatório registrar)",
    ],
    acaoCRM: [
      "Marcar como PERDIDO",
      "Registrar o motivo obrigatório no campo correspondente",
    ],
    observacoes: [
      "\"Perdido\" não é chute: precisa ter tentativas registradas e/ou motivo objetivo.",
    ],
  },
  {
    id: "mql",
    emoji: "🟡",
    titulo: "MQL (mantido como MQL)",
    subtitulo: "Lead em maturação — ainda não está pronto para avançar",
    colorClasses: {
      bg: "bg-primary-weak/40",
      border: "border-primary/20",
      badge: "bg-primary/10 text-primary",
    },
    quando: [
      "A dor ainda é exploratória",
      "A prioridade é baixa ou futura",
      "O SDR não consegue definir próximo passo claro",
    ],
    acaoCRM: [
      "Manter como MQL (lead em maturação)",
      "Criar tarefa de follow-up com data (proibido ficar sem tarefa)",
    ],
    observacoes: [
      "MQL não é erro.",
      "MQL é lead em maturação.",
    ],
  },
  {
    id: "sql",
    emoji: "✅",
    titulo: "SQL (objetivo principal)",
    subtitulo: "Lead qualificado com dor, prioridade e próximo passo",
    colorClasses: {
      bg: "bg-green-50 dark:bg-green-950/20",
      border: "border-green-200 dark:border-green-800/40",
      badge: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    },
    quando: [
      "Dor real e concreta confirmada",
      "Prioridade atual ou comportamento ativo",
      "Próximo passo claro acordado",
    ],
    acaoCRM: [
      "Classificar no CRM como SQL",
      "Garantir que o próximo passo esteja registrado como tarefa (data + responsável)",
    ],
    observacoes: [],
  },
];

const motivosPerdido = [
  "Não responde / não retorna contato",
  "Número ou e-mail inválido",
  "Não é decisor nem influenciador",
  "Projeto congelado",
  "Empresa fora do ICP",
  "Prioridade inexistente no momento",
];

const exemplosProximoPasso = [
  "Reunião agendada",
  "Diagnóstico técnico",
  "Proposta solicitada",
];

function DestinoAccordion({ card }: { card: DestinoCard }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        "rounded-xl border transition-all",
        card.colorClasses.bg,
        card.colorClasses.border
      )}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 text-left"
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">{card.emoji}</span>
          <div>
            <h4 className="font-bold text-foreground text-sm">{card.titulo}</h4>
            <p className="text-xs text-muted-foreground mt-0.5">{card.subtitulo}</p>
          </div>
        </div>
        {open ? (
          <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        ) : (
          <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        )}
      </button>

      {open && (
        <div className="px-4 pb-4 space-y-4">
          {/* Quando */}
          <div>
            <span className={cn("inline-block px-2 py-0.5 rounded text-xs font-bold mb-2", card.colorClasses.badge)}>
              Quando acontece
            </span>
            <ul className="space-y-1.5">
              {card.quando.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                  <span className="text-muted-foreground mt-0.5">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Motivos de perdido (only for perdido) */}
          {card.id === "perdido" && (
            <div className="p-3 bg-card rounded-lg border border-border">
              <p className="text-xs font-bold text-foreground mb-2 uppercase tracking-wide">
                Motivos objetivos de PERDIDO (obrigatório selecionar 1)
              </p>
              <ul className="space-y-1">
                {motivosPerdido.map((m, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                    <span className="text-muted-foreground mt-0.5">•</span>
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* SQL criteria note */}
          {card.id === "sql" && (
            <div className="p-3 bg-card rounded-lg border border-border">
              <p className="text-xs font-bold text-foreground mb-1">
                O lead se torna SQL quando TODOS os critérios acima estão presentes.
              </p>
            </div>
          )}

          {/* Exemplos próximo passo (SQL) */}
          {card.id === "sql" && (
            <div>
              <span className={cn("inline-block px-2 py-0.5 rounded text-xs font-bold mb-2", card.colorClasses.badge)}>
                Exemplos de próximo passo claro
              </span>
              <ul className="space-y-1">
                {exemplosProximoPasso.map((e, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                    <span className="text-muted-foreground mt-0.5">•</span>
                    {e}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Ação no CRM */}
          <div>
            <span className={cn("inline-block px-2 py-0.5 rounded text-xs font-bold mb-2", card.colorClasses.badge)}>
              Ação no CRM
            </span>
            <ul className="space-y-1.5">
              {card.acaoCRM.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                  <span className="text-muted-foreground mt-0.5">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Observações */}
          {card.observacoes.length > 0 && (
            <div className="p-3 bg-card rounded-lg border border-border">
              <p className="text-xs font-bold text-foreground mb-2 uppercase tracking-wide">
                Observações importantes
              </p>
              {card.observacoes.map((obs, i) => (
                <p key={i} className="text-sm text-foreground font-medium italic">
                  {obs}
                </p>
              ))}
            </div>
          )}

          {/* Highlight for MQL */}
          {card.id === "mql" && (
            <p className="text-xs text-muted-foreground italic">
              Mesmo com Lead Score ≥ 40, o lead permanece MQL quando os critérios acima se aplicam.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export function DestinosLeadContatoInicial() {
  return (
    <div className="space-y-4">
      <div className="mb-2">
        <p className="text-sm text-muted-foreground leading-relaxed">
          Depois das tentativas de contato e da conversa, o lead sempre cai em um destes 4 caminhos.
        </p>
      </div>

      <div className="grid gap-3">
        {destinos.map((card) => (
          <DestinoAccordion key={card.id} card={card} />
        ))}
      </div>

      {/* Regras adicionais */}
      <div className="p-4 bg-card border border-border rounded-xl mt-4">
        <h4 className="font-semibold text-foreground text-sm mb-3">Missão do SDR em Contato Inicial</h4>
        <ul className="space-y-2 text-sm text-foreground">
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5">1.</span>
            Converter o máximo possível para <strong>SQL</strong>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5">2.</span>
            Manter como <strong>MQL</strong> quando ainda não há maturidade
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5">3.</span>
            Encerrar corretamente como <strong>Perdido</strong> ou <strong>Desqualificado</strong> quando aplicável
          </li>
        </ul>
        <p className="text-xs text-muted-foreground mt-3 italic">
          Lead Score ≥ 40 = indício de MQL, mas a classificação final depende da conversa.
        </p>
      </div>
    </div>
  );
}
