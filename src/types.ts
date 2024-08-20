export enum ESessionStorage {
  CURRENT_RESUME_ID = "current-resume-id",
  RESUME_INTRODUCTION = "current-resume-introduction",
  RESUME_SKILLS = "current-resume-skills",
  RESUME_EXPERIENCES = "current-resume-experiences",
  RESUME_EDUCATION = "current-resume-education",
}

export type TIntroduction = {
  name: string;
  lastName: string;
  title: string;
  email: string;
  website: string;
  phone: string;
  city: string;
  country: string;
};

export type TExperience = {
  id: string;
  employer: string;
  position: string;
  startDate: string;
  endDate: string;
  address: string;
  experience: string;
};

export type TEducation = {
  id: string;
  institution: string;
  education: string;
  location: string;
};
