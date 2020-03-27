type EnvironmentOptions = {
  lazy?: boolean
  irish?: boolean
  spanish?: boolean
  roman?: boolean
  hebrew?: boolean
  postnominal?: boolean
}

class Environment {
  // Irish exceptions.
  private EXCEPTIONS = [
    [/\bMacEdo/, 'Macedo'],
    [/\bMacEvicius/, 'Macevicius'],
    [/\bMacHado/, 'Machado'],
    [/\bMacHar/, 'Machar'],
    [/\bMacHin/, 'Machin'],
    [/\bMacHlin/, 'Machlin'],
    [/\bMacIas/, 'Macias'],
    [/\bMacIulis/, 'Maciulis'],
    [/\bMacKie/, 'Mackie'],
    [/\bMacKle/, 'Mackle'],
    [/\bMacKlin/, 'Macklin'],
    [/\bMacKmin/, 'Mackmin'],
    [/\bMacQuarie/, 'Macquarie'],
    [/\bMacOmber/, 'Macomber'],
    [/\bMacIn/, 'Macin'],
    [/\bMacKintosh/, 'Mackintosh'],
    [/\bMacKen/, 'Macken'],
    [/\bMacHen/, 'Machen'],
    [/\bMacisaac/, 'MacIsaac'],
    [/\bMacHiel/, 'Machiel'],
    [/\bMacIol/, 'Maciol'],
    [/\bMacKell/, 'Mackell'],
    [/\bMacKlem/, 'Macklem'],
    [/\bMacKrell/, 'Mackrell'],
    [/\bMacLin/, 'Maclin'],
    [/\bMacKey/, 'Mackey'],
    [/\bMacKley/, 'Mackley'],
    [/\bMacHell/, 'Machell'],
    [/\bMacHon/, 'Machon'],
  ]

  // General replacements.
  private REPLACEMENTS = [
    [/\bAl(?=\s+\w)/, 'al'], // al Arabic or forename Al.
    [/\bAp\b/, 'ap'], // ap Welsh.
    [/\b(Bin|Binti|Binte)\b/, 'bin'], // bin, binti, binte Arabic.
    [/\bDell([ae])\b/, 'dell$1'], // della and delle Italian.
    [/\bD([aeiou])\b/, 'd$1'], // da, de, di Italian; du French; do Brasil.
    [/\bD([ao]s)\b/, 'd$1'], // das, dos Brasileiros.
    [/\bDe([lrn])\b/, 'de$1'], // del Italian; der/den Dutch/Flemish.
    [/\bL([eo])\b/, 'l$1'], // lo Italian; le French.
    [/\bEl\b/, 'el'], // el Greek or El Spanish.
    [/\bLa\b/, 'la'], // la French or La Spanish.
    [/\bTe([rn])\b/, 'te$1'], // ten, ter Dutch/Flemish.
    [/\bVan(?=\s+\w)/, 'van'], // van German or forename Van.
    [/\bVon\b/, 'von'], // von Dutch/Flemish.
  ]

  private HEBREW = [
    [/\bBen(?=\s+\w)/, 'ben'], // ben Hebrew or forename Ben.
    [/\bBat(?=\s+\w)/, 'bat'], // bat Hebrew or forename Bat.
  ]

  // Spanish conjunctions.
  private CONJUNCTIONS = ['Y', 'E', 'I']

  // Roman letters regexp.
  private ROMAN_REGEX = /\b((?:[Xx]{1,3}|[Xx][Ll]|[Ll][Xx]{0,3})?(?:[Ii]{1,3}|[Ii][VvXx]|[Vv][Ii]{0,3})?)\b/g

  // Post nominal values.
  // prettier-ignore
  private POST_NOMINALS = [
    'ACILEx', 'ACSM', 'ADC', 'AEPC', 'AFC', 'AFM', 'AICSM', 'AKC', 'AM', 'ARBRIBA', 'ARCS', 'ARRC', 'ARSM', 'AUH', 'AUS',
    'BA', 'BArch', 'BCh', 'BChir', 'BCL', 'BDS', 'BEd', 'BEM', 'BEng', 'BM', 'BS', 'BSc', 'BSW', 'BVM&S', 'BVScBVetMed',
    'CB', 'CBE', 'CEng', 'CertHE', 'CGC', 'CGM', 'CH', 'CIE', 'CMarEngCMarSci', 'CMarTech', 'CMG', 'CMILT', 'CML', 'CPhT', 'CPLCTP', 'CPM', 'CQSW', 'CSciTeach', 'CSI', 'CTL', 'CVO',
    'DBE', 'DBEnv', 'DC', 'DCB', 'DCM', 'DCMG', 'DConstMgt', 'DCVO', 'DD', 'DEM', 'DFC', 'DFM', 'DIC', 'Dip', 'DipHE', 'DipLP', 'DipSW', 'DL', 'DLitt', 'DLP', 'DPhil', 'DProf', 'DPT', 'DREst', 'DSC', 'DSM', 'DSO', 'DSocSci',
    'ED', 'EdD', 'EJLog', 'EMLog', 'EN', 'EngD', 'EngTech', 'ERD', 'ESLog',
    'FADO', 'FAWM', 'FBDOFCOptom', 'FCEM', 'FCILEx', 'FCILT', 'FCSP.', 'FdAFdSc', 'FdEng', 'FFHOM', 'FFPM', 'FRCAFFPMRCA', 'FRCGP', 'FRCOG', 'FRCP', 'FRCPsych', 'FRCS', 'FRCVS', 'FSCR.',
    'GBE', 'GC', 'GCB', 'GCIE', 'GCILEx', 'GCMG', 'GCSI', 'GCVO', 'GM',
    'HNC', 'HNCert', 'HND', 'HNDip',
    'ICTTech', 'IDSM', 'IEng', 'IMarEng', 'IOMCPM', 'ISO',
    'J', 'JP', 'JrLog',
    'KBE', 'KC', 'KCB', 'KCIE', 'KCMmG', 'KCSI', 'KCVO', 'KG', 'KP', 'KT',
    'LFHOM', 'LG', 'LJ', 'LLB', 'LLD', 'LLM', 'Log', 'LPE', 'LT', 'LVO',
    'MA', 'MAcc', 'MAnth', 'MArch', 'MarEngTech', 'MB', 'MBA', 'MBChB', 'MBE', 'MBEIOM', 'MBiochem', 'MC', 'MCEM', 'MCGI', 'MCh.', 'MChem', 'MChiro', 'MClinRes', 'MComp', 'MCOptom', 'MCSM', 'MCSP', 'MD', 'MEarthSc', 'MEng', 'MEnt', 'MEP', 'MFHOM', 'MFin', 'MFPM', 'MGeol', 'MILT', 'MJur', 'MLA', 'MLitt', 'MM', 'MMath', 'MMathStat', 'MMORSE', 'MMus', 'MOst', 'MP', 'MPAMEd', 'MPharm', 'MPhil', 'MPhys', 'MRCGP', 'MRCOG', 'MRCP', 'MRCPath', 'MRCPCHFRCPCH', 'MRCPsych', 'MRCS', 'MRCVS', 'MRes', 'MS', 'MSc', 'MScChiro', 'MSci', 'MSCR', 'MSM', 'MSocSc', 'MSP', 'MSt', 'MSW', 'MSYP', 'MVO',
    'NPQH',
    'OBE', 'OBI', 'OM', 'OND',
    'PgC', 'PGCAP', 'PGCE', 'PgCert', 'PGCHE', 'PgCLTHE', 'PgD', 'PGDE', 'PgDip', 'PhD', 'PLog', 'PLS',
    'QAM', 'QC', 'QFSM', 'QGM', 'QHC', 'QHDS', 'QHNS', 'QHP', 'QHS', 'QPM', 'QS', 'QTSCSci',
    'RD', 'RFHN', 'RGN', 'RHV', 'RIAI', 'RIAS', 'RM', 'RMN', 'RN', 'RN1RNA', 'RN2', 'RN3', 'RN4', 'RN5', 'RN6', 'RN7', 'RN8', 'RN9', 'RNC', 'RNLD', 'RNMH', 'ROH', 'RRC', 'RSAW', 'RSci', 'RSciTech', 'RSCN', 'RSN', 'RVM', 'RVN',
    'SCHM', 'SCJ', 'SCLD', 'SEN', 'SGM', 'SL', 'SPANSPMH', 'SPCC', 'SPCN', 'SPDN', 'SPHP', 'SPLD', 'SrLog', 'SRN', 'SROT',
    'TD',
    'UD',
    'V100', 'V200', 'V300', 'VC', 'VD', 'VetMB', 'VN', 'VRD'
  ];

  // Excluded post-nominals
  private postNominalsExcluded: string[] = []

  private options: EnvironmentOptions = {
    lazy: true,
    irish: true,
    spanish: true,
    roman: true,
    hebrew: true,
    postnominal: true,
  }

  private bckOptions: EnvironmentOptions = {}

  constructor(options: EnvironmentOptions) {
    this.setOptions(options)
  }

  /**
   * Global options setter.
   *
   * @param options
   */
  setOptions(options: EnvironmentOptions): void {
    this.options = { ...this.options, ...options }
  }

  backupOptions(): void {
    this.bckOptions = { ...this.options }
  }

  restoreOptions(): void {
    this.options = { ...this.bckOptions }
  }

  /**
   * Global post-nominals exclusions setter.
   *
   * @param values
   * @returns boolean
   */
  excludePostNominals(values: string | string[]): void {
    this.postNominalsExcluded = this.postNominalsExcluded.concat(values)
  }

  /**
   * Main function for NameCase.
   *
   * @param name
   * @param options
   *
   * @returns string
   */
  nameCase(name: string, options: EnvironmentOptions = {}): string {
    if (name === '') return name

    this.backupOptions()

    this.setOptions(options)

    // Do not do anything if string is mixed and lazy option is true.
    if (this.options.lazy && this.skipMixed(name)) return name

    // Capitalize
    name = this.capitalizeFirstLetters(name)

    name = this.lowercaseFinalS(name)

    name = this.updateIrish(name)

    for (const [pattern, replacement] of this.getReplacements()) {
      name = name.replace(pattern, replacement)
    }

    name = this.processOptions(name)

    this.restoreOptions()

    return name
  }

  private processOptions(name: string): string {
    if (this.options.roman) {
      name = this.updateRoman(name)
    }

    if (this.options.spanish) {
      name = this.updateSpanish(name)
    }

    if (this.options.postnominal) {
      name = this.fixPostNominal(name)
    }

    return name
  }

  /**
   * Capitalize first letters.
   *
   * @param name
   *
   * @returns string
   */
  private capitalizeFirstLetters(name: string): string {
    name = name.toLowerCase()

    // Workaround for Javascript regex word boundary \b splitting on unicode characters
    // https://medium.com/@shiba1014/regex-word-boundaries-with-unicode-207794f6e7ed
    //return name.replace(new RegExp(`${Unicode.bSeijo}\\.`, 'gu'), (...matches) => matches[0].toUpperCase())
    return name.replace(/(?<=[\s,.:;"'(-]|^)./g, (...matches) => matches[0].toUpperCase())
  }

  private lowercaseFinalS(name: string): string {
    // Lowercase 's
    // Workaround for Javascript regex word boundary \b splitting on unicode characters
    // https://medium.com/@shiba1014/regex-word-boundaries-with-unicode-207794f6e7ed
    return name.replace(/'.(?=[\s,.:;"'(-]|$)/g, (...matches) => matches[0].toLowerCase())
  }

  /**
   * Define required replacements.
   *
   * @return array
   */
  private getReplacements(): string[][] {
    // General fixes
    let replacements = this.REPLACEMENTS

    if (this.options.hebrew) {
      replacements = replacements.concat(this.HEBREW)
    }

    return replacements as string[][]
  }

  /**
   * Update for Irish names.
   *
   * @param name
   *
   * @returns string
   */
  private updateIrish(name: string): string {
    if (!this.options.irish) return name
    if (/.*?\bMac[A-Za-z]{2,}[^aciozj]\b/.test(name) || /.*?\bMc/.test(name)) {
      name = this.updateMac(name)
    }

    return name.replace(/\bMacmurdo/, 'MacMurdo').replace(/\bMacisaac/, 'MacIsaac')
  }

  /**
   * Updates irish Mac & Mc.
   *
   * @param name
   *
   * @returns string
   */
  private updateMac(name: string): string {
    name = name.replace(
      /\b(Ma?c)([A-Za-z]+)/,
      (...matches) => matches[1] + matches[2].charAt(0).toUpperCase() + matches[2].substring(1)
    )

    // Now fix "Mac" exceptions
    for (const [pattern, replacement] of this.EXCEPTIONS) {
      name = name.replace(pattern, replacement as string)
    }

    return name
  }

  /**
   * Fix roman numeral names.
   *
   * @param name
   *
   * @returns string
   */
  private updateRoman(name: string): string {
    return name.replace(this.ROMAN_REGEX, (...matches) => {
      return matches[0].toUpperCase()
    })
  }

  /**
   * Fix Spanish rules.
   *
   * @param name
   *
   * @returns string
   */
  private updateSpanish(name: string): string {
    for (const conjunction of this.CONJUNCTIONS) {
      name = name.replace(
        new RegExp(`(?<=[\\s,.:;"'-(]|^)${conjunction}(?=[\\s,.:;"'-(]|$)`, 'g'),
        conjunction.toLowerCase()
      )
    }
    return name
  }

  /**
   * Fix post-nominal letter cases.
   *
   * @param name
   * @returns string
   */
  private fixPostNominal(name: string): string {
    const postNominals = this.POST_NOMINALS.filter((x) => !this.postNominalsExcluded.includes(x))
    for (const postNominal of postNominals) {
      name = name.replace(
        new RegExp(`(?<=[\\s,.:;"'-(]|^)${this.capitalizeFirstLetters(postNominal)}(?=[\\s,.:;"'-(]|$)`, 'g'),
        postNominal
      )
    }
    return name
  }

  /**
   * Skip if string is mixed case.
   *
   * @param name
   *
   * @returns bool
   */
  private skipMixed(name: string): boolean {
    const firstLetterLower = name[0] === name[0].toLowerCase()
    const allLowerOrUpper = name.toLowerCase() === name || name.toUpperCase() === name

    return !(firstLetterLower || allLowerOrUpper)
  }
}

const defaultEnvironment = new Environment({})

export const setOptions = (options: EnvironmentOptions): void => defaultEnvironment.setOptions(options)
export const excludePostNominals = (values: string | string[]): void => defaultEnvironment.excludePostNominals(values)
export const nameCase = (name: string, options?: EnvironmentOptions): string =>
  defaultEnvironment.nameCase(name, options)

export default Environment
