import male01 from "./male01.png";
import male02 from "./male02.png";
import male03 from "./male03.png";
import male04 from "./male04.png";
import female01 from "./female01.png";
import female02 from "./female02.png";
import female03 from "./female03.png";
import female04 from "./female04.png";
import female05 from "./female05.png";

export const avatars = {
  males: [male01, male02, male03, male04],
  females: [female01, female02, female03, female04, female05],
};

export function genAvatar(name: string, gender: string = "female") {
  const collection = gender === "male" ? avatars.males : avatars.females;
  return collection[name.charCodeAt(0) % collection.length];
}
