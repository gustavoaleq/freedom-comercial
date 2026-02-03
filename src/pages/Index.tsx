import { playbookSections } from "@/data/playbookData";
import { PlaybookCard } from "@/components/home/PlaybookCard";
import { AppLayout } from "@/components/layout/AppLayout";

const Index = () => {
  return (
    <AppLayout>
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Playbook Comercial — Freedom AI
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Guia estratégico completo de processos, diretrizes e cultura de vendas. 
          Tudo o que você precisa para excelência comercial em um só lugar.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {playbookSections.map((section) => (
          <PlaybookCard
            key={section.id}
            title={section.title}
            subtitle={section.subtitle}
            icon={section.icon}
            iconColor={section.iconColor}
            route={section.route}
          />
        ))}
      </div>
    </AppLayout>
  );
};

export default Index;
