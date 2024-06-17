import { Typography, styled } from "@mui/material";


// https://github.com/mui/material-ui/issues/29492
export const CardTitle = styled(
  (props: any) => (
    <Typography variant="h5" gutterBottom component="div" {...props} />
  ))`
  padding: ${({ theme }) => theme.spacing(2)};
  border-bottom: 1px solid ${({ theme }) => theme.palette.divider};
`;
