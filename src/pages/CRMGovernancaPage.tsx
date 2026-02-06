import { AppLayout } from "@/components/layout/AppLayout";
import crmVisaoGeralImg from "@/assets/crm-visao-geral.png";
import { PageHero } from "@/components/ui/PageHero";
import crmTarefasImg from "@/assets/crm-tarefas.png";
import { CopyButton } from "@/components/ui/CopyButton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AlertCircle, CheckCircle2, XCircle, Clock, Calendar, Users, Target, Filter, Shield, AlertTriangle } from "lucide-react";

const CRMGovernancaPage = () => {
  const checklistDiario = `☐ Verificar aba TAREFAS
☐ Zerar vermelho (atrasadas)
☐ Zerar amarelo (sem tarefa)
☐ Repriorizar por Lead Score (SDR)
☐ Atualizar etapa após cada interação relevante`;

  return (
    <AppLayout>
      <PageHero
        emoji="🧱"
        title="CRM & Governança"
        subtitle="CRM é verdade ou fantasia. Aqui é verdade."
      />

      <div className="space-y-4 max-w-4xl">
        <Accordion type="multiple" defaultValue={["visao-geral"]} className="space-y-3">
          
          {/* 1) Visão geral do CRM */}
          <AccordionItem value="visao-geral" className="bg-card border border-border rounded-xl px-4">
            <AccordionTrigger className="text-lg font-semibold text-foreground hover:no-underline">
              <div className="flex items-center gap-3">
                <Target className="w-5 h-5 text-primary" />
                Visão geral do CRM (onde o time vive)
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              <div className="space-y-4">
                <div className="p-4 bg-primary-weak/50 rounded-xl border border-primary/20">
                  <p className="text-foreground font-medium text-lg">
                    Aqui é onde o comercial acontece.
                  </p>
                  <p className="text-foreground mt-2">
                    O menu principal que o time usa no dia a dia é <strong>COMERCIAL</strong>.
                    É nele que você enxerga a esteira inteira, do Lead até o Ganho, e também tudo que está "parado", "andando" e "travado".
                  </p>
                </div>
                
                <div className="p-4 bg-destructive/10 rounded-xl border border-destructive/20">
                  <p className="text-foreground font-bold">
                    Se você não atualiza o CRM, você não vende.
                  </p>
                  <p className="text-muted-foreground mt-1">
                    CRM não é burocracia. É o painel do avião.
                  </p>
                </div>

                {/* Print: Visão geral do CRM */}
                <div className="rounded-xl overflow-hidden border border-border">
                  <img src={crmVisaoGeralImg} alt="Visão geral do CRM — Sidebar com ícone Comercial em destaque" className="w-full h-auto" />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* 2) Esteira de Vendas (SDR/BDR) */}
          <AccordionItem value="esteira-sdr" className="bg-card border border-border rounded-xl px-4">
            <AccordionTrigger className="text-lg font-semibold text-foreground hover:no-underline">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-primary" />
                Esteira de Vendas (SDR/BDR) — passo a passo
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              <div className="space-y-6">
                {/* Etapas visuais */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3">As etapas do SDR/BDR</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Lead", "Contato Inicial", "Qualificado", "Reunião Agendada"].map((stage, index, arr) => (
                      <div key={stage} className="flex items-center gap-2">
                        <div className="px-4 py-2 bg-primary-weak/50 rounded-xl font-medium text-foreground border border-primary/20">
                          {stage}
                        </div>
                        {index < arr.length - 1 && <span className="text-muted-foreground">→</span>}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Passo a passo */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Como o lead se move (passo a passo)</h4>
                  <div className="space-y-4">
                    <div className="p-4 bg-muted/30 rounded-xl border border-border">
                      <p className="font-semibold text-foreground">1. Lead (parado)</p>
                      <p className="text-muted-foreground mt-1">
                        O lead entra e fica em LEAD até alguém agir.<br/>
                        <strong>Não existe lead "se atendendo sozinho".</strong>
                      </p>
                    </div>

                    <div className="p-4 bg-muted/30 rounded-xl border border-border">
                      <p className="font-semibold text-foreground">2. Iniciar Qualificação (botão dentro do card)</p>
                      <p className="text-muted-foreground mt-1">
                        Dentro do card existe o botão <strong>"Iniciar Qualificação"</strong>.<br/>
                        Ao clicar, o CRM:
                      </p>
                      <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                        <li>Move automaticamente o card para <strong>CONTATO INICIAL</strong></li>
                        <li>A partir desse momento é <strong>obrigatório ter tarefa agendada</strong></li>
                      </ul>
                    </div>

                    <div className="p-4 bg-muted/30 rounded-xl border border-border">
                      <p className="font-semibold text-foreground">3. Contato Inicial</p>
                      <p className="text-muted-foreground mt-1">
                        Aqui é a primeira tentativa real de contato.
                      </p>
                      <div className="mt-2 p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                        <p className="text-foreground font-medium text-sm">
                          ⚠️ Regra: sem tarefa agendada = lead morre no escuro.
                        </p>
                      </div>
                    </div>

                    <div className="p-4 bg-muted/30 rounded-xl border border-border">
                      <p className="font-semibold text-foreground">4. Prioridade por Lead Score</p>
                      <p className="text-muted-foreground mt-1">
                        SDR deve atender primeiro <strong>Lead Score mais alto</strong>.<br/>
                        Lead Score ≥ 50 = MQL.<br/>
                        Ou seja: <strong>MQL entra na fila de prioridade</strong>.
                      </p>
                    </div>

                    <div className="p-4 bg-muted/30 rounded-xl border border-border">
                      <p className="font-semibold text-foreground">5. Qualificado (quando vira SQL na prática)</p>
                      <p className="text-muted-foreground mt-1">
                        Quando o SDR move para QUALIFICADO, ele está dizendo:
                      </p>
                      <ul className="mt-2 space-y-1">
                        <li className="flex items-center gap-2 text-foreground">
                          <CheckCircle2 className="w-4 h-4 text-success" />
                          MQL validado (score ≥ 50)
                        </li>
                        <li className="flex items-center gap-2 text-foreground">
                          <CheckCircle2 className="w-4 h-4 text-success" />
                          Produto identificado (qual solução faz sentido)
                        </li>
                        <li className="flex items-center gap-2 text-foreground">
                          <CheckCircle2 className="w-4 h-4 text-success" />
                          Dor clara (dor real, não curiosidade)
                        </li>
                      </ul>
                      <div className="mt-3 p-3 bg-primary-weak/50 rounded-lg border border-primary/20">
                        <p className="text-foreground font-medium text-sm">
                          📌 Definição prática: SQL = MQL validado + produto + dor.
                        </p>
                      </div>
                    </div>

                    <div className="p-4 bg-muted/30 rounded-xl border border-border">
                      <p className="font-semibold text-foreground">6. Reunião Agendada</p>
                      <p className="text-muted-foreground mt-1">
                        Quando o SDR consegue data e hora, move para REUNIÃO AGENDADA.<br/>
                        Deve conter: <strong>nome do closer responsável</strong> e tarefa de confirmação (se aplicável).
                      </p>
                    </div>
                  </div>
                </div>

                {/* Placeholders para prints */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-6 bg-muted/30 rounded-xl border-2 border-dashed border-border text-center">
                    <div className="text-4xl mb-2">🖼️</div>
                    <p className="text-sm text-muted-foreground font-medium">Print: Pipeline SDR/BDR</p>
                    <p className="text-xs text-muted-foreground mt-1 italic">"Lead → Contato Inicial → Qualificado → Reunião Agendada"</p>
                  </div>
                  <div className="p-6 bg-muted/30 rounded-xl border-2 border-dashed border-border text-center">
                    <div className="text-4xl mb-2">🖼️</div>
                    <p className="text-sm text-muted-foreground font-medium">Print: Botão "Iniciar Qualificação"</p>
                    <p className="text-xs text-muted-foreground mt-1 italic">"Clique para mover Lead → Contato Inicial."</p>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* 3) Esteira do Closer */}
          <AccordionItem value="esteira-closer" className="bg-card border border-border rounded-xl px-4">
            <AccordionTrigger className="text-lg font-semibold text-foreground hover:no-underline">
              <div className="flex items-center gap-3">
                <Target className="w-5 h-5 text-primary" />
                Esteira do Closer — passo a passo
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              <div className="space-y-6">
                {/* Etapas visuais */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3">As etapas do Closer</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Reunião Agendada", "Reunião Realizada", "Negociação/Proposta", "Contrato", "Ganho"].map((stage, index, arr) => (
                      <div key={stage} className="flex items-center gap-2">
                        <div className="px-3 py-2 bg-primary-weak/50 rounded-xl font-medium text-foreground text-sm border border-primary/20">
                          {stage}
                        </div>
                        {index < arr.length - 1 && <span className="text-muted-foreground">→</span>}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Passo a passo */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Como o closer opera (o que faz em cada etapa)</h4>
                  <div className="space-y-4">
                    <div className="p-4 bg-muted/30 rounded-xl border border-border">
                      <p className="font-semibold text-foreground">1. Reunião Agendada</p>
                      <p className="text-muted-foreground mt-1">
                        O closer revisa as informações do lead antes da call:
                      </p>
                      <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                        <li>Produto sugerido</li>
                        <li>Dor</li>
                        <li>Contexto</li>
                      </ul>
                      <p className="text-foreground mt-2 font-medium">Objetivo: chegar na reunião com controle.</p>
                    </div>

                    <div className="p-4 bg-muted/30 rounded-xl border border-border">
                      <p className="font-semibold text-foreground">2. Reunião Realizada</p>
                      <p className="text-muted-foreground mt-1">
                        Se a reunião aconteceu, mover para <strong>REUNIÃO REALIZADA</strong>.
                      </p>
                    </div>

                    <div className="p-4 bg-destructive/10 rounded-xl border border-destructive/20">
                      <p className="font-semibold text-foreground flex items-center gap-2">
                        <XCircle className="w-5 h-5 text-destructive" />
                        No-show (regra de retorno para SDR)
                      </p>
                      <p className="text-muted-foreground mt-2">
                        Se não aconteceu:
                      </p>
                      <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                        <li>Alterar a atividade "Reunião" para <strong>NO-SHOW</strong></li>
                        <li>O card deve voltar para <strong>QUALIFICADO</strong></li>
                        <li>A tarefa retorna para o SDR responsável</li>
                      </ul>
                      <p className="text-foreground mt-2 font-medium">
                        Motivo: o SDR retoma, confirma, ajusta e reagenda.
                      </p>
                    </div>

                    <div className="p-4 bg-primary-weak/50 rounded-xl border border-primary/20">
                      <p className="font-semibold text-foreground">3. Negociação/Proposta (campos obrigatórios)</p>
                      <p className="text-muted-foreground mt-1">
                        Ao mover para NEGOCIAÇÃO/PROPOSTA, é <strong>obrigatório preencher</strong>:
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3">
                        {["Produto", "Valor do produto", "Probabilidade", "Data fechamento"].map((field) => (
                          <div key={field} className="p-2 bg-card rounded-lg text-center border border-border">
                            <span className="text-foreground text-sm font-medium">{field}</span>
                          </div>
                        ))}
                      </div>
                      <p className="text-muted-foreground mt-3 text-sm">
                        📌 Probabilidade deve ser definida usando a <strong>Calculadora de Probabilidade</strong> do Playbook (Métricas & Gestão).
                      </p>
                    </div>

                    <div className="p-4 bg-muted/30 rounded-xl border border-border">
                      <p className="font-semibold text-foreground">4. Contrato</p>
                      <p className="text-muted-foreground mt-1">
                        Entrou em fase de formalização (jurídico/assinatura).
                      </p>
                    </div>

                    <div className="p-4 bg-success/10 rounded-xl border border-success/20">
                      <p className="font-semibold text-foreground flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-success" />
                        5. Ganho
                      </p>
                      <p className="text-muted-foreground mt-1">
                        Só marcar GANHO quando o fechamento for real (contrato/PO/OK final conforme regra do time).
                      </p>
                    </div>
                  </div>
                </div>

                {/* Placeholder para print */}
                <div className="p-6 bg-muted/30 rounded-xl border-2 border-dashed border-border text-center">
                  <div className="text-4xl mb-2">🖼️</div>
                  <p className="text-sm text-muted-foreground font-medium">Print: Colunas Reunião Realizada / Negociação-Proposta / Contrato</p>
                  <p className="text-xs text-muted-foreground mt-1 italic">"Closer move o card conforme fatos — não conforme esperança."</p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* 4) Agendamento Automático */}
          <AccordionItem value="agendamento-automatico" className="bg-card border border-border rounded-xl px-4">
            <AccordionTrigger className="text-lg font-semibold text-foreground hover:no-underline">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-primary" />
                Agendamento Automático (Typebot) — regra de ouro
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              <div className="space-y-4">
                <div className="p-4 bg-muted/30 rounded-xl border border-border">
                  <p className="font-semibold text-foreground mb-2">Regra do agendamento automático</p>
                  <p className="text-muted-foreground">
                    Agendamento automático via Typebot acontece <strong>somente para MQL</strong>:
                  </p>
                  <div className="mt-2 p-3 bg-primary-weak/50 rounded-lg border border-primary/20">
                    <p className="text-foreground font-medium">Lead Score ≥ 50</p>
                  </div>
                </div>

                <div className="p-4 bg-muted/30 rounded-xl border border-border">
                  <p className="font-semibold text-foreground mb-2">Rotina do SDR quando entra agendamento automático</p>
                  <p className="text-muted-foreground">
                    Assim que entrar uma reunião agendada:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-2">
                    <li>SDR deve contatar para <strong>confirmar (WhatsApp)</strong></li>
                    <li>
                      <strong>1 hora antes da reunião:</strong><br/>
                      SDR deve mandar WhatsApp com: confirmação + link da reunião
                    </li>
                  </ul>
                </div>

                <div className="p-4 bg-primary-weak/50 rounded-xl border border-primary/20">
                  <p className="text-xl font-bold text-foreground">
                    "Reunião marcada não é reunião confirmada.<br/>
                    Quem confirma, vende."
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* 5) Tarefas */}
          <AccordionItem value="tarefas" className="bg-card border border-border rounded-xl px-4">
            <AccordionTrigger className="text-lg font-semibold text-foreground hover:no-underline">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary" />
                Tarefas: a régua da operação (proibido ficar sem tarefa)
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              <div className="space-y-4">
                <div className="p-4 bg-destructive/10 rounded-xl border border-destructive/20">
                  <p className="font-bold text-foreground text-lg">Regra de ouro</p>
                  <ul className="mt-2 space-y-1">
                    <li className="flex items-center gap-2 text-foreground">
                      <XCircle className="w-4 h-4 text-destructive" />
                      É PROIBIDO ficar sem tarefa agendada.
                    </li>
                    <li className="flex items-center gap-2 text-foreground">
                      <XCircle className="w-4 h-4 text-destructive" />
                      É PROIBIDO ter tarefa atrasada.
                    </li>
                  </ul>
                  <p className="text-muted-foreground mt-3">
                    Sem tarefa, não existe gestão — existe sorte.
                  </p>
                </div>

                <div className="p-4 bg-muted/30 rounded-xl border border-border">
                  <p className="font-semibold text-foreground mb-2">Onde gerir</p>
                  <p className="text-muted-foreground">
                    A gestão do CRM deve acontecer pela aba <strong>TAREFAS</strong>:
                    é ali que mora a lista real do que precisa ser feito.
                  </p>
                </div>

                <div className="p-4 bg-muted/30 rounded-xl border border-border">
                  <p className="font-semibold text-foreground mb-3">Alertas de Tarefa (Gestão Visual)</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { color: "bg-success", label: "Verde", desc: "Tarefa para hoje" },
                      { color: "bg-muted-foreground", label: "Cinza", desc: "Tarefa futura" },
                      { color: "bg-primary", label: "Amarelo", desc: "Sem tarefa" },
                      { color: "bg-destructive", label: "Vermelho", desc: "Tarefa atrasada" }
                    ].map((item) => (
                      <div key={item.label} className="p-4 bg-card rounded-xl border border-border text-center">
                        <div className={`w-8 h-8 ${item.color} rounded-full mx-auto mb-2`} />
                        <p className="font-semibold text-foreground">{item.label}</p>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Print: Tarefas */}
                <div className="rounded-xl overflow-hidden border border-border">
                  <img src={crmTarefasImg} alt="Print da aba Tarefas no CRM — régua da operação" className="w-full h-auto" />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* 6) Forecast */}
          <AccordionItem value="forecast" className="bg-card border border-border rounded-xl px-4">
            <AccordionTrigger className="text-lg font-semibold text-foreground hover:no-underline">
              <div className="flex items-center gap-3">
                <Target className="w-5 h-5 text-primary" />
                Forecast: o que é Setup Pipeline e MRR Pipeline
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              <div className="space-y-4">
                <div className="p-4 bg-muted/30 rounded-xl border border-border">
                  <p className="font-semibold text-foreground mb-2">Definição simples</p>
                  <p className="text-muted-foreground">
                    <strong>Setup Pipeline</strong> e <strong>MRR Pipeline</strong> representam o forecast:
                    é o valor do deal multiplicado pela probabilidade, considerando somente deals com data de fechamento esperada dentro do mês.
                  </p>
                </div>

                <div className="p-4 bg-primary-weak/50 rounded-xl border border-primary/20">
                  <p className="text-foreground font-bold text-lg">
                    Forecast = Valor do produto × Probabilidade
                  </p>
                  <p className="text-muted-foreground mt-1 text-sm">
                    (Filtra apenas fechamentos previstos dentro do mês)
                  </p>
                </div>

                {/* Placeholder para print */}
                <div className="p-6 bg-muted/30 rounded-xl border-2 border-dashed border-border text-center">
                  <div className="text-4xl mb-2">🖼️</div>
                  <p className="text-sm text-muted-foreground font-medium">Print: Cards "Setup Pipeline" e "MRR Pipeline"</p>
                  <p className="text-xs text-muted-foreground mt-1 italic">"Isso é forecast (não é valor cheio, é valor ponderado)."</p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* 7) Criar novo lead */}
          <AccordionItem value="criar-lead" className="bg-card border border-border rounded-xl px-4">
            <AccordionTrigger className="text-lg font-semibold text-foreground hover:no-underline">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-primary" />
                Criar novo lead (padrão mínimo de cadastro)
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              <div className="space-y-4">
                <div className="p-4 bg-muted/30 rounded-xl border border-border">
                  <p className="font-semibold text-foreground mb-2">Passo a passo</p>
                  <p className="text-muted-foreground">
                    Para criar um lead, clicar no botão amarelo no canto superior direito:
                  </p>
                  <div className="mt-3 inline-block px-4 py-2 bg-primary text-primary-foreground rounded-xl font-semibold">
                    + Novo Lead
                  </div>
                </div>

                <div className="p-4 bg-muted/30 rounded-xl border border-border">
                  <p className="font-semibold text-foreground mb-2">Preencher o mínimo obrigatório:</p>
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    {["Nome da empresa", "Nome do contato", "Telefone", "Origem (inbound/outbound/canal)"].map((field) => (
                      <div key={field} className="flex items-center gap-2 text-foreground">
                        <CheckCircle2 className="w-4 h-4 text-success" />
                        {field}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Placeholder para print */}
                <div className="p-6 bg-muted/30 rounded-xl border-2 border-dashed border-border text-center">
                  <div className="text-4xl mb-2">🖼️</div>
                  <p className="text-sm text-muted-foreground font-medium">Print: Botão "+ Novo Lead"</p>
                  <p className="text-xs text-muted-foreground mt-1 italic">"Cadastro mínimo bem feito = follow-up possível."</p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* 8) Filtros e segmentações */}
          <AccordionItem value="filtros" className="bg-card border border-border rounded-xl px-4">
            <AccordionTrigger className="text-lg font-semibold text-foreground hover:no-underline">
              <div className="flex items-center gap-3">
                <Filter className="w-5 h-5 text-primary" />
                Filtros e segmentações (Freedom vs Nalk / inbound vs outbound)
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              <div className="space-y-4">
                <div className="p-4 bg-muted/30 rounded-xl border border-border">
                  <p className="font-semibold text-foreground mb-2">Filtros disponíveis</p>
                  <p className="text-muted-foreground mb-3">Filtrar por:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {["Etapa do funil", "Vendedores", "Origem", "Inbound vs Outbound"].map((filter) => (
                      <div key={filter} className="flex items-center gap-2 text-foreground">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        {filter}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-primary-weak/50 rounded-xl border border-primary/20">
                  <p className="font-semibold text-foreground mb-2">Filtro por produto</p>
                  <p className="text-muted-foreground">
                    <strong>Freedom</strong> e <strong>Nalk</strong>
                  </p>
                  <p className="text-muted-foreground mt-1">
                    A estrutura da esteira é a mesma — muda o produto.
                  </p>
                </div>

                {/* Placeholder para print */}
                <div className="p-6 bg-muted/30 rounded-xl border-2 border-dashed border-border text-center">
                  <div className="text-4xl mb-2">🖼️</div>
                  <p className="text-sm text-muted-foreground font-medium">Print: Área de filtros (etapas / vendedores / origens)</p>
                  <p className="text-xs text-muted-foreground mt-1 italic">"Filtro é para gestão. Use para enxergar gargalo."</p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* 9) Regras de governança */}
          <AccordionItem value="governanca" className="bg-card border border-border rounded-xl px-4">
            <AccordionTrigger className="text-lg font-semibold text-foreground hover:no-underline">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-primary" />
                Regras de governança (proibições + checklist diário)
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              <div className="space-y-4">
                <div className="p-4 bg-destructive/10 rounded-xl border border-destructive/20">
                  <p className="font-bold text-foreground text-lg mb-3">Proibições</p>
                  <ul className="space-y-2">
                    {[
                      "Lead sem tarefa",
                      "Tarefa atrasada",
                      "Mover etapa sem critério",
                      '"Inventar" probabilidade (use a calculadora)',
                      "Deixar lead parado por falta de dono"
                    ].map((proibicao) => (
                      <li key={proibicao} className="flex items-center gap-2 text-foreground">
                        <XCircle className="w-4 h-4 text-destructive" />
                        Proibido {proibicao}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-muted/30 rounded-xl border border-border">
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-bold text-foreground text-lg">Checklist diário do vendedor (SDR e Closer)</p>
                    <CopyButton text={checklistDiario} />
                  </div>
                  <div className="bg-card border border-border rounded-xl p-4 font-mono text-sm">
                    <pre className="whitespace-pre-wrap text-foreground">{checklistDiario}</pre>
                  </div>
                  <p className="text-muted-foreground text-sm mt-3">
                    📌 SDR: 30min manhã / 30min tarde para checklist.
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* 10) Erros comuns */}
          <AccordionItem value="erros-comuns" className="bg-card border border-border rounded-xl px-4">
            <AccordionTrigger className="text-lg font-semibold text-foreground hover:no-underline">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-primary" />
                Erros comuns e como corrigir
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              <div className="space-y-4">
                {[
                  {
                    erro: '"Lead ficou parado"',
                    correcao: "Iniciar qualificação + tarefa na hora."
                  },
                  {
                    erro: '"Reunião agendada mas ninguém confirmou"',
                    correcao: "SDR confirma ao entrar + 1h antes manda link."
                  },
                  {
                    erro: '"Probabilidade chutada"',
                    correcao: "Usar calculadora e preencher evidências."
                  },
                  {
                    erro: '"Negociação sem campos preenchidos"',
                    correcao: "Travar passagem para Negociação/Proposta até preencher produto/valor/probabilidade/data."
                  }
                ].map((item, index) => (
                  <div key={index} className="p-4 bg-muted/30 rounded-xl border border-border">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-destructive/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <AlertCircle className="w-4 h-4 text-destructive" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Erro {index + 1}: {item.erro}</p>
                        <p className="text-muted-foreground mt-1">
                          <strong className="text-success">Correção:</strong> {item.correcao}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

        </Accordion>
      </div>
    </AppLayout>
  );
};

export default CRMGovernancaPage;
