import { Injectable, OnInit, signal } from '@angular/core';

import { JobType } from '../model/job-type.model';

@Injectable({
  providedIn: 'root',
})
export class JobService implements OnInit {
  allJobs = signal<JobType[]>([]);
  filteredJobs = signal<JobType[]>([]);
  isVisible = signal<boolean>(false);
  searchAnnouncement = signal<string>('');

  ngOnInit(): void {
    console.log('JobService_ngOnInit().');
  }

  loadJobs(): void {
    console.log('loadJobs().');

    const mockJobs: JobType[] = [
      {
        id: 1,
        name: 'Angular Developer',
        techStack: ['Angular', 'Git', 'HTML', 'CSS'],
        company: 'Bug Busters Inc.',
        description:
          'In dieser Position entwickelst du moderne, performante Webanwendungen mit Angular, React, Vue.js oder Next.js, setzt UX-Designs aus Figma um und arbeitest in einem kreativen Scrum-Team an integrierten Frontend-Lösungen.',
        city: 'Berlin',
        positionLevel: 'Junior',
        employmentType: 'Part Time',
        workMode: 'Homeoffice',
        salary: 'From 49k €',
        companyLogo: 'bug-busters.png',
        isAvailable: true,
      },
      {
        id: 2,
        name: 'Java Developer',
        techStack: ['Java', 'Git', 'Spring Boot'],
        company: 'Infinite Loopers',
        description:
          'Deine zukünftige Rolle: Aktive Mitarbeit am gesamten Software-Lebenszyklus, von der Anforderungsanalyse bis zum Deployment. Design und Entwicklung leistungsstarker und skalierbarer – größtenteils auf Microservices basierender – Softwarearchitekturen im Java Umfeld. Entwicklung von Schnittstellen und Anbindung von Software an verschiedene Datenbanksysteme. Je nach Vorerfahrung: Mentoring von Nachwuchsentwickler:innen. Abhängig von deinen Kenntnissen und Vorlieben kannst du dich in den Bereichen Implementierung, Performance-Tuning, Migration, Sicherheit oder Lösungsarchitektur vertiefen. Auszug aus dem Tech-Stack: Java, Spring, Hibernate, SpringBoot, React.js, Angular, Oracle, Postgres, Kubernetes, Git, GitLab-CI',
        city: 'Vienna',
        positionLevel: 'Junior',
        employmentType: 'Part Time',
        workMode: 'Hybrid',
        salary: 'From 48k €',
        companyLogo: 'infinite-loopers.png',
        isAvailable: true,
      },
      {
        id: 3,
        name: 'Full-Stack Developer',
        techStack: ['Angular', 'HTML', 'CSS', 'Java', 'Spring Boot', 'Git', 'Docker'],
        company: 'Null Pointer Ninjas',
        description:
          'In dieser Rolle entwickelst du End-to-End-Softwarelösungen in einem agilen Team, gestaltest die Architektur von Anwendungen und nutzt modernste Technologien zur Umsetzung kundenorientierter Projekte.',
        city: 'Vienna',
        positionLevel: 'Senior',
        employmentType: 'Full-Time',
        workMode: 'Homeoffice',
        salary: 'From 40k €',
        companyLogo: 'null-pointer-ninjas.png',
        isAvailable: true,
      },
      {
        id: 4,
        name: 'UX & UI Designer',
        techStack: ['Adobe', 'Figma', 'Atlassian', 'Claude'],
        company: 'Syntax Tacos',
        description:
          'In dieser Rolle gestaltest du digitale Interfaces, entwickelst User Journeys und UX-Konzepte, führst Prototypentests durch und arbeitest an Design-Systemen für renommierte Marken.',
        city: 'Tokyo',
        positionLevel: 'Mid-Level',
        employmentType: 'Full-Time',
        workMode: 'Partly Homeoffice',
        salary: 'From 30k €',
        companyLogo: 'syntax-tacos.png',
        isAvailable: true,
      },

      {
        id: 5,
        name: 'Embedded & Firmware Engineer',
        techStack: [
          'Zephyr',
          'Embedded C',
          'STM32',
          'Confluence',
          'Jira',
          'C',
          'Python',
          'SPI',
          'I2C',
          'UART',
        ],
        company: 'Cache Me Outside Software',
        description:
          'In dieser Rolle entwickelst du Firmware-Module in C/C++ unter Zephyr RTOS, optimierst diese für Performance und Zuverlässigkeit und implementierst Designs auf ARM-Mikrocontrollern in einem agilen Team.',
        city: 'Vienna',
        positionLevel: 'Mid-Level',
        employmentType: 'Full-Time',
        workMode: 'Onsite',
        salary: 'From 42k €',
        companyLogo: 'cache-me-outside-software.png',
        isAvailable: true,
      },
    ];

    this.allJobs.set(mockJobs);
    this.filteredJobs.set(mockJobs);
  }
}
