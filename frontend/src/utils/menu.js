import { list, check, todo, home } from "./Icons";

const menu = [
  {
    id: 1,
    title: "All Tasks",
    icon: home,
    link: "/",
    filter: () => true,
  },
  {
    id: 2,
    title: "Important!",
    icon: list,
    link: "/important",
    filter: (task) => task.isImportant,
  },
  {
    id: 3,
    title: "Completed!",
    icon: check,
    link: "/completed",
    filter: (task) => task.isCompleted,
  },
  {
    id: 4,
    title: "Do It Now",
    icon: todo,
    link: "/incomplete",
    filter: (task) => !task.isCompleted,
  },
];

export default menu;
