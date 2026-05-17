import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './cgu.module.css';

export const metadata: Metadata = {
  title: "Conditions Générales d'Utilisation & de Vente",
  description:
    "Consultez les CGU et CGV de Dar El Sanna, conformes aux lois marocaines 31-08 (protection du consommateur), 09-08 (données personnelles) et 53-05 (commerce électronique).",
  robots: { index: true, follow: false },
};


export default function CguPage() {
  return (
    <div className={styles.cguPage}>
      <div className="container">
        {/* Header Section */}
        <header className={styles.header}>
          <span className={styles.brand}>Dar El Sanna</span>
          <h1 className={styles.title}>Conditions Générales d'Utilisation & de Vente</h1>
          <p className={styles.date}>Dernière mise à jour : 17 Mai 2026</p>
        </header>

        {/* Legal Content Grid */}
        <div className={styles.content}>
          <p className={styles.intro}>
            Bienvenue sur la galerie numérique <strong>Dar El Sanna</strong> (ou <em>Moorish Elegance</em>). Les présentes Conditions Générales d'Utilisation et de Vente (CGU/CGV) régissent l'accès, la navigation et l'acquisition d'œuvres d'art, de haute bijouterie, de haute horlogerie et de haute parfumerie sur le site. En accédant au site et en passant commande, vous acceptez sans réserve les présentes conditions, établies en stricte conformité avec la législation du Royaume du Maroc.
          </p>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Article 1 : Cadre Législatif et Réglementaire</h2>
            <p>
              Les présentes conditions sont régies et interprétées conformément au droit marocain. La vente à distance sur ce site est encadrée spécifiquement par :
            </p>
            <ul className={styles.list}>
              <li>
                <strong>La Loi n° 31-08</strong> édictant des mesures de protection du consommateur, notamment en ce qui concerne les contrats conclus à distance, l'obligation d'information précontractuelle et le droit de rétractation.
              </li>
              <li>
                <strong>La Loi n° 09-08</strong> relative à la protection des personnes physiques à l'égard du traitement des données à caractère personnel.
              </li>
              <li>
                <strong>La Loi n° 53-05</strong> relative à l'échange électronique de données juridiques, encadrant la validité des contrats électroniques et de la signature électronique.
              </li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Article 2 : Identification de l'Éditeur & de la Conciergerie</h2>
            <p>
              Le site <strong>Dar El Sanna</strong> est édité par la société <em>Moorish Elegance S.A.R.L. d'Associé Unique</em>, au capital social de 100 000 DH, dont le siège social est situé à la Médina de Marrakech, immatriculée au Registre du Commerce de Marrakech sous le numéro RC 98765. 
            </p>
            <p>
              Pour toute demande spéciale, personnalisation ou suivi de commande d'exception, notre Conciergerie Royale est joignable à l'adresse email : <code>conciergerie@darelsanna.ma</code> ou via notre formulaire dédié.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Article 3 : Caractéristiques des Créations d'Exception</h2>
            <p>
              Chaque produit présenté sur le site est une œuvre d'art haut de gamme. Les descriptions, fiches techniques (poinçons d'État pour l'argent 925, mécanismes automatiques suisses pour l'horlogerie, pyramide olfactive pour la haute parfumerie) et photographies contractuelles sont présentées avec la plus grande précision.
            </p>
            <p>
              Les œuvres portant la mention <strong>"Pièce Unique"</strong> sont exclusives et ne peuvent être reproduites à l'identique. Les mentions <strong>"Édition Limitée"</strong> et <strong>"Édition Privée"</strong> font l'objet d'un nombre restreint d'exemplaires numérotés.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Article 4 : Tarification et Paiement Électronique (Loi 53-05)</h2>
            <p>
              Les prix de nos créations sont indiqués en <strong>Dirhams Marocains (MAD / DH)</strong>, toutes taxes comprises (TVA marocaine de 20% incluse), hors frais de livraison spécifique éventuels.
            </p>
            <p>
              Conformément à la <strong>Loi n° 53-05</strong>, la validation finale de votre commande et la saisie de vos coordonnées de paiement valent signature électronique et acceptation du contrat de vente. Le paiement en ligne s'effectue de manière hautement sécurisée via nos partenaires de paiement agréés par le CMI (Centre Monétique Interbancaire).
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Article 5 : Livraison et Réception</h2>
            <p>
              Nos créations d'exception sont expédiées sous colis sécurisé avec valeur déclarée et remise contre signature obligatoire. Nous livrons sur tout le territoire du Royaume du Maroc et à l'international via des transporteurs de confiance (ex: DHL, Aramex). Les délais moyens de livraison sont de 2 à 5 jours ouvrés au Maroc et de 5 à 10 jours ouvrés pour le reste du monde.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Article 6 : Droit de Rétractation Légal (Loi 31-08)</h2>
            <p>
              Conformément à l'article 36 de la <strong>Loi n° 31-08</strong> relative à la protection du consommateur, l'acheteur dispose d'un délai légal de <strong>sept (7) jours francs</strong> à compter de la réception de sa création pour exercer son droit de rétractation, sans avoir à justifier de motifs ni à payer de pénalités.
            </p>
            <div className={styles.alert}>
              <p>
                <strong>Important :</strong> Les frais de retour sont exclusivement à la charge de l'acheteur. Les créations doivent être retournées dans leur écrin d'origine scellé, intactes, non portées (pour les bijoux et montres) et non ouvertes (pour les flacons de parfum en raison de leur caractère d'hygiène et de sécurité).
              </p>
            </div>
            <p>
              Tout retour de produit endommagé, ouvert, ou dont le sillage a été entamé ne fera l'objet d'aucun remboursement.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Article 7 : Protection des Données Personnelles (Loi 09-08 & CNDP)</h2>
            <p>
              Conformément à la <strong>Loi n° 09-08</strong> relative à la protection des personnes physiques à l'égard du traitement des données à caractère personnel, les informations recueillies sur le site sont destinées exclusivement au traitement de votre commande et aux services personnalisés de notre Conciergerie.
            </p>
            <p>
              Ce traitement de données a fait l'objet d'une déclaration auprès de la <strong>CNDP (Commission Nationale de contrôle de la protection des Données à caractère personnel)</strong> sous le numéro de récépissé <em>D-W-123/2026</em>. Vous disposez d'un droit d'accès, de rectification et d'opposition au traitement de vos données en contactant notre Conciergerie par email.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Article 8 : Litiges et Attribution de Juridiction</h2>
            <p>
              En cas de réclamation, l'acheteur s'engage à contacter en priorité notre Conciergerie afin de rechercher une solution amiable. 
            </p>
            <p>
              À défaut d'accord amiable, tout litige relatif à l'interprétation, la validité ou l'exécution du présent contrat sera soumis à la compétence exclusive du <strong>Tribunal de Commerce de Marrakech</strong> ou du <strong>Tribunal de Commerce de Casablanca</strong>, le droit marocain étant le seul applicable.
            </p>
          </section>
        </div>

        <div className={styles.footer}>
          <Link href="/" className={styles.backLink}>
            Retourner à l'Accueil
          </Link>
          <Link href="/collections" className={styles.catalogLink}>
            Explorer les Collections
          </Link>
        </div>
      </div>
    </div>
  );
}
