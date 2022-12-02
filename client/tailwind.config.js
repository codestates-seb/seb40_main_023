/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  important: true,
  theme: {
    screens: {
      // 기본적으로 640미만의 모바일이 우선 작업됩니다.
      // 아래 기준 px은 min-width를 의미합니다.
      mobile: "640px",
      tablet: "768px",
      laptop: "1024px",
      desktop: "1280px",
    },
    extend: {
      boxShadow: {
        header: "0 4px 15px 0 rgba(0, 0, 0, 0.03)",
        context: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
        review: "2px 2px 10px rgba(0, 0, 0, 0.1)",
        card: "1px 1px 2px 2px rgba(0, 0, 0, 0.02)",
        cardHover: "2px 2px 15px 2px rgba(0, 0, 0, 0.10)",
      },
      fontFamily: {
        Pretendard: ["Pretendard", ...defaultTheme.fontFamily.sans],
        HSS: ["HSS", ...defaultTheme.fontFamily.sans],
      },
      aspectRatio: {
        "2/3": "2 / 3",
        card: "1 / 1.045",
      },
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: "#000000",
      white: "#ffffff",
      link: "#599CFF",
      linkHover: "#5397FD",
      primary: {
        light: "#F29E87",
        normal: "#FF7246",
        hover: "#FF6534",
        darker: "#E46841",
      },
      secondary: {
        light: "#B6DF5D",
        normal: "#95DA02",
        hover: "#91D400",
        darker: "#78B90E",
      },
      negative: {
        normal: "#DDDDDD",
        hover: "#CCCCCC",
      },
      warning: {
        light: "#F0E5BB",
        normal: "#E9C33F",
        hover: "#CEA71C",
        darker: "#B79316",
      },
      danger: {
        light: "#F4B4B6",
        normal: "#CF393E",
        hover: "##C32D32",
        darker: "#921F24",
      },
      success: {
        light: "#C9E8D3",
        normal: "#5DBB7C",
        hover: "#48A868",
        darker: "#2E7044",
      },
      social: {
        kakaoNormal: "#FAE100",
        kakaoHover: "#F6DE00",
        kakaoText: "#3D1D1E",
        githubNormal: "#313131",
        githubHover: "#2E2E2E",
        naverNormal: "#00C139",
        naverHover: "#00B335",
      },
      mono: {
        75: "#E3E3E3",
        100: "#D6D6D6",
        200: "#BABABA",
        300: "#9c9c9c",
        400: "#898989",
        500: "#666666",
        600: "#555555",
        700: "#333333",
        800: "#222222",
        900: "#111111",
        borderLight: "#EEEEEE",
        borderNormal: "#CCCCCC",
        borderDarker: "#999999",
        borderDisabled: "#EBEBEB",
        bgFooter: "#333333",
        bgSection: "#F4F4F4",
        bgIconCircle: "#EEEEEE",
        bgDisabled: "#FBFBFB",
        textLight: "#BBBBBB",
        textNormal: "#111111",
        textDisabled: "#999999",
        textFooter: "#999999",
        textFooterHover: "#666666",
      },
    },
    fontSize: {
      xxs: "0.7rem",
      xs: ["0.75rem", { lineHeight: "1rem" }],
      sm: ["0.875rem", { lineHeight: "1.25rem" }],
      base: ["1rem", { lineHeight: "1.5rem" }],
      lg: ["1.125rem", { lineHeight: "1.75rem" }],
      xl: ["1.25rem", { lineHeight: "1.8rem" }],
      "2xl": ["1.5rem", { lineHeight: "2.25rem" }],
      "3xl": ["1.875rem", { lineHeight: "2.5rem" }],
      "4xl": ["2.25rem", { lineHeight: "2.75rem" }],
      "5xl": ["3rem", { lineHeight: "1" }],
      "6xl": ["3.75rem", { lineHeight: "1" }],
      "7xl": ["4.5rem", { lineHeight: "1" }],
      "8xl": ["6rem", { lineHeight: "1" }],
      "9xl": ["8rem", { lineHeight: "1" }],
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
