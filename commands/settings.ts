import { AbstractCommand, GlobalState } from './abstractCommand'

export default class Settings extends AbstractCommand {
  name() { return 'settings' }
  help() { return 'list your current settings' }

  execute(query: string, settings: GlobalState): string {
    let filtered: any = {}

    if (query) {
      for (let c of Object.keys(settings)){
        if (c.startsWith(query)){
          // @ts-ignore
          filtered[c] = settings[c] 
        }
      }
    } else {
      filtered = settings
    }

    let maxLength = Math.max(...Object.keys(filtered).map(x => x.length))
    let out = ''

    for (let key of Object.keys(filtered)){
      if (filtered[key] instanceof Map && filtered[key].size == 0) {
        continue
      }
      out += key.padEnd(maxLength + 6)

      if (filtered[key] instanceof Map){
        for (let k of filtered[key].keys())
          out += `${k}=${filtered[key].get(k).toB58String()}, `
      } else {
        out += filtered[key]
      }
      out += '\n'
    }
    return out
  }
}
