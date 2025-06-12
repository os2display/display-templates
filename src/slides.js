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
      title: "Overskriften er her",
      text: "Dette er brødtekst lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      image: ["/v1/media/00000000000000000000000001"],
      boxAlign: "top",
      boxMargin: false,
      shadow: true,
      separator: false,
      halfSize: false,
      reversed: false,
      mediaContain: true,
      fontSize: "font-size-xl",
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
          uri: "/fixtures/images/vertical.jpg",
        },
      },
    },
    content: {
      duration: 5000,
      bookText:
        "<h1>I bølgen blå</h1><p><strong>Af Hval Ocean</strong><p/><p><br/>The printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>",
      authorText: "Hval Ocean",
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
        id: "uniqueEventMinusTwo",
        title: "Cake is in the past",
        startTime: dayjs().subtract(30, "minutes").unix(),
        endTime: dayjs().subtract(15, "minutes").unix(),
        resourceTitle: "Det fulde rum",
        resourceId: "MUendelig",
      },
      {
        id: "uniqueEventMinusOne",
        title: "Cake is gone",
        startTime: dayjs().subtract(30, "minutes").unix(),
        endTime: dayjs().add(2, "hour").unix(),
        resourceTitle: "Det fulde rum",
        resourceId: "MUendelig",
      },
      {
        id: "uniqueEvent0",
        title: "Cake is a lie",
        startTime: dayjs()
          .subtract(1, "day")
          .add(1, "hour")
          .add(30, "minutes")
          .unix(),
        endTime: dayjs().add(2, "hour").unix(),
        resourceTitle: "Det tomme rum",
        resourceId: "M0",
      },
      {
        id: "uniqueEvent1",
        title:
          "Dette er en meget lang titel som bliver på en linje og dotter ud",
        startTime: dayjs().add(1, "hour").add(30, "minutes").unix(),
        endTime: dayjs().add(2, "hour").unix(),
        resourceTitle:
          "Dette er en meget lang ressource titel som bliver på en linje og dotter ud",
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
        startTime: dayjs().add(5, "hour").unix(),
        endTime: dayjs().add(8, "hour").unix(),
        resourceTitle: null,
        resourceId: "M4",
      },
      {
        id: "uniqueEvent6",
        title: "Tea",
        startTime: dayjs().add(5, "hour").unix(),
        endTime: dayjs().add(8, "hour").unix(),
        resourceTitle: null,
        resourceId: "M4",
      },
      {
        id: "uniqueEvent7",
        title: "Tea",
        startTime: dayjs().add(5, "hour").unix(),
        endTime: dayjs().add(8, "hour").unix(),
        resourceTitle: null,
        resourceId: "M4",
      },
      {
        id: "uniqueEvent8",
        title: "Tea",
        startTime: dayjs().add(5, "hour").unix(),
        endTime: dayjs().add(8, "hour").unix(),
        resourceTitle: null,
        resourceId: "M4",
      },
      {
        id: "uniqueEvent9",
        title: "Tea",
        startTime: dayjs().add(5, "hour").unix(),
        endTime: dayjs().add(8, "hour").unix(),
        resourceTitle: null,
        resourceId: "M4",
      },
      {
        id: "uniqueEvent10",
        title: "Tea",
        startTime: dayjs().add(5, "hour").unix(),
        endTime: dayjs().add(8, "hour").unix(),
        resourceTitle: null,
        resourceId: "M4",
      },
      {
        id: "uniqueEvent11",
        title: "Tea",
        startTime: dayjs().add(5, "hour").unix(),
        endTime: dayjs().add(8, "hour").unix(),
        resourceTitle: null,
        resourceId: "M4",
      },
      {
        id: "uniqueEvent12",
        title: "Tea",
        startTime: dayjs().add(5, "hour").unix(),
        endTime: dayjs().add(8, "hour").unix(),
        resourceTitle: null,
        resourceId: "M4",
      },
      {
        id: "uniqueEvent13",
        title: "Tea",
        startTime: dayjs().add(5, "hour").unix(),
        endTime: dayjs().add(8, "hour").unix(),
        resourceTitle: null,
        resourceId: "M4",
      },
      {
        id: "uniqueEvent14",
        title: "Tea",
        startTime: dayjs().add(5, "hour").unix(),
        endTime: dayjs().add(8, "hour").unix(),
        resourceTitle: null,
        resourceId: "M4",
      },
      {
        id: "uniqueEvent15",
        title: "Tea",
        startTime: dayjs().add(5, "hour").unix(),
        endTime: dayjs().add(8, "hour").unix(),
        resourceTitle: null,
        resourceId: "M4",
      },
      {
        id: "uniqueEvent16",
        title: "Tea",
        startTime: dayjs().add(5, "hour").unix(),
        endTime: dayjs().add(8, "hour").unix(),
        resourceTitle: null,
        resourceId: "M4",
      },
      {
        id: "uniqueEvent17",
        title: "Tea",
        startTime: dayjs().add(5, "hour").unix(),
        endTime: dayjs().add(8, "hour").unix(),
        resourceTitle: null,
        resourceId: "M4",
      },
      {
        id: "uniqueEvent18",
        title: "Tea",
        startTime: dayjs().add(5, "hour").unix(),
        endTime: dayjs().add(8, "hour").unix(),
        resourceTitle: null,
        resourceId: "M4",
      },
      {
        id: "uniqueEvent19",
        title: "Tea",
        startTime: dayjs().add(5, "hour").unix(),
        endTime: dayjs().add(8, "hour").unix(),
        resourceTitle: null,
        resourceId: "M4",
      },
      {
        id: "uniqueEvent20",
        title: "Tea",
        startTime: dayjs().add(1, "hour").add(1, "day").unix(),
        endTime: dayjs().add(2, "hour").add(1, "day").unix(),
        resourceTitle: null,
        resourceId: "M4",
      },
      {
        id: "uniqueEvent21",
        title: "Tea",
        startTime: dayjs().add(3, "hour").add(3, "day").unix(),
        endTime: dayjs().add(4, "hour").add(3, "day").unix(),
        resourceTitle: null,
        resourceId: "M4",
      },
      {
        id: "uniqueEvent22",
        title: "Tea",
        startTime: dayjs().add(2, "hour").add(6, "day").unix(),
        endTime: dayjs().add(3, "hour").add(6, "day").unix(),
        resourceTitle: null,
        resourceId: "M4",
      },
      {
        id: "uniqueEvent23",
        title: "Tea",
        startTime: dayjs().add(2, "hour").add(8, "day").unix(),
        endTime: dayjs().add(3, "hour").add(8, "day").unix(),
        resourceTitle: "Test",
        resourceId: "M5",
      },
      {
        id: "uniqueEvent24",
        title: "Tea",
        startTime: dayjs().add(2, "hour").add(8, "day").unix(),
        endTime: dayjs().add(3, "hour").add(8, "day").unix(),
        resourceTitle: "Test",
        resourceId: "M5",
      },
      {
        id: "uniqueEvent25",
        title: "Tea",
        startTime: dayjs().add(2, "hour").add(8, "day").unix(),
        endTime: dayjs().add(3, "hour").add(8, "day").unix(),
        resourceTitle: "Test",
        resourceId: "M5",
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
      title: "Kalender",
      subTitle: "Underoverskrift",
      resourceAvailableText: "Lokalet er frit.",
      displayHeaders: true,
      resourceUnavailableText: "Det er optaget",
      // image: ["/v1/media/00000000000000000000000001"],
      image: [],
      footerText: "Se mere på localhost/events",
      fontSize: "font-size-m",
    },
  },
  {
    id: "slide3-poster-single",
    type: "poster",
    themeFile: "themes/aakb.css",
    mediaData: {
      "/v1/media/00000000000000000000000001": {
        assets: {
          uri: "/fixtures/images/mountain1.jpeg",
        },
      },
    },
    theme: {
      logo: {
        assets: {
          uri: "/fixtures/images/mountain1.jpeg",
        },
      },
    },
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
      showLogo: true,
      mediaContain: true,
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
        showFeedProgress: false,
      },
    },
    feedData: {
      title: "Lorem Ipsum",
      entries: [
        {
          title: "Lorem ipsum dolor sit amet.",
          lastModified: "2023-02-13T07:00:00.360Z",
          content:
            "Aenean scelerisque ligula ante, sed tristique tellus blandit sit amet. Vestibulum sagittis lobortis purus quis tempor. Aliquam pretium vitae risus id condimentum.",
        },
        {
          title:
            "Morbi lorem augue, consequat non eros in, commodo sagittis lectus.",
          lastModified: "2021-08-12T11:08:31.360Z",
          content:
            "Quisque tortor elit, congue id sapien nec, rutrum eleifend ante. Maecenas diam tortor, eleifend ac pretium at, sagittis eget justo.",
        },
        {
          title:
            "Nullam dui massa, malesuada eu libero tincidunt, cursus posuere mauris.",
          lastModified: "2021-08-13T11:08:31.360Z",
          content:
            "Duis volutpat orci lectus, vel fringilla tortor pharetra non. Nunc eget dui quam. Quisque non nulla et ante consequat tempor sit amet ut nisl. Donec et eros non quam aliquet porta vestibulum sodales est.",
        },
        {
          title: "Proin tempor lacinia velit, et gravida nunc faucibus eget.",
          lastModified: "2021-08-14T11:08:31.360Z",
          content:
            "Etiam lobortis diam purus, a condimentum nunc feugiat nec. Nunc porttitor tortor eget tortor fermentum, ac porttitor nulla imperdiet. Donec feugiat ipsum in purus congue semper. Cras ligula ipsum, porttitor eu neque at, interdum tincidunt tellus.",
        },
        {
          title: "Sed ut massa eros.",
          lastModified: "2021-08-15T11:08:31.360Z",
          content:
            "Suspendisse a dapibus purus, ac lacinia urna. Maecenas lobortis dui in nisl feugiat ultricies. Nulla turpis dolor, pharetra eget ligula eget, porta tempus est. Suspendisse et odio ultricies, interdum turpis in, efficitur eros.",
        },
      ],
    },
    mediaData: {
      "/v1/media/00000000000000000000000001": {
        assets: {
          uri: "/fixtures/images/dokk1-shapes-animated.svg",
        },
      },
    },
    content: {
      image: ["/v1/media/00000000000000000000000001"],
      fontSize: "font-size-m",
      mediaContain: true,
    },
  },
  {
    id: "slide5-slideshow",
    type: "slideshow",
    themeFile: "themes/dokk1.css",
    theme: {
      logo: {
        assets: {
          uri: "/fixtures/images/mountain1.jpeg",
        },
      },
    },
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
      imageDuration: 5,
      images: [
        "/v1/media/00000000000000000000000001",
        "/v1/media/00000000000000000000000002",
        "/v1/media/00000000000000000000000003",
        "/v1/media/00000000000000000000000004",
      ],
      showLogo: true,
      logoSize: "l",
      mediaContain: true,
      logoPosition: "bottom right",
      transition: "fade",
      animation: "random",
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
      mediaContain: true,
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
    darkModeEnabled: false,
    content: {
      duration: 5000,
      hashtagText: "#myhashtag",
      orientation: "landscape",
      imageWidth: 40.0,
      entryDuration: 10,
      maxEntries: 5,
      mediaContain: true,
    },
    feedData: [
      {
        text: "#mountains #horizon",
        textMarkup:
          '<div class="text">Sed nulla lorem, varius sodales justo ac, ultrices placerat nunc.</div>\n<div class="tags"><span class="tag">#mountains</span> <span class="tag">#horizon</span> Lorem ipsum ...</div>',
        mediaUrl: "./fixtures/images/mountain1.jpeg",
        videoUrl: null,
        username: "username",
        createdTime: "2022-02-03T08:50:07",
      },
      {
        text: "#mountains #horizon #sky",
        textMarkup:
          '<div class="text">Aenean consequat sem ut tortor auctor, eget volutpat libero consequat. Donec lacinia varius quam, ut efficitur diam ultrices et. Aliquam eget augue at felis rhoncus egestas. Sed porttitor elit a tellus tempus, sed tempus sapien finibus. Nam at dapibus sem. Aliquam sit amet feugiat ex. Ut dapibus, mi eu fermentum dignissim, sem ipsum vulputate est, sit amet euismod orci odio pharetra massa.</div>\n<div class="tags"><span class="tag">#mountains</span> <span class="tag">#horizon</span> <span class="tag">#sky</span> Lorem ipsum and mountains ...</div>',
        mediaUrl: "./fixtures/images/mountain2.jpeg",
        videoUrl: null,
        username: "username2",
        createdTime: "2022-01-03T08:50:07",
      },
      {
        text: "#video",
        textMarkup:
          '<div class="text">Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse rhoncus metus nec consequat commodo. Duis a rhoncus lorem. Vestibulum nec blandit ipsum, ut lobortis purus. In ultrices mauris vel felis pellentesque imperdiet. Sed ultricies mauris vel nisi mattis, tincidunt dictum nisl finibus. Nunc in ultrices dui.</div>\n<div class="tags"><span class="tag">#video</span> Lorem ipsum and video ...</div>',
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
    themeFile: "themes/aarhus.css",
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
      text: "Da dadadad dad aa da dadadad dad aa da dadadad dad aa da dadadad dad aa da dadadad dad aadadadad dad aa da dadadad dad aa da dadadad dad aa da dadadad dad aa da dadadad dad aa da dadadad dad aa",
      fontPlacement: "bottom",
      fontSize: "font-size-s",
      mediaContain: true,
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
    themeFile: "themes/bautavej.css",
    feedData: [
      {
        id: "uniqueEventMinusTwo",
        title: "Cake is in the past",
        startTime: dayjs().subtract(30, "minutes").unix(),
        endTime: dayjs().subtract(15, "minutes").unix(),
        resourceTitle: "Det fulde rum",
        resourceId: "MUendelig",
      },
      {
        id: "uniqueEventMinusOne",
        title: "Cake is gone",
        startTime: dayjs().subtract(30, "minutes").unix(),
        endTime: dayjs().add(2, "hour").unix(),
        resourceTitle: "Det fulde rum",
        resourceId: "MUendelig",
      },
      {
        id: "uniqueEvent0",
        title: "Cake is a lie",
        startTime: dayjs()
          .subtract(1, "day")
          .add(1, "hour")
          .add(30, "minutes")
          .unix(),
        endTime: dayjs().add(2, "hour").unix(),
        resourceTitle: "Det tomme rum",
        resourceId: "M0",
      },
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
        id: "uniqueEvent41",
        title: "Test",
        startTime: dayjs().add(5, "hour").unix(),
        endTime: dayjs().add(8, "hour").unix(),
        resourceTitle: null,
        resourceId: "Room",
      },
      {
        id: "uniqueEvent42",
        title: "Test 2",
        startTime: dayjs().add(5, "hour").unix(),
        endTime: dayjs().add(8, "hour").unix(),
        resourceTitle: null,
        resourceId: "Room",
      },
      {
        id: "uniqueEvent43",
        title: "Test 3",
        startTime: dayjs().add(5, "hour").unix(),
        endTime: dayjs().add(8, "hour").unix(),
        resourceTitle: null,
        resourceId: "Room",
      },
      {
        id: "uniqueEvent44",
        title: "Test 4",
        startTime: dayjs().add(5, "hour").unix(),
        endTime: dayjs().add(8, "hour").unix(),
        resourceTitle: null,
        resourceId: "Room",
      },
      {
        id: "uniqueEvent45",
        title: "Test 5",
        startTime: dayjs().add(5, "hour").unix(),
        endTime: dayjs().add(8, "hour").unix(),
        resourceTitle: null,
        resourceId: "Room",
      },
      {
        id: "uniqueEvent46",
        title: "Test 6",
        startTime: dayjs().add(5, "hour").unix(),
        endTime: dayjs().add(8, "hour").unix(),
        resourceTitle: null,
        resourceId: "Room",
      },
      {
        id: "uniqueEvent5",
        title: "Tea Tomorrow",
        startTime: dayjs().add(1, "hour").add(1, "day").unix(),
        endTime: dayjs().add(2, "hour").add(1, "day").unix(),
        resourceTitle: null,
        resourceId: "M4",
      },
      {
        id: "uniqueEvent6",
        title: "Tea Later",
        startTime: dayjs().add(3, "hour").add(3, "day").unix(),
        endTime: dayjs().add(4, "hour").add(3, "day").unix(),
        resourceTitle: null,
        resourceId: "M4",
      },
      {
        id: "uniqueEvent7",
        title: "Tea Later again",
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
      headerOrder: "whatwherewhen",
      duration: 5000,
      layout: "multiple",
      hasDateAndTime: true,
      title: "Møder i dag på Bautavej",
      subTitle: "Underoverskrift",
      resourceAvailableText: "Lokalet er frit.",
      displayHeaders: true,
      resourceUnavailableText: "Det er optaget",
      // image: ["/v1/media/00000000000000000000000001"],
      footerText: "Se mere på localhost/events",
      dateAsBox: false,
      hideGrid: true,
      fontSize: "font-size-xl",
    },
  },
  {
    id: "slide11-calendar3-single",
    type: "calendar",
    themeFile: "themes/dokk1.css",
    feedData: [
      {
        id: "uniqueEvent0",
        title: "Cake is a lie",
        startTime: dayjs()
          .subtract(1, "day")
          .add(1, "hour")
          .add(30, "minutes")
          .unix(),
        endTime: dayjs().add(2, "hour").unix(),
        resourceTitle: "Det tomme rum",
        resourceId: "M0",
      },
      {
        id: "uniqueEvent1",
        title: "Cake",
        startTime: dayjs().add(1, "hour").add(30, "minutes").unix(),
        endTime: dayjs().add(2, "hour").unix(),
        resourceTitle: "Det første rum",
        resourceId: "M1",
      },
      {
        id: "uniqueEvent51",
        title: "Tea Tomorrow",
        startTime: dayjs().add(1, "hour").add(1, "day").unix(),
        endTime: dayjs().add(2, "hour").add(1, "day").unix(),
        resourceTitle: null,
        resourceId: "M4",
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
        startTime: dayjs().add(1, "hour").add(1, "day").unix(),
        endTime: dayjs().add(2, "hour").add(1, "day").unix(),
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
      mediaContain: true,
      title: "Kalender",
      subTitle: "Underoverskrift",
      resourceAvailableText: "Lokalet er frit.",
      displayHeaders: true,
      resourceUnavailableText: "Det er optaget",
      image: ["/v1/media/00000000000000000000000001"],
      footerText: "Se mere på localhost/events",
      fontSize: "font-size-xl",
    },
  },
  {
    id: "slide12-poster-subscription",
    type: "poster",
    themeFile: "themes/aarhus.css",
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
        startDate: "2021-08-21T14:00:00+00:00",
        endDate: "2021-09-21T15:00:00+00:00",
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
      mediaContain: true,
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
      numberOfJourneys: 13,
      station: [
        { id: "751434104", name: "Kollund Kro" },
        { id: "503000201", name: "Kollund Kro" },
        { id: "53014", name: "Rolighedsvej" },
        { id: "44061", name: "Roløkke (Oddevej)" },
        { id: "3342", name: "Rolfsvej (Esrumvej)" },
        { id: "3269", name: "Rolfsvej (Esrumvej)" },
        { id: "41565", name: "Rolfsvej (Maribovej)" },
        { id: "813041802", name: "Rolykkevej (Sæbygårdvej / Sæby)" },
      ],
      iframeTitle: "Titel til iframe",
      title: "Overskrift",
      text: "<p>Tekst på slide</p>",
      distance: "2 km",
      timeModerate: "5-7 minutter",
      timeFast: "3-23 minutter",
      image: ["/v1/media/00000000000000000000000001"],
      mediaContain: true,
    },
  },
  {
    id: "slide14-image-text-multiple-images",
    type: "image-text",
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
    },
    content: {
      duration: 15000,
      title: "Slide 14",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      image: [
        "/v1/media/00000000000000000000000001",
        "/v1/media/00000000000000000000000002",
        "/v1/media/00000000000000000000000003",
      ],
      boxAlign: "right",
      boxMargin: false,
      shadow: true,
      separator: true,
      halfSize: true,
      mediaContain: true,
      reversed: false,
      fontSize: "font-size-m",
      disableImageFade: false,
    },
  },
  {
    id: "slide15-image-text-logo",
    type: "image-text",
    themeFile: "themes/dokk1.css",
    theme: {
      logo: {
        assets: {
          uri: "/fixtures/images/mountain1.jpeg",
        },
      },
    },
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
      fontSize: "font-size-xs",
      showLogo: true,
      logoMargin: true,
      logoSize: "logo-size-m",
      logoPosition: "logo-position-bottom-right",
    },
  },
  {
    id: "slide16-slideshow-no-stuff",
    type: "slideshow",
    themeFile: "themes/dokk1.css",
    theme: {
      logo: {
        assets: {
          uri: "/fixtures/images/mountain1.jpeg",
        },
      },
    },
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
      imageDuration: 5,
      images: [
        "/v1/media/00000000000000000000000001",
        "/v1/media/00000000000000000000000002",
        "/v1/media/00000000000000000000000003",
        "/v1/media/00000000000000000000000004",
      ],
      transition: null,
      animation: null,
      showLogo: true,
      logoMargin: true,
      logoSize: "logo-size-l",
      logoPosition: "logo-position-bottom-left",
    },
  },
  {
    id: "slide17-calendar-multiple-days",
    type: "calendar",
    feedData: [
      {
        id: "uniqueEvent0",
        title: null,
        startTime: dayjs().add(1, "hour").add(30, "minutes").unix(),
        endTime: dayjs().add(2, "hour").unix(),
        resourceTitle: "Det tomme rum",
        resourceId: "M0",
      },
      {
        id: "uniqueEvent1",
        title: "",
        startTime: dayjs().add(2, "hour").add(30, "minutes").unix(),
        endTime: dayjs().add(3, "hour").unix(),
        resourceTitle:
          "Dette er en meget lang ressource titel som bliver på en linje og dotter ud",
        resourceId: "M1",
      },
    ],
    content: {
      duration: 5000,
      layout: "multipleDays",
      hasDateAndTime: true,
      title: "Kalender",
      subTitle: "Underoverskrift",
      // resourceUnavailableText: "DEt er tAGET!!!",
      resourceAvailableText: "Lokalet er frit.",
      displayHeaders: true,
      image: [],
      footerText: "Se mere på localhost/events",
      fontSize: "font-size-m",
    },
  },
  {
    id: "slide18-image-text-font-sizes",
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
      title: "Slide 123121",
      text: "<h1>Fisk</h1><h2>Hest</h2><h3>Ræv</h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      image: ["/v1/media/00000000000000000000000001"],
      boxAlign: "right",
      boxMargin: false,
      shadow: true,
      separator: true,
      halfSize: true,
      reversed: false,
      fontSize: "font-size-lg",
    },
  },
  {
    id: "slide19-rss",
    type: "rss",
    themeFile: null,
    feed: {
      configuration: {
        numberOfEntries: 5,
        entryDuration: 10,
        showFeedProgress: true,
      },
    },
    feedData: {
      title: "Lorem Ipsum",
      entries: [
        {
          title: "Lorem ipsum dolor sit amet.",
          lastModified: "2023-02-13T07:00:00.360Z",
          content:
            "Aenean scelerisque ligula ante, sed tristique tellus blandit sit amet. Vestibulum sagittis lobortis purus quis tempor. Aliquam pretium vitae risus id condimentum.",
        },
        {
          title:
            "Morbi lorem augue, consequat non eros in, commodo sagittis lectus.",
          lastModified: "2021-08-12T11:08:31.360Z",
          content:
            "Quisque tortor elit, congue id sapien nec, rutrum eleifend ante. Maecenas diam tortor, eleifend ac pretium at, sagittis eget justo.",
        },
        {
          title:
            "Nullam dui massa, malesuada eu libero tincidunt, cursus posuere mauris.",
          lastModified: "2021-08-13T11:08:31.360Z",
          content:
            "Duis volutpat orci lectus, vel fringilla tortor pharetra non. Nunc eget dui quam. Quisque non nulla et ante consequat tempor sit amet ut nisl. Donec et eros non quam aliquet porta vestibulum sodales est.",
        },
        {
          title: "Proin tempor lacinia velit, et gravida nunc faucibus eget.",
          lastModified: "2021-08-14T11:08:31.360Z",
          content:
            "Etiam lobortis diam purus, a condimentum nunc feugiat nec. Nunc porttitor tortor eget tortor fermentum, ac porttitor nulla imperdiet. Donec feugiat ipsum in purus congue semper. Cras ligula ipsum, porttitor eu neque at, interdum tincidunt tellus.",
        },
        {
          title: "Sed ut massa eros.",
          lastModified: "2021-08-15T11:08:31.360Z",
          content:
            "Suspendisse a dapibus purus, ac lacinia urna. Maecenas lobortis dui in nisl feugiat ultricies. Nulla turpis dolor, pharetra eget ligula eget, porta tempus est. Suspendisse et odio ultricies, interdum turpis in, efficitur eros.",
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
      fontSize: "font-size-m",
      mediaContain: true,
    },
  },
  {
    id: "slide20-poster-single-no-feed",
    type: "poster",
    themeFile: "themes/aakb.css",
    mediaData: {
      "/v1/media/00000000000000000000000001": {
        assets: {
          uri: "/fixtures/images/mountain1.jpeg",
        },
      },
    },
    theme: {
      logo: {
        assets: {
          uri: "/fixtures/images/mountain1.jpeg",
        },
      },
    },
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
    feedData: null,
    content: {
      // "single" or "subscription"
      feedType: "single",
      eventId: "",
      occurrenceId: "",
      entryDuration: 10,
      showLogo: true,
    },
  },
  {
    id: "slide21-travel-2",
    type: "travel",
    mediaData: {
      "/v1/media/00000000000000000000000001": {
        assets: {
          uri: "/fixtures/images/mountain1.jpeg",
        },
      },
    },
    content: {
      numberOfJourneys: 6,
      station: [
        {
          name: "Aarhus H (Letbane)",
          x: "10203278",
          y: "56149932",
          id: "860005301",
        },
      ],
      busOrTram: "tram",
      iframeTitle: "Aarhus H (Letbane)",
      title: "Overskrift",
      text: "<p>Tekst på slide</p>",
      distance: "2 km",
      timeModerate: "5-7 minutter",
      timeFast: "3-23 minutter",
      image: ["/v1/media/00000000000000000000000001"],
      monitorLayout: "night",
      disableIcons: true,
    },
  },
  {
    "@id": "/v1/slides/1",
    id: "slide22-calendar-single-booking",
    type: "calendar",
    themeFile: "themes/dokk1.css",
    feed: {
      resources: ["test-lokale@display-templates.local.itkdev.dk"],
    },
    feedData: [
      {
        id: "uniqueEvent0",
        title: "There will be cake",
        startTime: dayjs().add(15, "seconds").unix(),
        endTime: dayjs().add(1, "hour").unix(),
        resourceTitle: "Det tomme rum",
        resourceId: "M0",
      },
      {
        id: "uniqueEvent1",
        title: "The cake is a lie",
        startTime: dayjs().add(1, "hour").add(30, "minutes").unix(),
        endTime: dayjs().add(2, "hour").unix(),
        resourceTitle: "Det tomme rum",
        resourceId: "M0",
      },
      {
        id: "uniqueEvent51",
        title: "Tea Tomorrow - will be ignored.",
        startTime: dayjs().add(1, "hour").add(1, "day").unix(),
        endTime: dayjs().add(2, "hour").add(1, "day").unix(),
        resourceTitle: "Det tomme rum",
        resourceId: "M0",
      },
      {
        id: "uniqueEvent2",
        startTime: dayjs().add(2, "hour").unix(),
        endTime: dayjs().add(3, "hour").unix(),
        resourceTitle: "Det tomme rum",
        resourceId: "M0",
      },
      {
        id: "uniqueEvent3",
        title: "Coffee",
        startTime: dayjs().add(3, "hour").add(15, "minutes").unix(),
        endTime: dayjs().add(4, "hour").unix(),
        resourceTitle: "Det tomme rum",
        resourceId: "M0",
      },
    ],
    mediaData: {},
    // Disable dark mode for slide.
    darkModeEnabled: false,
    content: {
      duration: 60000,
      layout: "singleBooking",
      title: "M2.3",
      subTitle: "Mødelokale",
      resourceAvailableText: "Lokalet er frit.",
      displayHeaders: true,
      resourceUnavailableText: "Det er optaget",
      footerText: "Se mere på localhost/events",
      fontSize: "font-size-lg",
    },
  },
  {
    id: "slide23-slideshow",
    type: "slideshow",
    themeFile: "themes/dokk1.css",
    theme: {
      logo: {
        assets: {
          uri: "/fixtures/images/mountain1.jpeg",
        },
      },
    },
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
    // Disable dark mode for slide.
    darkModeEnabled: false,
    content: {
      imageDuration: 5,
      images: [
        "/v1/media/00000000000000000000000001",
        "/v1/media/00000000000000000000000002",
        "/v1/media/00000000000000000000000003",
        "/v1/media/00000000000000000000000004",
      ],
      showLogo: false,
      logoSize: "l",
      mediaContain: true,
      logoPosition: "bottom right",
      transition: "fade",
      animation: "none",
    },
  },
  {
    id: "slide24-vimeo-player",
    type: "vimeo-player",
    content: {
      duration: 5000,
      vimeoid: "882393277",
      mediaContain: true,
    },
  },
  {
    id: "slide25-news-feed",
    type: "news-feed",
    themeFile: "themes/aarhus.css",
    // Disable dark mode for slide.
    darkModeEnabled: false,
    feed: {
      configuration: {
        numberOfEntries: 5,
        entryDuration: 5,
      },
    },
    feedData: {
      title: "Lorem Ipsum",
      entries: [
        {
          categories: ["Nyheder"],
          author: {
            name: "Test Testesen",
            uri: null,
            email: null,
          },
          lastModified: "2024-11-18T08:31:47+00:00",
          title: "Aenean scelerisque ligula ante, sed tristique tellus?",
          publicId: "136880",
          link: "https://example.com/news/1",
          host: "https://example.com",
          elements: [],
          medias: [
            {
              nodeName: null,
              type: null,
              url: "./fixtures/images/sunset-full-hd.jpg",
              length: null,
              title: null,
              description: null,
              thumbnail: "./fixtures/images/sunset-full-hd.jpg",
            },
          ],
          summary:
            "Duis volutpat orci lectus, vel fringilla tortor pharetra non. Nunc eget dui quam. Quisque non nulla et ante consequat tempor sit amet ut nisl.",
          content:
            "Duis volutpat orci lectus, vel fringilla tortor pharetra non. Nunc eget dui quam. Quisque non nulla et ante consequat tempor sit amet ut nisl. Duis volutpat orci lectus, vel fringilla tortor pharetra non. Nunc eget dui quam. Quisque non nulla et ante consequat tempor sit amet ut nisl. Nunc eget dui quam. Quisque non nulla et ante consequat tempor sit amet ut nisl. Nunc eget dui quam. Quisque non nulla et ante consequat tempor sit amet ut nisl. Nunc eget dui quam. Quisque non nulla et ante consequat tempor sit amet ut nisl. Nunc eget dui quam. Quisque non nulla et ante consequat tempor sit amet ut nisl. Nunc eget dui quam. Quisque non nulla et ante consequat tempor sit amet ut nisl. Nunc eget dui quam. Quisque non nulla et ante consequat tempor sit amet ut nisl. Nunc eget dui quam. Quisque non nulla et ante consequat tempor sit amet ut nisl. Nunc eget dui quam. Quisque non nulla et ante consequat tempor sit amet ut nisl. Nunc eget dui quam. Quisque non nulla et ante consequat tempor sit amet ut nisl.",
        },
        {
          categories: ["Nyheder"],
          author: {
            name: "Aenean Scelerisque",
            uri: null,
            email: null,
          },
          lastModified: "2024-11-18T08:31:47+00:00",
          title: "Duis volutpat orci lectus.",
          publicId: "136880",
          link: "https://example.com/news/1",
          host: "https://example.com",
          elements: [],
          medias: [
            {
              nodeName: null,
              type: null,
              url: "./fixtures/images/mountain4.jpeg",
              length: null,
              title: null,
              description: null,
              thumbnail: "./fixtures/images/mountain4.jpeg",
            },
          ],
          summary:
            "Duis volutpat orci lectus, vel fringilla tortor pharetra non. Nunc eget dui quam. Quisque non nulla et ante consequat tempor sit amet ut nisl.",
          content:
            "Duis volutpat orci lectus, vel fringilla tortor pharetra non. Nunc eget dui quam. Quisque non nulla et ante consequat tempor sit amet ut nisl. Duis volutpat orci lectus, vel fringilla tortor pharetra non. Nunc eget dui quam. Quisque non nulla et ante consequat tempor sit amet ut nisl. Nunc eget dui quam. Quisque non nulla et ante consequat tempor sit amet ut nisl. Nunc eget dui quam. Quisque non nulla et ante consequat tempor sit amet ut nisl. Nunc eget dui quam. Quisque non nulla et ante consequat tempor sit amet ut nisl. Nunc eget dui quam. Quisque non nulla et ante consequat tempor sit amet ut nisl. Nunc eget dui quam. Quisque non nulla et ante consequat tempor sit amet ut nisl. Nunc eget dui quam. Quisque non nulla et ante consequat tempor sit amet ut nisl. Nunc eget dui quam. Quisque non nulla et ante consequat tempor sit amet ut nisl. Nunc eget dui quam. Quisque non nulla et ante consequat tempor sit amet ut nisl. Nunc eget dui quam. Quisque non nulla et ante consequat tempor sit amet ut nisl.",
        },
        {
          title: "Lorem ipsum dolor sit amet.",
          lastModified: "2023-02-13T07:00:00.360Z",
          content:
            "Aenean scelerisque ligula ante, sed tristique tellus blandit sit amet. Vestibulum sagittis lobortis purus quis tempor. Aliquam pretium vitae risus id condimentum.",
        },
      ],
    },
    mediaData: {
      "/v1/media/00000000000000000000000001": {
        assets: {
          uri: "/fixtures/images/dokk1-rss-template-bg.jpg",
        },
      },
    },
    content: {
      fontSize: "font-size-m",
      mediaContain: false,
      fallbackImage: ["/v1/media/00000000000000000000000001"],
    },
  },
  {
    id: "slide26-instagram-no-max-entries",
    type: "instagram-feed",
    darkModeEnabled: false,
    content: {
      duration: 5000,
      hashtagText: "#myhashtag",
      orientation: "landscape",
      imageWidth: 40.0,
      entryDuration: 10,
      maxEntries: "",
      mediaContain: true,
    },
    feedData: [
      {
        text: "#mountains #horizon",
        textMarkup:
          '<div class="text">Sed nulla lorem, varius sodales justo ac, ultrices placerat nunc.</div>\n<div class="tags"><span class="tag">#mountains</span> <span class="tag">#horizon</span> Lorem ipsum ...</div>',
        mediaUrl: "./fixtures/images/mountain1.jpeg",
        videoUrl: null,
        username: "username",
        createdTime: "2022-02-03T08:50:07",
      },
      {
        text: "#mountains #horizon #sky",
        textMarkup:
          '<div class="text">Aenean consequat sem ut tortor auctor, eget volutpat libero consequat. Donec lacinia varius quam, ut efficitur diam ultrices et. Aliquam eget augue at felis rhoncus egestas. Sed porttitor elit a tellus tempus, sed tempus sapien finibus. Nam at dapibus sem. Aliquam sit amet feugiat ex. Ut dapibus, mi eu fermentum dignissim, sem ipsum vulputate est, sit amet euismod orci odio pharetra massa.</div>\n<div class="tags"><span class="tag">#mountains</span> <span class="tag">#horizon</span> <span class="tag">#sky</span> Lorem ipsum and mountains ...</div>',
        mediaUrl: "./fixtures/images/mountain2.jpeg",
        videoUrl: null,
        username: "username2",
        createdTime: "2022-01-03T08:50:07",
      },
    ],
  },
  {
    id: "slide27-brnd-sportcenter-today",
    type: "brnd",
    themeFile: "themes/brnd-sportcenter-today.css",
    feedData: [
      {
        bookingcode: "BKN-389928",
        remarks: "",
        startTime: dayjs().subtract(30, "minutes").unix(),
        endTime: dayjs().add(2, "hour").unix(),
        complex: "Humlehøj Hallen",
        area: "Svømmehal",
        facility: "Svømmehal",
        activity: "Svømning",
        team: "",
        status: "Tildelt tid",
        checkIn: false,
        bookingBy: "Humlehøj-Hallerne",
        changingRooms: "",
      },
      {
        bookingcode: "BKN-363980",
        remarks: "",
        startTime: dayjs().add(1, "hour").add(30, "minutes").unix(),
        endTime: dayjs().add(2, "hour").unix(),
        complex: "Humlehøj Hallen",
        area: "Svømmehal",
        facility: "Svømmehal",
        activity: "Svømning",
        team: "",
        status: "Tildelt tid",
        checkIn: false,
        bookingBy: "Offentlig svømning",
        changingRooms: "",
      },
      {
        bookingcode: "BKN-389984",
        remarks: "Ekstratræning",
        startTime: dayjs().add(2, "hour").unix(),
        endTime: dayjs().add(3, "hour").unix(),
        complex: "Humlehøj Hallen",
        area: "Hal 1",
        facility: "Hal 1",
        activity: "Fodbold",
        team: "",
        status: "Tildelt tid",
        checkIn: false,
        bookingBy: "Dybbøl Fodbold Boys",
        changingRooms: "",
      },
      {
        bookingcode: "BKN-364281",
        remarks: "",
        startTime: dayjs().add(3, "hour").add(15, "minutes").unix(),
        endTime: dayjs().add(4, "hour").unix(),
        complex: "Humlehøj Hallen",
        area: "Motionsrum",
        facility: "Motionsrum",
        activity: "Styrketræning",
        team: "",
        status: "Tildelt tid",
        checkIn: false,
        bookingBy: "Aahoo",
        changingRooms: "",
      },
      {
        bookingcode: "BKN-355806",
        remarks: "",
        startTime: dayjs().add(1, "hour").add(15, "minutes").unix(),
        endTime: dayjs().add(2, "hour").unix(),
        complex: "Humlehøj Hallen",
        area: "Spring- og klatrecenter",
        facility: "Klatrevæg",
        activity: "Klatring",
        team: "",
        status: "Tildelt tid",
        checkIn: false,
        bookingBy: "Sønderborg Klatreklub",
        changingRooms: "",
      },
      {
        bookingcode: "BKN-306748",
        remarks: "",
        startTime: dayjs().add(5, "hour").unix(),
        endTime: dayjs().add(8, "hour").unix(),
        complex: "Humlehøj Hallen",
        area: "Spring- og klatrecenter",
        facility: "Klatrevæg",
        activity: "Klatring",
        team: "",
        status: "Aflyst",
        checkIn: false,
        bookingBy: "Sønderborg Klatreklub",
        changingRooms: "",
      },
      {
        bookingcode: "BKN-395955",
        remarks: "Bestyrelsesmøde",
        startTime: dayjs().add(3, "hour").add(15, "minutes").unix(),
        endTime: dayjs().add(4, "hour").unix(),
        complex: "Humlehøj Hallen",
        area: "Mødelokaler",
        facility: "Mødelokale 1",
        activity: "Møder",
        team: "",
        status: "Tildelt tid",
        checkIn: false,
        bookingBy: "Kultur, Idræt og Fritid",
        changingRooms: "",
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
      layout: "sportcenter-today",
      title: "Aktiviteter i dag",
      // image: ["/v1/media/00000000000000000000000001"],
      fontSize: "font-size-m",
    },
  },
];

export default slides;
