import { BreakpointKey, Breakpoints } from "../types";



export function sortBreakpoints(breakpoints: Breakpoints): Array<string> {
    const keys: Array<BreakpointKey> = Object.keys(breakpoints) as Array<BreakpointKey>;
    return keys.sort(function (a, b) {
        return breakpoints[a] - breakpoints[b];
    });
}

export function getBreakpointFromWidth(
    breakpoints: Breakpoints,
    width: number
): BreakpointKey {
    if (!width) {
        return 'desktop';
    }
    const sorted = sortBreakpoints(breakpoints);
    let matching = sorted[0] as BreakpointKey;
    if (!matching) {
        return 'desktop';
    }
    for (let i = 1, len = sorted.length; i < len; i++) {
        const breakpointName = sorted[i] as BreakpointKey;
        if (width > breakpoints[breakpointName]) matching = breakpointName;
    }
    return matching;
}
