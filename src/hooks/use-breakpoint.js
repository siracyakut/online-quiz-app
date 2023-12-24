import _useBreakpoint from "use-breakpoint";

const BREAKPOINTS = { mobile: 0, desktop: 768 };

export default function useBreakpoint() {
  const { breakpoint } = _useBreakpoint(BREAKPOINTS);
  return breakpoint;
}
