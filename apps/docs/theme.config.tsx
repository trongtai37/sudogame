import React from 'react';
import { DocsThemeConfig } from 'nextra-theme-docs';
import { Analytics } from '@vercel/analytics/react';
import { useRouter } from 'next/router';

const config: DocsThemeConfig = {
  logo: (
    <span
      style={{
        fontWeight: 500,
      }}
    >
      SUDO | game
    </span>
  ),
  project: {
    link: 'https://github.com/trongtai37/sudogame',
  },
  docsRepositoryBase: 'https://github.com/shuding/nextra-docs-template',
  useNextSeoProps() {
    const { asPath } = useRouter();
    if (asPath !== '/') {
      return {
        titleTemplate: '%s - Sudogame',
      };
    }
    return {
      titleTemplate:
        'Sudogame - A new fast, light and comprehensive Sudoku library, powered by SAT encoding!',
    };
  },
  footer: {
    component: <Analytics />,
  },
};

export default config;
