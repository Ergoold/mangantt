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

type Result<Type> = Success<Type> | Failure | Loading;

export default Result;
