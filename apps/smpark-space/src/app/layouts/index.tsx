import '@/app/styles/globals.css';

import { Providers } from '@/app/provider/Provider';
import { notoSans, josefinSans, inconsolata } from '@/shared/fonts';
import { StarryNightCanvas } from '@/shared/ui';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html
      lang='ko'
      className={`${notoSans.variable} ${josefinSans.variable} ${inconsolata.variable}`}
    >
      <body>
        <StarryNightCanvas />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
