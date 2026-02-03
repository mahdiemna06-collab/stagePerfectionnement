import { Component, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

@Component({
  selector: 'app-contact-us',
  imports: [RouterLink, RouterLinkActive, CommonModule, FormsModule],
  templateUrl: './contact-us.html',
  styleUrl: './contact-us.css',
})
export class ContactUs implements AfterViewChecked {
  @ViewChild('chatMessages') private chatMessagesContainer?: ElementRef;

  messages: Message[] = [];
  userInput: string = '';
  private shouldScroll = false;

  // Types de crédits bancaires avec leurs codes
  private creditTypes: { [key: string]: string } = {
    '1259': 'Crédit Direct Dépenses Courantes ',
    '1264': 'Crédit Direct Aménagement',
    '1258': 'Crédit Direct Acquisition Voiture ',
    '1263': 'Crédit Direct Aménagement Logement Hypothécaire',
    '1265': 'Crédit Direct Acquisition Logement ',
    '1267': 'Crédit Direct Construction ',
    '1269': 'Crédit Direct Achat Terrain ',
  };

  // Base de connaissances sur les crédits et les conditions
  private creditKnowledge: { [key: string]: string } = {
    'types de credit': this.getCreditsInfo(),
    'depenses courantes': 'Le Crédit Direct Dépenses Courantes  est destiné aux dépenses du quotidien. Taux moyen : 8-12% annuel. Montant : 500-50,000 TND.',
    'voiture': 'Le Crédit Direct Acquisition Voiture  finance l\'achat d\'un véhicule. Taux : 6-10% annuel. Durée : 12-84 mois. Montant jusqu\'à 150,000 TND.',
    'logement': 'Le Crédit Direct Acquisition Logement  finance l\'achat d\'une propriété. Taux : 5-8% annuel. Durée : 120-240 mois. Montant jusqu\'à 500,000 TND.',
    'construction': 'Le Crédit Direct Construction  finance les travaux de construction. Taux : 6-9% annuel. Déblocage progressif selon avancement.',
    'terrain': 'Le Crédit Direct Achat Terrain  finance l\'acquisition de terrain. Taux : 6-9% annuel. Montant jusqu\'à 200,000 TND.',
    'amenagement': 'Le Crédit Direct Aménagement  finance les travaux d\'aménagement. Taux : 7-11% annuel. Montant : 5,000-100,000 TND.',
    'hypothecaire': 'Le Crédit Hypothécaire  offre un taux réduit grâce à la garantie hypothécaire. Taux : 4-7% annuel. Durée jusqu\'à 25 ans.',
    'conditions': this.getCreditConditions(),
    'banque centrale': 'Selon la Banque Centrale de Tunisie : revenus stables, ratio endettement max 40-50%, apport personnel min 10-20%, assurance emprunteur obligatoire.',
    'revenu': 'Le revenu minimum requis dépend du montant du crédit. Généralement, vos revenus doivent couvrir 2.5x les mensualités.',
    'apport': 'L\'apport personnel requis est généralement 10-20% du montant emprunté pour les crédits immobiliers, et 5-10% pour les autres crédits.',
    'assurance': 'L\'assurance crédit est obligatoire selon la BCT. Elle couvre le décès, l\'incapacité et le chômage involontaire.',
    'taux': 'Les taux varient de 4-12% selon le type de crédit et votre profil. Les taux hypothécaires sont les plus avantageux.',
    'duree': 'La durée varie : crédits courants 12-60 mois, véhicules 12-84 mois, logements 120-240 mois.',
  };

  sendMessage() {
    if (this.userInput.trim() === '') return;

    this.messages.push({
      text: this.userInput,
      sender: 'user',
    });

    const userMessage = this.userInput.toLowerCase();
    this.userInput = '';
    this.shouldScroll = true;

    setTimeout(() => {
      const botResponse = this.getBotResponse(userMessage);
      this.messages.push({
        text: botResponse,
        sender: 'bot',
      });
      this.shouldScroll = true;
    }, 800);
  }

  sendQuickMessage(message: string) {
    this.userInput = message;
    this.sendMessage();
  }

  private getCreditsInfo(): string {
    let info = 'Types de crédits disponibles :\n';
    for (const [code, name] of Object.entries(this.creditTypes)) {
      info += `• ${name}\n`;
    }
    return info;
  }

  private getCreditConditions(): string {
    return `Conditions d'accès aux crédits selon la Banque Centrale de Tunisie :\n` +
      `• Âge minimum : 18 ans, maximum 65-70 ans\n` +
      `• Emploi stable depuis au moins 6 mois\n` +
      `• Revenus réguliers et justifiés\n` +
      `• Ratio endettement maximum : 40-50% des revenus\n` +
      `• Apport personnel : 10-20% pour immobilier, 5-10% pour autres\n` +
      `• Assurance emprunteur obligatoire\n` +
      `• Compte bancaire actif depuis min 6 mois\n` +
      `• Absence d'incidents de paiement`;
  }

  private getBotResponse(userMessage: string): string {
    // Vérifier si c'est une question sur un type de crédit spécifique
    for (const [code, name] of Object.entries(this.creditTypes)) {
      if (userMessage.includes(code) || userMessage.includes(name.toLowerCase())) {
        return this.getCreditDetailResponse(code);
      }
    }

    // Chercher une correspondance dans la base de connaissances
    for (const [key, response] of Object.entries(this.creditKnowledge)) {
      if (userMessage.includes(key)) {
        return response;
      }
    }

    // Réponse intelligente par défaut
    if (userMessage.includes('quel') && (userMessage.includes('credit') || userMessage.includes('crédit'))) {
      return this.getCreditsInfo();
    }

    if (userMessage.includes('condition') || userMessage.includes('requis') || userMessage.includes('exigence')) {
      return this.getCreditConditions();
    }

    if (userMessage.includes('cout') || userMessage.includes('coût') || userMessage.includes('frais') || userMessage.includes('taux')) {
      return 'Les frais varient selon le type de crédit :\n• Intérêts : 4-12% annuels\n• Frais de dossier : 100-500 TND\n• Assurance : 0.5-1% du montant\nConsultez notre conseiller pour un devis personnalisé.';
    }

    return 'Je suis votre assistant pour les crédits bancaires. Vous pouvez me demander :\n' +
      '• Les types de crédits disponibles\n' +
      '• Les détails d\'un crédit spécifique (par code ou nom)\n' +
      '• Les conditions selon la BCT\n' +
      '• Les taux et durées\n' +
      '• Les documents requis\n' +
      'Comment puis-je vous aider ?';
  }

  private getCreditDetailResponse(code: string): string {
    const details: { [key: string]: string } = {
      '1259': 'Crédit Direct Dépenses Courantes (1259)\n' +
        '📌 Usage : Dépenses courantes et de consommation\n' +
        '💰 Montant : 500 - 50,000 TND\n' +
        '📈 Taux : 8-12% annuel\n' +
        '⏱️ Durée : 12-60 mois\n' +
        '📋 Conditions BCT : Revenu stable, ratio endettement < 50%',

      '1264': 'Crédit Direct Aménagement (1264)\n' +
        '📌 Usage : Travaux d\'aménagement et rénovation\n' +
        '💰 Montant : 5,000 - 100,000 TND\n' +
        '📈 Taux : 7-11% annuel\n' +
        '⏱️ Durée : 24-84 mois\n' +
        '📋 Conditions BCT : Devis des travaux, assurance obligatoire',

      '1258': 'Crédit Direct Acquisition Voiture (1258)\n' +
        '📌 Usage : Achat d\'un véhicule\n' +
        '💰 Montant : 5,000 - 150,000 TND\n' +
        '📈 Taux : 6-10% annuel\n' +
        '⏱️ Durée : 12-84 mois\n' +
        '📋 Apport : 10-20% | Assurance obligatoire',

      '1263': 'Crédit Hypothécaire (1263)\n' +
        '📌 Usage : Aménagement logement avec garantie hypothécaire\n' +
        '💰 Montant : Jusqu\'à 500,000 TND\n' +
        '📈 Taux : 4-7% annuel (taux réduit)\n' +
        '⏱️ Durée : 24-240 mois\n' +
        '📋 Apport : 15-20% | Meilleur taux grâce à la garantie',

      '1265': 'Crédit Direct Acquisition Logement (1265)\n' +
        '📌 Usage : Achat d\'une propriété résidentielle\n' +
        '💰 Montant : Jusqu\'à 500,000 TND\n' +
        '📈 Taux : 5-8% annuel\n' +
        '⏱️ Durée : 120-240 mois (10-20 ans)\n' +
        '📋 Apport : 15-20% | Assurance décès invalide obligatoire',

      '1267': 'Crédit Direct Construction (1267)\n' +
        '📌 Usage : Financer les travaux de construction\n' +
        '💰 Montant : 20,000 - 500,000 TND\n' +
        '📈 Taux : 6-9% annuel\n' +
        '⏱️ Déblocage progressif selon avancement\n' +
        '📋 Durée max : 25 ans | Apport : 15-20%',

      '1269': 'Crédit Direct Achat Terrain (1269)\n' +
        '📌 Usage : Acquisition de terrain constructible\n' +
        '💰 Montant : 10,000 - 200,000 TND\n' +
        '📈 Taux : 6-9% annuel\n' +
        '⏱️ Durée : 60-180 mois\n' +
        '📋 Documents : Acte de propriété, plan du terrain',
    };

    return details[code] || 'Crédit non trouvé. Veuillez vérifier le code.';
  }

  ngAfterViewChecked() {
    if (this.shouldScroll) {
      this.scrollToBottom();
      this.shouldScroll = false;
    }
  }

  private scrollToBottom() {
    try {
      if (this.chatMessagesContainer) {
        this.chatMessagesContainer.nativeElement.scrollTop =
          this.chatMessagesContainer.nativeElement.scrollHeight;
      }
    } catch (err) {
      console.error('Erreur lors du scroll:', err);
    }
  }
}
