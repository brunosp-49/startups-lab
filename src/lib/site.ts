export const site = {
  email: "contato@startupslab.com.br",
  phone: "+55 12 98887-0530",
  phoneHref: "tel:+5512988870530",
  whatsapp: "https://wa.me/5512988870530",
  address: {
    city: "São Paulo – SP",
    street: "Av. Paulista, 1000 – Bela Vista",
  },
  social: {
    linkedin: "https://www.linkedin.com/company/startups-lab-br/",
    // instagram: "", // sem conta por enquanto
  },
};

export type NavLink = { href: string; label: string; text: string; image: string };
export type NavItem = NavLink & { children?: NavLink[] };

export const nav: NavItem[] = [
  { href: "/", label: "Início", text: "Da ideia ao produto no ar.", image: "/images/projeto.jpg" },
  {
    href: "/como-funciona",
    label: "Como funciona",
    text: "Descobrir, validar, construir, lançar e evoluir.",
    image: "/images/about-2.jpg",
  },
  {
    href: "/desenvolvimento-de-aplicativos",
    label: "Soluções",
    text: "Aplicativos, software, MVP e o que o produto precisa para ir ao ar.",
    image: "/images/apps.jpg",
    children: [
      { href: "/desenvolvimento-de-aplicativos", label: "Aplicativos", text: "Android, iOS e publicação nas lojas", image: "/images/apps.jpg" },
      { href: "/desenvolvimento-de-software", label: "Software", text: "Sistemas, SaaS, backend e APIs", image: "/images/software.jpg" },
      { href: "/mvp-para-startups", label: "MVP", text: "A primeira versão da ideia", image: "/images/startups.jpg" },
      { href: "/ia-e-automacao", label: "IA & Automação", text: "Quando faz sentido dentro do produto", image: "/images/ia.jpg" },
      { href: "/growth", label: "Growth", text: "Complemento, depois que o produto existe", image: "/images/assessoria.jpg" },
    ],
  },
  { href: "/projetos", label: "Projetos", text: "O que colocamos no ar.", image: "/images/software.jpg" },
  { href: "/sobre", label: "Sobre nós", text: "Um laboratório que constrói produtos.", image: "/images/about-1.jpg" },
  { href: "/contato", label: "Contato", text: "Conte a ideia. Respondemos em até 1 dia útil.", image: "/images/assessoria.jpg" },
];
