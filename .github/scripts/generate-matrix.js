// Define all possible values
const options = {
  trpc: ['true', 'false'],
  tailwind: ['true', 'false'],
  nextAuth: ['true', 'false'],
  betterAuth: ['true', 'false'],
  prisma: ['true', 'false'],
  drizzle: ['true', 'false'],
  appRouter: ['true', 'false'],
  dbType: ['planetscale', 'sqlite', 'mysql', 'postgres']
};

// Generate all combinations
function generateCombinations(opts) {
  const keys = Object.keys(opts);
  const combinations = [];

  function recurse(index, current) {
    if (index === keys.length) {
      combinations.push({...current});
      return;
    }

    const key = keys[index];
    for (const value of opts[key]) {
      current[key] = value;
      recurse(index + 1, current);
    }
  }

  recurse(0, {});
  return combinations;
}

// Filter valid combinations based on current validation logic
function isValid(combo) {
  const { prisma, drizzle, nextAuth, betterAuth, dbType } = combo;

  // Not both auth true
  if (nextAuth === 'true' && betterAuth === 'true') return false;

  // Not both db true
  if (prisma === 'true' && drizzle === 'true') return false;

  // If no db selected, only allow sqlite
  if (prisma === 'false' && drizzle === 'false' && dbType !== 'sqlite') return false;

  return true;
}

const allCombos = generateCombinations(options);
const validCombos = allCombos.filter(isValid);

console.log(`matrix=${JSON.stringify(validCombos)}`);
