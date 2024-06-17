import { Card, CardContent, Typography, Link } from "@mui/material";
import { useState } from "react";
import { CardTitle } from "./CardTitle";
import { CodeBlock } from "./CodeBlock";

export class UserModel {
  firstName: string;
  lastName: string;

  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  fullName() {
    return `${this.firstName} ${this.lastName}`
  }
}

const user = new UserModel("John", "Doe");
const plainUser = { firstName: 'John', lastName: 'Plain' };
export const ComplexObjects = () => {

  const [persistentCounter, setPersistentCounter] = useState(0);
  const [transientCounter, setTransientCounter] = useState(0);

  const incrementCounters = () => {
    setPersistentCounter(persistentCounter + 1);
    setTransientCounter(transientCounter + 1);
  }

  return <Card sx={{ maxWidth: 345 }}>
    <CardTitle>Complex objects</CardTitle>
    <CardContent>
      UserModel class:
      <CardContent>
        <CodeBlock>
          {JSON.stringify(user, null, 2)}
        </CodeBlock>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          We have class methods available e.g. user.fullName():
        </Typography>
        <CodeBlock>
          user.fullName(): {user.fullName ? user.fullName() : 'user is not an instance of UserModel!!!'}
        </CodeBlock>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Instances of given classes are persisted as plain objects
          but upon load are transformed via <Link href='https://github.com/typestack/class-transformer' target='_blank'>classTransformer</Link> to instance
          of proper class, here UserModel.
        </Typography>
      </CardContent>

      Plain object:
      <CardContent>
        <CodeBlock>
          {JSON.stringify(plainUser, null, 2)}
        </CodeBlock>
      </CardContent>
    </CardContent>
  </Card>

}
