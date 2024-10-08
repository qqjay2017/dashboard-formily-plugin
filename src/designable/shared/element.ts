import { Point } from "./coordinate";

const InlineLayoutTagNames = new Set([
  "A",
  "ABBR",
  "ACRONYM",
  "AUDIO",
  "B",
  "BDI",
  "BDO",
  "BIG",
  "BR",
  "BUTTON",
  "CANVAS",
  "CITE",
  "CODE",
  "DATA",
  "DATALIST",
  "DEL",
  "DFN",
  "EM",
  "EMBED",
  "I",
  "IFRAME",
  "IMG",
  "INS",
  "KBD",
  "LABEL",
  "MAP",
  "MARK",
  "METER",
  "NOSCRIPT",
  "OBJECT",
  "OUTPUT",
  "PICTURE",
  "PROGRESS",
  "Q",
  "RUBY",
  "S",
  "SAMP",
  "SELECT",
  "SLOT",
  "SMALL",
  "STRONG",
  "SUB",
  "SUP",
  "SVG",
  "TEMPLATE",
  "TEXTAREA",
  "TIME",
  "U",
  "TT",
  "VAR",
  "VIDEO",
  "WBR",
  "INPUT",
  "SPAN",
]);

export function calcElementOuterWidth(
  innerWidth: number,
  style: CSSStyleDeclaration
) {
  return (
    innerWidth +
    Number.parseFloat(style.marginLeft) +
    Number.parseFloat(style.marginRight) +
    Number.parseFloat(style.paddingLeft) +
    Number.parseFloat(style.paddingRight) +
    Number.parseFloat(style.borderLeftWidth) +
    Number.parseFloat(style.borderRightWidth)
  );
}

export function calcElementLayout(element: Element) {
  if (!element) return "vertical";
  const parent = element.parentElement;
  if (!parent) return "vertical";
  const tagName = element.tagName;
  const parentTagName = parent.tagName;
  const style = getComputedStyle(element);
  const parentStyle = getComputedStyle(parent);

  const isNotFullWidth = () => {
    const innerWidth = element.getBoundingClientRect().width;
    const outerWidth = calcElementOuterWidth(innerWidth, style);
    const parentInnerWidth = parent.getBoundingClientRect().width;
    return outerWidth.toFixed(0) < parentInnerWidth.toFixed(0);
  };
  if (tagName === "TH" || tagName === "TD") {
    if (parentTagName === "TR") return "horizontal";
  }
  if (parentStyle.display === "flex" && parentStyle.flexDirection === "row")
    return "horizontal";
  if (parentStyle.display === "grid") {
    if (isNotFullWidth()) {
      return "horizontal";
    }
  }
  if (InlineLayoutTagNames.has(tagName)) {
    if (style.display === "block") {
      if (style.float === "left" || style.float === "right") {
        if (isNotFullWidth()) {
          return "horizontal";
        }
      }
      return "vertical";
    }
    return "horizontal";
  }
}

export function calcElementTranslate(element: HTMLElement) {
  const transform = element?.style?.transform;
  if (transform) {
    const [x, y] = transform
      .match(
        /translate(?:3d)?\(\s*([-\d.]+)[a-z]+[\s,]+([-\d.]+)(?:[a-z]+[\s,]+([-\d.]+)[a-z]+|[a-z]{2,})\s*\)/
      )
      ?.slice(1, 3) ?? [0, 0];

    return new Point(Number(x), Number(y));
  } else {
    return new Point(Number(element.offsetLeft), Number(element.offsetTop));
  }
}

export function calcElementStyleSize(element: HTMLElement) {
  const width = element?.style?.width;
  const height = element?.style?.height;

  return {
    width: Number(width.match(/(\d+)/)?.[0] ?? 0),
    height: Number(height.match(/(\d+)/)?.[0] ?? 0),
  };
}

export function calcElementRotate(element: HTMLElement) {
  const transform = element?.style?.transform;
  if (transform) {
    return Number(transform.match(/rotate\(\s*([-\d.]+)/)?.[1] ?? 0);
  } else {
    return 0;
  }
}

export function calcElementScale(element: HTMLElement) {
  const transform = element?.style?.transform;

  if (transform) {
    return Number(transform.match(/scale\(\s*([-\d.]+)/)?.[1] ?? 0);
  } else {
    return 0;
  }
}
