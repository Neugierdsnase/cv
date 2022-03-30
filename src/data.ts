import {
  SkillGroup,
  CvItemsType,
  UnstructuredSection,
} from './types'

const cvJobItems: CvItemsType = {
  heading: 'Berufserfahrung',
  items: [
    {
      heading: 'Projektarbeiten und Freelancing',
      time: 'seit Ende 2018',
      list: [
        {
          label:
            'für sgreening (Webdevelopment & Consulting)',
        },
        {
          label:
            'Porsche Wien Mitte (WordPress-Development & Consulting)',
        },
      ],
      tags: ['frontend', 'consulting', 'other'],
    },
    {
      heading: 'der brutkasten',
      tagLine: 'WordPress & Frontend Developer',
      time: '1.4.2018 - 30.11.2018',
      list: [
        {
          label:
            'WordPress Theme-Programmierung mit altem Legacy Code',
        },
        { label: 'Erstellung eines internen CRM' },
        {
          label:
            'Content- und Businessstrategie aus technischer Perspektive',
        },
      ],
      tags: ['frontend', 'devops/sre'],
    },
    {
      heading: 'Projektarbeiten',
      tagLine: '',
      time: '2008 - 2018',
      list: [
        {
          label:
            'Logo- und Corporatedesign für <a href="https://sgreening.io/">sgreening</a>',
        },
        {
          label:
            'Umsetzen von Audio- und Videoprojekten für Radio Arabella',
        },
        {
          label:
            'Programmieren von Texterstellungstools für das Bezirksamt Hernals',
        },
        {
          label:
            'Mitarbeit an Marketingkonzept für Radio NRJ',
        },
        {
          label:
            'Mitarbeit an TV-Sendungsformat "Brennweite" der FH Wien',
        },
        { label: 'Mitarbeit an Sendungen für Radio NJoy' },
        {
          label:
            'Logo- und Corporatedesign für lectureclips.com <i>(nicht mehr aktiv)',
        },
      ],
      tags: ['non&#8209;tech'],
    },
    {
      heading: 'Bezirksämter 16 & 17 <span></span>',
      tagLine: 'Verwaltungstrafen und Gewerberecht',
      time: 'seit 1.5.2015',
      list: [
        { label: 'gewissenhaftes juristisches Arbeiten' },
        {
          label:
            'enge Zusammenarbeit mit Wirtschaftstreibenden in Funktion als Behörde',
        },
        {
          label:
            'Einsatz in einer Vielzahl von Rechtsmaterien (u.A.: GewO, NAG, LMSVG, AWEG, AuslBG, etc.)',
        },
      ],
      tags: ['non&#8209;tech'],
    },
    {
      heading: 'Magistratsabteilung 35',
      tagLine: 'Einwanderungsverfahren',
      time: '22.12.2012 – 30.04.2015',
      list: [
        {
          label:
            'brisante politische und rechtliche Materie',
        },
        { label: 'herausfordernder Kundenkontakt' },
        { label: 'enormes Arbeitsvolumen' },
      ],
      tags: ['non&#8209;tech'],
    },
    {
      heading: 'diverse Praktika',
      time: '2005 – 2012',
      list: [
        { label: 'Vetoquinol' },
        { label: 'Hausverwaltung Rosenberger' },
        { label: 'Wiener Volkshochschulen' },
        { label: 'Erzdiözese Wien' },
      ],
      tags: ['non&#8209;tech'],
    },
  ],
}

const cvEduItems: CvItemsType = {
  heading: 'Schul- und Berufsausbilungen',
  items: [
    {
      heading: 'FH der WKW',
      time: '09/2015-10/2018',
      tagLine:
        'Studium “Contentproduktion & digitales Medienmanagement”, Abschlussmit Auszeichnung',
      tags: ['non&#8209;tech'],
    },
    {
      heading: 'Magistrat Wien',
      time: '12/2014',
      tagLine:
        'Dienstprüfungskurs und Dienstprüfung <i>(hauptsächlich öffentliches Recht.)</i>',
      tags: ['non&#8209;tech'],
    },
    {
      heading: 'Universität Wien',
      time: '09/2010 – 06/2011',
      tagLine:
        'Katholische Theologie und Latein - Lehramtsstudium',
      tags: ['non&#8209;tech'],
    },
    {
      heading: 'Wirtschaftsuniversität Wien',
      time: '09/2009 – 06/2010',
      tagLine: 'Studium der Betriebswirtschaftslehre',
      tags: ['non&#8209;tech'],
    },
    {
      heading: 'Universität Wien',
      time: '09/2008 – 06/2009',
      tagLine: 'Studium der kath. Fachtheologie',
      tags: ['non&#8209;tech'],
    },
    {
      heading: 'Bundesgymnasium Wien XIX',
      time: '2000-2008',
      tagLine: 'AHS Matura (humanistischer Zweig)',
      tags: ['non&#8209;tech'],
    },
  ],
}

const skills: SkillGroup[] = [
  {
    heading: 'Markup',
    items: [
      { label: 'HTML', level: 3 },
      { label: 'XML', level: 3 },
      { label: 'JSX/TSX', level: 3 },
      { label: 'Markdown', level: 3 },
      { label: 'Pug', level: 3 },
      { label: 'Jinja2', level: 3 },
      { label: 'Handlebars', level: 3 },
    ],
  },
  {
    heading: 'Styles',
    items: [
      { label: 'CSS', level: 3 },
      { label: 'Sass & SCSS', level: 3 },
      { label: 'styled-components & emotionJS)', level: 3 },
      { label: 'Tailwind CSS', level: 3 },
      { label: 'Material UI', level: 3 },
      { label: 'Bootstrap', level: 3 },
    ],
  },
  {
    heading: 'JavaScript',
    items: [
      { label: 'Frontend VanillaJS', level: 3 },
      { label: 'jQuery', level: 3 },
      { label: 'ReactJS', level: 3 },
      { label: 'NodeJS', level: 3 },
      { label: 'ExpressJS', level: 3 },
      { label: 'NextJS', level: 3 },
      { label: 'NestJS', level: 3 },
      { label: 'Svelte', level: 3 },
      { label: 'D3.js', level: 3 },
      { label: 'socketIO', level: 3 },
    ],
  },
  {
    heading: 'Other Things (kind of) I know',
    items: [
      { label: 'Python', level: 3 },
      { label: 'Flask, SQAlchemy + Ecosystem', level: 3 },
      { label: 'Kotlin', level: 3 },
      { label: 'PHP für WordPress', level: 3 },
      { label: 'Rust', level: 3 },
      { label: 'GraphQL', level: 3 },
      { label: 'REST', level: 3 },
      { label: 'Heroku', level: 3 },
      { label: 'Docker', level: 3 },
      { label: 'SQL', level: 3 },
      { label: 'Jira', level: 3 },
      { label: 'Gitlab', level: 3 },
      { label: 'BitBucket', level: 3 },
      { label: 'CypressJS', level: 3 },
      { label: 'SonarQube', level: 3 },
      { label: 'Grafana', level: 3 },
      { label: 'Prometheus', level: 3 },
      { label: 'Sentry', level: 3 },
      { label: 'Lighthouse', level: 3 },
      { label: 'Storybook', level: 3 },
      { label: 'Agile Workflow', level: 3 },
      { label: 'Scrum', level: 3 },
      { label: 'Object-oriented programming', level: 3 },
      { label: 'Test-driven development', level: 3 },
      { label: 'Confluence', level: 3 },
      { label: 'UserZoom', level: 3 },
    ],
  },
  {
    heading: 'persönliche Roadmap',
    items: [
      { label: 'Webassembly mit Rust', level: 3 },
      { label: 'Web3', level: 3 },
    ],
  },
  {
    heading: 'Sprachen',
    items: [
      { label: 'Deutsch <i>(Muttersprache)</i>' },
      {
        label:
          'Englisch <i>(muttersprachliches Niveau)</i>',
      },
      { label: 'Latein <i>(sehr hilfreich)</i>' },
      {
        label:
          'Altgriechisch <i>(noch viel hilfreicher)</i>',
      },
      { label: 'Russisch <i>(A2)</i>' },
    ],
  },
  {
    heading: 'schon wieder verlernte Skills',
    items: [
      { label: 'Adobe After Effects' },
      { label: 'Adobe Illustrator' },
      { label: 'Adobe InDesign' },
      { label: 'Adobe Photoshop' },
      { label: 'Blender 3D' },
      { label: 'Godot' },
    ],
  },
]

const misc: UnstructuredSection = {
  heading: 'Hobbies & Misc',
  text: '(relativ) früher Bitcoininvestor; bei den Vienna Vikings (American Football) gespielt; 40 kg in 7  Monaten abgenommen; Landesmeister in Karate (U14); Videospiele; Crossfit; K-Pop; digitaler Minimalist; mal mehr mal weniger vegan unterwegs;',
}

export default {
  cvJobItems,
  cvEduItems,
  skills,
  misc,
}
