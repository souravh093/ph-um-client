import { Form, Select } from "antd";
import { useEffect } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";

type THSelectProps = {
  label: string;
  name: string;
  defaultValues?: string;
  isLoading?: boolean;
  disable?: boolean;
  mode?: "multiple" | undefined;
  options: {
    value: string;
    label: string;
    disable?: boolean;
  }[];
  onValueChange: Function;
};

const PHSelectWithWatch = ({
  defaultValues,
  name,
  label,
  options,
  isLoading,
  disable,
  mode,
  onValueChange,
}: THSelectProps) => {
  const { control } = useFormContext();
  const inputValue = useWatch({
    control,
    name,
  });

  useEffect(() => {
    onValueChange(inputValue);
  }, [inputValue]);

  console.log(inputValue);
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            mode={mode}
            style={{ width: "100%" }}
            {...field}
            defaultValue={defaultValues}
            options={options}
            size="large"
            loading={isLoading}
            disabled={disable}
          />
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default PHSelectWithWatch;
