import createFieldElement from "./createFieldElement";

const updateField = (data) => {
  const field = document.querySelector(".game-field");
  field.replaceWith(createFieldElement(data));
  console.log(field);
};
export default updateField;
