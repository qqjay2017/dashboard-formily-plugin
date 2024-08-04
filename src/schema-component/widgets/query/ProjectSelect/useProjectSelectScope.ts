import { get } from "lodash-es";
import { useEffect, useState } from "react";

import {
  useFetchProjectList,
  useJfGlobalProjectStore,
} from "@/schema-component/hooks";

export function useProjectSelectScope() {
  const { projectId, setProject, quarter } = useJfGlobalProjectStore();
  const { data, isFetched } = useFetchProjectList({
    staleTime: false,
  });

  const projectList = get(data, "table.rows", []) || [];

  const findDefaultProject = projectId
    ? projectList.find((f) => f.id === projectId)
    : null;
  let firstProject = null;
  if (findDefaultProject) {
    firstProject = findDefaultProject;
  } else {
    firstProject = get(data, "table.rows[0]", null);
  }

  /**
   * TODO
   * 这个effect待测试
   */
  useEffect(() => {
    if (isFetched) {
      if (firstProject && firstProject.id) {
        if (firstProject.id !== projectId) {
          console.log("执行设值");
          setProject(firstProject);
        }
      }
    }
  }, [firstProject?.id, projectId, isFetched]);

  if (!data || !isFetched) {
    return null;
  }

  return {
    projectList,
    firstProject,
    currentQuarter: quarter,
  };
}
