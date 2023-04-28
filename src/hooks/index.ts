import { computed } from "vue";

type State = {
  [key: string]: unknown;
};

export const useVModel = (state: State, stateField: string) => {
  return computed({
    get: () => state[stateField],
    set: (value) => (state[stateField] = value),
  });
};
