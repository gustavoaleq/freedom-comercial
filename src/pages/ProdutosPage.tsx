import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHero } from "@/components/ui/PageHero";
import { ContentBlock } from "@/components/ui/ContentBlock";
import { CopyButton } from "@/components/ui/CopyButton";
import { cn } from "@/lib/utils";

type ProductTab = "vision" | "finance" | "legal" | "nalk";

interface BaseProduct {
  name: string;
  icp: string;
  dores: string[];
  pitch: string;
  perguntas: string[];
  sucesso: string;
  erros: string[];
  proximoPasso: string;
}

interface NalkProduct {
  name: string;
  subtitle: string;
  description: string;
  idealPara: string[];
  sinaisFortes: string[];
  naoEhFit: string[];
  dores: string[];
  pitch1Frase: string;
  pitch30s: string;
  pitch2min: string;
  perguntasDiagnostico: string[];
  perguntasDados: string[];
  perguntasRotina: string[];
  kpisFunil: string[];
  kpisProdutividade: string[];
  entregaveis: string[];
  erros: string[];
  proximosPasso: string[];
}

const ProdutosPage = () => {
  const [activeTab, setActiveTab] = useState<ProductTab>("vision");

  const baseProducts: Record<Exclude<ProductTab, "nalk">, BaseProduct> = {
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

  const nalkProduct: NalkProduct = {
    name: "Nalk",
    subtitle: "Conecte suas fontes de dados (marketing, vendas e CS) em um único lugar, escolha indicadores e transforme dados em performance.",
    description: "A Nalk se posiciona como plataforma de Revenue Analytics: unifica dados de receita e funil para gerar indicadores, visão única e insights acionáveis para decisões mais rápidas.",
    idealPara: [
      "Empresas com marketing + vendas rodando, mas com dados espalhados (CRM, mídia, automação, planilhas) e decisão \"no escuro\".",
      "Times que precisam de indicadores consistentes e leitura de funil para atacar gargalos (conversão, CAC, produtividade, forecast)."
    ],
    sinaisFortes: [
      "\"Não sabemos qual canal traz cliente bom\"",
      "\"Perco tempo juntando dado em planilha\"",
      "\"Gestão acontece tarde demais (descobre o problema quando já deu ruim)\"",
      "\"Quero um ritual de gestão com números e alertas\""
    ],
    naoEhFit: [
      "Operação sem volume e sem rotina de acompanhamento (cliente quer só 'dashboard bonito')",
      "Empresa sem dono do dado (ninguém sustenta)"
    ],
    dores: [
      "Dados fragmentados entre marketing, vendas e CS (sem visão única).",
      "Gargalos invisíveis no funil (onde cai conversão, onde trava ciclo, onde perde qualidade).",
      "Tempo desperdiçado em planilhas e análises manuais.",
      "ROI/CAC sem clareza (corta errado, escala errado).",
      "Falta de insights acionáveis para decisões rápidas."
    ],
    pitch1Frase: "Nalk unifica dados de marketing, vendas e CS e transforma isso em indicadores e insights para aumentar performance.",
    pitch30s: "Hoje os dados estão espalhados e a gestão vira opinião. A Nalk conecta fontes, organiza indicadores e entrega uma visão clara do funil para você agir rápido nos gargalos.",
    pitch2min: "O problema não é falta de dado, é falta de decisão com evidência. A Nalk centraliza as fontes, padroniza KPIs e acelera a leitura do funil para você cortar desperdício e melhorar conversão com ação objetiva.",
    perguntasDiagnostico: [
      "Onde você está tomando decisão \"no escuro\" hoje?",
      "Qual etapa do funil mais dói (Lead→MQL, MQL→SQL, SQL→Ganho)?",
      "Se nada mudar em 90 dias, o que piora: CAC, receita, produtividade, previsibilidade?"
    ],
    perguntasDados: [
      "Quais fontes vocês têm hoje (CRM, mídia, automação, CS, planilhas)?",
      "Vocês conseguem responder rápido: custo por SQL e por venda por canal?",
      "Quem é o dono do dado e da meta?"
    ],
    perguntasRotina: [
      "Hoje existe ritual semanal de números? Quem participa?",
      "O que precisa virar alerta/monitoramento diário?"
    ],
    kpisFunil: [
      "Conversões por etapa",
      "CAC / ROI por canal",
      "Receita atribuída por origem"
    ],
    kpisProdutividade: [
      "Tempo de resposta / SLA",
      "Performance por time / vendedor (quando aplicável)",
      "Tendências e alertas (quebras de conversão e anomalias)"
    ],
    entregaveis: [
      "Conectar fontes de dados de marketing, vendas e CS em um único lugar.",
      "Seleção/organização de indicadores e painéis.",
      "Insights acionáveis para guiar decisões de performance."
    ],
    erros: [
      "Vender \"dashboard\" em vez de vender decisão + ação + ganho.",
      "Não definir 1 gargalo prioritário → vira projeto infinito.",
      "Não mapear dono do dado → ninguém sustenta uso.",
      "Prometer resultado sem ter fontes minimamente acessíveis/consistentes."
    ],
    proximosPasso: [
      "Diagnóstico rápido: definir gargalo + impacto + fontes de dados existentes.",
      "Mapeamento de fontes: quais sistemas entram primeiro e quem aprova acesso.",
      "Indicadores iniciais: escolher 5–8 KPIs para primeira versão.",
      "Primeiro \"wow\": visão única do funil + 3 insights acionáveis."
    ]
  };

  const tabs: { id: ProductTab; name: string }[] = [
    { id: "vision", name: "Vision" },
    { id: "finance", name: "Finance Core" },
    { id: "legal", name: "Legal Hub" },
    { id: "nalk", name: "Nalk" }
  ];

  const renderBaseProduct = (product: BaseProduct) => (
    <div className="space-y-4 max-w-4xl">
      <ContentBlock title="A) Quando vender (ICP)">
        <p className="text-foreground">{product.icp}</p>
      </ContentBlock>

      <ContentBlock title="B) Dores típicas">
        <ul className="space-y-2">
          {product.dores.map((dor, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
              <span className="text-foreground">{dor}</span>
            </li>
          ))}
        </ul>
      </ContentBlock>

      <ContentBlock title="C) Pitch de 1 frase">
        <div className="p-4 bg-primary-weak/50 rounded-xl border border-primary/20">
          <p className="text-lg font-semibold text-foreground italic">"{product.pitch}"</p>
        </div>
      </ContentBlock>

      <ContentBlock title="D) Perguntas que definem fit">
        <ul className="space-y-2">
          {product.perguntas.map((pergunta, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-lg bg-primary-weak text-foreground text-sm font-medium flex items-center justify-center flex-shrink-0">
                {index + 1}
              </span>
              <span className="text-foreground">{pergunta}</span>
            </li>
          ))}
        </ul>
      </ContentBlock>

      <ContentBlock title="E) O que medir como sucesso">
        <p className="text-foreground font-medium">{product.sucesso}</p>
      </ContentBlock>

      <ContentBlock title="F) Erros comuns ao vender">
        <ul className="space-y-2">
          {product.erros.map((erro, index) => (
            <li key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-xl border border-border">
              <span className="text-muted-foreground font-bold">✗</span>
              <span className="text-foreground">{erro}</span>
            </li>
          ))}
        </ul>
      </ContentBlock>

      <ContentBlock title="G) Próximo passo padrão">
        <div className="p-4 bg-primary-weak/50 rounded-xl border border-primary/20">
          <p className="text-foreground font-medium">{product.proximoPasso}</p>
        </div>
      </ContentBlock>
    </div>
  );

  const renderNalkProduct = () => {
    const perguntasTexto = [
      "Diagnóstico (impacto e decisão)",
      ...nalkProduct.perguntasDiagnostico,
      "",
      "Dados e fontes",
      ...nalkProduct.perguntasDados,
      "",
      "Rotina",
      ...nalkProduct.perguntasRotina
    ].join("\n");

    return (
      <div className="space-y-4 max-w-4xl">
        {/* Header do produto */}
        <div className="p-6 bg-card rounded-2xl border border-border">
          <h2 className="text-2xl font-bold text-foreground mb-2">{nalkProduct.name}</h2>
          <p className="text-lg text-foreground font-medium mb-3">{nalkProduct.subtitle}</p>
          <p className="text-muted-foreground">{nalkProduct.description}</p>
        </div>

        <ContentBlock title="A) Quando vender (ICP / Fit)">
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Ideal para</h4>
              <ul className="space-y-2">
                {nalkProduct.idealPara.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 p-3 bg-success-weak/50 rounded-xl border border-success/20">
                    <span className="text-success font-bold">✓</span>
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Sinais fortes de fit</h4>
              <ul className="space-y-2">
                {nalkProduct.sinaisFortes.map((sinal, index) => (
                  <li key={index} className="flex items-start gap-3 p-3 bg-primary-weak/50 rounded-xl border border-primary/20">
                    <span className="text-primary font-bold">"</span>
                    <span className="text-foreground italic">{sinal}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Não é fit (alerta)</h4>
              <ul className="space-y-2">
                {nalkProduct.naoEhFit.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 p-3 bg-destructive/10 rounded-xl border border-destructive/20">
                    <span className="text-destructive font-bold">⚠</span>
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ContentBlock>

        <ContentBlock title="B) Dores típicas que resolve">
          <ul className="space-y-2">
            {nalkProduct.dores.map((dor, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
                <span className="text-foreground">{dor}</span>
              </li>
            ))}
          </ul>
        </ContentBlock>

        <ContentBlock title="C) Pitch (3 níveis)">
          <div className="space-y-4">
            <div className="p-4 bg-primary-weak/50 rounded-xl border border-primary/20">
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Pitch 1 frase</p>
              <p className="text-lg font-semibold text-foreground italic">"{nalkProduct.pitch1Frase}"</p>
            </div>

            <div className="p-4 bg-card rounded-xl border border-border">
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Pitch 30 segundos</p>
              <p className="text-foreground">{nalkProduct.pitch30s}</p>
            </div>

            <div className="p-4 bg-card rounded-xl border border-border">
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Pitch 2 minutos (para decisor)</p>
              <p className="text-foreground">{nalkProduct.pitch2min}</p>
            </div>
          </div>
        </ContentBlock>

        <ContentBlock title="D) Perguntas que definem fit">
          <div className="space-y-6">
            <div className="flex justify-end">
              <CopyButton text={perguntasTexto} />
            </div>

            <div>
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Diagnóstico (impacto e decisão)</h4>
              <ul className="space-y-2">
                {nalkProduct.perguntasDiagnostico.map((pergunta, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-lg bg-primary-weak text-foreground text-sm font-medium flex items-center justify-center flex-shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-foreground">{pergunta}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Dados e fontes</h4>
              <ul className="space-y-2">
                {nalkProduct.perguntasDados.map((pergunta, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-lg bg-primary-weak text-foreground text-sm font-medium flex items-center justify-center flex-shrink-0">
                      {index + 4}
                    </span>
                    <span className="text-foreground">{pergunta}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Rotina</h4>
              <ul className="space-y-2">
                {nalkProduct.perguntasRotina.map((pergunta, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-lg bg-primary-weak text-foreground text-sm font-medium flex items-center justify-center flex-shrink-0">
                      {index + 7}
                    </span>
                    <span className="text-foreground">{pergunta}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ContentBlock>

        <ContentBlock title="E) O que medir como sucesso (KPIs de prova)">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-card rounded-xl border border-border">
              <h4 className="text-sm font-semibold text-foreground mb-3">Funil e crescimento</h4>
              <ul className="space-y-2">
                {nalkProduct.kpisFunil.map((kpi, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-success mt-2 flex-shrink-0" />
                    <span className="text-foreground text-sm">{kpi}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-4 bg-card rounded-xl border border-border">
              <h4 className="text-sm font-semibold text-foreground mb-3">Produtividade e operação</h4>
              <ul className="space-y-2">
                {nalkProduct.kpisProdutividade.map((kpi, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-success mt-2 flex-shrink-0" />
                    <span className="text-foreground text-sm">{kpi}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ContentBlock>

        <ContentBlock title="F) O que a Nalk entrega (output)">
          <ul className="space-y-2">
            {nalkProduct.entregaveis.map((item, index) => (
              <li key={index} className="flex items-start gap-3 p-3 bg-success-weak/50 rounded-xl border border-success/20">
                <span className="text-success font-bold">→</span>
                <span className="text-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </ContentBlock>

        <ContentBlock title="G) Erros comuns ao vender (antídotos)">
          <ul className="space-y-2">
            {nalkProduct.erros.map((erro, index) => (
              <li key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-xl border border-border">
                <span className="text-muted-foreground font-bold">✗</span>
                <span className="text-foreground">{erro}</span>
              </li>
            ))}
          </ul>
        </ContentBlock>

        <ContentBlock title="H) Próximo passo padrão (para avançar)">
          <div className="space-y-3">
            {nalkProduct.proximosPasso.map((passo, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-primary-weak/50 rounded-xl border border-primary/20">
                <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center flex-shrink-0">
                  {index + 1}
                </span>
                <span className="text-foreground font-medium pt-1">{passo}</span>
              </div>
            ))}
          </div>
        </ContentBlock>
      </div>
    );
  };

  return (
    <AppLayout>
      <PageHero
        emoji="🧩"
        title="Produtos"
        subtitle="Produto é consequência do diagnóstico. Quem prescreve antes de perguntar, perde."
      />

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-6 py-3 rounded-xl font-medium transition-all duration-200 border",
              activeTab === tab.id
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card text-foreground border-border hover:bg-primary-weak hover:border-primary/30"
            )}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {activeTab === "nalk" ? renderNalkProduct() : renderBaseProduct(baseProducts[activeTab])}
    </AppLayout>
  );
};

export default ProdutosPage;
