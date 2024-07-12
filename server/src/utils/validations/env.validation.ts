type RequiredEnvVarsType = {
  [key: string]: string | undefined;
};

const getMissingEnvVars = (requiredVars: RequiredEnvVarsType) => {
  const missingVars = Object.keys(requiredVars).filter((varName) => !process.env[varName]);
  return missingVars;
};

export const validateEnvVars = (requiredVars: RequiredEnvVarsType) => {
  const missingVars = getMissingEnvVars(requiredVars);
  if (missingVars.length > 0) {
    const missingVarNames = missingVars.join(", ");
    throw new Error(`Missing required environment variables: ${missingVarNames}`);
  }
};
