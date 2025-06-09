import getUnicodeFlagIcon from 'country-flag-icons/unicode';
import React, { useEffect, useState } from 'react';
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
    <div className='inline-block relative w-15'>
      <select
        value={language}
        onChange={handleChange}
        className='block appearance-none w-full bg-white cursor-pointer  hover:border-gray-500 p-2 leading-tight focus:outline-none focus:shadow-outline h-10'
        data-testid='language-control'
      >
        <option value={'en-US'}>{getUnicodeFlagIcon('US')}</option>
        <option value={'pt-BR'}>{getUnicodeFlagIcon('BR')}</option>
        <option value={'zh-Hant'}>{getUnicodeFlagIcon('HK')}</option>
        <option value={'ru-RU'}>{getUnicodeFlagIcon('RU')}</option>
      </select>
      <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 pt-1 text-gray-700'>
        <svg
          className='fill-current h-4 w-4'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 20 20'
        >
          <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
        </svg>
      </div>
    </div>
  );
};
