export const courses = [
  {
    value: "master In Flutter Development",
    label: "Master In Flutter Development",
  },
  {
    value: "master In Android Development",
    label: "Master In Android Development",
  },
  { value: "master In Game Development", label: "Master In Game Development" },
  {
    value: "master In Full Stack Development",
    label: "Master In Full Stack Development",
  },
  { value: "master In Web Development", label: "Master In Web Development" },
  { value: "node js", label: "Node js" },
  { value: "react js", label: "React js" },
  { value: "python", label: "Python" },
  { value: "angular JS", label: "Angular JS" },
  { value: "c Programming", label: "C Programming" },
  { value: "c++ Programming", label: "C++ Programming" },
  { value: "java Programming", label: "Java Programming" },
  { value: "iOS", label: "IOS" },
  { value: "advance PHP", label: "Advance PHP" },
  { value: "laravel", label: "Laravel" },
  { value: "wordpress", label: "Wordpress" },
  { value: "master In Web Design", label: "Master In Web Design" },
  { value: "master in UI/UX Design", label: "Master in UI/UX Design" },
  { value: "advance Graphics Design", label: "Advance Graphics Design" },
  { value: "photoshop", label: "Photoshop" },
  { value: "cCC- Basic Computer Course", label: "CCC- Basic Computer Course" },
  { value: "adobe XD", label: "Adobe XD" },
  { value: "adobe Illustrator", label: "Adobe Illustrator" },
];

export const courseProgress = (course) => {
  switch (course) {
    case "master In Flutter Development":
      return [
        "C",
        "C++",
        "State Manaagement",
        "Flutter",
        "Firebase",
        "Dart",
        "Core Java",
        "PHP/NodeJS API Concept",
        "DBMS",
        "Mobile App",
        "Desktop App",
        "Casual Games",
        "Postman",
        "Git Management",
      ];
    case "master In Android Development":
      return [
        "C",
        "C++",
        "Android",
        "Firebase",
        "XML Design",
        "Git mangement",
        "DBMS",
        "Postman",
        "App Deployment",
        "Java",
        "PHP/NodeJS API Concept",
      ];
    case "master in Game Development":
      return [
        "C",
        "C++",
        "MySQL",
        "PHP.NodeJs API Concept",
        "Unity 3D",
        "Git Management",
        "C#",
        "Java",
      ];
    case "master In Full Stack Development":
      return [
        "C",
        "C++",
        "API Call",
        "HTML",
        "CSS",
        "Bootstrap",
        "JavaScript",
        "ECMAScript",
        "JQuery",
        "ReactJS/AngularJS/VueJS",
        "Git Management",
        "API Development",
        "MySQL/MogoDB",
        "Express.JS",
        "Node.JS",
      ];
    case "node js":
      return ["Node js"];
    case "react js":
      return ["React js"];
    case "python":
      return ["Python"];
    case "angular JS":
      return ["Angular JS"];
    case "c Programming":
      return [
        "Data Types/Operators",
        "Control Statements/Loops",
        "Array/String",
        "Functions/Pointer/Structure",
        "Dynamic Memory Allocation",
        "File Handeling/Graphics",
      ];
    case "c++ Programming":
      return [
        "Class/Objects",
        "Constructor",
        "Function Overloading",
        "OOPs Concept",
        "Inheritance",
        "File Input & Output",
      ];
    case "java":
      return [
        "JAVA Basics",
        "OOPs Concept",
        "Multithreading",
        "Applet",
        "Swing",
        "JDBC ",
      ];
    case "ios":
      return ["IOS"];
    case "advance PHP":
      return ["Advance PHP"];
    case "laravel":
      return ["Laravel"];
    case "wordpress":
      return ["Wordpress"];
    case "master In Web Development":
      return [
        "C",
        "C++",
        "Javascript",
        "Postman",
        "AJAX",
        "Git Management",
        "JQuery",
        "JSON",
        "Web Hosting",
        "HTML",
        "CSS",
        "Bootstrap",
        "MySQL",
        "PHP+ / Python+Django",
      ];
    case "master In Web Design":
      return [
        "Photoshop",
        "HTML",
        "CSS",
        "illustrator",
        "Javascript",
        "Git Management",
        "jQuery",
        "Figma",
        "Bootstrap",
        "SASS/SCSS",
        "Wordpress",
        "Media Query",
        "Web Hosting",
        "Tailwind Css",
      ];
    case "master in UI/UX Design":
      return [
        "Photoshop",
        "Figma",
        "Website Ui",
        "illustrator",
        "Game UI",
        "Behance Portfolio",
        "After Effects",
        "Dribble Portfolio",
        "Promotional Video",
        "Adobe XD",
        "Mobile App UI",
      ];
    case "advance Graphics Design":
      return [
        "Photoshop",
        "Logo Design",
        "Festival Post Design",
        "Illustrator",
        "Mockup Design",
        "Dribble Portfolio",
        "corelDRAW",
        "Visiting Card Design",
        "Behance Portfolio",
        "InDesign",
        "Catalog Design",
      ];
    case "photoshop":
      return ["Photoshop"];
    case "cCC- Basic Computer Course":
      return [
        "Notepad/Wordpad",
        "Paint",
        "MS Word/Excel",
        "MS PowerPoint",
        "Advance Internet",
      ];
    case "adobe XD":
      return ["Adobe XD"];
    case "adobe Illustrator":
      return ["Adobe Illustrator"];
  }
};
