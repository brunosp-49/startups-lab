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
    instagram: "https://instagram.com/",
    linkedin: "https://linkedin.com/",
  },
};

export type NavLink = { href: string; label: string; text: string; image: string };
export type NavItem = NavLink & { children?: NavLink[] };

export const nav: NavItem[] = [
  { href: "/", label: "Home", text: "Conheça o Lab e as frentes em que atuamos.", image: "/images/projeto.jpg" },
  {
    href: "/sobre",
    label: "Institucional",
    text: "Quem somos, o que já entregamos e como fazer parte.",
    image: "/images/about-1.jpg",
    children: [
      { href: "/sobre", label: "Sobre", text: "Nossa história, propósito e time", image: "/images/about-1.jpg" },
      { href: "/cases", label: "Cases", text: "Projetos que saíram do papel", image: "/images/projeto.jpg" },
      { href: "/carreira", label: "Carreira", text: "Venha construir com a gente", image: "/images/about-2.jpg" },
    ],
  },
  {
    href: "/inovacao",
    label: "O que fazemos",
    text: "Validar, construir e crescer — com um só time.",
    image: "/images/ia.jpg",
    children: [
      { href: "/startups", label: "Startups", text: "Da hipótese à escala", image: "/images/startups.jpg" },
      { href: "/inovacao", label: "Inovação", text: "Marketing, IA e automação", image: "/images/ia.jpg" },
      { href: "/desenvolvimento", label: "Apps & Softwares", text: "Produtos digitais sob medida", image: "/images/apps.jpg" },
    ],
  },
  { href: "/contato", label: "Contate-nos", text: "Conte sua ideia. Respondemos em até 1 dia útil.", image: "/images/assessoria.jpg" },
];
