
import { Challenge } from '@/context/ChallengeContext';

export const challenges: Challenge[] = [
  {
    id: 'uber-1',
    company: 'Uber',
    companyId: 'uber',
    title: 'Improving the Driver-Rider Matching Experience',
    description: 'Design a solution to improve the matching experience between riders and drivers during peak hours.',
    duration: 45,
    difficulty: 'medium',
    tags: ['Mobile', 'UX', 'Maps'],
    scenario: 'Uber is experiencing issues with matching drivers and riders during peak hours, leading to longer wait times and cancellations. Your task is to redesign the matching experience to improve efficiency and reduce frustration.',
    requirements: [
      'Consider both driver and rider perspectives',
      'Address peak hour congestion issues',
      'Reduce cancellation rates',
      'Improve the transparency of the matching process',
      'Design for the existing Uber mobile app ecosystem'
    ],
    juniorGuidance: [
      'Focus on UI improvements for clarity and transparency',
      'Consider simple visual indicators for wait times and driver locations',
      'Think about how to better communicate the matching process to users'
    ],
    seniorGuidance: [
      'Consider the entire user journey for both drivers and riders',
      'Think about incentives that might improve the matching process',
      'Explore data visualization to better communicate wait times and traffic conditions',
      'Consider edge cases like multiple rider requests in the same area'
    ],
    leadGuidance: [
      'Consider the business implications of your solution, including driver retention and revenue impact',
      'Think about how your solution might scale globally across different markets',
      'Balance technical feasibility with ideal user experience',
      'Consider how your solution fits into Uber\'s broader product strategy'
    ]
  },
  {
    id: 'airbnb-1',
    company: 'Airbnb',
    companyId: 'airbnb',
    title: 'Redesigning the Booking Confirmation Process',
    description: 'Design a more reassuring and informative booking confirmation experience for first-time users.',
    duration: 60,
    difficulty: 'medium',
    tags: ['Web', 'Trust', 'First-time Users'],
    scenario: 'Airbnb has data showing that first-time users often feel uncertain after booking a stay. They frequently contact customer support or even cancel bookings due to uncertainty. Your task is to redesign the booking confirmation process to build trust and clarity.',
    requirements: [
      'Address the needs of first-time Airbnb users specifically',
      'Reduce support tickets related to booking uncertainty',
      'Maintain or improve conversion rates',
      'Ensure users understand next steps after booking',
      'Design for both mobile and desktop web experiences'
    ],
    juniorGuidance: [
      'Focus on clear information hierarchy in the confirmation screen',
      'Consider how to visually communicate trust and security',
      'Think about what information is most important to first-time users'
    ],
    seniorGuidance: [
      'Consider the entire post-booking journey up to check-in',
      'Think about personalization based on user type or destination',
      'Explore how to build trust through design elements and communication',
      'Consider localization needs for international travelers'
    ],
    leadGuidance: [
      'Develop a strategy for how this redesign fits into Airbnb\'s broader trust and safety initiatives',
      'Consider measurement frameworks to evaluate success',
      'Think about how this might impact host operations and experience',
      'Balance immediate user needs with Airbnb\'s long-term business goals'
    ]
  },
  {
    id: 'meta-1',
    company: 'Meta',
    companyId: 'meta',
    title: 'Redesigning Group Interactions',
    description: 'Design a new way for Facebook Groups members to collaborate and share content.',
    duration: 60,
    difficulty: 'hard',
    tags: ['Social', 'Communities', 'Collaboration'],
    scenario: 'Meta is revamping its Groups product to better support different types of communities. Data shows that many groups struggle with organizing content and facilitating member collaboration. Your task is to design new interaction patterns for content sharing and collaboration within Facebook Groups.',
    requirements: [
      'Support different types of groups (hobby, local community, support, etc.)',
      'Improve content organization and discoverability',
      'Design for both active participants and passive consumers',
      'Consider privacy and content moderation aspects',
      'Work within Meta\'s design system while proposing meaningful innovations'
    ],
    juniorGuidance: [
      'Focus on improving the existing interface for content organization',
      'Consider simple tools that might help group admins organize content',
      'Think about the posting and consumption experience for regular members'
    ],
    seniorGuidance: [
      'Think about different user segments within groups and their needs',
      'Consider how to balance power user features with simplicity for casual users',
      'Explore new interaction models that might better facilitate community building',
      'Think about content lifecycles within different types of groups'
    ],
    leadGuidance: [
      'Consider how your solution addresses Meta\'s broader goals for community building',
      'Think about the implementation complexity and potential phased rollout approaches',
      'Address potential misuse scenarios and content moderation challenges',
      'Consider how to measure success both for users and for the business'
    ]
  },
  {
    id: 'spotify-1',
    company: 'Spotify',
    companyId: 'spotify',
    title: 'Social Music Discovery Experience',
    description: 'Design a new feature that helps users discover music through their social connections.',
    duration: 45,
    difficulty: 'medium',
    tags: ['Music', 'Social', 'Discovery'],
    scenario: 'Spotify wants to enhance its social features to improve music discovery. Research shows that recommendations from friends are highly valued but underutilized in the current app. Your task is to design a social music discovery experience that helps users find new music through their social connections.',
    requirements: [
      'Integrate naturally with Spotify\'s existing social features',
      'Design for both active sharers and passive consumers',
      'Consider privacy implications and user control',
      'Maintain Spotify\'s focus on music discovery',
      'Design primarily for the mobile app experience'
    ],
    juniorGuidance: [
      'Focus on improving visibility of friends\' listening activity',
      'Consider simple sharing mechanisms that don\'t disrupt the listening experience',
      'Think about how to display social recommendations in the UI'
    ],
    seniorGuidance: [
      'Think about different relationship types and how they might affect music sharing',
      'Consider the balance between algorithmic and social recommendations',
      'Explore different models for privacy controls and sharing preferences',
      'Think about potential integration with existing features like playlists and radio'
    ],
    leadGuidance: [
      'Develop a vision for how social features could evolve within Spotify\'s ecosystem',
      'Consider business implications like user growth and retention',
      'Think about potential partnerships or integrations with other platforms',
      'Address how this feature might affect Spotify\'s core metrics and user engagement'
    ]
  },
  {
    id: 'google-1',
    company: 'Google',
    companyId: 'google',
    title: 'Reimagining Cross-Device Search Experience',
    description: 'Design a seamless search experience that works across multiple devices and contexts.',
    duration: 60,
    difficulty: 'hard',
    tags: ['Search', 'Cross-Device', 'Context-Aware'],
    scenario: 'Google is exploring ways to make search more continuous across devices and contexts. Users often switch between phones, laptops, and other devices while researching topics. Your task is to design an experience that helps users maintain context and continue their search journey seamlessly across different devices.',
    requirements: [
      'Support transitions between at least 3 different device types',
      'Design for both logged-in and logged-out states',
      'Consider privacy implications and user control',
      'Maintain the simplicity and accessibility of Google Search',
      'Address different user scenarios (casual browsing, in-depth research, etc.)'
    ],
    juniorGuidance: [
      'Focus on clear UI indicators showing cross-device activity',
      'Consider how to display continued search sessions from other devices',
      'Think about transitions and hand-off between devices'
    ],
    seniorGuidance: [
      'Think about different user journeys that span multiple devices',
      'Consider how context (time, location, previous searches) might affect the experience',
      'Explore different models for organizing multi-device search history',
      'Think about user control and transparency in this connected experience'
    ],
    leadGuidance: [
      'Consider how this feature supports Google\'s broader ecosystem strategy',
      'Address potential technical and privacy constraints in your solution',
      'Think about metrics for measuring success across devices',
      'Consider implications for Google\'s business model and user engagement'
    ]
  }
];
