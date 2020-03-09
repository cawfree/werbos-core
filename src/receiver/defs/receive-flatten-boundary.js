export const id = '_XZJdQ2orEy4NuMcDho35';

export default (state, computeKeyFor, ...stages) => {
  stages.map(
    stage => console.log(computeKeyFor(stage)),
  );
  return stages;
};
