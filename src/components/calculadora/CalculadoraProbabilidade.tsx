import { useState, useMemo } from "react";
import { Calculator, Copy, Check, ChevronDown, ChevronRight, Calendar, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

type Etapa = "realizada" | "proposta" | "contrato" | "ganho";

interface EvidenceState {
  decisorParticipou: boolean;
  championConfirmado: boolean;
  criteriosDecisao: boolean;
  processoCompra: boolean;
  proximoPasso: boolean;
  coDecisorExiste: boolean;
  coDecisorNome: string;
  coDecisorDataMarcada: boolean;
  bloqueadorNaoEnvolvido: boolean;
  concorrenciaSemCriterio: boolean;
  clienteFavorita: boolean;
  budgetAprovado: boolean;
  procurementEmAndamento: boolean;
  budgetCongelado: boolean;
  dataAssinatura: Date | undefined;
}

const ETAPA_CONFIG = {
  realizada: { label: "Reunião Realizada", base: 10, piso: 5, teto: 25 },
  proposta: { label: "Negociação/Proposta", base: 40, piso: 30, teto: 60 },
  contrato: { label: "Contrato", base: 80, piso: 70, teto: 90 },
  ganho: { label: "Ganho", base: 100, piso: 100, teto: 100 },
};


const initialEvidence: EvidenceState = {
  decisorParticipou: false,
  championConfirmado: false,
  criteriosDecisao: false,
  processoCompra: false,
  proximoPasso: false,
  coDecisorExiste: false,
  coDecisorNome: "",
  coDecisorDataMarcada: false,
  bloqueadorNaoEnvolvido: false,
  concorrenciaSemCriterio: false,
  clienteFavorita: false,
  budgetAprovado: false,
  procurementEmAndamento: false,
  budgetCongelado: false,
  dataAssinatura: undefined,
};

export function CalculadoraProbabilidade() {
  const [isOpen, setIsOpen] = useState(true);
  const [etapa, setEtapa] = useState<Etapa | "">("");
  const [evidence, setEvidence] = useState<EvidenceState>(initialEvidence);
  const [copied, setCopied] = useState(false);

  const updateEvidence = <K extends keyof EvidenceState>(key: K, value: EvidenceState[K]) => {
    setEvidence(prev => ({ ...prev, [key]: value }));
  };

  const calculation = useMemo(() => {
    if (!etapa || etapa === "ganho") {
      return {
        probabilidade: etapa === "ganho" ? 100 : 0,
        base: etapa === "ganho" ? 100 : 0,
        ajustes: [] as { label: string; value: number }[],
        piso: etapa === "ganho" ? 100 : 0,
        teto: etapa === "ganho" ? 100 : 0,
        clampAplicado: false,
        regrasAplicadas: [] as string[],
        missing: [] as string[],
      };
    }

    const config = ETAPA_CONFIG[etapa];
    let prob = config.base;
    const ajustes: { label: string; value: number }[] = [];
    const regrasAplicadas: string[] = [];
    const missing: string[] = [];

    // Ajustes positivos
    if (evidence.decisorParticipou) {
      ajustes.push({ label: "Decisor participou", value: 10 });
      prob += 10;
    } else {
      missing.push("Marcar 15 min com decisor na próxima reunião");
    }

    if (evidence.proximoPasso) {
      ajustes.push({ label: "Próximo passo agendado", value: 10 });
      prob += 10;
    } else {
      missing.push("Agendar reunião com data + participantes definidos");
    }

    if (evidence.criteriosDecisao) {
      ajustes.push({ label: "Critérios de decisão mapeados", value: 5 });
      prob += 5;
    } else {
      missing.push("Mapear critérios de decisão do cliente");
    }

    if (evidence.processoCompra) {
      ajustes.push({ label: "Processo de compra mapeado", value: 5 });
      prob += 5;
    } else {
      missing.push("Mapear passos do processo de compra + jurídico");
    }

    if (evidence.championConfirmado) {
      ajustes.push({ label: "Champion confirmado", value: 5 });
      prob += 5;
    } else {
      missing.push("Identificar e confirmar champion interno");
    }

    if (evidence.budgetAprovado) {
      ajustes.push({ label: "Budget aprovado", value: 5 });
      prob += 5;
    }

    if (evidence.procurementEmAndamento) {
      ajustes.push({ label: "Procurement/jurídico em andamento", value: 10 });
      prob += 10;
    }

    // Ajustes negativos
    const coDecisorIncompleto = evidence.coDecisorExiste && 
      (!evidence.coDecisorNome.trim() || !evidence.coDecisorDataMarcada);
    
    if (coDecisorIncompleto) {
      ajustes.push({ label: "Co-decisor sem nome ou data", value: -15 });
      prob -= 15;
      missing.push("Marcar call com co-decisor e registrar nome");
    }

    if (evidence.bloqueadorNaoEnvolvido) {
      ajustes.push({ label: "Bloqueador não envolvido", value: -10 });
      prob -= 10;
      missing.push("Envolver área técnica/compliance no processo");
    }

    if (evidence.concorrenciaSemCriterio) {
      ajustes.push({ label: "Concorrência sem critério definido", value: -10 });
      prob -= 10;
      missing.push("Definir critérios de decisão antes da avaliação final");
    }

    if (evidence.clienteFavorita) {
      ajustes.push({ label: "Cliente já tem favorita", value: -15 });
      prob -= 15;
    }

    if (evidence.budgetCongelado) {
      ajustes.push({ label: "Budget congelado/sem verba", value: -25 });
      prob -= 25;
      regrasAplicadas.push("Budget congelado: probabilidade travada no piso");
    }

    // Aplicar clamp inicial
    let tetoFinal = config.teto;
    let pisoFinal = config.piso;

    // Regra 1: Sem próximo passo agendado
    if (!evidence.proximoPasso) {
      const tetosSemPasso = { realizada: 15, proposta: 45, contrato: 80 };
      if (etapa in tetosSemPasso) {
        tetoFinal = Math.min(tetoFinal, tetosSemPasso[etapa as keyof typeof tetosSemPasso]);
        regrasAplicadas.push("Sem próximo passo: teto reduzido");
      }
    }

    // Regra 2: Co-decisor sem nome e sem data
    if (coDecisorIncompleto) {
      const tetosCoDecisor = { realizada: 10, proposta: 40, contrato: 70 };
      if (etapa in tetosCoDecisor) {
        tetoFinal = Math.min(tetoFinal, tetosCoDecisor[etapa as keyof typeof tetosCoDecisor]);
        regrasAplicadas.push("Co-decisor incompleto: teto travado");
      }
    }

    // Regra 3: >85% só com data de assinatura
    if (etapa === "contrato" && prob > 85 && !evidence.dataAssinatura) {
      tetoFinal = Math.min(tetoFinal, 85);
      regrasAplicadas.push(">85% requer data de assinatura/PO");
      missing.push("Confirmar data de assinatura/PO para ultrapassar 85%");
    }

    // Regra 4: Budget congelado
    if (evidence.budgetCongelado) {
      prob = pisoFinal;
      missing.push("Mover negócio para nurturing/pausa (fora do forecast)");
    }

    // Aplicar clamp final
    const probAntes = prob;
    prob = Math.max(pisoFinal, Math.min(tetoFinal, prob));
    const clampAplicado = prob !== probAntes;

    return {
      probabilidade: prob,
      base: config.base,
      ajustes,
      piso: pisoFinal,
      teto: tetoFinal,
      clampAplicado,
      regrasAplicadas,
      missing: missing.filter((_, i, arr) => arr.indexOf(_) === i), // Remove duplicates
    };
  }, [etapa, evidence]);

  const handleCopy = async () => {
    if (!etapa) return;
    
    const texto = `Probabilidade sugerida: ${calculation.probabilidade}%
Evidências: decisor(${evidence.decisorParticipou ? "S" : "N"}), próximo passo(${evidence.proximoPasso ? "S" : "N"}), champion(${evidence.championConfirmado ? "S" : "N"}), co-decisor(${evidence.coDecisorExiste ? evidence.coDecisorNome || "sem nome" : "N"}/${evidence.coDecisorDataMarcada ? "S" : "N"}), jurídico(${evidence.procurementEmAndamento ? "S" : "N"})`;
    
    await navigator.clipboard.writeText(texto);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setEtapa("");
    setEvidence(initialEvidence);
  };

  return (
    <div className="rounded-2xl border border-primary/20 overflow-hidden" style={{ backgroundColor: "#FFF9E6" }}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-primary/5 transition-colors">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/20">
              <Calculator className="w-5 h-5 text-foreground" />
            </div>
            <div className="text-left">
              <h3 className="text-lg font-semibold text-foreground">🧮 Calculadora de Probabilidade</h3>
              <p className="text-sm text-muted-foreground">Baseada em evidências • Responda em 30-60s</p>
            </div>
          </div>
          {isOpen ? (
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          ) : (
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          )}
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="p-4 pt-0 space-y-6">
            {/* Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Inputs */}
              <div className="lg:col-span-2 space-y-4">
                {/* Seleção de Etapa */}
                <div className="bg-white rounded-xl border border-border p-4">
                  <Label className="text-sm font-semibold text-foreground mb-3 block">
                    Etapa do Funil *
                  </Label>
                  <RadioGroup
                    value={etapa}
                    onValueChange={(v) => setEtapa(v as Etapa)}
                    className="grid grid-cols-2 gap-3"
                  >
                    {(Object.entries(ETAPA_CONFIG) as [Etapa, typeof ETAPA_CONFIG.realizada][]).map(([key, cfg]) => (
                      <div key={key} className="flex items-center space-x-2">
                        <RadioGroupItem value={key} id={key} />
                        <Label htmlFor={key} className="cursor-pointer text-sm">
                          {cfg.label}
                          <span className="text-muted-foreground ml-1">({cfg.piso}–{cfg.teto}%)</span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {etapa && etapa !== "ganho" && (
                  <>
                    {/* Evidências Positivas */}
                    <div className="bg-white rounded-xl border border-border p-4 space-y-3">
                      <Label className="text-sm font-semibold text-foreground block">
                        Evidências Positivas
                      </Label>
                      
                      <EvidenceRow
                        label="Decisor participou da última reunião?"
                        checked={evidence.decisorParticipou}
                        onChange={(v) => updateEvidence("decisorParticipou", v)}
                        points="+10"
                      />
                      
                      <EvidenceRow
                        label="Champion confirmado?"
                        checked={evidence.championConfirmado}
                        onChange={(v) => updateEvidence("championConfirmado", v)}
                        points="+5"
                      />
                      
                      <EvidenceRow
                        label="Critérios de decisão mapeados?"
                        checked={evidence.criteriosDecisao}
                        onChange={(v) => updateEvidence("criteriosDecisao", v)}
                        points="+5"
                      />
                      
                      <EvidenceRow
                        label="Processo de compra mapeado?"
                        checked={evidence.processoCompra}
                        onChange={(v) => updateEvidence("processoCompra", v)}
                        points="+5"
                      />
                      
                      <EvidenceRow
                        label="Próximo passo AGENDADO (data + participantes)?"
                        checked={evidence.proximoPasso}
                        onChange={(v) => updateEvidence("proximoPasso", v)}
                        points="+10"
                        highlight
                      />
                      
                      <EvidenceRow
                        label="Budget aprovado (dito pelo decisor)?"
                        checked={evidence.budgetAprovado}
                        onChange={(v) => updateEvidence("budgetAprovado", v)}
                        points="+5"
                      />
                      
                      <EvidenceRow
                        label="Procurement/Jurídico em andamento com data?"
                        checked={evidence.procurementEmAndamento}
                        onChange={(v) => updateEvidence("procurementEmAndamento", v)}
                        points="+10"
                      />
                    </div>

                    {/* Co-Decisor */}
                    <div className="bg-white rounded-xl border border-border p-4 space-y-3">
                      <EvidenceRow
                        label="Co-decisor existe?"
                        checked={evidence.coDecisorExiste}
                        onChange={(v) => updateEvidence("coDecisorExiste", v)}
                      />
                      
                      {evidence.coDecisorExiste && (
                        <div className="ml-6 pl-4 border-l-2 border-primary/30 space-y-3">
                          <div>
                            <Label className="text-sm text-muted-foreground mb-1 block">
                              Nome do co-decisor *
                            </Label>
                            <Input
                              value={evidence.coDecisorNome}
                              onChange={(e) => updateEvidence("coDecisorNome", e.target.value)}
                              placeholder="Nome completo"
                              className="max-w-xs"
                            />
                          </div>
                          <EvidenceRow
                            label="Data da conversa marcada?"
                            checked={evidence.coDecisorDataMarcada}
                            onChange={(v) => updateEvidence("coDecisorDataMarcada", v)}
                          />
                          {(!evidence.coDecisorNome.trim() || !evidence.coDecisorDataMarcada) && (
                            <p className="text-xs text-destructive flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3" />
                              Co-decisor incompleto: -15 pontos e teto travado
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Evidências Negativas */}
                    <div className="bg-white rounded-xl border border-border p-4 space-y-3">
                      <Label className="text-sm font-semibold text-foreground block">
                        Riscos / Alertas
                      </Label>
                      
                      <EvidenceRow
                        label="Bloqueador técnico/compliance ainda NÃO envolvido?"
                        checked={evidence.bloqueadorNaoEnvolvido}
                        onChange={(v) => updateEvidence("bloqueadorNaoEnvolvido", v)}
                        points="-10"
                        negative
                      />
                      
                      <EvidenceRow
                        label="Concorrência ativa sem critério definido?"
                        checked={evidence.concorrenciaSemCriterio}
                        onChange={(v) => updateEvidence("concorrenciaSemCriterio", v)}
                        points="-10"
                        negative
                      />
                      
                      <EvidenceRow
                        label="Cliente já tem favorita (concorrente)?"
                        checked={evidence.clienteFavorita}
                        onChange={(v) => updateEvidence("clienteFavorita", v)}
                        points="-15"
                        negative
                      />
                      
                      <EvidenceRow
                        label="Budget congelado/sem verba?"
                        checked={evidence.budgetCongelado}
                        onChange={(v) => updateEvidence("budgetCongelado", v)}
                        points="-25"
                        negative
                        highlight
                      />
                    </div>

                    {/* Data de Assinatura (só para Contrato >85%) */}
                    {etapa === "contrato" && calculation.probabilidade >= 85 && (
                      <div className="bg-white rounded-xl border border-primary/30 p-4 space-y-3">
                        <Label className="text-sm font-semibold text-foreground block">
                          ⚠️ Para ultrapassar 85%, informe:
                        </Label>
                        <div>
                          <Label className="text-sm text-muted-foreground mb-1 block">
                            Data de assinatura/PO confirmada
                          </Label>
                          <DatePickerField
                            date={evidence.dataAssinatura}
                            onSelect={(d) => updateEvidence("dataAssinatura", d)}
                            placeholder="Selecione a data"
                          />
                        </div>
                      </div>
                    )}

                  </>
                )}
              </div>

              {/* Right Column - Results */}
              <div className="space-y-4">
                {/* Resultado Principal */}
                <div className="bg-white rounded-xl border-2 border-primary p-4 space-y-4 sticky top-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-2">Probabilidade Sugerida</p>
                    <Badge 
                      className={cn(
                        "text-3xl font-bold px-6 py-2",
                        etapa ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      )}
                    >
                      {etapa ? `${calculation.probabilidade}%` : "—"}
                    </Badge>
                  </div>

                  {etapa && etapa !== "ganho" && (
                    <>
                      {/* Breakdown */}
                      <div className="space-y-2 text-sm border-t pt-4">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Base da etapa:</span>
                          <span className="font-medium">{calculation.base}%</span>
                        </div>
                        
                        {calculation.ajustes.length > 0 && (
                          <div className="space-y-1">
                            {calculation.ajustes.map((aj, i) => (
                              <div key={i} className="flex justify-between text-xs">
                                <span className="text-muted-foreground">{aj.label}:</span>
                                <span className={cn(
                                  "font-medium",
                                  aj.value > 0 ? "text-green-600" : "text-destructive"
                                )}>
                                  {aj.value > 0 ? "+" : ""}{aj.value}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        <div className="flex justify-between border-t pt-2">
                          <span className="text-muted-foreground">Piso/Teto:</span>
                          <span className="font-medium">{calculation.piso}–{calculation.teto}%</span>
                        </div>
                        
                        {calculation.clampAplicado && (
                          <p className="text-xs text-amber-600">
                            ⚠️ Clamp aplicado (valor ajustado aos limites)
                          </p>
                        )}
                      </div>

                      {/* Regras Aplicadas */}
                      {calculation.regrasAplicadas.length > 0 && (
                        <div className="border-t pt-3">
                          <p className="text-xs font-semibold text-foreground mb-2">Regras aplicadas:</p>
                          <div className="space-y-1">
                            {calculation.regrasAplicadas.map((regra, i) => (
                              <p key={i} className="text-xs text-amber-600 flex items-start gap-1">
                                <AlertTriangle className="w-3 h-3 mt-0.5 shrink-0" />
                                {regra}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}


                      {/* Botões */}
                      <div className="flex gap-2 pt-2">
                        <Button
                          onClick={handleCopy}
                          className="flex-1 bg-primary hover:bg-primary-hover text-primary-foreground"
                        >
                          {copied ? (
                            <>
                              <Check className="w-4 h-4 mr-2" />
                              Copiado!
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4 mr-2" />
                              Copiar para CRM
                            </>
                          )}
                        </Button>
                      </div>
                      
                      <Button
                        variant="outline"
                        onClick={handleReset}
                        className="w-full"
                      >
                        Limpar calculadora
                      </Button>
                    </>
                  )}
                </div>

                {/* Missing Items */}
                {etapa && etapa !== "ganho" && calculation.missing.length > 0 && (
                  <div className="bg-white rounded-xl border border-border p-4">
                    <p className="text-sm font-semibold text-foreground mb-3">
                      📈 Para subir de patamar, falta:
                    </p>
                    <ul className="space-y-2">
                      {calculation.missing.map((item, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-primary">→</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}

// Componente auxiliar para linha de evidência
interface EvidenceRowProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  points?: string;
  negative?: boolean;
  highlight?: boolean;
}

function EvidenceRow({ label, checked, onChange, points, negative, highlight }: EvidenceRowProps) {
  return (
    <div className={cn(
      "flex items-center justify-between p-2 rounded-lg transition-colors",
      highlight && "bg-primary/5",
      checked && !negative && "bg-success-weak",
      checked && negative && "bg-destructive/10"
    )}>
      <div className="flex items-center gap-3">
        <Checkbox
          checked={checked}
          onCheckedChange={(v) => onChange(v === true)}
        />
        <span className="text-sm text-foreground">{label}</span>
      </div>
      {points && (
        <Badge variant="outline" className={cn(
          "text-xs",
          negative ? "border-destructive text-destructive" : "border-success text-success"
        )}>
          {points}
        </Badge>
      )}
    </div>
  );
}

// DatePicker auxiliar
interface DatePickerFieldProps {
  date: Date | undefined;
  onSelect: (date: Date | undefined) => void;
  placeholder: string;
}

function DatePickerField({ date, onSelect, placeholder }: DatePickerFieldProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <Calendar className="mr-2 h-4 w-4" />
          {date ? format(date, "dd/MM/yyyy", { locale: ptBR }) : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-white" align="start">
        <CalendarComponent
          mode="single"
          selected={date}
          onSelect={onSelect}
          initialFocus
          className="pointer-events-auto"
          locale={ptBR}
        />
      </PopoverContent>
    </Popover>
  );
}
