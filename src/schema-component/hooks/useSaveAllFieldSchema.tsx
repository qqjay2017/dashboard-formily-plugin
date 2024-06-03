import React from "react";
import { useAPIClient } from "../../api-client";
import { ISchema, useFieldSchema, useForm } from "@formily/react";
import { useParams } from "react-router-dom";
import { set } from "lodash-es";

const replaceKeys = {
  title: "title",
  description: "description",
  default: "initialValue",
  readOnly: "readOnly",
  writeOnly: "editable",
  enum: "dataSource",
  "x-pattern": "pattern",
  "x-display": "display",
  "x-validator": "validator",
  "x-decorator": "decorator",
  "x-component": "component",
  "x-reactions": "reactions",
  "x-content": "content",
  "x-visible": "visible",
  "x-hidden": "hidden",
  "x-disabled": "disabled",
  "x-editable": "editable",
  "x-read-only": "readOnly",
  "x-decorator-props": "decoratorProps",
  "x-component-props": "componentProps",
};

export const useSaveAllFieldSchema = () => {
  const apiClient = useAPIClient();
  const form = useForm();
  const fieldSchema = useFieldSchema();
  const { id } = useParams();

  const saveLocalFieldState = ({
    address = "",
    schema = {},
  }: {
    address: string;
    schema: ISchema;
  }) => {
    form.setFieldState(address, (state) => {
      Object.keys(schema).forEach((k) => {
        if (!k) {
          return false;
        }

        const val = schema[k];
        const replaceKey = replaceKeys[k] || k;
        if (!state[replaceKey]) {
          state[replaceKey] = {};
        }

        Object.keys(val).forEach((i) => {
          if (i) {
            state[replaceKey][i] = val[i];
          }
        });
        const setAddressBefore = address
          .split(".")
          .map((key, index) => {
            if (index == 0) {
              return "";
            } else {
              return "properties." + key;
            }
          })
          .filter(Boolean)
          .join(".");
        const setAddress = setAddressBefore ? `${setAddressBefore}.${k}` : k;
        console.log(setAddress, "setAddress");

        setAddress && set(fieldSchema, setAddress, state[replaceKey]);
      });
    });
  };

  const saveRemoteFieldSchema = () => {
    return apiClient.request({
      url: "/huang-api/dashboard/" + id,
      method: "put",
      data: {
        // id,
        content: JSON.stringify({
          type: "void",
          properties: {
            dashboardRoot: fieldSchema.toJSON(),
          },
        }),
      },
    });
  };
  return {
    saveRemoteFieldSchema,
    saveLocalFieldState,
  };
};
