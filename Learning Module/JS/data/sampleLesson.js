export const sampleLesson = {
  lessonId: "travel-lesson-01",
  title: "Travel Basics",
  difficulty: "beginner",
  topicTag: "✈️ Travel",
  checkpointUrl: "module_assessment.html",
  activities: [
    {
      id: "match-1",
      type: "match",
      title: "Mix & Match the vocabulary",
      variants: {
        beginner: {
          mode: "text-text",
          items: [
            { id: 1, left: { type: "text", value: "Airport" }, right: { type: "text", value: "Aeropuerto" } },
            { id: 2, left: { type: "text", value: "Passport" }, right: { type: "text", value: "Pasaporte" } },
            { id: 3, left: { type: "text", value: "Suitcase" }, right: { type: "text", value: "Maleta" } },
            { id: 4, left: { type: "text", value: "Hotel" }, right: { type: "text", value: "Hotel" } },
            { id: 5, left: { type: "text", value: "Ticket" }, right: { type: "text", value: "Billete" } }
          ]
        },
        intermediate: {
          mode: "text-audio",
          items: [
            { id: 1, left: { type: "text", value: "Boarding Pass" }, right: { type: "audio", value: "Pase de abordar" } },
            { id: 2, left: { type: "text", value: "Reservation" }, right: { type: "audio", value: "Reservación" } },
            { id: 3, left: { type: "text", value: "Luggage" }, right: { type: "audio", value: "Equipaje" } },
            { id: 4, left: { type: "text", value: "Taxi" }, right: { type: "audio", value: "Taxi" } },
            { id: 5, left: { type: "text", value: "Map" }, right: { type: "audio", value: "Mapa" } }
          ]
        },
        advanced: {
          mode: "text-image",
          items: [
            { id: 1, left: { type: "text", value: "Boarding Pass" }, right: { type: "image", value: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=300&q=80", alt: "Boarding pass" } },
            { id: 2, left: { type: "text", value: "Reservation" }, right: { type: "image", value: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=300&q=80", alt: "Reservation" } },
            { id: 3, left: { type: "text", value: "Luggage" }, right: { type: "image", value: "https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=300&q=80", alt: "Luggage" } },
            { id: 4, left: { type: "text", value: "Taxi" }, right: { type: "image", value: "https://images.unsplash.com/photo-1511527844068-006b95d162c2?auto=format&fit=crop&w=300&q=80", alt: "Taxi" } },
            { id: 5, left: { type: "text", value: "Map" }, right: { type: "image", value: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=300&q=80", alt: "Map" } }
          ]
        }
      }
    },

    {
      id: "reading-1",
      type: "reading",
      title: "Reading Comprehension",
      variants: {
        beginner: {
          mode: "vocab-support",
          passage:
            "María packs her suitcase and passport for her trip. At the airport, she checks in and gets her boarding pass. She then takes a taxi to her hotel.",
          questions: [
            { q: "What does María pack for her trip?", options: ["A passport", "A bicycle", "A sandwich"], answer: 0 },
            { q: "Where does María go first?", options: ["The airport", "The beach", "The train station"], answer: 0 },
            { q: "How does she get to the hotel?", options: ["Taxi", "Boat", "Bus"], answer: 0 }
          ]
        },
        intermediate: {
          mode: "standard-comprehension",
          passage:
            "María is planning her first trip abroad. She packs carefully and arrives early at the airport. She checks in, gets her boarding pass, and later takes a taxi to her hotel, where the receptionist greets her warmly.",
          questions: [
            { q: "Why does María arrive early?", options: ["To avoid being late", "To eat lunch", "To buy shoes"], answer: 0 },
            { q: "Who greets María at the hotel?", options: ["The pilot", "The receptionist", "Her cousin"], answer: 1 },
            { q: "What happens after she gets her boarding pass?", options: ["She goes home", "She takes a taxi later", "She loses her bag"], answer: 1 }
          ]
        },
        advanced: {
          mode: "inference",
          passage:
            "Although María had prepared well for her trip, she still felt a little nervous stepping into a completely unfamiliar airport. However, after checking in smoothly and being welcomed kindly at her hotel, she began to relax and enjoy the experience.",
          questions: [
            { q: "Why was María nervous at first?", options: ["She forgot her suitcase", "The airport was unfamiliar", "She missed her flight"], answer: 1 },
            { q: "What helped María relax?", options: ["A friendly and smooth experience", "Sleeping on the plane", "Calling her family"], answer: 0 },
            { q: "What can we infer about María by the end?", options: ["She regrets traveling", "She is more comfortable now", "She wants to leave immediately"], answer: 1 }
          ]
        }
      }
    },

    {
      id: "sentence-1",
      type: "sentence",
      title: "Build the Sentence",
      variants: {
        beginner: {
          mode: "drag-order",
          question: "Build: I need a taxi to the hotel",
          correct: "Necesito un taxi al hotel",
          words: ["Necesito", "hotel", "un", "taxi", "al"]
        },
        intermediate: {
          mode: "fill-blank",
          question: "Choose the missing word",
          sentence: "Tengo una ____ para el hotel.",
          answer: "reservación",
          options: ["reservación", "maleta", "ventana"]
        },
        advanced: {
          mode: "drag-order",
          question: "Build: I would like to change my hotel reservation",
          correct: "Me gustaría cambiar mi reservación del hotel",
          words: ["gustaría", "hotel", "cambiar", "del", "Me", "mi", "reservación"]
        }
      }
    },

    {
      id: "role-1",
      type: "roleplay",
      title: "Role Play Conversation",
      variants: {
        beginner: {
          mode: "guided-response",
          prompt: "You arrive at the airport. Ask where the taxi is.",
          acceptable: ["taxi", "donde", "está", "where"]
        },
        intermediate: {
          mode: "travel-problem",
          prompt: "Tell the hotel receptionist that you have a reservation.",
          acceptable: ["reservación", "reservation", "tengo", "hotel"]
        },
        advanced: {
          mode: "open-response",
          prompt: "Explain that your luggage did not arrive and ask for help politely.",
          acceptable: ["equipaje", "maleta", "help", "ayuda", "no llegó", "arrive"]
        }
      }
    },

    {
      id: "speech-1",
      type: "speech",
      title: "Pronunciation Practice",
      variants: {
        beginner: {
          mode: "keyword-check",
          prompt: 'Say: "Necesito un taxi al hotel"',
          expectedKeyword: "taxi"
        },
        intermediate: {
          mode: "keyword-check",
          prompt: 'Say: "Tengo una reservación para el hotel"',
          expectedKeyword: "reservación"
        },
        advanced: {
          mode: "keyword-check",
          prompt: 'Say: "Mi equipaje no llegó al destino"',
          expectedKeyword: "equipaje"
        }
      }
    }
  ]
};