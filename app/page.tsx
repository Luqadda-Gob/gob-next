import Link from "next/link";
import {
  ArrowRight,
  Download,
  GraduationCap,
  Laptop,
  Play,
  Smartphone,
  Terminal,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Footer, Header } from "./site-chrome";

const codeLines = [
  ["keyword", "door"],
  ["plain", " fariin = "],
  ["string", '"Soo dhawoow Gob"'],
  ["plain", ";"],
];

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <section className="hero">
          <div className="hero-inner">
            <div className="eyebrow">Luuqad furan. Waxbarasho Af-Soomaali ah.</div>
            <h1>Gob</h1>
            <p className="hero-lead">Programming ku hadlaya Af-Soomaali.</p>
            <p className="hero-copy">
              Baro fikradaha programming-ka mobile-ka, ku qor Gob
              kombiyuutarkaaga, kana qayb qaado horumarintiisa.
            </p>
            <div className="hero-actions">
              <Link className="button button-gold" href="/#mobile">
                <Smartphone size={18} /> Eeg Gob Mobile
              </Link>
              <Link className="button button-quiet" href="/downloads">
                <Download size={18} /> Lasoo Deg Gob CLI
              </Link>
              <a
                className="icon-button"
                href="https://github.com/yaseressa/gob"
                target="_blank"
                rel="noreferrer"
                aria-label="Gob on GitHub"
                title="Gob on GitHub"
              >
                <FaGithub size={21} />
              </a>
            </div>

            <div className="terminal" aria-label="Gob code example">
              <div className="terminal-top">
                <span>hello.gob</span>
                <span className="terminal-command">gob.exe hello.gob</span>
              </div>
              <pre>
                <code>
                  {codeLines.map(([kind, value], index) => (
                    <span className={kind} key={`${value}-${index}`}>
                      {value}
                    </span>
                  ))}
                  {"\n"}
                  <span className="keyword">daabac</span>
                  <span className="plain">(fariin);</span>
                  {"\n\n"}
                  <span className="comment">{"// Soo dhawoow Gob"}</span>
                </code>
              </pre>
            </div>
          </div>
        </section>

        <section className="section intro-section">
          <div className="section-heading">
            <span className="kicker">Hal mashruuc, laba albaab</span>
            <h2>Baro. Qor. Dhis.</h2>
            <p>
              Gob wuxuu isku xiraa barashada programming-ka iyo luuqad aad si
              dhab ah ugu qori karto barnaamijyo.
            </p>
          </div>
          <div className="feature-grid">
            <article className="feature">
              <GraduationCap size={26} />
              <h3>Ku baro app-ka</h3>
              <p>
                Casharro, mawduucyo iyo tijaabooyin si tartiib ah kuugu dhisa
                fahamka programming-ka.
              </p>
              <Link href="/#mobile">
                Eeg mobile app-ka <ArrowRight size={16} />
              </Link>
            </article>
            <article className="feature">
              <Terminal size={26} />
              <h3>Ku qor terminal-ka</h3>
              <p>
                Soo degso Gob CLI, samee faylkaaga koowaad, kadibna si toos ah
                uga orod kombiyuutarkaaga.
              </p>
              <Link href="/downloads">
                Eeg Lasoo Degista <ArrowRight size={16} />
              </Link>
            </article>
            <article className="feature">
              <FaGithub size={26} />
              <h3>Ka qayb qaado</h3>
              <p>
                Gob waa mashruuc furan. Akhri source-ka, soo gudbi fikrad ama
                naga caawi horumarintiisa.
              </p>
              <a
                href="https://github.com/yaseressa/gob"
                target="_blank"
                rel="noreferrer"
              >
                Fur GitHub <ArrowRight size={16} />
              </a>
            </article>
          </div>
        </section>

        <section className="section language-band">
          <div className="language-copy">
            <span className="kicker">Luuqadda Gob</span>
            <h2>Fikraddaada si cad u qor.</h2>
            <p>
              Gob wuxuu kuu oggolaanayaa inaad xoogga saarto xalinta dhibaatada,
              adigoon ku mashquulin erayo qalaad.
            </p>
            <Link className="text-link light-link" href="/docs">
              Bilow hagaha <ArrowRight size={17} />
            </Link>
          </div>
          <dl className="language-words">
            <div>
              <dt>door</dt>
              <dd>samee doorsome</dd>
            </div>
            <div>
              <dt>kol</dt>
              <dd>hubi shuruud</dd>
            </div>
            <div>
              <dt>intay</dt>
              <dd>samee wareeg</dd>
            </div>
            <div>
              <dt>daabac</dt>
              <dd>soo bandhig xog</dd>
            </div>
          </dl>
        </section>

        <section className="section app-section" id="mobile">
          <div className="app-visual">
            <div className="phone-frame">
              <div className="phone-bar" />
              <div className="phone-brand">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/brand/gob.png" alt="" />
                <strong>Asc, Yaser</strong>
              </div>
              <p>Kusoo dhawoow Gob, kuna baro afkaaga hooyo programming-ka.</p>
              <div className="lesson-preview">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/brand/fundamentals-banner.png" alt="" />
                <div>
                  <strong>Aasaaska Gob</strong>
                  <span>50% dhammaatay</span>
                </div>
              </div>
            </div>
          </div>
          <div className="app-copy">
            <span className="kicker">Gob Mobile</span>
            <h2>Fahamka ka hor syntax-ka.</h2>
            <p>
              App-ka Gob wuxuu ku dhigaa programming-ka Af-Soomaali, isagoo
              ku kaydinaya halka aad marayso iyo casharrada aad dhammaysay.
            </p>
            <ul className="check-list">
              <li>Casharro nidaamsan oo Af-Soomaali ah</li>
              <li>Progress-kaaga oo meel walba kula socda</li>
              <li>Playground aad fikradaha ku tijaabiso</li>
            </ul>
            <span className="availability">
              <Play size={17} /> Android release-ka ugu horreeya wuu soo socdaa
            </span>
            <Link className="text-link app-download-link" href="/downloads">
              Eeg Lasoo Degista <ArrowRight size={17} />
            </Link>
          </div>
        </section>

        <section className="section release-section">
          <Laptop size={30} />
          <div>
            <span className="kicker">Bilow maanta</span>
            <h2>Gob kulasoo Deg Kombiyuutarkaaga</h2>
            <p>
              Dooro nidaamka kuugu Jira, lasoo deg Gob, kadib qor barnaamijkaaga koowaad.
            </p>
          </div>
          <Link className="button button-dark" href="/downloads">
            Lasoo Degis <ArrowRight size={18} />
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
