export function dashboardRootWrap(inject: any) {
  return {
    type: "void",
    properties: {
      dashboardRoot: {
        name: "dashboardRoot",
        type: "void",
        "x-component": "DashboardRoot",
        "x-settings": "settings:root",
        "x-settings-props": {},
        "x-component-props": {
          cols: 12,
          rows: 12,
          rowheight: 80,
          designWidth: 1920,
          designHeight: 1080,
          breakpoints: {
            showroom: 2600,
            desktop: 1300,
            tablet: 500,
            mobile: 0,
          },
          themeProvider: "technologyBlue",
          isDarkTheme: true,
        },
        ...inject,
      },
    },
  };
}
