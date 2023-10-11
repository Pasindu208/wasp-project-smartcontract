import HttpError from '@wasp/core/HttpError.js'

export const getAudit = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const audit = await context.entities.Audit.findUnique({
    where: { id: args.id, userId: context.user.id },
  });

  if (!audit) { throw new HttpError(400) }

  return audit;
}

export const getAudits = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  return context.entities.Audit.findMany({
    where: {
      userId: context.user.id
    }
  });
}