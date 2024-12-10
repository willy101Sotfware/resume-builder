export interface Resume {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    professionalSummary: string;
  };
  experience: {
    company: string;
    position: string;
    startDate: Date;
    endDate: Date | null;
    description: string;
  }[];
  education: {
    institution: string;
    degree: string;
    field: string;
    graduationDate: Date;
  }[];
  skills: string[];
  languages: {
    language: string;
    proficiency: string;
  }[];
}
