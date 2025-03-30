export const toggleExpand = (id: string, setExpandedId: React.Dispatch<React.SetStateAction<string[]>>) => {
    setExpandedId((prev) =>
      prev?.includes(id) ? prev.filter((wordId: string) => wordId !== id) : [...prev, id]
    )
  }