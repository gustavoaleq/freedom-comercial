import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, AlertTriangle, CheckCircle2, XCircle, Clock, Zap } from "lucide-react";

type Destino = "SQL" | "MQL" | "DESQUALIFICADO" | "PERDIDO" | "SQL_TYPEBOT" | null;

interface ResultadoInfo {
  destino: string;
  icon: React.ReactNode;
  cor: string;
  bullets: string[];
  acao: string;
  extra?: string;
}

const motivosObjetivos = [
  "Não responde / não retorna contato",
  "Número ou e-mail inválido",
  "Não é decisor nem influenciador",
  "Projeto congelado",
  "Empresa fora do ICP",
  "Prioridade inexistente no momento",
];

export function CalculadoraQualificacaoInbound() {
  // A) Resultado de contato
  const [conseguiuFalar, setConseguiuFalar] = useState<string>("");
  const [tentativas, setTentativas] = useState<number>(0);
  const [temMotivoObjetivo, setTemMotivoObjetivo] = useState<string>("");
  const [motivo, setMotivo] = useState<string>("");

  // B) Validação de fit
  const [mentiu, setMentiu] = useState<string>("");
  const [porteFit, setPorteFit] = useState<string>("");
  const [aderencia, setAderencia] = useState<string>("");

  // C) Critérios de prontidão
  const [dorReal, setDorReal] = useState<string>("");
  const [prioridade, setPrioridade] = useState<string>("");
  const [proximoPasso, setProximoPasso] = useState<string>("");
  const [qualProximoPasso, setQualProximoPasso] = useState<string>("");

  // D) Contexto MQL
  const [dorExploratoria, setDorExploratoria] = useState<string>("");
  const [prioridadeBaixa, setPrioridadeBaixa] = useState<string>("");
  const [semProximoPasso, setSemProximoPasso] = useState<string>("");

  // E) Exceção Typebot
  const [canalTypebot, setCanalTypebot] = useState<string>("");
  const [leadScoreTypebot, setLeadScoreTypebot] = useState<number>(0);
  const [agendouDireto, setAgendouDireto] = useState<string>("");

  const [resultado, setResultado] = useState<Destino>(null);
  const [showResult, setShowResult] = useState(false);

  const calcular = () => {
    let destino: Destino = null;

    // DESQUALIFICADO
    if (mentiu === "sim" || porteFit === "nao" || aderencia === "nao") {
      destino = "DESQUALIFICADO";
    }
    // PERDIDO
    else if (conseguiuFalar === "nao") {
      if (tentativas >= 5) {
        destino = "PERDIDO";
      } else if (temMotivoObjetivo === "sim" && motivo) {
        destino = "PERDIDO";
      }
    }

    // Exceção Typebot → SQL direto
    if (!destino && canalTypebot === "sim" && leadScoreTypebot >= 60 && agendouDireto === "sim") {
      destino = "SQL_TYPEBOT";
    }

    // SQL
    if (!destino && dorReal === "sim" && prioridade === "sim" && proximoPasso === "sim") {
      destino = "SQL";
    }

    // MQL (fallback)
    if (!destino) {
      if (dorExploratoria === "sim" || prioridadeBaixa === "sim" || semProximoPasso === "sim") {
        destino = "MQL";
      }
    }

    // Default MQL if we got past desqualificado/perdido but nothing else matched
    if (!destino && conseguiuFalar === "sim") {
      destino = "MQL";
    }

    setResultado(destino);
    setShowResult(true);
  };

  const getResultadoInfo = (): ResultadoInfo | null => {
    switch (resultado) {
      case "DESQUALIFICADO":
        return {
          destino: "❌ DESQUALIFICADO",
          icon: <XCircle className="w-6 h-6" />,
          cor: "border-red-500/30 bg-red-500/5",
          bullets: [
            mentiu === "sim" ? "Lead mentiu no formulário" : "",
            porteFit === "nao" ? "Porte/contexto sem fit" : "",
            aderencia === "nao" ? "Sem aderência mínima com a Freedom" : "",
          ].filter(Boolean),
          acao: "Registrar motivo e mover para Desqualificado no CRM.",
        };
      case "PERDIDO":
        return {
          destino: "💀 PERDIDO",
          icon: <AlertTriangle className="w-6 h-6" />,
          cor: "border-orange-500/30 bg-orange-500/5",
          bullets: [
            tentativas >= 5 ? "5 tentativas de contato sem sucesso" : "",
            temMotivoObjetivo === "sim" ? `Motivo objetivo: ${motivo}` : "",
          ].filter(Boolean),
          acao: "Registrar como Perdido com motivo objetivo no CRM.",
        };
      case "SQL":
        return {
          destino: "✅ SQL",
          icon: <CheckCircle2 className="w-6 h-6" />,
          cor: "border-green-500/30 bg-green-500/5",
          bullets: [
            "Dor real e concreta confirmada",
            "Prioridade atual ou comportamento ativo",
            "Próximo passo claro acordado",
          ],
          acao: qualProximoPasso
            ? `Avançar para: ${qualProximoPasso}.`
            : "Avançar para reunião ou diagnóstico.",
        };
      case "SQL_TYPEBOT":
        return {
          destino: "⭐ SQL direto (Typebot — score + ação)",
          icon: <Zap className="w-6 h-6" />,
          cor: "border-primary/30 bg-primary-weak/30",
          bullets: [
            "Canal de origem: Typebot",
            `Lead Score: ${leadScoreTypebot} (≥ 60)`,
            "Agendamento direto com Executivo",
          ],
          acao: "Confirmar reunião e avançar como SQL.",
          extra: "Essa é a única exceção onde formulário pode qualificar SQL direto.\nMesmo assim, o SDR pode reclassificar após confirmar a reunião.",
        };
      case "MQL":
        return {
          destino: "🟡 MQL",
          icon: <Clock className="w-6 h-6" />,
          cor: "border-primary/30 bg-primary-weak/20",
          bullets: [
            dorExploratoria === "sim" ? "Dor ainda exploratória" : "",
            prioridadeBaixa === "sim" ? "Prioridade baixa ou futura" : "",
            semProximoPasso === "sim" ? "Sem próximo passo claro definido" : "",
          ].filter(Boolean),
          acao: "Manter em maturação com follow-up estruturado.",
          extra: "MQL não é erro. MQL é lead em maturação.",
        };
      default:
        return null;
    }
  };

  const resetar = () => {
    setConseguiuFalar("");
    setTentativas(0);
    setTemMotivoObjetivo("");
    setMotivo("");
    setMentiu("");
    setPorteFit("");
    setAderencia("");
    setDorReal("");
    setPrioridade("");
    setProximoPasso("");
    setQualProximoPasso("");
    setDorExploratoria("");
    setPrioridadeBaixa("");
    setSemProximoPasso("");
    setCanalTypebot("");
    setLeadScoreTypebot(0);
    setAgendouDireto("");
    setResultado(null);
    setShowResult(false);
  };

  const info = getResultadoInfo();

  return (
    <div className="space-y-6">
      {/* A) Resultado de contato */}
      <div className="bg-card border border-border rounded-xl p-5 space-y-4">
        <h4 className="font-semibold text-foreground">A) Resultado de contato</h4>

        <div className="space-y-2">
          <Label className="text-sm text-foreground">1. Conseguiu falar com o lead?</Label>
          <RadioGroup value={conseguiuFalar} onValueChange={setConseguiuFalar} className="flex gap-4">
            <div className="flex items-center gap-2">
              <RadioGroupItem value="sim" id="falar-sim" />
              <Label htmlFor="falar-sim" className="text-sm">Sim</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="nao" id="falar-nao" />
              <Label htmlFor="falar-nao" className="text-sm">Não</Label>
            </div>
          </RadioGroup>
        </div>

        {conseguiuFalar === "nao" && (
          <div className="space-y-3 pl-4 border-l-2 border-primary/30">
            <div className="space-y-2">
              <Label className="text-sm text-foreground">Tentativas de contato feitas:</Label>
              <Input
                type="number"
                min={0}
                max={5}
                value={tentativas}
                onChange={(e) => setTentativas(Number(e.target.value))}
                className="w-24"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm text-foreground">Existe motivo objetivo?</Label>
              <RadioGroup value={temMotivoObjetivo} onValueChange={setTemMotivoObjetivo} className="flex gap-4">
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="sim" id="motivo-sim" />
                  <Label htmlFor="motivo-sim" className="text-sm">Sim</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="nao" id="motivo-nao" />
                  <Label htmlFor="motivo-nao" className="text-sm">Não</Label>
                </div>
              </RadioGroup>
            </div>
            {temMotivoObjetivo === "sim" && (
              <div className="space-y-2">
                <Label className="text-sm text-foreground">Motivo:</Label>
                <Select value={motivo} onValueChange={setMotivo}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione o motivo" />
                  </SelectTrigger>
                  <SelectContent>
                    {motivosObjetivos.map((m) => (
                      <SelectItem key={m} value={m}>{m}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        )}
      </div>

      {/* B) Validação de fit */}
      <div className="bg-card border border-border rounded-xl p-5 space-y-4">
        <h4 className="font-semibold text-foreground">B) Validação de fit</h4>

        {[
          { label: "2. Lead mentiu no formulário?", value: mentiu, set: setMentiu, id: "mentiu" },
          { label: "3. Porte/contexto têm fit?", value: porteFit, set: setPorteFit, id: "porte" },
          { label: "4. Existe aderência mínima com a Freedom?", value: aderencia, set: setAderencia, id: "aderencia" },
        ].map((item) => (
          <div key={item.id} className="space-y-2">
            <Label className="text-sm text-foreground">{item.label}</Label>
            <RadioGroup value={item.value} onValueChange={item.set} className="flex gap-4">
              <div className="flex items-center gap-2">
                <RadioGroupItem value="sim" id={`${item.id}-sim`} />
                <Label htmlFor={`${item.id}-sim`} className="text-sm">Sim</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="nao" id={`${item.id}-nao`} />
                <Label htmlFor={`${item.id}-nao`} className="text-sm">Não</Label>
              </div>
            </RadioGroup>
          </div>
        ))}
      </div>

      {/* C) Critérios de prontidão */}
      <div className="bg-card border border-border rounded-xl p-5 space-y-4">
        <h4 className="font-semibold text-foreground">C) Critérios de prontidão (para virar SQL)</h4>

        {[
          { label: "5. Dor real e concreta confirmada?", value: dorReal, set: setDorReal, id: "dor" },
          { label: "6. Prioridade atual OU comportamento ativo?", value: prioridade, set: setPrioridade, id: "prio" },
          { label: "7. Próximo passo claro acordado?", value: proximoPasso, set: setProximoPasso, id: "passo" },
        ].map((item) => (
          <div key={item.id} className="space-y-2">
            <Label className="text-sm text-foreground">{item.label}</Label>
            <RadioGroup value={item.value} onValueChange={item.set} className="flex gap-4">
              <div className="flex items-center gap-2">
                <RadioGroupItem value="sim" id={`${item.id}-sim`} />
                <Label htmlFor={`${item.id}-sim`} className="text-sm">Sim</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="nao" id={`${item.id}-nao`} />
                <Label htmlFor={`${item.id}-nao`} className="text-sm">Não</Label>
              </div>
            </RadioGroup>
          </div>
        ))}

        {proximoPasso === "sim" && (
          <div className="space-y-2">
            <Label className="text-sm text-foreground">8. Qual é o próximo passo?</Label>
            <Select value={qualProximoPasso} onValueChange={setQualProximoPasso}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Reunião agendada">Reunião agendada</SelectItem>
                <SelectItem value="Diagnóstico técnico">Diagnóstico técnico</SelectItem>
                <SelectItem value="Proposta solicitada">Proposta solicitada</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {/* D) Contexto MQL */}
      <div className="bg-card border border-border rounded-xl p-5 space-y-4">
        <h4 className="font-semibold text-foreground">D) Contexto de MQL (maturação)</h4>

        {[
          { label: "9. A dor ainda é exploratória?", value: dorExploratoria, set: setDorExploratoria, id: "explor" },
          { label: "10. A prioridade é baixa/futura?", value: prioridadeBaixa, set: setPrioridadeBaixa, id: "baixa" },
          { label: "11. Não foi possível definir próximo passo claro?", value: semProximoPasso, set: setSemProximoPasso, id: "sempasso" },
        ].map((item) => (
          <div key={item.id} className="space-y-2">
            <Label className="text-sm text-foreground">{item.label}</Label>
            <RadioGroup value={item.value} onValueChange={item.set} className="flex gap-4">
              <div className="flex items-center gap-2">
                <RadioGroupItem value="sim" id={`${item.id}-sim`} />
                <Label htmlFor={`${item.id}-sim`} className="text-sm">Sim</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="nao" id={`${item.id}-nao`} />
                <Label htmlFor={`${item.id}-nao`} className="text-sm">Não</Label>
              </div>
            </RadioGroup>
          </div>
        ))}
      </div>

      {/* E) Exceção Typebot */}
      <div className="bg-card border border-border rounded-xl p-5 space-y-4">
        <h4 className="font-semibold text-foreground">E) Exceção Typebot (SQL direto)</h4>

        <div className="space-y-2">
          <Label className="text-sm text-foreground">12. Canal de origem é Typebot?</Label>
          <RadioGroup value={canalTypebot} onValueChange={setCanalTypebot} className="flex gap-4">
            <div className="flex items-center gap-2">
              <RadioGroupItem value="sim" id="typebot-sim" />
              <Label htmlFor="typebot-sim" className="text-sm">Sim</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="nao" id="typebot-nao" />
              <Label htmlFor="typebot-nao" className="text-sm">Não</Label>
            </div>
          </RadioGroup>
        </div>

        {canalTypebot === "sim" && (
          <div className="space-y-3 pl-4 border-l-2 border-primary/30">
            <div className="space-y-2">
              <Label className="text-sm text-foreground">Lead Score:</Label>
              <Input
                type="number"
                min={0}
                max={100}
                value={leadScoreTypebot}
                onChange={(e) => setLeadScoreTypebot(Number(e.target.value))}
                className="w-24"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm text-foreground">O lead optou voluntariamente por agendar reunião direto com Executivo?</Label>
              <RadioGroup value={agendouDireto} onValueChange={setAgendouDireto} className="flex gap-4">
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="sim" id="agendou-sim" />
                  <Label htmlFor="agendou-sim" className="text-sm">Sim</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="nao" id="agendou-nao" />
                  <Label htmlFor="agendou-nao" className="text-sm">Não</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        )}
      </div>

      {/* Botão calcular */}
      <div className="flex gap-3">
        <Button onClick={calcular} className="gap-2">
          <Calculator className="w-4 h-4" />
          Calcular destino
        </Button>
        {showResult && (
          <Button variant="outline" onClick={resetar}>
            Limpar
          </Button>
        )}
      </div>

      {/* Resultado */}
      {showResult && info && (
        <div className={`rounded-xl border-2 p-6 space-y-4 ${info.cor}`}>
          <div className="flex items-center gap-3">
            {info.icon}
            <h4 className="text-xl font-bold text-foreground">{info.destino}</h4>
          </div>

          <div className="space-y-1">
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Por quê</p>
            <ul className="space-y-1">
              {info.bullets.map((b, i) => (
                <li key={i} className="text-sm text-foreground flex items-start gap-2">
                  <span className="text-muted-foreground">•</span> {b}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-1">
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Próxima ação</p>
            <p className="text-sm text-foreground">{info.acao}</p>
          </div>

          {info.extra && (
            <div className="mt-3 p-3 bg-muted/50 rounded-lg border border-border">
              {info.extra.split("\n").map((line, i) => (
                <p key={i} className="text-xs text-muted-foreground italic">{line}</p>
              ))}
            </div>
          )}
        </div>
      )}

      {showResult && !info && (
        <div className="rounded-xl border-2 border-border bg-muted/30 p-6">
          <p className="text-sm text-muted-foreground">
            Preencha mais campos para determinar o destino do lead.
          </p>
        </div>
      )}
    </div>
  );
}
