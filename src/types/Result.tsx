type Success<Type> = {
  status: 'success';
  result: Type;
};

type Failure = {
  status: 'failure';
};

type Loading = {
  status: 'loading';
};

export type Result<Type> = Success<Type> | Failure | Loading;
