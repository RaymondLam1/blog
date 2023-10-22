import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/blog/": "structure",
  "/tech-week/": [
    {
      text: "周刊",
      icon: "laptop-code",
      // prefix: "tech-week/",
      // link: "tech-week/",
      children: "structure",
    },
  ],
});
