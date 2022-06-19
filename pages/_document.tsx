import { Head, Html, Main, NextScript } from "next/document";
import bannerPic from '../public/clayton-runner-no-noise.png'

export default function Document() {
    const siteDescription = "Welcome to Clayton-Le-Moors Harriers! Find all the latest news and info and get in touch if you're interested in joining!";

    return (
        <Html>
            <Head>
                <link
                    href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&family=Rubik&display=swap"
                    rel="stylesheet"
                />
                <link rel="shortcut icon" href="/whole-banner-square.svg" />
                <link
                    rel="stylesheet"
                    type="text/css"
                    charSet="UTF-8"
                    href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
                />
                <link
                    rel="stylesheet"
                    type="text/css"
                    href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
                />
                <meta name="description" content={siteDescription} />
                <meta property="og:image" content="https://johwordpress-build.s3.eu-west-1.amazonaws.com/clayton-runner-no-noise.png" />
                <meta property="og:description" content={siteDescription} />
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:creator" content="Jack O'Hara" />
                <meta name="twitter:description" content={siteDescription} />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}