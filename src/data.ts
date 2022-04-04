import dayjs from 'dayjs'
import _ from 'lodash'
import { CvSectionType, IntlContent, SkillSectionType } from './types'
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)

const introText: IntlContent<string> = {de: `
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
`, en: ``}

const cvJobItems: CvSectionType = {
  heading: {de: 'Berufserfahrung', en: 'Work Experience'},
  items: [
    {
      label: {intl: 'willhaben'},
      time: { from: dayjs('05/2021', 'MM/YYYY') },
      list: [
        {
          label:
            {de: 'als externer Entwickler, aber zu 100% in das Unternehmen eingegliedert', en: 'TODO'},
        },
        { label: {en: "TODO", de: 'meistbesuchte österreichische Website'} },
        {
          label:
            {en: "TODO", de: 'mehrmonatige Erfahrungen in zwei unterschiedlichen Tribes gesammelt'},
        },
        {
          label:
            {en: "TODO", de: 'Wissen vertieft, aber auch verbreitert, teaminterne T-shaped Expertise'},
        },
        { label: {en: "TODO", de: 'kompletter agiler Workflow'} },
        {
          label:
            {en: "TODO", de: 'diverse interne disziplinübergreifende Weiterbilungen'},
        },
        { label: {en: "TODO", de: 'gelebte "technical Excellence"'} },
      ],
      tags: [
        'frontend',
        'backend',
        'tech&#8239;health',
        'other',
      ],
    },
    {
      label: {de: 'Coding School & Academy Wörthersee', en: 'TODO'},
      time: { from: dayjs('05/2021', 'MM/YYYY') },
      list: [
        {
          label:
            {en: "TODO", de: 'zweimal den berufbegleitenden Crashkurs Webdevelopment vorbereitet und unterrichtet'},
        },
        {
          label:
            {en: "TODO", de: 'zweimal den HTML & CSS Basics Kurs für den Vollzeitstudiengang unterrichtet'},
        },
        {
          label:
            {en: "TODO", de: 'diverse Projekt- und Abschlussarbeiten benotet'},
        },
        {
          label:
            {en: "TODO", de: 'Abschlussprüfungen als Prüfer vor der FH Kärnten abgenommen'},
        },
      ],
      tags: ['frontend', 'consulting', 'other'],
    },
    {
      label: {en: "TODO", de: 'Web&Söhne'},
      time: { from: dayjs('21.01.2020', 'DD.MM.YYYY') },
      list: [
        {
          label:
            {en: "TODO", de: 'Greenfield-Project mit UNIQA aufgesetzt und begonnen'},
        },
        { label: {en: "TODO", de: 'Entwickeln interner Tools'} },
        {
          label:
            {en: "TODO", de: 'diverse kleine Projekte mit Bestandskunden, oft mit Legacy-Code'},
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
      label: {en: "TODO", de: 'Projektarbeiten und Freelancing'},
      time: { from: dayjs('11/2018', 'MM/YYYY') },
      list: [
        {
          label:
            {en: "TODO", de: 'eigene <a href="https://marketplace.visualstudio.com/items?itemName=KonstantinKovar.classnames-rainbow" target="_blank">VSCode-Extension</a> für atomic-css User',
        }},
        {
          label:
            {en: "TODO", de: 'für Ada - Power Woman (Technical Consulting)'},
        },
        {
          label:
            {en: "TODO", de: 'für sgreening (Webdevelopment & Consulting)'},
        },
        {
          label:
            {en: "TODO", de: 'Porsche Wien Mitte (WordPress-Development & Consulting)'},
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
      label: {en: "TODO", de: 'der brutkasten'},
      tagLine: {en: "TODO", de: 'WordPress & Frontend Developer'},
      time: {
        from: dayjs('01.04.2018', 'DD.MM.YYYY'),
        to: dayjs('30.11.2018', 'DD.MM.YYYY'),
      },
      list: [
        {
          label:
            {en: "TODO", de: 'WordPress Theme-Programmierung mit altem Legacy Code'},
        },
        { label: {en: "TODO", de: 'Erstellung eines internen CRM'} },
        {
          label:
            {en: "TODO", de: 'Content- und Businessstrategie aus technischer Perspektive'},
        },
      ],
      tags: ['frontend', 'devops/sre'],
    },
    {
      label: {en: "TODO", de: 'Projektarbeiten'},
      time: {
        from: dayjs('01/2008', 'MM/YYYY'),
        to: dayjs('12/2018', 'MM/YYYY'),
      },
      list: [
        {
          label:
            {en: "TODO", de: 'Logo- und Corporatedesign für <a href="https://sgreening.io/">sgreening</a>'},
        },
        {
          label:
            {en: "TODO", de: 'Umsetzen von Audio- und Videoprojekten für Radio Arabella'},
        },
        {
          label:
            {en: "TODO", de: 'Programmieren von Texterstellungstools für das Bezirksamt Hernals'},
        },
        {
          label:
            {en: "TODO", de: 'Mitarbeit an Marketingkonzept für Radio NRJ'},
        },
        {
          label:
            {en: "TODO", de: 'Mitarbeit an TV-Sendungsformat "Brennweite" der FH Wien'},
        },
        { label: {en: "TODO", de: 'Mitarbeit an Sendungen für Radio NJoy'} },
        {
          label:
            {en: "TODO", de: 'Logo- und Corporatedesign für lectureclips.com <i>(nicht mehr aktiv)'},
        },
      ],
      tags: ['non&#8209;tech'],
    },
    {
      label: {en: "TODO", de: 'Bezirksämter 16 & 17'},
      tagLine: {en: "TODO", de: 'Verwaltungstrafen und Gewerberecht'},
      time: {
        from: dayjs('01.05.2015', 'DD.MM.YYYY'),
        to: dayjs('31.12.2020', 'DD.MM.YYYY'),
      },
      list: [
        { label: {en: "TODO", de: 'gewissenhaftes juristisches Arbeiten'} },
        {
          label:
            {en: "TODO", de: 'enge Zusammenarbeit mit Wirtschaftstreibenden in Funktion als Behörde'},
        },
        {
          label:
            {en: "TODO", de: 'Einsatz in einer Vielzahl von Rechtsmaterien (u.A.: GewO, NAG, LMSVG, AWEG, AuslBG, etc.)'},
        },
      ],
      tags: ['non&#8209;tech'],
    },
    {
      label: {en: "TODO", de: 'MA 35'},
      tagLine: {en: "TODO", de: 'Einwanderungsverfahren'},
      time: {
        from: dayjs('22.12.2012', 'DD.MM.YYYY'),
        to: dayjs('30.04.2015', 'DD.MM.YYYY'),
      },
      list: [
        {
          label:
            {en: "TODO", de: 'brisante politische und rechtliche Materie'},
        },
        { label: {en: "TODO", de: 'herausfordernder Kundenkontakt'} },
        { label: {en: "TODO", de: 'enormes Arbeitsvolumen'} },
      ],
      tags: ['non&#8209;tech'],
    },
    {
      label: {en: "TODO", de: 'diverse Praktika'},
      time: {
        from: dayjs('06/2008', 'MM/YYYY'),
        to: dayjs('12/2012', 'MM/YYYY'),
      },
      list: [
        { label: {en: "TODO", de: 'Vetoquinol'} },
        { label: {en: "TODO", de: 'Hausverwaltung Rosenberger'} },
        { label: {en: "TODO", de: 'Wiener Volkshochschulen'} },
        { label: {en: "TODO", de: 'Erzdiözese Wien'} },
      ],
      tags: ['non&#8209;tech'],
    },
  ],
}

const cvEduItems: CvSectionType = {
  heading: {en: "TODO", de: 'Schul- und Berufsausbilungen'},
  items: [
    {
      label: {en: "TODO", de: 'FH der WKW'},
      time: {
        from: dayjs('09/2015', 'MM/YYYY'),
        to: dayjs('10/2018', 'MM/YYYY'),
      },
      tagLine:
        {en: "TODO", de: 'Studium “Contentproduktion & digitales Medienmanagement”, Abschlussmit Auszeichnung'},
      tags: ['non&#8209;tech'],
    },
    {
      label: {en: "TODO", de: 'Magistrat Wien'},
      time: {
        from: dayjs('12/2014', 'MM/YYYY'),
        to: dayjs('12/2014', 'MM/YYYY'),
      },
      tagLine:
        {en: "TODO", de: 'Dienstprüfungskurs und Dienstprüfung <i>(hauptsächlich öffentliches Recht.)</i>'},
      tags: ['non&#8209;tech'],
    },
    {
      label: {en: "TODO", de: 'Universität Wien'},
      time: {
        from: dayjs('09/2010', 'MM/YYYY'),
        to: dayjs('06/2011', 'MM/YYYY'),
      },

      tagLine:
        {en: "TODO", de: 'Katholische Theologie und Latein - Lehramtsstudium'},
      tags: ['non&#8209;tech'],
    },
    {
      label: {en: "TODO", de: 'Wirtschaftsuniversität Wien'},
      time: {
        from: dayjs('09/2009', 'MM/YYYY'),
        to: dayjs('06/2010', 'MM/YYYY'),
      },
      tagLine: {en: "TODO", de: 'Studium der Betriebswirtschaftslehre'},
      tags: ['non&#8209;tech'],
    },
    {
      label: {en: "TODO", de: 'Universität Wien'},
      time: {
        from: dayjs('09/2008', 'MM/YYYY'),
        to: dayjs('06/2009', 'MM/YYYY'),
      },
      tagLine: {en: "TODO", de: 'Studium der kath. Fachtheologie'},
      tags: ['non&#8209;tech'],
    },
    {
      label: {en: "TODO", de: 'Bundesgymnasium Wien XIX'},
      time: {
        from: dayjs('09/2000', 'MM/YYYY'),
        to: dayjs('06/2008', 'MM/YYYY'),
      },
      tagLine: {en: "TODO", de: 'AHS Matura (humanistischer Zweig)'},
      tags: ['non&#8209;tech'],
    },
  ],
}

const skills: SkillSectionType = {
  heading: {intl: 'Skills'},
  items: [
    {
      heading: {intl: 'Markup'},
      items: [
        { label: {intl: 'HTML'}, level: 5, tags: ['frontend'] },
        {
          label: {intl: 'XML/JSON'},
          level: 4,
          tags: ['frontend', 'backend'],
        },
        {
          label: {intl: 'JSX/TSX'},
          level: 4,
          tags: ['frontend'],
        },
        { label: {intl: 'Markdown'}, level: 4, tags: ['frontend'] },
        { label: {intl: 'Pug'}, level: 4, tags: ['frontend'] },
        {
          label: {intl: 'Jinja2'},
          level: 3,
          tags: ['frontend', 'devops/sre'],
        },
        {
          label: {intl: 'Handlebars'},
          level: 2,
          tags: ['frontend'],
        },
      ],
    },
    {
      heading: {intl: 'Styles'},
      items: [
        { label: {intl: 'CSS'}, level: 4, tags: ['frontend'] },
        {
          label: {intl: 'Sass & SCSS'},
          level: 4,
          tags: ['frontend'],
        },
        {
          label: {intl: 'styled-components & emotionJS'},
          level: 5,
          tags: ['frontend'],
        },
        {
          label: {intl: 'Tailwind CSS'},
          level: 3,
          tags: ['frontend'],
        },
        {
          label: {intl: 'Material UI'},
          level: 4,
          tags: ['frontend'],
        },
        {
          label: {intl: 'Bootstrap'},
          level: 2,
          tags: ['frontend'],
        },
      ],
    },
    {
      heading: {intl: 'JavaScript'},
      items: [
        {
          label: {intl: 'VanillaJS'},
          level: 4,
          tags: ['frontend', 'backend'],
        },
        {
          label: {intl: 'TypeScript'},
          level: 4,
          tags: ['frontend', 'backend'],
        },
        { label: {intl: 'jQuery'}, level: 2, tags: ['frontend'] },
        { label: {intl: 'ReactJS'}, level: 5, tags: ['frontend'] },
        { label: {intl: 'NodeJS'}, level: 3, tags: ['backend'] },
        { label: {intl: 'ExpressJS'}, level: 2, tags: ['backend'] },
        { label: {intl: 'NextJS'}, level: 3, tags: ['frontend'] },
        { label: {intl: 'NestJS'}, level: 3, tags: ['backend'] },
        { label: {intl: 'nx.js'}, level: 1, tags: ['frontend', 'backend', 'devops/sre', 'tech&#8239;health'] },
        { label: {intl: 'Svelte'}, level: 3, tags: ['frontend'] },
        { label: {intl: 'D3.js'}, level: 1, tags: ['frontend'] },
        { label: {intl: 'socketIO'}, level: 2, tags: ['backend'] },
        { label: {intl: 'ThreeJS'}, level: 1, tags: ['frontend'] },
      ],
    },
    {
      heading: {intl:'Weitere Skills'},
      items: [
        { label: {intl: 'Python'}, level: 3, tags: ['backend'] },
        {
          label: {intl: 'Flask, SQAlchemy + Ecosystem'},
          level: 2,
          tags: ['backend'],
        },
        { label: {intl: 'Kotlin'}, level: 2, tags: ['backend'] },
        {
          label: {intl: 'PHP für WordPress'},
          level: 3,
          tags: ['frontend', 'backend'],
        },
        {
          label: {intl: 'Rust'},
          level: 1,
          tags: ['frontend', 'backend'],
        },
        {
          label: {intl: 'GraphQL'},
          level: 3,
          tags: ['frontend', 'backend'],
        },
        { label: {intl: 'REST'}, level: 4, tags: ['backend'] },
        { label: {intl: 'Heroku'}, level: 2, tags: ['devops/sre'] },
        { label: {intl: 'Docker'}, level: 2, tags: ['devops/sre'] },
        { label: {intl: 'SQL'}, level: 3, tags: ['backend'] },
        { label: {intl: 'Jira'}, level: 3, tags: ['other'] },
        { label: {intl: 'git'}, level: 4, tags: ['devops/sre'] },
        { label: {intl: 'Gitlab'}, level: 3, tags: ['devops/sre', 'other'] },
        { label: {intl: 'BitBucket'}, level: 2, tags: ['devops/sre', 'other'] },
        {
          label: {intl: 'CypressJS'},
          level: 3,
          tags: ['tech&#8239;health'],
        },
        {
          label: {intl: 'SonarQube'},
          level: 2,
          tags: ['tech&#8239;health'],
        },
        {
          label: {intl: 'Grafana'},
          level: 2,
          tags: ['tech&#8239;health'],
        },
        {
          label: {intl: 'Prometheus'},
          level: 1,
          tags: ['tech&#8239;health'],
        },
        {
          label: {intl: 'Sentry'},
          level: 2,
          tags: ['tech&#8239;health'],
        },
        {
          label: {intl: 'Lighthouse'},
          level: 3,
          tags: ['tech&#8239;health'],
        },
        {
          label: {intl: 'Storybook'},
          level: 3,
          tags: ['frontend'],
        },
        {
          label: {intl: 'Agile Workflow'},
          level: 3,
          tags: ['other'],
        },
        { label: {intl: 'Scrum'}, level: 3, tags: ['other'] },
        { label: {intl: 'Confluence'}, level: 3, tags: ['other'] },
      ],
    },
    {
      heading: {intl: 'persönliche Roadmap'},
      items: [
        { label: {intl: 'Rust'}, tags: ['backend'] },
        {
          label: {intl: 'Rust for WebAssembly'},
          tags: ['frontend'],
        },
        { label: {intl: 'Web3'}, tags: ['frontend'] },
        { label: {intl: 'yew'}, tags: ['frontend'] },
        { label: {intl: 'Russisch'}, tags: ['non&#8209;tech'] },
      ],
    },
    {
      heading: {en: "TODO", de: 'Sprachen'},
      items: [
        {
          label: {en: "TODO", de: 'Deutsch <i>(Muttersprache)</i>'},
          tags: ['non&#8209;tech'],
        },
        {
          label:
            {en: "TODO", de: 'Englisch <i>(muttersprachliches Niveau)</i>'},
          tags: ['non&#8209;tech'],
        },
        {
          label: {en: "TODO", de: 'Latein <i>(sehr hilfreich)</i>'},
          tags: ['non&#8209;tech'],
        },
        {
          label:
            {en: "TODO", de: 'Altgriechisch <i>(noch viel hilfreicher)</i>'},
          tags: ['non&#8209;tech'],
        },
        {
          label: {en: "TODO", de: 'Russisch <i>(A2)</i>'},
          tags: ['non&#8209;tech'],
        },
      ],
    },
    {
      heading: {en: "TODO", de: 'schon wieder verlernte Skills'},
      items: [
        {
          label: {en: "TODO", de: 'Adobe After Effects'},
          tags: ['non&#8209;tech'],
        },
        {
          label: {en: "TODO", de: 'Adobe Illustrator'},
          tags: ['non&#8209;tech'],
        },
        {
          label: {en: "TODO", de: 'Adobe InDesign'},
          tags: ['non&#8209;tech'],
        },
        {
          label: {en: "TODO", de: 'Adobe Photoshop'},
          tags: ['non&#8209;tech'],
        },
        { label: {en: "TODO", de: 'Blender 3D'}, tags: ['non&#8209;tech'] },
        { label: {en: "TODO", de: 'Godot'}, tags: ['non&#8209;tech'] },
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
