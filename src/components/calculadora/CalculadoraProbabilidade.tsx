import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, TrendingUp, AlertTriangle, Target, Lightbulb } from "lucide-react";

type Produto = "vision" | "finance" | "legal";
type Etapa = "realizada" | "proposta" | "contrato" | "ganho";

interface EvidenceState {
  // A) COMPRA
  decisorParticipou: boolean;
  processoDecisaoClaro: boolean;
  criteriosDecisaoClaro: boolean;
  // B) IMPACTO
  dorQuantificada: boolean;
  volumeConfirmado: boolean;
  payoffAlinhado: boolean;
  // C) VIABILIDADE - Vision
  fonteVideoConfirmada: boolean;
  infraLocalDefinida: boolean;
  escopoCamerasDefinido: boolean;
  lgpdAlinhado: boolean;
  pocVisionAgendado: boolean;
  // C) VIABILIDADE - Finance
  sistemasConfirmados: boolean;
  donoDadoIdentificado: boolean;
  volumeTransacional: boolean;
  regraNegocioMapeada: boolean;
  validacaoFinanceAgendada: boolean;
  // C) VIABILIDADE - Legal
  fontesLegalConfirmadas: boolean;
  padraoPecaDefinido: boolean;
  volumeLegalConfirmado: boolean;
  complianceAprovado: boolean;
  amostrasDefinidas: boolean;
  // D) EXECUÇÃO
  responsavelNomeado: boolean;
  janelaKickoff: boolean;
  metricaSucesso: boolean;
  // RISCOS
  concorrenciaSemCriterio: boolean;
  clienteFavorita: boolean;
  bloqueadorNaoEnvolvido: boolean;
  semUrgencia: boolean;
  cicloPolitico: boolean;
  escopoInstavel: boolean;
  semDonoInterno: boolean;
  budgetCongelado: boolean;
}

const initialEvidence: EvidenceState = {
  decisorParticipou: false,
  processoDecisaoClaro: false,
  criteriosDecisaoClaro: false,
  dorQuantificada: false,
  volumeConfirmado: false,
  payoffAlinhado: false,
  fonteVideoConfirmada: false,
  infraLocalDefinida: false,
  escopoCamerasDefinido: false,
  lgpdAlinhado: false,
  pocVisionAgendado: false,
  sistemasConfirmados: false,
  donoDadoIdentificado: false,
  volumeTransacional: false,
  regraNegocioMapeada: false,
  validacaoFinanceAgendada: false,
  fontesLegalConfirmadas: false,
  padraoPecaDefinido: false,
  volumeLegalConfirmado: false,
  complianceAprovado: false,
  amostrasDefinidas: false,
  responsavelNomeado: false,
  janelaKickoff: false,
  metricaSucesso: false,
  concorrenciaSemCriterio: false,
  clienteFavorita: false,
  bloqueadorNaoEnvolvido: false,
  semUrgencia: false,
  cicloPolitico: false,
  escopoInstavel: false,
  semDonoInterno: false,
  budgetCongelado: false,
};

const ETAPA_CONFIG = {
  realizada: { base: 12, min: 5, max: 25, label: "Reunião Realizada" },
  proposta: { base: 40, min: 30, max: 60, label: "Proposta" },
  contrato: { base: 78, min: 70, max: 90, label: "Contrato" },
  ganho: { base: 100, min: 100, max: 100, label: "Ganho" },
};

const PRODUTO_LABELS = {
  vision: "Vision",
  finance: "Finance Core",
  legal: "Legal Hub",
};

export function CalculadoraProbabilidade() {
  const [produto, setProduto] = useState<Produto>("vision");
  const [etapa, setEtapa] = useState<Etapa>("realizada");
  const [evidence, setEvidence] = useState<EvidenceState>(initialEvidence);

  const toggleEvidence = (key: keyof EvidenceState) => {
    setEvidence((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const calculation = useMemo(() => {
    if (etapa === "ganho") {
      return {
        probabilidade: 100,
        base: 100,
        positivos: 0,
        negativos: 0,
        travasAplicadas: [],
        recomendacoes: [],
        breakdown: { compra: 0, impacto: 0, viabilidade: 0, execucao: 0, riscos: 0 },
      };
    }

    const config = ETAPA_CONFIG[etapa];
    let prob = config.base;
    const travasAplicadas: string[] = [];
    const recomendacoes: string[] = [];

    // A) COMPRA (máx +20)
    let compra = 0;
    if (evidence.decisorParticipou) compra += 10;
    if (evidence.processoDecisaoClaro) compra += 5;
    if (evidence.criteriosDecisaoClaro) compra += 5;

    // B) IMPACTO (máx +15)
    let impacto = 0;
    if (evidence.dorQuantificada) impacto += 7;
    if (evidence.volumeConfirmado) impacto += 5;
    if (evidence.payoffAlinhado) impacto += 3;

    // C) VIABILIDADE (máx +25) - por produto
    let viabilidade = 0;
    if (produto === "vision") {
      if (evidence.fonteVideoConfirmada) viabilidade += 8;
      if (evidence.infraLocalDefinida) viabilidade += 6;
      if (evidence.escopoCamerasDefinido) viabilidade += 5;
      if (evidence.lgpdAlinhado) viabilidade += 3;
      if (evidence.pocVisionAgendado) viabilidade += 3;
    } else if (produto === "finance") {
      if (evidence.sistemasConfirmados) viabilidade += 8;
      if (evidence.donoDadoIdentificado) viabilidade += 6;
      if (evidence.volumeTransacional) viabilidade += 5;
      if (evidence.regraNegocioMapeada) viabilidade += 3;
      if (evidence.validacaoFinanceAgendada) viabilidade += 3;
    } else if (produto === "legal") {
      if (evidence.fontesLegalConfirmadas) viabilidade += 8;
      if (evidence.padraoPecaDefinido) viabilidade += 6;
      if (evidence.volumeLegalConfirmado) viabilidade += 5;
      if (evidence.complianceAprovado) viabilidade += 3;
      if (evidence.amostrasDefinidas) viabilidade += 3;
    }

    // D) EXECUÇÃO (máx +10)
    let execucao = 0;
    if (evidence.responsavelNomeado) execucao += 4;
    if (evidence.janelaKickoff) execucao += 3;
    if (evidence.metricaSucesso) execucao += 3;

    // RISCOS (negativos)
    let riscos = 0;
    if (evidence.concorrenciaSemCriterio) riscos += 7;
    if (evidence.clienteFavorita) riscos += 12;
    if (evidence.bloqueadorNaoEnvolvido) riscos += 8;
    if (evidence.semUrgencia) riscos += 10;
    if (evidence.cicloPolitico) riscos += 10;
    if (evidence.escopoInstavel) riscos += 8;
    if (evidence.semDonoInterno) riscos += 12;
    if (evidence.budgetCongelado) riscos += 25;

    prob = config.base + compra + impacto + viabilidade + execucao - riscos;

    // TRAVAS DURAS
    let tetoFinal = config.max;

    // Trava: Decisor não participou
    if (!evidence.decisorParticipou) {
      const tetos = { realizada: 15, proposta: 45, contrato: 80 };
      const tetoDecisor = tetos[etapa as keyof typeof tetos];
      if (tetoDecisor && tetoDecisor < tetoFinal) {
        tetoFinal = tetoDecisor;
        travasAplicadas.push(`Sem decisor: teto ${tetoDecisor}%`);
      }
      recomendacoes.push("Agendar conversa com decisor");
    }

    // Trava: Sem dor quantificada
    if (!evidence.dorQuantificada) {
      const tetos = { realizada: 15, proposta: 50, contrato: config.max };
      const tetoDor = tetos[etapa as keyof typeof tetos];
      if (tetoDor && tetoDor < tetoFinal) {
        tetoFinal = tetoDor;
        travasAplicadas.push(`Sem dor quantificada: teto ${tetoDor}%`);
      }
      recomendacoes.push("Quantificar impacto (R$, risco ou tempo)");
    }

    // Travas por produto - Vision
    if (produto === "vision") {
      if (!evidence.fonteVideoConfirmada && etapa === "proposta") {
        tetoFinal = Math.min(tetoFinal, 40);
        travasAplicadas.push("Sem fonte vídeo: teto 40%");
        recomendacoes.push("Validar acesso RTSP/NVR/DVR");
      }
      if (!evidence.infraLocalDefinida && etapa === "proposta") {
        tetoFinal = Math.min(tetoFinal, 50);
        travasAplicadas.push("Sem infra local: teto 50%");
        recomendacoes.push("Definir infra local/edge");
      }
      if (!evidence.lgpdAlinhado) {
        prob -= 10;
        if (etapa === "proposta") {
          tetoFinal = Math.min(tetoFinal, 45);
          travasAplicadas.push("LGPD não alinhado: -10 e teto 45%");
        }
        recomendacoes.push("Alinhar requisitos LGPD/privacidade");
      }
    }

    // Travas por produto - Finance
    if (produto === "finance") {
      if (!evidence.sistemasConfirmados && etapa === "proposta") {
        tetoFinal = Math.min(tetoFinal, 45);
        travasAplicadas.push("Sistemas não confirmados: teto 45%");
        recomendacoes.push("Confirmar sistemas fonte (ERP/banco/gateway)");
      }
      if (!evidence.donoDadoIdentificado) {
        prob -= 10;
        const tetos = { realizada: 10, proposta: 40, contrato: config.max };
        const tetoDono = tetos[etapa as keyof typeof tetos];
        if (tetoDono && tetoDono < tetoFinal) {
          tetoFinal = tetoDono;
          travasAplicadas.push(`Sem dono do dado: -10 e teto ${tetoDono}%`);
        }
        recomendacoes.push("Identificar dono do dado");
      }
    }

    // Travas por produto - Legal
    if (produto === "legal") {
      if (!evidence.fontesLegalConfirmadas && etapa === "proposta") {
        tetoFinal = Math.min(tetoFinal, 45);
        travasAplicadas.push("Fontes não confirmadas: teto 45%");
        recomendacoes.push("Confirmar fontes (PJe/PDF/pastas)");
      }
      if (!evidence.complianceAprovado) {
        prob = config.min;
        travasAplicadas.push("Compliance não aprovou: prob = piso");
        recomendacoes.push("Obter aprovação de compliance/segurança");
      }
      if (!evidence.padraoPecaDefinido && etapa === "proposta") {
        tetoFinal = Math.min(tetoFinal, 50);
        travasAplicadas.push("Padrão de peça não definido: teto 50%");
        recomendacoes.push("Definir padrão de peça (tipos/estrutura/teses)");
      }
    }

    // Trava: Sem responsável do cliente
    if (!evidence.responsavelNomeado) {
      if (etapa === "proposta") tetoFinal = Math.min(tetoFinal, 55);
      if (etapa === "contrato") tetoFinal = Math.min(tetoFinal, 85);
      travasAplicadas.push("Sem responsável: teto reduzido");
      recomendacoes.push("Nomear responsável do cliente");
    }

    // Travas por risco
    if (evidence.semDonoInterno && etapa === "proposta") {
      tetoFinal = Math.min(tetoFinal, 40);
      travasAplicadas.push("Sem dono interno: teto 40%");
    }
    if (evidence.semUrgencia) {
      const tetos = { realizada: 10, proposta: 45, contrato: config.max };
      const tetoUrg = tetos[etapa as keyof typeof tetos];
      if (tetoUrg && tetoUrg < tetoFinal) {
        tetoFinal = tetoUrg;
        travasAplicadas.push(`Sem urgência: teto ${tetoUrg}%`);
      }
    }
    if (evidence.budgetCongelado) {
      prob = config.min;
      travasAplicadas.push("Budget congelado: prob = piso");
      recomendacoes.push("Pausar negociação ou mover para nurturing");
    }

    // Aplicar teto
    prob = Math.min(prob, tetoFinal);

    // Aplicar clamp
    prob = Math.max(config.min, Math.min(config.max, prob));

    // Recomendações adicionais
    if (!evidence.pocVisionAgendado && produto === "vision") {
      recomendacoes.push("Agendar PoC/teste técnico com data + responsável");
    }
    if (!evidence.validacaoFinanceAgendada && produto === "finance") {
      recomendacoes.push("Agendar validação técnica com data + responsável");
    }
    if (!evidence.amostrasDefinidas && produto === "legal") {
      recomendacoes.push("Definir amostras para teste (10 casos) + data");
    }
    if (!evidence.janelaKickoff) {
      recomendacoes.push("Definir janela de kickoff");
    }
    if (!evidence.metricaSucesso) {
      recomendacoes.push("Definir métrica de sucesso");
    }

    return {
      probabilidade: Math.round(prob),
      base: config.base,
      positivos: compra + impacto + viabilidade + execucao,
      negativos: riscos,
      travasAplicadas,
      recomendacoes: [...new Set(recomendacoes)],
      breakdown: { compra, impacto, viabilidade, execucao, riscos },
    };
  }, [evidence, etapa, produto]);

  const EvidenceToggle = ({
    id,
    label,
    points,
    checked,
    variant = "positive",
  }: {
    id: keyof EvidenceState;
    label: string;
    points: number;
    checked: boolean;
    variant?: "positive" | "negative";
  }) => (
    <div className="flex items-center justify-between py-3 px-4 bg-background rounded-lg border border-border">
      <Label htmlFor={id} className="text-sm text-foreground cursor-pointer flex-1 pr-4">
        {label}
      </Label>
      <div className="flex items-center gap-3">
        <Badge
          variant="outline"
          className={
            variant === "positive"
              ? "bg-success-weak text-success border-success/30 text-xs font-semibold"
              : "bg-destructive/10 text-destructive border-destructive/30 text-xs font-semibold"
          }
        >
          {variant === "positive" ? `+${points}` : `-${points}`}
        </Badge>
        <Switch id={id} checked={checked} onCheckedChange={() => toggleEvidence(id)} />
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Card 1 - Seleção */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg text-foreground">
            <Calculator className="h-5 w-5 text-primary" />
            Seleção
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Produto</Label>
              <Select value={produto} onValueChange={(v) => setProduto(v as Produto)}>
                <SelectTrigger className="bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vision">Vision</SelectItem>
                  <SelectItem value="finance">Finance Core</SelectItem>
                  <SelectItem value="legal">Legal Hub</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Etapa</Label>
              <Select value={etapa} onValueChange={(v) => setEtapa(v as Etapa)}>
                <SelectTrigger className="bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="realizada">Reunião Realizada</SelectItem>
                  <SelectItem value="proposta">Proposta</SelectItem>
                  <SelectItem value="contrato">Contrato</SelectItem>
                  <SelectItem value="ganho">Ganho</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {etapa !== "ganho" && (
        <>
          {/* Card 2 - Evidências Positivas */}
          <Card className="border-border bg-card">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg text-foreground">
                <TrendingUp className="h-5 w-5 text-success" />
                Evidências Positivas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* A) COMPRA */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  A) Compra (Decision & Process) — máx +20
                </h4>
                <div className="space-y-2">
                  <EvidenceToggle id="decisorParticipou" label="Decisor participou ao vivo?" points={10} checked={evidence.decisorParticipou} />
                  <EvidenceToggle id="processoDecisaoClaro" label="Processo de decisão claro (passos + quem aprova)?" points={5} checked={evidence.processoDecisaoClaro} />
                  <EvidenceToggle id="criteriosDecisaoClaro" label="Critérios de decisão claros?" points={5} checked={evidence.criteriosDecisaoClaro} />
                </div>
              </div>

              {/* B) IMPACTO */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  B) Impacto (Business Case) — máx +15
                </h4>
                <div className="space-y-2">
                  <EvidenceToggle id="dorQuantificada" label="Dor quantificada (R$, risco ou tempo) com faixa?" points={7} checked={evidence.dorQuantificada} />
                  <EvidenceToggle id="volumeConfirmado" label="Volume confirmado (número real)?" points={5} checked={evidence.volumeConfirmado} />
                  <EvidenceToggle id="payoffAlinhado" label="Payoff/prazo de valor alinhado (<90 dias)?" points={3} checked={evidence.payoffAlinhado} />
                </div>
              </div>

              {/* C) VIABILIDADE - Vision */}
              {produto === "vision" && (
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                    C) Viabilidade Vision (Tech Fit) — máx +25
                  </h4>
                  <div className="space-y-2">
                    <EvidenceToggle id="fonteVideoConfirmada" label="Fonte de vídeo confirmada (RTSP/NVR/DVR) e acesso viável?" points={8} checked={evidence.fonteVideoConfirmada} />
                    <EvidenceToggle id="infraLocalDefinida" label="Infra local/edge definida (onde roda/quem mantém)?" points={6} checked={evidence.infraLocalDefinida} />
                    <EvidenceToggle id="escopoCamerasDefinido" label="Escopo de câmeras e áreas definido?" points={5} checked={evidence.escopoCamerasDefinido} />
                    <EvidenceToggle id="lgpdAlinhado" label="Requisitos privacidade/LGPD alinhados?" points={3} checked={evidence.lgpdAlinhado} />
                    <EvidenceToggle id="pocVisionAgendado" label="Teste técnico/PoC agendado (data + responsável)?" points={3} checked={evidence.pocVisionAgendado} />
                  </div>
                </div>
              )}

              {/* C) VIABILIDADE - Finance */}
              {produto === "finance" && (
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                    C) Viabilidade Finance Core (Tech Fit) — máx +25
                  </h4>
                  <div className="space-y-2">
                    <EvidenceToggle id="sistemasConfirmados" label="Sistemas fonte confirmados (ERP/banco/gateway) e acesso possível?" points={8} checked={evidence.sistemasConfirmados} />
                    <EvidenceToggle id="donoDadoIdentificado" label="Dono do dado identificado e disponível?" points={6} checked={evidence.donoDadoIdentificado} />
                    <EvidenceToggle id="volumeTransacional" label="Volume transacional confirmado (notas/cobranças/conciliações/mês)?" points={5} checked={evidence.volumeTransacional} />
                    <EvidenceToggle id="regraNegocioMapeada" label="Regra de negócio mapeada?" points={3} checked={evidence.regraNegocioMapeada} />
                    <EvidenceToggle id="validacaoFinanceAgendada" label="Validação técnica agendada (data + responsável)?" points={3} checked={evidence.validacaoFinanceAgendada} />
                  </div>
                </div>
              )}

              {/* C) VIABILIDADE - Legal */}
              {produto === "legal" && (
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                    C) Viabilidade Legal Hub (Tech Fit) — máx +25
                  </h4>
                  <div className="space-y-2">
                    <EvidenceToggle id="fontesLegalConfirmadas" label="Fontes confirmadas (PJe/PDF/pastas) e acesso viável?" points={8} checked={evidence.fontesLegalConfirmadas} />
                    <EvidenceToggle id="padraoPecaDefinido" label="Padrão de peça definido (tipos/estrutura/teses)?" points={6} checked={evidence.padraoPecaDefinido} />
                    <EvidenceToggle id="volumeLegalConfirmado" label="Volume/mês confirmado e repetitivo?" points={5} checked={evidence.volumeLegalConfirmado} />
                    <EvidenceToggle id="complianceAprovado" label="Compliance/segurança aprovadas?" points={3} checked={evidence.complianceAprovado} />
                    <EvidenceToggle id="amostrasDefinidas" label="Amostras para teste definidas (10 casos) + data?" points={3} checked={evidence.amostrasDefinidas} />
                  </div>
                </div>
              )}

              {/* D) EXECUÇÃO */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  D) Execução (Delivery Readiness) — máx +10
                </h4>
                <div className="space-y-2">
                  <EvidenceToggle id="responsavelNomeado" label="Responsável do cliente nomeado?" points={4} checked={evidence.responsavelNomeado} />
                  <EvidenceToggle id="janelaKickoff" label="Janela de kickoff definida?" points={3} checked={evidence.janelaKickoff} />
                  <EvidenceToggle id="metricaSucesso" label="Métrica de sucesso definida?" points={3} checked={evidence.metricaSucesso} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 3 - Riscos / Alertas */}
          <Card className="border-border bg-card">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg text-foreground">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                Riscos / Alertas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <EvidenceToggle id="concorrenciaSemCriterio" label="Concorrência ativa sem critério definido" points={7} checked={evidence.concorrenciaSemCriterio} variant="negative" />
                <EvidenceToggle id="clienteFavorita" label="Cliente já tem favorita" points={12} checked={evidence.clienteFavorita} variant="negative" />
                <EvidenceToggle id="bloqueadorNaoEnvolvido" label="Bloqueador técnico/compliance não envolvido" points={8} checked={evidence.bloqueadorNaoEnvolvido} variant="negative" />
                <EvidenceToggle id="semUrgencia" label="Sem urgência (impacto não dói)" points={10} checked={evidence.semUrgencia} variant="negative" />
                <EvidenceToggle id="cicloPolitico" label="Ciclo político (muitos co-decisores sem agenda)" points={10} checked={evidence.cicloPolitico} variant="negative" />
                <EvidenceToggle id="escopoInstavel" label="Escopo instável (mudando sempre)" points={8} checked={evidence.escopoInstavel} variant="negative" />
                <EvidenceToggle id="semDonoInterno" label="Sem dono interno (ninguém puxa)" points={12} checked={evidence.semDonoInterno} variant="negative" />
                <EvidenceToggle id="budgetCongelado" label="Budget congelado/sem verba" points={25} checked={evidence.budgetCongelado} variant="negative" />
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Card 4 - Resultado */}
      <Card className="border-primary/30 bg-primary-weak/30">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg text-foreground">
            <Target className="h-5 w-5 text-primary" />
            Resultado
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Probabilidade sugerida</p>
              <Badge className="text-2xl px-4 py-2 bg-primary text-primary-foreground font-bold">
                {calculation.probabilidade}%
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>
                <span className="font-medium text-foreground">Produto:</span> {PRODUTO_LABELS[produto]}
              </p>
              <p>
                <span className="font-medium text-foreground">Etapa:</span> {ETAPA_CONFIG[etapa].label}
              </p>
              <p>
                <span className="font-medium text-foreground">Faixa:</span> {ETAPA_CONFIG[etapa].min}% – {ETAPA_CONFIG[etapa].max}%
              </p>
            </div>
          </div>

          {etapa !== "ganho" && (
            <div className="pt-4 border-t border-border space-y-3">
              <h4 className="text-sm font-semibold text-foreground">Breakdown</h4>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
                <div className="bg-background rounded-lg p-3 text-center">
                  <p className="text-muted-foreground text-xs">Base</p>
                  <p className="font-semibold text-foreground">{calculation.base}%</p>
                </div>
                <div className="bg-background rounded-lg p-3 text-center">
                  <p className="text-muted-foreground text-xs">Compra</p>
                  <p className="font-semibold text-success">+{calculation.breakdown.compra}</p>
                </div>
                <div className="bg-background rounded-lg p-3 text-center">
                  <p className="text-muted-foreground text-xs">Impacto</p>
                  <p className="font-semibold text-success">+{calculation.breakdown.impacto}</p>
                </div>
                <div className="bg-background rounded-lg p-3 text-center">
                  <p className="text-muted-foreground text-xs">Viabilidade</p>
                  <p className="font-semibold text-success">+{calculation.breakdown.viabilidade}</p>
                </div>
                <div className="bg-background rounded-lg p-3 text-center">
                  <p className="text-muted-foreground text-xs">Execução</p>
                  <p className="font-semibold text-success">+{calculation.breakdown.execucao}</p>
                </div>
              </div>
              <div className="bg-destructive/10 rounded-lg p-3 text-center">
                <p className="text-muted-foreground text-xs">Riscos</p>
                <p className="font-semibold text-destructive">-{calculation.breakdown.riscos}</p>
              </div>

              {calculation.travasAplicadas.length > 0 && (
                <div className="bg-muted/50 rounded-lg p-3">
                  <p className="text-xs font-semibold text-muted-foreground mb-2">Travas aplicadas:</p>
                  <ul className="text-sm text-foreground space-y-1">
                    {calculation.travasAplicadas.map((trava, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-destructive" />
                        {trava}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Card 5 - Para subir de patamar */}
      {etapa !== "ganho" && calculation.recomendacoes.length > 0 && (
        <Card className="border-success/30 bg-success-weak/30">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg text-foreground">
              <Lightbulb className="h-5 w-5 text-success" />
              Para subir de patamar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {calculation.recomendacoes.map((rec, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-success shrink-0" />
                  {rec}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
