import CharGrid from "./CharGrid";
import { CHARACTER_CATEGORIES, getAllCharacters } from "../data/characters";

const ALL_CHARS = getAllCharacters();
const CATS = CHARACTER_CATEGORIES.map((c) => ({ id: c.id, name: c.name, slug: c.slug }));

export default function CharacterGeneratorIsland() {
  return (
    <CharGrid
      chars={ALL_CHARS}
      categories={CATS}
      showCategoryChips={true}
      pageSize={96}
    />
  );
}
