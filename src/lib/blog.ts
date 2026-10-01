export type PostSection = { heading: string; paragraphs: string[] };

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  serviceHref: string;
  serviceLabel: string;
  sections: PostSection[];
};

export const posts: Post[] = [
  {
    slug: "quanto-custa-criar-um-mvp",
    title: "Quanto custa criar um MVP?",
    description:
      "O que muda o custo de um MVP: recorte, plataforma, backend e o que fica de fora da primeira versão.",
    date: "2026-09-30",
    serviceHref: "/mvp-para-startups",
    serviceLabel: "desenvolvimento de MVP para startups",
    sections: [
      {
        heading: "Não existe um preço único",
        paragraphs: [
          "Um MVP é a primeira versão que alguém consegue usar para testar a ideia. O custo muda com o tamanho desse recorte, não com o tamanho do sonho.",
          "A Startups Lab não publica uma tabela. O orçamento sai depois de entender o que entra nessa versão e o que fica para depois.",
        ],
      },
      {
        heading: "O que costuma pesar",
        paragraphs: [
          "Uma tela que só explica a ideia custa menos do que um fluxo em que a pessoa cria conta, grava um dado e volta no dia seguinte. Pagamento, mais de um tipo de usuário e integração com um sistema que já existe aumentam o escopo.",
          "Aplicativo nas duas lojas, sistema no navegador ou os dois também mudam o trabalho. Dá para lançar em um formato e deixar o outro para quando a primeira versão ensinar alguma coisa.",
        ],
      },
      {
        heading: "O que deixar de fora",
        paragraphs: [
          "Painel completo, vários planos, notificações e o desenho de cada exceção podem esperar. Se ninguém usou o caminho principal, o resto é especulação.",
          "Um bom recorte cabe numa frase: a pessoa entra, faz uma coisa e sai com um resultado. Tudo que não serve a essa frase é candidato a ficar de fora.",
        ],
      },
      {
        heading: "Como pedir um orçamento útil",
        paragraphs: [
          "Chega com o problema e com quem usaria. Não precisa de especificação. Na primeira conversa a gente devolve o que entraria na versão e o que ficaria registrado para a evolução.",
        ],
      },
    ],
  },
  {
    slug: "quanto-custa-criar-um-aplicativo",
    title: "Quanto custa desenvolver um aplicativo em 2026?",
    description:
      "O que altera o custo de um aplicativo Android e iOS: lojas, backend, MVP e integrações. Sem tabela inventada.",
    date: "2026-09-30",
    serviceHref: "/desenvolvimento-de-aplicativos",
    serviceLabel: "desenvolvimento de aplicativos",
    sections: [
      {
        heading: "O número depende do aplicativo, não do ano",
        paragraphs: [
          "Em 2026 o que muda o orçamento continua sendo o mesmo: quantas telas o uso principal precisa, se há conta e dados no servidor, e se o app fala com pagamento, mapa ou um sistema da empresa.",
          "Não publicamos um valor fechado. Um app que mostra informação custa outro patamar de um app em que a pessoa cria, edita e compartilha alguma coisa todo dia.",
        ],
      },
      {
        heading: "Android, iOS ou os dois",
        paragraphs: [
          "Publicar nas duas lojas faz parte de um produto que quer estar no bolso de qualquer cliente. Dá para começar por uma, quando o público está concentrado, e abrir a outra loja na versão seguinte.",
          "React Native ou Flutter entram quando uma base de código encurta o caminho sem prender o produto. A escolha é do projeto, não uma preferência fixa da casa.",
        ],
      },
      {
        heading: "O que quase todo app precisa e o orçamento esquece",
        paragraphs: [
          "Conta de desenvolvedor, ficha da loja, política de privacidade e um jeito de atualizar o app depois do lançamento. Backend, se o dado não pode morar só no celular.",
          "Manutenção não é um extra surpresa: a loja muda regra, o sistema operacional muda, e o primeiro uso mostra o que travou.",
        ],
      },
      {
        heading: "Começar pelo MVP do aplicativo",
        paragraphs: [
          "A primeira versão cobre o uso que prova a ideia. O restante fica escrito, para não se perder, e entra quando houver gente usando.",
        ],
      },
    ],
  },
  {
    slug: "como-validar-uma-ideia",
    title: "Como validar uma ideia de aplicativo antes de investir?",
    description:
      "Como recortar uma ideia de aplicativo ou startup antes de construir o produto inteiro.",
    date: "2026-09-30",
    serviceHref: "/mvp-para-startups",
    serviceLabel: "MVP para startups",
    sections: [
      {
        heading: "Validar é ver alguém usar, não ouvir um elogio",
        paragraphs: [
          "Uma ideia parece sólida na conversa e frágil no uso. Validar é colocar na mão de uma pessoa real o menor fluxo que representa o produto, e observar se ela volta.",
          "Pesquisa ajuda a escolher o problema. Não substitui a versão que a pessoa abre sozinha.",
        ],
      },
      {
        heading: "O que desenvolver primeiro",
        paragraphs: [
          "Uma ação. Se o produto marca horário, a primeira versão marca horário. Se cobra, a primeira versão cobra de um jeito simples. Cadastro elaborado, ranking e área de configurações esperam.",
          "Escreva o que fica de fora com a mesma clareza do que entra. É isso que impede o MVP de virar o produto inteiro com outro nome.",
        ],
      },
      {
        heading: "Protótipo e primeira versão",
        paragraphs: [
          "Um protótipo serve para alinhar o fluxo antes de escrever o sistema. A versão no ar serve para aprender com uso de verdade: conta, dado e o erro que só aparece fora do Figma.",
          "Os dois têm lugar. Parar no protótipo deixa a dúvida principal sem resposta: a pessoa usaria de novo amanhã?",
        ],
      },
      {
        heading: "Quando faz sentido chamar um time",
        paragraphs: [
          "Quando o problema está claro e falta quem desenhe o recorte e construa a primeira versão. Não é preciso chegar com especificação, marca ou uma empresa de tecnologia montada.",
        ],
      },
    ],
  },
  {
    slug: "quanto-custa-criar-um-saas",
    title: "Quanto custa desenvolver um SaaS?",
    description:
      "O que entra no custo de um SaaS: MVP, cadastro, planos, pagamento, painel e multiusuário.",
    date: "2026-09-30",
    serviceHref: "/desenvolvimento-de-saas",
    serviceLabel: "desenvolvimento de SaaS",
    sections: [
      {
        heading: "SaaS não é só um site com login",
        paragraphs: [
          "Um SaaS é um produto que várias pessoas ou empresas assinam. O custo sobe com a quantidade de papéis, planos e regras do tipo “este plano pode, aquele não”.",
          "Não há um preço de prateleira. Dois produtos com a mesma cara podem ter orçamentos distantes se um só lista dados e o outro cobra, convida time e separa o que cada empresa enxerga.",
        ],
      },
      {
        heading: "O que a primeira versão precisa ter",
        paragraphs: [
          "Cadastro, login, um plano e a tarefa pela qual alguém pagaria. Painel para operar clientes. Cobrança ligada ao que a conta pode fazer.",
          "Vários planos, nota fiscal, white-label e aplicativo nativo podem esperar até existir o primeiro cliente no fluxo simples.",
        ],
      },
      {
        heading: "Backend e infraestrutura não são fase dois",
        paragraphs: [
          "Os dados do cliente, a permissão e o estado da assinatura moram no servidor. Sem isso, a tela é um protótipo. O ambiente em que o produto fica no ar entra no mesmo escopo da primeira versão.",
        ],
      },
      {
        heading: "Como comparar propostas",
        paragraphs: [
          "Peça o que está dentro e o que está fora: lojas, pagamento, papéis de usuário, painel e o que acontece depois do lançamento. Um número menor que omite a cobrança não é um SaaS mais barato. É outro escopo.",
        ],
      },
    ],
  },
  {
    slug: "react-native-ou-flutter",
    title: "React Native ou Flutter: qual escolher para um MVP?",
    description:
      "Como escolher entre React Native e Flutter num MVP de aplicativo, sem tratar a ferramenta como o produto.",
    date: "2026-09-30",
    serviceHref: "/desenvolvimento-de-aplicativos",
    serviceLabel: "desenvolvimento de aplicativos",
    sections: [
      {
        heading: "A escolha é do MVP, não da moda",
        paragraphs: [
          "React Native e Flutter servem para um aplicativo Android e iOS com uma base de código. Os dois publicam nas lojas. Nenhum dos dois dispensa backend quando o dado precisa existir fora do celular.",
          "A Startups Lab trabalha com os dois. A indicação sai do produto: o que a primeira versão faz, e o que ela vai precisar fazer logo depois.",
        ],
      },
      {
        heading: "Quando React Native encaixa",
        paragraphs: [
          "Quando o produto também vive na web em React, ou o time que vai evoluir o app depois já escreve TypeScript. Compartilhar linguagem entre o aplicativo e o painel reduz a troca de contexto.",
          "Módulos nativos existem para câmera, notificação e o que a loja exige. O custo aparece quando o MVP depende de um recurso muito específico do sistema, que precisa de código Swift ou Kotlin ao lado.",
        ],
      },
      {
        heading: "Quando Flutter encaixa",
        paragraphs: [
          "Quando a interface é o centro do MVP e faz diferença desenhar uma vez e ver igual nas duas plataformas. O ecossistema cobre o caminho comum de um app de produto: navegação, formulário, estado.",
          "O mesmo cuidado vale: se o uso principal é uma API do aparelho que muda toda versão de sistema, o recorte precisa assumir uma parte nativa.",
        ],
      },
      {
        heading: "O que não decide",
        paragraphs: [
          "Não decide o logo da ferramenta, nem um benchmark genérico. Decide se o MVP cabe numa base só, se as lojas entram juntas e se alguém vai conseguir evoluir o app depois do lançamento.",
          "Se a dúvida ainda é “app ou sistema no navegador”, a ferramenta móvel é cedo. O recorte vem antes.",
        ],
      },
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export function formatPostDate(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  const months = [
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro",
  ];
  return `${day} de ${months[month - 1]} de ${year}`;
}
