import { css } from "@emotion/css";
import { useState } from "react";
import { connect, mapProps, useField } from "@formily/react";

import { get } from "lodash-es";
import { ProjectSelectValue } from "./ProjectSelectValue";

import type { FormItemComponentProps } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/dashboard-themes/ui";
import { sizeFormat } from "@/utils";
import { useDashboardRoot } from "@/schema-component/components";
import {
  useFetchProjectList,
  useJfGlobalProjectStore,
} from "@/schema-component/hooks";

function ProjectSelectMain(props: FormItemComponentProps) {
  const { data, isFetched } = useFetchProjectList({
    staleTime: true,
  });

  const projectList = get(data, "data.data.table.rows", []) || [];
  const { setProject, project } = useJfGlobalProjectStore();
  const value = project;
  const onChange = setProject;
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
          const findProject = projectList.find((pro) => pro.id === e);
          if (!findProject) {
            return false;
          }
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
          {projectList.map((project) => {
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

export const ProjectSelect = connect(ProjectSelectMain);
