import { ref, reactive } from "vue";
import { defineStore } from "pinia";
import type { Education, Experience } from "./resume.types";

export const useResumeStore = defineStore("resume", () => {
  const introduction = reactive({
    name: "Adry Mateo Ramon",
    title: "",
    email: "",
    phone: "",
    address: "",
    country: "",
  });

  const skills = ref("");

  const experiences = ref<Array<Experience>>([
    {
      id: crypto.randomUUID(),
      employer: "Google",
      position: "Software Developer",
      startDate: "",
      endDate: "",
      address: "Santo Domingo Este, Santo Domingo, Dominican Republic",
      experience:
        "Develop and maintain responsive user interfaces for various web applications using HTML, CSS, and JavaScript, including frameworks and libraries like Vue.js, Bootstrap, 11ty, and Element Plus.Improve website performance, resulting in faster load times and a smoother user experience. I achieve this by utilizing tools like image converters, page speed analyzers, and code minifiers.Implement accessibility best practices to ensure a positive user experience for all visitors.",
    },
  ]);

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
  };

  const educationList = ref<Array<Education>>([
    {
      id: crypto.randomUUID(),
      institution: "Google",
      education: "UI/UX Designer",
      location: "Coursera",
    },
  ]);

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
  };

  return {
    introduction,
    skills,
    experiences,
    addExperience,
    deleteExperience,
    educationList,
    addEducation,
    deleteEducation,
  };
});
