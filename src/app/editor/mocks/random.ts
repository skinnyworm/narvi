export const number = (min: number, max: number, precision: number = 0) => {
  return () => Number((Math.random() * (max - min) + min).toFixed(precision));
};

export type WeightedLabel = {
  label: string;
  weight: number;
};
export const label = (labels: WeightedLabel[]) => {
  const weights = labels.reduce<number[]>(
    (weights, entry, i) => [...weights, entry.weight + (weights[i - 1] || 0)],
    []
  );
  const max = weights[weights.length - 1];

  const getIndex = () => {
    const value = Math.random() * max;
    return weights.findIndex((weight, i) => weight > value);
  };

  return () => {
    return labels[getIndex()].label;
  };
};
