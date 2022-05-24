import prompts from "prompts";

const questions = [
  {
    type: "text",
    name: "name",
    message: "What is your project named?",
  },
  {
    type: "select",
    name: "language",
    message: "Do you want to use JavaScript or TypeScript?",
    choices: [
      {
        title: "JavaScript",
        value: "javascript",
      },
      {
        title: "TypeScript",
        value: "typescript",
      },
    ],
    initial: 0,
  },
];

(async () => {
  const response: { name: string; language: string } = await prompts(
    questions as any
  );
})();
