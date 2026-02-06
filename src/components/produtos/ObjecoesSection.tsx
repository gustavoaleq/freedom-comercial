import { useState, useMemo } from "react";
import { ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { CopyButton } from "@/components/ui/CopyButton";
import { ContentBlock } from "@/components/ui/ContentBlock";

export const OBJECTION_TAGS = [
  "Preço/ROI",
  "Concorrência",
  "Segurança & Risco",
  "TI/Jurídico/Compliance",
  "Prioridade/Timing",
  "Capacidade interna",
  "Integração/Dados",
  "Mudança & Adoção",
  "Escopo/Complexidade",
  "Confiança/Cases",
] as const;

export type ObjectionTag = (typeof OBJECTION_TAGS)[number];

export interface ExpandedObjection {
  objecao: string;
  resposta: string;
  perguntaDestrava: string;
  impactoNaoTer: string;
  proximoPasso: string;
  tags: ObjectionTag[];
}

interface ObjecoesSectionProps {
  objecoes: ExpandedObjection[];
}

export function ObjecoesSection({ objecoes }: ObjecoesSectionProps) {
  const [search, setSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState<ObjectionTag[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleTag = (tag: ObjectionTag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filtered = useMemo(() => {
    return objecoes.filter((obj) => {
      const matchesSearch =
        !search ||
        [obj.objecao, obj.resposta, obj.perguntaDestrava, obj.impactoNaoTer, obj.proximoPasso]
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => obj.tags.includes(tag));

      return matchesSearch && matchesTags;
    });
  }, [objecoes, search, selectedTags]);

  return (
    <ContentBlock title="9) Objeções comuns + como responder">
      <div className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar objeção, resposta ou palavra-chave..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>

        {/* Tag filters */}
        <div className="flex flex-wrap gap-2">
          {OBJECTION_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={cn(
                "px-3 py-1 rounded-full text-xs font-medium border transition-all",
                selectedTags.includes(tag)
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-muted-foreground border-border hover:border-primary/40"
              )}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="text-xs text-muted-foreground">
          {filtered.length} de {objecoes.length} objeções
        </p>

        {/* Accordion cards */}
        <div className="space-y-3">
          {filtered.map((obj, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-card rounded-xl border border-border overflow-hidden"
              >
                {/* Header */}
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center gap-3 p-4 text-left"
                >
                  <span className="w-8 h-8 rounded-lg bg-muted text-muted-foreground text-sm font-bold flex items-center justify-center flex-shrink-0">
                    💬
                  </span>
                  <p className="text-foreground font-semibold flex-1">{obj.objecao}</p>
                  <div className="flex items-center gap-2">
                    {obj.tags.map((tag) => (
                      <span
                        key={tag}
                        className="hidden md:inline-block px-2 py-0.5 rounded-full text-[10px] font-medium bg-muted text-muted-foreground border border-border"
                      >
                        {tag}
                      </span>
                    ))}
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 text-muted-foreground transition-transform duration-200 flex-shrink-0",
                        isOpen && "rotate-180"
                      )}
                    />
                  </div>
                </button>

                {/* Expanded content */}
                {isOpen && (
                  <div className="px-4 pb-4 pl-[60px] space-y-3">
                    {/* Resposta */}
                    <div className="flex items-start gap-3">
                      <span className="text-primary font-bold">→</span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-xs text-muted-foreground uppercase font-semibold">Resposta</p>
                          <CopyButton text={obj.resposta} className="scale-75 origin-right" />
                        </div>
                        <p className="text-foreground">{obj.resposta}</p>
                      </div>
                    </div>

                    {/* Pergunta que destrava */}
                    <div className="flex items-start gap-3">
                      <span className="text-primary font-bold">?</span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-xs text-muted-foreground uppercase font-semibold">Pergunta que destrava</p>
                          <CopyButton text={obj.perguntaDestrava} className="scale-75 origin-right" />
                        </div>
                        <p className="text-foreground italic">{obj.perguntaDestrava}</p>
                      </div>
                    </div>

                    {/* Impacto de não ter */}
                    <div className="flex items-start gap-3">
                      <span className="text-destructive font-bold">⚠</span>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Impacto de não ter</p>
                        <p className="text-foreground">{obj.impactoNaoTer}</p>
                      </div>
                    </div>

                    {/* Próximo passo */}
                    <div className="flex items-start gap-3">
                      <span className="text-success font-bold">▶</span>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Próximo passo</p>
                        <p className="text-foreground">{obj.proximoPasso}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </ContentBlock>
  );
}
