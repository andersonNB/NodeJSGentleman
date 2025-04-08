import {minLength, pipe, string, type InferInput} from "valibot";

export const CharacterSchema = Object({
	name: pipe(string(), minLength(6)),
	lastName: pipe(string(), minLength(6)),
});

export type Character = InferInput<typeof CharacterSchema> & {
	id: number;
};

const character: Map<number, Character> = new Map();

/**
 * Retrieves all characters from the collection.
 * @returns {Character[]} An array of all characters.
 */
export const getAllCharacters = (): Character[] => {
	return Array.from(character.values());
};

/**
 * Retrieves a character by its ID.
 * @param {number} id - The ID of the character to retrieve.
 * @returns {Character | undefined} The character if found, otherwise undefined.
 */
export const getCharacterById = (id: number): Character | undefined => {
	return character.get(id);
};

/**
 * Adds a new character to the collection.
 * @param {Character} character - The character to add.
 * @returns {Character} The newly added character with a generated ID.
 */
export const addCharacter = (character: Character): Character => {
	const newCharcter = {
		...character,
		id: new Date().getTime(),
	};
	character.set(newCharcter.id, newCharcter);

	return newCharcter;
};

/**
 * Updates an existing character in the collection.
 * @param {number} id - The ID of the character to update.
 * @param {Character} updateCharacter - The updated character data.
 * @returns {Character | null} The updated character if successful, otherwise null.
 */
export const updateCharacter = (
	id: number,
	updateCharacter: Character
): Character | null => {
	if (!character.has(id)) return null;

	character.set(id, updateCharacter);
	return updateCharacter;
};

/**
 * Deletes a character from the collection by its ID.
 * @param {number} id - The ID of the character to delete.
 * @returns {boolean} True if the character was deleted, otherwise false.
 */
export const deleteCharacter = (id: number): boolean => {
	if (!character.has(id)) return false;

	character.delete(id);
	return true;
};
