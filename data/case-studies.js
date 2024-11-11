const caseStudies = [
  {
    image: "swarovski.png",
    name: "SWAROVSKI",
    descriptions: [
      "A new AAA game from Sombra Labs via their Web 3 / NFT community Sombra Network, Toxic Twilights brings the best of Fortnite, Counterstrike and graffiti subculture to the players.",
      "Built in Unreal 5 with Sombra’s Unreal development team, a full scale narrative, plotline, characters and more were developed for this community led gaming extraveganza.",
    ],
  },
  {
    image: "etrade-babies.png",
    name: "ETRADE",
    descriptions: [
      "A new AAA game from Sombra Labs via their Web 3 / NFT community Sombra Network, Toxic Twilights brings the best of Fortnite, Counterstrike and graffiti subculture to the players.",
      "Built in Unreal 5 with Sombra’s Unreal development team, a full scale narrative, plotline, characters and more were developed for this community led gaming extraveganza.",
    ],
  },
  {
    image: "toxic-twilights.png",
    name: "TOXIC TWILIGHTS",
    descriptions: [
      "A new AAA game from Sombra Labs via their Web 3 / NFT community Sombra Network, Toxic Twilights brings the best of Fortnite, Counterstrike and graffiti subculture to the players.",
      "Built in Unreal 5 with Sombra’s Unreal development team, a full scale narrative, plotline, characters and more were developed for this community led gaming extraveganza.",
    ],
    extra: (
      <div className="flex items-center gap-4">
        <span className="font-archivo text-lg">Play now</span>
        <img src="/images/arrow-big.png" className="max-w-[30px]" />
        <img
          src="/images/toxic-twilight-tag.png"
          className="max-h-[46px]"
          height={46}
          width={91.21}
        />
      </div>
    ),
  },
  {
    image: "ai-pipelines.png",
    name: "AI PIPELINES",
    descriptions: [
      "A new AAA game from Sombra Labs via their Web 3 / NFT community Sombra Network, Toxic Twilights brings the best of Fortnite, Counterstrike and graffiti subculture to the players.",
      "Built in Unreal 5 with Sombra’s Unreal development team, a full scale narrative, plotline, characters and more were developed for this community led gaming extraveganza.",
    ],
  },
  {
    image: "polident.png",
    name: "POLIDENT",
    descriptions: [
      "A new AAA game from Sombra Labs via their Web 3 / NFT community Sombra Network, Toxic Twilights brings the best of Fortnite, Counterstrike and graffiti subculture to the players.",
      "Built in Unreal 5 with Sombra’s Unreal development team, a full scale narrative, plotline, characters and more were developed for this community led gaming extraveganza.",
    ],
  },
  {
    image: "sombra-network.png",
    name: "SOMBRA NETWORK",
    descriptions: [
      "A new AAA game from Sombra Labs via their Web 3 / NFT community Sombra Network, Toxic Twilights brings the best of Fortnite, Counterstrike and graffiti subculture to the players.",
      "Built in Unreal 5 with Sombra’s Unreal development team, a full scale narrative, plotline, characters and more were developed for this community led gaming extraveganza.",
    ],
  },
];

const aboutData = [
  {
    title: "ABOUT",
    content: [
      {
        type: "paragraph",
        value: [
          { style: "normal", value: "Sombra Labs is a Creative" },
          { style: "highlight", value: "Technology studio" },
          {
            style: "normal",
            value:
              "at the forefront of immersive digital experiences, Web 3 ecosystems, and bespoke AI pipelines all powered by Future-Driven Production technologies",
          },
        ],
      },
    ],
  },
  {
    title: "TEAM",
    content: [
      {
        type: "paragraph",
        value: [
          {
            style: "normal",
            value:
              "We are creative technologists focused on developing workflows and solutions for VFX, Machine Learning, Interactive,  Immersive, Gaming, & Web 3.",
          },
        ],
      },
      { type: "button", value: "MEET US" },
    ],
  },
  {
    title: "WORKING WITH US",
    content: [
      {
        type: "paragraph",
        value: [
          {
            style: "normal",
            value:
              "We offer simple solutions for complex problems, always striving to partner over preach. Our clients are our friends and we walk with them hand in hand from start to finish. Always open, always available.",
          },
        ],
      },
    ],
  },
];

const selectedWorks = [
  {
    name: "Toxic Twilights",
    image: "toxic-twilights.jpg",
    videos: [],
    descriptions: [
      "A new AAA game from Sombra Labs via their Web 3 / NFT community Sombra Network, Toxic Twilights brings the best of Fortnite, Counterstrike and graffiti subculture to the players.",
      "Built in Unreal 5 with Sombra’s Unreal development team, a full scale narrative, plotline, characters and more were developed for this community led gaming extraveganza.",
    ],
    extra: (
      <div className="flex items-center gap-4">
        <span className="font-archivo text-lg">Play now</span>
        <img src="/images/arrow-big.png" className="max-w-[30px]" />
        <img src="/images/toxic-twilight-tag.png" className="max-h-[46px]" />
      </div>
    ),
  },
  {
    name: "Etrade: Superbowl",
    nameAlt: "ETRADE BABIES",
    image: "etrade-superbowl.jpg",
    videos: ["etrade-superbowl.mp4"],
    descriptions: [
      "Sombra was asked to reimagine the Etrade babies and how they came to life in their latest series of commercials for Superbowl and Social.",
      "in collaboration with Edisen and Parliament studios, E*Trade handled the AI portion of the job, generating new mouth and facial movements as well as creative sync and mannerisms.",
      "Sombra enlisted multiple tools including their own proprietary Sombra Sync Software developed for the project specifically.",
    ],
  },
  {
    name: "Pokemon Go",
    image: "pokemon-go.jpg",
    videos: ["pokemon-go.mp4", "pokemon-go-2.mp4", "pokemon-go-3.mp4"],
    descriptions: [
      "A spooky time with Sombra Labs, Niantic and Madwell sought the assistance of Sombra Labs in bringing to life the iconic characters from Pokemon Go for a new character release right in time for Halloween.",
      "The Sombra team, worked closely to bring this AR game’s vision to the screen in great detail and accuracy to the game itself.",
      "Sombra Labs managed all aspects from shoot the finishing.",
    ],
  },
  {
    name: "Swarovski",
    nameAlt: "SWAROVSKI 2024",
    image: "swarovski.jpg",
    videos: ["swarovski.mp4"],
    descriptions: [
      "Sombra Labs was tapped to help supervise and visualize the future of Swarovski’s 2024 jewelry line up.",
      "Working alongside Day Int, Sombra Labs spent 3 days in Manhattan shooting their new iconic campaign.",
      "A star studded production featuring Karli Kloss, Irina Shayk, and Abby Champion, Sombra Labs helped set the stage for the beautiful campaign and impeccable visuals",
    ],
  },
  {
    name: "Louis Vuitton",
    nameAlt: "LOUIS VUITTON x YAYOI KUSAMA",
    image: "louis-vuitton.jpg",
    videos: ["louis-vuitton.mp4"],
    descriptions: [
      "Working alongside great celebrity talent like Léa Seydoux, Hoyeon, Justin Timberlake, Zhou Dongyu, Naomi Osaka, and Cate Blanchett was an honor for Sombra Labs.",
      "brought the vision to life with a variety of tech workflows including lidar scans, gaussian splatting and full 3D facial reconstructions.",
    ],
  },
  {
    name: "NFL NFT",
    nameAlt: "NFL x TICKETMASTER NFTS CAMPAIGN",
    image: "nfl-nft.jpg",
    videos: [
      "nfl-nft.mp4",
      "nfl-nft-2.mp4",
      "nfl-nft-3.mp4",
      "nfl-nft-4.mp4",
      "nfl-nft-5.mp4",
    ],
    descriptions: [
      "For 2 years Sombra Labs has delivered breath taking NFTs for the collaboration between Ticketmaster and NFL. Creating an NFT for every match up of the regular season, playoffs and of course the Superbowl Sombra brought its NFT experience to the forefront of creative concepting.",
      "Sombra is proud to have delivered the worlds first Superbowl NFT and have been responsible for all visuals and concepts for this campaign.",
    ],
  },
];

export {caseStudies, aboutData, selectedWorks};
