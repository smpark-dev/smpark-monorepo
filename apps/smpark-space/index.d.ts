declare module '*.svg' {
  const SVGComponent: FunctionComponent<
    SVGProps<SVGSVGElement> & {
      title?: string;
      className?: string;
      style?: CSSProperties;
    }
  >;

  export default SVGComponent;
}
