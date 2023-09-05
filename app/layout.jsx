import '@styles/globals.css'

export const metadata ={
    title: "Thoughtstopia",
    description: 'For the minds that never rest, share and discover thoughts',
}

const RootLayout = () => {
  return (
    <html lang='en'>
        <body>
            <div className='main'>
                <div className='gradient' />
            </div>

            <main className='app'>
                {children}
            </main>
        </body>
    </html>
  )
}

export default RootLayout;