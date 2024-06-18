import { Card, CardContent, Typography, CardActions, Button } from "@mui/material";
import { CardTitle } from "./CardTitle";
import { CodeBlock } from "./CodeBlock";

export interface PrimitiveValuesProps {
  persistentCounter: number;
  transientCounter: number;
  incrementCounters: () => void;
}

export const PrimitiveValues = (props: PrimitiveValuesProps) => {

  const { persistentCounter, transientCounter, incrementCounters } = props;

  return <Card sx={{ maxWidth: 345 }}>
    <CardTitle>Primitive value</CardTitle>
    <CardContent>
      <CodeBlock gutterBottom>
        Persisted: {persistentCounter}<br/>
        Transient: {transientCounter}
      </CodeBlock>
      <Typography variant="body2" color="text.secondary">
        Refresh page to see which values are preserved and which not.
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small" onClick={incrementCounters}>Increment counters</Button>
    </CardActions>
  </Card>

}
