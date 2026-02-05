import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator, ChevronDown, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface ResultadoROI {
  custoTotalHorizonte: number;
  beneficioTotalHorizonte: number;
  ganhoLiquido: number;
  roiPercent: number | null;
  paybackMes: number | null;
  paybackConservador: number | null;
  fluxoMensal: {
    mes: number;
    custoMes: number;
    beneficioMes: number;
    custoAcumulado: number;
    beneficioAcumulado: number;
    saldo: number;
  }[];
}

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
    const horizonteNum = parseInt(roiHorizonteMeses) || parseInt(contratoMeses) || 12;
    const beneficioBrutoNum = parseFloat(beneficioMensalBruto) || 0;
    const percentualNum = parseFloat(percentualBeneficio) || 100;

    // Validações
    if (horizonteNum <= 0) {
      setErro("O horizonte deve ser maior que 0.");
      return;
    }
    if (setupParcelasNum <= 0) {
      setErro("O número de parcelas deve ser maior que 0.");
      return;
    }

    // Cálculos
    const setupParcelaMensal = setupTotalNum / setupParcelasNum;
    const beneficioMensal = beneficioBrutoNum * (percentualNum / 100);

    // Fluxo mensal
    const fluxoMensal: ResultadoROI["fluxoMensal"] = [];
    let custoAcumulado = 0;
    let beneficioAcumulado = 0;
    let paybackMes: number | null = null;

    for (let m = 1; m <= horizonteNum; m++) {
      // Custo setup do mês
      const custoSetupMes = m <= setupParcelasNum ? setupParcelaMensal : 0;
      // Custo MRR do mês
      const custoMrrMes = m >= mrrInicioMesNum ? mrrNum : 0;
      // Custo total do mês
      const custoMes = custoSetupMes + custoMrrMes;

      custoAcumulado += custoMes;
      beneficioAcumulado += beneficioMensal;

      const saldo = beneficioAcumulado - custoAcumulado;

      fluxoMensal.push({
        mes: m,
        custoMes,
        beneficioMes: beneficioMensal,
        custoAcumulado,
        beneficioAcumulado,
        saldo,
      });

      // Detectar payback (primeiro mês onde benefício >= custo)
      if (paybackMes === null && beneficioAcumulado >= custoAcumulado) {
        paybackMes = m;
      }
    }

    const custoTotalHorizonte = custoAcumulado;
    const beneficioTotalHorizonte = beneficioAcumulado;
    const ganhoLiquido = beneficioTotalHorizonte - custoTotalHorizonte;

    // ROI
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
      paybackMes,
      paybackConservador,
      fluxoMensal,
    });
  };

  const formatarMoeda = (valor: number) => {
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
                Resumo
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-4 bg-card rounded-xl border border-border">
                  <p className="text-sm text-muted-foreground">Custo total no horizonte</p>
                  <p className="text-xl font-bold text-foreground">
                    {formatarMoeda(resultado.custoTotalHorizonte)}
                  </p>
                </div>
                <div className="p-4 bg-card rounded-xl border border-border">
                  <p className="text-sm text-muted-foreground">Benefício total no horizonte</p>
                  <p className="text-xl font-bold text-foreground">
                    {formatarMoeda(resultado.beneficioTotalHorizonte)}
                  </p>
                </div>
                <div className="p-4 bg-card rounded-xl border border-border">
                  <p className="text-sm text-muted-foreground">Ganho líquido</p>
                  <p
                    className={`text-xl font-bold ${
                      resultado.ganhoLiquido >= 0 ? "text-success" : "text-destructive"
                    }`}
                  >
                    {formatarMoeda(resultado.ganhoLiquido)}
                  </p>
                </div>
                <div className="p-4 bg-card rounded-xl border border-border">
                  <p className="text-sm text-muted-foreground">ROI no horizonte</p>
                  <p
                    className={`text-xl font-bold ${
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
                    {resultado.paybackMes !== null
                      ? `Mês ${resultado.paybackMes}`
                      : "Não atingido no horizonte"}
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
                        <th className="text-left py-2 px-3 text-muted-foreground font-medium">
                          Mês
                        </th>
                        <th className="text-right py-2 px-3 text-muted-foreground font-medium">
                          Custo Mês
                        </th>
                        <th className="text-right py-2 px-3 text-muted-foreground font-medium">
                          Benefício Mês
                        </th>
                        <th className="text-right py-2 px-3 text-muted-foreground font-medium">
                          Saldo Acum.
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {resultado.fluxoMensal.map((row) => (
                        <tr
                          key={row.mes}
                          className={`border-b border-border/50 ${
                            resultado.paybackMes === row.mes ? "bg-success/10" : ""
                          }`}
                        >
                          <td className="py-2 px-3 text-foreground">{row.mes}</td>
                          <td className="py-2 px-3 text-right text-foreground">
                            {formatarMoeda(row.custoMes)}
                          </td>
                          <td className="py-2 px-3 text-right text-foreground">
                            {formatarMoeda(row.beneficioMes)}
                          </td>
                          <td
                            className={`py-2 px-3 text-right font-medium ${
                              row.saldo >= 0 ? "text-success" : "text-destructive"
                            }`}
                          >
                            {formatarMoeda(row.saldo)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
