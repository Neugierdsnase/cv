import { type CvItemsType } from './types/CvItemType'

const cvJobItems: CvItemsType = {
  heading: 'Berufserfahrung', items: [
    {
      heading: 'Projektarbeiten und Freelancing',
      time: 'seit Ende 2018',
      list: [
        { label: 'für sgreening (Webdevelopment & Consulting)' },
        { label: 'Porsche Wien Mitte (WordPress-Development & Consulting)' },
      ],
      tags: ['frontend', 'consulting', 'other'],
    },
    {
      heading: 'der brutkasten',
      tagLine: 'WordPress & Frontend Developer',
      time: '1.4.2018 - 30.11.2018',
      list: [
        { label: 'WordPress Theme-Programmierung mit altem Legacy Code' },
        { label: 'Erstellung eines internen CRM' },
        { label: 'Content- und Businessstrategie aus technischer Perspektive' },
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
        { label: 'Umsetzen von Audio- und Videoprojekten für Radio Arabella' },
        {
          label:
            'Programmieren von Texterstellungstools für das Bezirksamt Hernals',
        },
        { label: 'Mitarbeit an Marketingkonzept für Radio NRJ' },
        { label: 'Mitarbeit an TV-Sendungsformat "Brennweite" der FH Wien' },
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
        { label: 'brisante politische und rechtliche Materie' },
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
  ]
}

const cvEduItems: CvItemsType = {
  heading: 'Schul- und Berufsausbilungen', items: [
    {
      heading: 'FH der WKW',
      time: '09/2015-10/2018',
      tagLine: 'Studium “Contentproduktion & digitales Medienmanagement”, Abschlussmit Auszeichnung',
      tags: ['non&#8209;tech']
    }, {
      heading: 'Magistrat Wien',
      time: '12/2014',
      tagLine: 'Dienstprüfungskurs und Dienstprüfung <i>(hauptsächlich öffentliches Recht.)</i>',
      tags: ['non&#8209;tech']
    }, {
      heading: 'Universität Wien',
      time: '09/2010 – 06/2011',
      tagLine: 'Katholische Theologie und Latein - Lehramtsstudium',
      tags: ['non&#8209;tech']
    }, {
      heading: 'Wirtschaftsuniversität Wien',
      time: '09/2009 – 06/2010',
      tagLine: 'Studium der Betriebswirtschaftslehre',
      tags: ['non&#8209;tech']
    }, {
      heading: 'Universität Wien',
      time: '09/2008 – 06/2009',
      tagLine: 'Studium der kath. Fachtheologie',
      tags: ['non&#8209;tech']
    }, {
      heading: 'Bundesgymnasium Wien XIX',
      time: '2000-2008',
      tagLine: 'AHS Matura (humanistischer Zweig)',
      tags: ['non&#8209;tech']
    }
  ]
}

export default {
  cvJobItems,
  cvEduItems,
}
