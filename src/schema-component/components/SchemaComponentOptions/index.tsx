import {
  ExpressionScope,
  SchemaComponentsContext,
  SchemaOptionsContext,
  type SchemaReactComponents,
} from "@formily/react";
import { memo, useMemo } from "react";
import { setValidateLanguage } from "@formily/core";
import { useSchemaOptionsContext } from "@/schema-component/hooks";

setValidateLanguage("zh-CN");
export interface ISchemaComponentOptionsProps {
  scope?: any;
  components?: SchemaReactComponents;
  inherit?: boolean;
  children?: React.ReactNode;
}

const SchemaComponentOptions: React.FC<ISchemaComponentOptionsProps> = memo(
  (props) => {
    const { children } = props;
    const options = useSchemaOptionsContext();
    const components = useMemo(() => {
      return { ...options.components, ...props.components };
    }, [options.components, props.components]);

    const scope = useMemo(() => {
      return { ...options.scope, ...props.scope };
    }, [options.scope, props.scope]);

    const schemaOptionsContextValue = useMemo(() => {
      return { scope, components };
    }, [scope, components]);

    return (
      <SchemaOptionsContext.Provider value={schemaOptionsContextValue}>
        <SchemaComponentsContext.Provider value={components}>
          <ExpressionScope value={scope}>{children}</ExpressionScope>
        </SchemaComponentsContext.Provider>
      </SchemaOptionsContext.Provider>
    );
  }
);

export default SchemaComponentOptions;
