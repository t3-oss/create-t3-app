interface App {
  description: string;
  repoName: string;
  repo: string;
  linkName: string;
  linkExtra?: string;
  link: string;
}

const projects: App[] = [
  {
    description: "OpenBio - Open Source Link in Bio",
    repoName: "vanxh/openbio",
    repo: "https://github.com/vanxh/openbio",
    linkName: "openbio.app",
    link: "https://openbio.app",
  },
  {
    description: "TheNinja-RPG - A free browser-based ninja game",
    repoName: "TheNinjaRPG",
    repo: "https://github.com/MathiasGruber/TheNinjaRPG",
    linkName: "theninja-rpg.com",
    link: "https://www.theninja-rpg.com",
  },
  {
    description: "Create T3 Turbo - T3 Stack using Turborepo",
    repoName: "create-t3-turbo",
    repo: "https://github.com/t3-oss/create-t3-turbo",
    linkName: "create-t3-turbo.vercel.app",
    link: "https://create-t3-turbo.vercel.app/",
  },
  {
    description:
      "T3 turborepo template with biomejs and both shadcn native and web ui",
    repoName: "rajatsandeepsen/t3-turbo-biome",
    repo: "https://github.com/rajatsandeepsen/t3-turbo-biome",
    linkName: "create-t3-turbo.vercel.app",
    link: "https://create-t3-turbo.vercel.app/",
  },
  {
    description: "Zapdos - a QnA app for streamers",
    repoName: "pingdotgg/zapdos",
    repo: "https://github.com/pingdotgg/zapdos",
    linkName: "ask.ping.gg",
    link: "https://ask.ping.gg",
  },

  {
    description:
      "Shoutify - Free, open-source, self-hosted social media management",
    repoName: "techsquidtv/shoutify",
    repo: "https://github.com/TechSquidTV/Shoutify",
    linkName: "shoutify.app",
    link: "https://github.com/TechSquidTV/Shoutify",
    linkExtra: "(coming soon)",
  },

  {
    description:
      "Me3 - Describe yourself in 3 things and share with your friends.",
    repoName: "henriqgoncalvs/me3",
    repo: "https://github.com/henriqgoncalvs/me3",
    linkName: "me3-henriiqueg.vercel.app",
    link: "https://me3-henriiqueg.vercel.app/",
  },

  {
    description: "Josh's personal site",
    repoName: "GentikSolm/imjosh-blog",
    repo: "https://github.com/GentikSolm/imjosh-blog",
    linkName: "imjosh.dev",
    link: "https://imjosh.dev",
  },

  {
    description: "Cal.com - Scheduling infrastructure for absolutely everyone.",
    repoName: "calcom/cal.com",
    repo: "https://github.com/calcom/cal.com",
    linkName: "cal.com",
    link: "https://cal.com",
  },

  {
    description: "My FAQ Page - An FAQ Page generator",
    repoName: "ronanru/myfaq.page",
    repo: "https://github.com/ronanru/myfaq.page",
    linkName: "MyFAQ.page",
    link: "https://myfaq.page",
  },

  {
    description: "Tincy Pics - A tincy wincy image host",
    repoName: "mozzius/tincypics",
    repo: "https://github.com/mozzius/tincypics",
    linkName: "tincy.pics",
    link: "https://tincy.pics",
  },

  {
    description: "Ayanava's Guestbook",
    repoName: "AyanavaKarmakar/Guestbook",
    repo: "https://github.com/AyanavaKarmakar/Guestbook",
    linkName: "guestbook.ayanavakarmakar.software",
    link: "https://guestbook.ayanavakarmakar.software/",
  },

  {
    description: "Slug - URL Shortener",
    repoName: "pheralb/slug",
    repo: "https://github.com/pheralb/slug",
    linkName: "slug.vercel.app",
    link: "https://slug.vercel.app",
  },

  {
    description:
      "AI TTS Donations - FOSS AI Text To Speech service for Streamers.",
    repoName: "mmattDonk/AI-TTS-Donations",
    repo: "https://github.com/mmattDonk/AI-TTS-Donations",
    linkName: "staging.solrock.mmattDonk.com",
    link: "https://staging.solrock.mmattDonk.com",
  },

  {
    description: "The Doom",
    repoName: "moltivie/slug",
    repo: "https://github.com/Moltivie/the-t3-stack",
    linkName: "the-t3-stack.vercel.app",
    link: "https://the-t3-stack.vercel.app",
  },

  {
    description: "Railtrack",
    repoName: "noahflk/railtrack",
    repo: "https://github.com/noahflk/railtrack",
    linkName: "railtrack.flk.li",
    link: "https://railtrack.flk.li",
  },

  {
    description: "KARA Shop - Ecommerce website",
    repoName: "mehrabmp/kara-shop",
    repo: "https://github.com/mehrabmp/kara-shop",
    linkName: "karashop.vercel.app",
    link: "https://karashop.vercel.app/",
  },

  {
    description: "Tauri T3 App - Tauri App using T3 Stack",
    repoName: "tauri-t3-app",
    repo: "https://github.com/AyanavaKarmakar/tauri-t3-app",
    linkName: "tauri-t3-app.docs",
    link: "https://github.com/AyanavaKarmakar/tauri-t3-app#readme",
  },

  {
    description: "Azon - E-Commerce website",
    repoName: "andrewsolonets/Azon-Shop",
    repo: "https://github.com/andrewsolonets/Azon-Shop",
    linkName: "azon-shop.vercel.app",
    link: "https://azon-shop.vercel.app/",
  },

  {
    description: "Analyzemyrepo.com - Useful insights for any GitHub repo",
    repoName: "CrowdDotDev/analyzemyrepo",
    repo: "https://github.com/CrowdDotDev/analyzemyrepo",
    linkName: "analyzemyrepo.com",
    link: "https://analyzemyrepo.com",
  },

  {
    description:
      "Answer Overflow - Discord bot to index help channels into Google",
    repoName: "AnswerOverflow/AnswerOverflow",
    repo: "https://github.com/AnswerOverflow/AnswerOverflow",
    linkName: "answeroverflow.com",
    link: "https://www.answeroverflow.com/",
  },

  {
    description: "CUA - Create an Universal App for web, native and desktop",
    repoName: "chen-rn/CUA",
    repo: "https://github.com/chen-rn/CUA",
    linkName: "cua-demo.vercel.app",
    link: "https://cua-demo.vercel.app/",
  },

  {
    description: "Menufic - Digital menu generator for restaurants",
    repoName: "kaje94/menufic",
    repo: "https://github.com/kaje94/menufic",
    linkName: "menufic.com",
    link: "https://menufic.com",
  },

  {
    description: "Twitter clone - A simple Twitter clone",
    repoName: "AlandSleman/t3-twitter-clone",
    repo: "https://github.com/AlandSleman/t3-twitter-clone",
    linkName: "twitter-clone.kurdmake.com",
    link: "https://twitter-clone.kurdmake.com",
  },

  {
    description:
      "Prisma Editor - A powerful tool to visualize and edit Prisma Schema",
    repoName: "mohammed-bahumaish/prisma-editor",
    repo: "https://github.com/mohammed-bahumaish/prisma-editor",
    linkName: "prisma-editor.up.railway.app",
    link: "https://prisma-editor.up.railway.app",
  },

  {
    description: "Judge devs - website, where developers share their projects",
    repoName: "judge-devs (gh)",
    repo: "https://github.com/serzhan181/judge-devs",
    linkName: "judge-devs.com",
    link: "https://judge-devs.vercel.app/",
  },

  {
    description: "T3 Blog - A Reddit inspired forum website",
    repoName: "leojuriolli7/t3-blog",
    repo: "https://github.com/leojuriolli7/t3-blog",
    linkName: "t3-blog-pi.vercel.app",
    link: "https://t3-blog-pi.vercel.app",
  },

  {
    description: "Checkinout - A checklist management project using T3 Stack",
    repoName: "burak-sevinc/t3-checkinout",
    repo: "https://github.com/burak-sevinc/t3-checkinout",
    linkName: "checkinout.vercel.app",
    link: "https://checkinout.vercel.app/",
  },

  {
    description: "Sozluk Clone - A simple clone of Ekşi Sözlük",
    repoName: "doandroidsdreamof/sozluk-clone",
    repo: "https://github.com/doandroidsdreamof/sozluk-clone",
    linkName: "sozluk-clone.vercel.app",
    link: "https://sozluk-clone.vercel.app",
  },

  {
    description: "Henrique's personal site",
    repoName: "henriqgoncalvs/website",
    repo: "https://github.com/henriqgoncalvs/website",
    linkName: "henriqgoncalvs.com",
    link: "https://henriqgoncalvs.com",
  },

  {
    description: "Code Notes - Takes your notes without any b*llshit",
    repoName: "JungRama/code-notes",
    repo: "https://github.com/JungRama/code-notes",
    linkName: "code-notes-app.vercel.app",
    link: "https://code-notes-app.vercel.app",
  },
  {
    description:
      "Rao.Pics - :electron: 帮助你远程访问 Eagle、Pixcall、Billfish 的素材资源。",
    repoName: "meetqy/rao-pics",
    repo: "https://github.com/meetqy/rao-pics",
    linkName: "rao.pics",
    link: "https://rao.pics",
  },
  {
    description: "eBoto - One-Stop Online Voting Solution",
    repoName: "bricesuazo/eboto",
    repo: "https://github.com/bricesuazo/eboto",
    linkName: "eboto-mo.com",
    link: "https://eboto-mo.com/",
  },
  {
    description:
      "ImprovDB - The ultimate repository for improv games & exercises",
    repoName: "aberonni/improvdb",
    repo: "https://github.com/aberonni/improvdb",
    linkName: "improvdb.com",
    link: "https://improvdb.com/",
  },
  {
    description: "Simple Todo app - with custom auth",
    repoName: "Parthvsquare/t3-todo-mvc",
    repo: "https://github.com/Parthvsquare/t3-todo-mvc",
    linkName: "",
    link: "",
  },
];

export default function OpenSourceAppList({
  descriptionIntl = "Description",
  repoIntl = "Repo",
  linkIntl = "Link",
}: {
  descriptionIntl: string;
  repoIntl: string;
  linkIntl: string;
}) {
  return (
    <table>
      <tr>
        <th>{descriptionIntl}</th>
        <th>{repoIntl}</th>
        <th>{linkIntl}</th>
      </tr>
      {projects.map((project) => (
        <tr>
          <td>{project.description}</td>
          <td>
            <a href={project.repo}>{project.repoName}</a>
          </td>
          <td>
            <a href={project.link}>{project.linkName}</a>
            {project.linkExtra && <span> {project.linkExtra}</span>}
          </td>
        </tr>
      ))}
    </table>
  );
}
