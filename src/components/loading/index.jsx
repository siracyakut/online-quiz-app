export default function Loading() {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div
        data-testid="tail-spin-loading"
        aria-label="tail-spin-loading"
        aria-busy="true"
        role="status"
        style={{ display: "flex" }}
      >
        <svg
          width="50"
          height="50"
          viewBox="0 0 38 38"
          xmlns="http://www.w3.org/2000/svg"
          data-testid="tail-spin-svg"
        >
          <defs>
            <linearGradient
              x1="8.042%"
              y1="0%"
              x2="65.682%"
              y2="23.865%"
              id="a"
            >
              <stop stopColor="#777" stopOpacity="0" offset="0%"></stop>
              <stop stopColor="#777" stopOpacity=".631" offset="63.146%"></stop>
              <stop stopColor="#777" offset="100%"></stop>
            </linearGradient>
          </defs>
          <g fill="none" fillRule="evenodd">
            <g transform="translate(1 1)">
              <path
                d="M36 18c0-9.94-8.06-18-18-18"
                id="Oval-2"
                stroke="#777"
                strokeWidth="2"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 18 18"
                  to="360 18 18"
                  dur="0.9s"
                  repeatCount="indefinite"
                ></animateTransform>
              </path>
              <circle fill="#fff" cx="36" cy="18" r="1">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 18 18"
                  to="360 18 18"
                  dur="0.9s"
                  repeatCount="indefinite"
                ></animateTransform>
              </circle>
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}
