import { ref, reactive } from "vue";
import { defineStore } from "pinia";
import type { Education, Experience } from "@/types";

export const useResumeStore = defineStore("resume", () => {
  const introduction = reactive({
    name: "Adry",
    lastName: "Mateo Ramon",
    title: "Front-End Developer",
    email: "adrydevmateo@gmail.com",
    website: "",
    phone: "(+1) 829 - 275 - 8177",
    city: "San Isidro, Santo Domingo Este",
    country: "Santo Domingo, Dominican Republic",
  });

  const skills = ref(
    "I possess a comprehensive skill-set in Front-End Development, including proficiency in HTML, CSS, and JavaScript. Leverage CSS preprocessors (Sass) to write clean, maintainable, and scalable stylesheets. Adept at building responsive layouts that ensure optimal user experience across all devices and screen sizes. Utilize modern JavaScript frameworks such as Vue.js to construct performant and interactive single-page applications. Furthermore, proficient in testing technologies (Cypress, Vitest) to guarantee code quality and reliability. Employ performance optimization techniques to deliver fast loading times and a seamless user experience. Continually seek to expand knowledge and stay abreast of emerging technologies within the Front-End Development landscape.",
  );

  const experiences = ref<Array<Experience>>([
    {
      id: crypto.randomUUID(),
      employer: "ATDEV",
      position: "Front-End Developer",
      startDate: "",
      endDate: "",
      address: "Dominican Republic",
      experience:
        "Develop and maintain responsive user interfaces for various web applications using HTML, CSS, and JavaScript, including frameworks and libraries like Vue.js, Bootstrap, 11ty, and Element Plus. Improve website performance, resulting in faster load times and a smoother user experience. I achieve this by utilizing tools like image converters, page speed analyzers, and code minifiers. Implement accessibility best practices to ensure a positive user experience for all visitors. Work iteratively with UI/UX Designers utilizing Canva and GIMP for media editing. I collaborate closely with QA Engineers leveraging Cypress and Vitest to ensure a robust testing process throughout development. I also maintain open communication with Back-End Developers to guarantee a seamless integration and user experience. Utilize collaboration tools like Notion, Slack and Google Workspace to work effectively with the different teams in the company. I also rely on version control systems (Git) for code management and collaboration with the development team.",
    },
    {
      id: crypto.randomUUID(),
      employer: "ATDEV",
      position: "Web Developer Intern",
      startDate: "",
      endDate: "",
      address: "Dominican Republic",
      experience:
        "During my internship, I sought out mentorship from the UI/UX Designer and QA Engineer. Their guidance helped me develop the front-end skills necessary to contribute to the team and ultimately secure a full-time position at the company.",
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
      education: "Build Dynamic User Interfaces (UI) for Websites",
      location: "Coursera",
    },
    {
      id: crypto.randomUUID(),
      institution: "Google",
      education: "Foundations of User Experience (UX) Design",
      location: "Coursera",
    },
    {
      id: crypto.randomUUID(),
      institution: "Google",
      education: "UX Design Process: Empathize, Define, and Ideate",
      location: "Coursera",
    },
    {
      id: crypto.randomUUID(),
      institution: "ITLA",
      education: "Associate's Degree in Software Development",
      location: "Santo Domingo, Dominican Republic",
    },
    {
      id: crypto.randomUUID(),
      institution: "ITLA",
      education: "English for IT Professionals",
      location: "Santo Domingo, Dominican Republic",
    },
    {
      id: crypto.randomUUID(),
      institution: "ITLA",
      education: "Computer Essentials",
      location: "Santo Domingo, Dominican Republic",
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
