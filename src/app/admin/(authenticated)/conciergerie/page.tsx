'use client';

import { useState } from 'react';
import { products } from '../../../../data/products';
import styles from '../../admin.module.css';

interface Lead {
  id: string;
  clientName: string;
  city: string;
  productName: string;
  productPrice: number;
  date: string;
  status: 'Nouveau' | 'En Négociation' | 'Traité' | 'Archivé';
  phone: string;
}

export default function ConciergeriePage() {
  // Leads initial state
  const [leads, setLeads] = useState<Lead[]>([
    {
      id: 'L-101',
      clientName: 'S.A.R. Princesse Lalla M.',
      city: 'Rabat',
      productName: "L'Astral de Fès (Squelette)",
      productPrice: 24000,
      date: "Aujourd'hui, 14:32",
      status: 'En Négociation',
      phone: '212661234567'
    },
    {
      id: 'L-102',
      clientName: 'M. Mehdi El Fassi',
      city: 'Casablanca (Anfa)',
      productName: 'Chronographe Moresque I',
      productPrice: 18500,
      date: "Aujourd'hui, 11:15",
      status: 'Nouveau',
      phone: '212662987654'
    },
    {
      id: 'L-103',
      clientName: 'Dr. Yasmina Benjelloun',
      city: 'Tanger',
      productName: 'Médèrsa — Grande Complication Tourbillon',
      productPrice: 145000,
      date: 'Hier, 18:45',
      status: 'Nouveau',
      phone: '212663111222'
    },
    {
      id: 'L-104',
      clientName: 'S.E. Ambassadeur de France',
      city: 'Rabat (Résidence)',
      productName: 'Astrolabe en Laiton de Fès (XVIIIe Siècle)',
      productPrice: 75000,
      date: '15 Mai 2026',
      status: 'Traité',
      phone: '212664555666'
    },
    {
      id: 'L-105',
      clientName: 'Mme. Kenza Glaoui',
      city: 'Marrakech (Palmeraie)',
      productName: 'Soir de Marrakech - Eau de Parfum',
      productPrice: 1450,
      date: '12 Mai 2026',
      status: 'Archivé',
      phone: '212665999888'
    }
  ]);

  // Composer Form States
  const [selectedProductId, setSelectedProductId] = useState<string>(products[0].id);
  const [vipName, setVipName] = useState<string>('S.A.R. Princesse Lalla M.');
  const [customPrice, setCustomPrice] = useState<string>('');
  const [messageType, setMessageType] = useState<'info' | 'discount' | 'invite' | 'shipping'>('info');
  const [isCopied, setIsCopied] = useState<boolean>(false);

  // Active product calculation
  const activeProduct = products.find(p => p.id === selectedProductId) || products[0];
  const finalPrice = customPrice ? parseInt(customPrice, 10) : activeProduct.price;

  // Real-time custom message text compiler
  const generateMessageText = () => {
    const formattedPrice = finalPrice.toLocaleString('fr-MA');
    
    switch (messageType) {
      case 'info':
        return `Cher/Chère ${vipName},\n\nNous avons l'honneur de vous présenter notre œuvre d'exception : "${activeProduct.name}" (${activeProduct.brand}).\n\nCette pièce unique façonnée à la main repose sur un savoir-faire rare : ${activeProduct.material}.\n\nElle est disponible à l'acquisition conciergerie au tarif de ${formattedPrice} MAD. Souhaitez-vous que nous planifions une présentation privée ou une expédition sécurisée ?\n\nAvec nos salutations distinguées,\nLa Conciergerie Dar El Sanna`;
      
      case 'discount':
        return `Cher/Chère ${vipName},\n\nDans le cadre de nos offres réservées à nos plus fidèles collectionneurs, la Conciergerie Dar El Sanna a le plaisir de vous proposer une offre privilégiée sur l'œuvre d'exception :\n\n💎 "${activeProduct.name}" (${activeProduct.brand})\n\nNous vous proposons cette pièce unique au tarif exclusif de ${formattedPrice} MAD (au lieu de ${activeProduct.price.toLocaleString('fr-MA')} MAD).\n\nCette offre est valable pour les prochaines 48 heures. Souhaitez-vous valider cette réservation ?\n\nCordialement,\nLa Conciergerie Royale`;
      
      case 'invite':
        return `Cher/Chère ${vipName},\n\nLa Maison Dar El Sanna a l'immense honneur de vous convier à une séance de présentation privée de notre catalogue d'art précieux.\n\nA cette occasion, nous serions ravis de vous dévoiler en exclusivité :\n👉 "${activeProduct.name}" (${activeProduct.brand}), une œuvre d'une rareté absolue ciselée avec : ${activeProduct.material}.\n\nNous nous tenons à votre entière disposition pour fixer la date et l'heure de votre accueil.\n\nRespectueusement,\nDar El Sanna Conciergerie`;
      
      case 'shipping':
        return `Cher/Chère ${vipName},\n\nLa Conciergerie Royale Dar El Sanna a le plaisir de vous informer que votre commande pour l'œuvre d'exception "${activeProduct.name}" est prête pour expédition.\n\nNotre transporteur sécurisé de prestige effectuera la livraison à votre adresse sous pli scellé.\n\nMontant de l'acquisition : ${formattedPrice} MAD.\nNous vous remercions pour votre confiance et restons à votre entière disposition.\n\nSalutations distinguées,\nVotre Concierge Dar El Sanna`;
      
      default:
        return '';
    }
  };

  // Compile WhatsApp URL
  const compiledMessage = generateMessageText();
  const phoneVal = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '212600000000';
  const whatsappUrl = `https://wa.me/${phoneVal}?text=${encodeURIComponent(compiledMessage)}`;

  // Copy customized text to clipboard
  const handleCopyText = () => {
    navigator.clipboard.writeText(compiledMessage);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  // Toggle lead status in real time
  const handleToggleStatus = (id: string) => {
    setLeads(leads.map(lead => {
      if (lead.id === id) {
        const statusMap: Record<Lead['status'], Lead['status']> = {
          'Nouveau': 'En Négociation',
          'En Négociation': 'Traité',
          'Traité': 'Archivé',
          'Archivé': 'Nouveau'
        };
        return { ...lead, status: statusMap[lead.status] };
      }
      return lead;
    }));
  };

  // Get status color styling
  const getStatusStyle = (status: Lead['status']) => {
    switch (status) {
      case 'Nouveau':
        return { bg: 'rgba(239, 68, 68, 0.08)', color: '#ef4444' };
      case 'En Négociation':
        return { bg: 'rgba(212, 175, 55, 0.12)', color: '#B8860B' };
      case 'Traité':
        return { bg: 'rgba(22, 163, 74, 0.08)', color: '#16a34a' };
      case 'Archivé':
        return { bg: '#f3f4f6', color: '#6b7280' };
    }
  };

  return (
    <>
      {/* Title block */}
      <div className={styles.pageHeader} style={{ borderBottom: '1px solid #eaeaea', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
        <h1 className={styles.pageTitle} style={{ margin: 0, fontWeight: 400, fontFamily: 'var(--font-playfair)' }}>
          Conciergerie Royale & Ventes VIP
        </h1>
        <p style={{ color: '#666', margin: '0.25rem 0 0 0', fontSize: '0.85rem' }}>
          Génération de messages de prestige et gestion de la clientèle haut de gamme
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem', alignItems: 'start' }}>
        
        {/* LEFT COLUMN: INTERACTIVE MESSAGE COMPOSER */}
        <div style={{ backgroundColor: 'white', border: '1px solid #eaeaea', borderRadius: '8px', padding: '2rem', boxShadow: '0 2px 12px rgba(0,0,0,0.015)' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, borderBottom: '1px solid #eaeaea', paddingBottom: '0.75rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.25rem' }}>✍️</span> Générateur de Pitch de Prestige
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            {/* 1. Select Product */}
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#666', display: 'block', marginBottom: '0.5rem' }}>
                Sélectionner l'œuvre concernée
              </label>
              <select
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.7rem 1rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '0.9rem',
                  outline: 'none',
                  backgroundColor: '#fff',
                  fontFamily: 'inherit'
                }}
              >
                {products.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.price.toLocaleString('fr-MA')} MAD)
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Client Name & Offer Price */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#666', display: 'block', marginBottom: '0.5rem' }}>
                  Nom du Client VIP
                </label>
                <input
                  type="text"
                  value={vipName}
                  onChange={(e) => setVipName(e.target.value)}
                  placeholder="Ex: Mme. Laroui"
                  style={{
                    width: '100%',
                    padding: '0.7rem 1rem',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#666', display: 'block', marginBottom: '0.5rem' }}>
                  Prix d'offre (MAD)
                </label>
                <input
                  type="number"
                  value={customPrice}
                  onChange={(e) => setCustomPrice(e.target.value)}
                  placeholder={`Par défaut : ${activeProduct.price} MAD`}
                  style={{
                    width: '100%',
                    padding: '0.7rem 1rem',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            {/* 3. Message Type Selector */}
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#666', display: 'block', marginBottom: '0.5rem' }}>
                Angle de communication / Type d'envoi
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                {[
                  { id: 'info', label: 'Présentation Exclusive' },
                  { id: 'discount', label: 'Offre Privilège (Remise)' },
                  { id: 'invite', label: 'Invitation Showroom' },
                  { id: 'shipping', label: 'Avis de Livraison' }
                ].map(type => (
                  <button
                    key={type.id}
                    onClick={() => setMessageType(type.id as any)}
                    style={{
                      padding: '0.6rem 0.85rem',
                      borderRadius: '4px',
                      border: messageType === type.id ? '1px solid #D4AF37' : '1px solid #ddd',
                      backgroundColor: messageType === type.id ? 'rgba(212,175,55,0.05)' : '#fff',
                      color: messageType === type.id ? '#8A640F' : '#555',
                      fontWeight: 600,
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {messageType === type.id ? '✨ ' : ''} {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Textarea Live compiler */}
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#666', display: 'block', marginBottom: '0.5rem' }}>
                Rendu du message de prestige
              </label>
              <textarea
                readOnly
                value={compiledMessage}
                style={{
                  width: '100%',
                  height: '220px',
                  padding: '1rem',
                  backgroundColor: '#fafafa',
                  border: '1px solid #eaeaea',
                  borderRadius: '6px',
                  fontFamily: 'monospace',
                  fontSize: '0.85rem',
                  lineHeight: '1.5',
                  color: '#333',
                  resize: 'none',
                  outline: 'none'
                }}
              />
            </div>

            {/* 5. CTA Buttons */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                onClick={handleCopyText}
                style={{
                  flex: 1,
                  padding: '0.8rem',
                  backgroundColor: '#fff',
                  color: '#333',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f9f9f9'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#fff'; }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                {isCopied ? 'Texte copié !' : 'Copier le message'}
              </button>
              
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  flex: 1.2,
                  padding: '0.8rem',
                  backgroundColor: '#16a34a',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  textAlign: 'center',
                  transition: 'all 0.2s',
                  boxShadow: '0 4px 12px rgba(22, 163, 74, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#15803d'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#16a34a'; }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                Envoyer via WhatsApp
              </a>
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: SALES LEADS PIPELINE */}
        <div style={{ backgroundColor: 'white', border: '1px solid #eaeaea', borderRadius: '8px', padding: '2rem', boxShadow: '0 2px 12px rgba(0,0,0,0.015)' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, borderBottom: '1px solid #eaeaea', paddingBottom: '0.75rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.25rem' }}>📊</span> Suivi des Inquiries VIP ({leads.length})
          </h2>

          <p style={{ color: '#666', fontSize: '0.8rem', lineHeight: '1.5', marginBottom: '1.25rem' }}>
            Consultez les dernières intentions d'acquisition de vos clients de prestige. Vous pouvez cliquer sur le statut d'une fiche pour le faire progresser dans votre processus de vente.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {leads.map(lead => {
              const statusStyle = getStatusStyle(lead.status);
              return (
                <div
                  key={lead.id}
                  style={{
                    border: '1px solid #f0f0f0',
                    borderRadius: '6px',
                    padding: '1.15rem',
                    transition: 'all 0.2s',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#D4AF37';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.02)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#f0f0f0';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {/* Lead ID & Date header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                    <code style={{ fontSize: '0.7rem', color: '#999', backgroundColor: '#f9f9f9', padding: '0.1rem 0.35rem', borderRadius: '3px' }}>
                      {lead.id}
                    </code>
                    <span style={{ fontSize: '0.75rem', color: '#989898' }}>{lead.date}</span>
                  </div>

                  {/* Client name & city */}
                  <div style={{ fontWeight: 600, color: '#1a1a1a', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    {lead.clientName}
                    <span style={{ fontWeight: 400, color: '#888', fontSize: '0.75rem' }}>
                      ({lead.city})
                    </span>
                  </div>

                  {/* Product interested in */}
                  <div style={{ fontSize: '0.8rem', color: '#555', marginTop: '0.35rem' }}>
                    Intérêt : <strong>{lead.productName}</strong>
                  </div>

                  {/* Price */}
                  <div style={{ fontSize: '0.85rem', color: '#1a1a1a', fontWeight: 600, marginTop: '0.2rem' }}>
                    {lead.productPrice.toLocaleString('fr-MA')} MAD
                  </div>

                  {/* Actions & Status row */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid #f9f9f9' }}>
                    {/* Status Pill with Toggle */}
                    <button
                      onClick={() => handleToggleStatus(lead.id)}
                      title="Cliquez pour changer le statut"
                      style={{
                        padding: '0.25rem 0.65rem',
                        borderRadius: '3px',
                        border: 'none',
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        backgroundColor: statusStyle.bg,
                        color: statusStyle.color,
                        outline: 'none',
                        transition: 'all 0.15s'
                      }}
                    >
                      {lead.status} ⇄
                    </button>

                    {/* Pre-fill Composer Button */}
                    <button
                      onClick={() => {
                        const prod = products.find(p => p.name === lead.productName);
                        if (prod) {
                          setSelectedProductId(prod.id);
                        }
                        setVipName(lead.clientName);
                        setCustomPrice(String(lead.productPrice));
                        setMessageType('info');
                        
                        // Scroll to composer on mobile
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#D4AF37',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        outline: 'none',
                        padding: 0
                      }}
                    >
                      Pré-remplir l'offre →
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </>
  );
}
