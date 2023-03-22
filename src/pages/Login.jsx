import { Button, TextField, Typography, Box } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isInvalidEmail, setIsInvalidEmail] = useState(true);
  const [isInvalidPassword, setIsInvalidPassword] = useState(true);
  const { setUserState } = useContext(RecipeContext);
  const history = useHistory();

  useEffect(() => {
    const emailValidation = () => {
      const [name, domain] = email.split('@');
      if (!domain) return true;
      const subDomains = domain.split('.');
      const minimalLength = 4;
      return (
        subDomains.length < 2
        || subDomains[0].length < minimalLength
        || subDomains[1] === ''
        || name.length < minimalLength
        || [name, ...subDomains].some((fragment) => fragment.match(/\W/))
      );
    };
    setIsInvalidEmail(emailValidation());
  }, [email, setIsInvalidEmail]);

  useEffect(() => {
    const minimalLength = 6;
    setIsInvalidPassword(password.length <= minimalLength);
  }, [password, setIsInvalidPassword]);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    localStorage.setItem('user', JSON.stringify({ email }));
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    setUserState(email);
    history.push('foods');
  };

  return (
    <Box
      component="div"
      sx={ {
        minWidth: '250px',
        width: '15%',
        margin: '5% auto',
        boxShadow: '5px 5px 15px black',
        padding: '40px 30px',
        borderRadius: '2%',
        border: '1px solid red',
        backgroundColor: 'white',
        outline: '2px solid white',
      } }
    >
      <Typography
        variant="h5"
        marginY={ 1 }
        color="primary"
        sx={ {
          textAlign: 'center',
        } }
      >
        Login
      </Typography>
      <form
        onSubmit={ onSubmitHandler }
      >
        <Box
          sx={ {
            width: '80%',
            margin: 'auto',
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'wrap',
            justifyContent: 'space-evenly',
            height: '50vh',
            maxHeight: '200px',
          } }
        >
          <TextField
            label="E-mail"
            type="email"
            id="email"
            name="email"
            inputProps={ { 'data-testid': 'email-input' } }
            onChange={ ({ target }) => setEmail(target.value) }
            value={ email }
          />
          <TextField
            label="Senha"
            type="password"
            id="password"
            name="password"
            onChange={ ({ target }) => setPassword(target.value) }
            value={ password }
            inputProps={ { 'data-testid': 'password-input' } }
          />
          <Button
            type="submit"
            variant="contained"
            disabled={ isInvalidEmail || isInvalidPassword }
            data-testid="login-submit-btn"
            sx={ {
              width: '50%',
              margin: '0 auto',
            } }
          >
            Enter
          </Button>
        </Box>
      </form>
    </Box>
  );
}
