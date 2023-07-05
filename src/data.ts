import dayjs from 'dayjs'
import _ from 'lodash'
import {
  CvSectionType,
  IntlContentType,
  SkillSectionType,
} from './types'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { DATE_FORMAT } from './constants'
dayjs.extend(customParseFormat)

const introText: IntlContentType<string[]> = {
  de: [
    'Manchmal kann ich gar nicht glauben, dass ich für etwas bezahlt werde, das so viel Spass macht. Ich habe ein unbändiges Verlangen danach, großartige Dinge zu bauen, komplexe Probleme auf einem hohen Niveau zu lösen und neue, schwierige Dinge zu lernen.',
    'Hi. Mein Name ist Konstantin und ddas ist mein interaktiver Lebenslauf. Bitte schau Dich um! Ich hoffe, dass dir die UX, die ich implementiert habe hilft, die Informationen, die Du suchst, schneller zu finden. Falls Du den Lebenslauf ausgedruckt brauchst, dann kannst du das ganz leicht machen, die Seite hat CSS speziell für die gedruckter Version.',
    'Ich bin ein Webentwickler, der gerne in technisch herausforderndere Gefielde vorstoßen würde. Ich habe in der Vergangenheit sowohl an großen, als auch an kleinen Projekten gearbeitet, hauptsächlich im Frontend mit React. Obwohl ich es sehr genieße in diesem Bereich zu arbeiten, werden mein Durst nach etwas Neuem and meine Neugier auf Technologien "näher am Metall" zunehmend lauter.',
    'Aus diesem Grund, und weil ich meine Leistungsbereitschaft derzeit nicht voll ausgeschöpft sehe, suche ich nach neuen Herausforderungen in der Rust Programmiersprache. Idealerweise (aber nicht zwingend), wäre es eine Aufgabe, in der ich auch meine bisherig erlangte Expertise einsetzen kann, was zum Beispiel bei webAssembly der Fall wäre.',
  ],
  en: [
    "Sometimes I can't believe I get paid for something that is so much fun. I have an undying desire to build great things, solve complex problems on a high level and learn new, challenging things.",
    'Hi. My name is Konstantin, and this is my interactive CV. Please have a look around. I hope the UX I have implemented helps you find the information you seek more easily. If you need to print the CV, you can easily do so. The page comes with print styles.',
    'I am a web developer looking to make his way onto technically more challenging and sophisticated waters. I have worked on large and small projects in recent years, mainly on the front end using React. While I like working in this domain, my thirst for learning something new and my curiosity about getting "closer to the metal" has become increasingly harder to ignore. ',
    "This, and because I don't currently see my vigour fully utilized, is why I am looking to take on a new challenge using the Rust programming language. Ideally (not a must), I could also leverage the knowledge I have already gained by working as a web dev, which would, for example, be the case for working with webAssembly.",
  ],
}

const cvJobItems: CvSectionType = {
  heading: { de: 'Berufserfahrung', en: 'Work Experience' },
  items: [
    {
      label: { intl: 'Seatti' },
      time: {
        from: dayjs('07/22', DATE_FORMAT),
        to: dayjs('08/23', DATE_FORMAT),
      },
      list: [
        {
          label: {
            en: 'part of a very early stage startup',
            de: 'Teil eines Startups im sehr früher Stadium',
          },
        },
        {
          label: {
            en: 'integral part of facing challenges of scaling tech, product and team',
            de: 'direkt in der Arbeit an den Herausforderungen eines wachsenden Produkts, Infrastruktur und Teams beteiligt',
          },
        },
        {
          label: {
            en: 'deep insights into other areas of developing a VC-funded startup (Marketing, Sales, Finance, Investor relations)',
            de: 'tiefe Einblicke in die anderen Bereiche eines VC-finanzierten Startups (Marketing, Sales, Finance, Investor Relations)',
          },
        },
      ],
      tags: ['frontend', 'backend', 'tech&#8239;health'],
    },
    {
      label: { intl: 'willhaben' },
      time: {
        from: dayjs('05/21', DATE_FORMAT),
        to: dayjs('04/22', DATE_FORMAT),
      },
      list: [
        {
          label: {
            de: 'formal als externer Entwickler, aber zu 100% in das Unternehmen eingegliedert',
            en: 'formally an external Developer, but 100% integrated within the company',
          },
        },
        {
          label: {
            en: 'most visited Austrian website',
            de: 'meistbesuchte österreichische Website',
          },
        },
        {
          label: {
            en: 'gathered experience in two different tribes for multiple months each',
            de: 'mehrmonatige Erfahrungen in zwei unterschiedlichen Tribes gesammelt',
          },
        },
        {
          label: {
            en: 'knowledge both deepened and broadened, developeped T-shaped expertise',
            de: 'Wissen vertieft, aber auch verbreitert, teaminterne T-shaped Expertise',
          },
        },
        {
          label: {
            en: 'complete agile workflow',
            de: 'kompletter agiler Workflow',
          },
        },
        {
          label: {
            en: 'various internal interdisciplinairy training',
            de: 'diverse interne disziplinübergreifende Weiterbilungen',
          },
        },
        {
          label: {
            en: 'lived "technical excellence"',
            de: 'gelebte "technical Excellence"',
          },
        },
      ],
      tags: [
        'frontend',
        'backend',
        'tech&#8239;health',
        'other',
      ],
    },
    {
      label: { intl: 'Coding School & Academy Wörthersee' },
      time: {
        from: dayjs('05/21', DATE_FORMAT),
        to: dayjs('06/22', DATE_FORMAT),
      },
      list: [
        {
          label: {
            en: 'written, prepared and held web development crash course for part time students twice',
            de: 'zweimal den berufbegleitenden Crashkurs Webdevelopment vorbereitet und unterrichtet',
          },
        },
        {
          label: {
            en: 'written, prepared and held HTML & CSS Course for full-time students twice',
            de: 'zweimal den HTML & CSS Basics Kurs für den Vollzeitstudiengang unterrichtet',
          },
        },
        {
          label: {
            en: 'examination of various (final) projects ',
            de: 'diverse Projekt- und Abschlussarbeiten benotet',
          },
        },
        {
          label: {
            en: 'Examiner for the final exams',
            de: 'Abschlussprüfungen als Prüfer abgenommen',
          },
        },
      ],
      tags: ['frontend', 'consulting', 'other'],
    },
    {
      label: { intl: 'Web&Söhne' },
      time: {
        from: dayjs('01/20', DATE_FORMAT),
        to: dayjs('04/22', DATE_FORMAT),
      },
      list: [
        {
          label: {
            en: 'Green field project with UNIQA initialized and started',
            de: 'Greenfield-Project mit UNIQA aufgesetzt und begonnen',
          },
        },
        {
          label: {
            en: 'development of internal tooling',
            de: 'Entwickeln interner Tools',
          },
        },
        {
          label: {
            en: 'various small projects with existing customers, often with legacy code',
            de: 'diverse kleine Projekte mit Bestandskunden, oft mit Legacy-Code',
          },
        },
      ],
      tags: [
        'frontend',
        'backend',
        'tech&#8239;health',
        'other',
      ],
    },
    {
      label: {
        en: 'Projects & Freelancing',
        de: 'Projektarbeiten & Freelancing',
      },
      time: { from: dayjs('11/18', DATE_FORMAT) },
      list: [
        {
          label: {
            en: 'own <a href="https://marketplace.visualstudio.com/items?itemName=KonstantinKovar.classnames-rainbow" target="_blank">VSCode-Extension</a> for atomic-css users (now deprecated)',
            de: 'eigene <a href="https://marketplace.visualstudio.com/items?itemName=KonstantinKovar.classnames-rainbow" target="_blank">VSCode-Extension</a> für atomic-css User (deprecated)',
          },
        },
        {
          label: {
            en: 'for <a href="https://adapowerwoman.at/">Ada - Power Woman</a> (Technical Consulting)',
            de: 'für <a href="https://adapowerwoman.at/">Ada - Power Woman</a> (Technical Consulting)',
          },
        },
        {
          label: {
            en: 'for <a href="https://sgreening.io/">sgreening</a> (Webdevelopment & Consulting)',
            de: 'für <a href="https://sgreening.io/">sgreening</a> (Webdevelopment & Consulting)',
          },
        },
        {
          label: {
            en: 'Porsche Wien Mitte (WordPress-Development & Consulting)',
            de: 'Porsche Wien Mitte (WordPress-Entwicklung & Consulting)',
          },
        },
      ],
      tags: [
        'frontend',
        'consulting',
        'tech&#8239;health',
        'other',
      ],
    },
    {
      label: { intl: 'der brutkasten' },
      tagLine: {
        de: 'WordPress & Frontend Entwickler',
        en: 'WordPress & Frontend Developer',
      },
      time: {
        from: dayjs('04/18', DATE_FORMAT),
        to: dayjs('11/18', DATE_FORMAT),
      },
      list: [
        {
          label: {
            en: 'WordPress Theme programming with very old legacy code',
            de: 'WordPress Theme-Programmierung mit sehr altem Legacy Code',
          },
        },
        {
          label: {
            en: 'Production of an internal CRM',
            de: 'Erstellung eines internen CRM',
          },
        },
        {
          label: {
            en: 'Content und business strategy from a technical perspective',
            de: 'Content- und Businessstrategie aus technischer Perspektive',
          },
        },
      ],
      tags: ['frontend', 'devops/sre'],
    },
    {
      label: { en: 'Projects', de: 'Projektarbeiten' },
      time: {
        from: dayjs('01/08', DATE_FORMAT),
        to: dayjs('12/18', DATE_FORMAT),
      },
      list: [
        {
          label: {
            en: 'Logo- and corporate design for <a href="https://sgreening.io/">sgreening</a> (meanwhile rebranded)',
            de: 'Logo- und Corporatedesign für <a href="https://sgreening.io/">sgreening</a> (mittlerweile gerebranded)',
          },
        },
        {
          label: {
            en: 'Production of audio and video content for Radio Arabella',
            de: 'Umsetzen von Audio- und Videoprojekten für Radio Arabella',
          },
        },
        {
          label: {
            en: 'Automating most of my work at the district office',
            de: 'Autmatisierung eines Großteils meiner Arbeit am Bezirksamt Hernals',
          },
        },
        {
          label: {
            en: 'Contributions to Marketing Concept for Radio NRJ Austria',
            de: 'Mitarbeit an Marketingkonzept für Radio NRJ Österreich',
          },
        },
        {
          label: {
            en: 'Contributions to TV-Show "Brennweite"',
            de: 'Mitarbeit an TV-Sendungsformat "Brennweite" der FH Wien',
          },
        },
        {
          label: {
            en: 'Contributions to Radio NJoy',
            de: 'Mitarbeit an Sendungen für Radio NJoy',
          },
        },
        {
          label: {
            en: 'Logo- und Corporatedesign für lectureclips.com <i>(not active anymore)</i>',
            de: 'Logo- und Corporatedesign für lectureclips.com <i>(nicht mehr aktiv)</i>',
          },
        },
      ],
      tags: ['non&#8209;tech'],
    },
    {
      label: {
        en: 'District Office',
        de: 'Bezirksämter 16 & 17',
      },
      tagLine: {
        en: 'administrative penalties and trade/business law',
        de: 'Verwaltungstrafen und Gewerberecht',
      },
      time: {
        from: dayjs('05/15', 'MM/YYYY'),
        to: dayjs('12/20', 'MM/YYYY'),
      },
      list: [
        {
          label: {
            en: 'scrupulous legal work',
            de: 'gewissenhaftes juristisches Arbeiten',
          },
        },
        {
          label: {
            en: 'close cooperation with businesses as governmental body',
            de: 'enge Zusammenarbeit mit Wirtschaftstreibenden in Funktion als Behörde',
          },
        },
        {
          label: {
            en: 'confrontation with multiple aspects of applied law',
            de: 'Einsatz in einer Vielzahl von Rechtsmaterien (u.A.: GewO, NAG, LMSVG, AWEG, AuslBG, etc.)',
          },
        },
      ],
      tags: ['non&#8209;tech'],
    },
    {
      label: { intl: 'MA 35' },
      tagLine: {
        en: 'Immigration Office',
        de: 'Einwanderungsverfahren',
      },
      time: {
        from: dayjs('12/12', DATE_FORMAT),
        to: dayjs('04/15', DATE_FORMAT),
      },
      list: [
        {
          label: {
            en: 'politically and legally controversial matter',
            de: 'brisante politische und rechtliche Materie',
          },
        },
        {
          label: {
            en: 'challenging handling of clients',
            de: 'herausfordernder Kundenkontakt',
          },
        },
        {
          label: {
            en: 'enormous workload',
            de: 'enormes Arbeitsvolumen',
          },
        },
      ],
      tags: ['non&#8209;tech'],
    },
    {
      label: {
        en: 'various internships',
        de: 'diverse Praktika',
      },
      time: {
        from: dayjs('06/08', DATE_FORMAT),
        to: dayjs('12/12', DATE_FORMAT),
      },
      list: [
        { label: { intl: 'Vetoquinol' } },
        {
          label: {
            en: 'Property Management Rosenberger',
            de: 'Hausverwaltung Rosenberger',
          },
        },
        { label: { intl: 'Wiener Volkshochschulen' } },
        {
          label: {
            en: 'Archdiocese Vienna',
            de: 'Erzdiözese Wien',
          },
        },
      ],
      tags: ['non&#8209;tech'],
    },
  ],
}

const cvEduItems: CvSectionType = {
  heading: {
    en: 'Education',
    de: 'Schul- und Berufsausbilungen',
  },
  items: [
    {
      label: {
        en: 'University of Applied Sciences for Management & Communication Vienna',
        de: 'FH der WKW',
      },
      time: {
        from: dayjs('09/2015', DATE_FORMAT),
        to: dayjs('10/2018', DATE_FORMAT),
      },
      tagLine: {
        en: 'Content Production & Digital Media Management, graduated with honors',
        de: 'Studium “Contentproduktion & digitales Medienmanagement”, Abschlussmit Auszeichnung',
      },
      tags: ['non&#8209;tech'],
    },
    {
      label: {
        en: 'Municipal department of Vienna',
        de: 'Magistrat Wien',
      },
      time: {
        from: dayjs('12/2014', DATE_FORMAT),
        to: dayjs('12/2014', DATE_FORMAT),
      },
      tagLine: {
        en: 'Service exam of the municipal district of Vienna (mainly public law)',
        de: 'Dienstprüfungskurs und Dienstprüfung <i>(hauptsächlich öffentliches Recht.)</i>',
      },
      tags: ['non&#8209;tech'],
    },
    {
      label: {
        en: 'University of Vienna',
        de: 'Universität Wien',
      },
      time: {
        from: dayjs('09/2010', DATE_FORMAT),
        to: dayjs('06/2011', DATE_FORMAT),
      },
      tagLine: {
        en: 'Catholic Theology and Latin',
        de: 'Katholische Theologie und Latein - Lehramtsstudium',
      },
      tags: ['non&#8209;tech'],
    },
    {
      label: {
        en: 'Vienna University of Economics and Business',
        de: 'Wirtschaftsuniversität Wien',
      },
      time: {
        from: dayjs('09/2009', DATE_FORMAT),
        to: dayjs('06/2010', DATE_FORMAT),
      },
      tagLine: {
        en: 'Economics',
        de: 'Studium der Betriebswirtschaftslehre',
      },
      tags: ['non&#8209;tech'],
    },
    {
      label: {
        en: 'University of Vienna',
        de: 'Universität Wien',
      },
      time: {
        from: dayjs('09/2008', DATE_FORMAT),
        to: dayjs('06/2009', DATE_FORMAT),
      },
      tagLine: {
        en: 'Catholic Theology',
        de: 'Studium der kath. Fachtheologie',
      },
      tags: ['non&#8209;tech'],
    },
    {
      label: {
        en: 'Highschool in Vienna, Austria',
        de: 'Bundesgymnasium Wien XIX',
      },
      time: {
        from: dayjs('09/2000', DATE_FORMAT),
        to: dayjs('06/2008', DATE_FORMAT),
      },
      tagLine: {
        en: 'graduated with Austrian "Matura"',
        de: 'AHS Matura (humanistischer Zweig)',
      },
      tags: ['non&#8209;tech'],
    },
  ],
}

const skills: SkillSectionType = {
  heading: { intl: 'Skills' },
  items: [
    {
      heading: { intl: 'Markup' },
      items: [
        {
          label: { intl: 'HTML' },
          level: 5,
          tags: ['frontend'],
        },
        {
          label: { intl: 'XML/JSON' },
          level: 4,
          tags: ['frontend', 'backend'],
        },
        {
          label: { intl: 'JSX/TSX' },
          level: 5,
          tags: ['frontend'],
        },
        {
          label: { intl: 'Markdown' },
          level: 4,
          tags: ['frontend'],
        },
        {
          label: { intl: 'Pug' },
          level: 4,
          tags: ['frontend'],
        },
        {
          label: { intl: 'Jinja2' },
          level: 2,
          tags: ['frontend', 'devops/sre'],
        },
        {
          label: { intl: 'Handlebars' },
          level: 1,
          tags: ['frontend'],
        },
      ],
    },
    {
      heading: { intl: 'Styles' },
      items: [
        {
          label: { intl: 'CSS' },
          level: 4,
          tags: ['frontend'],
        },
        {
          label: { intl: 'Sass & SCSS' },
          level: 4,
          tags: ['frontend'],
        },
        {
          label: { intl: 'styled-components & emotionJS' },
          level: 4,
          tags: ['frontend'],
        },
        {
          label: { intl: 'Tailwind CSS' },
          level: 5,
          tags: ['frontend'],
        },
        {
          label: { intl: 'Material UI' },
          level: 3,
          tags: ['frontend'],
        },
        {
          label: { intl: 'Bootstrap' },
          level: 2,
          tags: ['frontend'],
        },
      ],
    },
    {
      heading: { intl: 'JavaScript' },
      items: [
        {
          label: { intl: 'VanillaJS' },
          level: 4,
          tags: ['frontend', 'backend'],
        },
        {
          label: { intl: 'TypeScript' },
          level: 4,
          tags: ['frontend', 'backend'],
        },
        {
          label: { intl: 'jQuery' },
          level: 2,
          tags: ['frontend'],
        },
        {
          label: { intl: 'ReactJS' },
          level: 5,
          tags: ['frontend'],
        },
        {
          label: { intl: 'NodeJS' },
          level: 3,
          tags: ['backend'],
        },
        {
          label: { intl: 'ExpressJS' },
          level: 2,
          tags: ['backend'],
        },
        {
          label: { intl: 'NextJS' },
          level: 3,
          tags: ['frontend'],
        },
        {
          label: { intl: 'NestJS' },
          level: 4,
          tags: ['backend'],
        },
        {
          label: { intl: 'MongoDB' },
          level: 3,
          tags: ['backend'],
        },
        {
          label: { intl: 'nx.js' },
          level: 2,
          tags: ['frontend', 'backend'],
        },
        {
          label: { intl: 'svelteJS' },
          level: 4,
          tags: ['frontend'],
        },
        {
          label: { intl: 'yew' },
          level: 2,
          tags: ['frontend'],
        },
        {
          label: { intl: 'D3.js' },
          level: 1,
          tags: ['frontend'],
        },
        {
          label: { intl: 'socketIO' },
          level: 2,
          tags: ['backend'],
        },
        {
          label: { intl: 'ThreeJS' },
          level: 1,
          tags: ['frontend'],
        },
      ],
    },
    {
      heading: { de: 'Weitere Skills', en: 'Other skills' },
      items: [
        {
          label: { intl: 'Python' },
          level: 3,
          tags: ['backend'],
        },
        {
          label: { intl: 'Kotlin' },
          level: 2,
          tags: ['backend'],
        },
        {
          label: { intl: 'Vim' },
          level: 3,
          tags: ['other'],
        },
        {
          label: { intl: 'AI Prompting' },
          level: 3,
          tags: ['other'],
        },
        {
          label: {
            de: 'PHP für WordPress',
            en: 'PHP for WordPress',
          },
          level: 2,
          tags: ['frontend', 'backend'],
        },
        {
          label: {
            de: 'technische SEO',
            en: 'technical SEO',
          },
          level: 3,
          tags: ['frontend', 'backend'],
        },
        {
          label: { intl: 'Rust' },
          level: 2,
          tags: ['frontend', 'backend'],
        },
        {
          label: { intl: 'GraphQL' },
          level: 4,
          tags: ['frontend', 'backend'],
        },
        {
          label: { intl: 'REST' },
          level: 4,
          tags: ['backend'],
        },
        {
          label: { intl: 'Heroku' },
          level: 2,
          tags: ['devops/sre'],
        },
        {
          label: { intl: 'Docker' },
          level: 2,
          tags: ['devops/sre'],
        },
        {
          label: { intl: 'SQL' },
          level: 3,
          tags: ['backend'],
        },
        {
          label: { intl: 'Jira' },
          level: 4,
          tags: ['other'],
        },
        {
          label: { intl: 'git' },
          level: 4,
          tags: ['devops/sre'],
        },
        {
          label: { intl: 'Gitlab' },
          level: 3,
          tags: ['devops/sre', 'other'],
        },
        {
          label: { intl: 'BitBucket' },
          level: 2,
          tags: ['devops/sre', 'other'],
        },
        {
          label: { intl: 'CypressJS' },
          level: 4,
          tags: ['tech&#8239;health'],
        },
        {
          label: { intl: 'SonarQube' },
          level: 2,
          tags: ['tech&#8239;health'],
        },
        {
          label: { intl: 'Grafana' },
          level: 2,
          tags: ['tech&#8239;health'],
        },
        {
          label: { intl: 'Prometheus' },
          level: 1,
          tags: ['tech&#8239;health'],
        },
        {
          label: { intl: 'Sentry' },
          level: 2,
          tags: ['tech&#8239;health'],
        },
        {
          label: { intl: 'Lighthouse' },
          level: 4,
          tags: ['tech&#8239;health'],
        },
        {
          label: { intl: 'Storybook' },
          level: 3,
          tags: ['frontend'],
        },
        {
          label: { intl: 'Agile Workflow' },
          level: 3,
          tags: ['other'],
        },
        {
          label: { intl: 'Scrum' },
          level: 3,
          tags: ['other'],
        },
        {
          label: { intl: 'Confluence' },
          level: 3,
          tags: ['other'],
        },
        {
          label: { intl: 'Notion' },
          level: 3,
          tags: ['other'],
        },
        {
          label: { intl: 'Obsidian' },
          level: 2,
          tags: ['other'],
        },
      ],
    },
    {
      heading: {
        de: 'persönliche Roadmap',
        en: 'personal Roadmap',
      },
      items: [
        { label: { intl: 'Rust' }, tags: ['backend'] },
        {
          label: {
            en: 'Rust for WebAssembly',
            de: 'Rust für WebAssembly',
          },
          tags: ['frontend'],
        },
        {
          label: { intl: 'GameDev with Bevy' },
          tags: ['other'],
        },
        { label: { intl: 'Web3' }, tags: ['frontend'] },
        {
          label: { intl: 'AutoGPT-type stuff' },
          tags: ['other'],
        },
        {
          label: { de: 'Russisch', en: 'Russian' },
          tags: ['non&#8209;tech'],
        },
      ],
    },
    {
      heading: { en: 'Languages', de: 'Sprachen' },
      items: [
        {
          label: {
            en: 'German <i>(First Language)</i>',
            de: 'Deutsch <i>(Muttersprache)</i>',
          },
          tags: ['non&#8209;tech'],
        },
        {
          label: {
            en: 'English <i>(near-native Level)</i>',
            de: 'Englisch <i>(muttersprachliches Niveau)</i>',
          },
          tags: ['non&#8209;tech'],
        },
        {
          label: {
            en: 'Latin <i>(very helpful)</i>',
            de: 'Latein <i>(sehr hilfreich)</i>',
          },
          tags: ['non&#8209;tech'],
        },
        {
          label: {
            en: 'Anchient Greek <i>(even more helpful)</i>',
            de: 'Altgriechisch <i>(noch viel hilfreicher)</i>',
          },
          tags: ['non&#8209;tech'],
        },
        {
          label: {
            en: 'Russian <i>(A2)</i>',
            de: 'Russisch <i>(A2)</i>',
          },
          tags: ['non&#8209;tech'],
        },
      ],
    },
    {
      heading: {
        en: "Skills I haven't used for a long time",
        de: 'lange nicht verwendete Skills',
      },
      items: [
        {
          label: { intl: 'Adobe After Effects' },
          tags: ['non&#8209;tech'],
        },
        {
          label: { intl: 'Adobe Illustrator' },
          tags: ['non&#8209;tech'],
        },
        {
          label: { intl: 'Adobe InDesign' },
          tags: ['non&#8209;tech'],
        },
        {
          label: { intl: 'Adobe Photoshop' },
          tags: ['non&#8209;tech'],
        },
        {
          label: { intl: 'Blender 3D' },
          tags: ['non&#8209;tech'],
        },
        {
          label: { intl: 'Godot' },
          tags: ['non&#8209;tech'],
        },
      ],
    },
  ],
}

export default {
  introText,
  cvJobItems,
  cvEduItems,
  skills,
}
