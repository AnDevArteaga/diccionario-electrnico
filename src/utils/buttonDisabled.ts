/**
 * Valida si todos los campos de un objeto están llenos.
 * @param obj El objeto a validar.
 * @param requiredFields Lista de campos requeridos a validar.
 * @returns `true` si todos los campos están llenos, `false` si falta alguno.
 */
export function areFieldsFilled<T extends Record<string, any>>(
    obj: T,
    requiredFields: (keyof T)[]
  ): boolean {
    return requiredFields.every((field) => {
      const value = obj[field];
      return value !== undefined && value !== null && value !== "";
    });
  }
  