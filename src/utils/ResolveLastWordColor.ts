import parse from "html-react-parser";

export default function resolveLastWordColor(text: string) {
  const splittedString = text.split(" ");
  splittedString[splittedString.length - 1] = `<span style="color:#7CF87C">${
    splittedString[splittedString.length - 1]
  }</span>`;
  return parse(splittedString.join(" "));
}
