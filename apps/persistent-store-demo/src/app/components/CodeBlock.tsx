import { styled, darken, lighten } from "@mui/material";

export const CodeBlock = styled('pre')<{ gutterBottom?: boolean }>`
  border-radius: 5px;
  font-size: 0.8rem;
  padding: ${({ theme }) => theme.spacing(1)};
  margin-bottom: ${({ theme, gutterBottom }) => gutterBottom ? theme.spacing(1) : undefined};
  background-color: ${({ theme }) => darken(theme.palette.background.paper, 0.1)};
  @media (prefers-color-scheme: dark) {
    background-color: ${({ theme }) => lighten(theme.palette.background.paper, 0.2)};
  }
`
