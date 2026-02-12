import { AppLayout } from "@/components/layout/AppLayout";
import { PageHero } from "@/components/ui/PageHero";
import { ContentBlock } from "@/components/ui/ContentBlock";

import { CalculadoraQualificacaoInbound } from "@/components/qualificacao/CalculadoraQualificacaoInbound";
import { DestinosLeadContatoInicial } from "@/components/qualificacao/DestinosLeadContatoInicial";
import { ArrowRight } from "lucide-react";

const ICPQualificacaoPage = () => {

  return (
    <AppLayout>
      <PageHero
        emoji="🎯"
        title="ICP & Qualificação"
        subtitle="Se você não filtra, você vira call center."
      />

      <div className="space-y-4 max-w-4xl">

        {/* ═══════════════════════════════════════════════════════ */}
        {/* NOVA SEÇÃO: Qualificação de Leads Inbound              */}
        {/* ═══════════════════════════════════════════════════════ */}

        <div className="pt-8 pb-2">
          <h2 className="text-2xl font-bold text-foreground tracking-tight flex items-center gap-3">
            ✅ Qualificação de Leads Inbound (Score + SDR)
          </h2>
          <p className="text-muted-foreground mt-2 leading-relaxed">
            Organizar a entrada e o avanço de leads no funil, priorizar atendimento pelo potencial e intenção real, 
            separar interesse declarado de dor validada e criar dados confiáveis para Marketing + Comercial.
          </p>
        </div>

        {/* 1) Como esse modelo funciona */}
        <ContentBlock title="Como funciona (3 camadas que coexistem)">
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { chip: "Etapa do funil", desc: "Onde o lead está no processo" },
              { chip: "Lead Score", desc: "Potencial estimado (para priorizar)" },
              { chip: "Classificação", desc: "Lead / MQL / SQL — prontidão comercial" },
            ].map((item) => (
              <div key={item.chip} className="p-4 bg-card border border-border rounded-xl text-center">
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-2">
                  {item.chip}
                </span>
                <p className="text-sm text-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-3 italic">
            Essas camadas se complementam e devem coexistir.
          </p>
        </ContentBlock>

        {/* 2) Lead Score */}
        <ContentBlock title="Lead Score (o que é / o que não é)">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="p-4 bg-card border border-border rounded-xl">
              <h4 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wide">✅ Para que o Lead Score é usado</h4>
              <ul className="space-y-2 text-sm text-foreground">
                {[
                  "Ranquear leads dentro da etapa LEAD",
                  "Priorizar atendimento do SDR",
                  "Avaliar qualidade de campanhas",
                  "Comparar canais, produtos e mensagens",
                  "Orientar o contexto inicial do atendimento",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span> {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-4 bg-card border border-border rounded-xl">
              <h4 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wide">🚫 O que o Lead Score NÃO é</h4>
              <ul className="space-y-2 text-sm text-foreground">
                {[
                  "Não valida dor real",
                  "Não substitui conversa humana",
                  "Não bloqueia atendimento",
                  "Não define SQL sozinho",
                  "Não é fonte de verdade absoluta",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <span className="text-muted-foreground mt-0.5">•</span> {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ContentBlock>

        {/* 3) Regra automática */}
        <ContentBlock title="Regra automática de classificação (etapa LEAD)">
          <div className="p-5 bg-primary-weak/40 border-2 border-primary/30 rounded-xl space-y-3">
            <h4 className="font-bold text-foreground">Regra automática (somente na etapa LEAD)</h4>
            <div className="grid gap-2 sm:grid-cols-2">
              <div className="p-3 bg-card rounded-lg border border-border">
                <span className="text-sm font-mono text-foreground">Lead Score &lt; 40</span>
                <span className="mx-2 text-muted-foreground">→</span>
                <span className="font-semibold text-foreground">Classificação: LEAD</span>
              </div>
              <div className="p-3 bg-card rounded-lg border border-border">
                <span className="text-sm font-mono text-foreground">Lead Score ≥ 40</span>
                <span className="mx-2 text-muted-foreground">→</span>
                <span className="font-semibold text-foreground">Classificação: MQL</span>
              </div>
            </div>
          </div>
          <div className="mt-3 space-y-1">
            <p className="text-xs text-muted-foreground italic">
              "O score não muda a etapa do funil. Ele apenas ranqueia e classifica."
            </p>
            <p className="text-xs text-muted-foreground italic">
              "Nenhum lead vira SQL automaticamente pela regra padrão."
            </p>
          </div>
        </ContentBlock>

        {/* 4) Entradas inbound */}
        <ContentBlock title="Entradas inbound e tipos de formulário">
          <div className="p-4 bg-card border border-border rounded-xl">
            <h4 className="font-semibold text-foreground mb-3 text-sm">Tipos de formulários usados</h4>
            <div className="flex gap-3">
              <span className="px-3 py-1.5 rounded-lg bg-muted text-sm font-medium text-foreground">Formulário nativo do Meta</span>
              <span className="px-3 py-1.5 rounded-lg bg-muted text-sm font-medium text-foreground">Typebot</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-3 italic">
            "As respostas do formulário não são fonte de verdade. O SDR valida e corrige quando necessário."
          </p>
        </ContentBlock>

        {/* 5) Destinos do lead em Contato Inicial */}
        <ContentBlock title="Destinos do lead em CONTATO INICIAL (após tentativas e conversa)">
          <DestinosLeadContatoInicial />
        </ContentBlock>

        {/* 6) Calculadora */}
        <ContentBlock title="🧮 Calculadora de Qualificação Inbound (Destino do Lead)">
          <CalculadoraQualificacaoInbound />
        </ContentBlock>

        {/* 7) Mapa do fluxo */}
        <ContentBlock title="Mapa do Fluxo">
          <div className="space-y-4">
            {/* Flow diagram */}
            <div className="flex flex-wrap items-center gap-2 p-5 bg-card border border-border rounded-xl justify-center">
              <div className="px-4 py-2 rounded-lg bg-muted font-semibold text-sm text-foreground text-center">
                LEAD<br />
                <span className="text-xs font-normal text-muted-foreground">(score ranqueia)</span>
              </div>
              <ArrowRight className="w-5 h-5 text-primary flex-shrink-0" />
              <div className="px-4 py-2 rounded-lg bg-muted font-semibold text-sm text-foreground text-center">
                CONTATO INICIAL<br />
                <span className="text-xs font-normal text-muted-foreground">(SDR valida)</span>
              </div>
              <ArrowRight className="w-5 h-5 text-primary flex-shrink-0" />
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "Perdido", color: "bg-orange-500/10 text-orange-600 border-orange-500/20" },
                  { label: "MQL", color: "bg-primary/10 text-primary border-primary/20" },
                  { label: "SQL", color: "bg-green-500/10 text-green-600 border-green-500/20" },
                ].map((s) => (
                  <span key={s.label} className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${s.color}`}>
                    {s.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Etapa QUALIFICADO */}
            <div className="p-4 bg-primary-weak/30 border border-primary/20 rounded-xl">
              <h4 className="font-semibold text-foreground mb-2 text-sm">Etapa QUALIFICADO significa</h4>
              <ul className="space-y-1 text-sm text-foreground">
                <li className="flex items-start gap-2"><span className="text-primary">•</span> O lead passou pela validação do SDR</li>
                <li className="flex items-start gap-2"><span className="text-primary">•</span> Existe dor confirmada</li>
                <li className="flex items-start gap-2"><span className="text-primary">•</span> Existe intenção ou movimento real</li>
                <li className="flex items-start gap-2"><span className="text-primary">•</span> A partir daqui avança para reuniões, proposta e fechamento</li>
              </ul>
            </div>
          </div>
        </ContentBlock>
      </div>
    </AppLayout>
  );
};

export default ICPQualificacaoPage;
