export const URLS = {
  siglo: {
    prod: {
      login: 'https://siglo21.instructure.com/login/canvas#Internos',
      canvasCourses: 'https://siglo21.instructure.com/courses',
      courses: 'https://siglo21.educabot.com/courses',
      tutorBase: 'https://siglo21.educabot.com/tutor/',
    },
  },
  tuni: {
    staging: {
      login: 'https://tuni-ai-staging.pages.dev/login',
      courses: 'https://tuni-ai-staging.pages.dev/courses',
    },
  },
} as const;
