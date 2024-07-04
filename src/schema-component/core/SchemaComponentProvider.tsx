import { createForm } from "@formily/core";
import { FormProvider, Schema } from "@formily/react";
import { uid } from "@formily/shared";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useUpdate } from "ahooks";
import { SchemaComponentContext } from "../context";
import { ISchemaComponentProvider } from "../types";
import {
  SchemaComponentOptions,
  useSchemaOptionsContext,
} from "./SchemaComponentOptions";
import { useLocation } from "react-router-dom";

const randomString = (prefix = "") => {
  return `${prefix}${uid()}`;
};

Schema.silent(true);

const results = {};

const Registry = {
  silent: true,
  compile(expression: string, scope = {}) {
    const fn = () => {
      if (Registry.silent) {
        try {
          return new Function(
            "$root",
            `with($root) { return (${expression}); }`
          )(scope);
        } catch {
          return `{{${expression}}}`;
        }
      } else {
        return new Function("$root", `with($root) { return (${expression}); }`)(
          scope
        );
      }
    };
    if (results[expression]) {
      return results[expression];
    }
    if (expression.trim().startsWith("t(")) {
      results[expression] = fn();
      return results[expression];
    }
    return fn();
  },
};

Schema.registerCompiler(Registry.compile);

export const SchemaComponentProvider: React.FC<ISchemaComponentProvider> = (
  props
) => {
  const { pathname } = useLocation();
  const { designable, onDesignableChange, components, children } = props;
  const ctx = useContext(SchemaComponentContext);
  const ctxOptions = useSchemaOptionsContext();
  const refresh = useUpdate();
  const [formId, setFormId] = useState(uid());

  const form = useMemo(() => props.form || createForm(), [formId, pathname]);

  const scope = useMemo(() => {
    return { ...props.scope, randomString };
  }, [props.scope, ctxOptions?.scope]);

  const [active, setActive] = useState(designable);

  const designableValue = useMemo(() => {
    return typeof designable === "boolean" ? designable : active;
  }, [designable, active, ctx.designable]);

  const setDesignable = useMemo(() => {
    return (value) => {
      if (typeof designableValue !== "boolean") {
        setActive(value);
      }
      onDesignableChange?.(value);
    };
  }, [designableValue, onDesignableChange]);

  const reset = useCallback(() => {
    setFormId(uid());
  }, []);

  return (
    <SchemaComponentContext.Provider
      value={{
        formId,
        scope,
        components,
        reset,
        refresh,
        designable: designableValue,
        setDesignable,
      }}
    >
      <FormProvider form={form}>
        <SchemaComponentOptions inherit scope={scope} components={components}>
          {children}
        </SchemaComponentOptions>
      </FormProvider>
    </SchemaComponentContext.Provider>
  );
};
SchemaComponentProvider.displayName = "SchemaComponentProvider";
