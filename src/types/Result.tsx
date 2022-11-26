type Success<Type> = {
  status: 'success';
  result: Type;
};

type Failure = {
  status: 'failure';
};

type Result<Type> = Success<Type> | Failure;

export default Result;
