import React, { memo, useCallback } from 'react';
import './input.css';

type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

function Input({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const handleChange = useCallback(
    (event: ChangeEvent) => onChange(event.target.value),
    [onChange]
  );

  return <input className="input" value={value} onChange={handleChange} />;
}

export default memo(Input);
