import * as React from 'react';
import { IMaskInput } from 'react-imask';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const TextMaskCustom = React.forwardRef<HTMLElement, CustomProps>(
  function TextMaskCustom(props) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="(+33) 0 00 00 00 00"
        onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
        overwrite
      />
    );
  },
);

interface State {
  textmask: string;
  numberformat: string;
}

export default function SMSInput() {
  const [values, setValues] = React.useState<State>({
    textmask: '',
    numberformat: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Box
      sx={{
        '& > :not(style)': {
          m: 1,
        },
      }}
    >
        <FormControl variant="standard">
        <InputLabel htmlFor="formatted-text-mask-input">Send SMS to :</InputLabel>
        <Input
          value={values.textmask}
          onChange={handleChange}
          name="textmask"
          id="formatted-text-mask-input"
          inputComponent={TextMaskCustom as any}
          />
        </FormControl>
    </Box>
  );
}
