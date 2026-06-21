"use client";

import {
  ArrowLeft,
  ArrowRight,
  Download,
  LoaderCircle,
  Play,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Editor from "../tools/highlight/Editor";

const topics = [
  { id: "hordhac", label: "Hordhac", group: "Bilow" },
  { id: "lasoo-deg", label: "Lasoo deg", group: "Bilow" },
  { id: "cli", label: "Isticmaalka CLI-ga", group: "Bilow" },
  { id: "casharka-koowaad", label: "Casharka koowaad", group: "Bilow" },
  { id: "daabac", label: "Daabac iyo daabacLn", group: "Aasaaska" },
  { id: "doorsomeyaal", label: "Doorsomeyaal", group: "Aasaaska" },
  { id: "noocyada-xogta", label: "Noocyada xogta", group: "Aasaaska" },
  { id: "xisaab", label: "Xisaab", group: "Aasaaska" },
  { id: "shuruudo", label: "Shuruudo", group: "Xakamaynta" },
  { id: "ku-celcelin", label: "Ku celcelin", group: "Xakamaynta" },
  { id: "taxaneyaal", label: "Taxaneyaal", group: "Xogta" },
  { id: "qabteyaal", label: "Qabteyaal", group: "Xogta" },
  { id: "caynyo", label: "Caynyo", group: "Caynyo" },
  { id: "dhaxal", label: "Dhaxal", group: "Caynyo" },
  { id: "mashruuca-koowaad", label: "Mashruucaaga koowaad", group: "Ku tababar" },
];

function Code({
  children,
  runnable = false,
}: {
  children: string;
  runnable?: boolean;
}) {
  const [code, setCode] = useState(children);
  const [output, setOutput] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [running, setRunning] = useState(false);

  async function runCode() {
    setRunning(true);
    setOutput(null);
    setError(null);

    try {
      const response = await fetch("/api/playground", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? "Code-ku ma socon.");
        return;
      }
      if (Array.isArray(data.errors) && data.errors.length > 0) {
        setError(data.errors.join("\n"));
        return;
      }
      setOutput(
        data.result || "Code-ku wuu dhammaaday, wax natiijo ahna ma soo saarin.",
      );
    } catch {
      setError("Goobta Tijaabinta lama xiriiri karo. Mar kale isku day.");
    } finally {
      setRunning(false);
    }
  }

  if (runnable) {
    return (
      <div className="runnable-code">
        <div className="code-toolbar">
          <span>Gob</span>
          <button disabled={running} onClick={runCode} type="button">
            {running ? (
              <LoaderCircle className="spin" size={15} />
            ) : (
              <Play size={15} />
            )}
            {running ? "Waa socdaa" : "Socodsii"}
          </button>
        </div>
        {/* Editor */}
        <Editor setCode={setCode} code={code} />
        {(output !== null || error !== null) && (
          <div className={`code-output ${error ? "error" : ""}`}>
            <strong>{error ? "Khalad" : "Natiijo"}</strong>
            <pre>{error ?? output}</pre>
          </div>
        )}
      </div>
    );
  }

  return (
    <pre className="doc-code">
      <code>{children}</code>
    </pre>
  );
}

function TopicContent({ id }: { id: string }) {
  switch (id) {
    case "lasoo-deg":
      return (
        <>
          <h1>Lasoo deg Gob</h1>
          <p className="lead">
            Lasoo deg CLI-ga Gob si aad barnaamijyada Gob uga orodsiiso
            kombiyuutarkaaga.
          </p>
          <a
            className="button button-dark"
            href="https://github.com/Luqadda-Gob/gob/releases"
            target="_blank"
            rel="noreferrer"
          >
            <Download size={18} /> Gob CLI
          </a>
          <h2>Windows</h2>
          <p>
            Fur faylka ZIP-ka aad lasoo degtay. Gudihiisa waxaad ka heli
            doontaa <code>gob.exe</code>.
          </p>
          <p>
            Faylasha Gob waxay ku dhammaadaan <code>.gob</code>. Si aad fayl u
            socodsiiso, terminal-ka ka fur galka uu yaallo kadib magaca
            executable-ka iyo faylka isku qor.
          </p>
          <p>Hubi inuu Gob shaqaynayo adigoo socodsiinaya fayl Gob ah:</p>
          <Code key="lasoo-deg-check">gob.exe -f hello.gob</Code>
          <p className="doc-note">
            Haddii Windows uusan helin <code>gob.exe</code>, ku qor jidka buuxa
            ama executable-ka iyo faylka Gob hal gal geli.
          </p>
        </>
      );
    case "cli":
      return (
        <>
          <h1>Isticmaalka CLI-ga</h1>
          <p className="lead">
            Gob CLI wuxuu kuu oggolaanayaa inaad fayl socodsiiso, code toos u
            qorto, ama aad aragto hagista amarrada.
          </p>
          <h2>Fayl Gob socodsii</h2>
          <p>
            Adeegso <code>-f</code> ama <code>--file</code>, kadib magaca faylka
            ku dhammaada <code>.gob</code>.
          </p>
          <Code key="cli-file">{`gob.exe -f hello.gob\n\ngob.exe --file hello.gob`}</Code>
          <h2>Code toos u qor</h2>
          <p>
            Adeegso <code>-q</code> ama <code>--qor</code> si aad terminal-ka
            dhexdiisa code Gob ugu qorto.
          </p>
          <Code key="cli-write">{`gob.exe -q\n\ngob.exe --qor`}</Code>
          <h2>Hagista amarrada</h2>
          <p>
            Adeegso <code>-c</code> ama <code>--caawi</code> si aad u aragto
            amarrada CLI-ga.
          </p>
          <Code key="cli-help">{`gob.exe -c\n\ngob.exe --caawi`}</Code>
          <p className="doc-note">
            Linux-ka, isticmaal <code>gob</code> halkii aad ka isticmaali
            lahayd <code>gob.exe</code>.
          </p>
        </>
      );
    case "casharka-koowaad":
      return (
        <>
          <h1>Casharka koowaad</h1>
          <p className="lead">Aan qorno barnaamijkeennii ugu horreeyay.</p>
          <p>
            Abuur fayl la yiraahdo <code>hello.gob</code>, kadib geli:
          </p>
          <Code key="casharka-koowaad-example" runnable>{`daabacLn "Salaan Gob";`}</Code>
          <p>
            <code>daabacLn</code> waa amar Gob ku yiraahda qoraalka ku jira
            calaamadaha xigashada soo bandhig. Calaamadda <code>;</code> waxay
            sheegaysaa halka amarku ku dhammaaday.
          </p>
          <p>Ku socodsii:</p>
          <Code key="casharka-koowaad-run">gob.exe -f hello.gob</Code>
          <p>Waxaad arki doontaa:</p>
          <Code key="casharka-koowaad-output">Salaan Gob</Code>
          <p className="doc-note">
            Hambalyo. Waxaad qortay barnaamijkaagii ugu horreeyay ee Gob.
          </p>
        </>
      );
    case "daabac":
      return (
        <>
          <h1>Daabac iyo daabacLn</h1>
          <p className="lead">
            Gob wuxuu leeyahay laba hab oo qoraal lagu soo bandhigo.
          </p>
          <Code key="daabac-example" runnable>{`daabac "Salaan";\ndaabacLn "Salaan";`}</Code>
          <p>
            <code>daabacLn</code> wuxuu ku daraa khad cusub marka uu dhammeeyo.
            <code> daabac</code> se qoraalka xiga isla khadka ayuu ku sii
            qorayaa.
          </p>
          <Code key="daabac-output">{`daabacLn "Gob";\ndaabacLn "Programming";\n\n// Natiijo:\nGob\nProgramming`}</Code>
        </>
      );
    case "doorsomeyaal":
      return (
        <>
          <h1>Doorsomeyaal</h1>
          <p className="lead">
            Doorsome waa meel xog lagu kaydiyo. Gob wuxuu isticmaalaa erayga{" "}
            <code>door</code>.
          </p>
          <Code key="doorsomeyaal-create" runnable>{`door magac = "Yaser";\ndoor da = 22;\n\ndaabacLn magac;`}</Code>
          <h2>Sida doorsome loo sameeyo</h2>
          <p>
            Marka hore qor <code>door</code>, kadib magac aad xogta ku garan
            doonto, calaamadda <code>=</code>, iyo qiimaha la kaydinayo.
          </p>
          <p>
            Qiimaha doorsomaha waa la beddeli karaa. Tusaalahan da&apos;du waxay
            ka bilaabanaysaa 22 kadibna waxay noqonaysaa 23.
          </p>
          <Code key="doorsomeyaal-update" runnable>{`door da = 22;\nda = 23;\ndaabacLn da;`}</Code>
        </>
      );
    case "noocyada-xogta":
      return (
        <>
          <h1>Noocyada xogta</h1>
          <p className="lead">Gob wuxuu leeyahay noocyo xogeed aasaasi ah.</p>
          <Code key="noocyada-xogta-types" runnable>{`// Qoraal\ndoor magac = "Gob";\n\n// Tiro\ndoor da = 22;\n\n// Run iyo been\ndoor sax = run;\ndoor khalad = been;\n\n// Ban\ndoor waxba = ban;`}</Code>
          <p>
            <code>ban</code> waxaa la isticmaalaa marka qiime aanu jirin.
          </p>
          <h2>Maxay noocyadu muhiim u yihiin?</h2>
          <p>
            Nooca xogtu wuxuu go&apos;aamiyaa waxa lagu samayn karo qiimaha.
            Tirooyin waa la isku dari karaa, qoraallo waa la isku xiri karaa,
            halka <code>run</code> iyo <code>been</code> lagu hago go&apos;aamada.
          </p>
          <Code key="noocyada-xogta-strings" runnable>{`door magacaKoowaad = "Gob";\ndoor magacaLabaad = " Language";\ndaabacLn magacaKoowaad + magacaLabaad;`}</Code>
        </>
      );
    case "xisaab":
      return (
        <>
          <h1>Xisaab</h1>
          <p className="lead">Gob wuxuu taageeraa xisaabaha caadiga ah.</p>
          <Code key="xisaab-operators" runnable>{`daabacLn 10 + 5;\ndaabacLn 10 - 5;\ndaabacLn 10 * 5;\ndaabacLn 10 / 5;\ndaabacLn 10 % 3;`}</Code>
          <p>
            Natiijada ugu dambeysa waa <code>1</code>, sababtoo ah 10 marka loo
            qaybiyo 3 hadhaagu waa 1.
          </p>
          <h2>Hormarinta xisaabta</h2>
          <p>
            Isticmaal qaws si aad u caddeyso xisaabta marka hawlo badan isku
            jiraan.
          </p>
          <Code key="xisaab-precedence" runnable>{`door qiime = (10 + 5) * 2;\ndaabacLn qiime;`}</Code>
        </>
      );
    case "shuruudo":
      return (
        <>
          <h1>Shuruudo</h1>
          <p className="lead">
            Barnaamijyada wanaagsan waxay awoodaan inay go&apos;aan gaaraan.
          </p>
          <p>
            Gob wuxuu isticmaalaa <code>kol</code>, <code>kolkale</code>, iyo{" "}
            <code>kale</code>.
          </p>
          <Code key="shuruudo-example" runnable>{`door score = 75;\n\nkol (score >= 90) {\n    daabacLn "A";\n} kolkale (score >= 70) {\n    daabacLn "B";\n} kale {\n    daabacLn "C";\n}`}</Code>
          <h2>Sida loo akhriyo</h2>
          <p>
            Gob wuxuu marka hore hubiyaa shuruudda <code>kol</code>. Haddii ay
            been noqoto wuxuu u gudbaa <code>kolkale</code>. Haddii dhammaantood
            been noqdaan, qaybta <code>kale</code> ayaa shaqaysa.
          </p>
          <p>
            Isbarbardhigyada caadiga ah waa <code>==</code>, <code>!=</code>,{" "}
            <code>&gt;</code>, <code>&lt;</code>, <code>&gt;=</code>, iyo{" "}
            <code>&lt;=</code>.
          </p>
        </>
      );
    case "ku-celcelin":
      return (
        <>
          <h1>Ku celcelin</h1>
          <p className="lead">
            Code isku mid ah si fudud marar badan u socodsii.
          </p>
          <p>
            <code>intay</code> iyo <code>wareeg</code> ayaa loo isticmaalaa ku
            celcelinta.
          </p>
          <Code key="ku-celcelin-example" runnable>{`door i = 0;\n\nintay (i < 5) {\n    daabacLn i;\n    i += 1;\n}\n\nwareeg (door j = 0; j < 5; j += 1) {\n    daabacLn j;\n}`}</Code>
          <h2>Intay iyo wareeg</h2>
          <p>
            Isticmaal <code>intay</code> marka ku celcelintu ku xiran tahay
            shuruud. Isticmaal <code>wareeg</code> marka aad hore u ogtahay
            tirada jeer ee code-ku shaqaynayo.
          </p>
          <p className="doc-note">
            Hubi in shuruudda <code>intay</code> mar uun been noqon karto;
            haddii kale wareeggu ma dhammaanayo.
          </p>
        </>
      );
    case "taxaneyaal":
      return (
        <>
          <h1>Taxaneyaal</h1>
          <p className="lead">Taxane waa ururin xog ah.</p>
          <Code key="taxaneyaal-basics" runnable>{`door magacyo = ["Ali", "Ayaan", "Yaser"];\n\ndaabacLn magacyo[0];\nmagacyo[1] = "Ahmed";\ndaabacLn dherer(magacyo);`}</Code>
          <p>
            Boosaska taxanuhu waxay ka bilaabmaan <code>0</code>. Sidaas darteed
            <code>magacyo[0]</code> waa qiimaha koowaad, halka{" "}
            <code>dherer(magacyo)</code> uu soo celinayo tirada qiimayaasha.
          </p>
          <h2>Taxane ku dhex wareeg</h2>
          <Code key="taxaneyaal-loop" runnable>{`door tirooyin = [2, 4, 6, 8];\n\nwareeg (door i = 0; i < dherer(tirooyin); i += 1) {\n    daabacLn tirooyin[i];\n}`}</Code>
        </>
      );
    case "qabteyaal":
      return (
        <>
          <h1>Qabteyaal</h1>
          <p className="lead">Qabte waa shaqo dib loo isticmaali karo.</p>
          <Code key="qabteyaal-example" runnable>{`qabte salaan(magac) {\n    daabacLn "Salaan " + magac;\n}\n\nqabte iskuDar(a, b) {\n    celi a + b;\n}\n\ndoor jawaab = iskuDar(10, 20);\ndaabacLn jawaab;`}</Code>
          <p>
            Qiimayaasha qabtuhu qaato waxaa la yiraahdaa parameters. Erayga{" "}
            <code>celi</code> wuxuu jawaabta qabtaha dib ugu gudbiyaa meesha
            laga wacay.
          </p>
          <p>
            Qabte samee marka shaqo isku mid ah meelo badan looga baahan yahay.
            Tani waxay code-ka ka dhigtaa mid gaaban oo si fudud loo hagaajin
            karo.
          </p>
        </>
      );
    case "caynyo":
      return (
        <>
          <h1>Caynyo</h1>
          <p className="lead">
            Cayn wuxuu kuu oggolaanayaa inaad samaysato noocyo cusub.
          </p>
          <p>
            <code>kan</code> wuxuu tilmaamayaa object-ka hadda shaqaynaya.
          </p>
          <Code key="caynyo-example" runnable>{`cayn Qof {\n    Qof(magac) {\n        kan.magac = magac;\n    }\n\n    salaan() {\n        daabacLn "Salaan";\n    }\n}`}</Code>
          <p>
            Constructor-ku wuxuu diyaariyaa object cusub. Methods-ku waa
            qabteyaal uu object-ku leeyahay, halka <code>kan</code> uu kuu
            oggolaanayo inaad la shaqeyso object-kaas xogtiisa.
          </p>
        </>
      );
    case "dhaxal":
      return (
        <>
          <h1>Dhaxal</h1>
          <p className="lead">Cayn wuxuu ka dhaxli karaa cayn kale.</p>
          <p>
            <code>ab</code> wuxuu tilmaamayaa caynka laga dhaxlay.
          </p>
          <Code key="dhaxal-example" runnable>{`cayn Arday dhaxal Qof {\n    salaan() {\n        ab.salaan();\n    }\n}`}</Code>
          <p>
            Dhaxalku wuxuu kaa ilaalinayaa inaad dib u qorto waxyaabaha ay
            caynyadu wadaagaan. <code>Arday</code> wuxuu helayaa awoodaha{" "}
            <code>Qof</code>, kadibna wuxuu ku dari karaa ama beddeli karaa
            dhaqankiisa.
          </p>
        </>
      );
    case "mashruuca-koowaad":
      return (
        <>
          <h1>Mashruucaaga koowaad: Xisaabiye</h1>
          <p className="lead">
            Isku keen doorsomeyaal, xisaab, iyo shuruudo si aad u dhisto
            xisaabiye yar.
          </p>
          <p>
            Xisaabiyuhu wuxuu hayaa laba tiro iyo calaamadda hawsha la rabo.
            Beddel <code>hawl</code> una dhig <code>+</code>, <code>-</code>,{" "}
            <code>*</code>, ama <code>/</code>, kadib socodsii.
          </p>
          <Code key="mashruuca-koowaad-calculator" runnable>{`door tiroKoowaad = 20;\ndoor tiroLabaad = 5;\ndoor hawl = "+";\n\nkol (hawl == "+") {\n    daabacLn tiroKoowaad + tiroLabaad;\n} kolkale (hawl == "-") {\n    daabacLn tiroKoowaad - tiroLabaad;\n} kolkale (hawl == "*") {\n    daabacLn tiroKoowaad * tiroLabaad;\n} kolkale (hawl == "/") {\n    kol (tiroLabaad == 0) {\n        daabacLn "Eber wax laguma qaybin karo";\n    } kale {\n        daabacLn tiroKoowaad / tiroLabaad;\n    }\n} kale {\n    daabacLn "Hawl aan la aqoon";\n}`}</Code>
          <h2>Waxaad ku tababaranaysaa</h2>
          <ul>
            <li>Kaydinta tirooyinka iyo hawsha la dooranayo</li>
            <li>Isbarbardhigga qoraalka iyadoo la adeegsanayo shuruudo</li>
            <li>Ka hortagga in tiro eber lagu qaybiyo</li>
            <li>Soo bandhigista qalad marka hawshu sax ahayn</li>
          </ul>
          <p className="doc-note">
            Caqabad: ku dar hawsha <code>%</code> si xisaabiyuhu u soo celiyo
            hadhaaga qaybinta.
          </p>
        </>
      );
    default:
      return (
        <>
          <h1>Programming-ka ka bilow afkaaga.</h1>
          <p className="lead">
            Ku soo dhawoow hagaha Gob. Hagahan waxaa loo qoray si qof aan
            waligiis code qorin uu uga bilaabi karo eber.
          </p>
          <p>
            Gob waa luuqad programming oo loogu talagalay in programming-ka
            lagu barto Af-Soomaali. Ujeeddada Gob ma aha inuu beddelo Java,
            Python, ama C++, balse waa inuu albaabka programming-ka ka dhigo mid
            fudud oo afkaaga ku qoran.
          </p>
          <h2>Waxaad baran doontaa</h2>
          <ul className="topic-list">
            <li>Doorsomeyaal iyo noocyada xogta</li>
            <li>Xisaab iyo shuruudo</li>
            <li>Ku celcelin iyo taxaneyaal</li>
            <li>Qabteyaal, caynyo, iyo dhaxal</li>
          </ul>
          <p className="doc-note">
            Ka dooro mawduuc sidebar-ka si aad u bilowdo.
          </p>
        </>
      );
  }
}

export function Guide() {
  const [selectedId, setSelectedId] = useState(topics[0].id);
  const selectedIndex = topics.findIndex((topic) => topic.id === selectedId);
  const selected = topics[selectedIndex];
  const groups = [...new Set(topics.map((topic) => topic.group))];

  function selectTopic(id: string) {
    setSelectedId(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className="docs-layout">
      <aside className="docs-sidebar">
        <strong>Hagaha Gob</strong>
        <nav aria-label="Qaybaha hagaha">
          {groups.map((group) => (
            <div className="docs-nav-group" key={group}>
              <span>{group}</span>
              {topics
                .filter((topic) => topic.group === group)
                .map((topic) => (
                  <button
                    className={topic.id === selectedId ? "active" : ""}
                    key={topic.id}
                    onClick={() => selectTopic(topic.id)}
                    type="button"
                  >
                    {topic.label}
                  </button>
                ))}
            </div>
          ))}
        </nav>
      </aside>

      <div className="docs-mobile-select">
        <label htmlFor="guide-topic">Dooro mawduuc</label>
        <select
          id="guide-topic"
          value={selectedId}
          onChange={(event) => selectTopic(event.target.value)}
        >
          {topics.map((topic) => (
            <option key={topic.id} value={topic.id}>
              {topic.label}
            </option>
          ))}
        </select>
      </div>

      <article className="docs-content">
        <span className="kicker">
          Hagaha Gob / {selected.group}
        </span>
        <TopicContent id={selectedId} />

        <nav className="docs-pagination" aria-label="Mawduucyada hagaha">
          {selectedIndex > 0 ? (
            <button
              type="button"
              onClick={() => selectTopic(topics[selectedIndex - 1].id)}
            >
              <ArrowLeft size={17} />
              <span>
                Hore
                <strong>{topics[selectedIndex - 1].label}</strong>
              </span>
            </button>
          ) : (
            <span />
          )}
          {selectedIndex < topics.length - 1 && (
            <button
              className="next"
              type="button"
              onClick={() => selectTopic(topics[selectedIndex + 1].id)}
            >
              <span>
                Xiga
                <strong>{topics[selectedIndex + 1].label}</strong>
              </span>
              <ArrowRight size={17} />
            </button>
          )}
        </nav>
      </article>
    </main>
  );
}
