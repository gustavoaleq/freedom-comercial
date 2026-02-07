import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator, ChevronDown, ChevronRight, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

type PosContratoOpcao = "encerrar" | "beneficio" | "mrr-beneficio";

interface ResultadoROI {
  custoTotalHorizonte: number;
  beneficioTotalHorizonte: number;
  ganhoLiquido: number;
  roiPercent: number | null;
  // Dentro do contrato
  paybackMesContrato: number | null;
  roiPositivoMesContrato: number | null;
  // Projeção (pode ser após contrato)
  paybackMesProjetado: number | null;
  roiPositivoMesProjetado: number | null;
  paybackAposContrato: boolean;
  roiPositivoAposContrato: boolean;
  naoAtingePayback: boolean;
  naoAtingeRoiPositivo: boolean;
  horizonteMaxUsado: number;
  // Totais separados
  totalSetupHorizonte: number;
  totalMrrHorizonte: number;
  fluxoMensal: {
    mes: number;
    setupMes: number;
    mrrMes: number;
    custoMes: number;
    beneficioMes: number;
    custoAcumulado: number;
    beneficioAcumulado: number;
    saldo: number;
    roiAcumulado: number | null;
    aposContrato: boolean;
  }[];
  paybackConservador: number | null;
}

const POS_CONTRATO_LABELS: Record<PosContratoOpcao, string> = {
  "encerrar": "Encerrar custos e benefício",
  "beneficio": "Manter somente benefício (economia)",
  "mrr-beneficio": "Manter MRR e benefício (continuidade)",
};

export function CalculadoraROI() {
  // Inputs
  const [setupTotal, setSetupTotal] = useState("");
  const [setupParcelas, setSetupParcelas] = useState("");
  const [mrr, setMrr] = useState("");
  const [mrrInicioMes, setMrrInicioMes] = useState("");
  const [contratoMeses, setContratoMeses] = useState("");
  const [roiHorizonteMeses, setRoiHorizonteMeses] = useState("");
  const [beneficioMensalBruto, setBeneficioMensalBruto] = useState("");
  const [percentualBeneficio, setPercentualBeneficio] = useState("100");
  const [posContratoOpcao, setPosContratoOpcao] = useState<PosContratoOpcao>("beneficio");

  // State
  const [erro, setErro] = useState("");
  const [resultado, setResultado] = useState<ResultadoROI | null>(null);
  const [showFluxo, setShowFluxo] = useState(false);

  // Sincronizar horizonte com contrato quando contrato muda
  const handleContratoChange = (value: string) => {
    setContratoMeses(value);
    if (!roiHorizonteMeses || roiHorizonteMeses === contratoMeses) {
      setRoiHorizonteMeses(value);
    }
  };

  const calcular = () => {
    setErro("");
    setResultado(null);

    // Parse inputs
    const setupTotalNum = parseFloat(setupTotal) || 0;
    const setupParcelasNum = parseInt(setupParcelas) || 1;
    const mrrNum = parseFloat(mrr) || 0;
    const mrrInicioMesNum = parseInt(mrrInicioMes) || 1;
    const contratoMesesNum = parseInt(contratoMeses) || 12;
    const horizonteNum = parseInt(roiHorizonteMeses) || contratoMesesNum;
    const beneficioBrutoNum = parseFloat(beneficioMensalBruto) || 0;
    const percentualNum = parseFloat(percentualBeneficio) || 100;

    // Validações
    if (contratoMesesNum <= 0) {
      setErro("A duração do contrato deve ser maior que 0.");
      return;
    }
    if (setupParcelasNum <= 0) {
      setErro("O número de parcelas deve ser maior que 0.");
      return;
    }

    // Cálculos
    const setupParcelaMensal = setupTotalNum / setupParcelasNum;
    const beneficioMensal = beneficioBrutoNum * (percentualNum / 100);

    // Horizonte estendido para projeção (até +60 meses após contrato)
    const horizonteMax = Math.max(horizonteNum, contratoMesesNum) + 60;

    // Fluxo mensal
    const fluxoMensal: ResultadoROI["fluxoMensal"] = [];
    let custoAcumulado = 0;
    let beneficioAcumulado = 0;
    
    // Marcos dentro do contrato
    let paybackMesContrato: number | null = null;
    let roiPositivoMesContrato: number | null = null;
    
    // Marcos projetados (podem ser após contrato)
    let paybackMesProjetado: number | null = null;
    let roiPositivoMesProjetado: number | null = null;

    for (let m = 1; m <= horizonteMax; m++) {
      const aposContrato = m > contratoMesesNum;
      let setupMes = 0;
      let mrrMes = 0;
      let beneficioMes = 0;

      if (!aposContrato) {
        // Dentro do contrato - regras normais
        setupMes = m <= setupParcelasNum ? setupParcelaMensal : 0;
        mrrMes = m >= mrrInicioMesNum ? mrrNum : 0;
        beneficioMes = beneficioMensal;
      } else {
        // Após o contrato - aplicar opção selecionada
        switch (posContratoOpcao) {
          case "encerrar":
            setupMes = 0;
            mrrMes = 0;
            beneficioMes = 0;
            break;
          case "beneficio":
            setupMes = 0;
            mrrMes = 0;
            beneficioMes = beneficioMensal;
            break;
          case "mrr-beneficio":
            setupMes = 0;
            mrrMes = mrrNum;
            beneficioMes = beneficioMensal;
            break;
        }
      }

      const custoMes = setupMes + mrrMes;
      custoAcumulado += custoMes;
      beneficioAcumulado += beneficioMes;

      const saldo = beneficioAcumulado - custoAcumulado;
      const roiAcumulado = custoAcumulado > 0 
        ? ((saldo) / custoAcumulado) * 100 
        : null;

      // Só adicionar ao fluxo visual até o horizonte solicitado + alguns meses extras
      if (m <= Math.max(horizonteNum, contratoMesesNum) + 12) {
        fluxoMensal.push({
          mes: m,
          setupMes,
          mrrMes,
          custoMes,
          beneficioMes,
          custoAcumulado,
          beneficioAcumulado,
          saldo,
          roiAcumulado,
          aposContrato,
        });
      }

      // Detectar payback (primeiro mês onde benefício acumulado supera custo acumulado)
      if (paybackMesProjetado === null && saldo > 0) {
        paybackMesProjetado = m;
        if (!aposContrato) {
          paybackMesContrato = m;
        }
      }

      // Detectar ROI positivo (primeiro mês onde ROI > 0%)
      if (roiPositivoMesProjetado === null && roiAcumulado !== null && roiAcumulado > 0) {
        roiPositivoMesProjetado = m;
        if (!aposContrato) {
          roiPositivoMesContrato = m;
        }
      }

      // Se opção for encerrar e já passou do contrato sem benefício, parar
      if (aposContrato && posContratoOpcao === "encerrar" && beneficioMes === 0 && custoMes === 0) {
        // Se já encontramos ou nunca vamos encontrar, podemos parar
        if (paybackMesProjetado !== null && roiPositivoMesProjetado !== null) {
          break;
        }
        // Se não há mais fluxo, não vai mudar
        break;
      }
    }

    // Calcular resultados dentro do horizonte solicitado
    let totalSetupHorizonte = 0;
    let totalMrrHorizonte = 0;
    let beneficioTotalHorizonte = 0;
    for (let m = 1; m <= horizonteNum; m++) {
      const aposContrato = m > contratoMesesNum;
      if (!aposContrato) {
        const setupMesCalc = m <= setupParcelasNum ? setupParcelaMensal : 0;
        const mrrMesCalc = m >= mrrInicioMesNum ? mrrNum : 0;
        totalSetupHorizonte += setupMesCalc;
        totalMrrHorizonte += mrrMesCalc;
        beneficioTotalHorizonte += beneficioMensal;
      } else {
        switch (posContratoOpcao) {
          case "encerrar":
            break;
          case "beneficio":
            beneficioTotalHorizonte += beneficioMensal;
            break;
          case "mrr-beneficio":
            totalMrrHorizonte += mrrNum;
            beneficioTotalHorizonte += beneficioMensal;
            break;
        }
      }
    }
    const custoTotalHorizonte = totalSetupHorizonte + totalMrrHorizonte;

    const ganhoLiquido = beneficioTotalHorizonte - custoTotalHorizonte;

    // ROI no horizonte
    let roiPercent: number | null = null;
    if (custoTotalHorizonte > 0) {
      roiPercent = (ganhoLiquido / custoTotalHorizonte) * 100;
    }

    // Payback conservador
    let paybackConservador: number | null = null;
    if (beneficioMensal > 0) {
      paybackConservador = custoTotalHorizonte / beneficioMensal;
    }

    setResultado({
      custoTotalHorizonte,
      beneficioTotalHorizonte,
      ganhoLiquido,
      roiPercent,
      paybackMesContrato,
      roiPositivoMesContrato,
      paybackMesProjetado,
      roiPositivoMesProjetado,
      paybackAposContrato: paybackMesProjetado !== null && paybackMesProjetado > contratoMesesNum,
      roiPositivoAposContrato: roiPositivoMesProjetado !== null && roiPositivoMesProjetado > contratoMesesNum,
      naoAtingePayback: paybackMesProjetado === null,
      naoAtingeRoiPositivo: roiPositivoMesProjetado === null,
      horizonteMaxUsado: horizonteMax,
      totalSetupHorizonte,
      totalMrrHorizonte,
      fluxoMensal,
      paybackConservador,
    });
  };

  const formatarMoeda = (valor: number | undefined | null): string => {
    if (valor === undefined || valor === null) {
      return "R$ 0,00";
    }
    return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  };

  const formatarDecimal = (valor: number, casas = 1) => {
    return valor.toFixed(casas).replace(".", ",");
  };

  return (
    <div className="space-y-6">
      {/* Card de Inputs */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg text-foreground">
            <Calculator className="h-5 w-5 text-primary" />
            Calculadora de ROI & Payback
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Bloco A - Custos do projeto */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Custos do Projeto
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Setup total (R$)
                </label>
                <Input
                  type="number"
                  placeholder="Ex: 15000"
                  value={setupTotal}
                  onChange={(e) => setSetupTotal(e.target.value)}
                  className="bg-background border-border focus-visible:ring-primary"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Parcelas do setup (número)
                </label>
                <Input
                  type="number"
                  placeholder="Ex: 3"
                  value={setupParcelas}
                  onChange={(e) => setSetupParcelas(e.target.value)}
                  className="bg-background border-border focus-visible:ring-primary"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  MRR / Mensalidade (R$)
                </label>
                <Input
                  type="number"
                  placeholder="Ex: 3000"
                  value={mrr}
                  onChange={(e) => setMrr(e.target.value)}
                  className="bg-background border-border focus-visible:ring-primary"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  MRR começa em qual mês?
                </label>
                <Input
                  type="number"
                  placeholder="Ex: 4"
                  value={mrrInicioMes}
                  onChange={(e) => setMrrInicioMes(e.target.value)}
                  className="bg-background border-border focus-visible:ring-primary"
                />
              </div>
            </div>
          </div>

          {/* Bloco B - Horizonte */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Horizonte
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Duração do contrato (meses)
                </label>
                <Input
                  type="number"
                  placeholder="Ex: 12"
                  value={contratoMeses}
                  onChange={(e) => handleContratoChange(e.target.value)}
                  className="bg-background border-border focus-visible:ring-primary"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Horizonte do ROI (meses)
                </label>
                <Input
                  type="number"
                  placeholder="Ex: 12"
                  value={roiHorizonteMeses}
                  onChange={(e) => setRoiHorizonteMeses(e.target.value)}
                  className="bg-background border-border focus-visible:ring-primary"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Por padrão, igual à duração do contrato.
                </p>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Após o contrato, considerar:
              </label>
              <Select value={posContratoOpcao} onValueChange={(v) => setPosContratoOpcao(v as PosContratoOpcao)}>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beneficio">Manter somente benefício (economia)</SelectItem>
                  <SelectItem value="mrr-beneficio">Manter MRR e benefício (continuidade)</SelectItem>
                  <SelectItem value="encerrar">Encerrar custos e benefício</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-1">
                Define como projetar payback/ROI se não ocorrerem dentro do contrato.
              </p>
            </div>
          </div>

          {/* Bloco C - Benefício */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Benefício (Retorno)
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Benefício mensal estimado (R$)
                </label>
                <Input
                  type="number"
                  placeholder="Ex: 6500"
                  value={beneficioMensalBruto}
                  onChange={(e) => setBeneficioMensalBruto(e.target.value)}
                  className="bg-background border-border focus-visible:ring-primary"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Ex.: custo mensal de um funcionário / economia mensal / ganho mensal
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  % do benefício capturado (%)
                </label>
                <Input
                  type="number"
                  placeholder="Ex: 100"
                  value={percentualBeneficio}
                  onChange={(e) => setPercentualBeneficio(e.target.value)}
                  className="bg-background border-border focus-visible:ring-primary"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Use 100% se substitui totalmente. Use 60% se só economiza parte.
                </p>
              </div>
            </div>
          </div>

          {/* Erro */}
          {erro && (
            <div className="flex items-center gap-2 p-4 bg-destructive/10 border border-destructive/20 rounded-xl text-destructive">
              <p className="text-sm font-medium">{erro}</p>
            </div>
          )}

          {/* Botão */}
          <Button
            onClick={calcular}
            className="w-full md:w-auto bg-primary hover:bg-primary-hover text-primary-foreground"
          >
            <Calculator className="w-4 h-4 mr-2" />
            🧮 Calcular ROI
          </Button>
        </CardContent>
      </Card>

      {/* Card de Resultados */}
      {resultado && (
        <Card className="border-primary/20 bg-primary-weak/30">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-foreground">Resultado</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Resumo */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Resumo (horizonte de {roiHorizonteMeses || contratoMeses || 12} meses)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-4 bg-card rounded-xl border border-border">
                  <p className="text-sm text-muted-foreground">Total Setup no horizonte</p>
                  <p className="text-lg font-bold text-foreground">
                    {formatarMoeda(resultado.totalSetupHorizonte)}
                  </p>
                </div>
                <div className="p-4 bg-card rounded-xl border border-border">
                  <p className="text-sm text-muted-foreground">Total MRR no horizonte</p>
                  <p className="text-lg font-bold text-foreground">
                    {formatarMoeda(resultado.totalMrrHorizonte)}
                  </p>
                </div>
                <div className="p-4 bg-card rounded-xl border border-border">
                  <p className="text-sm text-muted-foreground">Custo total no horizonte</p>
                  <p className="text-lg font-bold text-foreground">
                    {formatarMoeda(resultado.custoTotalHorizonte)}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
                <div className="p-4 bg-card rounded-xl border border-border">
                  <p className="text-sm text-muted-foreground">Benefício total no horizonte</p>
                  <p className="text-lg font-bold text-foreground">
                    {formatarMoeda(resultado.beneficioTotalHorizonte)}
                  </p>
                </div>
                <div className="p-4 bg-card rounded-xl border border-border">
                  <p className="text-sm text-muted-foreground">Ganho líquido</p>
                  <p
                    className={`text-lg font-bold ${
                      resultado.ganhoLiquido >= 0 ? "text-success" : "text-destructive"
                    }`}
                  >
                    {formatarMoeda(resultado.ganhoLiquido)}
                  </p>
                </div>
                <div className="p-4 bg-card rounded-xl border border-border">
                  <p className="text-sm text-muted-foreground">ROI no horizonte</p>
                  <p
                    className={`text-lg font-bold ${
                      resultado.roiPercent !== null && resultado.roiPercent >= 0
                        ? "text-success"
                        : "text-destructive"
                    }`}
                  >
                    {resultado.roiPercent !== null
                      ? `${formatarDecimal(resultado.roiPercent)}%`
                      : "ROI indisponível (custo zero)"}
                  </p>
                </div>
              </div>
            </div>

            {/* Payback */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Payback
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-4 bg-card rounded-xl border border-border">
                  <p className="text-sm text-muted-foreground">Payback (real)</p>
                  <p className="text-xl font-bold text-foreground">
                    {resultado.paybackMesContrato !== null
                      ? `Mês ${resultado.paybackMesContrato}`
                      : "Não atingido no contrato"}
                  </p>
                </div>
                <div className="p-4 bg-card rounded-xl border border-border">
                  <p className="text-sm text-muted-foreground">Payback conservador</p>
                  <p className="text-xl font-bold text-foreground">
                    {resultado.paybackConservador !== null
                      ? `${formatarDecimal(resultado.paybackConservador)} meses`
                      : "Indisponível (benefício zero)"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Custo total ÷ benefício mensal
                  </p>
                </div>
              </div>
            </div>

            {/* Projeção (se payback/ROI não atingido no contrato) */}
            {(resultado.paybackAposContrato || resultado.roiPositivoAposContrato || 
              resultado.naoAtingePayback || resultado.naoAtingeRoiPositivo ||
              (resultado.roiPercent !== null && resultado.roiPercent < 0)) && (
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  Projeção
                </h4>
                
                {/* Aviso */}
                <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-xl border border-border">
                  <AlertTriangle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">
                    Payback/ROI positivo não ocorre dentro do contrato. Projeção considera:{" "}
                    <Badge variant="outline" className="ml-1">
                      {POS_CONTRATO_LABELS[posContratoOpcao]}
                    </Badge>
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-4 bg-card rounded-xl border border-border">
                    <p className="text-sm text-muted-foreground">Payback projetado</p>
                    <p className="text-xl font-bold text-foreground">
                      {resultado.paybackMesProjetado !== null ? (
                        <>
                          Mês {resultado.paybackMesProjetado}
                          {resultado.paybackAposContrato && (
                            <Badge variant="secondary" className="ml-2 text-xs">
                              após contrato
                            </Badge>
                          )}
                        </>
                      ) : (
                        `Não atingido até mês ${resultado.horizonteMaxUsado}`
                      )}
                    </p>
                  </div>
                  <div className="p-4 bg-card rounded-xl border border-border">
                    <p className="text-sm text-muted-foreground">ROI vira positivo</p>
                    <p className="text-xl font-bold text-foreground">
                      {resultado.roiPositivoMesProjetado !== null ? (
                        <>
                          Mês {resultado.roiPositivoMesProjetado}
                          {resultado.roiPositivoAposContrato && (
                            <Badge variant="secondary" className="ml-2 text-xs">
                              após contrato
                            </Badge>
                          )}
                        </>
                      ) : (
                        `Não vira positivo até mês ${resultado.horizonteMaxUsado}`
                      )}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Fluxo Mensal (colapsável) */}
            <Collapsible open={showFluxo} onOpenChange={setShowFluxo}>
              <CollapsibleTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  <span>Ver fluxo mensal</span>
                  {showFluxo ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 px-2 text-muted-foreground font-medium">
                          Mês
                        </th>
                        <th className="text-right py-2 px-2 text-muted-foreground font-medium">
                          Setup
                        </th>
                        <th className="text-right py-2 px-2 text-muted-foreground font-medium">
                          MRR
                        </th>
                        <th className="text-right py-2 px-2 text-muted-foreground font-medium">
                          Custo Total
                        </th>
                        <th className="text-right py-2 px-2 text-muted-foreground font-medium">
                          Benefício
                        </th>
                        <th className="text-right py-2 px-2 text-muted-foreground font-medium">
                          Saldo Acum.
                        </th>
                        <th className="text-right py-2 px-2 text-muted-foreground font-medium">
                          ROI Acum.
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {resultado.fluxoMensal.map((row) => (
                        <tr
                          key={row.mes}
                          className={`border-b border-border/50 ${
                            resultado.paybackMesProjetado === row.mes ? "bg-success/10" : ""
                          } ${row.aposContrato ? "opacity-70" : ""}`}
                        >
                          <td className="py-2 px-2 text-foreground">
                            {row.mes}
                            {row.aposContrato && (
                              <span className="text-xs text-muted-foreground ml-1">*</span>
                            )}
                          </td>
                          <td className="py-2 px-2 text-right text-foreground">
                            {formatarMoeda(row.setupMes)}
                          </td>
                          <td className="py-2 px-2 text-right text-foreground">
                            {formatarMoeda(row.mrrMes)}
                          </td>
                          <td className="py-2 px-2 text-right text-foreground font-medium">
                            {formatarMoeda(row.custoMes)}
                          </td>
                          <td className="py-2 px-2 text-right text-foreground">
                            {formatarMoeda(row.beneficioMes)}
                          </td>
                          <td
                            className={`py-2 px-2 text-right font-medium ${
                              row.saldo >= 0 ? "text-success" : "text-destructive"
                            }`}
                          >
                            {formatarMoeda(row.saldo)}
                          </td>
                          <td
                            className={`py-2 px-2 text-right font-medium ${
                              row.roiAcumulado !== null && row.roiAcumulado >= 0
                                ? "text-success"
                                : "text-destructive"
                            }`}
                          >
                            {row.roiAcumulado !== null
                              ? `${formatarDecimal(row.roiAcumulado)}%`
                              : "—"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {resultado.fluxoMensal.some((r) => r.aposContrato) && (
                    <p className="text-xs text-muted-foreground mt-2">
                      * Meses após o término do contrato (projeção)
                    </p>
                  )}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
