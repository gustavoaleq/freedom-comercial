import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHero } from "@/components/ui/PageHero";
import { ContentBlock } from "@/components/ui/ContentBlock";
import { cn } from "@/lib/utils";

const ProdutosPage = () => {
  const [activeTab, setActiveTab] = useState<"vision" | "finance" | "legal">("vision");

  const products = {
    vision: {
      name: "Vision",
      icp: "Varejo alimentar, farmácias, postos, CDs, indústrias, educação",
      dores: [
        "Perdas e fraudes não detectadas",
        "Ruptura de estoque",
        "Filas longas sem gestão",
        "Operação reativa ao invés de proativa"
      ],
      pitch: "Transformamos câmera em dado e ação.",
      perguntas: [
        "Quantas câmeras vocês têm hoje?",
        "Quais áreas mais críticas para monitorar?",
        "As câmeras são RTSP?",
        "Qual a infraestrutura local (servidor, GPU)?",
        "Qual a qualidade da internet?",
        "Quem faz manutenção das câmeras?"
      ],
      sucesso: "Redução de perdas, tempo de fila, ruptura de estoque",
      erros: ["Vender como 'câmera inteligente' ao invés de resultado", "Não validar infra antes"],
      proximoPasso: "Agendar validação técnica de câmeras + infra"
    },
    finance: {
      name: "Finance Core",
      icp: "Empresas com alto volume de faturamento e cobrança",
      dores: [
        "Refaturamento constante",
        "Emissão lenta de notas",
        "Conciliação manual demorada",
        "Cobrança ineficiente",
        "DSO alto (dias para receber)"
      ],
      pitch: "Receita vira caixa com governança e rastreabilidade.",
      perguntas: [
        "Onde trava mais: emissão, conciliação ou cobrança?",
        "Quantos documentos vocês processam por mês?",
        "Quais ERPs vocês usam?",
        "Quais bancos e gateways de pagamento?",
        "Qual o DSO atual vs. meta?"
      ],
      sucesso: "Redução de DSO, tempo de conciliação, erros de faturamento",
      erros: ["Subestimar complexidade de integração com ERP", "Não mapear todos os bancos"],
      proximoPasso: "Agendar call técnica com TI para entender integrações"
    },
    legal: {
      name: "Legal Hub",
      icp: "Escritórios e departamentos jurídicos com alto volume processual",
      dores: [
        "Volume alto de processos",
        "Retrabalho em peças jurídicas",
        "Dependência de advogado sênior",
        "Inconsistência técnica entre peças"
      ],
      pitch: "Processo vira peça final pronta, padrão técnico e rastreável.",
      perguntas: [
        "Quantos processos vocês movimentam por mês?",
        "Onde está o maior gargalo: prova, tese ou tempo?",
        "De onde vêm os dados? PJe, PDF, pastas compartilhadas?",
        "Qual o tipo de processo mais volumoso?",
        "Quanto tempo leva pra produzir uma peça hoje?"
      ],
      sucesso: "Redução de tempo por peça, padronização, menos dependência de sênior",
      erros: ["Prometer IA que 'pensa como advogado'", "Não entender taxonomia de processos"],
      proximoPasso: "Agendar análise de amostra de processos"
    }
  };

  const activeProduct = products[activeTab];

  return (
    <AppLayout>
      <PageHero
        emoji="🧩"
        title="Produtos"
        subtitle="Produto é consequência do diagnóstico. Quem prescreve antes de perguntar, perde."
      />

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {(["vision", "finance", "legal"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-6 py-3 rounded-lg font-medium transition-all duration-200",
              activeTab === tab
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
          >
            {products[tab].name}
          </button>
        ))}
      </div>

      <div className="space-y-4 max-w-4xl">
        <ContentBlock title="A) Quando vender (ICP)">
          <p className="text-foreground">{activeProduct.icp}</p>
        </ContentBlock>

        <ContentBlock title="B) Dores típicas">
          <ul className="space-y-2">
            {activeProduct.dores.map((dor, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                <span>{dor}</span>
              </li>
            ))}
          </ul>
        </ContentBlock>

        <ContentBlock title="C) Pitch de 1 frase">
          <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
            <p className="text-lg font-semibold text-foreground italic">"{activeProduct.pitch}"</p>
          </div>
        </ContentBlock>

        <ContentBlock title="D) Perguntas que definem fit">
          <ul className="space-y-2">
            {activeProduct.perguntas.map((pergunta, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-medium flex items-center justify-center flex-shrink-0">
                  {index + 1}
                </span>
                <span>{pergunta}</span>
              </li>
            ))}
          </ul>
        </ContentBlock>

        <ContentBlock title="E) O que medir como sucesso">
          <p className="text-foreground font-medium">{activeProduct.sucesso}</p>
        </ContentBlock>

        <ContentBlock title="F) Erros comuns ao vender">
          <ul className="space-y-2">
            {activeProduct.erros.map((erro, index) => (
              <li key={index} className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                <span className="text-red-500 font-bold">✗</span>
                <span className="text-red-800">{erro}</span>
              </li>
            ))}
          </ul>
        </ContentBlock>

        <ContentBlock title="G) Próximo passo padrão">
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-green-800 font-medium">{activeProduct.proximoPasso}</p>
          </div>
        </ContentBlock>
      </div>
    </AppLayout>
  );
};

export default ProdutosPage;
