const slides = [
  {
    type: 'image-text',
    duration: 5000,
    content: {
      title: 'Slide 1',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      media: {
        id: 'uniqueMedia1',
        url: './fixtures/images/mountain1.jpeg'
      },
      styling: {
        boxAlign: 'top',
        boxMargin: false,
        shadow: true,
        separator: false,
        halfSize: false,
        reversed: false
      }
    }
  },
  {
    type: 'book-review',
    duration: 5000,
    content: {
      bookText: '<h1>Lorem Ipsum</h1>...Is simply <strong>dummy text</strong> of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      authorText: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable.',
      media: {
        authorImage: {
          id: 'uniqueMedia6',
          url: './fixtures/images/author.jpg'
        },
        bookImage: {
          id: 'uniqueMedia1',
          url: './fixtures/images/mountain1.jpeg'
        }
      }
    }
  },
  {
    type: 'calendar',
    duration: 5000,
    'content': {
      'hasDateAndTime': true,
      'backgroundColor': 'blue',
      'title': 'Calendar',
      'events': [
        {
          'id': 'uniqueEvent1',
          'eventName': 'Cake',
          'datetime': '2021-06-10T07:55:28.478Z',
          'location': 'M2'
        },
        {
          'id': 'uniqueEvent2',
          'eventName': 'Workshop',
          'datetime': '2021-06-10T08:28:22.450Z',
          'location': 'Home'
        },
        {
          'id': 'uniqueEvent3',
          'eventName': 'GDPR',
          'datetime': '2021-06-10T08:59:05.251Z',
          'location': 'M3-4'
        },
        {
          'id': 'uniqueEvent4',
          'eventName': 'Meeting',
          'datetime': '2021-06-10T09:59:47.264Z',
          'location': 'Workshopzonen'
        }
      ]
    }
  },
  {
    type: 'meeting-room-schedule',
    duration: 5000,
    'content': {
      'backgroundColor': '#d2421e',
      'metaData': 'Ekstra info!',
      'textAlign': 'right',
      'occupiedText': 'Optaget',
      'availableText': 'Lokalet er ledigt',
      'backgroundImage': {
        'id': 'uniqueMedia1',
        'url': './fixtures/images/mountain1.jpeg'
      },
      'title': 'Meeting room schedule 1',
      'events': [
        {
          'id': 'uniqueRoomEvent1',
          'eventName': 'Cake',
          'from': '2021-06-17T07:55:28.478Z',
          'to': '2021-06-17T08:55:28.478Z',
          'location': 'M2'
        },
        {
          'id': 'uniqueRoomEvent2',
          'from': '2021-06-17T10:30:00.202Z',
          'to': '2021-06-17T21:00:00.202Z',
          'location': 'Home'
        },
        {
          'id': 'uniqueRoomEvent3',
          'eventName': 'GDPR',
          'from': '2021-06-17T20:00:00.202Z',
          'to': '2021-06-17T20:30:00.202Z',
          'location': 'M3-4'
        },
        {
          'id': 'uniqueRoomEvent4',
          'eventName': 'Meeting',
          'from': '2021-06-17T19:30:00.202Z',
          'to': '2021-06-17T20:00:00.202Z',
          'location': 'Workshopzonen'
        }
      ]
    }
  },
  {
    type: 'poster',
    duration: 5000,
    'content': {
      'events': [
        {
          'ticketPurchaseUrl': 'www.buyeventtickets.dk',
          'excerpt': 'Det bevaringsværdige og kulturhistoriske skib MS TUNØ tager dig med på en historisk og humoristisk rejse på vandet rundt om Aarhus',
          'name': 'Havnerundfart med MS TUNØ',
          'url': 'www.eventurl.dk',
          'image': './fixtures/images/mountain1.jpeg',
          'startDate': '2021-06-21T14:00:00+00:00',
          'endDate': '2021-06-21T15:00:00+00:00',
          'readMoreText': 'læs mere her',
          'ticketPriceRange': '75-150 kr.',
          'eventStatusText': null,
          'place': {
            'name': 'Havnepladsen, Midtbyen Aarhus',
            'streetAddress': 'Havnepladsen 2',
            'addressLocality': 'Aarhus',
            'postalCode': '8000',
            'image': null,
            'telephone': null
          }
        }
      ]
    }
  },
  {
    type: 'rss',
    duration: 5000,
    'content': {
      'fontSize': 'xl',
      'rssNumber': 5,
      'rssDuration': 10,
      'source': './fixtures/rss/feed.json'
    }
  },
  {
    type: 'slideshow',
    duration: 5000,
    'content': {
      'images': [
        {
          'id': 'uniqueMedia1',
          'url': './fixtures/images/mountain1.jpeg',
          'duration': 5000
        },
        {
          'id': 'uniqueMedia2',
          'url': './fixtures/images/mountain2.jpeg',
          'duration': 5000
        },
        {
          'id': 'uniqueMedia3',
          'url': './fixtures/images/mountain3.jpeg',
          'duration': 5000
        },
        {
          'id': 'uniqueMedia4',
          'url': './fixtures/images/mountain4.jpeg',
          'duration': 5000
        }
      ],
      'logo': {
        'id': 'uniqueMedia5',
        'url': './fixtures/images/logo.png',
        'position': 'bottom left',
        'size': 'l'
      },
      'transitions': 'fade',
      'animations': 'random'
    }
  },
  {
    type: 'contacts',
    duration: 5000,
    'content': {
      'contacts': [
        {
          'title': 'Pedel',
          'name': 'John Michael Dorian',
          'phone': '12341234',
          'email': 'mail@mail.dk',
          'id': 'uniqueContact1',
          'media': {
            'image': {
              'id': 'uniqueMedia6',
              'url': './fixtures/images/author.jpg'
            }
          }
        },
        {
          'title': 'Forstander',
          'name': 'Janitor',
          'media': {
            'image': {
              'id': 'uniqueMedia6',
              'url': './fixtures/images/author.jpg'
            }
          },
          'phone': '12341234',
          'email': 'mail@mail.dk',
          'id': 'uniqueContact2'
        },
        {
          'title': 'Lady',
          'name': 'Dr. Cox',
          'phone': '12341234',
          'media': {
            'image': {
              'id': 'uniqueMedia6',
              'url': './fixtures/images/author.jpg'
            }
          },
          'email': 'mail@mail.dk',
          'id': 'uniqueContact3'
        },
        {
          'name': 'Dr. Cox',
          'phone': '12341234',
          'email': 'mail@mail.dk',
          'id': 'uniqueContact3'
        },
        {
          'name': 'Dr. Cox',
          'phone': '12341234',
          'email': 'mail@mail.dk',
          'id': 'uniqueContact4'
        },
        {
          'name': 'Dr. Cox',
          'phone': '12341234',
          'email': 'mail@mail.dk',
          'id': 'uniqueContact5'
        }
      ],
      'styling': {
        'separator': true
      }
    }
  },
  {
    type: 'sparkle',
    duration: 5000,
    'content': {
      'hashtagText': 'dadaada',
      'orientation': 'landscape',
      'imageWidth': 56.25,
      'duration': 10000,
      'selectedFeed': 27626,
      'posts': [
        {
          'text': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. #Lorem#Ipsum#Lorem#Ipsum#Lorem#Ipsum#Lorem#Ipsum#Lorem#Ipsum',
          'textMarkup': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.#Lorem#Ipsum#Lorem#Ipsum#Lorem#Ipsum#Lorem#Ipsum#Lorem#Ipsum',
          'mediaUrl': './fixtures/images/mountain3.jpeg',
          'videoUrl': null,
          'username': 'Lorem Ipsum',
          'createdTime': '2021-06-21T10:13:30'
        }
      ]
    }
  },
  {
    type: 'quote',
    duration: 5000,
    'content': {
      'quoteInTwoLines': true,
      'quotes': [
        {
          'quote': 'I Miss You So Much, It Hurts Sometimes.',
          'author': 'John Michael Dorian',
          'duration': 5000,
          'id': 'uniqueQuote1'
        },
        {
          'quote': 'I Shouldn\'t Be Mopping Here Anyways...This Is A Rug.',
          'author': 'Janitor',
          'duration': 5000,
          'id': 'uniqueQuote2'
        },
        {
          'quote': 'Ladies and gentlemen, allow me to present, Man Not Caring.',
          'author': 'Dr. Cox',
          'duration': 5000,
          'id': 'uniqueQuote3'
        },
        {
          'quote': 'You Would Hear Cricket\'s Chirping, But They Were Too Uncomfortable About Just How Unfunny That Actually Was.',
          'author': 'Dr. Cox',
          'duration': 7000,
          'id': 'uniqueQuote3'
        }
      ]
    }
  }
];

export default slides;
