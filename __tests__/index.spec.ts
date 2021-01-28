import Environment, { nameCase, setOptions, excludePostNominals } from '../src'

describe('Environment', () => {
  // prettier-ignore
  const mainNames = [
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

    // Mac exceptions
    "Machin", "Machlin", "Machar",
    "Mackle", "Macklin", "Mackie",
    "Macquarie", "Machado", "Macevicius",
    "Maciulis", "Macias", "MacMurdo",

    // Roman numerals
    "Henry VIII", "Louis III", "Louis XIV",
    "Charles II", "Fred XLIX",
  ]

  it('tests an empty string', () => {
    expect(nameCase('')).toBe('')
  })

  it('tests internationalization characters', () => {
    const properCased = 'Iñtërnâtiônàlizætiøn'
    expect(nameCase(properCased.toLowerCase())).toBe(properCased)
  })

  it('tests static methods with default configuration', () => {
    for (const name of mainNames) {
      expect(nameCase(name.toLowerCase())).toBe(name)
    }
  })

  it('tests instantiation of a new environment with default configuration', () => {
    const ncEnvironment = new Environment({})
    for (const name of mainNames) {
      expect(ncEnvironment.nameCase(name.toLowerCase())).toBe(name)
    }
  })

  describe('Test options', () => {
    it('tests the lazy flag', () => {
      expect(nameCase('Dougal MACDonald')).toBe('Dougal MACDonald')
      setOptions({ lazy: false })
      expect(nameCase('Dougal MACDonald')).toBe('Dougal MacDonald')
      setOptions({ lazy: true })
      expect(nameCase('Dougal MACDonald')).toBe('Dougal MACDonald')
    })

    it('tests the irish flag', () => {
      expect(nameCase('macmurdo')).toBe('MacMurdo')
      expect(nameCase('macmurdo', { irish: false })).toBe('Macmurdo')
      expect(nameCase('macmurdo')).toBe('MacMurdo')
    })

    it('tests the spanish flag', () => {
      const names = ['Ruiz y Picasso', 'Dato e Iradier', 'Mas i Gavarró']
      const ncEnvironment = new Environment({ spanish: true })
      for (const name of names) {
        expect(ncEnvironment.nameCase(name.toLowerCase())).toBe(name)
      }
      ncEnvironment.setOptions({ spanish: false })
      for (const name of names) {
        expect(ncEnvironment.nameCase(name.toLowerCase())).not.toBe(name)
      }
    })

    it('tests the roman flag', () => {
      setOptions({ roman: false })
      expect(nameCase('na li')).toBe('Na Li')
      setOptions({ roman: true })
      expect(nameCase('na li')).toBe('Na LI')
    })

    it('tests the hebrew flag', () => {
      setOptions({ hebrew: false })
      expect(nameCase('Aharon Ben Amram Ha-Kohein'.toLowerCase())).toBe('Aharon Ben Amram Ha-Kohein')
      expect(nameCase('Ben Gurion'.toLowerCase())).toBe('Ben Gurion')
      setOptions({ hebrew: true })
      expect(nameCase('Aharon ben Amram Ha-Kohein'.toLowerCase())).toBe('Aharon ben Amram Ha-Kohein')
      expect(nameCase('ben Gurion'.toLowerCase())).toBe('ben Gurion')
    })

    it('tests the postnominal flag', () => {
      setOptions({ postnominal: false })
      expect(nameCase('tam phd')).toBe('Tam Phd')
      setOptions({ postnominal: true })
      expect(nameCase('tam phd')).toBe('Tam PhD')
    })
  })

  describe('PostNominal exclusion', () => {
    it('tests "MBE" post-nominal', () => {
      expect(nameCase('ADISA AZAPAGIC MBE FRENG FRSC FICHEME')).toBe('Adisa Azapagic MBE Freng Frsc Ficheme')
    })

    it('tests post-nominal string exclusion', () => {
      excludePostNominals('MOst')
      expect(nameCase('ČERNÝ MOST')).toBe('Černý Most')
      expect(nameCase('tam phd')).toBe('Tam PhD')
    })

    it('tests post-nominal array exclusion', () => {
      excludePostNominals(['MOst', 'BArch'])
      expect(nameCase('ČERNÝ MOST')).toBe('Černý Most')
      expect(nameCase('sebastian barch')).toBe('Sebastian Barch')
      expect(nameCase('tam phd')).toBe('Tam PhD')
    })
  })
})
