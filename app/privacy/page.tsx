import type { Metadata } from "next";
import { Footer, Header } from "../site-chrome";

export const metadata: Metadata = {
  title: "Asturnaanta",
  description: "Siyaasadda asturnaanta ee Gob.",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="legal-page">
        <span className="kicker">Asturnaanta</span>
        <h1>Siyaasadda asturnaanta</h1>
        <p className="lead">
          Gob wuxuu ururiyaa keliya xogta loo baahan yahay si akoonkaaga,
          waxbarashadaada, iyo adeegga app-ku u shaqeeyaan. Boggan waa qabyo
          hordhac ah waana in dib loo xaqiijiyaa ka hor public release-ka.
        </p>

        <h2>Xogta aan kaydin karno</h2>
        <ul>
          <li>Magaca, email-ka, iyo sawirka profile-ka</li>
          <li>Habka aad akoonka ku samaysatay</li>
          <li>Casharrada iyo mawduucyada aad bilowday ama dhammaysay</li>
          <li>Xog farsamo oo loo baahan yahay ogaanshaha ciladaha</li>
        </ul>

        <h2>Sida xogta loo isticmaalo</h2>
        <p>
          Xogta waxaa loo isticmaalaa xaqiijinta akoonka, kaydinta horumarkaaga,
          hagaajinta adeegga, iyo ka jawaabidda codsiyada caawimaadda. Gob ma
          iibiyo xogta isticmaalayaasha.
        </p>

        <h2>Adeegyada dhinac saddexaad</h2>
        <p>
          App-ku wuxuu isticmaali karaa adeegyada Firebase iyo Google si uu u
          bixiyo authentication, ilaalinta app-ka, iyo ogaanshaha ciladaha.
        </p>

        <h2>Xakamaynta xogtaada</h2>
        <p>
          Waxaad sixi kartaa macluumaadkaaga ama tirtiri kartaa akoonkaaga iyo
          xogta la xiriirta adigoo adeegsanaya app-ka Gob.
        </p>
      </main>
      <Footer />
    </>
  );
}
