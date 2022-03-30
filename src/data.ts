import _ from 'lodash'
import { CvSectionType, UnstructuredSection } from './types'

const cvJobItems: CvSectionType = {
  heading: 'Berufserfahrung',
  items: [
    {
      label: 'Projektarbeiten und Freelancing',
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
      label: 'der brutkasten',
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
      label: 'Projektarbeiten',
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
      label: 'Bezirksämter 16 & 17 <span></span>',
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
      label: 'Magistratsabteilung 35',
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
      label: 'diverse Praktika',
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

const cvEduItems: CvSectionType = {
  heading: 'Schul- und Berufsausbilungen',
  items: [
    {
      label: 'FH der WKW',
      time: '09/2015-10/2018',
      tagLine:
        'Studium “Contentproduktion & digitales Medienmanagement”, Abschlussmit Auszeichnung',
      tags: ['non&#8209;tech'],
    },
    {
      label: 'Magistrat Wien',
      time: '12/2014',
      tagLine:
        'Dienstprüfungskurs und Dienstprüfung <i>(hauptsächlich öffentliches Recht.)</i>',
      tags: ['non&#8209;tech'],
    },
    {
      label: 'Universität Wien',
      time: '09/2010 – 06/2011',
      tagLine:
        'Katholische Theologie und Latein - Lehramtsstudium',
      tags: ['non&#8209;tech'],
    },
    {
      label: 'Wirtschaftsuniversität Wien',
      time: '09/2009 – 06/2010',
      tagLine: 'Studium der Betriebswirtschaftslehre',
      tags: ['non&#8209;tech'],
    },
    {
      label: 'Universität Wien',
      time: '09/2008 – 06/2009',
      tagLine: 'Studium der kath. Fachtheologie',
      tags: ['non&#8209;tech'],
    },
    {
      label: 'Bundesgymnasium Wien XIX',
      time: '2000-2008',
      tagLine: 'AHS Matura (humanistischer Zweig)',
      tags: ['non&#8209;tech'],
    },
  ],
}

const skills: CvSectionType[] = [
  {
    heading: 'Markup',
    items: [
      { label: 'HTML', level: 5, tags: ['frontend'] },
      {
        label: 'XML/JSON',
        level: 4,
        tags: ['frontend', 'backend'],
      },
      {
        label: 'JSX/TSX',
        level: 4,
        tags: ['frontend', 'backend'],
      },
      { label: 'Markdown', level: 4, tags: ['frontend'] },
      { label: 'Pug', level: 4, tags: ['frontend'] },
      {
        label: 'Jinja2',
        level: 3,
        tags: ['frontend', 'devops/sre'],
      },
      { label: 'Handlebars', level: 2, tags: ['frontend'] },
    ],
  },
  {
    heading: 'Styles',
    items: [
      { label: 'CSS', level: 4, tags: ['frontend'] },
      {
        label: 'Sass & SCSS',
        level: 4,
        tags: ['frontend'],
      },
      {
        label: 'styled-components & emotionJS)',
        level: 5,
        tags: ['frontend'],
      },
      {
        label: 'Tailwind CSS',
        level: 3,
        tags: ['frontend'],
      },
      {
        label: 'Material UI',
        level: 4,
        tags: ['frontend'],
      },
      { label: 'Bootstrap', level: 2, tags: ['frontend'] },
    ],
  },
  {
    heading: 'JavaScript',
    items: [
      {
        label: 'VanillaJS',
        level: 4,
        tags: ['frontend', 'backend'],
      },
      { label: 'jQuery', level: 2, tags: ['frontend'] },
      { label: 'ReactJS', level: 5, tags: ['frontend'] },
      { label: 'NodeJS', level: 3, tags: ['backend'] },
      { label: 'ExpressJS', level: 2, tags: ['backend'] },
      { label: 'NextJS', level: 3, tags: ['frontend'] },
      { label: 'NestJS', level: 3, tags: ['backend'] },
      { label: 'Svelte', level: 3, tags: ['frontend'] },
      { label: 'D3.js', level: 1, tags: ['frontend'] },
      { label: 'socketIO', level: 2, tags: ['backend'] },
      { label: 'ThreeJS', level: 1, tags: ['frontend'] },
    ],
  },
  {
    heading: 'Weiter Skills',
    items: [
      { label: 'Python', level: 3, tags: ['backend'] },
      {
        label: 'Flask, SQAlchemy + Ecosystem',
        level: 2,
        tags: ['backend'],
      },
      { label: 'Kotlin', level: 2, tags: ['backend'] },
      {
        label: 'PHP für WordPress',
        level: 3,
        tags: ['frontend', 'backend'],
      },
      {
        label: 'Rust',
        level: 1,
        tags: ['frontend', 'backend'],
      },
      {
        label: 'GraphQL',
        level: 3,
        tags: ['frontend', 'backend'],
      },
      { label: 'REST', level: 4, tags: ['backend'] },
      { label: 'Heroku', level: 2, tags: ['devops/sre'] },
      { label: 'Docker', level: 2, tags: ['devops/sre'] },
      { label: 'SQL', level: 3, tags: ['backend'] },
      { label: 'Jira', level: 3, tags: ['other'] },
      { label: 'Gitlab', level: 3, tags: ['other'] },
      { label: 'BitBucket', level: 2, tags: ['other'] },
      {
        label: 'CypressJS',
        level: 3,
        tags: ['tech health/monitoring'],
      },
      {
        label: 'SonarQube',
        level: 2,
        tags: ['tech health/monitoring'],
      },
      {
        label: 'Grafana',
        level: 2,
        tags: ['tech health/monitoring'],
      },
      {
        label: 'Prometheus',
        level: 1,
        tags: ['tech health/monitoring'],
      },
      {
        label: 'Sentry',
        level: 2,
        tags: ['tech health/monitoring'],
      },
      {
        label: 'Lighthouse',
        level: 3,
        tags: ['tech health/monitoring'],
      },
      { label: 'Storybook', level: 3, tags: ['frontend'] },
      {
        label: 'Agile Workflow',
        level: 3,
        tags: ['other'],
      },
      { label: 'Scrum', level: 3, tags: ['other'] },
      {
        label: 'Object-oriented programming',
        level: 3,
        tags: ['other'],
      },
      {
        label: 'Test-driven development',
        level: 3,
        tags: ['other'],
      },
      { label: 'Confluence', level: 3, tags: ['other'] },
    ],
  },
  {
    heading: 'persönliche Roadmap',
    items: [
      { label: 'Rust', tags: ['backend'] },
      { label: 'Rust for WebAssembly', tags: ['frontend'] },
      { label: 'Web3', tags: ['frontend'] },
      { label: 'yew', tags: ['frontend'] },
      { label: 'Russisch', tags: ['non&#8209;tech'] },
    ],
  },
  {
    heading: 'Sprachen',
    items: [
      {
        label: 'Deutsch <i>(Muttersprache)</i>',
        tags: ['non&#8209;tech'],
      },
      {
        label:
          'Englisch <i>(muttersprachliches Niveau)</i>',
        tags: ['non&#8209;tech'],
      },
      {
        label: 'Latein <i>(sehr hilfreich)</i>',
        tags: ['non&#8209;tech'],
      },
      {
        label:
          'Altgriechisch <i>(noch viel hilfreicher)</i>',
        tags: ['non&#8209;tech'],
      },
      {
        label: 'Russisch <i>(A2)</i>',
        tags: ['non&#8209;tech'],
      },
    ],
  },
  {
    heading: 'schon wieder verlernte Skills',
    items: [
      {
        label: 'Adobe After Effects',
        tags: ['non&#8209;tech'],
      },
      {
        label: 'Adobe Illustrator',
        tags: ['non&#8209;tech'],
      },
      { label: 'Adobe InDesign', tags: ['non&#8209;tech'] },
      {
        label: 'Adobe Photoshop',
        tags: ['non&#8209;tech'],
      },
      { label: 'Blender 3D', tags: ['non&#8209;tech'] },
      { label: 'Godot', tags: ['non&#8209;tech'] },
    ],
  },
]

const misc: UnstructuredSection = {
  label: 'Hobbies & Misc',
  text: '(relativ) früher Bitcoininvestor; bei den Vienna Vikings (American Football) gespielt; 40 kg in 7  Monaten abgenommen; Landesmeister in Karate (U14); Videospiele; Crossfit; K-Pop; digitaler Minimalist; mal mehr mal weniger vegan unterwegs;',
}

export default {
  cvJobItems,
  cvEduItems,
  skills,
  misc,
}
