import { AppLayout } from "@/components/layout/AppLayout";
import { PageHero } from "@/components/ui/PageHero";
import { ContentBlock } from "@/components/ui/ContentBlock";
import { CopyButton } from "@/components/ui/CopyButton";

const ChecklistsPage = () => {
  const checklists = [
    {
      title: "Checklist Pré-Reunião (10 min)",
      content: `☐ Pesquisei a empresa (site, LinkedIn, notícias recentes)
☐ Sei quem vai participar e qual o cargo de cada um
☐ Tenho hipótese de dor baseada no segmento
☐ Preparei 3-5 perguntas de diagnóstico
☐ Testei o link da reunião
☐ Tenho o contexto do que o SDR já qualificou`
    },
    {
      title: "Roteiro Durante a Reunião",
      content: `1. DIAGNÓSTICO (10-15 min)
   - "O que te fez aceitar essa conversa?"
   - "Me conta o processo do início ao fim"
   - "Onde trava? Onde dá mais retrabalho?"

2. IMPACTO DE NÃO TER (5-10 min)
   - "Quanto custa isso por mês?"
   - "O que acontece se nada mudar em 90 dias?"
   - "Se isso estourar, estoura onde?"

3. VIABILIDADE (5-10 min)
   - "Os dados existem? Onde estão?"
   - "Quem é o sponsor? Quem pode vetar?"
   - "Qual o timeline ideal?"

4. PRÓXIMO PASSO (5 min)
   - "Qual o próximo passo?"
   - "Quando fazemos isso?"
   - "Quem é o dono de cada ação?"`
    },
    {
      title: "Checklist Pós-Reunião (CRM obrigatório)",
      content: `☐ Atualizei o card com notas da reunião
☐ Defini próxima atividade com data
☐ Atualizei valor, probabilidade e data de fechamento
☐ Enviei resumo por escrito pro cliente
☐ Agendei próximo passo no calendário
☐ Comuniquei internamente se precisa de suporte técnico`
    },
    {
      title: "Checklist Proposta",
      content: `☐ Dor claramente descrita (nas palavras do cliente)
☐ Impacto quantificado (R$/mês ou % de ganho)
☐ Premissas listadas (volume, dados, escopo)
☐ Cronograma com marcos claros
☐ Investimento com opções (se aplicável)
☐ Próximo passo definido após aceite
☐ ROI / payback calculado`
    },
    {
      title: "Checklist Handoff Implantação",
      content: `☐ Contrato assinado e disponível
☐ Kick-off agendado com cliente
☐ Sponsor e contatos operacionais mapeados
☐ Documentação técnica entregue (acessos, integrações)
☐ Expectativas de prazo alinhadas
☐ Critérios de sucesso definidos
☐ Closer apresentou time de implantação ao cliente`
    }
  ];

  return (
    <AppLayout>
      <PageHero
        emoji="✅"
        title="Checklists"
        subtitle="Checklist não é burocracia. É blindagem contra erro."
      />

      <div className="space-y-4 max-w-4xl">
        {checklists.map((checklist, index) => (
          <ContentBlock 
            key={index}
            title={checklist.title}
            copyable
            copyText={checklist.content}
          >
            <div className="bg-card border border-border rounded-lg p-4 font-mono text-sm">
              <pre className="whitespace-pre-wrap text-foreground">{checklist.content}</pre>
            </div>
          </ContentBlock>
        ))}
      </div>
    </AppLayout>
  );
};

export default ChecklistsPage;
