## TODO
- remove lodash

# Hooks for React Redux Store

>Main goal of this lib is to simplify integration of Redux into your React project

## Install

React 18 and above:
```bash
npm install use-local-storage-state
```

## State definition
- all fields will be persisted: `['stateName.id', 'stateName.count']`
~~~typescript jsx
@PersistentState()
export class MyStore {
  id: string;
  count: number;
}
~~~

- only @Persisted() fields will be saved: `['stateName.id']`
~~~typescript jsx
@PersistentState({ persistAll: false })
export class MyStore {
  @Persist()
  id: string = "id-1";
  // to proper serialize/deserialize field, which is an instance of a class, we need to provide a @Type to classTransformer
  // @Type(User)
  @Persist(User) // equivalent to: @Persist() + @Type(User) 
  user: User;
  count: number = -1;
}
~~~

- @ExcludePersist fields will NOT be saved: `['stateName.id']`
~~~typescript jsx
@PersistentState({ persistAll: false })
export class MyStore {
  id: string = "id-1";
  @ExcludePersist
  count: number = -1;
}
~~~
             
## StoreProvider
~~~typescript jsx
import { store } from "./store/store";
import { Provider } from "react-redux";

<Provider store={store}>
  <App/>
</Provider>

~~~

## Usage FINSH!!!!!!!

~~~typescript jsx
function MyComponent() {
  const storeActions = useActions(appStore.actions);
  
  // elements selected from the store are fully typed
  const { count } = useStoreSelector((state) => state.app);

  return (
    <div>
      count: {count}
      <button onClick={() => storeActions.updateCount(count + 1)}>Increment</button>
    </div>
  )

}
~~~

## API

#### `useStoreSelector(key: string, options?: LocalStorageOptions)`

To use TypeScript reflection some compiler options needs to be configured:
~~~
tsconfig.json    
-----------------------                                                                                
"compilerOptions": {
    ...
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
}
~~~

## Dependencies
- `react-redux`
- `@reduxjs/toolkit`
- `reflect-metadata`
- `class-transformer`
                                                                                                                       

