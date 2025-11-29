import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            "home": "Home",
            "activities": "Activities",
            "contact": "Contact",
            "book_now": "Book Now",
            "price": "Price",
            "duration": "Duration",
            "currency": "Currency",
            "language": "Language",
            "hero_title": "Discover the Magic of Djerba",
            "hero_subtitle": "Unforgettable experiences await you on the island of dreams",
            "top_activities": "Top Activities",
            "reservation_title": "Book Your Adventure",
            "name": "Name",
            "email": "Email",
            "phone": "Phone",
            "date": "Date",
            "participants": "Participants",
            "total": "Total",
            "submit": "Confirm Reservation",
            "success_message": "Reservation successful!",
            "loading": "Loading..."
        }
    },
    fr: {
        translation: {
            "home": "Accueil",
            "activities": "Activités",
            "contact": "Contact",
            "book_now": "Réserver",
            "price": "Prix",
            "duration": "Durée",
            "currency": "Devise",
            "language": "Langue",
            "hero_title": "Découvrez la Magie de Djerba",
            "hero_subtitle": "Des expériences inoubliables vous attendent sur l'île de rêve",
            "top_activities": "Top Activités",
            "reservation_title": "Réservez votre aventure",
            "name": "Nom",
            "email": "Email",
            "phone": "Téléphone",
            "date": "Date",
            "participants": "Participants",
            "total": "Total",
            "submit": "Confirmer la réservation",
            "success_message": "Réservation réussie !",
            "loading": "Chargement..."
        }
    },
    ar: {
        translation: {
            "home": "الرئيسية",
            "activities": "الأنشطة",
            "contact": "اتصل بنا",
            "book_now": "احجز الآن",
            "price": "السعر",
            "duration": "المدة",
            "currency": "العملة",
            "language": "اللغة",
            "hero_title": "اكتشف سحر جربة",
            "hero_subtitle": "تجارب لا تنسى تنتظرك في جزيرة الأحلام",
            "top_activities": "أفضل الأنشطة",
            "reservation_title": "احجز مغامرتك",
            "name": "الاسم",
            "email": "البريد الإلكتروني",
            "phone": "الهاتف",
            "date": "التاريخ",
            "participants": "المشاركين",
            "total": "المجموع",
            "submit": "تأكيد الحجز",
            "success_message": "تم الحجز بنجاح!",
            "loading": "جار التحميل..."
        }
    },
    it: {
        translation: {
            "home": "Home",
            "activities": "Attività",
            "contact": "Contatti",
            "book_now": "Prenota Ora",
            "price": "Prezzo",
            "duration": "Durata",
            "currency": "Valuta",
            "language": "Lingua",
            "hero_title": "Scopri la Magia di Djerba",
            "hero_subtitle": "Esperienze indimenticabili ti aspettano sull'isola dei sogni",
            "top_activities": "Migliori Attività",
            "reservation_title": "Prenota la tua avventura",
            "name": "Nome",
            "email": "Email",
            "phone": "Telefono",
            "date": "Data",
            "participants": "Partecipanti",
            "total": "Totale",
            "submit": "Conferma Prenotazione",
            "success_message": "Prenotazione riuscita!",
            "loading": "Caricamento..."
        }
    },
    pl: {
        translation: {
            "home": "Strona główna",
            "activities": "Zajęcia",
            "contact": "Kontakt",
            "book_now": "Zarezerwuj teraz",
            "price": "Cena",
            "duration": "Czas trwania",
            "currency": "Waluta",
            "language": "Język",
            "hero_title": "Odkryj magię Dżerby",
            "hero_subtitle": "Niezapomniane wrażenia czekają na wyspie marzeń",
            "top_activities": "Najlepsze atrakcje",
            "reservation_title": "Zarezerwuj swoją przygodę",
            "name": "Imię",
            "email": "Email",
            "phone": "Telefon",
            "date": "Data",
            "participants": "Uczestnicy",
            "total": "Razem",
            "submit": "Potwierdź rezerwację",
            "success_message": "Rezerwacja udana!",
            "loading": "Ładowanie..."
        }
    },
    de: {
        translation: {
            "home": "Startseite",
            "activities": "Aktivitäten",
            "contact": "Kontakt",
            "book_now": "Jetzt buchen",
            "price": "Preis",
            "duration": "Dauer",
            "currency": "Währung",
            "language": "Sprache",
            "hero_title": "Entdecken Sie den Zauber von Djerba",
            "hero_subtitle": "Unvergessliche Erlebnisse erwarten Sie auf der Insel der Träume",
            "top_activities": "Top Aktivitäten",
            "reservation_title": "Buchen Sie Ihr Abenteuer",
            "name": "Name",
            "email": "E-Mail",
            "phone": "Telefon",
            "date": "Datum",
            "participants": "Teilnehmer",
            "total": "Gesamt",
            "submit": "Reservierung bestätigen",
            "success_message": "Reservierung erfolgreich!",
            "loading": "Laden..."
        }
    },
    es: {
        translation: {
            "home": "Inicio",
            "activities": "Actividades",
            "contact": "Contacto",
            "book_now": "Reservar ahora",
            "price": "Precio",
            "duration": "Duración",
            "currency": "Moneda",
            "language": "Idioma",
            "hero_title": "Descubre la Magia de Djerba",
            "hero_subtitle": "Experiencias inolvidables te esperan en la isla de los sueños",
            "top_activities": "Mejores Actividades",
            "reservation_title": "Reserva tu aventura",
            "name": "Nombre",
            "email": "Email",
            "phone": "Teléfono",
            "date": "Fecha",
            "participants": "Participantes",
            "total": "Total",
            "submit": "Confirmar reserva",
            "success_message": "¡Reserva exitosa!",
            "loading": "Cargando..."
        }
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "fr", // default language
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
