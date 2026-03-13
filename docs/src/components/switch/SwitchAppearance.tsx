import { useTheme } from '~/context/ThemeContext';
import MoonIcon from '~/assets/svg/moon.svg?component-solid';
import SunIcon from '~/assets/svg/sun.svg?component-solid';
import { Switch } from './Switch';

export function SwitchAppearance() {
  const { theme, toggleTheme } = useTheme();
  const isDark = () => theme() === 'dark';

  return (
    <Switch ariaChecked={isDark()} onClick={toggleTheme}>
      <SunIcon
        class="absolute top-0.75 left-0.75 h-3 w-3 text-gray-600 opacity-100 transition-opacity duration-250 dark:text-slate-300 dark:opacity-0"
        aria-hidden="true"
      />
      <MoonIcon
        class="absolute top-0.75 left-0.75 h-3 w-3 text-gray-600 opacity-0 transition-opacity duration-250 dark:text-slate-300 dark:opacity-100"
        aria-hidden="true"
      />
    </Switch>
  );
}
