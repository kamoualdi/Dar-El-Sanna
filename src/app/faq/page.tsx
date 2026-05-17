import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './faq.module.css';

export const metadata: Metadata = {
  title: 'Questions Fréquentes — Dar El Sanna',
  description: 'Trouvez les réponses à vos questions sur Dar El Sanna : livraison, paiement, authenticité, retours et conciergerie WhatsApp.',
};

const faqs = [
  {
    question: "Qu'est-ce que Dar El Sanna ?",
    answer: "Dar El Sanna est une galerie numérique d'exception dédiée à l'artisanat marocain de luxe. Nous proposons des pièces uniques de haute bijouterie, haute parfumerie, haute horlogerie et antiquités rares, toutes façonnées à la main par les Maâlems du Maroc."
  },
  {
    question: "Comment passer commande ?",
    answer: "Toutes nos acquisitions se font exclusivement via notre Conciergerie WhatsApp. Cliquez sur le bouton 'Acquérir cette création' sur la page produit ou contactez-nous directement. Notre équipe vous accompagnera personnellement dans votre achat."
  },
  {
    question: "Les produits sont-ils authentiques ?",
    answer: "Absolument. Chaque pièce est accompagnée d'un certificat d'authenticité Dar El Sanna. Les bijoux en argent portent le poinçon officiel du Royaume du Maroc. Les antiquités sont certifiées avec un rapport historique et un exeat d'exportation."
  },
  {
    question: "Quels sont les délais de livraison ?",
    answer: "Nous livrons en 2 à 5 jours ouvrés au Maroc et en 5 à 10 jours ouvrés à l'international via DHL ou Aramex. Chaque colis est sécurisé avec valeur déclarée et remise contre signature."
  },
  {
    question: "Puis-je retourner un produit ?",
    answer: "Conformément à la Loi n° 31-08, vous disposez de 7 jours francs après réception pour exercer votre droit de rétractation. Les produits doivent être retournés dans leur écrin d'origine, intacts et non utilisés."
  },
  {
    question: "Les montres sont-elles de vraies marques ?",
    answer: "Nos créations horlogères sont des pièces d'inspiration, conçues sous la direction de Dar El Sanna avec des mouvements suisses ou japonais de qualité. Elles ne sont pas affiliées aux grandes marques horlogères."
  },
  {
    question: "Proposez-vous la personnalisation ?",
    answer: "Oui. Chaque création peut être personnalisée selon vos souhaits. Contactez notre Conciergerie WhatsApp pour discuter de vos envies : gravure, taille, matériau, ou création sur mesure."
  },
  {
    question: "Quels modes de paiement acceptez-vous ?",
    answer: "Le paiement se fait de manière sécurisée via nos partenaires de paiement agréés par le CMI (Centre Monétique Interbancaire). Nous acceptons les cartes bancaires marocaines et internationales."
  },
];

export default function FaqPage() {
  return (
    <div className={styles.faqPage}>
      <div className="container">
        <header className={styles.header}>
          <span className={styles.brand}>Dar El Sanna</span>
          <h1 className={styles.title}>Questions Fréquentes</h1>
          <p className={styles.subtitle}>
            Tout ce que vous devez savoir avant d'acquérir une création d'exception.
          </p>
        </header>

        <div className={styles.faqList}>
          {faqs.map((faq, index) => (
            <details key={index} className={styles.faqItem}>
              <summary className={styles.question}>{faq.question}</summary>
              <p className={styles.answer}>{faq.answer}</p>
            </details>
          ))}
        </div>

        <div className={styles.cta}>
          <p>Vous avez d'autres questions ?</p>
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '212600000000'}?text=Bonjour%20Dar%20El%20Sanna%2C%20j%27ai%20une%20question.`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaButton}
          >
            Contacter la Conciergerie
          </a>
        </div>

        <div className={styles.footer}>
          <Link href="/" className={styles.backLink}>Retour à l'Accueil</Link>
        </div>
      </div>
    </div>
  );
}
