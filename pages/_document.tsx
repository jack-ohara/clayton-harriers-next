import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html>
            <Head>
                <link
                    href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&family=Rubik&display=swap"
                    rel="stylesheet"
                />
                <link rel="shortcut icon" href="/whole-banner-square.svg" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}