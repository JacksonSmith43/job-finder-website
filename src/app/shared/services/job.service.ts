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
  currentJob = signal<JobType | null>(null);

  readonly techStack: Record<string, string> = {
    Angular: 'angular.png',
    C: 'c.png',
    'C++': 'c++.png',
    CSS: 'css.png',
    Docker: 'docker.png',
    Git: 'git.png',
    HTML: 'html.png',
    Java: 'java.png',
    JavaScript: 'js.png',
    Python: 'python.png',
    React: 'react.png',
    'Spring Boot': 'spring-boot.png',
    Adobe: 'adobe.png',
    Atlassian: 'atlassian.png',
    Claude: 'claude.png',
    Confluence: 'confluence.png',
    'Embedded C': 'embedded-c.png',
    Figma: 'figma.png',
    I2C: 'i2c.png',
    Jira: 'jira.png',
    SPI: 'spi.png',
    STM32: 'stm32.png',
    UART: 'uart.png',
    Zephyr: 'zephyr.png',
  };

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
          'Join our frontend team to build and improve internal web tools used by customer support and operations. You will work with Angular and modern UI standards to deliver reliable interfaces.',
        city: 'Berlin',
        positionLevel: 'Junior',
        employmentType: 'Part Time',
        workMode: 'Homeoffice',
        salary: 'From 49k €',
        companyLogo: 'bug-busters.png',
        jobSummary:
          'This part-time junior role focuses on building maintainable Angular components, improving form workflows, and fixing UI bugs in close collaboration with senior developers.',
        yourRole: [
          'Build and update Angular components for internal dashboards.',
          'Implement responsive UI layouts using HTML and CSS.',
          'Fix bugs reported by QA and support teams.',
          'Write small unit tests for new UI logic.',
        ],
        yourQualifications: [
          'Basic knowledge of Angular and TypeScript.',
          'Comfortable with HTML, CSS, and Git workflows.',
          'Able to understand UI requirements and implement them carefully.',
          'Good communication skills in a remote team.',
        ],
        yourExperience: [
          'First project or internship experience in web development.',
          'Hands-on practice with component-based UI development.',
          'Experience using version control in team projects.',
          'Initial exposure to debugging frontend issues.',
        ],
        ourOffer: [
          'Structured onboarding with guidance from a senior mentor.',
          'Part-time schedule with clear goals and regular feedback.',
          'Modern development setup and collaborative code reviews.',
          'Opportunity to grow into a full-time frontend position.',
        ],
        yourBenefits: ['Flexible working hours', 'Homeoffice setup support'],
        jobThemes: ['Frontend Development', 'UI Quality', 'Team Collaboration'],
        aboutUs:
          'Bug Busters Inc. builds practical software tools that help support teams solve issues faster. We value clear communication, clean code, and steady improvement.',
        isAvailable: true,
      },
      {
        id: 2,
        name: 'Java Developer',
        techStack: ['Java', 'Git', 'Spring Boot'],
        company: 'Infinite Loopers',
        description:
          'You will help build backend services that power our job matching platform. The team focuses on reliable APIs, readable code, and predictable release cycles.',
        city: 'Vienna',
        positionLevel: 'Junior',
        employmentType: 'Part Time',
        workMode: 'Hybrid',
        salary: 'From 48k €',
        companyLogo: 'infinite-loopers.png',
        jobSummary:
          'As a junior Java developer, you will implement backend features in Spring Boot, maintain API endpoints, and support the team with testing and issue analysis.',
        yourRole: [
          'Develop and maintain REST endpoints with Spring Boot.',
          'Write clean Java code with clear naming and structure.',
          'Support debugging and root-cause analysis for backend issues.',
          'Contribute to test coverage for critical service flows.',
        ],
        yourQualifications: [
          'Good fundamentals in Java programming.',
          'Basic understanding of REST APIs and HTTP concepts.',
          'Familiarity with Git and collaborative development.',
          'Willingness to learn backend architecture step by step.',
        ],
        yourExperience: [
          'Academic or internship experience with Java applications.',
          'Hands-on exposure to Spring Boot in projects.',
          'Experience working with issue trackers and code reviews.',
          'Initial understanding of automated tests.',
        ],
        ourOffer: [
          'Hybrid work model with office days in Vienna.',
          'Mentored onboarding and clear technical learning path.',
          'Stable product roadmap and realistic delivery expectations.',
          'Supportive engineering culture focused on growth.',
        ],
        yourBenefits: ['Hybrid work', 'Learning budget'],
        jobThemes: ['Backend Development', 'API Reliability', 'Code Quality'],
        aboutUs:
          'Infinite Loopers develops backend systems for recruitment technology. We keep our stack practical and invest in long-term maintainability.',
        isAvailable: true,
      },
      {
        id: 3,
        name: 'Full-Stack Developer',
        techStack: ['Angular', 'HTML', 'CSS', 'Java', 'Spring Boot', 'Git', 'Docker'],
        company: 'Null Pointer Ninjas',
        description:
          'In this role you will own features end to end, from UI implementation to backend service integration. You will work closely with product and design to deliver usable solutions.',
        city: 'Vienna',
        positionLevel: 'Senior',
        employmentType: 'Full-Time',
        workMode: 'Homeoffice',
        salary: 'From 40k €',
        companyLogo: 'null-pointer-ninjas.png',
        jobSummary:
          'Senior full-stack position for engineers who can design and deliver production features across Angular frontend and Spring Boot backend with high ownership.',
        yourRole: [
          'Design and deliver full-stack features from planning to release.',
          'Build scalable APIs and integrate them with Angular clients.',
          'Review code, mentor teammates, and set technical standards.',
          'Improve deployment reliability using Docker-based workflows.',
        ],
        yourQualifications: [
          'Strong experience in Angular and Java/Spring Boot.',
          'Good system design skills and pragmatic architecture decisions.',
          'Confident in code reviews, mentoring, and technical communication.',
          'Ability to balance delivery speed and long-term code quality.',
        ],
        yourExperience: [
          'Several years building and operating production web platforms.',
          'Experience owning features across frontend and backend.',
          'Practical experience with containerised development and deployment.',
          'Track record of improving team processes and code health.',
        ],
        ourOffer: [
          'High ownership with direct product impact.',
          'Remote-first setup with flexible scheduling.',
          'Support for leadership and architecture responsibilities.',
          'Long-term role in a stable engineering team.',
        ],
        yourBenefits: ['Remote-first work', 'Annual training budget'],
        jobThemes: ['Full-Stack Delivery', 'Technical Leadership', 'Product Impact'],
        aboutUs:
          'Null Pointer Ninjas builds software products for process automation in medium-sized businesses. We are a small team that values accountability and practical engineering.',
        isAvailable: true,
      },
      {
        id: 4,
        name: 'UX & UI Designer',
        techStack: ['Adobe', 'Figma', 'Atlassian', 'Claude'],
        company: 'Syntax Tacos',
        description:
          'We are looking for a designer who can turn product ideas into clear and usable interfaces. You will collaborate with product and engineering to deliver designs that are ready for implementation.',
        city: 'Tokyo',
        positionLevel: 'Mid-Level',
        employmentType: 'Full-Time',
        workMode: 'Partly Homeoffice',
        salary: 'From 30k €',
        companyLogo: 'syntax-tacos.png',
        jobSummary:
          'Mid-level UX/UI role focused on end-to-end interface design, structured handoff, and iterative improvements based on product goals and user feedback.',
        yourRole: [
          'Design user flows, wireframes, and final UI screens in Figma.',
          'Work with product managers to clarify requirements and scope.',
          'Prepare developer-ready design specs and interaction notes.',
          'Contribute to the design system and consistency standards.',
        ],
        yourQualifications: [
          'Solid UX/UI portfolio with real product work.',
          'Strong command of Figma and collaborative design workflows.',
          'Ability to communicate design decisions clearly to engineers.',
          'Good balance between user needs and business constraints.',
        ],
        yourExperience: [
          'Experience in cross-functional product teams.',
          'Practical work on design systems and reusable components.',
          'Experience with iterative design based on feedback.',
          'Comfortable working in English across distributed teams.',
        ],
        ourOffer: [
          'A product-focused team that values design early in planning.',
          'Hybrid setup with partly remote work.',
          'Ownership of meaningful UI areas and features.',
          'Support for professional development and tooling.',
        ],
        yourBenefits: ['Hybrid setup', 'Design conference allowance'],
        jobThemes: ['UX Research', 'Interface Design', 'Design Systems'],
        aboutUs:
          'Syntax Tacos is a product studio focused on simple and effective digital tools. We work in small squads and prioritise clarity in both product and design.',
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
          'You will develop embedded firmware for connected devices and help improve reliability in field conditions. The role combines low-level implementation with practical system debugging.',
        city: 'Vienna',
        positionLevel: 'Mid-Level',
        employmentType: 'Full-Time',
        workMode: 'Onsite',
        salary: 'From 42k €',
        companyLogo: 'cache-me-outside-software.png',
        jobSummary:
          'Mid-level embedded role focused on firmware implementation in C/C++, hardware communication protocols, and hands-on debugging for production devices.',
        yourRole: [
          'Develop and maintain firmware modules for embedded platforms.',
          'Implement and test communication interfaces like SPI, I2C, and UART.',
          'Debug hardware-near issues with a structured troubleshooting approach.',
          'Work with QA and hardware teams during integration phases.',
        ],
        yourQualifications: [
          'Strong C or Embedded C skills in production or lab projects.',
          'Understanding of microcontroller-based development.',
          'Familiarity with common embedded protocols and tooling.',
          'Clear communication in cross-disciplinary teams.',
        ],
        yourExperience: [
          'Professional experience in embedded or firmware development.',
          'Hands-on debugging of real devices, not only simulations.',
          'Experience with version control and structured reviews.',
          'Practical knowledge of release and validation processes.',
        ],
        ourOffer: [
          'Onsite role with direct access to hardware labs and equipment.',
          'Stable product domain with long-term engineering challenges.',
          'Supportive team with clear ownership and responsibilities.',
          'Opportunity to deepen expertise in embedded systems.',
        ],
        yourBenefits: ['Modern lab equipment', 'Public transport support'],
        jobThemes: ['Embedded Firmware', 'Hardware Integration', 'System Reliability'],
        aboutUs:
          'Cache Me Outside Software develops connected device solutions for industrial and commercial use. We combine firmware, software, and hardware engineering in one product team.',
        isAvailable: true,
      },
    ];

    this.allJobs.set(mockJobs);
    this.filteredJobs.set(mockJobs);
  }

  determinesAvailableJobLength(filteredInput: JobType[], enteredInput: string): void {
    console.log('JobService_determinesAvailableJobLength().');

    if (filteredInput.length === 0) {
      this.searchAnnouncement.set(`0 positions found matching "${enteredInput}"`);
    } else if (filteredInput.length === 1) {
      this.searchAnnouncement.set(`1 position found matching "${enteredInput}"`);
    } else {
      // enteredInput is empty when the page has been reloaded.
      if (enteredInput === '') {
        this.searchAnnouncement.set(`${filteredInput.length} positions found`);
      } else {
        this.searchAnnouncement.set(
          `${filteredInput.length} positions found matching "${enteredInput}"`,
        );
      }
    }
  }
}
