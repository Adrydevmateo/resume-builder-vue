export enum SessionStorage {
  CURRENT_RESUME_ID = "current-resume-id",
}

export type Experience = {
  id: string;
  employer: string;
  position: string;
  startDate: string;
  endDate: string;
  address: string;
  experience: string;
};

export type Education = {
  id: string;
  institution: string;
  education: string;
  location: string;
};
