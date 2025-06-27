import getUnicodeFlagIcon from 'country-flag-icons/unicode';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Loading } from '../Loading/Loading';

const LANGUAGES = [
  { value: 'en-US', label: 'English', flag: 'US' },
  { value: 'fr-FR', label: 'Français', flag: 'FR' },
  { value: 'de-DE', label: 'Deutsch', flag: 'DE' },
  { value: 'nl-NL', label: 'Dutch', flag: 'NL' },
  { value: 'pt-BR', label: 'Português', flag: 'BR' },
  { value: 'zh-Hant', label: '繁體中文', flag: 'HK' },
  { value: 'ru-RU', label: 'Русский', flag: 'RU' },
  { value: 'hi-IN', label: 'हिंदी', flag: 'IN' },
  { value: 'ta-IN', label: 'தமிழ்', flag: 'IN' },
  { value: 'es-ES', label: 'Español', flag: 'ES' },
];

export const LanguageControl: React.FC = () => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLanguage(i18n.language);
  }, [i18n.language]);

  const handleChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLoading(true);
    const lang = event.target.value;
    setLanguage(lang);
    i18n.changeLanguage(event.target.value as string).finally(() => {
      setLoading(false);
    });
  };

  if (loading) {
    return (
      <div className='text-center items-center justify-center flex' data-testid='loading-indicator'>
        <Loading size='small' />
      </div>
    );
  }

  return (
    <select
      value={language}
      onChange={handleChange}
      className='w-20 m-1 text-xs cursor-pointer focus:outline-none focus:shadow-outline text-ellipsis'
      data-testid='language-control'
    >
      {LANGUAGES.map(({ value, label, flag }) => (
        <option key={value} className='dark:bg-gray-800' value={value}>
          {getUnicodeFlagIcon(flag)} {label}
        </option>
      ))}
    </select>
  );
};
