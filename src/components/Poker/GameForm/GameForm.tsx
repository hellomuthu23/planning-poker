import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  TextField,
} from '@material-ui/core';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import './GameForm.css';

export interface GameFormSubmitEvent {
  textField1Value: string;
  textField2Value: string;
}
export interface GameFormProps {
  title: string;
  onSubmit: (event: GameFormSubmitEvent) => void;
  submitButtonLabel: string;
  label1: string;
  textField1DefaultValue?: string;
  textField2DefaultValue?: string;
  textField1HelperText?: string;
}
export const GameForm: React.FC<GameFormProps> = ({
  title,
  onSubmit,
  submitButtonLabel,
  label1,
  textField1DefaultValue = '',
  textField2DefaultValue = '',
  textField1HelperText = '',
}) => {
  const [textField1Value, setTextField1Value] = useState<string>(
    textField1DefaultValue
  );
  const [textField2Value, setTextField2Value] = useState<string>(
    textField2DefaultValue
  );

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit({ textField1Value, textField2Value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card variant='outlined' className='GameFormCard'>
        <CardHeader
          className='GameFormCardHeader'
          title={title}
          titleTypographyProps={{ variant: 'h4' }}
        />
        <CardContent className='GameFormCardContent'>
          <TextField
            className='GameFormTextField'
            required
            id='filled-required'
            label={label1}
            defaultValue={textField1Value}
            variant='outlined'
            helperText={textField1Value && textField1HelperText}
            error={textField1HelperText ? true : false}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setTextField1Value(event.target.value)
            }
          />
          <TextField
            className='GameFormTextField'
            required
            id='filled-required'
            label='Your Name'
            defaultValue={textField2Value}
            variant='outlined'
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setTextField2Value(event.target.value)
            }
          />
        </CardContent>
        <CardActions className='GameFormCardAction'>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            className='GameFormButton'
          >
            {submitButtonLabel}
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
