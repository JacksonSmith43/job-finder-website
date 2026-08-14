export interface JobType {
  id: number;
  name: string;
  techStack: string[];
  company: string;
  description: string;
  city: string;

  positionLevel: PositionLevel;
  employmentType: string;
  workMode: string;
  salary: string;
  companyLogo: string;

  jobSummary: string;
  yourRole: string[];
  yourQualifications: string[];
  yourExperience: string[];
  ourOffer: string[];
  yourBenefits: string[];
  jobThemes: string[];
  aboutUs: string;

  isAvailable: boolean;
}

export type PositionLevel = 'Junior' | 'Mid-Level' | 'Senior' | 'Internship' | 'Not Given';

export type JobInfoItem = {
  label: string;
  value: string;
};
