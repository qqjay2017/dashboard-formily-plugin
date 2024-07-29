import type { PropsWithChildren } from "react";
import { useEffect, useRef } from "react";
import { useDesigner } from "../hooks";
import { DesignerEngineContext } from "../context";
import { GhostWidget } from "../widgets";
import { Layout } from "./Layout";
import type { Engine } from "@/designable/core";

interface DesignerProps extends PropsWithChildren {
  engine: Engine;
}

export function Designer(props: DesignerProps) {
  const engine = useDesigner();
  const ref = useRef<Engine>();
  useEffect(() => {
    if (props.engine) {
      if (props.engine && ref.current) {
        if (props.engine !== ref.current) {
          ref.current?.unmount && ref.current?.unmount();
        }
      }
      props?.engine?.mount && props.engine.mount();
      ref.current = props.engine;
    }
    return () => {
      if (props.engine) {
        props.engine?.unmount && props.engine?.unmount();
      }
    };
  }, [props.engine]);
  if (engine) {
    throw new Error(
      "There can only be one Designable Engine Context in the React Tree"
    );
  }
  return (
    <Layout {...props}>
      <DesignerEngineContext.Provider value={props.engine}>
        {props.children}
        <GhostWidget />
      </DesignerEngineContext.Provider>
    </Layout>
  );
}
