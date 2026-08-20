export interface ToolDefinition {
  id: string;
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  description: string;
  category: 'home' | 'social' | 'style' | 'gaming';
  platform?: string;
  charLimit?: number;
  charLimitLabel?: string;
  recommendedStyles: string[];
  faqs: Array<{ question: string; answer: string }>;
  tips: Array<{ step: number; title: string; description: string }>;
  breadcrumbs: Array<{ label: string; href: string }>;
}

const ALL_TOOLS: ToolDefinition[] = [
  {
    id: "homepage",
    slug: "",
    title: "Font Changer — Fancy & Stylish Font Generator",
    metaTitle: "Font Changer — Fancy & Stylish Font Generator | Ff Font Lab",
    metaDescription:
      "Instantly convert standard text into sophisticated, pro-level typography styles for social media, gaming, and creative projects.",
    h1: "Fancy Text & Font Generator",
    description:
      "Generate stylish, fancy, and cool font styles using Unicode characters. Copy and paste anywhere — no installation needed.",
    category: "home",
    recommendedStyles: ["boldSans", "cursive", "doubleStruck", "monospace"],
    faqs: [
      {
        question: "What is a font changer?",
        answer:
          "A font changer is a tool that converts normal text into different Unicode font styles that can be copied and pasted into social media, messaging apps, games, and other platforms.",
      },
      {
        question: "Is this font generator free?",
        answer:
          "Yes, Ff Font Lab is completely free to use. You can generate unlimited font styles without any cost or sign-up required.",
      },
      {
        question: "Will the fonts work on all platforms?",
        answer:
          "The fonts use Unicode characters, so they work on most modern platforms including Instagram, TikTok, Twitter, Discord, and more. Some platforms may have limited support for certain characters.",
      },
    ],
    tips: [
      {
        step: 1,
        title: "Type your text",
        description: "Enter the text you want to convert in the input box.",
      },
      {
        step: 2,
        title: "Pick a style",
        description: "Browse through dozens of available font styles below the input.",
      },
      {
        step: 3,
        title: "Copy & paste",
        description: "Click the copy button and paste it anywhere you want.",
      },
    ],
    breadcrumbs: [{ label: "Home", href: "/" }],
  },
  {
    id: "font-changer",
    slug: "font-changer",
    title: "Font Changer Tool",
    metaTitle: "Font Changer — Convert Text to Stylish Fonts | Ff Font Lab",
    metaDescription:
      "Free online font changer tool. Convert any text into bold, italic, cursive, gothic, monospace, and 50+ more styles instantly.",
    h1: "Font Changer — Convert Text to Stylish Fonts",
    description:
      "Transform your text into over 50 unique font styles using our advanced Unicode font changer. Perfect for social media bios, usernames, and creative writing.",
    category: "home",
    recommendedStyles: [
      "boldSans",
      "italic",
      "cursive",
      "doubleStruck",
      "monospace",
    ],
    faqs: [
      {
        question: "How do I use the font changer?",
        answer:
          "Simply type or paste your text in the input field, browse through the available font styles, and click on any style to copy it to your clipboard.",
      },
      {
        question: "Can I use these fonts on Instagram?",
        answer:
          "Yes! Our font styles work perfectly on Instagram bios, captions, comments, and stories.",
      },
      {
        question: "Are there any character limits?",
        answer:
          "Our generator has no limits. However, platforms like Instagram have bio limits (150 characters) and Twitter has tweet limits (280 characters).",
      },
    ],
    tips: [
      {
        step: 1,
        title: "Enter your text",
        description:
          "Type or paste the text you want to stylize into the generator.",
      },
      {
        step: 2,
        title: "Browse styles",
        description:
          "Scroll through categories like Bold, Script, Gothic, and more.",
      },
      {
        step: 3,
        title: "Copy the result",
        description:
          "Click the copy button next to your preferred style and paste it wherever you need.",
      },
    ],
    breadcrumbs: [
      { label: "Home", href: "/" },
    ],
  },
  {
    id: "instagram",
    slug: "social/instagram",
    title: "Instagram Font Changer",
    metaTitle:
      "Instagram Font Changer — Stylish Bio & Caption Fonts | Ff Font Lab",
    metaDescription:
      "Generate stylish fonts for your Instagram bio, captions, and comments. Stand out with unique Unicode font styles on Instagram.",
    h1: "Instagram Font Changer",
    description:
      "Create eye-catching fonts for your Instagram bio, posts, reels, and stories. Our Unicode fonts work seamlessly on Instagram.",
    category: "social",
    platform: "instagram",
    charLimit: 150,
    charLimitLabel: "Bio character limit",
    recommendedStyles: ["boldSans", "cursive", "doubleStruck", "smallCaps"],
    faqs: [
      {
        question: "How do I change my Instagram bio font?",
        answer:
          "Use our generator to create your desired font style, then paste it into your Instagram bio field in the Edit Profile section.",
      },
      {
        question: "Do these fonts work in Instagram comments?",
        answer:
          "Yes, our Unicode fonts work in Instagram comments, captions, and bio sections.",
      },
      {
        question: "Will my followers see the font correctly?",
        answer:
          "Most modern devices and the Instagram app support Unicode fonts, so your followers should see them correctly.",
      },
    ],
    tips: [
      {
        step: 1,
        title: "Enter your bio text",
        description:
          "Type your Instagram bio text into the generator (max 150 characters).",
      },
      {
        step: 2,
        title: "Choose a font style",
        description:
          "Pick from bold, cursive, double-struck, and other styles.",
      },
      {
        step: 3,
        title: "Paste into Instagram",
        description:
          "Open Instagram, go to Edit Profile, and paste the font into your bio.",
      },
    ],
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Social Media", href: "/social" },
      { label: "Instagram", href: "/social/instagram-font-generator" },
    ],
  },
  {
    id: "facebook",
    slug: "social/facebook",
    title: "Facebook Font Changer",
    metaTitle:
      "Facebook Font Changer — Stylish Profile & Post Fonts | Ff Font Lab",
    metaDescription:
      "Generate unique stylish fonts for your Facebook profile, posts, comments, and stories. Stand out on Facebook with custom typography.",
    h1: "Facebook Font Changer",
    description:
      "Transform your Facebook text with stylish Unicode fonts. Perfect for profiles, posts, comments, and bios on Facebook.",
    category: "social",
    platform: "facebook",
    charLimit: 101,
    charLimitLabel: "Name field limit",
    recommendedStyles: ["boldSans", "italic", "sansSerif", "monospace"],
    faqs: [
      {
        question: "Can I use these fonts in my Facebook name?",
        answer:
          "Some styles may work in your Facebook name, but Facebook may reject certain Unicode characters in name fields.",
      },
      {
        question: "Do these fonts work in Facebook comments?",
        answer:
          "Yes, our Unicode fonts work in Facebook posts, comments, and most text fields.",
      },
      {
        question: "Are the fonts visible to everyone?",
        answer:
          "Yes, Unicode fonts are universal and should be visible to all users viewing your content.",
      },
    ],
    tips: [
      {
        step: 1,
        title: "Type your text",
        description: "Enter the text you want to style for Facebook.",
      },
      {
        step: 2,
        title: "Select a style",
        description: "Browse and choose from multiple font categories.",
      },
      {
        step: 3,
        title: "Copy and paste",
        description: "Paste the styled text into your Facebook post or profile.",
      },
    ],
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Social Media", href: "/social" },
      { label: "Facebook", href: "/social/facebook-font-style" },
    ],
  },
  {
    id: "whatsapp",
    slug: "social/whatsapp",
    title: "WhatsApp Font Changer",
    metaTitle:
      "WhatsApp Font Changer — Cool Chat & Status Fonts | Ff Font Lab",
    metaDescription:
      "Create stylish fonts for your WhatsApp status, bio, and chat messages. Stand out with unique Unicode text styles on WhatsApp.",
    h1: "WhatsApp Font Changer",
    description:
      "Make your WhatsApp messages, status updates, and profile bio stand out with our stylish Unicode font generator.",
    category: "social",
    platform: "whatsapp",
    charLimit: 139,
    charLimitLabel: "About section limit",
    recommendedStyles: [
      "boldSans",
      "italic",
      "doubleStruck",
      "smallCaps",
      "fullwidth",
    ],
    faqs: [
      {
        question: "How do I change my WhatsApp font?",
        answer:
          "Generate your desired font style, then paste it into your WhatsApp status, bio, or message input field.",
      },
      {
        question: "Do these fonts work in WhatsApp messages?",
        answer:
          "Yes, you can copy and paste styled text into any WhatsApp message, status, or profile section.",
      },
      {
        question: "Will the fonts display correctly on the recipient's phone?",
        answer:
          "Unicode fonts are widely supported on modern smartphones, so most recipients will see the fonts correctly.",
      },
    ],
    tips: [
      {
        step: 1,
        title: "Type your message",
        description:
          "Enter the text you want to style for WhatsApp chat or status.",
      },
      {
        step: 2,
        title: "Pick a style",
        description:
          "Choose from bold, italic, double-struck, and more options.",
      },
      {
        step: 3,
        title: "Send it",
        description: "Paste the styled text and send it in your WhatsApp chat.",
      },
    ],
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Social Media", href: "/social" },
      { label: "WhatsApp", href: "/social/whatsapp-font-generator" },
    ],
  },
  {
    id: "tiktok",
    slug: "social/tiktok",
    title: "TikTok Font Changer",
    metaTitle:
      "TikTok Font Changer — Stylish Bio & Username Fonts | Ff Font Lab",
    metaDescription:
      "Generate unique fonts for your TikTok bio, username, and video captions. Stand out with custom Unicode typography on TikTok.",
    h1: "TikTok Font Changer",
    description:
      "Create eye-catching fonts for your TikTok profile bio, username, and video descriptions using our Unicode font generator.",
    category: "social",
    platform: "tiktok",
    charLimit: 80,
    charLimitLabel: "Bio character limit",
    recommendedStyles: [
      "boldSans",
      "cursive",
      "doubleStruck",
      "fraktur",
    ],
    faqs: [
      {
        question: "How do I change my TikTok bio font?",
        answer:
          "Generate your desired font style, then paste it into your TikTok bio field in the Edit Profile section.",
      },
      {
        question: "Do these fonts work in TikTok comments?",
        answer:
          "Yes, our Unicode fonts work in TikTok bios, comments, and video descriptions.",
      },
      {
        question: "Can I use these fonts in my TikTok username?",
        answer:
          "TikTok has restrictions on usernames, so not all Unicode characters will be accepted. Bio fonts work best.",
      },
    ],
    tips: [
      {
        step: 1,
        title: "Type your bio text",
        description: "Keep it under 80 characters for TikTok bios.",
      },
      {
        step: 2,
        title: "Choose a font",
        description: "Select a bold or decorative style that stands out.",
      },
      {
        step: 3,
        title: "Update your profile",
        description:
          "Paste the font into your TikTok bio in the Edit Profile section.",
      },
    ],
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Social Media", href: "/social" },
      { label: "TikTok", href: "/social/tiktok-font-generator" },
    ],
  },
  {
    id: "twitter",
    slug: "social/twitter",
    title: "Twitter / X Font Changer",
    metaTitle:
      "Twitter / X Font Changer — Stylish Tweet & Bio Fonts | Ff Font Lab",
    metaDescription:
      "Generate stylish fonts for your Twitter / X profile, tweets, and replies. Stand out with unique Unicode typography on Twitter.",
    h1: "Twitter / X Font Changer",
    description:
      "Make your tweets, bio, and replies stand out with our stylish Unicode font generator for Twitter / X.",
    category: "social",
    platform: "twitter",
    charLimit: 160,
    charLimitLabel: "Bio character limit",
    recommendedStyles: [
      "boldSans",
      "sansSerif",
      "monospace",
      "smallCaps",
    ],
    faqs: [
      {
        question: "Can I use these fonts in my Twitter bio?",
        answer:
          "Yes, generate your desired font and paste it into your Twitter / X bio in the Edit Profile section.",
      },
      {
        question: "Do these fonts work in tweets?",
        answer:
          "Yes, you can paste styled Unicode text into tweets, replies, and profile sections.",
      },
      {
        question: "Will the fonts affect my character count?",
        answer:
          "Some Unicode characters count as more than one character. Keep this in mind within Twitter's 280-character limit.",
      },
    ],
    tips: [
      {
        step: 1,
        title: "Type your text",
        description: "Enter text for your tweet or bio (max 160 for bio).",
      },
      {
        step: 2,
        title: "Select a font",
        description: "Choose from bold, sans-serif, monospace, and more.",
      },
      {
        step: 3,
        title: "Post it",
        description: "Paste the styled text into your tweet or profile bio.",
      },
    ],
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Social Media", href: "/social" },
      { label: "Twitter / X", href: "/social/twitter-font-generator" },
    ],
  },
  {
    id: "linkedin",
    slug: "social/linkedin",
    title: "LinkedIn Font Changer",
    metaTitle:
      "LinkedIn Font Changer — Professional Profile Fonts | Ff Font Lab",
    metaDescription:
      "Generate professional-looking fonts for your LinkedIn profile, headline, and posts. Stand out with unique typography on LinkedIn.",
    h1: "LinkedIn Font Changer",
    description:
      "Add a professional touch to your LinkedIn profile with our Unicode font generator. Perfect for headlines, summaries, and posts.",
    category: "social",
    platform: "linkedin",
    charLimit: 2200,
    charLimitLabel: "About section limit",
    recommendedStyles: [
      "boldSans",
      "sansSerif",
      "doubleStruck",
      "smallCaps",
    ],
    faqs: [
      {
        question: "Are these fonts appropriate for LinkedIn?",
        answer:
          "Yes, we recommend clean and professional styles like Bold Sans, Sans-Serif, and Small Caps for LinkedIn profiles.",
      },
      {
        question: "Can I use styled text in my LinkedIn headline?",
        answer:
          "Yes, you can paste styled Unicode text into your LinkedIn headline and about section.",
      },
      {
        question: "Will LinkedIn accept the special characters?",
        answer:
          "LinkedIn supports most Unicode characters in profile text fields. Some special characters may not be accepted.",
      },
    ],
    tips: [
      {
        step: 1,
        title: "Write your headline",
        description:
          "Type your professional headline or summary text.",
      },
      {
        step: 2,
        title: "Pick a professional style",
        description:
          "Choose subtle, professional styles like Bold Sans or Small Caps.",
      },
      {
        step: 3,
        title: "Update your profile",
        description:
          "Paste the styled text into your LinkedIn profile fields.",
      },
    ],
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Social Media", href: "/social" },
      { label: "LinkedIn", href: "/social/linkedin-font-generator" },
    ],
  },
  {
    id: "snapchat",
    slug: "social/snapchat",
    title: "Snapchat Font Changer",
    metaTitle:
      "Snapchat Font Changer — Cool Username & Bio Fonts | Ff Font Lab",
    metaDescription:
      "Generate stylish fonts for your Snapchat display name, bio, and messages. Stand out with unique Unicode typography on Snapchat.",
    h1: "Snapchat Font Changer",
    description:
      "Make your Snapchat profile and messages stand out with our Unicode font generator. Create unique display names and bios.",
    category: "social",
    platform: "snapchat",
    charLimit: 150,
    charLimitLabel: "Bio character limit",
    recommendedStyles: [
      "boldSans",
      "cursive",
      "italic",
      "fraktur",
    ],
    faqs: [
      {
        question: "Can I change my Snapchat display name font?",
        answer:
          "Yes, generate your desired font style and paste it into your Snapchat display name or bio section.",
      },
      {
        question: "Do these fonts work in Snapchat chats?",
        answer:
          "You can paste styled Unicode text into Snapchat chat messages and profile fields.",
      },
      {
        question: "Will the fonts show for my friends on Snapchat?",
        answer:
          "Unicode fonts are widely supported, so most users will see the styled text correctly.",
      },
    ],
    tips: [
      {
        step: 1,
        title: "Type your display name",
        description: "Enter the name or text you want to stylize.",
      },
      {
        step: 2,
        title: "Choose a font",
        description:
          "Select a bold, cursive, or other style that matches your vibe.",
      },
      {
        step: 3,
        title: "Paste into Snapchat",
        description:
          "Update your Snapchat display name or bio with the styled text.",
      },
    ],
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Social Media", href: "/social" },
      { label: "Snapchat", href: "/social" },
    ],
  },
  {
    id: "telegram",
    slug: "social/telegram",
    title: "Telegram Font Changer",
    metaTitle:
      "Telegram Font Changer — Cool Chat & Profile Fonts | Ff Font Lab",
    metaDescription:
      "Generate stylish fonts for your Telegram profile, username, and messages. Stand out with unique Unicode typography on Telegram.",
    h1: "Telegram Font Changer",
    description:
      "Enhance your Telegram messages and profile with our Unicode font generator. Create unique styled text for chats and bios.",
    category: "social",
    platform: "telegram",
    recommendedStyles: [
      "boldSans",
      "italic",
      "monospace",
      "doubleStruck",
    ],
    faqs: [
      {
        question: "Can I use these fonts in Telegram messages?",
        answer:
          "Yes, you can paste styled Unicode text into Telegram messages, channel descriptions, and profile fields.",
      },
      {
        question: "Do the fonts work in Telegram channel names?",
        answer:
          "Some Unicode characters may be accepted in channel names. Try different styles to see which ones work.",
      },
      {
        question: "Will my contacts see the fonts correctly?",
        answer:
          "Telegram supports Unicode, so your contacts should see the styled text correctly on all platforms.",
      },
    ],
    tips: [
      {
        step: 1,
        title: "Enter your text",
        description: "Type the text for your Telegram message or profile.",
      },
      {
        step: 2,
        title: "Select a style",
        description:
          "Choose from bold, italic, monospace, and other options.",
      },
      {
        step: 3,
        title: "Send or paste",
        description:
          "Paste the styled text into your Telegram chat or profile.",
      },
    ],
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Social Media", href: "/social" },
      { label: "Telegram", href: "/social" },
    ],
  },
  {
    id: "threads",
    slug: "social/threads",
    title: "Threads Font Changer",
    metaTitle:
      "Threads Font Changer — Stylish Bio & Post Fonts | Ff Font Lab",
    metaDescription:
      "Generate unique fonts for your Threads profile, bio, and posts. Stand out with custom Unicode typography on Threads.",
    h1: "Threads Font Changer",
    description:
      "Make your Threads profile and posts stand out with our Unicode font generator. Create stylish bios and post text.",
    category: "social",
    platform: "threads",
    charLimit: 150,
    charLimitLabel: "Bio character limit",
    recommendedStyles: [
      "boldSans",
      "cursive",
      "sansSerif",
      "smallCaps",
    ],
    faqs: [
      {
        question: "Do these fonts work on Threads?",
        answer:
          "Yes, our Unicode fonts work in Threads profiles, bios, and posts since Threads supports Unicode characters.",
      },
      {
        question: "How do I change my Threads bio font?",
        answer:
          "Generate the font you want, then paste it into your Threads bio section in the Edit Profile area.",
      },
      {
        question: "Can I use these fonts in Threads replies?",
        answer:
          "Yes, you can paste styled Unicode text into Threads posts and replies.",
      },
    ],
    tips: [
      {
        step: 1,
        title: "Type your bio",
        description: "Enter your Threads bio text in the generator.",
      },
      {
        step: 2,
        title: "Choose a style",
        description:
          "Select from bold, cursive, sans-serif, and other styles.",
      },
      {
        step: 3,
        title: "Update your profile",
        description:
          "Paste the styled text into your Threads profile bio.",
      },
    ],
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Social Media", href: "/social" },
      { label: "Threads", href: "/social" },
    ],
  },
  {
    id: "pinterest",
    slug: "social/pinterest",
    title: "Pinterest Font Changer",
    metaTitle:
      "Pinterest Font Changer — Stylish Profile & Pin Fonts | Ff Font Lab",
    metaDescription:
      "Generate stylish fonts for your Pinterest profile, board names, and pin descriptions. Stand out with unique Unicode typography.",
    h1: "Pinterest Font Changer",
    description:
      "Add a creative touch to your Pinterest profile with our Unicode font generator. Perfect for bios, board names, and descriptions.",
    category: "social",
    platform: "pinterest",
    charLimit: 500,
    charLimitLabel: "About section limit",
    recommendedStyles: [
      "cursive",
      "boldScript",
      "boldSans",
      "fullwidth",
    ],
    faqs: [
      {
        question: "Can I use these fonts on Pinterest?",
        answer:
          "Yes, you can paste styled Unicode text into your Pinterest profile bio, board names, and pin descriptions.",
      },
      {
        question: "Which styles work best for Pinterest?",
        answer:
          "Cursive and Script styles are popular choices for Pinterest since they match the platform's aesthetic.",
      },
      {
        question: "Will the fonts display correctly on Pinterest?",
        answer:
          "Pinterest supports Unicode characters, so your styled text should display correctly.",
      },
    ],
    tips: [
      {
        step: 1,
        title: "Enter your text",
        description:
          "Type the text for your Pinterest profile or board name.",
      },
      {
        step: 2,
        title: "Pick a creative style",
        description:
          "Choose cursive, script, or bold styles for a creative look.",
      },
      {
        step: 3,
        title: "Update Pinterest",
        description:
          "Paste the styled text into your Pinterest profile or board settings.",
      },
    ],
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Social Media", href: "/social" },
      { label: "Pinterest", href: "/social" },
    ],
  },
  {
    id: "cursive",
    slug: "styles/cursive",
    title: "Cursive Font Generator",
    metaTitle: "Cursive Font Generator — Elegant Script Fonts | Ff Font Lab",
    metaDescription:
      "Generate beautiful cursive and script fonts online. Create elegant handwritten-style text for social media, invitations, and creative projects.",
    h1: "Cursive Font Generator",
    description:
      "Create elegant cursive and handwritten-style fonts using Unicode characters. Perfect for invitations, social media, and creative projects.",
    category: "style",
    recommendedStyles: ["cursive", "boldScript"],
    faqs: [
      {
        question: "What is a cursive font?",
        answer:
          "A cursive font mimics handwritten or calligraphic letterforms, creating an elegant, flowing text style.",
      },
      {
        question: "Can I use cursive fonts for invitations?",
        answer:
          "Yes, cursive fonts are perfect for wedding invitations, greeting cards, and formal event invitations.",
      },
      {
        question: "Are cursive fonts readable?",
        answer:
          "While cursive fonts are stylish, very elaborate styles may be harder to read. Use them for short text like names and titles.",
      },
    ],
    tips: [
      {
        step: 1,
        title: "Type your text",
        description: "Enter the text you want in cursive style.",
      },
      {
        step: 2,
        title: "Choose cursive style",
        description:
          "Pick between standard cursive or bold script variations.",
      },
      {
        step: 3,
        title: "Copy and use",
        description: "Copy the result and paste it wherever you need.",
      },
    ],
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Font Styles", href: "/styles" },
      { label: "Cursive", href: "/styles/cursive-text-generator" },
    ],
  },
  {
    id: "bold",
    slug: "styles/bold",
    title: "Bold Font Generator",
    metaTitle:
      "Bold Font Generator — Create Bold Text Online | Ff Font Lab",
    metaDescription:
      "Generate bold text using our free bold font generator. Create bold Unicode text for social media bios, usernames, and more.",
    h1: "Bold Font Generator",
    description:
      "Create bold, impactful text using our Unicode bold font generator. Perfect for social media bios, headlines, and emphasis text.",
    category: "style",
    recommendedStyles: ["boldSans", "doubleStruck", "sansSerif"],
    faqs: [
      {
        question: "What is a bold font?",
        answer:
          "A bold font uses heavier letter strokes to create a thicker, more impactful appearance that draws attention.",
      },
      {
        question: "Can I use bold text on Instagram?",
        answer:
          "Yes, our bold Unicode fonts work perfectly in Instagram bios, captions, and comments.",
      },
      {
        question: "How is this different from just bold formatting?",
        answer:
          "Unlike standard bold formatting, our Unicode bold fonts work in places where bold formatting isn't supported, like social media bios.",
      },
    ],
    tips: [
      {
        step: 1,
        title: "Enter text",
        description: "Type the text you want to make bold.",
      },
      {
        step: 2,
        title: "Select bold style",
        description:
          "Choose from bold sans-serif, double-struck, and other bold styles.",
      },
      {
        step: 3,
        title: "Copy & paste",
        description: "Copy the bold text and use it anywhere online.",
      },
    ],
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Font Styles", href: "/styles" },
      { label: "Bold", href: "/styles/bold-text-generator" },
    ],
  },
  {
    id: "gothic",
    slug: "styles/gothic",
    title: "Gothic Font Generator",
    metaTitle:
      "Gothic Font Generator — Blackletter & Fraktur Fonts | Ff Font Lab",
    metaDescription:
      "Generate gothic, blackletter, and fraktur style fonts online. Create medieval-inspired text for logos, gaming, and creative projects.",
    h1: "Gothic Font Generator",
    description:
      "Create gothic, blackletter, and fraktur style fonts using Unicode characters. Perfect for gaming, logos, and medieval-inspired designs.",
    category: "style",
    recommendedStyles: ["fraktur", "boldFraktur"],
    faqs: [
      {
        question: "What are gothic fonts?",
        answer:
          "Gothic fonts, also called blackletter or fraktur, are ornate typefaces inspired by medieval calligraphy with sharp, angular letterforms.",
      },
      {
        question: "Can I use gothic fonts for gaming names?",
        answer:
          "Absolutely! Gothic fonts are very popular for gaming usernames, clan tags, and guild names.",
      },
      {
        question: "Do gothic fonts work on all platforms?",
        answer:
          "Most modern platforms support Unicode gothic characters, but some older systems may have limited support.",
      },
    ],
    tips: [
      {
        step: 1,
        title: "Type your text",
        description: "Enter the text for your gothic-styled design.",
      },
      {
        step: 2,
        title: "Choose gothic style",
        description: "Pick between standard fraktur or bold fraktur.",
      },
      {
        step: 3,
        title: "Copy the result",
        description:
          "Use the gothic text for gaming, logos, or creative projects.",
      },
    ],
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Font Styles", href: "/styles" },
      { label: "Gothic", href: "/styles/gothic-font-generator" },
    ],
  },
  {
    id: "calligraphy",
    slug: "styles/calligraphy",
    title: "Calligraphy Font Generator",
    metaTitle:
      "Calligraphy Font Generator — Elegant Handwritten Fonts | Ff Font Lab",
    metaDescription:
      "Generate elegant calligraphy-style fonts online. Create beautiful handwritten typography for invitations, logos, and creative projects.",
    h1: "Calligraphy Font Generator",
    description:
      "Create beautiful calligraphy-style text using Unicode characters. Perfect for elegant projects, invitations, and artistic designs.",
    category: "style",
    recommendedStyles: ["cursive", "boldScript", "italic"],
    faqs: [
      {
        question: "What is calligraphy font style?",
        answer:
          "Calligraphy fonts mimic the art of decorative handwriting, featuring elegant, flowing strokes and artistic letterforms.",
      },
      {
        question: "Can I use calligraphy fonts for wedding invitations?",
        answer:
          "Yes, calligraphy fonts are one of the most popular choices for wedding invitations and formal stationery.",
      },
      {
        question: "Are these calligraphy fonts free to use?",
        answer:
          "Yes, our calligraphy font generator is completely free. Generate unlimited text styles.",
      },
    ],
    tips: [
      {
        step: 1,
        title: "Enter your text",
        description: "Type the text you want in calligraphy style.",
      },
      {
        step: 2,
        title: "Select calligraphy font",
        description:
          "Choose from cursive, bold script, or italic styles.",
      },
      {
        step: 3,
        title: "Copy and use",
        description:
          "Copy the calligraphy text for invitations or designs.",
      },
    ],
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Font Styles", href: "/styles" },
      { label: "Calligraphy", href: "/styles/calligraphy-font-generator" },
    ],
  },
  {
    id: "aesthetic",
    slug: "styles/aesthetic",
    title: "Aesthetic Font Generator",
    metaTitle:
      "Aesthetic Font Generator — Vaporwave & Artsy Fonts | Ff Font Lab",
    metaDescription:
      "Generate aesthetic, vaporwave, and artsy fonts online. Create unique typography for social media, profiles, and creative content.",
    h1: "Aesthetic Font Generator",
    description:
      "Create aesthetic and artsy text styles using Unicode characters. Perfect for vaporwave designs, social media, and creative content.",
    category: "style",
    recommendedStyles: [
      "fullwidth",
      "doubleStruck",
      "smallCaps",
      "squared",
    ],
    faqs: [
      {
        question: "What makes a font aesthetic?",
        answer:
          "Aesthetic fonts have a unique, visually pleasing quality that creates a specific mood or vibe, often associated with vaporwave or artsy content.",
      },
      {
        question: "Which aesthetic font is most popular?",
        answer:
          "Fullwidth and double-struck styles are among the most popular aesthetic fonts, commonly seen in vaporwave and retro-themed content.",
      },
      {
        question: "Can I use aesthetic fonts on TikTok?",
        answer:
          "Yes, aesthetic fonts work great in TikTok bios, captions, and comments to give your profile a unique look.",
      },
    ],
    tips: [
      {
        step: 1,
        title: "Type your text",
        description: "Enter the text you want to stylize.",
      },
      {
        step: 2,
        title: "Pick an aesthetic style",
        description:
          "Choose from fullwidth, double-struck, squared, and other artsy options.",
      },
      {
        step: 3,
        title: "Use it creatively",
        description:
          "Paste the aesthetic text into your social media or design projects.",
      },
    ],
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Font Styles", href: "/styles" },
      { label: "Aesthetic", href: "/styles/aesthetic-text-generator" },
    ],
  },
  {
    id: "monospace",
    slug: "styles/monospace",
    title: "Monospace Font Generator",
    metaTitle:
      "Monospace Font Generator — Code-Style Text | Ff Font Lab",
    metaDescription:
      "Generate monospace fonts online. Create code-style, typewriter text for social media, coding projects, and creative designs.",
    h1: "Monospace Font Generator",
    description:
      "Create monospace, code-style text using Unicode characters. Perfect for coding-related content, terminal aesthetics, and clean designs.",
    category: "style",
    recommendedStyles: ["monospace"],
    faqs: [
      {
        question: "What is a monospace font?",
        answer:
          "A monospace font is one where each character occupies the same amount of horizontal space, commonly used in coding and terminal interfaces.",
      },
      {
        question: "Can I use monospace fonts on social media?",
        answer:
          "Yes, Unicode monospace fonts work in social media bios, posts, and comments to give a techy, code-like appearance.",
      },
      {
        question: "Are monospace fonts good for code screenshots?",
        answer:
          "Our Unicode monospace fonts are great for sharing code snippets in social media posts and messages.",
      },
    ],
    tips: [
      {
        step: 1,
        title: "Enter your text",
        description:
          "Type the text or code snippet you want in monospace.",
      },
      {
        step: 2,
        title: "Copy the result",
        description:
          "The monospace font is applied automatically.",
      },
      {
        step: 3,
        title: "Paste it anywhere",
        description:
          "Use the monospace text on social media, in messages, or for design projects.",
      },
    ],
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Font Styles", href: "/styles" },
      { label: "Monospace", href: "/styles" },
    ],
  },
  {
    id: "script",
    slug: "styles/script",
    title: "Script Font Generator",
    metaTitle:
      "Script Font Generator — Elegant Handwritten Text | Ff Font Lab",
    metaDescription:
      "Generate script and handwritten-style fonts online. Create flowing, elegant typography for social media and creative projects.",
    h1: "Script Font Generator",
    description:
      "Create flowing script-style text using Unicode characters. Perfect for elegant signatures, social media, and artistic projects.",
    category: "style",
    recommendedStyles: ["cursive", "boldScript", "italic"],
    faqs: [
      {
        question: "What is a script font?",
        answer:
          "A script font mimics handwriting or calligraphy, featuring flowing, connected letterforms that resemble written text.",
      },
      {
        question: "How is script different from cursive?",
        answer:
          "Script and cursive are very similar. Script fonts tend to be more formal and elegant, while cursive can be more casual.",
      },
      {
        question: "Can I use script fonts for my signature?",
        answer:
          "Yes, script fonts are great for creating digital signatures, usernames, and display names.",
      },
    ],
    tips: [
      {
        step: 1,
        title: "Type your text",
        description:
          "Enter the text you want in script style.",
      },
      {
        step: 2,
        title: "Choose a script style",
        description:
          "Pick between standard script, bold script, or italic.",
      },
      {
        step: 3,
        title: "Copy and paste",
        description:
          "Use the script text for signatures, profiles, and more.",
      },
    ],
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Font Styles", href: "/styles" },
      { label: "Script", href: "/styles" },
    ],
  },
  {
    id: "gaming-nickname",
    slug: "gaming/nickname",
    title: "Gaming Nickname Generator",
    metaTitle:
      "Gaming Nickname Generator — Cool Gamer Tags | Ff Font Lab",
    metaDescription:
      "Generate cool gaming nicknames with stylish Unicode fonts. Create unique gamer tags for any game or platform.",
    h1: "Gaming Nickname Generator",
    description:
      "Create unique, stylish gaming nicknames using our Unicode font generator. Stand out in any game with a cool-looking username.",
    category: "gaming",
    recommendedStyles: [
      "boldSans",
      "fraktur",
      "boldFraktur",
      "doubleStruck",
      "monospace",
    ],
    faqs: [
      {
        question: "How do I create a cool gaming nickname?",
        answer:
          "Type your desired name into the generator, browse through the font styles, and pick one that looks cool. Then copy and paste it into your game.",
      },
      {
        question: "Do these fonts work in all games?",
        answer:
          "Most modern games support Unicode characters, but some games may have restrictions on which characters are allowed in usernames.",
      },
      {
        question: "Can I use special characters in my gaming name?",
        answer:
          "Many games allow Unicode characters in display names or clan tags, but not all support them in official usernames.",
      },
    ],
    tips: [
      {
        step: 1,
        title: "Think of a name",
        description:
          "Come up with a cool base name or word you want to stylize.",
      },
      {
        step: 2,
        title: "Generate styles",
        description:
          "Browse through bold, gothic, double-struck, and other gaming-friendly styles.",
      },
      {
        step: 3,
        title: "Use in your game",
        description:
          "Copy the styled name and paste it into your game's name or profile settings.",
      },
    ],
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Gaming", href: "/gaming" },
      { label: "Gaming Nickname", href: "/gaming/gaming-nickname-generator" },
    ],
  },
  {
    id: "free-fire",
    slug: "gaming/free-fire",
    title: "Free Fire Name Generator",
    metaTitle:
      "Free Fire Name Generator — Stylish FF Names | Ff Font Lab",
    metaDescription:
      "Generate stylish Free Fire names with cool Unicode fonts. Create unique gaming names for your Free Fire profile.",
    h1: "Free Fire Name Generator",
    description:
      "Create stunning Free Fire player names using our Unicode font generator. Stand out in Battle Royale with a unique styled name.",
    category: "gaming",
    platform: "free-fire",
    charLimit: 12,
    charLimitLabel: "Name character limit",
    recommendedStyles: [
      "boldSans",
      "fraktur",
      "doubleStruck",
      "circled",
      "squared",
    ],
    faqs: [
      {
        question: "How do I change my Free Fire name?",
        answer:
          "Generate your desired styled name, then go to your Free Fire profile, tap on your name, and paste the styled text.",
      },
      {
        question: "What is the character limit for Free Fire names?",
        answer:
          "Free Fire has a maximum of 12 characters for player names. Keep this in mind when generating styled names.",
      },
      {
        question: "Do styled names work in Free Fire?",
        answer:
          "Yes, Free Fire supports many Unicode characters, so styled names typically display correctly in-game.",
      },
    ],
    tips: [
      {
        step: 1,
        title: "Keep it short",
        description:
          "Free Fire limits names to 12 characters, so keep your name brief.",
      },
      {
        step: 2,
        title: "Generate styled names",
        description:
          "Browse through bold, gothic, and other styles that look great in-game.",
      },
      {
        step: 3,
        title: "Change your name",
        description:
          "Use a name change card in Free Fire and paste your styled name.",
      },
    ],
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Gaming", href: "/gaming" },
      { label: "Free Fire", href: "/gaming/free-fire-nickname" },
    ],
  },
  {
    id: "pubg",
    slug: "gaming/pubg",
    title: "PUBG Name Generator",
    metaTitle:
      "PUBG Name Generator — Stylish BGMI & PUBG Names | Ff Font Lab",
    metaDescription:
      "Generate stylish PUBG and BGMI names with cool Unicode fonts. Create unique gaming names that stand out in the battlefield.",
    h1: "PUBG Name Generator",
    description:
      "Create eye-catching PUBG and BGMI player names using our Unicode font generator. Stand out in every match with a styled name.",
    category: "gaming",
    platform: "pubg",
    charLimit: 14,
    charLimitLabel: "Name character limit",
    recommendedStyles: [
      "boldSans",
      "fraktur",
      "boldFraktur",
      "doubleStruck",
      "squared",
    ],
    faqs: [
      {
        question: "How do I change my PUBG name?",
        answer:
          "Generate your styled name, then go to your PUBG profile, tap on your nickname, and paste the styled text (you may need a rename card).",
      },
      {
        question: "What is the character limit for PUBG names?",
        answer:
          "PUBG allows up to 14 characters for player names. Make sure your styled name fits within this limit.",
      },
      {
        question: "Can I use emojis and styled fonts in PUBG?",
        answer:
          "PUBG supports some Unicode characters in names. Our styled fonts generally work well in PUBG.",
      },
    ],
    tips: [
      {
        step: 1,
        title: "Keep names short",
        description:
          "PUBG has a 14-character limit, so keep your name concise.",
      },
      {
        step: 2,
        title: "Pick a fierce style",
        description:
          "Choose bold, gothic, or squared fonts for a powerful look.",
      },
      {
        step: 3,
        title: "Apply in PUBG",
        description:
          "Use a rename card and paste your styled name in-game.",
      },
    ],
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Gaming", href: "/gaming" },
      { label: "PUBG", href: "/gaming/pubg-nickname" },
    ],
  },
  {
    id: "fortnite",
    slug: "gaming/fortnite",
    title: "Fortnite Name Generator",
    metaTitle:
      "Fortnite Name Generator — Stylish Gamer Tags | Ff Font Lab",
    metaDescription:
      "Generate stylish Fortnite names and gamer tags with cool Unicode fonts. Stand out in the battle royale with a unique name.",
    h1: "Fortnite Name Generator",
    description:
      "Create unique, stylish Fortnite names using our Unicode font generator. Stand out in every match and lobby with a cool-looking name.",
    category: "gaming",
    platform: "fortnite",
    charLimit: 16,
    charLimitLabel: "Display name limit",
    recommendedStyles: [
      "boldSans",
      "doubleStruck",
      "monospace",
      "fraktur",
    ],
    faqs: [
      {
        question: "How do I use a styled name in Fortnite?",
        answer:
          "Generate your desired styled name, then go to your Fortnite account settings and change your display name.",
      },
      {
        question: "Can I use Unicode fonts in my Fortnite name?",
        answer:
          "Fortnite supports some Unicode characters in display names. Our styled fonts should work in most cases.",
      },
      {
        question: "How often can I change my Fortnite name?",
        answer:
          "Epic Games allows display name changes every 14 days, so choose your styled name carefully.",
      },
    ],
    tips: [
      {
        step: 1,
        title: "Choose wisely",
        description:
          "You can only change your name every 14 days, so pick a style you love.",
      },
      {
        step: 2,
        title: "Generate styles",
        description:
          "Browse through bold, double-struck, monospace, and gothic styles.",
      },
      {
        step: 3,
        title: "Update your Epic account",
        description:
          "Change your display name in the Epic Games account settings.",
      },
    ],
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Gaming", href: "/gaming" },
      { label: "Fortnite", href: "/gaming" },
    ],
  },
  {
    id: "roblox",
    slug: "gaming/roblox",
    title: "Roblox Name Generator",
    metaTitle:
      "Roblox Name Generator — Cool Roblox Usernames | Ff Font Lab",
    metaDescription:
      "Generate cool Roblox usernames and display names with stylish Unicode fonts. Create unique names for your Roblox profile.",
    h1: "Roblox Name Generator",
    description:
      "Create unique, eye-catching Roblox usernames and display names using our Unicode font generator. Stand out in the Roblox community.",
    category: "gaming",
    platform: "roblox",
    charLimit: 20,
    charLimitLabel: "Display name limit",
    recommendedStyles: [
      "boldSans",
      "cursive",
      "doubleStruck",
      "smallCaps",
    ],
    faqs: [
      {
        question: "Can I use styled fonts in my Roblox display name?",
        answer:
          "Yes, Roblox supports Unicode characters in display names, so you can use our styled fonts.",
      },
      {
        question: "What is the Roblox display name limit?",
        answer:
          "Roblox display names can be up to 20 characters long.",
      },
      {
        question: "Do these fonts work in Roblox chat?",
        answer:
          "Roblox has a filter for chat, but styled Unicode characters in display names and bios generally work.",
      },
    ],
    tips: [
      {
        step: 1,
        title: "Type your name",
        description:
          "Enter the Roblox name you want to stylize.",
      },
      {
        step: 2,
        title: "Choose a style",
        description:
          "Pick from bold, cursive, double-struck, and other styles.",
      },
      {
        step: 3,
        title: "Update your Roblox profile",
        description:
          "Change your display name in Roblox account settings.",
      },
    ],
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Gaming", href: "/gaming" },
      { label: "Roblox", href: "/gaming/roblox-username" },
    ],
  },
  {
    id: "minecraft",
    slug: "gaming/minecraft",
    title: "Minecraft Name Generator",
    metaTitle:
      "Minecraft Name Generator — Cool MC Usernames | Ff Font Lab",
    metaDescription:
      "Generate cool Minecraft usernames with stylish Unicode fonts. Create unique names for your Minecraft profile and servers.",
    h1: "Minecraft Name Generator",
    description:
      "Create unique, stylish Minecraft usernames using our Unicode font generator. Stand out on servers and in the Minecraft community.",
    category: "gaming",
    platform: "minecraft",
    charLimit: 16,
    charLimitLabel: "Name character limit",
    recommendedStyles: [
      "boldSans",
      "doubleStruck",
      "fraktur",
      "monospace",
    ],
    faqs: [
      {
        question: "Can I use styled fonts in Minecraft?",
        answer:
          "Minecraft supports Unicode characters in some contexts. Chat and server names may display styled fonts depending on the server.",
      },
      {
        question: "Do these fonts work in Minecraft Java Edition?",
        answer:
          "Minecraft Java Edition has broader Unicode support than Bedrock, so styled fonts are more likely to work.",
      },
      {
        question: "Can I change my Minecraft username?",
        answer:
          "You can change your Minecraft Java Edition username once every 30 days on your Mojang account.",
      },
    ],
    tips: [
      {
        step: 1,
        title: "Type your name",
        description:
          "Enter the Minecraft name you want to stylize.",
      },
      {
        step: 2,
        title: "Choose a style",
        description:
          "Pick bold, gothic, double-struck, or monospace for a Minecraft-appropriate look.",
      },
      {
        step: 3,
        title: "Use on servers",
        description:
          "Paste the styled text into Minecraft server name fields or chat.",
      },
    ],
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Gaming", href: "/gaming" },
      { label: "Minecraft", href: "/gaming" },
    ],
  },
];

export function getAllTools(): ToolDefinition[] {
  return ALL_TOOLS;
}

export function getToolsByCategory(
  category: ToolDefinition["category"],
): ToolDefinition[] {
  return ALL_TOOLS.filter((t) => t.category === category);
}

export function getToolBySlug(slug: string): ToolDefinition | undefined {
  return ALL_TOOLS.find((t) => t.slug === slug);
}
