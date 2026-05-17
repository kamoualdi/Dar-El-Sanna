export const metadata = {
  title: 'Administration | Dar El Sanna',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <style suppressHydrationWarning>{`
        #public-header, #public-footer {
          display: none !important;
        }
        body {
          background-color: #f8f9fa;
        }
      `}</style>
      {children}
    </>
  );
}
