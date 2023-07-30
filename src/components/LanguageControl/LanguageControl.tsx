import React, { useState, useEffect } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import './LanguageControl.css';

import getUnicodeFlagIcon from 'country-flag-icons/unicode';
import { useTranslation } from 'react-i18next';

export const LanguageControl: React.FC = () => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState('en-US');

  useEffect(() => {
    setLanguage(i18n.language);
  }, [i18n.language]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setLanguage(event.target.value as string);
    i18n.changeLanguage(event.target.value as string);
  };

  return (
    <FormControl variant='outlined'>
      <Select
        value={language}
        onChange={handleChange}
        displayEmpty
        inputProps={{ 'aria-label': 'Change language' }}
        className='LanguageControlSelect'
        data-testid='language-control'
      >
        <MenuItem value={'en-US'}>{getUnicodeFlagIcon('US')}</MenuItem>
        <MenuItem value={'pt-BR'}>{getUnicodeFlagIcon('BR')}</MenuItem>
      </Select>
    </FormControl>
  );
};
