import type { IRecursionFieldProps, ISchemaFieldProps } from "@formily/react";
import { RecursionField, Schema } from "@formily/react";
import { useContext, useMemo } from "react";
import { useUpdate } from "ahooks";
import { SchemaComponentContext } from "../context";
import { SchemaComponentOptions } from "./SchemaComponentOptions";

interface SchemaComponentOnChange {
  onChange?: (s: Schema) => void;
}

function toSchema(schema?: any) {
  if (Schema.isSchemaInstance(schema)) {
    return schema;
  }
  if (schema?.name) {
    return new Schema({
      type: "object",
      properties: {
        [schema.name]: schema,
      },
    });
  }
  return new Schema(schema);
}

const useMemoizedSchema = (schema) => {
  return useMemo(() => toSchema(schema), []);
};

interface DistributedProps {
  /**
   * 是否和父级隔离刷新
   * @default false
   */
  distributed?: boolean;
}

const RecursionSchemaComponent = (
  props: ISchemaFieldProps & SchemaComponentOnChange & DistributedProps,
) => {
  const { components, scope, schema, distributed, ...others } = props;
  const ctx = useContext(SchemaComponentContext);
  const s = useMemo(() => toSchema(schema), [schema]);
  const refresh = useUpdate();

  return (
    <SchemaComponentContext.Provider
      value={{
        ...ctx,
        distributed: ctx.distributed === false ? false : distributed,
        refresh: () => {
          refresh();

          ctx.refresh?.();

          props.onChange?.(s);
        },
      }}
    >
      <SchemaComponentOptions inherit components={components} scope={scope}>
        <RecursionField {...others} schema={s} />
      </SchemaComponentOptions>
    </SchemaComponentContext.Provider>
  );
};

export const RecursionSchemaComponentWrap = (
  props: ISchemaFieldProps & SchemaComponentOnChange & DistributedProps,
) => {
  const { components, scope, schema, distributed } = props;
  const ctx = useContext(SchemaComponentContext);
  const s = useMemo(() => toSchema(schema), [schema]);
  const refresh = useUpdate();

  return (
    <SchemaComponentContext.Provider
      value={{
        ...ctx,
        distributed: ctx.distributed === false ? false : distributed,
        refresh: () => {
          refresh();

          ctx.refresh?.();

          props.onChange?.(s);
        },
      }}
    >
      <SchemaComponentOptions inherit components={components} scope={scope}>
        {props.children}
      </SchemaComponentOptions>
    </SchemaComponentContext.Provider>
  );
};

const MemoizedSchemaComponent = (
  props: ISchemaFieldProps & SchemaComponentOnChange & DistributedProps,
) => {
  const { schema, ...others } = props;
  const s = useMemoizedSchema(schema);
  return <RecursionSchemaComponent {...others} schema={s} />;
};

export const SchemaComponent = (
  props: (ISchemaFieldProps | IRecursionFieldProps) & {
    memoized?: boolean;
  } & SchemaComponentOnChange &
    DistributedProps,
) => {
  const { memoized, ...others } = props;
  if (memoized) {
    return <MemoizedSchemaComponent {...others} />;
  }
  return <RecursionSchemaComponent {...others} />;
};
