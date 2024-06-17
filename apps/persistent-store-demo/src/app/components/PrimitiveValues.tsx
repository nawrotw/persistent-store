import { Card, CardContent, Typography, CardActions, Button } from "@mui/material";
import { useState } from "react";
import { CardTitle } from "./CardTitle";
import { CodeBlock } from "./CodeBlock";

export const PrimitiveValues = () => {

  const [persistentCounter, setPersistentCounter] = useState(0);
  const [transientCounter, setTransientCounter] = useState(0);

  const incrementCounters = () => {
    setPersistentCounter(persistentCounter + 1);
    setTransientCounter(transientCounter + 1);
  }

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
