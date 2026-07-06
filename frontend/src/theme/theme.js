import {
  createTheme,
  TextInput,
  PasswordInput,
  Button,
  Paper,
} from "@mantine/core";
import { generateColors } from "@mantine/colors-generator";

import { COLORS } from "../constants/colors";

export const theme = createTheme({
  fontFamily: "Duplet, system-ui, sans-serif",

  primaryColor: "primary",

  primaryShade: 9,

  colors: {
    primary: generateColors(COLORS.primary),

    secondary: generateColors(COLORS.secondary),
  },

  defaultRadius: "md",

  components: {
    TextInput: TextInput.extend({
      defaultProps: {
        size: "md",
      },
    }),

    PasswordInput: PasswordInput.extend({
      defaultProps: {
        size: "md",
      },
    }),

    Button: Button.extend({
      defaultProps: {
        size: "md",
        radius: "md",
      },
      styles: {
        root: {
          transition: "all 0.2s ease",
        },
      },
    }),

    Paper: Paper.extend({
      defaultProps: {
        shadow: "xl",
        radius: "lg",
      },
    }),
  },
});
