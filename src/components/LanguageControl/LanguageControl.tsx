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
    <select
      value={language}
      onChange={handleChange}
      className='bg-white w-20 text-xs cursor-pointer text-gray-700 hover:border-gray-500  focus:outline-none focus:shadow-outline text-ellipsis'
      data-testid='language-control'
    >
      <option value={'en-US'}>{getUnicodeFlagIcon('GB')} English</option>
      <option value={'fr-FR'}>{getUnicodeFlagIcon('FR')} Français</option>
      <option value={'de-DE'}>{getUnicodeFlagIcon('DE')} Deutsch</option>
      <option value={'pt-BR'}>{getUnicodeFlagIcon('BR')} Português</option>
      <option value={'zh-Hant'}>{getUnicodeFlagIcon('HK')} 繁體中文</option>
      <option value={'ru-RU'}>{getUnicodeFlagIcon('RU')} Русский</option>
    </select>
  );
};
