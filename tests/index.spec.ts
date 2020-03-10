import { nameCase } from '../src'

describe('Environment', () => {
  // prettier-ignore
  const names = [
    // General
    "Keith", "Yuri's", "Leigh-Williams", "McCarthy",
    "O'Callaghan", "St. John", "von Streit",
    "van Dyke", "Van", "ap Llwyd Dafydd",
    "al Fahd", "Al",
    "el Grecco",
    "ben Gurion", "Ben",
    "da Vinci",
    "di Caprio", "du Pont", "de Legate",
    "del Crond", "der Sind", "van der Post", "van den Thillart",
    "ter Zanden", "ten Brink",
    "von Trapp", "la Poisson", "le Figaro",
    "Mack Knife", "Dougal MacDonald",
    "Yusof bin Ishak",
  ];

  // prettier-ignore
  const macNames = [
    // Mac exceptions
    "Machin", "Machlin", "Machar",
    "Mackle", "Macklin", "Mackie",
    "Macquarie", "Machado", "Macevicius",
    "Maciulis", "Macias", "MacMurdo",
  ];

  // prettier-ignore
  const romanNames = [
    // Roman numerals
    "Henry VIII", "Louis III", "Louis XIV",
    "Charles II", "Fred XLIX",
  ];

  it('test internationalization characters', () => {
    const properCased = 'Iñtërnâtiônàlizætiøn'
    expect(nameCase(properCased.toLowerCase())).toBe(properCased)
  })

  it('test static methods with default configuration', () => {
    for (const name of names) {
      expect(nameCase(name.toLowerCase())).toBe(name)
    }
  })
})
