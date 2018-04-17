import React from 'react';
import { Button } from 'semantic-ui-react';

const RenderSubmitButton = ({
  onClick,
  isDisabled,
  text
}) => (
  <Button
    primary
    onClick={onClick}
    disabled={isDisabled}
  >
    {text}
  </Button>
)

export default RenderSubmitButton;
