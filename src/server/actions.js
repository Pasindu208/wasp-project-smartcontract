import HttpError from '@wasp/core/HttpError.js'
import { analyzeFile } from "@server/slitherAnalyzer.js"

export const createAudit = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const audit = await context.entities.Audit.create({
    data: {
      file: args.file,
      results: analyzeFile(args.file),
      user: { connect: { id: context.user.id } }
    }
  })

  return audit
}

export const updateAudit = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const audit = await context.entities.Audit.findUnique({
    where: { id: args.id }
  });

  if (audit.userId !== context.user.id) { throw new HttpError(403) }

  return context.entities.Audit.update({
    where: { id: args.id },
    data: { file: args.file, results: args.results }
  });
}