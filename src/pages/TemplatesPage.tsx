import { useState, useMemo } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHero } from "@/components/ui/PageHero";
import { templates, quickFilters, Template } from "@/data/playbookData";
import { CopyButton } from "@/components/ui/CopyButton";
import { Input } from "@/components/ui/input";
import { Search, Filter, X } from "lucide-react";
import { cn } from "@/lib/utils";

const TemplatesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  const [expandedTemplate, setExpandedTemplate] = useState<string | null>(null);

  const filteredTemplates = useMemo(() => {
    return templates.filter((template) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          template.nome.toLowerCase().includes(query) ||
          template.template.toLowerCase().includes(query) ||
          template.quandoUsar.toLowerCase().includes(query) ||
          template.perguntaChave.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Active filters
      for (const [key, value] of Object.entries(activeFilters)) {
        if (key === "tipo" && template.tipo !== value) return false;
        if (key === "canal" && !template.canal.includes(value as any)) return false;
        if (key === "etapa" && template.etapa !== value) return false;
        if (key === "objetivo" && template.objetivo !== value) return false;
      }

      return true;
    });
  }, [searchQuery, activeFilters]);

  const toggleFilter = (filter: { label: string; filter: Record<string, string> }) => {
    const filterKey = Object.keys(filter.filter)[0];
    const filterValue = Object.values(filter.filter)[0];

    if (activeFilters[filterKey] === filterValue) {
      const newFilters = { ...activeFilters };
      delete newFilters[filterKey];
      setActiveFilters(newFilters);
    } else {
      setActiveFilters({ ...activeFilters, [filterKey]: filterValue });
    }
  };

  const clearFilters = () => {
    setActiveFilters({});
    setSearchQuery("");
  };

  const getTypeColor = (tipo: string) => {
    switch (tipo) {
      case "SDR": return "bg-blue-100 text-blue-700";
      case "BDR": return "bg-purple-100 text-purple-700";
      case "Closer": return "bg-green-100 text-green-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <AppLayout>
      <PageHero
        emoji="🧰"
        title="Templates Comerciais"
        subtitle="Biblioteca completa de mensagens, scripts e templates prontos para copiar e usar."
      />

      <div className="max-w-6xl">
        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar templates por nome, texto, pergunta..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-base"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2">
            <span className="flex items-center gap-2 text-sm text-muted-foreground">
              <Filter className="w-4 h-4" />
              Filtros:
            </span>
            {quickFilters.map((filter) => {
              const filterKey = Object.keys(filter.filter)[0];
              const filterValue = Object.values(filter.filter)[0];
              const isActive = activeFilters[filterKey] === filterValue;

              return (
                <button
                  key={filter.label}
                  onClick={() => toggleFilter(filter)}
                  className={cn("filter-chip", isActive && "active")}
                >
                  {filter.label}
                </button>
              );
            })}
            {(Object.keys(activeFilters).length > 0 || searchQuery) && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
                Limpar
              </button>
            )}
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-muted-foreground mb-4">
          {filteredTemplates.length} templates encontrados
        </p>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className={cn(
                "template-card cursor-pointer",
                expandedTemplate === template.id && "ring-2 ring-primary"
              )}
              onClick={() => setExpandedTemplate(expandedTemplate === template.id ? null : template.id)}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{template.nome}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    <span className={cn("px-2 py-0.5 text-xs font-medium rounded", getTypeColor(template.tipo))}>
                      {template.tipo}
                    </span>
                    <span className="px-2 py-0.5 text-xs bg-secondary text-secondary-foreground rounded">
                      {template.etapa}
                    </span>
                    {template.canal.map((c) => (
                      <span key={c} className="px-2 py-0.5 text-xs bg-secondary/50 text-muted-foreground rounded">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
                <div onClick={(e) => e.stopPropagation()}>
                  <CopyButton text={template.template} />
                </div>
              </div>

              {/* Quick info */}
              <p className="text-sm text-muted-foreground mb-2">
                <strong>Quando usar:</strong> {template.quandoUsar}
              </p>

              {/* Expanded content */}
              {expandedTemplate === template.id && (
                <div className="mt-4 pt-4 border-t border-border space-y-4 animate-fade-in">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Pergunta-chave</p>
                    <p className="text-foreground font-medium">{template.perguntaChave}</p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Impacto de não ter</p>
                    <p className="text-foreground">{template.impactoNaoTer}</p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Template</p>
                    <div className="bg-secondary/50 rounded-lg p-3 font-mono text-sm">
                      <pre className="whitespace-pre-wrap text-foreground">{template.template}</pre>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Próximo passo</p>
                    <p className="text-green-700 bg-green-50 px-3 py-2 rounded-lg text-sm">{template.proximoPasso}</p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="text-xs text-muted-foreground">
                      <strong>Tom:</strong> {template.tom}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      <strong>Objetivo:</strong> {template.objetivo}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Nenhum template encontrado com esses filtros.</p>
            <button
              onClick={clearFilters}
              className="mt-2 text-primary hover:underline"
            >
              Limpar filtros
            </button>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default TemplatesPage;
