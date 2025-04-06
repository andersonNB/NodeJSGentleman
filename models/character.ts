import {minLength, pipe, string, type InferInput} from "valibot";

export const CharacterSchema = Object({
	name: pipe(string(), minLength(6)),
	lastName: pipe(string(), minLength(6)),
});

export type Character = InferInput<typeof CharacterSchema> & {
	id: number;
};

const character: Map<number, Character> = new Map();

export const getAllCharacters = (): Character[] => {
	return Array.from(character.values());
};

export const getCharacterById = (id: number): Character | undefined => {
	return character.get(id);
};

export const addCharacter = (character: Character): Character => {
	const newCharcter = {
		...character,
		id: new Date().getTime(),
	};
	character.set(newCharcter.id, newCharcter);

	return newCharcter;
};

export const updateCharacter = (
	id: number,
	updateCharacter: Character
): Character | null => {
	if (!character.has(id)) return null;

	character.set(id, updateCharacter);
	return updateCharacter;
};

export const deleteCharacter = (id: number): boolean => {
	if (!character.has(id)) return false;

	character.delete(id);
	return true;
};
