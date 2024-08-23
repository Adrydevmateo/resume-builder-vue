import { ref, reactive } from "vue";
import { defineStore } from "pinia";
import {
  EStorage,
  type TEducation,
  type TExperience,
  type TIntroduction,
} from "@/types";

export const useResumeStore = defineStore("resume", () => {
  const introduction = reactive<TIntroduction>({
    name: "",
    lastName: "",
    title: "",
    email: "",
    website: "",
    phone: "",
    city: "",
    country: "",
  });

  function saveIntroduction(introduction: TIntroduction) {
    console.log("Introduction: ", introduction);
    localStorage[EStorage.RESUME_INTRODUCTION] = JSON.stringify(introduction);
  }

  function loadIntroduction(): void {
    const res = getData<TIntroduction>(EStorage.RESUME_INTRODUCTION);
    if (!res) return;
    introduction.name = res.name;
    introduction.lastName = res.lastName;
    introduction.title = res.title;
    introduction.email = res.email;
    introduction.website = res.website;
    introduction.phone = res.phone;
    introduction.city = res.city;
    introduction.country = res.country;
  }

  const skills = ref("");

  function saveSkills(skills: string) {
    console.log("Skills: ", skills);
    localStorage[EStorage.RESUME_SKILLS] = JSON.stringify(skills);
  }

  function loadSkills(): void {
    const res = getData<{ skills: string }>(EStorage.RESUME_SKILLS);
    if (!res) return;
    skills.value = res.skills;
  }

  const experiences = ref<Array<TExperience>>([]);

  const addExperience = () => {
    experiences.value.push({
      id: crypto.randomUUID(),
      employer: "",
      position: "",
      startDate: "",
      endDate: "",
      address: "",
      experience: "",
    });
  };

  const deleteExperience = (id: string) => {
    const experience = experiences.value.find((find) => find.id === id);
    if (!experience) return;
    const index = experiences.value.indexOf(experience);
    experiences.value.splice(index, 1);

    deleteExperienceFromStorage(experience.id);
  };

  function deleteExperienceFromStorage(id: string) {
    const experiences = getData<Array<TExperience>>(
      EStorage.RESUME_EXPERIENCES,
    );

    if (!experiences) return;

    const found = experiences.find((f) => f.id === id);
    if (!found) return;

    const positionOfFound = experiences.indexOf(found);
    experiences.splice(positionOfFound, 1);
    return (localStorage[EStorage.RESUME_EXPERIENCES] = JSON.stringify([
      ...experiences,
    ]));
  }

  function saveExperience(experience: TExperience) {
    console.log("Experience: ", experience);
    const experiences = getData<Array<TExperience>>(
      EStorage.RESUME_EXPERIENCES,
    );

    if (!experiences)
      return (localStorage[EStorage.RESUME_EXPERIENCES] = JSON.stringify([
        experience,
      ]));

    const found = experiences.find((f) => f.id === experience.id);
    if (found) {
      const positionOfFound = experiences.indexOf(found);
      experiences.splice(positionOfFound, 1, experience);
      return (localStorage[EStorage.RESUME_EXPERIENCES] = JSON.stringify([
        ...experiences,
      ]));
    }

    return (localStorage[EStorage.RESUME_EXPERIENCES] = JSON.stringify([
      ...experiences,
      experience,
    ]));
  }

  function loadExperiences(): void {
    const res = getData<Array<TExperience>>(EStorage.RESUME_EXPERIENCES);
    if (!res) return;
    experiences.value = res;
  }

  const educationList = ref<Array<TEducation>>([]);

  const addEducation = () => {
    educationList.value.push({
      id: crypto.randomUUID(),
      institution: "",
      education: "",
      location: "",
    });
  };

  const deleteEducation = (id: string) => {
    const education = educationList.value.find((find) => find.id === id);
    if (!education) return;
    const index = educationList.value.indexOf(education);
    educationList.value.splice(index, 1);

    deleteEducationFromStorage(education.id);
  };

  function deleteEducationFromStorage(id: string) {
    const educationList = getData<Array<TEducation>>(EStorage.RESUME_EDUCATION);

    if (!educationList) return;

    const found = educationList.find((f) => f.id === id);
    if (!found) return;

    const positionOfFound = educationList.indexOf(found);
    educationList.splice(positionOfFound, 1);
    return (localStorage[EStorage.RESUME_EDUCATION] = JSON.stringify([
      ...educationList,
    ]));
  }

  function saveEducation(education: TEducation) {
    console.log("Education: ", education);
    const educationList = getData<Array<TEducation>>(EStorage.RESUME_EDUCATION);

    if (!educationList)
      return (localStorage[EStorage.RESUME_EDUCATION] = JSON.stringify([
        education,
      ]));

    const found = educationList.find((f) => f.id === education.id);
    if (found) {
      const positionOfFound = educationList.indexOf(found);
      educationList.splice(positionOfFound, 1, education);
      return (localStorage[EStorage.RESUME_EDUCATION] = JSON.stringify([
        ...educationList,
      ]));
    }

    return (localStorage[EStorage.RESUME_EDUCATION] = JSON.stringify([
      ...educationList,
      education,
    ]));
  }

  function loadEducation(): void {
    const res = getData<Array<TEducation>>(EStorage.RESUME_EDUCATION);
    if (!res) return;
    educationList.value = res;
  }

  function getData<T>(name: EStorage): T | undefined {
    const data = localStorage[name];
    if (!data) return;
    const res = JSON.parse(data);
    return res;
  }

  return {
    introduction,
    saveIntroduction,
    loadIntroduction,
    skills,
    saveSkills,
    loadSkills,
    experiences,
    addExperience,
    deleteExperience,
    saveExperience,
    loadExperiences,
    educationList,
    addEducation,
    deleteEducation,
    saveEducation,
    loadEducation,
  };
});
