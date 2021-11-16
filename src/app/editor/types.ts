export type Value = number | string;

export type Type = "number" | "string" | "unknow";

export type Schema = {
  field: string;
  type: Type;
};

export type DataSource = {
  meta: {
    title: string;
    schema: Schema[];
  };
  data: Array<Value[]>;
};
