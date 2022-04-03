import dayjs from 'dayjs'
import _ from 'lodash'
import {
  CvSectionType,
  SkillSectionType,
} from './types'
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)

const introText: string = `
<p>
Hallo, ich bin der Konstantin. Webentwickler, hauptsächlich Frontend.
</p>
<p>
Mittlerweile habe ich einige Jahre professioneller Arbeit (hauptächlich mit ReactJS) auf dem Buckel und suche zur Zeit nach einer neuen spannenden Herausforderung, die es mir ermöglicht mich weiterzuentwickeln.
</p>
<p>
Ich hoffe, Du findest hier alles, was Du an Informationen brauchst, um zu entscheiden, ob wir gut zusammenpassen. Sollte Dir die Information zu dicht sein kannst du rechts filtern, wonach du suchst. Du kannst dann den für Dich relevanten Teil des Lebenslaufen als PDF speichern. Keine Angst, das ganze Dokument hat eigene Print-Styles und Du wirst Deinen Drucker damit nicht überfordern.
</p>
<p>Wenn Du zu dem Schluss kommen solltest, dass wir uns kennenlernen sollten, dann findest du meine Kontaktdaten im Footer.</p>
`

const cvJobItems: CvSectionType = {
  heading: 'Berufserfahrung',
  items: [
    {
      label: 'willhaben',
      time: {from: dayjs('05/2021', 'MM/YYYY')},
      list: [
        { label: 'als externer Entwickler, aber zu 100% in das Unternehmen eingegliedert' },
        { label: 'meistbesuchte österreichische Website' },
        {
          label:
            'mehrmonatige Erfahrungen in zwei unterschiedlichen Tribes gesammelt',
        },
        {
          label:
            'Wissen vertieft, aber auch verbreitert, teaminterne T-shaped Expertise',
        },
        { label: 'kompletter agiler Workflow' },
        {
          label:
            'diverse interne disziplinübergreifende Weiterbilungen',
        },
        { label: 'gelebte "technical Excellence"' },
      ],
      tags: [
        'frontend',
        'backend',
        'tech&#8239;health',
        'other',
      ],
    },
    {
      label: 'Coding School & Academy Wörthersee',
      time: {from: dayjs('05/2021', 'MM/YYYY')},
      list: [
        {
          label:
            'zweimal den berufbegleitenden Crashkurs Webdevelopment vorbereitet und unterrichtet',
        },
        {
          label:
            'zweimal den HTML & CSS Basics Kurs für den Vollzeitstudiengang unterrichtet',
        },
        {
          label:
            'diverse Projekt- und Abschlussarbeiten benotet',
        },
        {
          label:
            'Abschlussprüfungen als Prüfer vor der FH Kärnten abgenommen',
        },
      ],
      tags: ['frontend', 'consulting', 'other'],
    },
    {
      label: 'Web&Söhne',
      time: {from: dayjs('21.01.2020', 'DD.MM.YYYY')},
      list: [
        {
          label:
            'Greenfield-Project mit UNIQA aufgesetzt und begonnen',
        },
        { label: 'Entwickeln interner Tools' },
        {
          label:
            'diverse kleine Projekte mit Bestandskunden, oft mit Legacy-Code',
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
      label: 'Projektarbeiten und Freelancing',
      time: {from: dayjs('11/2018', 'MM/YYYY')},
      list: [
        {
          label:
            'eigene <a href="https://marketplace.visualstudio.com/items?itemName=KonstantinKovar.classnames-rainbow" target="_blank">VSCode-Extension</a> für atomic-css User',
        },
        {
          label:
            'für Ada - Power Woman (Technical Consulting)',
        },
        {
          label:
            'für sgreening (Webdevelopment & Consulting)',
        },
        {
          label:
            'Porsche Wien Mitte (WordPress-Development & Consulting)',
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
      label: 'der brutkasten',
      tagLine: 'WordPress & Frontend Developer',
      time: {from: dayjs('01.04.2018', 'DD.MM.YYYY'), to: dayjs('30.11.2018', 'DD.MM.YYYY')},
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
      time: {from: dayjs('01/2008', 'MM/YYYY'), to: dayjs('12/2018', 'MM/YYYY')},
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
      label: 'Bezirksämter 16 & 17',
      tagLine: 'Verwaltungstrafen und Gewerberecht',
      time: {from: dayjs('01.05.2015', 'DD.MM.YYYY'), to: dayjs('31.12.2020', 'DD.MM.YYYY')},
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
      time: {from: dayjs('22.12.2012', 'DD.MM.YYYY'), to: dayjs('30.04.2015', 'DD.MM.YYYY')},
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
      time: {from: dayjs('06/2008', 'MM/YYYY'), to: dayjs('12/2012', 'MM/YYYY')},
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
      time: {from: dayjs('09/2015', 'MM/YYYY'), to: dayjs('10/2018', 'MM/YYYY')},
      tagLine:
        'Studium “Contentproduktion & digitales Medienmanagement”, Abschlussmit Auszeichnung',
      tags: ['non&#8209;tech'],
    },
    {
      label: 'Magistrat Wien',
      time: {from: dayjs('12/2014', 'MM/YYYY'), to: dayjs('12/2014', 'MM/YYYY')},
      tagLine:
        'Dienstprüfungskurs und Dienstprüfung <i>(hauptsächlich öffentliches Recht.)</i>',
      tags: ['non&#8209;tech'],
    },
    {
      label: 'Universität Wien',
      time: {from: dayjs('09/2010', 'MM/YYYY'), to: dayjs('06/2011', 'MM/YYYY')},

      tagLine:
        'Katholische Theologie und Latein - Lehramtsstudium',
      tags: ['non&#8209;tech'],
    },
    {
      label: 'Wirtschaftsuniversität Wien',
      time: {from: dayjs('09/2009', 'MM/YYYY'), to: dayjs('06/2010', 'MM/YYYY')},
      tagLine: 'Studium der Betriebswirtschaftslehre',
      tags: ['non&#8209;tech'],
    },
    {
      label: 'Universität Wien',
      time: {from: dayjs('09/2008', 'MM/YYYY'), to: dayjs('06/2009', 'MM/YYYY')},
      tagLine: 'Studium der kath. Fachtheologie',
      tags: ['non&#8209;tech'],
    },
    {
      label: 'Bundesgymnasium Wien XIX',
      time: {from: dayjs('09/2000', 'MM/YYYY'), to: dayjs('06/2008', 'MM/YYYY')},
      tagLine: 'AHS Matura (humanistischer Zweig)',
      tags: ['non&#8209;tech'],
    },
  ],
}

const skills: SkillSectionType = {
  heading: 'Skills',
  items: [
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
          tags: ['frontend'],
        },
        { label: 'Markdown', level: 4, tags: ['frontend'] },
        { label: 'Pug', level: 4, tags: ['frontend'] },
        {
          label: 'Jinja2',
          level: 3,
          tags: ['frontend', 'devops/sre'],
        },
        {
          label: 'Handlebars',
          level: 2,
          tags: ['frontend'],
        },
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
        {
          label: 'Bootstrap',
          level: 2,
          tags: ['frontend'],
        },
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
        {
          label: 'TypeScript',
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
      heading: 'Weitere Skills',
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
          tags: ['tech&#8239;health'],
        },
        {
          label: 'SonarQube',
          level: 2,
          tags: ['tech&#8239;health'],
        },
        {
          label: 'Grafana',
          level: 2,
          tags: ['tech&#8239;health'],
        },
        {
          label: 'Prometheus',
          level: 1,
          tags: ['tech&#8239;health'],
        },
        {
          label: 'Sentry',
          level: 2,
          tags: ['tech&#8239;health'],
        },
        {
          label: 'Lighthouse',
          level: 3,
          tags: ['tech&#8239;health'],
        },
        {
          label: 'Storybook',
          level: 3,
          tags: ['frontend'],
        },
        {
          label: 'Agile Workflow',
          level: 3,
          tags: ['other'],
        },
        { label: 'Scrum', level: 3, tags: ['other'] },
        { label: 'Confluence', level: 3, tags: ['other'] },
      ],
    },
    {
      heading: 'persönliche Roadmap',
      items: [
        { label: 'Rust', tags: ['backend'] },
        {
          label: 'Rust for WebAssembly',
          tags: ['frontend'],
        },
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
        {
          label: 'Adobe InDesign',
          tags: ['non&#8209;tech'],
        },
        {
          label: 'Adobe Photoshop',
          tags: ['non&#8209;tech'],
        },
        { label: 'Blender 3D', tags: ['non&#8209;tech'] },
        { label: 'Godot', tags: ['non&#8209;tech'] },
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
