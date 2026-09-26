// Conteúdo institucional em um só lugar.
// ATENÇÃO: números, cases e time abaixo são EXEMPLOS — substitua pelos dados reais da Startups Lab.

export type Stat = { value: number; prefix?: string; suffix?: string; label: string };

export const stats: Stat[] = [
  { value: 120, prefix: "+", label: "Produtos lançados" },
  { value: 8, prefix: "R$ ", suffix: "M", label: "Geridos em mídia" },
  { value: 10, prefix: "+", label: "Anos construindo" },
  { value: 40, prefix: "+", label: "Startups no portfólio" },
];

export type CaseCategory = "apps" | "martech" | "ia" | "startups";

export const caseCategories: { key: CaseCategory | "todos"; label: string }[] = [
  { key: "todos", label: "Todos" },
  { key: "apps", label: "Apps & Softwares" },
  { key: "martech", label: "Marketing" },
  { key: "ia", label: "IA & Automação" },
  { key: "startups", label: "Startups" },
];

export type Case = {
  title: string;
  text: string;
  category: CaseCategory;
  tags: string[];
  image: string;
};

export const cases: Case[] = [
  {
    title: "Marketplace de serviços residenciais",
    text: "Validação com entrevistas e landing page de teste, MVP em oito semanas e um funil de aquisição dos dois lados — clientes e prestadores — para ganhar tração na primeira cidade.",
    category: "startups",
    tags: ["Validação", "MVP", "Marketplace"],
    image: "/images/startups.jpg",
  },
  {
    title: "App de agendamento para rede de clínicas",
    text: "Agenda online, lembretes automáticos e pagamento no app para Android e iOS. As faltas caíram e a recepção ganhou horas livres por semana.",
    category: "apps",
    tags: ["Android & iOS", "Pagamentos", "UX/UI"],
    image: "/images/apps.jpg",
  },
  {
    title: "Geração de demanda para empresa B2B",
    text: "Posicionamento, conteúdo e campanhas de mídia paga com lead scoring automatizado. O time comercial passou a receber menos contatos — e muito mais qualificados.",
    category: "martech",
    tags: ["Mídia paga", "Conteúdo", "Lead scoring"],
    image: "/images/assessoria.jpg",
  },
  {
    title: "Assistente de IA para escritório contábil",
    text: "Um assistente treinado com as rotinas e normas do escritório, respondendo clientes e preparando documentos, integrado aos sistemas que o time já usava.",
    category: "ia",
    tags: ["IA generativa", "Integrações", "Atendimento"],
    image: "/images/ia.jpg",
  },
  {
    title: "SaaS de gestão para academias",
    text: "Da planilha ao produto: descoberta com donos de academia, protótipo clicável e uma plataforma com cobrança recorrente, check-in e painel de retenção de alunos.",
    category: "startups",
    tags: ["SaaS", "Produto", "Recorrência"],
    image: "/images/projeto.jpg",
  },
  {
    title: "Portal do cliente para transportadora",
    text: "Rastreamento de entregas em tempo real, emissão de documentos e abertura de chamados num só lugar, reduzindo ligações para a central de atendimento.",
    category: "apps",
    tags: ["Web", "Integrações", "Logística"],
    image: "/images/software.jpg",
  },
  {
    title: "Atendimento automatizado no WhatsApp",
    text: "Agente de IA para dúvidas, orçamentos e acompanhamento de pedidos, conectado ao estoque e ao CRM de uma rede de lojas de varejo.",
    category: "ia",
    tags: ["WhatsApp", "Agente de IA", "CRM"],
    image: "/images/about-2.jpg",
  },
  {
    title: "Crescimento para e-commerce de moda",
    text: "Testes semanais de criativos, recuperação de carrinho e régua de e-mails. A mídia passou a ser decidida por margem — e não só por clique.",
    category: "martech",
    tags: ["E-commerce", "CRO", "Performance"],
    image: "/images/about-1.jpg",
  },
];

export const team = [
  { role: "Direção executiva", area: "Estratégia" },
  { role: "Operações", area: "Gestão" },
  { role: "Tecnologia", area: "Engenharia" },
  { role: "Marketing & Growth", area: "Performance" },
  { role: "IA & Automação", area: "Dados" },
  { role: "Design UI/UX", area: "Produto" },
  { role: "Design de marca", area: "Criação" },
  { role: "Financeiro", area: "Gestão" },
];

export const values = [
  { title: "Curiosidade", text: "Perguntamos antes de responder. Entender o problema vale mais que a solução pronta." },
  { title: "Evidência", text: "Decisões guiadas por testes e números, não por opinião — nem a nossa." },
  { title: "Transparência", text: "Você vê o que está sendo feito, quanto custa e o que aprendemos no caminho." },
  { title: "Velocidade com cuidado", text: "Entregar rápido, sem deixar para trás qualidade e segurança." },
  { title: "Parceria", text: "Tratamos o seu negócio como se fosse nosso, com a mesma responsabilidade." },
];
