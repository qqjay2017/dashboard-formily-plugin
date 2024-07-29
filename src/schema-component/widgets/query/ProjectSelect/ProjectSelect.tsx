import { css } from "@emotion/css";
import { useState } from "react";
import { connect, mapProps, useField } from "@formily/react";

import { ProjectSelectValue } from "./ProjectSelectValue";
import { useJfGlobalProjectStore } from "./useJfGlobalProjectStore";
import type { FormItemComponentProps } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/themes/style-components/ui";
import { sizeFormat } from "@/utils";
import { useDashboardRoot } from "@/schema-component";

function ProjectSelectMain({
  value,
  onChange,
  dataSource = [],
  ...props
}: FormItemComponentProps) {
  const { setProject } = useJfGlobalProjectStore();
  const [open, setOpen] = useState(false);
  const { colWidth } = useDashboardRoot();
  const { decoratorProps } = useField();
  const w = decoratorProps?.w || 0;

  return (
    <div
      className={css`
        width: 100%;
        height: 100%;
      `}
    >
      <Select
        open={open}
        onOpenChange={setOpen}
        value={value?.id}
        onValueChange={(e) => {
          const findProject = dataSource.find((pro) => pro.id === e);
          if (!findProject) {
            return false;
          }
          setProject(findProject);
          onChange(findProject);
        }}
      >
        <SelectTrigger asChild>
          <ProjectSelectValue value={value?.name} />
        </SelectTrigger>
        <SelectContent
          sideOffset={5}
          style={{
            width: sizeFormat(colWidth * w),
          }}
        >
          {dataSource.map((project) => {
            return (
              <SelectItem
                disabled={project.id === value?.id}
                key={project.name + project.id}
                value={project.id}
                textValue={project.name}
              >
                <div
                  className={css`
                    padding: 0 0.16rem;
                  `}
                >
                  {project.name}
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}

export const ProjectSelect = connect(
  ProjectSelectMain,
  mapProps({}, (props, field: any) => {
    return {
      dataSource: field.dataSource,
      ...props,
    };
  })
);
