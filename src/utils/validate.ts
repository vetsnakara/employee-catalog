type RuleName = 'required'

type Config = {
  [key: string]: {
    rule: RuleName
    message: string
  }
}

type InData = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

type Result = {
  [key: string]: string | null
}

export class Validator {
  static rules = {
    required: (value: string) => value.trim().length > 0
  }

  constructor(private config: Config) {
    this.config = config
  }

  validate(data: InData) {
    return Object.entries(data).reduce((result: Result, [field, value]) => {
      if (this.config[field]) {
        const { rule, message } = this.config[field]
        result[field] = Validator.rules[rule](value) ? null : message
      }
      return result
    }, {})
  }
}
