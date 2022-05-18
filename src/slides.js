import dayjs from "dayjs";

const slides = [
  {
    id: "slide0-image-text",
    type: "image-text",
    themeFile: "themes/dokk1.css",
    mediaData: {
      "/v1/media/00000000000000000000000001": {
        assets: {
          uri: "/fixtures/images/mountain1.jpeg",
        },
      },
    },
    content: {
      duration: 5000,
      title: "Slide 1",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      image: ["/v1/media/00000000000000000000000001"],
      boxAlign: "right",
      boxMargin: false,
      shadow: true,
      separator: true,
      halfSize: true,
      reversed: false,
    },
  },
  {
    id: "slide1-book-review",
    type: "book-review",
    themeFile: "themes/dokk1.css",
    mediaData: {
      "/v1/media/00000000000000000000000001": {
        assets: {
          uri: "/fixtures/images/author.jpg",
        },
      },
      "/v1/media/00000000000000000000000002": {
        assets: {
          uri: "/fixtures/images/mountain1.jpeg",
        },
      },
    },
    content: {
      duration: 5000,
      bookText:
        "<h1>Lorem Ipsum</h1>...Is simply <strong>dummy text</strong> of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      authorText:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
      authorImage: ["/v1/media/00000000000000000000000001"],
      bookImage: ["/v1/media/00000000000000000000000002"],
    },
  },
  {
    id: "slide2-calendar-multiple-days",
    type: "calendar",
    themeFile: "themes/dokk1.css",
    feedData: [
      {
        id: "uniqueEvent1",
        title: "Cake",
        startTime: dayjs().add(1, "hour").add(30, "minutes").unix(),
        endTime: dayjs().add(2, "hour").unix(),
        resourceTitle: "Det første rum",
        resourceId: "M1",
      },
      {
        id: "uniqueEvent2",
        //        title: "Cookies",
        startTime: dayjs().add(2, "hour").unix(),
        endTime: dayjs().add(3, "hour").unix(),
        resourceTitle: "Det andet rum",
        resourceId: "M2",
      },
      {
        id: "uniqueEvent3",
        title: "Coffee",
        startTime: dayjs().add(3, "hour").add(15, "minutes").unix(),
        endTime: dayjs().add(4, "hour").unix(),
        resourceTitle: "Det tredje rum",
        resourceId: "M3",
      },
      {
        id: "uniqueEvent4",
        title: "Tea",
        startTime: dayjs().add(5, "hour").unix(),
        endTime: dayjs().add(8, "hour").unix(),
        resourceTitle: null,
        resourceId: "M4",
      },
      {
        id: "uniqueEvent5",
        title: "Tea",
        startTime: dayjs().add(1, "hour").add(1, "day").unix(),
        endTime: dayjs().add(2, "hour").add(1, "day").unix(),
        resourceTitle: null,
        resourceId: "M4",
      },
      {
        id: "uniqueEvent6",
        title: "Tea",
        startTime: dayjs().add(3, "hour").add(3, "day").unix(),
        endTime: dayjs().add(4, "hour").add(3, "day").unix(),
        resourceTitle: null,
        resourceId: "M4",
      },
      {
        id: "uniqueEvent7",
        title: "Tea",
        startTime: dayjs().add(2, "hour").add(6, "day").unix(),
        endTime: dayjs().add(3, "hour").add(6, "day").unix(),
        resourceTitle: null,
        resourceId: "M4",
      },
    ],
    mediaData: {
      "/v1/media/00000000000000000000000001": {
        assets: {
          uri: "/fixtures/images/mountain1.jpeg",
        },
      },
    },
    content: {
      duration: 5000,
      // Options: multiple|multipleDays|single
      layout: "multipleDays",
      hasDateAndTime: true,
      // backgroundColor: "hsl(0deg 0% 20%)",
      backgroundColor: "red",
      title: "Kalender",
      subTitle: "Underoverskrift",
      resourceAvailableText: "Lokalet er frit.",
      displayHeaders: true,
      resourceUnavailableText: "Det er optaget",
      // image: ["/v1/media/00000000000000000000000001"],
      image: [],
      footerText: "Se mere på localhost/events",
    },
  },
  {
    id: "slide3-poster-single",
    type: "poster",
    themeFile: "themes/dokk1.css",
    feed: {
      configuration: {
        overrideTitle: null,
        overrideSubTitle: null,
        overrideTicketPrice: null,
        overrideReadMoreUrl: null,
        readMoreText: "Læs mere her: www.example.com",
        hideTime: false,
      },
    },
    feedData: [
      {
        ticketPurchaseUrl: "www.example.dk",
        excerpt:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua....",
        name: "Lorem ipsum",
        url: "www.example.dk",
        image: "/fixtures/images/mountain1.jpeg",
        startDate: "2021-06-21T14:00:00+00:00",
        endDate: "2021-06-21T15:00:00+00:00",
        ticketPriceRange: "75-150 kr.",
        eventStatusText: null,
        place: {
          name: "Lorem ipsum, Aarhus C",
          streetAddress: "Vej 2",
          addressLocality: "Aarhus",
          postalCode: "8000",
          image: null,
          telephone: null,
        },
      },
    ],
    content: {
      // "single" or "subscription"
      feedType: "single",
      eventId: "",
      occurrenceId: "",
      entryDuration: 10,
    },
  },
  {
    id: "slide4-rss",
    type: "rss",
    themeFile: "themes/dokk1.css",
    feed: {
      configuration: {
        numberOfEntries: 5,
        entryDuration: 10,
      },
    },
    feedData: {
      title: "Ut enim ad.",
      entries: [
        {
          title: "Lorem ipsum dolor sit amet.",
          lastModified: "2021-08-11T11:08:31.360Z",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
        {
          title: "Ut enim ad minim veniam,.",
          lastModified: "2021-08-12T11:08:31.360Z",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
        {
          title: "Duis aute irure dolor i.",
          lastModified: "2021-08-13T11:08:31.360Z",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
        {
          title: "Excepteur sint occaecat cupidatat non proident.",
          lastModified: "2021-08-14T11:08:31.360Z",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
        {
          title: "Sed ut perspiciatis unde omnis.",
          lastModified: "2021-08-15T11:08:31.360Z",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
      ],
    },
    mediaData: {
      "/v1/media/00000000000000000000000001": {
        assets: {
          uri: "/fixtures/images/mountain1.jpeg",
        },
      },
    },
    content: {
      image: ["/v1/media/00000000000000000000000001"],
      fontSize: "m",
    },
  },
  {
    id: "slide5-slideshow",
    type: "slideshow",
    themeFile: "themes/dokk1.css",
    mediaData: {
      "/v1/media/00000000000000000000000001": {
        assets: {
          uri: "/fixtures/images/mountain1.jpeg",
        },
      },
      "/v1/media/00000000000000000000000002": {
        assets: {
          uri: "/fixtures/images/mountain2.jpeg",
        },
      },
      "/v1/media/00000000000000000000000003": {
        assets: {
          uri: "/fixtures/images/mountain3.jpeg",
        },
      },
      "/v1/media/00000000000000000000000004": {
        assets: {
          uri: "/fixtures/images/mountain4.jpeg",
        },
      },
    },
    content: {
      imageDuration: 5000,
      images: [
        "/v1/media/00000000000000000000000001",
        "/v1/media/00000000000000000000000002",
        "/v1/media/00000000000000000000000003",
        "/v1/media/00000000000000000000000004",
      ],
      logoEnabled: false,
      logoSize: "l",
      logoPosition: "bottom right",
      transitions: "fade",
      animations: "random",
    },
  },
  {
    id: "slide6-contacts",
    type: "contacts",
    themeFile: "themes/dokk1.css",
    mediaData: {
      "/v1/media/00000000000000000000000001": {
        assets: {
          uri: "/fixtures/images/author.jpg",
        },
      },
      "/v1/media/00000000000000000000000002": {
        assets: {
          uri: "/fixtures/images/author.jpg",
        },
      },
      "/v1/media/00000000000000000000000003": {
        assets: {
          uri: "/fixtures/images/author.jpg",
        },
      },
    },
    content: {
      duration: 5000,
      contacts: [
        {
          title: "Pedel",
          name: "John Michael Dorian",
          phone: "12341234",
          email: "mail@mail.dk",
          id: "uniqueContact1",
          image: ["/v1/media/00000000000000000000000001"],
        },
        {
          title: "Forstander",
          name: "Janitor",
          image: ["/v1/media/00000000000000000000000002"],
          phone: "12341234",
          email: "mail@mail.dk",
          id: "uniqueContact2",
        },
        {
          title: "Lady",
          name: "Dr. Cox",
          phone: "12341234",
          image: ["/v1/media/00000000000000000000000003"],
          email: "mail@mail.dk",
          id: "uniqueContact3",
        },
        {
          name: "Dr. Cox",
          phone: "12341234",
          email: "mail@mail.dk",
          id: "uniqueContact4",
        },
        {
          name: "Dr. Cox",
          phone: "12341234",
          email: "mail@mail.dk",
          id: "uniqueContact5",
        },
        {
          name: "Dr. Cox",
          phone: "12341234",
          email: "mail@mail.dk",
          id: "uniqueContact6",
        },
      ],
      separator: true,
    },
  },
  {
    id: "slide7-instagram",
    type: "instagram-feed",
    themeFile: "themes/dokk1.css",
    content: {
      duration: 5000,
      hashtagText: "#myhashtag",
      orientation: "landscape",
      imageWidth: 40.0,
      entryDuration: 10,
      maxEntries: 5,
    },
    feedData: [
      {
        text: "#mountains #horizon",
        textMarkup:
          '<div class="text"></div>\n<div class="tags"><span class="tag">#mountains</span> <span class="tag">#horizon</span> Lorem ipsum ...</div>',
        mediaUrl: "./fixtures/images/mountain1.jpeg",
        videoUrl: null,
        username: "username",
        createdTime: "2022-02-03T08:50:07",
      },
      {
        text: "#mountains #horizon #sky",
        textMarkup:
          '<div class="text"></div>\n<div class="tags"><span class="tag">#mountains</span> <span class="tag">#horizon</span> <span class="tag">#sky</span> Lorem ipsum and mountains ...</div>',
        mediaUrl: "./fixtures/images/mountain2.jpeg",
        videoUrl: null,
        username: "username2",
        createdTime: "2022-01-03T08:50:07",
      },
      {
        text: "#video",
        textMarkup:
          '<div class="text"></div>\n<div class="tags"><span class="tag">#video</span> Lorem ipsum and video ...</div>',
        mediaUrl: null,
        videoUrl: "./fixtures/videos/test.mp4",
        username: "username2",
        createdTime: "2022-01-03T08:50:07",
      },
    ],
  },
  {
    id: "slide8-iframe",
    type: "iframe",
    content: {
      duration: 5000,
      source:
        "https://images.unsplash.com/photo-1551373884-8a0750074df7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2370&q=80",
    },
  },
  {
    id: "slide9-table",
    type: "table",
    themeFile: "themes/dokk1.css",
    themeData: {
      css: "--bg-light: #eee; --text-dark: #000; --bg-dark: #111; --text-light: #fff;",
    },
    mediaData: {
      "/v1/media/00000000000000000000000001": {
        assets: {
          uri: "./fixtures/images/mountain1.jpeg",
        },
      },
    },
    content: {
      duration: 5000,
      image: ["/v1/media/00000000000000000000000001"],
      title: "Overskrift",
      text: "Da dadadad dad aa da dadadad dad aa da dadadad dad aa da dadadad dad aa da dadadad dad aa da dadadad dad aadadadad dad aa da dadadad dad aa da dadadad dad aa da dadadad dad aa da dadadad dad aa da dadadad dad aa",
      fontPlacement: "bottom",
      fontSize: "s",
      table: [
        {
          type: "header",
          columns: [
            {
              Header: "Column 1",
              key: "1",
              accessor: "accessor-01FQBY38QR2C6YJWESZ288PC5F",
            },
            {
              Header: "Column 2",
              key: "2",
              accessor: "accessor-01FQBY39P5Q458SWS2V1SYBVNQ",
            },
          ],
        },
        {
          "accessor-01FQBY38QR2C6YJWESZ288PC5F": "Række 1",
          key: "key-01FQBY3APH6SPBKVHTRXVRS9VJ",
          "accessor-01FQBY39P5Q458SWS2V1SYBVNQ": "Række 1, celle 2",
        },
        {
          "accessor-01FQBY38QR2C6YJWESZ288PC5F": "Række 2",
          key: "key-01FQBY3BCWREFQBEVQQF2KH08S",
          "accessor-01FQBY39P5Q458SWS2V1SYBVNQ": "Række 2, celle 2",
        },
      ],
    },
  },
  {
    id: "slide10-calendar2-multiple",
    type: "calendar",
    themeFile: "themes/dokk1.css",
    feedData: [
      {
        id: "uniqueEvent1",
        title: "Cake",
        startTime: dayjs().add(1, "hour").add(30, "minutes").unix(),
        endTime: dayjs().add(2, "hour").unix(),
        resourceTitle: "Det første rum",
        resourceId: "M1",
      },
      {
        id: "uniqueEvent2",
        //        title: "Cookies",
        startTime: dayjs().add(2, "hour").unix(),
        endTime: dayjs().add(3, "hour").unix(),
        resourceTitle: "Det andet rum",
        resourceId: "M2",
      },
      {
        id: "uniqueEvent3",
        title: "Coffee",
        startTime: dayjs().add(3, "hour").add(15, "minutes").unix(),
        endTime: dayjs().add(4, "hour").unix(),
        resourceTitle: "Det tredje rum",
        resourceId: "M3",
      },
      {
        id: "uniqueEvent4",
        title: "Tea",
        startTime: dayjs().add(5, "hour").unix(),
        endTime: dayjs().add(8, "hour").unix(),
        resourceTitle: null,
        resourceId: "M4",
      },
      {
        id: "uniqueEvent5",
        title: "Tea",
        startTime: dayjs().add(1, "hour").add(1, "day").unix(),
        endTime: dayjs().add(2, "hour").add(1, "day").unix(),
        resourceTitle: null,
        resourceId: "M4",
      },
      {
        id: "uniqueEvent6",
        title: "Tea",
        startTime: dayjs().add(3, "hour").add(3, "day").unix(),
        endTime: dayjs().add(4, "hour").add(3, "day").unix(),
        resourceTitle: null,
        resourceId: "M4",
      },
      {
        id: "uniqueEvent7",
        title: "Tea",
        startTime: dayjs().add(2, "hour").add(6, "day").unix(),
        endTime: dayjs().add(3, "hour").add(6, "day").unix(),
        resourceTitle: null,
        resourceId: "M4",
      },
    ],
    mediaData: {
      "/v1/media/00000000000000000000000001": {
        assets: {
          uri: "/fixtures/images/mountain1.jpeg",
        },
      },
    },
    content: {
      duration: 5000,
      layout: "multiple",
      hasDateAndTime: true,
      backgroundColor: "",
      title: "Kalender",
      subTitle: "Underoverskrift",
      resourceAvailableText: "Lokalet er frit.",
      displayHeaders: true,
      resourceUnavailableText: "Det er optaget",
      image: ["/v1/media/00000000000000000000000001"],
      footerText: "Se mere på localhost/events",
      dateAsBox: false,
      hideGrid: true,
    },
  },
  {
    id: "slide11-calendar3-single",
    type: "calendar",
    themeFile: "themes/dokk1.css",
    feedData: [
      {
        id: "uniqueEvent1",
        title: "Cake",
        startTime: dayjs().add(1, "hour").add(30, "minutes").unix(),
        endTime: dayjs().add(2, "hour").unix(),
        resourceTitle: "Det første rum",
        resourceId: "M1",
      },
      {
        id: "uniqueEvent2",
        //        title: "Cookies",
        startTime: dayjs().add(2, "hour").unix(),
        endTime: dayjs().add(3, "hour").unix(),
        resourceTitle: "Det andet rum",
        resourceId: "M2",
      },
      {
        id: "uniqueEvent3",
        title: "Coffee",
        startTime: dayjs().add(3, "hour").add(15, "minutes").unix(),
        endTime: dayjs().add(4, "hour").unix(),
        resourceTitle: "Det tredje rum",
        resourceId: "M3",
      },
      {
        id: "uniqueEvent4",
        title: "Tea",
        startTime: dayjs().add(5, "hour").unix(),
        endTime: dayjs().add(8, "hour").unix(),
        resourceTitle: null,
        resourceId: "M4",
      },
      {
        id: "uniqueEvent5",
        title: "Tea",
        startTime: dayjs().add(1, "hour").add(1, "day").unix(),
        endTime: dayjs().add(2, "hour").add(1, "day").unix(),
        resourceTitle: null,
        resourceId: "M4",
      },
      {
        id: "uniqueEvent6",
        title: "Tea",
        startTime: dayjs().add(3, "hour").add(3, "day").unix(),
        endTime: dayjs().add(4, "hour").add(3, "day").unix(),
        resourceTitle: null,
        resourceId: "M4",
      },
      {
        id: "uniqueEvent7",
        title: "Tea",
        startTime: dayjs().add(2, "hour").add(6, "day").unix(),
        endTime: dayjs().add(3, "hour").add(6, "day").unix(),
        resourceTitle: null,
        resourceId: "M4",
      },
    ],
    mediaData: {
      "/v1/media/00000000000000000000000001": {
        assets: {
          uri: "/fixtures/images/mountain1.jpeg",
        },
      },
    },
    content: {
      duration: 5000,
      layout: "single",
      backgroundColor: "",
      title: "Kalender",
      subTitle: "Underoverskrift",
      resourceAvailableText: "Lokalet er frit.",
      displayHeaders: true,
      resourceUnavailableText: "Det er optaget",
      image: ["/v1/media/00000000000000000000000001"],
      footerText: "Se mere på localhost/events",
    },
  },
  {
    id: "slide12-poster-subscription",
    type: "poster",
    themeFile: "themes/dokk1.css",
    feed: {
      configuration: {
        overrideTitle: null,
        overrideSubTitle: null,
        overrideTicketPrice: null,
        overrideReadMoreUrl: null,
        readMoreText: "Læs mere her: www.example.com",
        hideTime: false,
      },
    },
    feedData: [
      {
        ticketPurchaseUrl: "www.example.dk",
        excerpt:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua....",
        name: "Lorem ipsum",
        url: "www.example.dk",
        image: "/fixtures/images/mountain1.jpeg",
        startDate: "2021-06-21T14:00:00+00:00",
        endDate: "2021-06-21T15:00:00+00:00",
        ticketPriceRange: "75-150 kr.",
        eventStatusText: null,
        place: {
          name: "Lorem ipsum, Aarhus C",
          streetAddress: "Vej 2",
          addressLocality: "Aarhus",
          postalCode: "8000",
          image: null,
          telephone: null,
        },
      },
      {
        ticketPurchaseUrl: "www.example2.dk",
        excerpt:
          "Ipsum lorem dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua....",
        name: "Ipsum lorem",
        url: "www.example.dk",
        image: "/fixtures/images/mountain2.jpeg",
        startDate: "2021-06-21T14:00:00+00:00",
        endDate: "2021-06-21T15:00:00+00:00",
        ticketPriceRange: "75-150 kr.",
        eventStatusText: null,
        place: {
          name: "Lorem ipsum, Aarhus C",
          streetAddress: "Vej 2",
          addressLocality: "Aarhus",
          postalCode: "8000",
          image: null,
          telephone: null,
        },
      },
    ],
    content: {
      // "single" or "subscription"
      feedType: "subscription",
      eventId: "",
      occurrenceId: "",
      entryDuration: 10,
    },
  },
  {
    id: "slide13-video",
    type: "video",
    themeFile: "themes/dokk1.css",
    mediaData: {
      "/v1/media/00000000000000000000000001": {
        assets: {
          uri: "./fixtures/videos/test.mp4",
        },
      },
    },
    content: {
      video: ["/v1/media/00000000000000000000000001"],
    },
  },
  {
    id: "slide13-travel",
    type: "travel",
    mediaData: {
      "/v1/media/00000000000000000000000001": {
        assets: {
          uri: "/fixtures/images/mountain1.jpeg",
        },
      },
    },
    content: {
      station: [
        {
          name: "Skelbækvej v rådhuset",
          x: "9420345",
          y: "55023889",
          id: "545004301",
        },
      ],
      iframe_title: "Titel til iframe",
      number_of_journeys: 3,
      title: "Overskrift",
      text: "<p>Tekst på slide</p>",
      distance: "2 km",
      time_moderate: "5-7 minutter",
      time_fast: "3-23 minutter",
      image: ["/v1/media/00000000000000000000000001"],
    },
  },
];

export default slides;
