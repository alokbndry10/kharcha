import { colorPrimary } from '@shared/constants/app.constants';
import { ThemeConfig } from 'antd';

export const theme: ThemeConfig = {
  token: {
    fontFamily: 'Outfit', // default application font
    fontSize: 16, // default application font size
    colorPrimary: colorPrimary, // primary antd color
    colorBorder: 'var(--color-zinc-300)', // all border colors
    colorText: '#4a4d53', // text color across app

    colorSuccess: '#047857',
    colorInfo: colorPrimary,
    colorWarning: '#D97706',
    colorError: '#EF4444',
  },
  components: {
    DatePicker: {
      lineHeight: 2.2,
    },
    InputNumber: {
      lineHeight: 2.2,
    },
    Input: {
      lineHeight: 2.2,
      colorTextPlaceholder: '#6C6C6C',
      fontSize: 14,
      fontSizeLG: 15,
    },
    Button: {
      controlHeight: 40,
      fontSize: 14,
      fontWeight: 'medium',
      primaryShadow: 'none',
      defaultShadow: 'none',
    },
    Dropdown: {
      controlItemBgHover: 'var(--color-gray-100)',
    },
    Menu: {
      subMenuItemBg: 'transparent', // used for sidebar numbers
      itemSelectedBg: '#e0e0e0',
      itemSelectedColor: '',
      groupTitleColor: '#5F6062',
      groupTitleFontSize: 12,
    },
    Radio: {
      buttonColor: '#5f6062',
      buttonCheckedBg: '#E5EAF5',
      controlHeight: 38,
    },
    Table: {
      fontWeightStrong: 500,
      headerBg: 'var(--color-primary-100)',
    },
    Layout: {
      bodyBg: 'var(--color-gray-100)',
    },
    Select: {
      fontSize: 16,
      fontWeightStrong: 600,
      controlHeight: 36,
      colorText: 'var(--color-text-800)',
      colorTextPlaceholder: 'var(--color-text-400)',
    },
    Steps: {
      titleLineHeight: 20,
    },
    Skeleton: {
      titleHeight: 10,
      paragraphLiHeight: 10,
      gradientFromColor: 'var(--color-primary-200)',
      gradientToColor: 'var(--color-primary-50)',
    },
    Switch: {
      colorPrimary: 'var(--color-emerald-500)',
      colorPrimaryHover: 'var(--color-emerald-400)',
      trackMinWidth: 52,
      trackHeight: 28,
      handleSize: 24,
    },
  },
};
