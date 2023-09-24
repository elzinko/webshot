import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Webshot</title>
        <meta
          name="description"
          content="Built with love using create next app"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <p>Easily capture web pages in an instant</p>
          <div>
            <a
              href="https://github.com/elzinko"
              target="_blank"
              rel="noopener noreferrer"
            >
              By{' '}
              <Image
                src="/elzinko.svg"
                alt="Elzinko"
                className={styles.webshotLogo}
                width={40}
                height={40}
                priority
              />
            </a>
          </div>
        </div>
        <div className={styles.center}>
          <Image
            className={styles.logo}
            src="/webshot.svg"
            alt="Webshot Logo"
            width={180}
            height={37}
            priority
          />
        </div>

        <div className={styles.grid}>
          <a
            href="https://webshot-sigma.vercel.app/api/github.fr?device=mobile"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Try <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Try Webshot with Vercel already deployed instance.
            </p>
          </a>
          <a
            href="https://github.com/elzinko/webshot"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Docs <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Find in-depth information about Webshot features.
            </p>
          </a>
          <a
            href="https://github.com/elzinko/webshot"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Build <span>-&gt;</span>
            </h2>
            <p className={inter.className}>npm install && npm run start</p>
          </a>
          <a
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Next.js <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Learn about Next.js in an interactive course with&nbsp;quizzes!
            </p>
          </a>
        </div>
      </main>
    </>
  );
}
