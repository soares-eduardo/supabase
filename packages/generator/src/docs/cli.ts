import template from './templates/CliTemplate'
import type { CliSpec } from '../types/CliSpec'

const yaml = require('js-yaml')
const fs = require('fs')
const ejs = require('ejs')
const Helpers = require('./Helpers')
const { writeToDisk } = Helpers

export default async function gen(inputFileName: string, outputDir: string) {
  const spec = yaml.load(fs.readFileSync(inputFileName, 'utf8'))
  // console.log('spec', spec)
  
  if (spec.clispec == '001') {
    await gen_v001(spec, outputDir)
  } else {
    console.log('Unrecognized specification version:', spec.clispec)
  }
}

/**
 * Versioned Generator
 */
async function gen_v001(spec: CliSpec, dest: string) {
  let commandMap = new Map(spec.commands.map((item) => [item.id, item]))

  const commands = spec.commands.map((x) => {
    const isChild = x.subcommands.length < 1
    const heading = isChild
      ? `### ${x.summary} {#${x.id}}`
      : `## ${x.summary} {#${x.id}}`

    return {
      ...x,
      heading,
      subcommandList: x.subcommands.map((c) => commandMap.get(c)),
    }
  })

  const content = ejs.render(template, {
    info: spec.info,
    commands,
  })
  // console.log(content)
  // Write to disk
  await writeToDisk(dest, content)
  console.log('Saved: ', dest)
}
